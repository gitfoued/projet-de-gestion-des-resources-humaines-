package com.example.server.repositories;

import com.example.server.entities.recruitment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecruitmentRepository extends JpaRepository<recruitment, Long> {
    // Vous pouvez ajouter des méthodes personnalisées si nécessaire
}
