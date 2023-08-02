'use client';
import { OutputData } from '@editorjs/editorjs';
import dynamic from 'next/dynamic';
import { FormEvent, useState } from 'react';
import axios from 'axios';
import { useAtom } from 'jotai';
import { userId } from '~/atoms/globalState';

const EditorBlock = dynamic(() => import('~/components/partials/Editor'), {
    ssr: false,
});

const Page = () => {
    const [user] = useAtom(userId);

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [content, setContent] = useState<OutputData>();
    const [isTitleEmpty, setIsTitleEmpty] = useState(false);
    const [isDescEmpty, setIsDescEmpty] = useState(false);

    const handleSaveDraft = async (e: FormEvent) => {
        e.preventDefault();

        // Check if the required fields are empty
        if (!title.trim()) {
            setIsTitleEmpty(true);
            return;
        }

        if (!desc.trim()) {
            setIsDescEmpty(true);
            return;
        }

        try {
            await axios.post('http://localhost:5000/api/blog/draft', {
                title,
                desc,
                content,
                author: user,
            });
        } catch (error) {
            console.error(error);
        }
    };

    // const handleSaveDraft = async () => {
    //     // Check if the required fields are empty
    //     if (!title.trim()) {
    //         setIsTitleEmpty(true);
    //         return;
    //     }

    //     if (!desc.trim()) {
    //         setIsDescEmpty(true);
    //         return;
    //     }

    //     try {
    //         await axios.post('http://localhost:5000/api/blog/draft', {
    //             title,
    //             desc,
    //             content,
    //             author: user,
    //         });
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    return (
        <>
            <div className='mx-auto absolute-center flex-col'>
                <div className='mt-12 w-full relative'>
                    <div className='w-full'>
                        <form
                            onSubmit={handleSaveDraft}
                            className='w-[90%] h-[90vh] md:w-[80%] lg:w-1/2 lg:min-w-[750px] mx-auto'
                        >
                            <div className='flex'>
                                <input
                                    type='text'
                                    value={title}
                                    onChange={(e) => {
                                        setTitle(e.target.value);
                                        setIsTitleEmpty(false);
                                    }}
                                    placeholder='Tiêu đề ở đây...'
                                    className='w-full focus:outline-none border-0 font-serif mt-4 text-4xl font-bold'
                                    required
                                />
                                {isTitleEmpty && (
                                    <p className='text-red-500 italic flex items-end w-72 justify-end font-serif mt-1 text-xl '>
                                        Bạn phải nhập tiêu đề!!
                                    </p>
                                )}
                            </div>
                            <div className='flex'>
                                <input
                                    type='text'
                                    value={desc}
                                    onChange={(e) => {
                                        setDesc(e.target.value);
                                        setIsDescEmpty(false);
                                    }}
                                    placeholder='Mô tả ở đây...'
                                    className='w-full focus:outline-none border-0 font-serif mt-2 text-xl text-gray-500 font-light italic'
                                    required
                                />
                                {isDescEmpty && (
                                    <p className='text-red-500 flex items-end w-72 italic justify-end font-serif mt-1 text-xl '>
                                        Bạn phải nhập mô tả!!
                                    </p>
                                )}
                            </div>
                            <EditorBlock
                                data={content}
                                onChange={setContent}
                                holder='editorjs-container'
                            />
                            <div className='space-x-4 bg-white z-10 h-20 w-full fixed bottom-0 absolute-center'>
                                <button
                                    className='border px-4 py-2 border-black rounded-xl'
                                    type='submit'
                                >
                                    Lưu nháp
                                </button>
                                {/* <button
                                    className='border px-4 py-2 border-black rounded-xl'
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </button> */}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Page;
