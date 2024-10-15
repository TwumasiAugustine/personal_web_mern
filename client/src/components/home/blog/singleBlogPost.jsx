/* eslint-disable react/prop-types */
import { useState } from 'react';
import { BiLike } from 'react-icons/bi';

const SingleBlogPost = ({ post }) => {
	const { image, title, link, date, time, comments, intro, likes } = post;
	const [showCommentInput, setShowCommentInput] = useState(false);
	const [newComment, setNewComment] = useState('');

	const handleCommentClick = () => {
		setShowCommentInput(true);
	};

	const handleSendComment = () => {
		if (newComment.trim()) {
			// Add logic to add a new comment
			setNewComment('');
			setShowCommentInput(false);
		}
	};

	return (
		<div className='mb-5'>
			<div className='flex justify-center lg:items-center gap-5'>
				<div className='flex-2'>
					<img
						loading='lazy'
						className='img-fluid object-cover aspect-auto h-[80px] w-[80px] lg:w-[150px] lg:h-[120px]'
						src={image}
						alt={title}
					/>
				</div>
				<div className='flex-1'>
					<h3 className='title mb-1'>
						<a
							className='text-link text-xl font-bold py-2 hover:underline'
							href={link}>
							{title}
						</a>
					</h3>
					<div className='flex justify-start gap-2 text-[12px] text-gray-500 mb-1'>
						<span className='date'>{date}</span>
						<span className='time'>{time}</span>
					</div>
					<div className='intro text-[13px] text-gray-800'>
						{intro}
					</div>
					<a
						className='text-link text-sm hover:underline text-indigo-600'
						href={link}>
						Read more →
					</a>
					<div className='flex gap-10 text-gray-600 text-sm mt-3'>
						<span className='flex items-center gap-1 cursor-pointer'>
							<BiLike /> {likes}
						</span>
						<span className='flex items-center gap-1'>
							<a
								onClick={() =>
									setShowCommentInput(!showCommentInput)
								}
								className='text-link cursor-pointer hover:underline'>
								{comments.length} Comments
							</a>
						</span>
					</div>

					{showCommentInput && (
						<div className='mt-4 mb-2 bg-gray-100 overflow-y-scroll h-40'>
							{comments.map((comment) => (
								<div
									key={comment.id}
									className=' p-2  mb-2'>
									<p>
										<span className='text-sm font-bold'>{comment.author}:</span>{' '}
										<span className='text-sm block'>{comment.content}</span>
									</p>
								</div>
							))}
						</div>
					)}

					<div className='mt-4'>
						{showCommentInput && (
							<input
								type='text'
								className={'border border-gray-300 rounded-sm w-full p-2 h-16 transition-all outline-none focus:border-indigo-600 duration-200 ease-in-out'}
								placeholder='Write a comment...'
								onFocus={handleCommentClick}
								value={newComment}
								onChange={(e) => setNewComment(e.target.value)}
							/>
						)}

						{showCommentInput && (
							<button
								className='bg-blue-500 text-sm text-white p-2 rounded-sm mt-2 hover:bg-blue-600 transition-colors float'
								onClick={handleSendComment}>
								Post Comment
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default SingleBlogPost;
