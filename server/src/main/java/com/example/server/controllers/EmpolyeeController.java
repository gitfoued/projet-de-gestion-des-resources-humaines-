package com.example.server.controllers;

import com.example.server.entities.Empolyee;
import com.example.server.services.EmpolyeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/employees")
public class EmpolyeeController {

    private final EmpolyeeService employeeService;

    @Autowired
    public EmpolyeeController(EmpolyeeService employeeService) {
        this.employeeService = employeeService;
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAnyAuthority('MANAGER_CREATE')")
    public ResponseEntity<Empolyee> createEmployee(@RequestBody Empolyee employee) {
        try {
            System.out.println("Received employee data: " + employee);
            Integer departmentId = employee.getDepartment().getId();
            Integer roleId = employee.getRole().getId();
            System.out.println("Department ID: " + departmentId);
            System.out.println("Role ID: " + roleId);

            Empolyee savedEmployee = employeeService.saveEmployee(employee);
            return new ResponseEntity<>(savedEmployee, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            System.out.println("Error creating employee: " + e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Empolyee> updateEmployee(@PathVariable Integer id, @RequestBody Empolyee employee) {
        try {
            employee.setId(id);
            Empolyee updatedEmployee = employeeService.saveEmployee(employee);
            return new ResponseEntity<>(updatedEmployee, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Empolyee> getEmployeeById(@PathVariable Integer id) {
        Empolyee employee = employeeService.getEmployeeById(id);
        if (employee != null) {
            return new ResponseEntity<>(employee, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteEmployee(@PathVariable Integer id) {
        try {
            employeeService.deleteEmployee(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    public ResponseEntity<Page<Empolyee>> getAllEmployees(Pageable pageable) {
        Page<Empolyee> employees = employeeService.getAllEmployees(pageable);
        return new ResponseEntity<>(employees, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<Page<Empolyee>> searchEmployees(@RequestParam String keyword, Pageable pageable) {
        Page<Empolyee> employees = employeeService.searchEmployees(keyword, pageable);
        return new ResponseEntity<>(employees, HttpStatus.OK);
    }
}

