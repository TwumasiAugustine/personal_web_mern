/* eslint-disable react/prop-types */
import { useState, lazy, Suspense } from 'react';
import SEO from '../pages/SEO';
import Sidebar from '../components/home/Sidebar';

const AddProject = lazy(() => import('../components/home/project/AddProject'));
const CreatePost = lazy(() => import('../components/home/blog/CreatePost'));
const ProjectTable = lazy(() => import('../components/home/project/ProjectTable'));
const BlogTable = lazy(() => import('../components/home/blog/BlogTable'));

const Dashboard = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [activeView, setActiveView] = useState('blogs');
	const toggleView = (view) => {
		setActiveView(view);
	};

	return (
		<div className='flex h-screen'>
			<SEO
				title={`Dashboard | ${activeView}`}
				description={`Dashboard to manage ${activeView}`}
				type='dashboard'
				name='Twumasi Augustine'
			/>
			<Sidebar
				isOpen={isSidebarOpen}
				toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
			/>

			<div className='flex-1'>
				<div className='p-4'>
					<button
						onClick={() => setIsSidebarOpen(!isSidebarOpen)}
						className='md:hidden p-2 bg-gray-800 text-sm text-white rounded shadow mb-4'>
						Toggle Menu
					</button>

					<div className='flex justify-between items-center mb-4'>
						<h1 className='text-xl font-bold'>
							{activeView === 'blogs'
								? 'Manage Blogs'
								: activeView === 'projects'
								? 'Manage Projects'
								: activeView === 'create'
								? 'Create Blog Post'
								: ''}
						</h1>
						<div className='flex gap-4'>
							{activeView !== 'projects' && (
								<button
									onClick={() => toggleView('projects')}
									className='px-4 py-2 text-sm bg-green-600 text-white rounded'>
									Manage Projects
								</button>
							)}
							{activeView !== 'blogs' && (
								<button
									onClick={() => toggleView('blogs')}
									className='px-4 py-2 text-sm bg-blue-600 text-white rounded'>
									Manage Blogs
								</button>
							)}
							{activeView !== 'create' && (
								<button
									onClick={() => toggleView('create')}
									className='px-4 py-2 text-sm bg-indigo-600 text-white rounded'>
									Create New Post
								</button>
							)}
						</div>
					</div>

					<Suspense fallback={<div className='flex justify-center items-center h-screen text-black'>Loading...</div>}>
						{(() => {
							switch (activeView) {
								case 'blogs':
									return <BlogTable />;
								case 'projects':
									return <ProjectTable />;
								case 'create':
									return <CreatePost />;
								default:
									return <BlogTable />;
							}
						})()}
					</Suspense>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
