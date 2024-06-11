INSERT INTO roles (name, description, creation_date) VALUES 
('Admin', 'Administrator with full access', '2024-01-01'),
('Manager', 'Department manager', '2024-01-01'),
('Employee', 'Regular employee', '2024-01-01');
INSERT INTO departments (name, description, department_head) VALUES 
('HR', 'Human Resources Department', 'Alice Johnson'),
('IT', 'Information Technology Department', 'Bob Smith'),
('Finance', 'Finance Department', 'Charlie Brown');
INSERT INTO employees (first_name, last_name, email, phone_number, hire_date, salary, department_id, role_id, address, date_of_birth) VALUES 
('John', 'Doe', 'john.doe@example.com', '1234567890', '2023-06-01', 50000.00, 1, 3, '123 Main St', '1990-01-01'),
('Jane', 'Smith', 'jane.smith@example.com', '0987654321', '2023-06-15', 60000.00, 2, 2, '456 Elm St', '1985-02-02'),
('Jim', 'Beam', 'jim.beam@example.com', '1112223333', '2023-07-01', 55000.00, 3, 3, '789 Pine St', '1980-03-03');
