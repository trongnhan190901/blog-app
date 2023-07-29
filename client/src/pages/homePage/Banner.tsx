const Banner = () => {
    return (
        <>
            <div className='w-full'>
                <div className='relative'>
                    <img src='/banner.jpg' alt='' />
                    <div className='absolute absolute-center top-80 px-20 flex-col'>
                        <div className='text-3xl'>
                            Chia sẻ câu chuyện của bạn
                        </div>
                        <button className='mt-6 border-2 w-64 text-2xl py-3 rounded-3xl hover:bg-blue-400 hover:text-white smooth-effect'>
                            Đăng bài viết
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Banner;
