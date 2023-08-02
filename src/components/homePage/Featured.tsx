const Featured = () => {
    return (
        <>
            <div className='w-full h-screen'>
                <div className='w-full h-40 absolute-center text-4xl'>
                    Bài viết nổi bật
                </div>
                <div className='w-full flex flex-wrap absolute-center'>
                    <div className='w-[450px] h-[330px] bg-rose-200 m-8'></div>
                    <div className='w-[450px] h-[330px] bg-rose-200 m-8'></div>
                    <div className='w-[450px] h-[330px] bg-rose-200 m-8'></div>
                    <div className='w-[450px] h-[330px] bg-rose-200 m-8'></div>
                    <div className='w-[450px] h-[330px] bg-rose-200 m-8'></div>
                    <div className='w-[450px] h-[330px] bg-rose-200 m-8'></div>
                </div>
            </div>
        </>
    );
};

export default Featured;
