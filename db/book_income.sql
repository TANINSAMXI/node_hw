INSERT INTO Guests (first_name, last_name, email, phone)
VALUES ('C', 'Y', 'c@example.com', '+111111111');

INSERT INTO Bookings (guest_id, room_id, check_in_date, check_out_date)
VALUES (3, 3, '2025-04-18', '2025-04-22');

SELECT * FROM Rooms
WHERE room_id NOT IN (
    SELECT room_id FROM Bookings
    WHERE '2025-04-20' BETWEEN check_in_date AND check_out_date
);

SELECT SUM(price) AS total_income
FROM Rooms
         JOIN Bookings ON Rooms.room_id = Bookings.room_id
WHERE YEAR(check_in_date) = 2025 AND MONTH(check_in_date) = 4;
