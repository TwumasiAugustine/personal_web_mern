import { Suspense, lazy,  useContext
    
 } from 'react';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

const SingleBlogPost = lazy(() => import('./singleBlogPost.jsx'));
import { UserContext } from '../../../context/UserContext.jsx';

const BlogPosts = () => {
    

    const {blogPosts, loading, error, currentPage, totalPages, handleNextPage, handlePrevPage} = useContext(UserContext);

    if (loading) {
        return (
            <div className='flex justify-center items-center h-screen w-full text-black'>
                <p>Loading blog posts...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className='flex justify-center items-center h-screen w-full text-red-600'>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className='container px-4 max-w-5xl bg-white mx-auto single-col-max-width my-12 pr-5'>
            <Suspense
                fallback={
                    <div className='flex justify-center items-center h-screen w-full text-black'>
                        <p>Loading...</p>
                    </div>
                }>
                {blogPosts.map((post) => (
                    <SingleBlogPost key={post._id} post={post} />
                ))}
            </Suspense>
            <nav className='flex justify-between items-center mt-8'>
                <button
                    className={`flex items-center gap-2 px-4 py-2 text-white bg-indigo-600 text-sm rounded disabled:opacity-50 disabled:cursor-not-allowed`}
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}>
                    <FaArrowLeft />
                    <span>Prev</span>
                </button>
                <span className='text-gray-700'>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    className={`flex items-center gap-2 px-4 py-2 text-white bg-indigo-600 text-sm rounded disabled:opacity-50 disabled:cursor-not-allowed`}
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}>
                    <span>Next</span>
                    <FaArrowRight />
                </button>
            </nav>
        </div>
    );
};

export default BlogPosts;
