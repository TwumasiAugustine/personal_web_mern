import { useState, lazy, Suspense, useEffect } from 'react';
import axios from 'axios';
import Footer from '../components/home/Footer';
import FilterBar from '../components/home/project/FilterBar';
import ProjectModal from '../components/home/project/ProjectModal';
import SEO from './SEO.jsx';
import { motion } from 'framer-motion';

const ProjectCard = lazy(() =>
	import('../components/home/project/ProjectCard'),
);
const serverUrl = import.meta.env.VITE_SERVER_URL;

const Project = () => {
	const [selectedProject, setSelectedProject] = useState(null);
	const [projects, setProjects] = useState({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const handleProjectClick = (project) => {
		setSelectedProject(project);
	};

	const handleCloseModal = () => {
		setSelectedProject(null);
	};

	const fetchProjectData = async () => {
		try {
			const {data}= await axios.get(`${serverUrl}/dashboard/project`);
			setProjects(data.project || []);
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchProjectData();
	}, []);

	const pageVariants = {
		initial: {
			opacity: 0,
			x: '-100vw',
		},
		in: {
			opacity: 1,
			x: 0,
		},
		out: {
			opacity: 0,
			x: '100vw',
		},
	};

	const pageTransition = {
		type: 'tween',
		ease: 'anticipate',
		duration: 0.5,
	};

	return (
		<>
			<motion.div
				initial='initial'
				animate='in'
				exit='out'
				variants={pageVariants}
				transition={pageTransition}
				className='bg-white text-black pt-16 sm:pt-20 px-6 lg:px-8 pb-5'>
				<SEO
					title='Projects'
					description='Personal project and application section'
					type='website'
					name='Twumasi Augustine'
				/>
				<FilterBar />
				<Suspense
					fallback={
						<div className='flex justify-center items-center h-screen w-full text-black'>
							Loading...
						</div>
					}>
					{loading ? (
						<div className='flex justify-center items-center h-screen text-gray-700'>
							Loading projects...
						</div>
					) : projects.length === 0 ? (
						<div className='flex justify-center items-center h-96 text-gray-700'>
							<h2 className='text-2xl font-semibold'>
								Coming Soon
							</h2>
						</div>
					) : (
						<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center gap-6 my-8'>
							{projects.map((project) => (
								<ProjectCard
									key={project._id}
									project={project}
									onClick={() => handleProjectClick(project)}
								/>
							))}
						</div>
					)}
				</Suspense>
				{selectedProject && (
					<ProjectModal
						project={selectedProject}
						onClose={handleCloseModal}
					/>
				)}
			</motion.div>

			<Footer />
		</>
	);
};

export default Project;
