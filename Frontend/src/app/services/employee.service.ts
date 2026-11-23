import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeRequest, EmployeeResponse } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'http://localhost:8080/api/employees';

  constructor(private http: HttpClient) {}

  // Get all employees
  getAllEmployees() {
    return this.http.get<EmployeeResponse[]>(this.apiUrl);
  }

  // Add employee
  addEmployee(employee: EmployeeRequest) {
    return this.http.post<EmployeeResponse>(this.apiUrl, employee);
  }

  // Get employee by ID
  getEmployeeById(id: number) {
    return this.http.get<EmployeeResponse>(`${this.apiUrl}/${id}`);
  }

  // Update employee
  updateEmployee(id: number, employee: EmployeeRequest) {
    return this.http.put<EmployeeResponse>(`${this.apiUrl}/${id}`, employee);
  }

  // Delete employee
  deleteEmployee(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}