'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import HorizontalBlogItem from '~/components/shared/HorizontalBlogItem';
import { convertParamToCategory } from '~/helper/ConvertCategory';
import { Blog } from '~/type';

const Page = ({ params }: { params: { category: string } }) => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [likesCountMap, setLikesCountMap] = useState<Record<string, number>>(
        {},
    );

    const blogsPerPage = 8;
    const pagesVisited = pageNumber * blogsPerPage;

    const pageCount = Math.ceil(blogs.length / blogsPerPage);

    const changePage = ({ selected }: any) => {
        setPageNumber(selected);
    };

    const categoryName = convertParamToCategory(params.category);

    useEffect(() => {
        fetch(`http://localhost:5000/api/category/${params.category}`, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((data: Blog[]) => {
                setBlogs(data);

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

    const router = useRouter();

    const userProfile = (id: string) => {
        router.push(`/user/${id}`);
    };

    return (
        <>
            <div className='w-full min-h-screen'>
                <div className='w-full h-96 bg-rose-200'>
                    <div className='full-size absolute-center text-4xl uppercase font-bold'>
                        {categoryName}
                    </div>
                </div>
                <div className='my-12 space-y-12 mx-auto flex flex-col flex-wrap absolute-center'>
                    {blogs &&
                        blogs
                            .slice(pagesVisited, pagesVisited + blogsPerPage)
                            .map((blog: Blog) => (
                                <HorizontalBlogItem
                                    blog={blog}
                                    likesCountMap={likesCountMap}
                                />
                            ))}
                    <ReactPaginate
                        previousLabel={
                            <ChevronLeftIcon className='w-10 h-10' />
                        }
                        nextLabel={<ChevronRightIcon className='w-10 h-10' />}
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
            </div>
        </>
    );
};

export default Page;
