import React, { useState } from 'react';
import Ably from 'ably';
import  UserList  from './Userlist';
import { CloseCreateChannel } from '../assets';

const ably = new Ably.Realtime({ key: 'api key' }); // Replace with your Ably API key

const ChannelNameInput = ({ channelName = '', setChannelName }) => {
  const handleChange = (event) => {
    event.preventDefault();
    setChannelName(event.target.value);
  };

  return (
    <div className="channel-name-input__wrapper">
      <p>Name</p>
      <input value={channelName} onChange={handleChange} placeholder="channel-name" />
      <p>Add Members</p>
    </div>
  );
};

const CreateChannel = ({ createType, setIsCreating }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [channelName, setChannelName] = useState('');

  const createChannel = () => {
    // Use Ably to create a corresponding Ably channel here
    const ablyChannelName = 'YOUR_ABLY_CHANNEL_NAME'; // Replace with your Ably channel name
    const ablyChannelInstance = ably.channels.get(ablyChannelName);

    // Add Ably-specific logic here, e.g., sending a message to Ably
    ablyChannelInstance.publish('message', { text: 'Channel created' }); // Replace 'message' with your event name

    setChannelName('');
    setIsCreating(false);
    setSelectedUsers([]);
  };

  return (
    <div className="create-channel__container">
      <div className="create-channel__header">
        <p>{createType === 'team' ? 'Create a New Channel' : 'Send a Direct Message'}</p>
        <CloseCreateChannel setIsCreating={setIsCreating} />
      </div>
      {createType === 'team' && <ChannelNameInput channelName={channelName} setChannelName={setChannelName} />}
      <UserList setSelectedUsers={setSelectedUsers} />
      <div className="create-channel__button-wrapper" onClick={createChannel}>
        <p>{createType === 'team' ? 'Create Channel' : 'Create Message Group'}</p>
      </div>
    </div>
  );
};

export default CreateChannel;
