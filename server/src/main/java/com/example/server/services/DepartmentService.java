package com.example.server.services;

import com.example.server.dtos.DepartmentDetail;
import com.example.server.dtos.DepartmentOverview;
import com.example.server.entities.Department;
import com.example.server.entities.Empolyee;
import com.example.server.repositories.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DepartmentService {

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private EmpolyeeService employeeService;

    public List<DepartmentOverview> getAllDepartments() {
        List<Department> departments = departmentRepository.findAll();
        return departments.stream()
                .map(department -> new DepartmentOverview(
                        department.getId(),
                        department.getName(),
                        employeeService.countEmployeesByDepartmentId(Long.valueOf(department.getId()))
                ))
                .toList();
    }

    public DepartmentDetail getDepartmentById(Long id) {
        Optional<Department> departmentOpt = departmentRepository.findById(id);
        if (departmentOpt.isPresent()) {
            Department department = departmentOpt.get();
            List<Empolyee> employees = employeeService.findByDepartmentId(Long.valueOf(department.getId()));
            return new DepartmentDetail(department.getId(), department.getName(), employees);
        } else {
            throw new IllegalArgumentException("Department with given ID does not exist");
        }
    }

    public Department saveDepartment(Department department) {
        validateDepartment(department);
        return departmentRepository.save(department);
    }

    public void deleteDepartment(Long id) {
        departmentRepository.deleteById(id);
    }

    private void validateDepartment(Department department) {
        if (department.getId() != null) {
            Optional<Department> existingDepartment = departmentRepository.findById(Long.valueOf(department.getId()));
            if (existingDepartment.isPresent()) {
                if (!existingDepartment.get().getName().equals(department.getName())) {
                    if (departmentRepository.findByName(department.getName()).isPresent()) {
                        throw new IllegalArgumentException("Department name already in use");
                    }
                }
            } else {
                throw new IllegalArgumentException("Department with given ID does not exist");
            }
        } else {
            if (departmentRepository.findByName(department.getName()).isPresent()) {
                throw new IllegalArgumentException("Department name already in use");
            }
        }
    }

    public boolean existsByName(String name) {
        return departmentRepository.existsByName(name);
    }
}
