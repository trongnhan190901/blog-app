import { Dialog } from '@headlessui/react';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

const LoginModal = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleLogin = () => {
        // Lưu trạng thái trang trước đó vào cookie
        document.cookie = `redirectFrom=${encodeURIComponent(
            window.location.href,
        )}`;

        const loginUrl = `http://localhost:5000/auth/google`;
        window.location.href = loginUrl;
    };

    return (
        <>
            <UserCircleIcon
                className='w-14 h-14 cursor-pointer stroke-gray-500 hover:stroke-black'
                onClick={() => setIsOpen(!isOpen)}
            />

            <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                as='div'
                className='fixed inset-0 z-20 flex overflow-y-auto'
            >
                <Dialog.Overlay className='full-size z-0 bg-black opacity-40' />
                <div className='absolute-center fixed top-1/2 left-1/2 z-20 h-[350px] w-[500px] -translate-x-1/2 -translate-y-1/2 flex-col rounded-3xl bg-white/80 font-primary text-xl backdrop-blur-md'>
                    <Dialog.Panel className='full-size absolute-center flex-col'>
                        <Dialog.Title className='absolute-center font-primary my-4 text-4xl'>
                            Đăng nhập
                        </Dialog.Title>
                        <Dialog.Description className='font-primary absolute-center my-4 text-xl'>
                            Để có thể là một phần của chúng tôi !!
                        </Dialog.Description>

                        <div className='flex flex-col space-y-6'>
                            {/* <button className='smooth-effect absolute-center mx-auto w-[200px] space-x-2 rounded-3xl border border-gray-700 py-4 px-6 hover:scale-110 hover:bg-sky-200 md:w-[250px]'>
                                    <Image
                                        src='/fb_icon.svg'
                                        alt='Facebook Icon'
                                        width={30}
                                        height={30}
                                    />

                                    <span className='text-base md:text-xl'>
                                        Đăng nhập với Facebook
                                    </span>
                                </button> */}
                            <button
                                onClick={handleLogin}
                                className='smooth-effect absolute-center mx-auto w-[200px] rounded-3xl border border-gray-700 py-3 hover:scale-110 hover:bg-yellow-200 md:w-[300px] focus:outline-none'
                            >
                                <img
                                    src='/gg_icon.svg'
                                    alt='Facebook Icon'
                                    width={30}
                                    height={30}
                                />

                                <span className='text-lg'>
                                    Đăng nhập với Google
                                </span>
                            </button>
                            <button
                                className='absolute-center smooth-effect my-6 font-secondary text-base hover:scale-110 hover:text-rose-500'
                                onClick={() => setIsOpen(false)}
                            >
                                Quay lại
                            </button>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </>
    );
};

export default LoginModal;
