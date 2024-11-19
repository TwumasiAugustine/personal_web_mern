import { Suspense, lazy, useEffect, useState } from 'react';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';

const SingleBlogPost = lazy(() => import('./singleBlogPost.jsx'));
const serverUrl = import.meta.env.VITE_SERVER_URL;

const BlogPosts = () => {
	const [blogPosts, setBlogPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	console.log(blogPosts)

	useEffect(() => {
		axios
			.get(`${serverUrl}/blog/posts`)
			.then((response) => {
				setBlogPosts(response.data);
				setLoading(false); 
			})
			.catch((err) => {
				console.error('Error fetching blog posts:', err);
				setError('Failed to load blog posts.');
				setLoading(false); 
			});
	}, []);

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
					<SingleBlogPost
						key={post.id}
						post={post}
					/>
				))}
			</Suspense>

			<nav className='bg-indigo-600 text-sm p-2 text-white flex justify-between items-center my-5'>
				<a
					className='flex items-center gap-2'
					href='#'>
					<FaArrowLeft /> <span>Prev</span>
				</a>
				<a
					className='flex items-center gap-2'
					href='#'>
					<span>Next</span> <FaArrowRight />
				</a>
			</nav>
		</div>
	);
};

export default BlogPosts;
