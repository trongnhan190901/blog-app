import { OutputData } from '@editorjs/editorjs';
import { Dialog, Listbox, Transition } from '@headlessui/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Fragment, useState } from 'react';

interface PreviewModalProps {
    title: string;
    desc: string | null;
    content: OutputData | undefined;
    user: string | null;
}

const categories = [
    'Khoa học - Công nghệ',
    'Sức khỏe - Sắc đẹp',
    'Du lịch - Ẩm thực',
    'Nghệ thuật - Văn hóa',
    'Phát triển cá nhân',
    'Tin tức xã hội',
    'Tâm lý - Sức khỏe tinh thần',
    'Lối sống - Gia đình',
    'Kinh doanh - Tài chính',
    'Giáo dục - Học tập',
    'Thời trang - Phong cách',
    'Hài hước - Giải trí',
];

const PreviewModal = ({ title, desc, content, user }: PreviewModalProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [category, setCategory] = useState('');

    const router = useRouter();

    const handleSubmit = async () => {
        try {
            const response = await axios.post(
                'http://localhost:5000/api/blog/submit',
                {
                    title,
                    desc,
                    category,
                    content,
                    author: user,
                },
            );
            const newBlogId = response.data.id;

            router.push(`/blog/${newBlogId}`);
        } catch (error) {
            console.error(error);
        }
    };

    const toggleModal = () => {
        setIsOpen(false);
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className={`border px-4 py-2 bg-blue-200 enabled:hover:bg-blue-300 border-black rounded-xl ${
                    !title || !content ? 'disabled' : ''
                }`}
                disabled={!title || !content}
                style={{
                    opacity: !title || !content?.blocks ? 0.5 : 1,
                }}
            >
                Tiếp theo
            </button>
            <Transition
                show={isOpen}
                enter='transition duration-100 ease-out'
                enterFrom='transform scale-95 opacity-0'
                enterTo='transform scale-100 opacity-100'
                leave='transition duration-100 ease-out'
                leaveFrom='transform scale-100 opacity-100'
                leaveTo='transform scale-95 opacity-0'
                as={Fragment}
            >
                <Dialog
                    open={isOpen}
                    onClose={() => setIsOpen(!isOpen)}
                    as='div'
                    className='fixed inset-0 z-10 flex overflow-y-auto'
                >
                    <Dialog.Overlay className='full-size z-10 bg-white opacity-90 blur-2xl' />
                    <div className='absolute-center fixed top-1/2 left-1/2 z-20 h-[400px] w-[500px] -translate-x-1/2 -translate-y-1/2 flex-col rounded-3xl bg-white/80  text-lg backdrop-blur-md'>
                        <div className='flex justify-center w-full'>
                            <Listbox value={category} onChange={setCategory}>
                                <div className='space-y-2'>
                                    <Listbox.Label className='block text-xl font-medium text-gray-700'>
                                        Danh mục bài viết
                                    </Listbox.Label>
                                    <div className='relative'>
                                        <Listbox.Button className='w-[300px] text-lg py-2 pl-3 pr-10 text-left border rounded-lg shadow-sm focus:ring focus:ring-opacity-50 font-semibold focus:ring-blue-300 focus:outline-none'>
                                            {category || 'Chọn một danh mục'}
                                        </Listbox.Button>
                                        <Listbox.Options className='absolute w-full h-96 overflow-y-auto mt-2 space-y-1 bg-white border rounded-lg shadow-lg focus:ring focus:ring-opacity-50 focus:ring-blue-300'>
                                            {categories.map((category) => (
                                                <Listbox.Option
                                                    key={category}
                                                    value={category}
                                                    className={({
                                                        active,
                                                        selected,
                                                    }) =>
                                                        `cursor-pointer select-none relative px-4 py-2 ${
                                                            active
                                                                ? 'bg-blue-100'
                                                                : ''
                                                        } ${
                                                            selected
                                                                ? 'font-semibold'
                                                                : ''
                                                        }`
                                                    }
                                                >
                                                    {({ active, selected }) => (
                                                        <>
                                                            <span
                                                                className={`${
                                                                    selected
                                                                        ? 'font-semibold'
                                                                        : 'font-normal'
                                                                } block truncate`}
                                                            >
                                                                {category}
                                                            </span>
                                                            {selected && (
                                                                <span
                                                                    className={`${
                                                                        active
                                                                            ? 'text-blue-600'
                                                                            : 'text-blue-400'
                                                                    } absolute inset-y-0 left-0 flex items-center pl-3`}
                                                                >
                                                                    <svg
                                                                        xmlns='http://www.w3.org/2000/svg'
                                                                        className='w-5 h-5'
                                                                        viewBox='0 0 20 20'
                                                                        fill='currentColor'
                                                                        aria-hidden='true'
                                                                    >
                                                                        <path
                                                                            fillRule='evenodd'
                                                                            d='M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z'
                                                                            clipRule='evenodd'
                                                                        />
                                                                    </svg>
                                                                </span>
                                                            )}
                                                        </>
                                                    )}
                                                </Listbox.Option>
                                            ))}
                                        </Listbox.Options>
                                    </div>
                                </div>
                            </Listbox>
                        </div>
                        <div className='space-x-4 mt-8 h-20 absolute-center'>
                            <button
                                className='border hover:bg-neutral-200 px-4 py-2 border-black rounded-xl'
                                onClick={toggleModal}
                            >
                                Trở về
                            </button>
                            <button
                                className='border px-4 py-2 bg-blue-200 hover:bg-blue-300 border-black rounded-xl'
                                type='button'
                                onClick={handleSubmit}
                            >
                                Đăng bài
                            </button>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default PreviewModal;
