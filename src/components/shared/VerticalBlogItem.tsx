'use client';

import { EyeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { convertParamToCategory } from '~/helper/ConvertCategory';
import { formatDate } from '~/helper/FormatDate';
import { formatNumber } from '~/helper/FormatNumber';
import { Blog } from '~/type';

interface BlogItemProp {
    blog: Blog;
    hideAuthor: boolean;
}

const VerticalBlogItem = ({ blog, hideAuthor }: BlogItemProp) => {
    const router = useRouter();

    return (
        <div className='absolute-center flex-col'>
            <div className='flex-col w-[300px] h-[360px]'>
                <img
                    src='/test.jpg'
                    alt=''
                    onClick={() => router.push(`/blog/${blog.slug}`)}
                    className=' xl:h-[150px] 2xl:h-[200px] w-[300px] h-[200px] cursor-pointer object-cover'
                />
                <div className='px-4 mt-2 w-[300px]'>
                    <Link
                        href={`/category/${blog.category}`}
                        className='text-base flex text-gray-600 hover:text-black items-start w-full'
                    >
                        {convertParamToCategory(blog.category)}
                    </Link>
                    <div className='w-full text-2xl items-center my-2 font-bold'>
                        <Link
                            href={`/blog/${blog.slug}`}
                            className='cursor-pointer line-clamp-2 '
                        >
                            {blog?.title}
                        </Link>
                    </div>
                    <div className='line-clamp-2'>{blog.desc}</div>
                </div>
            </div>
            <div className='w-[300px] flex space-x-4 px-4 my-1 items-center'>
                {!hideAuthor && (
                    <div className='flex space-x-2 items-center'>
                        <img
                            onClick={() =>
                                router.push(`/user/${blog.author.googleId}`)
                            }
                            src={blog?.author?.avatar}
                            alt=''
                            className='w-10 h-10 cursor-pointer rounded-full'
                        />
                        <div className='flex flex-col'>
                            <Link
                                href={`/user/${blog.author.googleId}`}
                                className='font-bold cursor-pointer text-base'
                            >
                                {blog?.author?.name}
                            </Link>
                            <div className='font-primary text-base'>
                                {formatDate(blog.createdAt)}
                            </div>
                        </div>
                    </div>
                )}
                {hideAuthor && (
                    <div className='flex w-[300px] h-6'>
                        <div className='font-primary text-base'>
                            {formatDate(blog.createdAt)}
                        </div>
                        <div className='flex flex-grow'></div>
                        <Link
                            href={`/blog/${blog.slug}`}
                            className='items-center flex'
                        >
                            <EyeIcon className='w-6 h-6 mr-2' />
                            <p className='font-primary text-base'>
                                {formatNumber(blog.views)}
                            </p>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VerticalBlogItem;
