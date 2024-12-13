/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import axios from 'axios';
import SEO from '/src/pages/SEO';
import Footer from '../Footer';
const serverUrl = import.meta.env.VITE_SERVER_URL;
import { serverURL } from '../../../config';
const backendURL =
	serverURL || serverUrl || 'https://personal-web-mern.onrender.com';

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
				<div className='mb-8  items-center gap-6'>
					<button
						disabled
						onClick={handleLike}
						className='flex gap-2 justify-between px-4 py-2 bg-indigo-500 text-white text-sm font-semibold rounded hover:bg-indigo-600'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth='1.5'
							stroke='currentColor'
							className='size-5'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z'
							/>
						</svg>
						<span>{likes}</span>
					</button>
					<p className='text-sm text-gray-800 py-4'>
						Share this post. ⬇️
					</p>
					<div className='flex gap-4'>
						<button
							onClick={() => handleShare('facebook')}
							className='text-blue-600 hover:underline'>
							Facebook
						</button>
						<button
							onClick={() => handleShare('twitter')}
							className='text-blue-400 hover:underline'>
							Twitter
						</button>
						<button
							onClick={() => handleShare('linkedin')}
							className='text-blue-800 hover:underline'>
							LinkedIn
						</button>
						<button
							onClick={() => handleShare('email')}
							className='text-gray-600 hover:underline'>
							Email
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
										<span className='font-semibold'>
											{comment.name}:{' '}
										</span>
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
							disabled={loading}
							className='mt-3 px-6 py-2 bg-indigo-500 text-white font-semibold rounded hover:bg-indigo-600 disabled:cursor-not-allowed'>
							{loading ? 'Posting...' : 'Post'}
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
									className='hover:underline text-indigo-600 '>
									{relatedPost.title}
									
								</a>
								<p className='text-black line-clamp-3'>
										{relatedPost.summary}
								</p>
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
