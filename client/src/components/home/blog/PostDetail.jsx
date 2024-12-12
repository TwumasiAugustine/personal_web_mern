/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import axios from 'axios';
import SEO from '/src/pages/SEO';
import Footer from '../Footer';
const serverUrl = import.meta.env.VITE_SERVER_URL;
import { serverURL } from '../../../config';
const backendURL = serverURL || serverUrl || 'https://personal-web-mern.onrender.com';

const PostDetail = () => {
	const { id } = useParams();
	const [post, setPost] = useState(null);
	const [additionalPosts, setAdditionalPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [likes, setLikes] = useState(0);
	const [comments, setComments] = useState([]);
	const [name, setName] = useState('');
	const [newComment, setNewComment] = useState('');
	const navigate = useNavigate();

	// Fetch post data
	useEffect(() => {
		axios
			.get(`${backendURL}/blog/post/${id}`)
			.then((response) => {
				const { post, additionalPosts } = response.data;
				setPost(post);
				setAdditionalPosts(additionalPosts);
				setLikes(post.likes.length);
				setComments(post.comments);
				setLoading(false);
			})
			.catch((error) => {
				alert(
					error.response?.data?.message ||
						'An unexpected error occurred',
				);
			});
	}, [id]);

	// Handle like button click
	const handleLike = async () => {
		try {
			await axios.post(`${backendURL}/blog/post/${id}/like`, null, {
				withCredentials: true,
			});
			setLikes(likes + 1);
		} catch (error) {
			alert(
				error.response?.data?.message || 'An unexpected error occurred',
			);
			if (error) {
				navigate('/blog/login');
			}
		}
	};

	// Handle comment submission
	const handleCommentSubmit = async (e) => {
		e.preventDefault();
		if (!newComment.trim() || !name.trim()) {
			alert('Name and comment cannot be empty');
			return;
		}
		try {
			const response = await axios.post(
				`${backendURL}/blog/post/${id}/comment`,
				{ name, text: newComment },
				{ withCredentials: true },
			);
			setComments((prevComments) => [
				...prevComments,
				response.data.comment,
			]);
			setNewComment('');
		} catch (error) {
			alert(
				error.response?.data?.message || 'An unexpected error occurred',
			);
			
		}
	};

	// Navigate to related post
	const handleRelatedPostClick = (e, postId) => {
		e.preventDefault();
		navigate(`/blog/${postId}`);
		window.scrollTo(0, 0);
	};

	// Share content on social media platforms
	const handleShare = (platform) => {
		const shareUrl = `${window.location.origin}/blog/${id}`;
		const encodedTitle = encodeURIComponent(post.title);
		const encodedUrl = encodeURIComponent(shareUrl);

		let url;
		switch (platform) {
			case 'facebook':
				url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
				break;
			case 'twitter':
				url = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
				break;
			case 'linkedin':
				url = `https://www.linkedin.com/shareArticle?url=${encodedUrl}&title=${encodedTitle}`;
				break;
			case 'email':
				url = `mailto:?subject=${encodedTitle}&body=${encodedUrl}`;
				break;
			default:
				return;
		}
		window.open(url, '_blank');
	};

	// Loading and error handling
	if (loading)
		return (
			<div className='flex justify-center items-center w-full h-screen'>
				Loading...
			</div>
		);
	if (error)
		return (
			<div className='flex justify-center items-center w-full h-screen text-red-800'>
				{error}
			</div>
		);

	return (
		<div>
			<SEO
				title={`Post Detail: ${post.title}`}
				description={post.summary || 'Blog Post Details'}
				type='Article'
				name='Twumasi Augustine'
			/>
			<div className='post-detail bg-white max-w-5xl mx-auto p-6'>
				<Link
					to='/blog'
					className='flex items-center my-2 text-indigo-600'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='w-5 h-5 mr-2'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M15.75 19.5L8.25 12l7.5-7.5'
						/>
					</svg>{' '}
					Back to Blog
				</Link>
				<header className='border-b pb-4 mb-6'>
					<h1 className='text-3xl font-bold text-black-800'>
						{post.title}
					</h1>
					<div className='flex items-center gap-4 text-sm text-gray-500 mt-2'>
						<span>
							{new Date(post.createdAt).toLocaleDateString()}
						</span>
						<span>
							{formatDistanceToNow(new Date(post.createdAt), {
								addSuffix: true,
							})}
						</span>
						<span>{comments.length} comments</span>
						<span>{`${likes} ${
							likes > 1 ? 'likes' : 'like'
						}`}</span>
					</div>
				</header>
				<section className='mb-10'>
					<div
						dangerouslySetInnerHTML={{ __html: post.content }}
						className='prose prose-indigo max-w-none'
					/>
				</section>
				<div className='mb-8 flex items-center gap-6'>
					<button
						disabled
						onClick={handleLike}
						className='inline-flex justify-between px-4 py-2 bg-indigo-500 text-white text-sm font-semibold rounded hover:bg-indigo-600'>
						👍 {likes}
					</button>
					<div className='flex gap-4'>
						<button
							onClick={() => handleShare('facebook')}
							className='text-blue-600 hover:underline'>
							Share on Facebook
						</button>
						<button
							onClick={() => handleShare('twitter')}
							className='text-blue-400 hover:underline'>
							Share on Twitter
						</button>
						<button
							onClick={() => handleShare('linkedin')}
							className='text-blue-800 hover:underline'>
							Share on LinkedIn
						</button>
						<button
							onClick={() => handleShare('email')}
							className='text-gray-600 hover:underline'>
							Share via Email
						</button>
					</div>
				</div>
				<section
					id='comments'
					className='mb-10'>
					<h2 className='text-2xl font-semibold mb-4'>Comments</h2>
					{comments.length > 0 ? (
						<ul className='space-y-4'>
							{comments.map((comment) => (
								<li
									key={comment._id}
									className='p-4 bg-gray-100 rounded shadow-sm'>
									<p className=' text-gray-800'>
										<span className='font-semibold'>{comment.name}:{' '}</span>
										<span className='text-gray-800'>
											{comment.text}
										</span>
									</p>
									<small className='text-gray-500'>
										{formatDistanceToNow(
											new Date(comment.createdAt),
											{ addSuffix: true },
										)}
									</small>
								</li>
							))}
						</ul>
					) : (
						<p className='text-gray-500'>
							No comments yet. Be the first to comment!
						</p>
					)}
					<form
						onSubmit={handleCommentSubmit}
						className='mt-6'>
						<input
							required
							type='text'
							id='name'
							name='name'
							value={name}
							onChange={(e) => setName(e.target.value)}
							className='w-full mb-4 border border-gray-300 rounded p-3 focus:outline-none focus:ring-1 focus:ring-indigo-600'
							placeholder='Enter your name'
						/>
						<textarea
							required
							id='comment'
							name='comment'
							value={newComment}
							onChange={(e) => setNewComment(e.target.value)}
							className='w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-1 focus:ring-indigo-600'
							placeholder='Add a comment...'
							rows={4}
						/>
						<button
							type='submit'
							className='mt-3 px-6 py-2 bg-indigo-500 text-white font-semibold rounded hover:bg-indigo-600'>
							Submit
						</button>
					</form>
				</section>
				<section>
					<h2 className='text-2xl font-semibold mb-4'>
						Related Posts
					</h2>
					<ul className='space-y-4'>
						{additionalPosts.map((relatedPost) => (
							<li key={relatedPost._id}>
								<a
									href={`/blog/${relatedPost._id}`}
									onClick={(e) =>
										handleRelatedPostClick(
											e,
											relatedPost._id,
										)
									}
									className='text-indigo-600 '>
									{relatedPost.title}
								<p className='text-black line-clamp-3'>{relatedPost.summary}</p>
								</a>
							</li>
						))}
					</ul>
				</section>
			</div>
			<Footer />
		</div>
	);
};

export default PostDetail;
