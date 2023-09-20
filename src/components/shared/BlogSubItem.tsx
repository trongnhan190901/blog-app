import {
    BookmarkIcon,
    ChatBubbleBottomCenterIcon,
    HeartIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { formatNumber } from '~/helper/FormatNumber';
import { Blog } from '~/type';

interface BlogSubItemProps {
    blog: Blog;
}

const BlogSubItem = ({ blog }: BlogSubItemProps) => {
    const [like, setLike] = useState<boolean>(blog.userHasLiked);
    const [save, setSave] = useState<boolean>(blog.userHasSaved);

    const router = useRouter();

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

            setLike(!like);

            if (!like) {
                blog.likes.length = blog.likes.length + 1;
            } else {
                blog.likes.length = blog.likes.length - 1;
            }
        } catch (error) {
            console.error('Error liking post:', error);
        }
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
        <>
            <div className='relative'>
                <div className='absolute-center flex-col fixed lg:top-64 top-20 left-64'>
                    <button
                        onClick={handleLike}
                        className='absolute-center flex-col'
                    >
                        <HeartIcon
                            style={{
                                fill: like ? '#FF4081' : '#fff',
                                stroke: like ? '#FF4081' : '#000',
                            }}
                            className='w-7 h-7 cursor-pointer'
                        />
                        <div className='font-primary text-lg mt-2'>
                            {formatNumber(blog.likes.length)}
                        </div>
                    </button>

                    <img
                        onClick={() =>
                            router.push(`/user/${blog?.author.googleId}`)
                        }
                        src={blog?.author?.avatar}
                        alt=''
                        className='w-14 h-14 cursor-pointer rounded-full flex-col flex my-4'
                    />

                    <button
                        onClick={handleSave}
                        className='items-center flex flex-col'
                    >
                        <BookmarkIcon
                            style={{
                                fill: save ? '#2563EB' : '#fff',
                                stroke: save ? '#2563EB' : '#000',
                            }}
                            className='w-7 h-7'
                        />
                    </button>

                    <Link
                        href={`/blog/${blog.slug}`}
                        className='items-center flex flex-col my-4'
                    >
                        <ChatBubbleBottomCenterIcon className='w-7 h-7 cursor-pointer ' />
                        <div className='font-primary text-lg mt-2'>
                            {' '}
                            {formatNumber(120)}
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default BlogSubItem;
