'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { convertParamToCategory } from '~/helper/ConvertCategory';
import { Blog } from '~/type';

interface HorizonSmallBlogItemProps {
    blog: Blog;
    likesCountMap: Record<string, number>;
}

const HorizontalSmallBlogItem = ({
    blog,
    likesCountMap,
}: HorizonSmallBlogItemProps) => {
    const router = useRouter();

    return (
        <div className='w-[320px] flex h-72 flex-col mx-auto'>
            <div className='flex space-x-2'>
                <img
                    src='/test.jpg'
                    alt=''
                    onClick={() => router.push(`/blog/${blog.slug}`)}
                    className='sm:h-52 sm:w-64  w-36 h-32 object-cover'
                />
                <div className='flex my-1 lg:my-2 space-x-2 items-center'>
                    <img
                        onClick={() =>
                            router.push(`/user/${blog.author.googleId}`)
                        }
                        src={blog?.author?.avatar}
                        alt=''
                        className='w-12 h-12 cursor-pointer rounded-full'
                    />
                    <Link
                        href={`/user/${blog.author.googleId}`}
                        className='font-bold cursor-pointer text-base'
                    >
                        {blog?.author?.name}
                    </Link>
                </div>
            </div>
            <div className='xl:mx-6 mx-2 mt-2 w-[320px] sm:w-[500px] xl:w-[700px] h-[100px]'>
                <Link
                    href={`/category/${blog.category}`}
                    className='text-base text-gray-600 hover:text-black flex items-center'
                >
                    {convertParamToCategory(blog.category)}
                </Link>
                <div className='text-2xl my-1 font-bold'>
                    <Link
                        href={`/blog/${blog.slug}`}
                        className='line-clamp-2 cursor-pointer'
                    >
                        {/* {blog?.title} */}
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Nesciunt cupiditate officia id sequi natus quia iure
                        ipsa. Aspernatur itaque earum quisquam totam rerum culpa
                        aperiam, cumque natus dolor voluptatem deleniti?
                    </Link>
                </div>

                <div className='text-base'>
                    <div className='line-clamp-2'>{blog?.desc}</div>
                </div>
            </div>
        </div>
    );
};

export default HorizontalSmallBlogItem;
