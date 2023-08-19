'use client';
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
import VerticalBlogItem from '~/components/shared/VerticalBlogItem';
import { Blog } from '~/type';

const Featured = () => {
    const [blogList, setBlogList] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/blog', {
            method: 'GET',
            credentials: 'include',
        })
            .then((response) => response.json())
            .then((data) => {
                const limitedData = data.slice(0, 12);
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
                            blogList.map((blog: Blog) => (
                                <SwiperSlide
                                    key={blog.slug}
                                    className='w-[300px] h-[400px] px-8 pb-10'
                                >
                                    <VerticalBlogItem
                                        blog={blog}
                                        hideAuthor={false}
                                    />
                                </SwiperSlide>
                            ))}
                    </Swiper>
                </div>
                <div className='xl:w-[1100px] 2xl:w-[1400px] xl:block hidden mx-auto'>
                    <Swiper
                        slidesPerView={3}
                        slidesPerGroup={6}
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
                            blogList.map((blog: Blog, index: number) => (
                                <SwiperSlide
                                    key={blog.slug}
                                    className='xl:w-[300px] xl:h-[250px] 2xl:h-[330px] 2xl:p-8 mb-6 xl:p-4'
                                >
                                    <VerticalBlogItem
                                        hideAuthor={false}
                                        blog={blog}
                                    />
                                </SwiperSlide>
                            ))}
                    </Swiper>
                </div>
            </div>
        </>
    );
};

export default Featured;
