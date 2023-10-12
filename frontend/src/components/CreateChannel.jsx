import React, { useState } from 'react';
import Ably from 'ably';
import UserList  from './UserList';
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

const CreateChannel = ({ createType, setIsCreating }) => {
    const ably = new Ably.Realtime({ key: 'wuxaZA.MFV_ZA:REnbQREr1nRH8xBTWA6Uh5itb7fd1eIRw2Aai5TbGjg' }); // Replace with your Ably API key
    const [selectedUsers, setSelectedUsers] = useState([ably.auth.clientId || '']);
    const [channelName, setChannelName] = useState('');

    const createChannel = async (e) => {
        e.preventDefault();

        try {
            const channel = ably.channels.get(`channel:${channelName}`); // Create a channel with a unique name
            await channel.attach();

            // Add members to the channel
            selectedUsers.forEach(userId => {
                channel.presence.enter(userId);
            });

            setChannelName('');
            setIsCreating(false);
        } catch (error) {
            console.error(error);
        }
    }

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
    )
}

export default CreateChannel;
