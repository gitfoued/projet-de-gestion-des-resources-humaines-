package com.example.server.controllers;

import com.example.server.services.RecruitmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/recruitments")
public class RecruitmentController {

    private final RecruitmentService recruitmentService;

    @Autowired
    public RecruitmentController(RecruitmentService recruitmentService) {
        this.recruitmentService = recruitmentService;
    }

    @GetMapping("/{departmentId}")
    public ResponseEntity<Double> getAverageRecruitmentTime(@PathVariable Integer departmentId) {
        double averageTime = recruitmentService.calculateAverageRecruitmentTime(departmentId);
        return ResponseEntity.ok(averageTime);
    }

    @GetMapping
    public ResponseEntity<Map<Integer, Double>> getAverageRecruitmentTimeForAllDepartments() {
        Map<Integer, Double> averageTimes = recruitmentService.calculateAverageRecruitmentTimeForAllDepartments();
        return ResponseEntity.ok(averageTimes);
    }
}

