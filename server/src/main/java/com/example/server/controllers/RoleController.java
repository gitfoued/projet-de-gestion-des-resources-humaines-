// src/main/java/com/example/server/controllers/RoleController.java
package com.example.server.controllers;

import com.example.server.dtos.Roledto;
import com.example.server.entities.Role;
import com.example.server.services.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
public class RoleController {

    @Autowired
    private RoleService roleService;

    // Afficher une liste des rôles
    @GetMapping
    public List<Roledto> getAllRoles() {
        return roleService.getAllRoles();
    }

    // Afficher les détails d'un rôle spécifique
    @GetMapping("/{id}")
    public ResponseEntity<Roledto> getRoleById(@PathVariable Integer id) {
        try {
            return ResponseEntity.ok(roleService.getRoleById(id));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Ajouter ou modifier un rôle
    @PostMapping
    public Role saveRole(@RequestBody Role role) {
        return roleService.saveRole(role);
    }

    // Supprimer un rôle
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRole(@PathVariable Integer id) {
        roleService.deleteRole(id);
        return ResponseEntity.noContent().build();
    }
}
