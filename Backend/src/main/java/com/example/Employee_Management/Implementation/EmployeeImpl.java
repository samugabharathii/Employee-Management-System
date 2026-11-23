package com.example.Employee_Management.Implementation;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import com.example.Employee_Management.DTO.EmployeeRequestDTO;
import com.example.Employee_Management.DTO.EmployeeResponseDTO;
import com.example.Employee_Management.Entity.Employee;
import com.example.Employee_Management.Mapper.EmployeeMapper;
import com.example.Employee_Management.Repository.EmployeeRepository;
import com.example.Employee_Management.Service.EmployeeService;

@Service
public class EmployeeImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeImpl(EmployeeRepository employeeRepository) { // Repository object ah spring automatic ah inject pannum.
        this.employeeRepository = employeeRepository;
    }

    @Override
    public List<EmployeeResponseDTO> getAllEmployees() {

        return employeeRepository.findAll()
                .stream()
                .map(EmployeeMapper::toResponseDTO)
                .toList();
    }

    @Override
    public EmployeeResponseDTO getEmployeeById(Long id) {

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Employee not found"));

        return EmployeeMapper.toResponseDTO(employee);
    }

    @Override
    public EmployeeResponseDTO updateEmployee(Long id, EmployeeRequestDTO dto) {

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Employee not found"));

        employee.setFullName(dto.getEmployeeName());
        employee.setMailId(dto.getEmployeeEmail());
        employee.setDepartment(dto.getEmployeeDepartment());
        employee.setSalary(dto.getEmployeeSalary());
        employee.setDateOfJoining(dto.getJoiningDate());
        employee.setActive(dto.getActive());

        Employee updatedEmployee = employeeRepository.save(employee);

        return EmployeeMapper.toResponseDTO(updatedEmployee);
    }

    @Override
    public void deleteEmployee(Long id) {

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Employee not found"));

        employeeRepository.delete(employee);
    }
    
    @Override //Duplicate validation check
    public EmployeeResponseDTO addEmployee(EmployeeRequestDTO dto) {

        if (employeeRepository.existsByMailId(dto.getEmployeeEmail())) {

            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Email already exists");
        }

        Employee employee = EmployeeMapper.toEntity(dto); // frontend la irunthu receive panna DTO ah
                                                          //DTO to Entity convert pannum.

        Employee savedEmployee = employeeRepository.save(employee);

        return EmployeeMapper.toResponseDTO(savedEmployee);//emp-details my sql save pannum
                                                           //Entity to Response DTO.
    }
}