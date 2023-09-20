'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import EditorJsRenderer from '~/components/partials/EditorRender';
import BlogSubItem from '~/components/shared/BlogSubItem';
import CommentComp from '~/components/shared/CommentComp';
import HeadingList from '~/components/shared/HeadingList';
import { Blog } from '~/type';
interface BlogPostProps {
    params: {
        slug: string;
    };
}

const BlogPost = ({ params }: BlogPostProps) => {
    const [blog, setBlog] = useState<Blog>();
    const [showBlogSubItem, setShowBlogSubItem] = useState<boolean>(true);

    const router = useRouter();

    useEffect(() => {
        fetch(`http://localhost:5000/api/blog/${params.slug}`)
            .then((response) => response.json())
            .then((data) => {
                setBlog(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [params.slug]);

    const handleScroll = () => {
        const imgAuthorElement = document.getElementById('img-author');

        if (imgAuthorElement) {
            const rect = imgAuthorElement.getBoundingClientRect();
            setShowBlogSubItem(
                rect.top <= window.innerHeight && rect.bottom >= 0,
            );
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className='w-full'>
            <div className='mx-auto absolute-center flex-col'>
                <div
                    id='editor-content'
                    className='mt-12 w-[90%] md:w-[80%] lg:w-1/2 lg:min-w-[750px] mx-auto'
                >
                    <h1 className='w-full font-serif mt-4 text-4xl leading-normal font-bold'>
                        {blog?.title}
                    </h1>
                    <p className='w-full font-serif mt-2 text-xl text-gray-500 font-light italic'>
                        {blog?.desc}
                    </p>
                    <div
                        id='img-author'
                        className='flex w-full h-14 mt-6 space-x-4 items-center'
                    >
                        <img
                            onClick={() =>
                                router.push(`/user/${blog?.author.googleId}`)
                            }
                            src={blog?.author?.avatar}
                            alt=''
                            className='w-14 h-14 cursor-pointer rounded-full'
                        />
                        <div
                            onClick={() =>
                                router.push(`/user/${blog?.author.googleId}`)
                            }
                            className='font-bold cursor-pointer text-lg'
                        >
                            {blog?.author?.name}
                        </div>
                    </div>
                    {blog && !showBlogSubItem && <BlogSubItem blog={blog} />}
                    {blog && <HeadingList blog={blog} />}
                    {blog && blog?.content && (
                        <EditorJsRenderer data={blog.content} />
                    )}
                    <CommentComp slug={params.slug} />
                </div>
            </div>
        </div>
    );
};

export default BlogPost;
