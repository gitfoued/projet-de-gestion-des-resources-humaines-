package com.example.server.dtos;

public class DepartmentOverview {
    private Long id;
    private String name;
    private String description;
    private String departmentHead;
    private Long employeeCount;

    public DepartmentOverview(Integer id, String name, String description, String departmentHead, Long employeeCount) {
        this.id = Long.valueOf(id);
        this.name = name;
        this.description = description;
        this.departmentHead = departmentHead;
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

    public Long getEmployeeCount() {
        return employeeCount;
    }

    public void setEmployeeCount(Long employeeCount) {
        this.employeeCount = employeeCount;
    }
}
