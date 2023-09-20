'use client';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Blog } from '~/type';
import HorizontalBlogItem from './HorizontalBlogItem';

const BlogList = () => {
    const [blogList, setBlogList] = useState<Blog[]>([]);
    const [likesCountMap, setLikesCountMap] = useState<Record<string, number>>(
        {},
    );
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    console.log(selectedCategories);

    const [pageNumber, setPageNumber] = useState(0);
    const blogsPerPage = 8;
    const pagesVisited = pageNumber * blogsPerPage;

    const pageCount = Math.ceil(blogList.length / blogsPerPage);

    const changePage = ({ selected }: any) => {
        setPageNumber(selected);
    };

    const handleCategoryClick = (category: string) => {
        if (selectedCategories.includes(category)) {
            // Nếu category đã tồn tại trong danh sách, xóa nó đi
            setSelectedCategories(
                selectedCategories.filter((c) => c !== category),
            );
        } else {
            // Nếu category chưa tồn tại trong danh sách, thêm nó vào
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    useEffect(() => {
        fetch('http://localhost:5000/api/blog', {
            method: 'GET',
            credentials: 'include',
        })
            .then((response) => response.json())
            .then((data: Blog[]) => {
                setBlogList(data);

                const likesMap: Record<string, number> = {};
                data.forEach((blog: Blog) => {
                    likesMap[blog.slug] = Array.isArray(blog.likes)
                        ? blog.likes.length
                        : 0;
                });

                setLikesCountMap(likesMap);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <>
            <div className='w-full mt-24 min-h-screen '>
                <div className='w-full h-full flex mx-auto justify-center mt-2'>
                    <div className='hidden sm:flex mx-12 items-center full-size space-y-12 flex-col'>
                        {blogList &&
                            blogList
                                .filter((blog: Blog) =>
                                    selectedCategories.length === 0
                                        ? true
                                        : selectedCategories.includes(
                                              blog.category,
                                          ),
                                )
                                .slice(
                                    pagesVisited,
                                    pagesVisited + blogsPerPage,
                                )
                                .map((blog: Blog) => (
                                    <div key={blog.slug}>
                                        <HorizontalBlogItem
                                            blog={blog}
                                            likesCountMap={likesCountMap}
                                        />
                                    </div>
                                ))}
                        <ReactPaginate
                            previousLabel={
                                <ChevronLeftIcon className='w-10 h-10' />
                            }
                            nextLabel={
                                <ChevronRightIcon className='w-10 h-10' />
                            }
                            pageCount={pageCount}
                            onPageChange={changePage}
                            containerClassName={'pagination'}
                            previousLinkClassName={'previous_page'}
                            nextLinkClassName={'next_page'}
                            disabledClassName={'pagination_disabled'}
                            activeClassName={'pagination_active'}
                            pageLinkClassName={'page_link'}
                        />
                    </div>
                    <div className='flex sm:hidden full-size space-y-14 flex-col'>
                        {/* {blogList &&
                            blogList
                                .slice(
                                    pagesVisited,
                                    pagesVisited + blogsPerPage,
                                )
                                .map((blog: Blog) => (
                                    <div key={blog._id}>
                                        <HorizontalSmallBlogItem
                                            blog={blog}
                                            likesCountMap={likesCountMap}
                                        />
                                    </div>
                                ))} */}
                        <ReactPaginate
                            previousLabel={
                                <ChevronLeftIcon className='w-10 h-10' />
                            }
                            nextLabel={
                                <ChevronRightIcon className='w-10 h-10' />
                            }
                            pageCount={pageCount}
                            onPageChange={changePage}
                            containerClassName={'pagination'}
                            previousLinkClassName={'previous_page'}
                            nextLinkClassName={'next_page'}
                            disabledClassName={'pagination_disabled'}
                            activeClassName={'pagination_active'}
                            pageLinkClassName={'page_link'}
                        />
                    </div>
                    <div className='h-full hidden lg:flex 2xl:top-24 xl:top-12 sticky 2xl:right-20 xl:right-16 flex-col'>
                        <div className='2xl:w-[480px] xl:w-[300px] xl:ml-12 flex flex-wrap'>
                            {/* 2xl:h-[850px] xl:h-[700px] */}
                            <div
                                className={`category w-fit h-fit px-6 py-3 mx-2 my-2 cursor-pointer border rounded-2xl border-black ${
                                    selectedCategories.includes(
                                        'khoa-hoc-cong-nghe',
                                    )
                                        ? 'active bg-blue-300'
                                        : ''
                                }`}
                                onClick={() =>
                                    handleCategoryClick('khoa-hoc-cong-nghe')
                                }
                            >
                                Khoa học - Công nghệ
                            </div>
                            <div
                                className={`category w-fit h-fit px-6 py-3 mx-2 my-2 cursor-pointer border rounded-2xl border-black ${
                                    selectedCategories.includes(
                                        'suc-khoe-sac-dep',
                                    )
                                        ? 'active bg-blue-300'
                                        : ''
                                }`}
                                onClick={() =>
                                    handleCategoryClick('suc-khoe-sac-dep')
                                }
                            >
                                Sức khỏe - Sắc đẹp
                            </div>
                            <div
                                className={`category w-fit h-fit px-6 py-3 mx-2 my-2 cursor-pointer border rounded-2xl border-black ${
                                    selectedCategories.includes(
                                        'du-lich-am-thuc',
                                    )
                                        ? 'active bg-blue-300'
                                        : ''
                                }`}
                                onClick={() =>
                                    handleCategoryClick('du-lich-am-thuc')
                                }
                            >
                                Du lịch - Ẩm thực
                            </div>
                            <div
                                className={`category w-fit h-fit px-6 py-3 mx-2 my-2 cursor-pointer border rounded-2xl border-black ${
                                    selectedCategories.includes(
                                        'nghe-thuat-van-hoa',
                                    )
                                        ? 'active bg-blue-300'
                                        : ''
                                }`}
                                onClick={() =>
                                    handleCategoryClick('nghe-thuat-van-hoa')
                                }
                            >
                                Nghệ thuật - Văn hóa
                            </div>
                            <div
                                className={`category w-fit h-fit px-6 py-3 mx-2 my-2 cursor-pointer border rounded-2xl border-black ${
                                    selectedCategories.includes(
                                        'phat-trien-ca-nhan',
                                    )
                                        ? 'active bg-blue-300'
                                        : ''
                                }`}
                                onClick={() =>
                                    handleCategoryClick('phat-trien-ca-nhan')
                                }
                            >
                                Phát triển cá nhân
                            </div>
                            <div
                                className={`category w-fit h-fit px-6 py-3 mx-2 my-2 cursor-pointer border rounded-2xl border-black ${
                                    selectedCategories.includes(
                                        'tin-tuc-xa-hoi',
                                    )
                                        ? 'active bg-blue-300'
                                        : ''
                                }`}
                                onClick={() =>
                                    handleCategoryClick('tin-tuc-xa-hoi')
                                }
                            >
                                Tin tức xã hội
                            </div>
                            <div
                                className={`category w-fit h-fit px-6 py-3 mx-2 my-2 cursor-pointer border rounded-2xl border-black ${
                                    selectedCategories.includes(
                                        'tam-ly-suc-khoe-tinh-than',
                                    )
                                        ? 'active bg-blue-300'
                                        : ''
                                }`}
                                onClick={() =>
                                    handleCategoryClick(
                                        'tam-ly-suc-khoe-tinh-than',
                                    )
                                }
                            >
                                Tâm lý - Sức khỏe tinh thần
                            </div>
                            <div
                                className={`category w-fit h-fit px-6 py-3 mx-2 my-2 cursor-pointer border rounded-2xl border-black ${
                                    selectedCategories.includes(
                                        'loi-song-gia-dinh',
                                    )
                                        ? 'active bg-blue-300'
                                        : ''
                                }`}
                                onClick={() =>
                                    handleCategoryClick('loi-song-gia-dinh')
                                }
                            >
                                Lối sống - Gia đình
                            </div>
                            <div
                                className={`category w-fit h-fit px-6 py-3 mx-2 my-2 cursor-pointer border rounded-2xl border-black ${
                                    selectedCategories.includes(
                                        'kinh-doanh-tai-chinh',
                                    )
                                        ? 'active bg-blue-300'
                                        : ''
                                }`}
                                onClick={() =>
                                    handleCategoryClick('kinh-doanh-tai-chinh')
                                }
                            >
                                Kinh doanh - Tài chính
                            </div>
                            <div
                                className={`category w-fit h-fit px-6 py-3 mx-2 my-2 cursor-pointer border rounded-2xl border-black ${
                                    selectedCategories.includes(
                                        'giao-duc-hoc-tap',
                                    )
                                        ? 'active bg-blue-300'
                                        : ''
                                }`}
                                onClick={() =>
                                    handleCategoryClick('giao-duc-hoc-tap')
                                }
                            >
                                Giáo dục - Học tập
                            </div>
                            <div
                                className={`category w-fit h-fit px-6 py-3 mx-2 my-2 cursor-pointer border rounded-2xl border-black ${
                                    selectedCategories.includes(
                                        'thoi-trang-phong-cach',
                                    )
                                        ? 'active bg-blue-300'
                                        : ''
                                }`}
                                onClick={() =>
                                    handleCategoryClick('thoi-trang-phong-cach')
                                }
                            >
                                Thời trang - Phong cách
                            </div>
                            <div
                                className={`category w-fit h-fit px-6 py-3 mx-2 my-2 cursor-pointer border rounded-2xl border-black ${
                                    selectedCategories.includes(
                                        'hai-huoc-giai-tri',
                                    )
                                        ? 'active bg-blue-300'
                                        : ''
                                }`}
                                onClick={() =>
                                    handleCategoryClick('hai-huoc-giai-tri')
                                }
                            >
                                Hài hước - Giải trí
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlogList;
