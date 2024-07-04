package com.example.server.entities;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "roles")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false , unique = true)
    private String name;

    private String description;

    @Column(name = "creation_date", nullable = false)
    private LocalDate creationDate;

    public Role() {
        this.creationDate = LocalDate.now();
    }

    // Constructor that takes a name as an argument
    public Role(String name) {
        this.name = name;
        this.creationDate = LocalDate.now();
    }

    public Role(String name, String description) {
        this.name = name;
        this.description = description;
        this.creationDate = LocalDate.now();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }
}
