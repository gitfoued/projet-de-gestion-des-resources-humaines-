package com.example.server.repositories;

import com.example.server.entities.Absence;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AbsenceRepository extends JpaRepository<Absence, Integer> {
    // Vous pouvez ajouter des méthodes personnalisées si nécessaire
    @Query("SELECT a FROM Absence a WHERE a.department.id = :departmentId")
    List<Absence> findByDepartmentId(Integer departmentId);
    void deleteByEmployeeId(Long employeeId);
}
