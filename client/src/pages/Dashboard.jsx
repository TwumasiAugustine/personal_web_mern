/* eslint-disable react/prop-types */
import { useState, lazy, Suspense } from 'react';
import SEO from '../pages/SEO';
import Sidebar from '../components/home/Sidebar';
const BlogTable = lazy(() => import('../components/home/blog/BlogTable'));
const CreatePost = lazy(() => import('../components/home/blog/CreatePost'));
const AddProject = lazy(() => import('../components/home/project/AddProject'));

const Dashboard = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [activeView, setActiveView] = useState('blogs'); 
	const toggleView = () => {
		if (activeView === 'blogs') {
			setActiveView('create');
		} else if (activeView === 'create') {
			setActiveView('blogs');
		} else {
			setActiveView('blogs');
		}
	};

	return (
		<div className='flex h-screen'>
			<SEO
				title={`Dashboard | ${activeView}`}
				description={`Dashboard to ${activeView}`}
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
						className='md:hidden p-2 bg-gray-800 text-white rounded shadow mb-4'>
						Toggle Menu
					</button>
					<div className='flex justify-between items-center mb-4'>
						<h1 className='text-xl font-bold'>
							{activeView === 'blogs'
								? 'Manage Blogs'
								: activeView === 'projects'
								? 'Add Project'
								: 'Create Blog Post'}
						</h1>
						{activeView !== 'projects' && (
							<button
								onClick={() => setActiveView('projects')}
								className='px-4 py-2 bg-green-600 text-white rounded'>
								Add New Project
							</button>
						)}
						<button
							onClick={toggleView}
							className='px-4 py-2 bg-blue-600 text-white rounded'>
							{activeView === 'blogs'
								? 'Create New Post'
								: activeView === 'create'
								? 'View Blog Table'
								: 'Go Back to Blogs'}
						</button>
					</div>

					<Suspense fallback={<div className='flex justify-center items-center h-screen text-black'>Loading...</div>}>
						{activeView === 'blogs' ? (
							<BlogTable blogs={[]} />
						) : activeView === 'projects' ? (
							<AddProject />
						) : (
							<CreatePost />
						)}
					</Suspense>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
