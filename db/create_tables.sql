CREATE DATABASE IF NOT EXISTS hotel_db;
USE hotel_db;

CREATE TABLE Guests (
                        guest_id INT AUTO_INCREMENT PRIMARY KEY,
                        first_name VARCHAR(50) NOT NULL,
                        last_name VARCHAR(50) NOT NULL,
                        email VARCHAR(100),
                        phone VARCHAR(20)
);

CREATE TABLE Rooms (
                       room_id INT AUTO_INCREMENT PRIMARY KEY,
                       room_number VARCHAR(10) NOT NULL,
                       room_type VARCHAR(50) NOT NULL,
                       price DECIMAL(10, 2) NOT NULL,
                       status ENUM('available', 'booked', 'maintenance') DEFAULT 'available'
);

CREATE TABLE Bookings (
                          booking_id INT AUTO_INCREMENT PRIMARY KEY,
                          guest_id INT,
                          room_id INT,
                          check_in_date DATE NOT NULL,
                          check_out_date DATE NOT NULL,
                          booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                          FOREIGN KEY (guest_id) REFERENCES Guests(guest_id),
                          FOREIGN KEY (room_id) REFERENCES Rooms(room_id)
);
