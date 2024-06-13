package com.example.server.repositories;

import com.example.server.entities.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {
    // Vous pouvez ajouter des méthodes personnalisées si nécessaire
}
