package com.example.server.repositories;

import com.example.server.entities.Abscence;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AbsenceRepository extends JpaRepository<Abscence, Long> {
    // Vous pouvez ajouter des méthodes personnalisées si nécessaire
}