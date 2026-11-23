package com.example.Employee_Management.Mapper;

import com.example.Employee_Management.DTO.EmployeeRequestDTO;
import com.example.Employee_Management.DTO.EmployeeResponseDTO;
import com.example.Employee_Management.Entity.Employee;

public class EmployeeMapper {

    // Request DTO to Entity
    public static Employee toEntity(EmployeeRequestDTO dto) {

        Employee employee = new Employee();

        employee.setFullName(dto.getEmployeeName());
        employee.setMailId(dto.getEmployeeEmail());
        employee.setDepartment(dto.getEmployeeDepartment());
        employee.setSalary(dto.getEmployeeSalary());
        employee.setDateOfJoining(dto.getJoiningDate());
        employee.setActive(dto.getActive());
        return employee;
    }

    // Entity to Response DTO
    public static EmployeeResponseDTO toResponseDTO(Employee employee) {

        EmployeeResponseDTO dto = new EmployeeResponseDTO();

        dto.setEmployeeCode(employee.getEmployeeId());
        dto.setDisplayName(employee.getFullName());
        dto.setContactEmail(employee.getMailId());
        dto.setDepartmentName(employee.getDepartment());
        dto.setMonthlySalary(employee.getSalary());
        dto.setJoiningDate(employee.getDateOfJoining());
        dto.setActive(employee.getActive());

        return dto;
    }
}