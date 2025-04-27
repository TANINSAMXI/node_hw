const connection = require('./db');
const findAvailableRooms = (date) => {
    const query = `
    SELECT * FROM Rooms 
    WHERE room_id NOT IN (
      SELECT room_id 
      FROM Bookings 
      WHERE ? BETWEEN check_in_date AND check_out_date
    ) AND status = 'available';
  `;
    connection.execute(query, [date], (err, results) => {
        if (err) {
            console.error('Error: ', err);
            return;
        }
        console.log('Available rooms for date', date, ':', results);
    });
};

findAvailableRooms('2025-04-20');
