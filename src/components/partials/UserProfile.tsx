import React from 'react';
import { Menu } from '@headlessui/react';

interface User {
    name: string;
    avatar: string;
}

interface UserProfileProps {
    user: User;
}

const UserProfile = ({ user }: UserProfileProps) => {
    return (
        <>
            <Menu as='div' className='relative inline-block text-left'>
                <div>
                    <Menu.Button className='focus:outline-none'>
                        <img
                            src={user.avatar}
                            alt=''
                            className='w-14 h-14 rounded-full cursor-pointer transition duration-300 ease-in-out transform hover:scale-110'
                        />
                    </Menu.Button>
                </div>
                <Menu.Items
                    className='origin-top-right absolute z-20 right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'
                    as='ul'
                >
                    <Menu.Item as='li'>
                        {({ active }) => (
                            <a
                                href='#'
                                className={`${
                                    active
                                        ? 'bg-gray-100 text-gray-900'
                                        : 'text-gray-700'
                                } block px-4 py-2 text-sm transition duration-300 ease-in-out hover:bg-gray-100`}
                            >
                                Edit Profile
                            </a>
                        )}
                    </Menu.Item>
                    <Menu.Item as='li'>
                        {({ active }) => (
                            <a
                                href='#'
                                className={`${
                                    active
                                        ? 'bg-gray-100 text-gray-900'
                                        : 'text-gray-700'
                                } block px-4 py-2 text-sm transition duration-300 ease-in-out hover:bg-gray-100`}
                            >
                                Sign Out
                            </a>
                        )}
                    </Menu.Item>
                </Menu.Items>
            </Menu>
        </>
    );
};

export default UserProfile;
