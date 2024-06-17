package com.example.server.repositories;

import com.example.server.entities.Empolyee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Empolyee, Long> {
    // Recherche par email
    Optional<Empolyee> findByEmail(String email);

    // Recherche par prénom, nom ou email

    Page<Empolyee> findByFirstNameContainingOrLastNameContainingOrEmailContaining(String firstName, String lastName, String email, Pageable pageable);

    List<Empolyee> findByDepartmentId(Long departmentId);
    Long countByDepartmentId(Long departmentId);
}
