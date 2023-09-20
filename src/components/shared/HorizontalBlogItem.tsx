'use client';

import {
    BookmarkIcon,
    ChatBubbleBottomCenterIcon,
    EyeIcon,
    HeartIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { convertParamToCategory } from '~/helper/ConvertCategory';
import { formatDate } from '~/helper/FormatDate';
import { formatNumber } from '~/helper/FormatNumber';
import { Blog } from '~/type';

interface HorizontalBlogItemProps {
    blog: Blog;
    likesCountMap: Record<string, number>;
}

const HorizontalBlogItem = ({
    blog,
    likesCountMap,
}: HorizontalBlogItemProps) => {
    const router = useRouter();

    const [like, setLike] = useState<boolean>(blog.userHasLiked);
    const [save, setSave] = useState<boolean>(blog.userHasSaved);

    const handleLike = async () => {
        try {
            const response = await fetch(
                `http://localhost:5000/api/blog/like/${blog.slug}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({}),
                    credentials: 'include',
                },
            );

            if (!response.ok) {
                throw new Error('Error liking post');
            }

            // Đảm bảo cập nhật giá trị mới của 'like'
            const newLikeValue = !like;
            setLike(newLikeValue);

            // Cập nhật 'likesCountMap' dựa trên giá trị mới của 'like'
            likesCountMap[blog.slug] = newLikeValue
                ? (likesCountMap[blog.slug] || 0) + 1
                : (likesCountMap[blog.slug] || 0) - 1;
        } catch (error) {
            console.error('Error liking post:', error);
        }

        console.log(likesCountMap);
    };

    const handleSave = async () => {
        try {
            const response = await fetch(
                `http://localhost:5000/api/blog/save/${blog.slug}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({}),
                    credentials: 'include',
                },
            );

            if (!response.ok) {
                throw new Error('Error saving post');
            }

            setSave(!save);
        } catch (error) {
            console.error('Error saving post:', error);
        }
    };

    return (
        <div className='lg:w-[800px] md:w-[700px] 2xl:w-[1000px] w-[320px] sm:w-[700px] sm:h-52 flex h-40 md:h-52'>
            <div className=''>
                <img
                    src='/test.jpg'
                    alt=''
                    onClick={() => router.push(`/blog/${blog.slug}`)}
                    className='sm:h-52 sm:w-64  w-32 h-32 object-cover'
                />
            </div>
            <div className='xl:mx-6 mx-2 w-[200px] sm:w-[500px] xl:w-[700px]'>
                <div className='flex items-center'>
                    <Link
                        href={`/category/${blog.category}`}
                        className='text-base text-gray-600 hover:text-black'
                    >
                        {convertParamToCategory(blog.category)}
                    </Link>
                    <div className='flex-grow'></div>
                    <button onClick={handleSave} className='items-center flex'>
                        <BookmarkIcon
                            style={{
                                fill: save ? '#2563EB' : '#fff',
                                stroke: save ? '#2563EB' : '#000',
                            }}
                            className='w-7 h-7 mr-2'
                        />
                    </button>
                </div>
                <div className='text-2xl my-1 font-bold'>
                    <Link
                        href={`/blog/${blog.slug}`}
                        className='line-clamp-1 md:line-clamp-2 cursor-pointer'
                    >
                        {/* {blog?.title} */}
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Nesciunt cupiditate officia id sequi natus quia iure
                        ipsa. Aspernatur itaque earum quisquam totam rerum culpa
                        aperiam, cumque natus dolor voluptatem deleniti?
                    </Link>
                </div>

                <div className='text-base'>
                    <div className='line-clamp-1 md:line-clamp-2'>
                        {blog?.desc}
                    </div>
                </div>

                <div className='flex my-1 lg:my-2 space-x-2 items-center'>
                    <img
                        onClick={() =>
                            router.push(`/user/${blog.author.googleId}`)
                        }
                        src={blog?.author?.avatar}
                        alt=''
                        className='w-12 h-12 cursor-pointer rounded-full'
                    />
                    <div
                        onClick={() =>
                            router.push(`/user/${blog.author.googleId}`)
                        }
                        className='font-bold cursor-pointer text-base'
                    >
                        {blog?.author?.name}
                    </div>
                    <div className='font-primary text-base pl-4'>
                        {formatDate(blog.createdAt)}
                    </div>
                    <div className='flex flex-grow'></div>
                    <div className='space-x-3 flex'>
                        <button
                            onClick={handleLike}
                            className='items-center flex'
                        >
                            <HeartIcon
                                style={{
                                    fill: like ? '#FF4081' : '#fff',
                                    stroke: like ? '#FF4081' : '#000',
                                }}
                                className='w-7 h-7 mr-2 cursor-pointer'
                            />
                            <p className='font-primary'>
                                {formatNumber(likesCountMap[blog.slug] || 0)}
                            </p>
                        </button>

                        <Link
                            href={`/blog/${blog.slug}`}
                            className='items-center flex'
                        >
                            <EyeIcon className='w-7 h-7 mr-2' />
                            <p className='font-primary'>
                                {formatNumber(blog.views)}
                            </p>
                        </Link>

                        <Link
                            href={`/blog/${blog.slug}`}
                            className='items-center flex'
                        >
                            <ChatBubbleBottomCenterIcon className='w-7 h-7 mr-2' />
                            <p className='font-primary'> {formatNumber(120)}</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HorizontalBlogItem;
