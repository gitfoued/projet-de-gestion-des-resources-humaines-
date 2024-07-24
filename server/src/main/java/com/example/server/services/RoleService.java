
package com.example.server.services;


import com.example.server.dtos.Roledto;
import com.example.server.entities.Empolyee;
import com.example.server.entities.Role;
import com.example.server.entities.User;
import com.example.server.repositories.EmployeeRepository;
import com.example.server.repositories.RoleRepository;
import com.example.server.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private EmployeeRepository employeeRepository;

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
        Long roleId = Long.valueOf(id);

        // Check if the role exists
        if (!roleRepository.existsById(roleId)) {
            throw new IllegalArgumentException("Role not found with id: " + id);
        }

        // Handle users with the role
        List<User> usersWithRole = userRepository.findByRoleId(roleId);
        for (User user : usersWithRole) {
            userRepository.delete(user); // Delete the user
        }

        // Handle employees with the role
        List<Empolyee> employeesWithRole = employeeRepository.findByRoleId(roleId);
        for (Empolyee employee : employeesWithRole) {
            employeeRepository.delete(employee); // Delete the employee
        }

        // Now delete the role
        roleRepository.deleteById(roleId);
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

