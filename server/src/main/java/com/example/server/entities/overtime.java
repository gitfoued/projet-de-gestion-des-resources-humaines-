package com.example.server.entities;
import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "overtime")
public class overtime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "employee_id", referencedColumnName = "id")
    private Empolyee employee;

    @ManyToOne
    @JoinColumn(name = "department_id", referencedColumnName = "id")
    private Department department;

    @Column(name = "overtime_hours")
    private Float overtimeHours;

    @Column(name = "overtime_date")
    private Date overtimeDate;

    public overtime() {
    }

    public overtime(Empolyee employee, Department department, Float overtimeHours, Date overtimeDate) {
        this.employee = employee;
        this.department = department;
        this.overtimeHours = overtimeHours;
        this.overtimeDate = overtimeDate;
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

    public Float getOvertimeHours() {
        return overtimeHours;
    }

    public void setOvertimeHours(Float overtimeHours) {
        this.overtimeHours = overtimeHours;
    }

    public Date getOvertimeDate() {
        return overtimeDate;
    }

    public void setOvertimeDate(Date overtimeDate) {
        this.overtimeDate = overtimeDate;
    }
}

