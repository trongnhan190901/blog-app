import Navbar from '~/components/partials/Navbar';
import Banner from '~/components/homePage/Banner';
import Featured from '~/components/homePage/Featured';
import BlogList from '~/components/homePage/BlogList';

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            <div className="z-10 full-size items-center justify-between font-mono text-sm lg:flex">
                <div className="flex flex-col">
                    <Navbar />
                    <Banner />
                    <Featured />
                    <BlogList />
                </div>
            </div>
        </main>
    );
}
