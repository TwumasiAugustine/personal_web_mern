/* eslint-disable react/prop-types */

const ProjectCard = ({ project, onClick }) => {
	const { imageUrl, title, description, url, github } = project;

	return (
		<div
			onClick={onClick}
			className='relative cursor-pointer bg-white rounded-md shadow-md hover:shadow-lg transition-shadow duration-200 max-w-xs w-full border border-[#ccc]'>
			<div className='relative'>
				<img
					loading='lazy'
					src={imageUrl}
					alt={title}
					className='w-full h-40 object-cover rounded-t-md'
				/>
				<div className='absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 transition-opacity duration-200 flex items-center justify-center'>
					<div className='text-white text-center opacity-0 hover:opacity-100 transition-opacity duration-200 p-4'>
						<h3 className='text-lg font-semibold'>{title}</h3>
						<p className='mt-2 text-sm'>{description}</p>
					</div>
				</div>
			</div>
			<div className='p-4'>
				<div className='flex  gap-2'>
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
			</div>
		</div>
	);
};

export default ProjectCard;
