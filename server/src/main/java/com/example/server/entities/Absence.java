package com.example.server.entities;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "absences")
public class Absence {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "employee_id", referencedColumnName = "id")
    private Empolyee employee;

    @ManyToOne
    @JoinColumn(name = "department_id", referencedColumnName = "id")
    private Department department;

    @Column(name = "absence_date")
    private Date absenceDate;

    private String reason;

    public Absence(Empolyee employee, Department department, Date absenceDate, String reason) {
        this.employee = employee;
        this.department = department;
        this.absenceDate = absenceDate;
        this.reason = reason;
    }

    public Absence() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Empolyee getEmployee() {
        return employee;
    }

    public void setEmployee(Empolyee employee) {
        this.employee = employee;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public Date getAbsenceDate() {
        return absenceDate;
    }

    public void setAbsenceDate(Date absenceDate) {
        this.absenceDate = absenceDate;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}
