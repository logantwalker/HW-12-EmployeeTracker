DROP DATABASE IF EXISTS hw11_DB;

CREATE DATABASE hw11_DB;

USE hw11_DB;

CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id));

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  deparment_id INT NOT NULL,
  PRIMARY KEY (id));

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT,
  PRIMARY KEY (id)
);

INSERT INTO departments
VALUE 
    (default,'Executive'),
    (default, 'Engineering'),
    (default, 'Human Resources'),
    (default, 'Contracting')
;


INSERT INTO roles
VALUE 
    (default,'Chief Executive Officer',100000000,1),
    (default,'Chief Financial Officer',10000000,1),
    (default,'Chief Technical Officer',10000000,1),
    (default,'Chief Operations Officer',10000000,1),

    (default,'Engineering Director',200000,2),
    (default,'Lead Engineer',160000,2),
    (default,'Engineer II',120000,2),
    (default,'Engineer I',80000,2),

    (default,'HR Director',120000,3),
    (default,'Recruiting Specialist',60000,3),
    (default,'Human Resource Officer',50000,3),

    (default,'Contracting Director',120000,4),
    (default,'Contracts Specialist',90000,4),
    (default,'Contracts Associate',50000,4)
;

INSERT INTO employees
VALUE 
-- executives
    (default,'Mischa','Cuevas',1,NULL),
    (default,'Marcel','Martin',2,1),
    (default,'Gracey','Velazquez',3,1),
    (default,'Shaunie','Gardiner',4,1),

-- engineering dept
    (default,'Maxwell','Chen',5,3),
    (default,'Amba','Nava',6,5),
    (default,'Mack','Bell',7,5),
    (default,'Viaan','Carroll',7,5),
    (default,'Mekhi','Costa',8,5),
    (default,'Leighton','Gibbs',8,5),
    (default,'Morwenna','Cline',8,5),

-- human resource dept
    (default,'Meghan','Monroe',9,4),
    (default,'Trixie','Meadows',10,9),
    (default,'Della','Redman',10,9),
    (default,'Saif','Gomez',11,9),

-- contracting department
    (default,'Alessandro','Rich',12,2),
    (default,'Kelly','Bullock',13,12),
    (default,'Kobi','Pratt',14,12),
    (default,'Killian','Sanders',14,12);