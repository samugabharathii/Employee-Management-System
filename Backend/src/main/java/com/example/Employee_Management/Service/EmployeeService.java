package com.example.Employee_Management.Service;

import java.util.List;

import com.example.Employee_Management.DTO.EmployeeRequestDTO;
import com.example.Employee_Management.DTO.EmployeeResponseDTO;

public interface EmployeeService {

    EmployeeResponseDTO addEmployee(EmployeeRequestDTO dto);

    List<EmployeeResponseDTO> getAllEmployees();

    EmployeeResponseDTO getEmployeeById(Long id);

    EmployeeResponseDTO updateEmployee(Long id, EmployeeRequestDTO dto);

    void deleteEmployee(Long id);

}
