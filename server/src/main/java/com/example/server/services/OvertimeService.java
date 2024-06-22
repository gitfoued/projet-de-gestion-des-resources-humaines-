package com.example.server.services;

import com.example.server.entities.Department;
import com.example.server.entities.Empolyee;
import com.example.server.entities.overtime;
import com.example.server.repositories.DepartmentRepository;
import com.example.server.repositories.EmployeeRepository;
import com.example.server.repositories.OvertimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class OvertimeService {

    private final OvertimeRepository overtimeRepository;
    private final DepartmentRepository departmentRepository;
    private final EmployeeRepository employeeRepository;

    @Autowired
    public OvertimeService(OvertimeRepository overtimeRepository, DepartmentRepository departmentRepository, EmployeeRepository employeeRepository) {
        this.overtimeRepository = overtimeRepository;
        this.departmentRepository = departmentRepository;
        this.employeeRepository = employeeRepository;
    }

    public Map<Integer, Float> calculateTotalOvertimeHoursByDepartment() {
        List<overtime> overtimeList = overtimeRepository.findAll();
        return overtimeList.stream()
                .collect(Collectors.groupingBy(
                        overtime -> overtime.getDepartment().getId(),
                        Collectors.summingDouble(overtime::getOvertimeHours)
                ))
                .entrySet().stream()
                .collect(Collectors.toMap(Map.Entry::getKey, entry -> entry.getValue().floatValue()));
    }

    public Map<Integer, Map<Integer, Float>> calculateOvertimeHoursByEmployeeAndDepartment() {
        List<overtime> overtimeList = overtimeRepository.findAll();
        return overtimeList.stream()
                .collect(Collectors.groupingBy(
                        overtime -> overtime.getDepartment().getId(),
                        Collectors.groupingBy(
                                overtime -> overtime.getEmployee().getId(),
                                Collectors.summingDouble(overtime::getOvertimeHours)
                        )
                ))
                .entrySet().stream()
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        entry -> entry.getValue().entrySet().stream()
                                .collect(Collectors.toMap(
                                        Map.Entry::getKey,
                                        subEntry -> subEntry.getValue().floatValue()
                                ))
                ));
    }
}
