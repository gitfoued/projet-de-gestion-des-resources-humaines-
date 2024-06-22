package com.example.server.services;

import com.example.server.entities.Absence;
import com.example.server.repositories.AbsenceRepository;
import com.example.server.repositories.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AbsenceService {

    private final AbsenceRepository absenceRepository;
    private final DepartmentRepository departmentRepository;

    @Autowired
    public AbsenceService(AbsenceRepository absenceRepository, DepartmentRepository departmentRepository) {
        this.absenceRepository = absenceRepository;
        this.departmentRepository = departmentRepository;
    }

    public double calculateAbsenteeismRate(Integer departmentId) {
        List<Absence> absences = absenceRepository.findByDepartmentId(departmentId);
        long totalEmployees = departmentRepository.countEmployeesByDepartmentId(departmentId);

        if (totalEmployees == 0) {
            return 0;
        }

        return (double) absences.size() / totalEmployees * 100;
    }

    public Map<Integer, Map<YearMonth, Double>> calculateAnnualAbsenteeismRate() {
        // Obtenir toutes les absences
        List<Absence> absences = absenceRepository.findAll();

        // Regrouper les absences par département et par année-mois
        Map<Integer, Map<YearMonth, Long>> absencesByDepartmentAndMonth = absences.stream()
                .collect(Collectors.groupingBy(
                        absence -> absence.getDepartment().getId(),
                        Collectors.groupingBy(
                                absence -> {
                                    Date date = absence.getAbsenceDate();
                                    LocalDate localDate = ((Date) date).toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
                                    return YearMonth.of(localDate.getYear(), localDate.getMonth());
                                },
                                Collectors.counting()
                        )
                ));

        // Calculer le nombre total d'employés par département
        Map<Integer, Long> employeesByDepartment = departmentRepository.findAll().stream()
                .collect(Collectors.toMap(
                        department -> department.getId(),
                        department -> departmentRepository.countEmployeesByDepartmentId(department.getId())
                ));

        // Calculer les taux d'absentéisme
        return absencesByDepartmentAndMonth.entrySet().stream()
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        entry -> entry.getValue().entrySet().stream()
                                .collect(Collectors.toMap(
                                        Map.Entry::getKey,
                                        monthEntry -> {
                                            Integer departmentId = entry.getKey();
                                            Long totalEmployees = employeesByDepartment.getOrDefault(departmentId, 0L);
                                            if (totalEmployees == 0) {
                                                return 0.0;
                                            }
                                            return (double) monthEntry.getValue() / totalEmployees * 100;
                                        }
                                ))
                ));
    }
}
