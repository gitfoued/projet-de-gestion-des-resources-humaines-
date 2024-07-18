package com.example.server.dtos;

import com.example.server.entities.Empolyee;
import java.util.List;

public class DepartmentDetail {
    private Long id;
    private String name;
    private String description;
    private String departmentHead;
    private List<Empolyee> employees;

    public DepartmentDetail(Integer id, String name, String description, String departmentHead, List<Empolyee> employees) {
        this.id = Long.valueOf(id);
        this.name = name;
        this.description = description;
        this.departmentHead = departmentHead;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDepartmentHead() {
        return departmentHead;
    }

    public void setDepartmentHead(String departmentHead) {
        this.departmentHead = departmentHead;
    }

    public List<Empolyee> getEmployees() {
        return employees;
    }

    public void setEmployees(List<Empolyee> employees) {
        this.employees = employees;
    }
}
