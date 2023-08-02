'use client';

import Link from 'next/link';
import LoginButton from './LoginButton';

const Navbar = () => {
    return (
        <>
            <div className='w-full flex h-32 backdrop-blur-3xl z-20 px-24'>
                <Link
                    href={'/'}
                    className='font-primary cursor-pointer text-4xl h-full items-center flex'
                >
                    BLOG
                </Link>
                <div className='full-size items-center text-xl space-x-8 flex justify-end'>
                    <div className='cursor-pointer'>Contact</div>
                    <div className='cursor-pointer'>Contact</div>
                    <div className='cursor-pointer'>Contact</div>
                    <div className='cursor-pointer'>Contact</div>
                    <LoginButton />
                </div>
            </div>
        </>
    );
};

export default Navbar;
