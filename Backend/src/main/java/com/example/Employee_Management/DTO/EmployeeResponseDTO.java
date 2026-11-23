package com.example.Employee_Management.DTO;

import java.time.LocalDate;

import lombok.Data;
@Data
public class EmployeeResponseDTO {

    private Long employeeCode;

    private String displayName;

    private String contactEmail;

    private String departmentName;

    private Double monthlySalary;

    private LocalDate joiningDate;
    
    private Boolean active;

}