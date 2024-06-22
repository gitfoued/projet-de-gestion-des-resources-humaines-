package com.example.server.controllers;

import com.example.server.dtos.DepartmentDetail;
import com.example.server.dtos.DepartmentOverview;
import com.example.server.entities.Department;
import com.example.server.services.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/departments")
public class DepartmentController {

    @Autowired
    private DepartmentService departmentService;

    // Afficher une liste des départements avec le nombre d'employés
    @GetMapping
    public List<DepartmentOverview> getAllDepartments() {
        return departmentService.getAllDepartments();
    }

    // Afficher les détails d'un département spécifique
    @GetMapping("/{id}")
    public ResponseEntity<DepartmentDetail> getDepartmentById(@PathVariable Integer id) {
        try {
            DepartmentDetail departmentDetail = departmentService.getDepartmentById(id);
            return ResponseEntity.ok(departmentDetail);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Ajouter ou modifier un département
    @PostMapping
    public ResponseEntity<Department> createOrUpdateDepartment(@RequestBody Department department) {
        try {
            Department savedDepartment = departmentService.saveDepartment(department);
            return ResponseEntity.ok(savedDepartment);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    // Supprimer un département
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDepartment(@PathVariable Integer id) {
        try {
            departmentService.deleteDepartment(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
