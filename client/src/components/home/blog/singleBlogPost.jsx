/* eslint-disable react/prop-types */
import { useState } from 'react';
import { BiLike } from 'react-icons/bi';

const SingleBlogPost = ({ post }) => {
	const { image, title, timestamps, comments,  summary, likes } = post;


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
							href='#'>
							{title}
						</a>
					</h3>
					<div className='flex justify-start gap-2 text-[12px] text-gray-500 mb-1'>
						<span className='date'>11//7/23</span>
						<span className='time'>3m ago</span>
					</div>
					<div className='intro text-[15px] text-gray-800'>
						{summary}
					</div>
					<a
						className='text-link text-sm hover:underline text-indigo-600'
						href='#'>
						Read more →
					</a>
					<div className='flex gap-10 text-gray-600 text-sm mt-3'>
						<span className='flex items-center gap-1 cursor-pointer'>
							<BiLike /> {likes}
						</span>
						<span className='flex items-center gap-1'>
							<a
								href='#'
								className='text-link cursor-pointer hover:underline'>
								{comments.length} Comments
							</a>
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SingleBlogPost;
