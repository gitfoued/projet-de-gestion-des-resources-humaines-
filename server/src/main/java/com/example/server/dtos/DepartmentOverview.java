package com.example.server.dtos;

public class DepartmentOverview {
    private Long id;
    private String name;
    private Long employeeCount;

    public DepartmentOverview(Integer id, String name, Long employeeCount) {
        this.id = Long.valueOf(id);
        this.name = name;
        this.employeeCount = employeeCount;
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

    public Long getEmployeeCount() {
        return employeeCount;
    }

    public void setEmployeeCount(Long employeeCount) {
        this.employeeCount = employeeCount;
    }
}
