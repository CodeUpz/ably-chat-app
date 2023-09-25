import React from 'react';
import { useAblyContext } from './AblyContext'; // Import Ably context hook

const TeamChannelPreview = ({
  setActiveChannel,
  setIsCreating,
  setIsEditing,
  setToggleContainer,
  channel,
  type,
}) => {
  const { ably } = useAblyContext(); // Access Ably context

  const ChannelPreview = () => (
    <p className="channel-preview__item">
      # {channel?.data?.name || channel?.data?.id}
    </p>
  );

  const DirectPreview = () => {
    const members = Object.values(channel.state.members).filter(
      ({ user }) => user.id !== ably.auth.clientId // Use Ably's client ID
    );

    console.log(members[0]);

    return (
      <div className="channel-preview__item single">
        {/* You can add any custom UI for user information here */}
        <p>{members[0]?.user?.fullName || members[0]?.user?.id}</p>
      </div>
    );
  };

  return (
    <div
      className={
        channel?.id === ably.activeChannel?.id // Use Ably's activeChannel
          ? 'channel-preview__wrapper__selected'
          : 'channel-preview__wrapper'
      }
      onClick={() => {
        setIsCreating(false);
        setIsEditing(false);
        setActiveChannel(channel);
        if (setToggleContainer) {
          setToggleContainer((prevState) => !prevState);
        }
      }}
    >
      {type === 'team' ? <ChannelPreview /> : <DirectPreview />}
    </div>
  );
};

export default TeamChannelPreview;
