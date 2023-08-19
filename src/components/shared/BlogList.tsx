'use client';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Blog } from '~/type';
import HorizontalBlogItem from './HorizontalBlogItem';

const BlogList = () => {
    const [blogList, setBlogList] = useState<Blog[]>([]);
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

    useEffect(() => {
        fetch('http://localhost:5000/api/blog', {
            method: 'GET',
            credentials: 'include',
        })
            .then((response) => response.json())
            .then((data: Blog[]) => {
                setBlogList(data);

                const likesMap: Record<string, number> = {};
                data.forEach((blog: Blog) => {
                    likesMap[blog.slug] = Array.isArray(blog.likes)
                        ? blog.likes.length
                        : 0;
                });

                setLikesCountMap(likesMap);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <>
            <div className='w-full mt-24 min-h-screen '>
                <div className='w-full h-full flex mx-auto justify-center mt-2'>
                    <div className='hidden sm:flex mx-12 items-center full-size space-y-12 flex-col'>
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
                                            likesCountMap={likesCountMap}
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
                            disabledClassName={'pagination_disabled'}
                            activeClassName={'pagination_active'}
                            pageLinkClassName={'page_link'}
                        />
                    </div>
                    <div className='flex sm:hidden full-size space-y-14 flex-col'>
                        {/* {blogList &&
                            blogList
                                .slice(
                                    pagesVisited,
                                    pagesVisited + blogsPerPage,
                                )
                                .map((blog: Blog) => (
                                    <div key={blog._id}>
                                        <HorizontalSmallBlogItem
                                            blog={blog}
                                            likesCountMap={likesCountMap}
                                        />
                                    </div>
                                ))} */}
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
                            disabledClassName={'pagination_disabled'}
                            activeClassName={'pagination_active'}
                            pageLinkClassName={'page_link'}
                        />
                    </div>
                    <div className='h-full hidden lg:flex 2xl:top-24 xl:top-12 sticky 2xl:right-24 xl:right-16 flex-col'>
                        <div className='2xl:w-[400px] xl:w-[300px] 2xl:h-[850px] xl:h-[700px] bg-rose-200 xl:ml-12 '></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlogList;
