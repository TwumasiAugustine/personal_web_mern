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

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const views = {
        blogs: {
            title: 'Manage Blogs',
            component: <BlogTable />,
            buttons: [
                { view: 'projects', label: 'Manage Projects', color: 'bg-green-600' },
                { view: 'create', label: 'Create New Post', color: 'bg-indigo-600' },
                { view: 'add', label: 'Add New Project', color: 'bg-blue-600' },
            ],
        },
        projects: {
            title: 'Manage Projects',
            component: <ProjectTable />,
            buttons: [
                { view: 'blogs', label: 'Manage Blogs', color: 'bg-blue-600' },
                { view: 'create', label: 'Create New Post', color: 'bg-indigo-600' },
                { view: 'add', label: 'Add New Project', color: 'bg-green-600' },
            ],
        },
        create: {
            title: 'Create Blog Post',
            component: <CreatePost />,
            buttons: [
                { view: 'blogs', label: 'Manage Blogs', color: 'bg-blue-600' },
                { view: 'projects', label: 'Manage Projects', color: 'bg-green-600' },
                { view: 'add', label: 'Add New Project', color: 'bg-indigo-600' },
            ],
        },
        add: {
            title: 'Add New Project',
            component: <AddProject />,
            buttons: [
                { view: 'blogs', label: 'Manage Blogs', color: 'bg-blue-600' },
                { view: 'projects', label: 'Manage Projects', color: 'bg-green-600' },
                { view: 'create', label: 'Create New Post', color: 'bg-indigo-600' },
            ],
        },
    };

    const currentView = views[activeView] || views.blogs;

    return (
        <div className='container'>
            <SEO
                title={`Dashboard | ${activeView}`}
                description={`Dashboard to manage ${activeView}`}
                type='dashboard'
                name='Twumasi Augustine'
            />
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            <div className=''>
                <div className='p-4'>
                    <div className='flex justify-between'>
                        <button
                            onClick={toggleSidebar}
                            className='p-2 bg-gray-800 text-sm text-white rounded shadow mb-4'>
                            Toggle Menu
                        </button>
                        <h1 className='lg:text-xl  text-sm font-bold'>{currentView.title}</h1>
                    </div>

                    <div className='flex justify-between items-center mb-4'>
                        
                        <div className='flex gap-4'>
                            {currentView.buttons.map(({ view, label, color }) => (
                                <button
                                    key={view}
                                    onClick={() => setActiveView(view)}
                                    className={`px-4 py-2 sm:text-xs text-sm ${color} text-white rounded`}>
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <Suspense fallback={<div className='flex justify-center items-center  text-black'>Loading...</div>}>
                        {currentView.component}
                    </Suspense>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
