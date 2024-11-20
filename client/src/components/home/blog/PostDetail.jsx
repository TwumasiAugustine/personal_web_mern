import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import axios from 'axios';
import SEO from '/src/pages/SEO';
const serverUrl = import.meta.env.VITE_SERVER_URL;

const PostDetail = () => {
	const { id } = useParams();
	const [post, setPost] = useState(null);
	const [additionalPosts, setAdditionalPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const navigate = useNavigate(); 

	useEffect(() => {
		axios
			.get(`${serverUrl}/blog/post/${id}`)
			.then((response) => {
				setPost(response.data.post);
				setAdditionalPosts(response.data.additionalPosts);
				setLoading(false);
			})
			.catch((err) => {
				setError('Failed to load post', err);
				setLoading(false);
			});
	}, [id]);

	const handleRelatedPostClick = (e, postId) => {
		e.preventDefault(); 
		window.scrollTo(0, 0); 
		navigate(`/blog/${postId}`); 
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>{error}</div>;
	}

	return (
		<div>
			<SEO
				title={post.title}
				description={post.summary || 'Blog Post Details'}
				type='Article'
				name='Twumasi Augustine'
			/>
			<article className='blog-post flex align-center justify-center w-100 p-5 lg:py-10 p-md-5'>
				<div className='container max-w-3xl mx-auto'>
					<header className='blog-post-header'>
						<h2 className='title mb-2 text-2xl font-bold'>
							{post.title}
						</h2>
						<div className='meta mb-3 flex justify-start gap-5 text-sm text-gray-500'>
							<span className='date'>
								{new Date(post.createdAt).toLocaleDateString()}
							</span>
							<span className='time'>
								{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
							</span>
							<span className='comment'>
								<a
									className='text-link hover:underline'
									href='#comments'>
									{post.comments.length} comments
								</a>
							</span>
						</div>
					</header>

					<div className='blog-post-body'>
						<div
							dangerouslySetInnerHTML={{ __html: post.content }}
						/>
					</div>
					<div className='pagination mt-5 flex justify-between'>
						{post.prevPostId && (
							<Link
								to={`/blog/${post.prevPostId}`}
								className='text-link text-indigo-600 hover:underline'>
								← Previous Post
							</Link>
						)}
						{post.nextPostId && (
							<Link
								to={`/blog/${post.nextPostId}`}
								className='text-link text-indigo-600 hover:underline'>
								Next Post →
							</Link>
						)}
					</div>
					<div className='related-posts mt-10'>
						<h3 className='text-xl font-bold mb-4'>
							Related Posts
						</h3>
						<ul>
							{additionalPosts.map((relatedPost) => (
								<li
									key={relatedPost._id}
									className='mb-4'>
									<a
										href={`/blog/${relatedPost._id}`}
										onClick={(e) =>
											handleRelatedPostClick(
												e,
												relatedPost._id,
											)
										}
										className='text-link text-lg text-indigo-600 hover:underline'>
										{relatedPost.title}
									</a>
									<p className='text-gray-500'>
										{relatedPost.summary}
									</p>
								</li>
							))}
						</ul>
					</div>
				</div>
			</article>
		</div>
	);
};

export default PostDetail;
