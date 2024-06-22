package com.example.server.repositories;

import com.example.server.entities.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {
    // Vous pouvez ajouter des méthodes personnalisées si nécessaire
    Optional<Department> findByName(String name);
    @Query("SELECT COUNT(e) FROM Empolyee e WHERE e.department.id = :departmentId")
    long countEmployeesByDepartmentId(Integer departmentId);
    boolean existsByName(String name);
}
