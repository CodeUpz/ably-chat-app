import React, { useState, useEffect } from 'react';
import { configureAbly, useChannel } from "@ably-labs/react-hooks";
import { ResultsDropdown } from './ResultsDropdown';
import { SearchIcon } from '../assets';

const ChannelSearch = ({ setToggleContainer }) => {
  const [ablyInstance, ablyStatus] = configureAbly({ key: 'api key' }); // Rename 'ably' to 'ablyInstance'

  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [teamChannels, setTeamChannels] = useState([]);
  const [directChannels, setDirectChannels] = useState([]);

  // Use the useChannel hook here
  const channel = useChannel('channel_name'); // Replace 'channel_name' with the actual channel name you want to subscribe to
  
  // Subscribe to events on the channel
 useEffect(() => {
    if (channel) {
      channel.subscribe('event_name', (message) => {
        // Handle incoming messages or events from the channel
        console.log('Received message:', message);
      });
    }
  }, [channel]);

  useEffect(() => {
    if (!query) {
      setTeamChannels([]);
      setDirectChannels([]);
    }
  }, [query]);

  const getChannels = async (text) => {
    try {
      const channelResponse = await ablyInstance.channels.list({ name: text }); // Use 'ablyInstance' here
      const userResponse = await ablyInstance.channels.list({ name: text }); // Use 'ablyInstance' here

      const [channels, users] = await Promise.all([channelResponse, userResponse]);

      // Set the found channels in state if there are any
      if (channels.length > 0) {
        setTeamChannels(channels);
      } else {
        setTeamChannels([]); // Clear the state if no channels are found
      }

      // Set the found users in state if there are any
      if (users.length > 0) {
        setDirectChannels(users);
      } else {
        setDirectChannels([]); // Clear the state if no users are found
      }
    } catch (error) {
      setQuery('');
      console.error('Error searching for channels:', error);
    }
  };

  const onSearch = (event) => {
    event.preventDefault();

    setLoading(true);
    setQuery(event.target.value);
    getChannels(event.target.value);
  };

  const setChannel = (selectedChannel) => {
    setQuery('');
    // Handle channel selection logic here
  };

  return (
    <div className="channel-search__container">
      <div className="channel-search__input__wrapper">
        <div className="channel-search__input__icon">
          <SearchIcon />
        </div>
        <input
          className="channel-search__input__text"
          placeholder="Search"
          type="text"
          value={query}
          onChange={onSearch}
        />
      </div>
      {query && (
        <ResultsDropdown
          teamChannels={teamChannels}
          directChannels={directChannels}
          loading={loading}
          setChannel={setChannel}
          setQuery={setQuery}
          setToggleContainer={setToggleContainer}
        />
      )}
    </div>
  );
};

export default ChannelSearch;
