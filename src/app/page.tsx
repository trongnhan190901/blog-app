import Banner from '~/components/homePage/Banner';
import BlogList from '~/components/homePage/BlogList';
import Featured from '~/components/homePage/Featured';

export default function Home() {
    return (
        <main className='flex w-full  min-h-screen flex-col items-center justify-between'>
            <div className='z-10 full-size items-center justify-between font-mono text-sm lg:flex'>
                <div className='flex flex-col'>
                    <Banner />
                    <Featured />
                    <BlogList />
                </div>
            </div>
        </main>
    );
}
