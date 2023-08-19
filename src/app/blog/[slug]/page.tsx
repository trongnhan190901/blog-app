'use client';
import { OutputData } from '@editorjs/editorjs';
import { useEffect, useState } from 'react';
import EditorJsRenderer from '~/components/partials/EditorRender';

interface BlogData {
    title: string;
    desc: string | null;
    content: OutputData;
    createdAt: string;
    category: string;
}

const BlogPost = ({ params }: { params: { slug: string } }) => {
    const [blogData, setBlogData] = useState<BlogData | null>(null);

    useEffect(() => {
        fetch(`http://localhost:5000/api/blog/${params.slug}`, {
            method: 'GET',
        })
            .then((response) => response.json()) // Chuyển đổi phản hồi thành đối tượng JSON
            .then((data) => {
                setBlogData(data); // Lưu dữ liệu vào biến trạng thái
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <div className='w-full min-h-screen'>
            <div className='mx-auto absolute-center flex-col'>
                <div className='mt-12 w-full relative'>
                    <div className='w-full'>
                        {/* <ul>
                            {content &&
                                content.blocks.map((block, index) => {
                                    if (block.type === 'header') {
                                        const headingClassName =
                                            block.data.level === 2
                                                ? 'heading2'
                                                : 'heading3';

                                        return (
                                            <li
                                                key={index}
                                                onClick={() =>
                                                    scrollToHeading(
                                                        block.data.text,
                                                    )
                                                }
                                                className={headingClassName}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                {block.data.text}
                                            </li>
                                        );
                                    }
                                    return null;
                                })}
                        </ul> */}
                        <div className='w-[90%] h-[90vh] md:w-[80%] lg:w-1/2 lg:min-w-[750px] mx-auto'>
                            <h1 className='w-full font-serif mt-4 text-4xl leading-normal font-bold'>
                                {blogData?.title}
                            </h1>
                            <p className='w-full font-serif mt-2 text-xl text-gray-500 font-light italic'>
                                {blogData?.desc}
                            </p>
                            {blogData && blogData?.content && (
                                <EditorJsRenderer data={blogData?.content} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogPost;
