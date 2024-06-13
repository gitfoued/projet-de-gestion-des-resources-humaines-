package com.example.server.repositories;

import com.example.server.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Vous pouvez ajouter des méthodes personnalisées si nécessaire
}
