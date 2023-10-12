import React, { useState, useEffect } from 'react';
import { Realtime } from 'ably';
import HospitalIcon from './hospital.png';
import LogoutIcon from './logout.png';
import ChannelSearch  from './ChannelSearch'; // Import your components
import TeamChannelList from './TeamChannelList'; 
import TeamChannelPreview  from './TeamChannelPreview'; 


const ably = new Realtime({
  key: 'api key', // Replace with your Ably API key
});

const SideBar = ({ logout }) => (
  <div className="channel-list__sidebar">
    <div className="channel-list__sidebar__icon1">
      <div className="icon1__inner">
        <img src={HospitalIcon} alt="Hospital" width="30" />
      </div>
    </div>
    <div className="channel-list__sidebar__icon2">
      <div className="icon1__inner" onClick={logout}>
        <img src={LogoutIcon} alt="Logout" width="30" />
      </div>
    </div>
  </div>
);

const CompanyHeader = () => (
  <div className="channel-list__header">
    <p className="channel-list__header__text">Medical Pager</p>
  </div>
);

const ChannelListContent = ({ setIsCreating, setCreateType, setIsEditing }) => {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    const channel = ably.channels.get('your-channel-name'); // Replace with your Ably channel name

    channel.subscribe((message) => {
      // Handle incoming messages or events
      console.log('Received message:', message.data);
    });

    channel.presence.subscribe('enter', (member) => {
      // Handle member entering the channel
      console.log('Member entered:', member.clientId);
    });

    channel.presence.subscribe('leave', (member) => {
      // Handle member leaving the channel
      console.log('Member left:', member.clientId);
    });

    // Fetch the list of channels from Ably and update the state
    ably.channels
      .list()
      .then((channelPage) => {
        const channelArray = channelPage.items.map((channel) => ({
          id: channel.name,
          name: channel.name,
          type: 'messaging', // You can customize the type as needed
        }));
        setChannels(channelArray);
      })
      .catch((error) => {
        console.error('Error fetching channels:', error);
      });

    return () => {
      // Unsubscribe and clean up when the component unmounts
      channel.unsubscribe();
    };
  }, []);

  const logout = () => {
    // Implement your logout logic here
    // ...

    // Example: Redirect to login page
    // window.location.href = '/login';
  };

  return (
    <>
      <SideBar logout={logout} />
      <div className="channel-list__list__wrapper">
        <CompanyHeader />
        <ChannelSearch />
        {/* Render your channel list using the 'channels' state */}
        <ul>
          {channels.map((channel) => (
            <li key={channel.id}>
              {channel.name} ({channel.type})
            </li>
          ))}
        </ul>
        {/* Include your TeamChannelList and TeamChannelPreview components as needed */}
        <TeamChannelList
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
        />
        <TeamChannelPreview />
      </div>
    </>
  );
};

const ChannelListContainer = ({ setCreateType, setIsCreating, setIsEditing }) => {
  return (
    <div className="channel-list__container">
      <ChannelListContent setIsCreating={setIsCreating} setCreateType={setCreateType} setIsEditing={setIsEditing} />
    </div>
  );
};

export default ChannelListContainer;






