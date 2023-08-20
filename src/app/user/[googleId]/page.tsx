'use client';

import { Tab } from '@headlessui/react';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import BlogListRender from '~/components/shared/BlogListRender';
import { Blog, Draft, User } from '~/type';

const ProfilePage = ({ params }: { params: { googleId: string } }) => {
    const [user, setUser] = useState<User>();
    const [writedBlogs, setWritedBlogs] = useState<Blog[]>([]);
    const [savedBlogs, setSavedBlogs] = useState<Blog[]>([]);
    const [drafts, setDrafts] = useState<Draft[]>([]);
    const router = useRouter();
    const [shouldRefetch, setShouldRefetch] = useState(true);

    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        if (shouldRefetch) {
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
                    setDrafts(data.drafts);

                    setShouldRefetch(false);
                })
                .catch((error) => {
                    console.error(error);

                    setShouldRefetch(false);
                });
        }
    }, [shouldRefetch]);

    const goToDraft = async (id: string) => {
        await router.push(`/blog/draft/${id}`);
    };

    const handleDeleteDraft = async (id: string) => {
        try {
            await fetch(`http://localhost:5000/api/draft/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            toast.success('Xóa nháp thành công');
            setShouldRefetch(true);
        } catch (error) {
            toast.error('Xóa nháp thất bại');
            console.error(error);
        }
    };

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
                                        'absolute-center h-12 w-[150px]  rounded-xl',
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
                                        'absolute-center h-12 w-[150px]  rounded-xl',
                                        selected
                                            ? 'bg-black text-white'
                                            : 'text-black',
                                    )
                                }
                            >
                                Đã lưu
                            </Tab>
                            <Tab
                                className={({ selected }) =>
                                    classNames(
                                        'absolute-center h-12 w-[150px]  rounded-xl',
                                        selected
                                            ? 'bg-black text-white'
                                            : 'text-black',
                                    )
                                }
                            >
                                Bài nháp
                            </Tab>
                        </Tab.List>
                        <Tab.Panels>
                            <Tab.Panel>
                                <BlogListRender
                                    blogs={writedBlogs}
                                    hideAuthor={true}
                                />
                            </Tab.Panel>
                            <Tab.Panel>
                                <BlogListRender
                                    blogs={savedBlogs}
                                    hideAuthor={true}
                                />
                            </Tab.Panel>
                            <Tab.Panel>
                                <div className='justify-center mt-12 flex flex-wrap'>
                                    {drafts &&
                                        drafts.map(
                                            (draft: Draft, index: number) => (
                                                <div
                                                    className='flex w-[600px] items-center px-8 m-4 h-20 border'
                                                    key={index}
                                                >
                                                    <div className='w-[200px] font-primary text-xl font-bold'>
                                                        <div className='line-clamp-1'>
                                                            {draft.title}
                                                        </div>
                                                    </div>
                                                    <div className='flex flex-grow'></div>
                                                    <div className='space-x-2 flex font-primary'>
                                                        <div
                                                            onClick={() =>
                                                                goToDraft(
                                                                    draft._id,
                                                                )
                                                            }
                                                            className='absolute-center cursor-pointer w-28 h-10 group hover:bg-gray-500 transition duration-300 rounded-xl'
                                                        >
                                                            <PencilSquareIcon className='w-6 h-6 stroke-gray-500 group-hover:stroke-white' />
                                                            <div className='mx-1 group-hover:text-white'>
                                                                Tiếp tục
                                                            </div>
                                                        </div>
                                                        <div
                                                            onClick={() =>
                                                                handleDeleteDraft(
                                                                    draft._id,
                                                                )
                                                            }
                                                            className='absolute-center cursor-pointer w-28 h-10 group hover:bg-rose-500 transition duration-300 rounded-xl'
                                                        >
                                                            <TrashIcon className='w-6 h-6 stroke-rose-500 group-hover:stroke-white' />
                                                            <div className='mx-1 group-hover:text-white'>
                                                                Xóa
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ),
                                        )}
                                </div>
                            </Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>
                </div>
            </div>
        </>
    );
};

export default ProfilePage;
