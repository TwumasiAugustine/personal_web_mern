/* eslint-disable react/prop-types */
import { XMarkIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const serverUrl = import.meta.env.VITE_SERVER_URL;

const ProjectModal = ({ project, onClose }) => {
	const { image, title, description, tags, url, github } = project;
	const tagArray = tags ? tags.split(',').map((tag) => tag.trim()) : [];

	const modalVariants = {
		hidden: { opacity: 0, scale: 0.95 },
		visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
	};

	// Close modal if clicked outside the modal content
	const handleOutsideClick = (e) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	return (
		<div
			onClick={handleOutsideClick}
			className='fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center p-4'>
			{/* Modal Content */}
			<motion.div
				initial='hidden'
				animate='visible'
				exit='hidden'
				variants={modalVariants}
				className='bg-white rounded-2xl shadow-xl w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl relative overflow-hidden'>
				<button
					onClick={onClose}
					aria-label='Close'
					className='absolute top-4 right-4 bg-transparent text-black hover:text-gray-500 p-2 rounded-full transition-colors'>
					<XMarkIcon className='h-6 w-6' />
				</button>
				<div className='relative'>
					<img
						src={`${serverUrl}/${image}`}
						alt={title}
						className='w-full h-48 sm:h-56 md:h-64 object-cover rounded-t-2xl'
					/>
				</div>
				<div className='p-6 space-y-4'>
					<h3 className='text-xl sm:text-2xl font-semibold text-gray-900'>
						{title}
					</h3>
					<p className='text-gray-600 text-sm sm:text-base'>
						{description}
					</p>
					<div className='flex flex-wrap gap-2 mt-3'>
						{tagArray.map((tag, index) => (
							<span
								key={index}
								className='text-xs bg-gray-200 text-gray-700 py-1 px-2 rounded-full hover:bg-gray-300 transition'>
								#{tag}
							</span>
						))}
					</div>
					<div className='flex gap-4 mt-6'>
						{url && (
							<a
								href={url}
								target='_blank'
								rel='noopener noreferrer'
								className='text-blue-600  px-5 py-2 text-xs sm:text-sm hover:underline'>
								🌐 View Project
							</a>
						)}
						{github && (
							<a
								href={github}
								target='_blank'
								rel='noopener noreferrer'
								className='bg-gray-800 text-white px-5 py-2 rounded-lg text-xs sm:text-sm hover:bg-gray-900 transition-colors'>
								📂 GitHub Source
							</a>
						)}
					</div>
				</div>
			</motion.div>
		</div>
	);
};

export default ProjectModal;
