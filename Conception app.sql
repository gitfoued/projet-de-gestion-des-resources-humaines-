
Conception de la Base de Données pour une Application de Gestion des Ressources Humaines

Contexte
L'objectif de ce document est de fournir une conception de base de données pour une application de gestion des ressources humaines (GRH) utilisant MySQL.
 Ce schéma inclut les tables pour les utilisateurs, les employés, les départements et les rôles.

Schéma de la Base de Données
Table:users
Colonne         | Type          | Contraintes
---------------------------------------------------------------
id              | INT           | PRIMARY KEY, AUTO_INCREMENT
username        | VARCHAR(50)   | NOT NULL, UNIQUE
password        | VARCHAR(255)  | NOT NULL
email           | VARCHAR(100)  | NOT NULL, UNIQUE
role_id         | INT           | FOREIGN KEY REFERENCES roles(id)
last_name       | VARCHAR(50)  | NOT NULL
last_login_date | DATE      | 

Table:employees
Colonne        | Type          | Contraintes
--------------------------------------------------------
id             | INT           | PRIMARY KEY, AUTO_INCREMENT
first_name     | VARCHAR(50)   | NOT NULL
last_name      | VARCHAR(50)   | NOT NULL
email          | VARCHAR(100)  | NOT NULL, UNIQUE
phone_number   | VARCHAR(15)   | 
hire_date      | DATE          | NOT NULL
salary         | DECIMAL(10, 2)| 
department_id  | INT           | FOREIGN KEY REFERENCES departments(id)
role_id        | INT           | FOREIGN KEY REFERENCES roles(id)
address        | VARCHAR(255)  | NOT NULL
date_of_birth  | DATE          | NOT NULL


Table: departments
Colonne        | Type          | Contraintes
-------------------------------------------------------
id             | INT           | PRIMARY KEY, AUTO_INCREMENT
name           | VARCHAR(100)  | NOT NULL, UNIQUE
description    | VARCHAR(255)  | 
department_head| VARCHAR(100)  | NOT NULL


Table: roles
Colonne         | Type          | Contraintes
---------------------------------------------------------------
id              | INT           | PRIMARY KEY, AUTO_INCREMENT
name            | VARCHAR(50)   | NOT NULL, UNIQUE
description     | VARCHAR(255)  | 
creation_date   | DATE          | NOT NULL



