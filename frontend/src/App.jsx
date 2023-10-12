import React, { useState, useEffect } from 'react';
import { configureAbly } from "@ably-labs/react-hooks";
import Cookies from 'universal-cookie';


import ChannelListContainer from './components/ChannelListContainer';
import ChannelContainer from './components/ChannelContainer';
import Auth from './components/Auth';

import './App.css';

const cookies = new Cookies();

const apiKey = 'api key'; // Replace with your Ably API key
const authToken = cookies.get('token');

configureAbly(apiKey); // Configure Ably with your API key

const App = () => {
  const [createType, setCreateType] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Connect to Ably using the auth token
    if (authToken) {
      // You should use the Ably client instance from configureAbly here
      const ably = configureAbly(apiKey);
      ably.connectUser({
        id: cookies.get('userId'),
        name: cookies.get('username'),
        fullName: cookies.get('fullName'),
        hashedPassword: cookies.get('hashedPassword'),
        phoneNumber: cookies.get('phoneNumber'),
      });
    }
  }, [authToken]);

  if (!authToken) return <Auth />;

  return (
    <div className="app__wrapper">
      <ChannelListContainer
        isCreating={isCreating}
        setIsCreating={setIsCreating}
        setCreateType={setCreateType}
        setIsEditing={setIsEditing}
      />
      <ChannelContainer
        isCreating={isCreating}
        setIsCreating={setIsCreating}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        createType={createType}
      />
    </div>
  );
};

export default App;
