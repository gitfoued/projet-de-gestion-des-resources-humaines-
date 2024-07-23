package com.example.server.entities;
public class UserRoleResponse {
    private String role;

    public UserRoleResponse(String role) {
        this.role = role;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
