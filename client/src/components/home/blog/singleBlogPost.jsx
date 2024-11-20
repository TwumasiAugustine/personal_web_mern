/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { BiLike } from 'react-icons/bi';
import { FaCommentDots } from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';
const serverUrl = import.meta.env.VITE_SERVER_URL;

const SingleBlogPost = ({ post }) => {
	const { path, title, createdAt, comments, summary, _id, likes, author } = post;

	const postDate = new Date(createdAt);
	const formattedDate = postDate.toLocaleDateString();
	const timeAgo = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true });

	return (
		<div className='mb-8'>
			<div className='flex justify-center lg:items-center gap-5'>
				<div className='flex-2'>
					<img
						loading='lazy'
						className='img-fluid object-cover aspect-auto h-[80px] w-[80px] lg:w-[150px] lg:h-[120px] rounded-md'
						src={`${serverUrl}/${path}`}
						alt={title}
					/>
				</div>
				<div className='flex-1'>
					<h3 className='title mb-1'>
						<Link
							className='text-link text-xl font-bold py-2 hover:underline'
							to={`/blog/${_id}`}>
							{title}
						</Link>
					</h3>
					<div className='flex justify-start gap-4 text-[12px] text-gray-500 mb-3'>
						<div className='flex items-center gap-2'>
							<span className='text-gray-400'>Published by</span>
							<span className='font-semibold'>
								{author?.username} Twumasi
							</span>
						</div>
						<span className='text-gray-400'>|</span>
						<span className='date'>{formattedDate}</span>
						<span className='time'>{timeAgo}</span>
						
					</div>
					<div className='intro text-[15px] text-gray-800 mb-3'>
						{summary}
					</div>
					<Link
						className='text-link text-sm hover:underline text-indigo-600'
						to={`/blog/${_id}`}>
						Read more →
					</Link>
					<div className='flex gap-10 text-gray-600 text-sm mt-3'>
						<span className='flex items-center gap-1 cursor-pointer'>
							<BiLike /> {likes || 0}
						</span>
						<span className='flex items-center justify-center w-100 gap-1'>
							<FaCommentDots /> {comments.length}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SingleBlogPost;
