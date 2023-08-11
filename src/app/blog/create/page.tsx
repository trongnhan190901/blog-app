'use client';
import { OutputData } from '@editorjs/editorjs';
import { useAtom } from 'jotai';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { userId } from '~/atoms/globalState';
import PreviewModal from '~/components/modal/PreviewModal';

const EditorBlock = dynamic(() => import('~/components/partials/Editor'), {
    ssr: false,
});

const Page = () => {
    const [user] = useAtom(userId);

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [content, setContent] = useState<OutputData>();
    const [isTitleEmpty, setIsTitleEmpty] = useState(false);

    const handleSaveDraft = async () => {
        if (!title.trim()) {
            setIsTitleEmpty(true);
            return;
        }

        try {
            await fetch('http://localhost:5000/api/blog/draft', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    desc,
                    content,
                    author: user,
                }),
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className='mx-auto absolute-center flex-col'>
                <div className='mt-12 w-full relative'>
                    <div className='w-full'>
                        <div className='w-full'>
                            <div className='w-[90%] h-[90vh] md:w-[80%] lg:w-1/2 lg:min-w-[750px] mx-auto'>
                                <input
                                    type='text'
                                    value={title}
                                    onChange={(e) => {
                                        setTitle(e.target.value);
                                        setIsTitleEmpty(false);
                                    }}
                                    placeholder='Tiêu đề ở đây...'
                                    className='w-full focus:outline-none border-0 font-serif mt-4 text-4xl font-bold'
                                />
                                {isTitleEmpty && (
                                    <p className='text-red-500 italic flex items-end w-72 justify-end font-serif mt-1 text-xl '>
                                        Bạn phải nhập tiêu đề!!
                                    </p>
                                )}

                                <input
                                    type='text'
                                    value={desc}
                                    onChange={(e) => {
                                        setDesc(e.target.value);
                                    }}
                                    placeholder='Mô tả ở đây... (không bắt buộc)'
                                    className='w-full focus:outline-none border-0 font-serif mt-4 text-xl text-gray-500 font-light italic'
                                />

                                <EditorBlock
                                    data={content}
                                    onChange={setContent}
                                    holder='editorjs-container'
                                />
                            </div>
                            <div className='space-x-4 bg-white z-10 h-20 w-full fixed bottom-0 absolute-center'>
                                <button
                                    className='border hover:bg-neutral-200 px-4 py-2 border-black rounded-xl'
                                    type='button'
                                    onClick={handleSaveDraft}
                                >
                                    Lưu nháp
                                </button>

                                <PreviewModal
                                    title={title}
                                    desc={desc}
                                    content={content}
                                    user={user}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Page;
