/* eslint-disable react/prop-types */
import { lazy, Suspense, useContext } from 'react';
import Footer from '../components/home/Footer';
import FilterBar from '../components/home/project/FilterBar';
import SEO from './SEO.jsx';
import { motion } from 'framer-motion';
import { UserContext } from '../context/UserContext.jsx';

const ProjectCard = lazy(() =>
	import('../components/home/project/ProjectCard'),
);

const pageVariants = {
	initial: { opacity: 0, x: '-100vw' },
	in: { opacity: 1, x: 0 },
	out: { opacity: 0, x: '100vw' },
};

const pageTransition = {
	type: 'tween',
	ease: 'anticipate',
	duration: 0.5,
};

const LoadingScreen = ({ message, className = '' }) => (
	<div
		className={`flex justify-center items-center h-screen w-full text-black ${className}`}>
		<p>{message}</p>
	</div>
);

const NoProjectsMessage = () => (
	<div className='flex justify-center items-center h-96 text-gray-700'>
		<motion.h2
			className='text-5xl font-semibold'
			initial={{ opacity: 0, scale: 0.8 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{
				duration: 0.8,
				ease: 'easeInOut',
				repeat: Infinity,
				repeatType: 'reverse',
			}}>
			Coming Soon
		</motion.h2>
	</div>
);

const Project = () => {
	const { loading,  projects, projectError, handleProjectClick } =
		useContext(UserContext);

	if (loading) return <LoadingScreen message='Loading projects...' className='flex items-center justiy-center h-96' />;

	if (projectError)
		return (
			<LoadingScreen
				message={projectError}
				className='flex items-center justify-center h-screen text-red-600'
			/>
		);

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
				<Suspense fallback={<LoadingScreen message='Loading...' />}>
					{projects.length === 0 ? (
						<NoProjectsMessage />
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
			</motion.div>
			<Footer />
		</>
	);
};

export default Project;
