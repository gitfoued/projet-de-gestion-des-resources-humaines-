package com.example.server.services;

import com.example.server.entities.Empolyee;
import com.example.server.repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class SalaryService {

    private final EmployeeRepository employeeRepository;

    @Autowired
    public SalaryService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public Map<Integer, BigDecimal> calculateTotalSalariesByDepartment() {
        List<Empolyee> employees = employeeRepository.findAll();
        return employees.stream()
                .collect(Collectors.groupingBy(
                        employee -> employee.getDepartment().getId(),
                        Collectors.mapping(Empolyee::getSalary, Collectors.reducing(BigDecimal.ZERO, BigDecimal::add))
                ));
    }
}
