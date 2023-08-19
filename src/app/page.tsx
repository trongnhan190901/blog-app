import Category from '~/components/partials/Category';
import Banner from '~/components/shared/Banner';
import BlogList from '~/components/shared/BlogList';
import Featured from '~/components/shared/Featured';

export default function Home() {
    return (
        <main className='flex w-full  min-h-screen flex-col items-center justify-between'>
            <div className='full-size items-center justify-between font-mono text-sm lg:flex'>
                <div className='flex flex-col'>
                    <Category />
                    <Banner />
                    <Featured />
                    <BlogList />
                </div>
            </div>
        </main>
    );
}
