/* eslint-disable react/prop-types */
const serverUrl = import.meta.env.VITE_SERVER_URL;

const ProjectCard = ({ project, onClick }) => {
	const { image, title, description, url, tags, github } = project;

	// Convert tags string into an array of hashtags
	const tagArray = tags ? tags.split(',').map((tag) => tag.trim()) : [];

	return (
		<div
			onClick={onClick}
			className='relative bg-white rounded-md shadow-md hover:shadow-lg transition-shadow duration-300 max-w-full sm:max-w-sm md:max-w-md lg:max-w-lg border border-gray-200 hover:scale-105 transform cursor-pointer'>
			<div className='relative'>
				<img
					loading='lazy'
					src={`${serverUrl}/${image}`}
					alt={title}
					className='w-full h-36 sm:h-40 md:h-44 lg:h-48 object-cover rounded-t-md'
				/>
				<div className='absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center rounded-t-md'>
					<div className='text-white text-center opacity-0 hover:opacity-100 transition-opacity duration-300 px-4'>
						<h3 className='text-base sm:text-lg font-semibold'>
							{title}
						</h3>
						<p className='mt-2 text-xs sm:text-sm'>{description}</p>
					</div>
				</div>
			</div>
			<div className='p-4'>
				<h3 className='text-sm sm:text-base md:text-lg font-bold text-gray-800 truncate'>
					{title}
				</h3>
				<p className='text-xs sm:text-sm text-gray-600 mt-2 line-clamp-2'>
					{description}
				</p>
				{tagArray.length > 0 && (
					<div className='mt-3 flex flex-wrap gap-2'>
						{tagArray.map((tag, index) => (
							<span
								key={index}
								className='text-xs bg-gray-200 text-gray-700 py-1 px-2 rounded-full hover:bg-gray-300 transition'>
								#{tag}
							</span>
						))}
					</div>
				)}
				<div className='flex gap-4 mt-4'>
					{url && (
						<a
							href={url}
							target='_blank'
							rel='noopener noreferrer'
							className='text-blue-600 font-medium text-xs hover:underline flex items-center gap-1'>
							🌐 View Project
						</a>
					)}
					{github && (
						<a
							href={github}
							target='_blank'
							rel='noopener noreferrer'
							className='text-gray-800 font-medium text-xs hover:underline flex items-center gap-1'>
							📂 GitHub
						</a>
					)}
				</div>
			</div>
		</div>
	);
};

export default ProjectCard;
