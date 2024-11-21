import { Suspense, lazy, useEffect, useState } from 'react';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';

const SingleBlogPost = lazy(() => import('./singleBlogPost.jsx'));
const serverUrl = import.meta.env.VITE_SERVER_URL;

const BlogPosts = () => {
    const [blogPosts, setBlogPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const postsPerPage = 3; 


    const fetchBlogPosts = async (page) => {
        setLoading(true);
        try {
            const response = await axios.get(
                `${serverUrl}/blog/posts?page=${page}&limit=${postsPerPage}`
            );
            setBlogPosts(response.data.posts);
            setTotalPages(response.data.totalPages); 
            setLoading(false);
        } catch (err) {
            console.error('Error fetching blog posts:', err);
            setError('Failed to load blog posts.');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogPosts(currentPage);
    }, [currentPage]);

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage((prevPage) => prevPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prevPage) => prevPage + 1);
    };

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
        <div className='container single-col-max-width my-12 pr-5'>
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
