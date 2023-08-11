'use client';
import { OutputData } from '@editorjs/editorjs';
import { useState } from 'react';
import EditorJsRenderer from '~/components/partials/EditorRender';

const Page = () => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [content, setContent] = useState<OutputData>();

    return (
        <>
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
                                {title}
                            </h1>
                            <p className='w-full font-serif mt-2 text-xl text-gray-500 font-light italic'>
                                {desc}
                            </p>
                            {content && <EditorJsRenderer data={content} />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Page;
