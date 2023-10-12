import React, { useState } from 'react';
import Ably from 'ably';

import  UserList  from './UserList';
import { CloseCreateChannel } from '../assets';

const ChannelNameInput = ({ channelName = '', setChannelName }) => {
    const handleChange = (event) => {
        event.preventDefault();

        setChannelName(event.target.value);
    }

    return (
        <div className="channel-name-input__wrapper">
            <p>Name</p>
            <input value={channelName} onChange={handleChange} placeholder="channel-name" />
            <p>Add Members</p>
        </div>
    )
}

const EditChannel = ({ setIsEditing }) => {
    const ably = new Ably.Realtime({ key: 'api key' }); // Replace with your Ably API key
    const channel = ably.channels.get('YOUR_CHANNEL_NAME'); // Replace with your channel name
    const [channelName, setChannelName] = useState('');

    const [selectedUsers, setSelectedUsers] = useState([]);

    const updateChannel = async (event) => {
        event.preventDefault();

        const nameChanged = channelName !== channel.name;

        if (nameChanged) {
            await channel.setName(channelName);
        }

        if (selectedUsers.length) {
            // Assuming selectedUsers is an array of user IDs
            await channel.addMembers(selectedUsers);
        }

        setChannelName('');
        setIsEditing(false);
        setSelectedUsers([]);
    }

    return (
        <div className="edit-channel__container">
            <div className="edit-channel__header">
                <p>Edit Channel</p>
                <CloseCreateChannel setIsEditing={setIsEditing} />
            </div>
            <ChannelNameInput channelName={channelName} setChannelName={setChannelName} />
            <UserList setSelectedUsers={setSelectedUsers} />
            <div className="edit-channel__button-wrapper" onClick={updateChannel}>
                <p>Save Changes</p>
            </div>
        </div>
    )
}

export default EditChannel;
