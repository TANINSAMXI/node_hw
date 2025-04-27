
INSERT INTO Guests (first_name, last_name, email, phone)
VALUES ('A', 'Q', 'a@example.com', '+123456789'),
       ('B', 'X', 'b@example.com', '+987654321');

INSERT INTO Rooms (room_number, room_type, price, status)
VALUES ('101', 'Single', 100.00, 'available'),
       ('102', 'Double', 150.00, 'available'),
       ('103', 'Suite', 250.00, 'booked');

INSERT INTO Bookings (guest_id, room_id, check_in_date, check_out_date)
VALUES (1, 1, '2025-04-10', '2025-04-15'),
       (2, 2, '2025-04-12', '2025-04-16');
