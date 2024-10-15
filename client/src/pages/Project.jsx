import { useState, lazy, Suspense } from 'react';
import Footer from '../components/home/Footer';
import FilterBar from '../components/home/project/FilterBar';
import ProjectModal from '../components/home/project/ProjectModal';
import SEO from './SEO.jsx'
import { projects } from '../data.js';
import { motion } from 'framer-motion';

const ProjectCard = lazy(() => import('../components/home/project/ProjectCard'));

const Project = () => {
	const [selectedProject, setSelectedProject] = useState(null);
	const [filter, setFilter] = useState({ category: '', date: '' });

	const filteredProjects = projects.filter((project) => {
		return (
			(filter.category === '' || project.category === filter.category) &&
			(filter.date === '' || new Date(project.date) >= new Date(filter.date))
		);
	});

	const handleProjectClick = (project) => {
		setSelectedProject(project);
	};

	const handleCloseModal = () => {
		setSelectedProject(null);
	};

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
			<FilterBar onFilterChange={setFilter} />
			<Suspense
				fallback={
					<div
						className='flex
						justify-center
						items-center
						h-screen
						w-full
						text-black'>
						Loading...
					</div>
				}>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center gap-6 mt-8'>
					{filteredProjects.map((project) => (
						<ProjectCard
							key={project.id}
							project={project}
							onClick={() => handleProjectClick(project)}
						/>
					))}
				</div>
			</Suspense>
			{selectedProject && (
				<ProjectModal
					project={selectedProject}
					onClose={handleCloseModal}
				/>
			)}
		</motion.div>
		
		<Footer/>
		</>
	);
};

export default Project;