import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import SEO from '../../../pages/SEO'
const serverUrl = import.meta.env.VITE_SERVER_URL;

const ProjectDetail = () => {
	const { id } = useParams();
	const [project, setProject] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		axios
			.get(`${serverUrl}/project/${id}`)
			.then((response) => {
				setProject(response.data);
				setLoading(false);
			})
			.catch((error) => {
				console.error('Error:', error);
				setError('Failed to load project details. Please try again.');
				setLoading(false);
			});
	}, [id]);

	if (loading) {
		return (
			<div className='flex justify-center items-center h-screen bg-gray-100'>
				<p className='text-lg text-gray-700'>Loading...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className='flex justify-center items-center h-screen bg-gray-100'>
				<p className='text-lg text-red-600'>{error}</p>
			</div>
		);
	}

	if (!project) {
		return (
			<div className='flex justify-center items-center h-screen bg-gray-100'>
				<p className='text-lg text-red-600'>Project not found.</p>
			</div>
		);
	}

	const { image, title, description, tags, url } = project;
	const tagArray = tags ? tags.split(',').map((tag) => tag.trim()) : [];

	return (
		<div className='min-h-screen bg-gray-50'>
			<SEO
				title={`Project Detail: ${title}`}
				description={description}
			/>
			<div className='relative w-full h-[300px] md:h-[400px] bg-gray-800 overflow-hidden'>
				{/* Hero Section */}
				<img
					src={`${serverUrl}/${image}`}
					alt={title}
					className='w-full h-full object-cover opacity-50'
				/>
				<div className='absolute inset-0 flex items-center justify-center text-center text-white'>
					<h1 className='text-4xl md:text-5xl font-bold'>{title}</h1>
				</div>
			</div>
			<div className='max-w-5xl mx-auto px-4 py-6'>
				<Link
					to='/project'
					className='inline-flex items-center text-blue-600 hover:text-blue-800 mb-6'>
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
					</svg>
					Back to Projects
				</Link>
				<section className='space-y-6'>
					<h2 className='text-2xl font-bold text-gray-800'>
						Description
					</h2>
					<p className='text-lg text-gray-600 leading-relaxed'>
						{description}
					</p>
					{tagArray.length > 0 && (
						<section>
							<h2 className='text-2xl font-bold text-gray-800'>
								Technologies Used
							</h2>
							<ul className='list-disc list-inside text-lg text-gray-600'>
								{tagArray.map((tag, index) => (
									<li key={index}>{tag}</li>
								))}
							</ul>
						</section>
					)}
					{url && (
						<section>
							<h2 className='text-2xl font-bold text-gray-800 mb-2'>
								Project Preview
							</h2>
							<p className='text-gray-600 mb-4'>
								Explore the live version of this project and see
								it in action!
							</p>
							<a
								href={url}
								target='_blank'
								title='View Project'
								rel='noopener noreferrer'
								className='inline-block bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white font-medium text-lg py-3 px-8 rounded-md shadow-md hover:scale-105 transition-transform hover:shadow-lg'>
								🌟 Click Here to View the Project 🌟
							</a>
						</section>
					)}
				</section>
			</div>
		</div>
	);
};

export default ProjectDetail;
