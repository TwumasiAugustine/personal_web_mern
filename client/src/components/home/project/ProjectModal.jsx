/* eslint-disable react/prop-types */
import { XMarkIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const ProjectModal = ({ project, onClose }) => {
	const { imageUrl, title, description, techStack, url, github } = project;

	const modalVariants = {
		hidden: {
			opacity: 0,
			scale: 0.8,
		},
		visible: {
			opacity: 1,
			scale: 1,
			transition: {
				duration: 0.3,
			},
		},
	};

	return (
		<div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-4'>
			<motion.div
				initial='hidden'
				animate='visible'
				variants={modalVariants}
				className='bg-white p-4 rounded-lg shadow-lg max-w-lg w-full relative'>
				<button
					onClick={onClose}
					className='absolute top-2 right-3 text-gray-800 hover:text-gray-600 transition-colors duration-200'>
					<XMarkIcon className='h-6 w-6' />
				</button>
				<div className='relative'>
					<img
						loading='lazy'
						src={imageUrl}
						alt={title}
						className='w-full h-48 object-cover mb-4 rounded'
					/>
					<div className='absolute bottom-0 hover:h-full left-0 w-full p-2 bg-black bg-opacity-40 text-white'>
						<h3 className='text-lg font-semibold'>{title}</h3>
					</div>
				</div>
				<p className='mt-2'>{description}</p>
				<div className='mt-4'>
					<div className='flex flex-wrap gap-2 mt-1'>
						{techStack.map((tech, index) => (
							<span
								key={index}
								className='bg-indigo-100 text-indigo-800 text-xs font-semibold px-2 py-1 rounded-full'>
								{tech}
							</span>
						))}
					</div>
				</div>
				<div className='mt-4 flex flex-row gap-2'>
					{url && (
						<a
							href={url}
							target='_blank'
							rel='noopener noreferrer'
							className='text-indigo-600 hover:underline text-sm'>
							View Project
						</a>
					)}
					{github && (
						<a
							href={github}
							target='_blank'
							rel='noopener noreferrer'
							className='text-gray-800 hover:underline text-sm'>
							GitHub Source
						</a>
					)}
				</div>
			</motion.div>
		</div>
	);
};

export default ProjectModal;
