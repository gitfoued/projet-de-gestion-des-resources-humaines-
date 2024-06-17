// src/main/java/com/example/server/services/RoleService.java
package com.example.server.services;


import com.example.server.dtos.Roledto;
import com.example.server.entities.Role;
import com.example.server.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    public List<Roledto> getAllRoles() {
        List<Role> roles = roleRepository.findAll();
        return roles.stream()
                .map(role -> new Roledto(Math.toIntExact(role.getId()), role.getName(), role.getDescription()))
                .collect(Collectors.toList());
    }

    public Roledto getRoleById(Integer id) {
        Optional<Role> roleOpt = roleRepository.findById(Long.valueOf(id));
        if (roleOpt.isPresent()) {
            Role role = roleOpt.get();
            return new Roledto(Math.toIntExact(role.getId()), role.getName(), role.getDescription());
        } else {
            throw new IllegalArgumentException("Role with given ID does not exist");
        }
    }

    public Role saveRole(Role role) {
        validateRole(role);
        return roleRepository.save(role);
    }

    public void deleteRole(Integer id) {
        roleRepository.deleteById(Long.valueOf(id));
    }

    private void validateRole(Role role) {
        if (role.getId() != null) {
            Optional<Role> existingRole = roleRepository.findById(Long.valueOf(role.getId()));
            if (existingRole.isPresent()) {
                if (!existingRole.get().getName().equals(role.getName())) {
                    if (roleRepository.existsByName(role.getName())) {
                        throw new IllegalArgumentException("Role name already in use");
                    }
                }
            } else {
                throw new IllegalArgumentException("Role with given ID does not exist");
            }
        } else {
            if (roleRepository.existsByName(role.getName())) {
                throw new IllegalArgumentException("Role name already in use");
            }
        }
    }
}

