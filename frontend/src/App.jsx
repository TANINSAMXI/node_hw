import React, { useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  const fetchMessage = async () => {
    try {
      const apiUrl = 'http://localhost:5000'
      const response = await fetch(`${apiUrl}/api/message`);
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error('Error fetching message:', error);
    }
  };

  return (
      <div style={{ padding: '2rem' }}>
        <h1>Front&Back</h1>
        <button onClick={fetchMessage}>Get Message from API</button>
        {message && <p>{message}</p>}
      </div>
  );
}

export default App;
