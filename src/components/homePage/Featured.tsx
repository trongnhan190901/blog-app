'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
    A11y,
    Autoplay,
    Grid,
    Navigation,
    Pagination,
    Scrollbar,
} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/grid';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

interface BlogType {
    _id: string;
    title: string;
    desc: string;
    author: any;
    category: string;
    createdAt: string;
}

const Featured = () => {
    const [blogList, setBlogList] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/blog', {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((data) => {
                const limitedData = data.slice(0, 8); // Lấy 6 phần tử đầu tiên
                setBlogList(limitedData);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <>
            <div className='w-full'>
                <div className='md:h-40 h-28 absolute-center text-4xl'>
                    Bài viết nổi bật
                </div>
                <div className='block w-[380px] sm:w-[630px] md:w-[750px] lg:w-[1000px] xl:hidden mx-auto'>
                    <Swiper
                        slidesPerView='auto'
                        pagination={{
                            clickable: true,
                        }}
                        speed={1200}
                        autoplay
                        breakpoints={{
                            320: {
                                slidesPerView: 1,
                            },
                            640: {
                                slidesPerView: 2,
                            },
                            1024: {
                                slidesPerView: 3,
                            },
                        }}
                        scrollbar={{ draggable: true }}
                        modules={[
                            Grid,
                            Pagination,
                            Autoplay,
                            Scrollbar,
                            Navigation,
                        ]}
                    >
                        {blogList &&
                            blogList.map((blog: BlogType, index: number) => (
                                <SwiperSlide
                                    key={blog._id}
                                    className='w-[300px] h-[400px] px-8 pb-4'
                                >
                                    <div className='absolute-center flex-col'>
                                        <Link
                                            href={`/blog/${blog._id}`}
                                            className='absolute-center flex-col w-[300px] h-[420px] my-8'
                                        >
                                            <img
                                                src='/test.jpg'
                                                alt=''
                                                className='w-[300px] h-[200px] object-cover'
                                            />
                                            <div className='w-[300px] px-4 h-[220px] mt-3'>
                                                <div className='h-7 text-base flex items-start w-full'>
                                                    {blog.category}
                                                </div>
                                                <div className='w-full h-16 text-2xl flex items-center leading-none my-2 font-bold line-clamp-1'>
                                                    {blog?.title}
                                                </div>{' '}
                                                <div className='flex mt-4 h-14 space-x-2 items-center'>
                                                    <img
                                                        src={
                                                            blog?.author?.avatar
                                                        }
                                                        alt=''
                                                        className='w-12 h-12 rounded-full'
                                                    />
                                                    <div className='font-bold text-base'>
                                                        {blog?.author?.name}
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </SwiperSlide>
                            ))}
                    </Swiper>
                </div>
                <div className='xl:w-[1100px] 2xl:w-[1400px] xl:block hidden mx-auto'>
                    <Swiper
                        slidesPerView={2}
                        slidesPerGroup={4}
                        grid={{
                            rows: 2,
                            fill: 'row',
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        speed={1200}
                        navigation
                        initialSlide={1}
                        scrollbar={{ draggable: true }}
                        modules={[
                            Grid,
                            Pagination,
                            Scrollbar,
                            Navigation,
                            A11y,
                        ]}
                    >
                        {blogList &&
                            blogList.map((blog: BlogType, index: number) => (
                                <SwiperSlide
                                    key={blog._id}
                                    className='2xl:w-[450px] xl:w-[400px] xl:h-[300px] 2xl:h-[380px] 2xl:p-8 mb-6 xl:p-4'
                                >
                                    <div className='absolute-center flex-col'>
                                        <Link
                                            href={`/blog/${blog._id}`}
                                            className='absolute-center flex-col hover:shadow-md hover:scale-105 transition duration-300 2xl:w-[450px] xl:w-[400px] h-[320px] 2xl:h-[380px]'
                                        >
                                            <img
                                                src='/test.jpg'
                                                alt=''
                                                className='2xl:w-[450px] xl:w-[400px] xl:h-[150px] 2xl:h-[200px] object-cover'
                                            />
                                            <div className='2xl:w-[450px] xl:w-[400px] px-4 xl:h-[180px] mt-2'>
                                                <div className='text-base flex items-start w-full'>
                                                    {blog.category}
                                                </div>
                                                <div className='w-full  text-2xl flex items-center my-2 font-bold'>
                                                    <div className='line-clamp-2'>
                                                        {/* {blog?.title} */}
                                                        Lorem ipsum dolor sit
                                                        amet consectetur
                                                        adipisicing elit.
                                                        Mollitia quia commodi
                                                        sed fugiat, ducimus
                                                        omnis voluptatum culpa
                                                        dolorem, labore
                                                        reprehenderit veniam
                                                        porro ea odio itaque
                                                        obcaecati? Maxime
                                                        molestias aliquid odio!
                                                    </div>
                                                </div>{' '}
                                                <div className='flex 2xl:mt-4 xl:mt-0 h-12 space-x-2 items-center'>
                                                    <img
                                                        src={
                                                            blog?.author?.avatar
                                                        }
                                                        alt=''
                                                        className='w-12 h-12 rounded-full'
                                                    />
                                                    <div className='font-bold text-base'>
                                                        {blog?.author?.name}
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </SwiperSlide>
                            ))}
                    </Swiper>
                </div>
            </div>
        </>
    );
};

export default Featured;
