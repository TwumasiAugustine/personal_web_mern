/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
const serverUrl = import.meta.env.VITE_SERVER_URL;
import {serverURL} from '../config'
export const UserContext = createContext({});
const backendURL = serverURL || serverUrl || 'https://personal-web-mern.onrender.com';

export const UserContextProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState({});
    const [blogPosts, setBlogPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [projectError, setProjectError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedProject, setSelectedProject] = useState(null);
	const [projects, setProjects] = useState({});
	

	const handleProjectClick = (project) => {
		setSelectedProject(project);
	};

	const handleCloseModal = () => {
		setSelectedProject(null);
	};

	const fetchProjectData = async () => {
		try {
			const {data}= await axios.get(`${backendURL}/project`);
			setProjects(data.project || []);
		} catch (error) {
			setProjectError(error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchProjectData();
	}, []);


    
    const [postsPerPage, setPostsPerPage] = useState(
        () => Number(localStorage.getItem('postsPerPage')) || 4
    );

    useEffect(() => {
        localStorage.setItem('postsPerPage', postsPerPage);
    }, [postsPerPage]);

    // Fetch User Data
    useEffect(() => {
        axios
            .get(`${backendURL}/profile`, { withCredentials: true })
            .then((response) => setUserInfo(response.data))
            .catch((err) => console.error('Error fetching profile:', err));
    }, []);

    const fetchBlogPosts = async (page) => {
        setLoading(true);
        try {
            const response = await axios.get(
                `${backendURL}/blog/posts?page=${page}&limit=${postsPerPage}`,
            );
            setBlogPosts(response.data.posts);
            setTotalPages(response.data.totalPages);
        } catch (err) {
            console.error('Error fetching blog posts:', err);
            setError('Failed to load blog posts.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogPosts(currentPage, blogPosts);
    }, [currentPage, postsPerPage]); 

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage((prevPage) => prevPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prevPage) => prevPage + 1);
    };

    const handleLogout = async () => {
        try {
            await axios.post(`${backendURL}/logout`, {}, { withCredentials: true });
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
                projectError,
                setCurrentPage,
                currentPage,
                fetchBlogPosts,
                fetchProjectData,
                handlePrevPage,
                handleNextPage,
                totalPages,
                postsPerPage,
                setPostsPerPage,
                setTotalPages,
                setLoading,
                setError,
                handleLogout,
                selectedProject,
                setSelectedProject,
                projects,
                handleProjectClick,
                handleCloseModal,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
