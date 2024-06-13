package com.example.server.repositories;

import com.example.server.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    // Vous pouvez ajouter des méthodes personnalisées si nécessaire
}
