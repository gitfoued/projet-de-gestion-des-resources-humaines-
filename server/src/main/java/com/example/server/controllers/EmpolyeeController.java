package com.example.server.controllers;

import com.example.server.entities.Empolyee;
import com.example.server.services.EmpolyeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/employees")
public class EmpolyeeController {

    private final EmpolyeeService employeeService;

    @Autowired
    public EmpolyeeController(EmpolyeeService employeeService) {
        this.employeeService = employeeService;
    }

    @PostMapping
    public ResponseEntity<Empolyee> createEmployee(@RequestBody Empolyee employee) {
        try {
            Empolyee savedEmployee = employeeService.saveEmployee(employee);
            return new ResponseEntity<>(savedEmployee, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
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
    public ResponseEntity<Empolyee> getEmployeeById(@PathVariable Long id) {
        Empolyee employee = employeeService.getEmployeeById(id);
        if (employee != null) {
            return new ResponseEntity<>(employee, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteEmployee(@PathVariable Long id) {
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

