'use client';

import Link from 'next/link';
import LoginButton from './LoginButton';

const Navbar = () => {
    return (
        <>
            <div className='w-full flex h-32 z-10 backdrop-blur-3xl px-24'>
                <Link
                    href={'/'}
                    className='font-primary cursor-pointer text-4xl h-full items-center flex'
                >
                    BLOG
                </Link>
                <div className='full-size items-center text-xl flex justify-end'>
                    <ul>
                        <li className='group relative mx-6 cursor-pointer tracking-wide hover:underline hover:underline-offset-8'>
                            <div className='font-bold text-gray-500 hover:text-black'>
                                Danh mục
                            </div>
                            <div className='absolute -ml-6 hidden h-auto py-6 group-hover:flex'>
                                <ul className='top-0 w-96 bg-[#fcf8ee] py-4 px-6 shadow'>
                                    <li className='py-2'>
                                        <Link
                                            href={'/category/suc-khoe-sac-dep'}
                                            className='flex cursor-pointer font-bold text-gray-500 hover:text-black'
                                        >
                                            Sức khỏe - Sắc đẹp
                                        </Link>
                                    </li>
                                    <li className='py-2'>
                                        <Link
                                            href={'/category/Du lịch - Ẩm thực'}
                                            className='flex cursor-pointer font-bold text-gray-500 hover:text-black'
                                        >
                                            Du lịch - Ẩm thực
                                        </Link>
                                    </li>
                                    <li className='py-2'>
                                        <Link
                                            href={
                                                '/category/Nghệ thuật - Văn hóa'
                                            }
                                            className='flex cursor-pointer font-bold text-gray-500 hover:text-black'
                                        >
                                            Nghệ thuật - Văn hóa
                                        </Link>
                                    </li>

                                    <li className='py-2'>
                                        <Link
                                            href={
                                                '/category/Tâm lý - Sức khỏe tinh thần'
                                            }
                                            className='flex cursor-pointer font-bold text-gray-500 hover:text-black'
                                        >
                                            Tâm lý - Sức khỏe tinh thần
                                        </Link>
                                    </li>
                                    <li className='py-2'>
                                        <Link
                                            href={
                                                '/category/Lối sống - Gia đình'
                                            }
                                            className='flex cursor-pointer font-bold text-gray-500 hover:text-black'
                                        >
                                            Lối sống - Gia đình
                                        </Link>
                                    </li>
                                    <li className='py-2'>
                                        <Link
                                            href={
                                                '/category/Giáo dục - Học tập'
                                            }
                                            className='flex cursor-pointer font-bold text-gray-500 hover:text-black'
                                        >
                                            Giáo dục - Học tập
                                        </Link>
                                    </li>
                                    <li className='py-2'>
                                        <Link
                                            href={
                                                '/category/Thời trang - Phong cách'
                                            }
                                            className='flex cursor-pointer font-bold text-gray-500 hover:text-black'
                                        >
                                            Thời trang - Phong cách
                                        </Link>
                                    </li>
                                    <li className='py-2'>
                                        <Link
                                            href={
                                                '/category/Hài hước - Giải trí'
                                            }
                                            className='flex cursor-pointer font-bold text-gray-500 hover:text-black'
                                        >
                                            Hài hước - Giải trí
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                    {/* <div className='cursor-pointer'>Contact</div>
                    <div className='cursor-pointer'>Contact</div>
                    <div className='cursor-pointer'>Contact</div> */}
                    <LoginButton />
                </div>
            </div>
        </>
    );
};

export default Navbar;
