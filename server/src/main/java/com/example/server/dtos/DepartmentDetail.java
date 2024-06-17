package com.example.server.dtos;

import com.example.server.entities.Empolyee;
import java.util.List;

public class DepartmentDetail {
    private Long id;
    private String name;
    private List<Empolyee> employees;

    public DepartmentDetail(Integer id, String name, List<Empolyee> employees) {
        this.id = Long.valueOf(id);
        this.name = name;
        this.employees = employees;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Empolyee> getEmployees() {
        return employees;
    }

    public void setEmployees(List<Empolyee> employees) {
        this.employees = employees;
    }
}
