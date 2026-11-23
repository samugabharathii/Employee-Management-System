package com.example.Employee_Management.Entity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;
@Data
@Entity
@Table(name = "employee_records")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "emp_id")
    private Long employeeId;

	@Column(name = "emp_full_name")
    private String fullName;

    @Column(name = "emp_mail_id",nullable = false, unique = true) // database level duplicate email prevent.
    private String mailId;

    @Column(name = "dept_name")
    private String department;

    @Column(name = "monthly_pay")
    private Double salary;

	@Column(name = "joining_date")
    private LocalDate dateOfJoining;
	
	@Column(name = "active_status")
    private Boolean active = true;
    
}