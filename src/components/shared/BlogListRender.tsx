'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Blog } from '~/type';
import VerticalBlogItem from './VerticalBlogItem';

interface BlogListRenderProps {
    blogs: Blog[];
    hideAuthor: boolean;
}

const BlogListRender = ({ blogs, hideAuthor }: BlogListRenderProps) => {
    const [pageNumber, setPageNumber] = useState(0);
    const blogsPerPage = 9;
    const pagesVisited = pageNumber * blogsPerPage;

    const pageCount = Math.ceil(blogs?.length / blogsPerPage);

    const changePage = ({ selected }: any) => {
        setPageNumber(selected);
    };

    return (
        <>
            <div className='w-full flex flex-wrap absolute-center'>
                {blogs &&
                    blogs
                        .slice(pagesVisited, pagesVisited + blogsPerPage)
                        .map((blog: Blog) => (
                            <div className='m-6' key={blog.slug}>
                                <VerticalBlogItem
                                    blog={blog}
                                    hideAuthor={hideAuthor}
                                />
                            </div>
                        ))}
            </div>
            <ReactPaginate
                previousLabel={<ChevronLeftIcon className='w-10 h-10' />}
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
        </>
    );
};

export default BlogListRender;
