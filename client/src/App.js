import './App.css';
import io from 'socket.io-client';
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:5000");

function App() {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const sendMessage = () => {
    socket.emit("send_message", { message });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Message..."
        onChange={(event) => {
          setMessage(event.target.value);
        }} />
      <button onClick={sendMessage}>Send</button>
      <h1>Message: </h1>
      {messageReceived}
    </div>
  );
}

export default App;
