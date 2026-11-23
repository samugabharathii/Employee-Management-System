package com.example.Employee_Management.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.Employee_Management.Entity.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository <Employee, Long> {

	boolean existsByMailId(String mailId);

	boolean existsByMailIdAndEmployeeIdNot(
	        String mailId, Long employeeId);
}

