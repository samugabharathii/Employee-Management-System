package com.example.Employee_Management.DTO;

import java.time.LocalDate;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class EmployeeRequestDTO {

    @NotBlank(message = "Employee name is required")
    private String employeeName;

    @NotBlank(message = "Email is required")
    @Email(message = "Enter a valid email")
    private String employeeEmail;

    @NotBlank(message = "Department is required")
    private String employeeDepartment;

    @NotNull(message = "Salary is required")
    @Positive(message = "Salary must be greater than zero")
    private Double employeeSalary;

    @NotNull(message = "Joining date is required")
    private LocalDate joiningDate;
    
    @NotNull(message = "Employee status is required")
    private Boolean active;

}
