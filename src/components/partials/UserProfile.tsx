import { Menu } from '@headlessui/react';
import Link from 'next/link';
import { User } from '~/type';

interface UserProfileProps {
    user: User;
    handleLogout: () => void;
}

const UserProfile = ({ user, handleLogout }: UserProfileProps) => {
    return (
        <>
            <Menu as='div' className='relative inline-block text-left'>
                <div>
                    <Menu.Button className='focus:outline-none'>
                        <img
                            src={user.avatar}
                            alt=''
                            className='w-14 h-14 rounded-full cursor-pointer'
                        />
                    </Menu.Button>
                </div>
                <Menu.Items
                    className='origin-top-right absolute z-20 right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-black ring-opacity-5 focus:outline-none'
                    as='ul'
                >
                    <Menu.Item as='li'>
                        {({ active }) => (
                            <Link
                                href={`/user/${user.googleId}`}
                                className={`${
                                    active
                                        ? 'bg-gray-100 text-gray-900'
                                        : 'text-gray-700'
                                } block px-4 py-2 text-sm transition duration-300 ease-in-out hover:bg-gray-100`}
                            >
                                Edit Profile
                            </Link>
                        )}
                    </Menu.Item>
                    <Menu.Item as='li'>
                        {({ active }) => (
                            <button
                                onClick={handleLogout}
                                className={`${
                                    active
                                        ? 'bg-gray-100 text-gray-900'
                                        : 'text-gray-700'
                                } block px-4 py-2 text-sm transition duration-300 ease-in-out hover:bg-gray-100`}
                            >
                                Sign Out
                            </button>
                        )}
                    </Menu.Item>
                </Menu.Items>
            </Menu>
        </>
    );
};

export default UserProfile;
