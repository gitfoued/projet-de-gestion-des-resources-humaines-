package com.example.server.controllers;

import com.example.server.services.AbsenceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.time.YearMonth;

@RestController
@RequestMapping("/api/absences")
public class AbsenceController {

    private final AbsenceService absenceService;

    @Autowired
    public AbsenceController(AbsenceService absenceService) {
        this.absenceService = absenceService;
    }

    @GetMapping("/{departmentId}")
    public ResponseEntity<Double> getAbsenteeismRate(@PathVariable Integer departmentId) {
        double rate = absenceService.calculateAbsenteeismRate(departmentId);
        return ResponseEntity.ok(rate);
    }

    @GetMapping
    public ResponseEntity<Map<Integer, Map<YearMonth, Double>>> getAnnualAbsenteeismRate() {
        Map<Integer, Map<YearMonth, Double>> absenteeismRate = absenceService.calculateAnnualAbsenteeismRate();
        return ResponseEntity.ok(absenteeismRate);
    }
}
