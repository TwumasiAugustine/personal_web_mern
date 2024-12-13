import { useNavigate } from 'react-router-dom';

/* eslint-disable react/prop-types */
const serverUrl = import.meta.env.VITE_SERVER_URL;
import { serverURL } from '../../../config';
const backendURL = serverURL || serverUrl || 'https://personal-web-mern.onrender.com';

const ProjectCard = ({project}) => {
	const {title, description,  tags, image, _id: id} = project;
	const navigate = useNavigate();
	console.log(project)

	// Convert tags string into an array of hashtags
	const tagArray = tags ? tags.split(',').map((tag) => tag.trim()) : [];

	return (
		<div
			onClick={() => navigate(`/project/${id}`)}
			className='relative bg-white rounded-md shadow-md hover:shadow-lg transition-shadow duration-300 max-w-full sm:max-w-sm md:max-w-md lg:max-w-lg border border-gray-200 hover:scale-105 transform cursor-pointer'>
			<div className='relative'>
				<img
					loading='lazy'
					src={`${backendURL}/${image}`}
					alt={title}
					className='w-full h-36 sm:h-40 md:h-44 lg:h-48 object-cover rounded-t-md'
				/>
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
			</div>
		</div>
	);
};

export default ProjectCard;
