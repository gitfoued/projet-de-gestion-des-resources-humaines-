CREATE DATABASE gestion_db;
USE gestion_db;
CREATE TABLE roles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255),
    creation_date DATE NOT NULL
);

CREATE TABLE departments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(255),
    department_head VARCHAR(100) NOT NULL
);

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    role_id INT,
    last_name VARCHAR(50) NOT NULL,
    last_login_date DATE,
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone_number VARCHAR(15),
    hire_date DATE NOT NULL,
    salary DECIMAL(10, 2),
    department_id INT,
    role_id INT,
    address VARCHAR(255) NOT NULL,
    date_of_birth DATE NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments(id),
    FOREIGN KEY (role_id) REFERENCES roles(id)
);
CREATE TABLE absences (
    id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT,
    department_id INT,
    absence_date DATE,
    reason VARCHAR(255),
    FOREIGN KEY (employee_id) REFERENCES employees(id),
    FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE recruitment (
    id INT PRIMARY KEY AUTO_INCREMENT,
    department_id INT,
    recruitment_start_date DATE,
    recruitment_end_date DATE,
    FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE overtime (
    id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT,
    department_id INT,
    overtime_hours FLOAT,
    overtime_date DATE,
    FOREIGN KEY (employee_id) REFERENCES employees(id),
    FOREIGN KEY (department_id) REFERENCES departments(id)
);
select * from overtime;
INSERT INTO absences (employee_id, department_id, absence_date, reason)
VALUES (1, 1, '2024-01-15', 'Sick leave');


INSERT INTO absences (employee_id, department_id, absence_date, reason)
VALUES (2, 2, '2024-02-10', 'Personal reasons');

INSERT INTO absences (employee_id, department_id, absence_date, reason)
VALUES (3, 1, '2024-03-20', 'Medical appointment');