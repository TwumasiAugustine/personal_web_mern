import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
const serverUrl = import.meta.env.VITE_SERVER_URL;

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState({});
    const [blogPosts, setBlogPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Load postsPerPage from localStorage or default to 4
    const [postsPerPage, setPostsPerPage] = useState(
        () => Number(localStorage.getItem('postsPerPage')) || 4
    );

    // Save postsPerPage to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('postsPerPage', postsPerPage);
    }, [postsPerPage]);

    // Fetch User Data
    useEffect(() => {
        axios
            .get(`${serverUrl}/profile`, { withCredentials: true })
            .then((response) => setUserInfo(response.data))
            .catch((err) => console.error('Error fetching profile:', err));
    }, []);

    const fetchBlogPosts = async (page) => {
        setLoading(true);
        try {
            const response = await axios.get(
                `${serverUrl}/blog/posts?page=${page}&limit=${postsPerPage}`,
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
    }, [currentPage, postsPerPage]); // Include postsPerPage to fetch new data when it changes

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage((prevPage) => prevPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prevPage) => prevPage + 1);
    };

    const handleLogout = async () => {
        try {
            await axios.post(`${serverUrl}/logout`, {}, { withCredentials: true });
            setUserInfo(null);
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <UserContext.Provider
            value={{
                userInfo,
                setUserInfo,
                blogPosts,
                setBlogPosts,
                loading,
                error,
                setCurrentPage,
                currentPage,
                fetchBlogPosts,
                handlePrevPage,
                handleNextPage,
                totalPages,
                postsPerPage,
                setPostsPerPage,
                setTotalPages,
                setLoading,
                setError,
                handleLogout,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
