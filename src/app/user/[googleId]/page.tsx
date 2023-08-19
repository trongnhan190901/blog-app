'use client';
import { Tab } from '@headlessui/react';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import BlogListRender from '~/components/shared/BlogListRender';
import VerticalBlogItem from '~/components/shared/VerticalBlogItem';
import { Blog, User } from '~/type';

const ProfilePage = ({ params }: { params: { googleId: string } }) => {
    const [user, setUser] = useState<User>();
    const [writedBlogs, setWritedBlogs] = useState<Blog[]>([]);
    const [savedBlogs, setSavedBlogs] = useState<Blog[]>([]);

    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        fetch(`http://localhost:5000/api/user/${params.googleId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setUser(data.user);
                setWritedBlogs(data.blogs);
                setSavedBlogs(data.savedBlogs);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <>
            <div className='w-full min-h-screen'>
                <div className='xl:w-3/4 w-[95%] mx-auto h-full'>
                    <div className='flex w-full h-40 items-center'>
                        <img
                            src={user?.avatar}
                            alt=''
                            className='xl:w-28 xl:h-28 w-20 h-20 mx-4 rounded-full'
                        />
                        <div className='font-semibold font-primary text-2xl'>
                            {user?.name}
                        </div>
                    </div>
                    <Tab.Group
                        selectedIndex={selectedIndex}
                        onChange={setSelectedIndex}
                    >
                        <Tab.List className='w-full flex'>
                            <Tab
                                className={({ selected }) =>
                                    classNames(
                                        'absolute-center h-1/4 w-full',
                                        selected
                                            ? 'bg-black text-white'
                                            : 'text-black',
                                    )
                                }
                            >
                                Bài viết
                            </Tab>
                            <Tab
                                className={({ selected }) =>
                                    classNames(
                                        'absolute-center h-1/4 w-full',
                                        selected
                                            ? 'bg-black text-white'
                                            : 'text-black',
                                    )
                                }
                            >
                                Đã lưu
                            </Tab>
                            {/* <Tab></Tab> */}
                        </Tab.List>
                        <Tab.Panels>
                            <Tab.Panel>
                                <BlogListRender
                                    blogs={writedBlogs}
                                    hideAuthor={true}
                                />
                            </Tab.Panel>
                            <Tab.Panel>
                                <div className='w-full flex flex-wrap absolute-center'>
                                    {savedBlogs &&
                                        savedBlogs.map((blog: Blog) => (
                                            <div
                                                className='m-6'
                                                key={blog.slug}
                                            >
                                                <VerticalBlogItem
                                                    blog={blog}
                                                    hideAuthor={true}
                                                />
                                            </div>
                                        ))}
                                </div>
                            </Tab.Panel>
                            {/* <Tab.Panel></Tab.Panel> */}
                        </Tab.Panels>
                    </Tab.Group>
                </div>
            </div>
        </>
    );
};

export default ProfilePage;
