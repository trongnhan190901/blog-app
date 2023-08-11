'use client';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

interface BlogType {
    _id: string;
    title: string;
    desc: string;
    author: any;
    category: string;
    createdAt: string;
}

const BlogList = () => {
    const [blogList, setBlogList] = useState([]);
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
        })
            .then((response) => response.json())
            .then((data) => {
                setBlogList(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    console.log(blogList);

    return (
        <>
            <div className='w-full mt-24 min-h-screen '>
                <div className='w-full h-full flex justify-center mt-2'>
                    <div className='absolute-center full-size space-y-10 flex-col'>
                        {blogList &&
                            blogList
                                .slice(
                                    pagesVisited,
                                    pagesVisited + blogsPerPage,
                                )
                                .map((blog: BlogType) => (
                                    <div className='xl:w-[800px] flex'>
                                        <Link
                                            href={`/blog/${blog._id}`}
                                            className='lg:w-[800px] md:w-[700px] w-[320px] sm:w-[700px] sm:h-52 flex h-32 md:h-52 hover:shadow-md hover:scale-105 transition duration-300'
                                        >
                                            <div className='h-52 w-64'>
                                                <img
                                                    src='/test.jpg'
                                                    alt=''
                                                    className='sm:h-full sm:w-full  w-32 h-32 object-cover'
                                                />
                                            </div>
                                            <div className='mx-6  sm:w-[500px]'>
                                                <div className='h-7 text-base flex items-center'>
                                                    {blog.category}
                                                </div>
                                                <div className='w-full text-2xl my-1 font-bold'>
                                                    <div className='line-clamp-2'>
                                                        {blog?.title}
                                                    </div>
                                                </div>

                                                <div className='w-full text-base'>
                                                    <div className='line-clamp-2'>
                                                        {blog?.desc}
                                                    </div>
                                                </div>

                                                <div className='flex mt-1 h-12 space-x-2 items-center'>
                                                    <img
                                                        src={
                                                            blog?.author?.avatar
                                                        }
                                                        alt=''
                                                        className='w-12 h-12 rounded-full'
                                                    />
                                                    <div className='font-bold text-base'>
                                                        {blog?.author?.name}
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
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
                    <div className='h-full hidden lg:flex 2xl:top-24 xl:top-12 sticky 2xl:right-24 xl:right-16 flex-col'>
                        <div className='2xl:w-[400px] xl:w-[300px] 2xl:h-[850px] xl:h-[700px] bg-rose-200 xl:ml-12 '></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlogList;
