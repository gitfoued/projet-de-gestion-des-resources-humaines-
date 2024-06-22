package com.example.server.services;

import com.example.server.entities.Empolyee;
import com.example.server.repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmpolyeeService {

    private final EmployeeRepository employeeRepository;

    @Autowired
    public EmpolyeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public Empolyee saveEmployee(Empolyee employee) {
        validateEmployee(employee);

        if (employee.getId() != null) {
            Optional<Empolyee> existingEmployee = employeeRepository.findById(Long.valueOf(employee.getId()));
            if (existingEmployee.isPresent()) {
                if (!existingEmployee.get().getEmail().equals(employee.getEmail())) {
                    if (employeeRepository.findByEmail(employee.getEmail()).isPresent()) {
                        throw new IllegalArgumentException("Email already in use");
                    }
                }
            } else {
                throw new IllegalArgumentException("Employee with given ID does not exist");
            }
        } else {
            if (employeeRepository.findByEmail(employee.getEmail()).isPresent()) {
                throw new IllegalArgumentException("Email already in use");
            }
        }

        return employeeRepository.save(employee);
    }

    private void validateEmployee(Empolyee employee) {
        if (employee.getEmail() == null || employee.getEmail().isEmpty()) {
            throw new IllegalArgumentException("Email is required");
        }
        if (employee.getFirstName() == null || employee.getFirstName().isEmpty()) {
            throw new IllegalArgumentException("First name is required");
        }
        if (employee.getLastName() == null || employee.getLastName().isEmpty()) {
            throw new IllegalArgumentException("Last name is required");
        }
        if (employee.getDepartment() == null ) {
            throw new IllegalArgumentException("Department is required");
        }
        if (employee.getRole() == null) {
            throw new IllegalArgumentException("Role is required");
        }
    }
    public Empolyee getEmployeeById(Integer id) {
        Optional<Empolyee> employee = employeeRepository.findById(Long.valueOf(id));
        return employee.orElse(null);
    }

    public void deleteEmployee(Integer id) {
        employeeRepository.deleteById(Long.valueOf(id));
    }

    public Page<Empolyee> getAllEmployees(Pageable pageable) {
        return employeeRepository.findAll(pageable);
    }

    public Page<Empolyee> searchEmployees(String keyword, Pageable pageable) {
        return employeeRepository.findByFirstNameContainingOrLastNameContainingOrEmailContaining(keyword, keyword, keyword, pageable);
    }
    public List<Empolyee> findByDepartmentId(Long departmentId) {
        return employeeRepository.findByDepartmentId(departmentId);
    }

    public Long countEmployeesByDepartmentId(Long departmentId) {
        return employeeRepository.countByDepartmentId(departmentId);
    }
}
