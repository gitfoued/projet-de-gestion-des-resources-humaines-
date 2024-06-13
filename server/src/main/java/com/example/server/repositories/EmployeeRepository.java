package com.example.server.repositories;

import com.example.server.entities.Empolyee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<Empolyee, Long> {
    // Vous pouvez ajouter des méthodes personnalisées si nécessaire
}
