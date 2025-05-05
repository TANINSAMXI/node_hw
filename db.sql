CREATE DATABASE IF NOT EXISTS courses_db;
USE courses_db;

CREATE TABLE students (
                          id INT AUTO_INCREMENT PRIMARY KEY,
                          name VARCHAR(100)
);

CREATE TABLE courses (
                         id INT AUTO_INCREMENT PRIMARY KEY,
                         title VARCHAR(100)
);

CREATE TABLE enrollments (
                             id INT AUTO_INCREMENT PRIMARY KEY,
                             student_id INT,
                             course_id INT,
                             grade DECIMAL(5,2),
                             FOREIGN KEY (student_id) REFERENCES students(id),
                             FOREIGN KEY (course_id) REFERENCES courses(id)
);

INSERT INTO students (name) VALUES ('Ivan Petrov'), ('Anna Shevchenko'), ('Dmytro Bondar');
INSERT INTO courses (title) VALUES ('SQL Basics'), ('Node.js Advanced'), ('Web Design');
INSERT INTO enrollments (student_id, course_id, grade) VALUES
                                                           (1, 1, 90.0),
                                                           (1, 2, 85.5),
                                                           (2, 1, 88.0),
                                                           (2, 3, 92.0),
                                                           (3, 2, 75.0),
                                                           (3, 3, 80.0);