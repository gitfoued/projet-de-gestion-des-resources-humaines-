package com.example.server.repositories;

import com.example.server.entities.overtime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OvertimeRepository extends JpaRepository<overtime, Integer> {
    // Vous pouvez ajouter des méthodes personnalisées si nécessaire
    List<overtime> findByDepartmentId(Integer departmentId);

    List<overtime> findByDepartmentIdAndEmployeeId(Integer departmentId, Integer employeeId);
}
