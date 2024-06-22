package com.example.server.entities;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "recruitment")
public class recruitment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "department_id", referencedColumnName = "id")
    private Department department;

    @Column(name = "recruitment_start_date")
    private Date recruitmentStartDate;

    @Column(name = "recruitment_end_date")
    private Date recruitmentEndDate;

    public recruitment(Department department, Date recruitmentStartDate, Date recruitmentEndDate) {
        this.department = department;
        this.recruitmentStartDate = recruitmentStartDate;
        this.recruitmentEndDate = recruitmentEndDate;
    }

    public recruitment() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public Date getRecruitmentStartDate() {
        return recruitmentStartDate;
    }

    public void setRecruitmentStartDate(Date recruitmentStartDate) {
        this.recruitmentStartDate = recruitmentStartDate;
    }

    public Date getRecruitmentEndDate() {
        return recruitmentEndDate;
    }

    public void setRecruitmentEndDate(Date recruitmentEndDate) {
        this.recruitmentEndDate = recruitmentEndDate;
    }
}
