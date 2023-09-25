import React, { useState, useEffect } from 'react';
import { Realtime } from 'ably';

//import { ChannelListContainer, ChannelContainer, Auth } from './components';

import ChannelListContainer from './components/ChannelListContainer';
import ChannelContainer from './components/ChannelContainer';


import './App.css';

// Function to generate a unique client ID
function generateUniqueClientId() {
  const timestamp = Date.now(); // Get the current timestamp
  const random = Math.floor(Math.random() * 10000); // Generate a random number between 0 and 9999
  return `client-${timestamp}-${random}`;
}

const apiKey = 'wuxaZA.MFV_ZA:REnbQREr1nRH8xBTWA6Uh5itb7fd1eIRw2Aai5TbGjg'; // Replace with your Ably API key
const clientId = generateUniqueClientId(); // Generate a unique client ID

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
      // Disconnect and release resources when the component unmounts
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
