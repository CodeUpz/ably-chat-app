import React, { useState, useEffect } from 'react';

const ChannelInner = ({ setIsEditing }) => {
  const [giphyState, setGiphyState] = useState(false);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  useEffect(() => {
    const channel = ably.channels.get('channelName');

    channel.subscribe((message) => {
      // Handle incoming messages
      setMessages((prevMessages) => [...prevMessages, message.data]);
    });

    return () => {
      // Unsubscribe when the component unmounts
      channel.unsubscribe();
    };
  }, []);

  const sendMessage = () => {
    const channel = ably.channels.get('channelName');
    channel.publish('message', messageInput);

    // Clear the input field and update the messages
    setMessageInput('');
    setGiphyState(false);
  };

  return (
    <div>
      {/* Your UI components here */}
      <div>
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
    </div>
  );
};

export default ChannelInner;
