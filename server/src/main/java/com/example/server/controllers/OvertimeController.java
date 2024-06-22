package com.example.server.controllers;

import com.example.server.services.OvertimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/overtime")
public class OvertimeController {

    private final OvertimeService overtimeService;

    @Autowired
    public OvertimeController(OvertimeService overtimeService) {
        this.overtimeService = overtimeService;
    }

    @GetMapping("/total-hours")
    public ResponseEntity<Map<Integer, Float>> getTotalOvertimeHoursByDepartment() {
        Map<Integer, Float> totalHoursByDepartment = overtimeService.calculateTotalOvertimeHoursByDepartment();
        return ResponseEntity.ok(totalHoursByDepartment);
    }

    @GetMapping("/hours-by-employee")
    public ResponseEntity<Map<Integer, Map<Integer, Float>>> getOvertimeHoursByEmployeeAndDepartment() {
        Map<Integer, Map<Integer, Float>> hoursByEmployeeAndDepartment = overtimeService.calculateOvertimeHoursByEmployeeAndDepartment();
        return ResponseEntity.ok(hoursByEmployeeAndDepartment);
    }
}
