import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export default function ChatBox({ roomId }) {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const socketInstance = io();
    setSocket(socketInstance);

    socketInstance.on('receive-message', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => socketInstance.disconnect();
  }, []);

  const sendMessage = () => {
    socket.emit('send-message', { roomId, message: input });
    setMessages((prev) => [...prev, { message: input }]);
    setInput('');
  };

  return (
    <div>
      <div>
        {messages.map((msg, idx) => (
          <div key={idx}>{msg.message}</div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
