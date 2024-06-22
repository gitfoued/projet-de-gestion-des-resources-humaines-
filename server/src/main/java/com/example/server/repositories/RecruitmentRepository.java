package com.example.server.repositories;

import com.example.server.entities.recruitment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecruitmentRepository extends JpaRepository<recruitment, Long> {
    // Vous pouvez ajouter des méthodes personnalisées si nécessaire

    List<recruitment> findByDepartmentId(Integer departmentId);
}
