
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { EmployeeService } from './services/employee.service';
import {
  EmployeeRequest,
  EmployeeResponse
} from './models/employee';

type SortField = 'id' | 'name' | 'salary' | 'joiningDate';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {

  // Form controls
  showForm = false;
  isEditMode = false;
  selectedEmployeeId: number | null = null;

  // Employee list
  employees: EmployeeResponse[] = [];

  // Search and filters
  searchText = '';
  selectedDepartment = 'All';
  selectedStatus = 'All';

  // Sorting
  sortBy: SortField = 'id';
  sortDirection: 'asc' | 'desc' = 'asc';

  // Pagination
  currentPage = 1;
  pageSize = 5;

  // New employee form data
  newEmployee: EmployeeRequest = this.emptyEmployee();

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.loadEmployees();
  }

  // Empty form data
  emptyEmployee(): EmployeeRequest {
    return {
      employeeName: '',
      employeeEmail: '',
      employeeDepartment: '',
      employeeSalary: 0,
      joiningDate: '',
      active: true
    };
  }

  // Dashboard counts
  get totalEmployeesCount(): number {
    return this.employees.length;
  }

  get activeEmployeesCount(): number {
    return this.employees.filter(emp => emp.active).length;
  }

  get inactiveEmployeesCount(): number {
    return this.employees.filter(emp => !emp.active).length;
  }

  // Department list for filter
  get departments(): string[] {
    return [
      ...new Set(
        this.employees
          .map(emp => emp.departmentName)
          .filter(department => !!department)
      )
    ].sort();
  }

  // Search, department filter, status filter and sorting
  get filteredEmployees(): EmployeeResponse[] {

    let result = this.employees.filter(employee => {

      const search = this.searchText.toLowerCase().trim();

      const matchesSearch =
        employee.displayName.toLowerCase().includes(search) ||
        employee.contactEmail.toLowerCase().includes(search) ||
        employee.employeeCode.toString().includes(search);

      const matchesDepartment =
        this.selectedDepartment === 'All' ||
        employee.departmentName === this.selectedDepartment;

      const matchesStatus =
        this.selectedStatus === 'All' ||
        (this.selectedStatus === 'Active' && employee.active) ||
        (this.selectedStatus === 'Inactive' && !employee.active);

      return matchesSearch && matchesDepartment && matchesStatus;
    });

    // Sorting
    result = [...result].sort((a, b) => {

      let comparison = 0;

      switch (this.sortBy) {

        case 'id':
          comparison = a.employeeCode - b.employeeCode;
          break;

        case 'name':
          comparison = a.displayName.localeCompare(b.displayName);
          break;

        case 'salary':
          comparison = a.monthlySalary - b.monthlySalary;
          break;

        case 'joiningDate':
          comparison = new Date(a.joiningDate).getTime() -
                       new Date(b.joiningDate).getTime();
          break;
      }

      return this.sortDirection === 'asc'
        ? comparison
        : -comparison;
    });

    return result;
  }

  // Total pages
  get totalPages(): number {
    return Math.max(
      1,
      Math.ceil(this.filteredEmployees.length / this.pageSize)
    );
  }

  // Employees shown on current page
  get paginatedEmployees(): EmployeeResponse[] {

    const startIndex = (this.currentPage - 1) * this.pageSize;

    return this.filteredEmployees.slice(
      startIndex,
      startIndex + this.pageSize
    );
  }

  // Load all employees
  loadEmployees() {

    this.employeeService.getAllEmployees().subscribe({

      next: (data: EmployeeResponse[]) => {
        this.employees = data;

        if (this.currentPage > this.totalPages) {
          this.currentPage = this.totalPages;
        }
      },

      error: (error: any) => {
        console.error('Error loading employees:', error);
        alert('Unable to load employees');
      }

    });
  }

  // Open Add Employee form
  openAddForm() {
    this.isEditMode = false;
    this.selectedEmployeeId = null;
    this.newEmployee = this.emptyEmployee();
    this.showForm = true;
  }

  // Edit employee
  editEmployee(employee: EmployeeResponse) {

    this.isEditMode = true;
    this.selectedEmployeeId = employee.employeeCode;

    this.newEmployee = {
      employeeName: employee.displayName,
      employeeEmail: employee.contactEmail,
      employeeDepartment: employee.departmentName,
      employeeSalary: employee.monthlySalary,
      joiningDate: employee.joiningDate,
      active: employee.active
    };

    this.showForm = true;
  }

  // Form validation
  validateEmployee(): boolean {

    if (!this.newEmployee.employeeName.trim()) {
      alert('Please enter employee name');
      return false;
    }

    if (!this.newEmployee.employeeEmail.trim()) {
      alert('Please enter employee email');
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(this.newEmployee.employeeEmail)) {
      alert('Please enter a valid email address');
      return false;
    }

    if (!this.newEmployee.employeeDepartment.trim()) {
      alert('Please enter department');
      return false;
    }

    if (
      !Number.isFinite(this.newEmployee.employeeSalary) ||
      this.newEmployee.employeeSalary <= 0
    ) {
      alert('Salary must be greater than zero');
      return false;
    }

    if (!this.newEmployee.joiningDate) {
      alert('Please select joining date');
      return false;
    }

    return true;
  }

  // Add employee
  saveEmployee() {

    if (!this.validateEmployee()) {
      return;
    }

    this.employeeService.addEmployee(this.newEmployee).subscribe({

      next: () => {

        alert('Employee added successfully');

        this.resetForm();
        this.currentPage = 1;
        this.loadEmployees();
      },

      error: (error: any) => {

        console.error('Error adding employee:', error);

        alert(
          error.error?.message ||
          error.error?.detail ||
          'Unable to add employee'
        );
      }

    });
  }

  // Update employee
  updateEmployee() {

    if (this.selectedEmployeeId === null) {
      return;
    }

    if (!this.validateEmployee()) {
      return;
    }

    this.employeeService.updateEmployee(
      this.selectedEmployeeId,
      this.newEmployee
    ).subscribe({

      next: () => {

        alert('Employee updated successfully');

        this.resetForm();
        this.loadEmployees();
      },

      error: (error: any) => {

        console.error('Error updating employee:', error);

        alert(
          error.error?.message ||
          error.error?.detail ||
          'Unable to update employee'
        );
      }

    });
  }

  // Delete employee
  deleteEmployee(id: number) {

    const confirmDelete = confirm(
      'Are you sure you want to delete this employee?'
    );

    if (!confirmDelete) {
      return;
    }

    this.employeeService.deleteEmployee(id).subscribe({

      next: () => {

        alert('Employee deleted successfully');

        this.loadEmployees();
      },

      error: (error: any) => {

        console.error('Error deleting employee:', error);

        alert('Unable to delete employee');
      }

    });
  }

  // Reset and close form
  resetForm() {

    this.newEmployee = this.emptyEmployee();

    this.isEditMode = false;
    this.selectedEmployeeId = null;
    this.showForm = false;
  }

  // Cancel form
  cancelForm() {
    this.resetForm();
  }

  // Clear search and filters
  clearFilters() {

    this.searchText = '';
    this.selectedDepartment = 'All';
    this.selectedStatus = 'All';

    this.currentPage = 1;
  }

  // Reset page when filters change
  onFilterChange() {
    this.currentPage = 1;
  }

  // Change sorting
  onSortChange() {
    this.currentPage = 1;
  }

  // Change sorting direction
  toggleSortDirection() {

    this.sortDirection =
      this.sortDirection === 'asc' ? 'desc' : 'asc';
  }

  // Change page size
  onPageSizeChange() {
    this.currentPage = 1;
  }

  // Previous page
  previousPage() {

    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // Next page
  nextPage() {

    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

}
