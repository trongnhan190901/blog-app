'use client';
import { OutputData } from '@editorjs/editorjs';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Blog {
    _id: string;
    title: string;
    desc: string;
    content: OutputData[];
    author: string;
    category: string;
    approved: boolean;
    createdAt: string;
}

interface User {
    name: string;
    email: string;
    avatar: string;
}

interface Data {
    user: User;
    blogs: Blog[];
}

const ProfilePage = ({ params }: { params: { id: string } }) => {
    const [data, setData] = useState<Data | null>(null);

    useEffect(() => {
        fetch(`http://localhost:5000/api/user/${params.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <>
            <div className='w-full h-screen'>
                <div className='xl:w-3/4 w-[95%] mx-auto h-full'>
                    <div className='flex w-full h-40 items-center'>
                        <img
                            src={data?.user.avatar}
                            alt=''
                            className='xl:w-28 xl:h-28 w-20 h-20 mx-4 rounded-full'
                        />
                        <div className='font-semibold font-primary text-2xl'>
                            {data?.user.name}
                        </div>
                    </div>
                    <div className='w-full flex flex-wrap absolute-center'>
                        {data &&
                            data.blogs.map((blog: Blog) => (
                                <div className='absolute-center flex-col m-6'>
                                    <Link
                                        href={`/blog/${blog._id}`}
                                        className='absolute-center flex-col hover:shadow-md hover:scale-105 transition duration-300 w-[300px] h-[350px]'
                                    >
                                        <img
                                            src='/test.jpg'
                                            alt=''
                                            className='w-[300px] h-[150px] object-cover'
                                        />
                                        <div className='w-[300px] px-4 h-[200px] mt-3'>
                                            <div className='h-6 text-base flex items-start w-full'>
                                                {blog.category}
                                            </div>
                                            <div className='w-full h-16 text-2xl flex  font-bold'>
                                                <div className='line-clamp-2'>
                                                    Lorem ipsum dolor sit amet
                                                    consectetur, adipisicing
                                                    elit. Autem ullam doloremque
                                                    quo
                                                </div>
                                            </div>

                                            <div className='w-full h-12 text-lg flex items-center  my-1'>
                                                <div className='line-clamp-2'>
                                                    Lorem ipsum dolor sit amet
                                                    consectetur, adipisicing
                                                    elit. Autem ullam doloremque
                                                    quo
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfilePage;
