package com.example.server.repositories;

import com.example.server.entities.overtime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OvertimeRepository extends JpaRepository<overtime, Long> {
    // Vous pouvez ajouter des méthodes personnalisées si nécessaire
}
