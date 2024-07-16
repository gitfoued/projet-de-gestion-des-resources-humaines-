package com.example.server.services;

import com.example.server.entities.Department;
import com.example.server.entities.Empolyee;
import com.example.server.entities.Role;
import com.example.server.repositories.AbsenceRepository;
import com.example.server.repositories.DepartmentRepository;
import com.example.server.repositories.EmployeeRepository;
import com.example.server.repositories.RoleRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmpolyeeService {

    private final EmployeeRepository employeeRepository;
    @Autowired
    private AbsenceRepository absenceRepository;
    private  DepartmentRepository departmentRepository;
    private RoleRepository roleRepository;
    @Autowired
    public EmpolyeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public Empolyee saveEmployee(Empolyee employee) {
        validateEmployee(employee);
        System.out.println("DepartmentId received in service: {}"+ employee.getDepartment());
        System.out.println("RoleId received in service: {}"+ employee.getRole());
        if (employee.getId() != null) {
            Optional<Empolyee> existingEmployee = employeeRepository.findById(Long.valueOf(employee.getId()));
            if (existingEmployee.isPresent()) {
                if (!existingEmployee.get().getEmail().equals(employee.getEmail())) {
                    if (employeeRepository.findByEmail(employee.getEmail()).isPresent()) {
                        throw new IllegalArgumentException("Email already in use");
                    }
                }
            } else {
                throw new IllegalArgumentException("Employee with given ID does not exist");
            }
        } else {
            if (employeeRepository.findByEmail(employee.getEmail()).isPresent()) {
                throw new IllegalArgumentException("Email already in use");
            }
        }
        // Load Department and Role entities from database based on IDs
        Department department = loadDepartment(employee.getDepartment().getId());
        Role role = loadRole(employee.getRole().getId());

        // Set Department and Role to the employee
        employee.setDepartment(department);
        employee.setRole(role);
        return employeeRepository.save(employee);
    }

    private void validateEmployee(Empolyee employee) {
        if (employee.getEmail() == null || employee.getEmail().isEmpty()) {
            throw new IllegalArgumentException("Email is required");
        }
        if (employee.getFirstName() == null || employee.getFirstName().isEmpty()) {
            throw new IllegalArgumentException("First name is required");
        }
        if (employee.getLastName() == null || employee.getLastName().isEmpty()) {
            throw new IllegalArgumentException("Last name is required");
        }
        if (employee.getDepartment() == null ) {
            throw new IllegalArgumentException("Department is required");
        }
        if (employee.getRole() == null) {
            throw new IllegalArgumentException("Role is required");
        }
    }
    public Empolyee getEmployeeById(Integer id) {
        Optional<Empolyee> employee = employeeRepository.findById(Long.valueOf(id));
        return employee.orElse(null);
    }

    @Transactional
    public void deleteEmployee(Integer id) {
        Long employeeId = Long.valueOf(id);
        // Supprimer les enregistrements dépendants dans la table absences
        absenceRepository.deleteByEmployeeId(employeeId);
        // Supprimer l'employé
        employeeRepository.deleteById(employeeId);
    }

    public Page<Empolyee> getAllEmployees(Pageable pageable) {
        return employeeRepository.findAll(pageable);
    }

    public Page<Empolyee> searchEmployees(String keyword, Pageable pageable) {
        return employeeRepository.findByFirstNameContainingOrLastNameContainingOrEmailContaining(keyword, keyword, keyword, pageable);
    }
    public List<Empolyee> findByDepartmentId(Long departmentId) {
        return employeeRepository.findByDepartmentId(departmentId);
    }

    public Long countEmployeesByDepartmentId(Long departmentId) {
        return employeeRepository.countByDepartmentId(departmentId);
    }
    private Department loadDepartment(Integer departmentId) {
        return departmentRepository.findById(Long.valueOf(departmentId))
                .orElseThrow(() -> new IllegalArgumentException("Department not found with id: " + departmentId));
    }

    private Role loadRole(Integer roleId) {
        return roleRepository.findById(Long.valueOf(roleId))
                .orElseThrow(() -> new IllegalArgumentException("Role not found with id: " + roleId));
    }
}
