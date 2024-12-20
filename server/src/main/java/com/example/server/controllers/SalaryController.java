package com.example.server.controllers;


import com.example.server.services.SalaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/salaries")
public class SalaryController {

    private final SalaryService salaryService;

    @Autowired
    public SalaryController(SalaryService salaryService) {
        this.salaryService = salaryService;
    }

    @GetMapping("/total-by-department")
    public ResponseEntity<Map<Integer, Double>> getTotalSalariesByDepartment() {
        Map<Integer, BigDecimal> totalSalariesByDepartment = salaryService.calculateTotalSalariesByDepartment();

        // Convert BigDecimal to Double for each entry in the map
        Map<Integer, Double> result = totalSalariesByDepartment.entrySet().stream()
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        entry -> entry.getValue().doubleValue()
                ));

        return ResponseEntity.ok(result);
    }
}
