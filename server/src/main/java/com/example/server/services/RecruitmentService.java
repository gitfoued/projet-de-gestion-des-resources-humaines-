package com.example.server.services;

import com.example.server.entities.Department;
import com.example.server.entities.recruitment;
import com.example.server.repositories.RecruitmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class RecruitmentService {

    private final RecruitmentRepository recruitmentRepository;

    @Autowired
    public RecruitmentService(RecruitmentRepository recruitmentRepository) {
        this.recruitmentRepository = recruitmentRepository;
    }

    public double calculateAverageRecruitmentTime(Integer departmentId) {
        List<recruitment> recruitments = recruitmentRepository.findByDepartmentId(departmentId);
        if (recruitments.isEmpty()) {
            return 0.0;
        }

        // Calculate total recruitment time in milliseconds
        long totalRecruitmentTime = recruitments.stream()
                .mapToLong(recruitment -> {
                    LocalDate startDate = recruitment.getRecruitmentStartDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
                    LocalDate endDate = recruitment.getRecruitmentEndDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
                    return Duration.between(startDate.atStartOfDay(), endDate.atStartOfDay()).toMillis();
                })
                .sum();

        // Calculate average recruitment time in days
        double averageRecruitmentTimeDays = (double) totalRecruitmentTime / (recruitments.size() * 24 * 60 * 60 * 1000);

        return averageRecruitmentTimeDays;
    }

    public Map<Integer, Double> calculateAverageRecruitmentTimeForAllDepartments() {
        List<recruitment> recruitments = recruitmentRepository.findAll();

        return recruitments.stream()
                .collect(Collectors.groupingBy(
                        recruitment -> recruitment.getDepartment().getId(),
                        Collectors.averagingDouble(recruitment -> {
                            LocalDate startDate = recruitment.getRecruitmentStartDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
                            LocalDate endDate = recruitment.getRecruitmentEndDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
                            long recruitmentTimeMillis = Duration.between(startDate.atStartOfDay(), endDate.atStartOfDay()).toMillis();
                            return recruitmentTimeMillis / (24 * 60 * 60 * 1000.0); // Average time in days
                        })
                ));
    }
}
