'use client';

import { Tab } from '@headlessui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import HorizontalBlogItem from '~/components/shared/HorizontalBlogItem';
import { Blog, User } from '~/type';

interface Data {
    blogs: Blog[];
    users: User[];
}

const SearchPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const search = searchParams.get('search');
    const [selectedIndex, setSelectedIndex] = useState(0);

    const [blogList, setBlogList] = useState<Blog[]>([]);
    const [userList, setUserList] = useState<User[]>([]);
    const [likesCountMap, setLikesCountMap] = useState<Record<string, number>>(
        {},
    );

    const [pageNumber, setPageNumber] = useState(0);
    const blogsPerPage = 8;
    const pagesVisited = pageNumber * blogsPerPage;

    const pageCount = Math.ceil(blogList.length / blogsPerPage);

    const changePage = ({ selected }: any) => {
        setPageNumber(selected);
    };

    const [userPageNumber, setUserPageNumber] = useState(0);
    const usersPerPage = 8;
    const userPagesVisited = userPageNumber * usersPerPage;

    const pageUserCount = Math.ceil(userList.length / usersPerPage);

    const changeUserPage = ({ selected }: any) => {
        setUserPageNumber(selected);
    };

    useEffect(() => {
        try {
            fetch(`http://localhost:5000/api/blog/search`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ search }),
            })
                .then((response) => response.json())
                .then((data: Data) => {
                    setBlogList(data.blogs);
                    setUserList(data.users);

                    const likesMap: Record<string, number> = {};
                    data.blogs.forEach((blog: Blog) => {
                        likesMap[blog.slug] = Array.isArray(blog.likes)
                            ? blog.likes.length
                            : 0;
                    });

                    setLikesCountMap(likesMap);
                })
                .catch((error) => {
                    console.error(error);
                });
        } catch (error) {
            console.error('Error searching blogs:', error);
        }
    }, [search]);

    return (
        <>
            <div className='w-full min-h-screen '>
                <div className='w-full h-40 font-primary absolute-center flex-col'>
                    <div className='text-xl'>Kết quả tìm kiếm cho:</div>
                    <div className='text-3xl mt-3 font-bold uppercase'>
                        {search}
                    </div>
                </div>
                <div className='w-full h-full flex mx-auto justify-center'>
                    <div className='hidden sm:flex mx-12 items-center full-size space-y-12 flex-col'>
                        <Tab.Group
                            selectedIndex={selectedIndex}
                            onChange={setSelectedIndex}
                        >
                            <Tab.List className='w-full absolute-center'>
                                <Tab
                                    className={({ selected }) =>
                                        classNames(
                                            'absolute-center h-12 w-[150px] rounded-xl focus:outline-none',
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
                                            'absolute-center h-12 w-[150px] rounded-xl focus:outline-none',
                                            selected
                                                ? 'bg-black text-white'
                                                : 'text-black',
                                        )
                                    }
                                >
                                    Người dùng
                                </Tab>
                            </Tab.List>
                            <Tab.Panels>
                                <Tab.Panel className='flex full-size space-y-12 flex-col'>
                                    {blogList &&
                                        blogList
                                            .slice(
                                                pagesVisited,
                                                pagesVisited + blogsPerPage,
                                            )
                                            .map((blog: Blog) => (
                                                <div key={blog.slug}>
                                                    <HorizontalBlogItem
                                                        blog={blog}
                                                        likesCountMap={
                                                            likesCountMap
                                                        }
                                                    />
                                                </div>
                                            ))}
                                    <ReactPaginate
                                        previousLabel={
                                            <ChevronLeftIcon className='w-10 h-10' />
                                        }
                                        nextLabel={
                                            <ChevronRightIcon className='w-10 h-10' />
                                        }
                                        pageCount={pageCount}
                                        onPageChange={changePage}
                                        containerClassName={'pagination'}
                                        previousLinkClassName={'previous_page'}
                                        nextLinkClassName={'next_page'}
                                        disabledClassName={
                                            'pagination_disabled'
                                        }
                                        activeClassName={'pagination_active'}
                                        pageLinkClassName={'page_link'}
                                    />
                                </Tab.Panel>
                                <Tab.Panel className='flex full-size space-y-8 flex-col'>
                                    {userList &&
                                        userList
                                            .slice(
                                                userPagesVisited,
                                                userPagesVisited + usersPerPage,
                                            )
                                            .map((user: User) => (
                                                <div key={user.googleId}>
                                                    <div
                                                        onClick={() =>
                                                            router.push(
                                                                `/user/${user.googleId}`,
                                                            )
                                                        }
                                                        className='w-96 h-24 border hover:bg-slate-100 rounded-2xl flex items-center cursor-pointer px-6'
                                                    >
                                                        <img
                                                            onClick={() =>
                                                                router.push(
                                                                    `/user/${user.googleId}`,
                                                                )
                                                            }
                                                            src={user.avatar}
                                                            alt=''
                                                            className='w-12 h-12 cursor-pointer rounded-full mr-4'
                                                        />
                                                        <div
                                                            onClick={() =>
                                                                router.push(
                                                                    `/user/${user.googleId}`,
                                                                )
                                                            }
                                                            className='font-bold w-80 h-12 line-clamp-1 text-base flex items-center'
                                                        >
                                                            {user.name}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                    <ReactPaginate
                                        previousLabel={
                                            <ChevronLeftIcon className='w-10 h-10' />
                                        }
                                        nextLabel={
                                            <ChevronRightIcon className='w-10 h-10' />
                                        }
                                        pageCount={pageUserCount}
                                        onPageChange={changeUserPage}
                                        containerClassName={'pagination'}
                                        previousLinkClassName={'previous_page'}
                                        nextLinkClassName={'next_page'}
                                        disabledClassName={
                                            'pagination_disabled'
                                        }
                                        activeClassName={'pagination_active'}
                                        pageLinkClassName={'page_link'}
                                    />
                                </Tab.Panel>
                            </Tab.Panels>
                        </Tab.Group>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchPage;
