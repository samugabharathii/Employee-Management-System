// Request DTO - Backend-ku data send pannurathukku
export interface EmployeeRequest {
  employeeName: string;
  employeeEmail: string;
  employeeDepartment: string;
  employeeSalary: number;
  joiningDate: string;
  active: boolean;
}

// Response DTO - Backend-lendhu data receive pannurathukku
export interface EmployeeResponse {
  employeeCode: number;
  displayName: string;
  contactEmail: string;
  departmentName: string;
  monthlySalary: number;
  joiningDate: string;
  active: boolean;
}