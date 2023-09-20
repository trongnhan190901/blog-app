import { OutputBlockData } from '@editorjs/editorjs';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Blog } from '~/type';

interface HeadingListProps {
    blog: Blog;
}

const HeadingList = ({ blog }: HeadingListProps) => {
    const [isDisclosureOpen, setIsDisclosureOpen] = useState<boolean>(false);

    const toggleDisclosure = () => {
        setIsDisclosureOpen(!isDisclosureOpen);
    };

    const scrollToHeading = (headingText: string, headingLevel: number) => {
        const contentElement = document.getElementById('editor-content');

        if (contentElement) {
            const headingElements = contentElement.querySelectorAll(
                `h${headingLevel}`,
            );

            const headingArray = Array.from(headingElements);

            for (const headingElement of headingArray) {
                if (headingElement.textContent === headingText) {
                    headingElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                    });

                    break;
                }
            }
        }
    };

    return (
        <div className='relative'>
            <Disclosure as='div' className='w-full'>
                <Disclosure.Button
                    onClick={toggleDisclosure}
                    className='btn w-12 h-12 fixed lg:right-24 md:right-10 right-3 lg:top-64 absolute-center top-20 drop-shadow-xl shadow-xl border group bg-white hover:bg-neutral-100 rounded-full'
                >
                    {isDisclosureOpen ? (
                        <XMarkIcon className='w-8 h-8 group-hover:stroke-rose-500 stroke-gray-500' />
                    ) : (
                        <Bars3Icon className='w-8 h-8 group-hover:stroke-black stroke-gray-500' />
                    )}
                </Disclosure.Button>
                <Disclosure.Panel className='lg:right-24 md:right-10 top-20 mt-10 lg:top-64 right-3 lg:mt-12 fixed drop-shadow-xl shadow-xl rounded-xl'>
                    <ul className='w-[300px] p-4 overflow-auto mt-4 h-fit md:max-h-96 max-h-48 border bg-white rounded-xl'>
                        {blog?.content &&
                            blog?.content.blocks.map(
                                (block: OutputBlockData, index: number) => {
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
                                                        block.data.level,
                                                    )
                                                }
                                                className={`${headingClassName} text-gray-500 text-lg font-primary font-medium hover:text-black cursor-pointer`}
                                            >
                                                <div className='line-clamp-2'>
                                                    {block.data.text}
                                                </div>
                                            </li>
                                        );
                                    }
                                    return null;
                                },
                            )}
                    </ul>
                </Disclosure.Panel>
            </Disclosure>
        </div>
    );
};

export default HeadingList;
