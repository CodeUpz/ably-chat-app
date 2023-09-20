import React, { useState, useEffect } from 'react';
import { Realtime } from 'ably/browser/static/ably-commonjs.js'; // Import Ably library

import { ChannelListContainer, ChannelContainer, Auth } from './components';

import './App.css';

const apiKey = 'YOUR_ABLY_API_KEY'; // Replace with your Ably API key
const clientId = 'YOUR_CLIENT_ID'; // Replace with a unique client ID

const ably = new Realtime({
  key: apiKey,
  clientId: clientId,
});

const App = () => {
  const [createType, setCreateType] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    const channel = ably.channels.get('your_channel_name'); // Replace with your channel name
    setChannel(channel);

    // Connect to Ably with the clientId
    ably.connection.connect();
    
    return () => {
      // Disconnect and release resources when component unmounts
      ably.connection.close();
      channel.detach();
    };
  }, []);

  if (!channel) return <div>Loading...</div>; // Add loading indicator or error handling

  return (
    <div className="app__wrapper">
      <ChannelListContainer
        isCreating={isCreating}
        setIsCreating={setIsCreating}
        setCreateType={setCreateType}
        setIsEditing={setIsEditing}
        channel={channel} // Pass the Ably channel to your components
      />
      <ChannelContainer
        isCreating={isCreating}
        setIsCreating={setIsCreating}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        createType={createType}
        channel={channel} // Pass the Ably channel to your components
      />
    </div>
  );
}

export default App;
