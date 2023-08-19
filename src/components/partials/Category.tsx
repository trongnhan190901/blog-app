import { Bars3Icon } from '@heroicons/react/20/solid';
import Link from 'next/link';

const Category = () => {
    return (
        <>
            <div className='h-12 w-full bg-green-200 overflow-hidden'>
                <div className='flex items-center space-x-10 h-full mx-24'>
                    <Link
                        href={'/category/khoa-hoc-cong-nghe'}
                        className='flex cursor-pointer font-bold text-gray-500 hover:text-black'
                    >
                        Khoa học - Công nghệ
                    </Link>
                    <Link
                        href={'/category/phat-trien-ca-nhan'}
                        className='flex cursor-pointer font-bold text-gray-500 hover:text-black'
                    >
                        Phát triển cá nhân
                    </Link>
                    <Link
                        href={'/category/kinh-doanh-tai-chinh'}
                        className='flex cursor-pointer font-bold text-gray-500 hover:text-black'
                    >
                        Kinh doanh - Tài chính
                    </Link>
                    <Link
                        href={'/category/tin-tuc-xa-hoi'}
                        className='flex cursor-pointer font-bold text-gray-500 hover:text-black'
                    >
                        Tin tức xã hội
                    </Link>
                    <div className='flex-grow'></div>
                    <div className='flex justify-end text-gray-500 hover:text-black cursor-pointer'>
                        <Bars3Icon className='w-8 h-8' />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Category;
