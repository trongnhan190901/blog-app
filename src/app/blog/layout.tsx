import Navbar from '~/components/partials/Navbar';

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <div>
                <div className='hidden xl:flex'>
                    <Navbar />
                </div>
                {children}
            </div>
        </>
    );
};

export default Layout;
