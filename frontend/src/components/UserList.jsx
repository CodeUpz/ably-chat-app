import React, { useEffect, useState } from 'react';


//import { Avatar } from '@ably-labs/react-hooks'; // Replace with the actual Ably chat package

import { InviteIcon } from '../assets';

const ListContainer = ({ children }) => {
    return (
        <div className="user-list__container">
            <div className="user-list__header">
                <p>User</p>
                <p>Invite</p>
            </div>
            {children}
        </div>
    )
}

const UserItem = ({ user, setSelectedUsers }) => {
    const [selected, setSelected] = useState(false)

    const handleSelect = () => {
        if (selected) {
            setSelectedUsers((prevUsers) => prevUsers.filter((prevUser) => prevUser !== user.id))
        } else {
            setSelectedUsers((prevUsers) => [...prevUsers, user.id])
        }

        setSelected((prevSelected) => !prevSelected)
    }

    return (
        <div className="user-item__wrapper" onClick={handleSelect}>
            <div className="user-item__name-wrapper">
                <img src={user.image} alt={user.fullName || user.id} className="user-item__avatar" />
                <p className="user-item__name">{user.fullName || user.id}</p>
            </div>
            {selected ? <InviteIcon /> : <div className="user-item__invite-empty" />}
        </div>
    )
}

const UserList = ({ setSelectedUsers }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [listEmpty, setListEmpty] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const initializeAblyClient = async () => {
            // Initialize your Ably client here with your API key and other configuration

            try {
                // Replace this with Ably-specific code to fetch users
                // You might use Ably's presence or channels to retrieve user data
                // Example: const users = await ablyClient.someMethodToFetchUsers();

                // Simulate a response for demonstration purposes
                const users = [
                    { id: 'user1', fullName: 'User 1', image: 'user1.jpg' },
                    { id: 'user2', fullName: 'User 2', image: 'user2.jpg' },
                ];

                if (users.length) {
                    setUsers(users);
                } else {
                    setListEmpty(true);
                }
            } catch (error) {
                setError(true);
            }
            setLoading(false);
        }

        setLoading(true);
        initializeAblyClient();
    }, []);

    if (error) {
        return (
            <ListContainer>
                <div className="user-list__message">
                    Error loading, please refresh and try again.
                </div>
            </ListContainer>
        )
    }

    if (listEmpty) {
        return (
            <ListContainer>
                <div className="user-list__message">
                    No users found.
                </div>
            </ListContainer>
        )
    }

    return (
        <ListContainer>
            {loading ? <div className="user-list__message">
                Loading users...
            </div> : (
                users?.map((user, i) => (
                    <UserItem index={i} key={user.id} user={user} setSelectedUsers={setSelectedUsers} />
                ))
            )}
        </ListContainer>
    )
}

export default UserList;
