/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { FaHome, FaBlog, FaProjectDiagram } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

const Sidebar = ({ isOpen, toggleSidebar }) => {
	const { userInfo } = useContext(UserContext);

	return (
		<>
			{/* Sidebar */}
			<div
				className={`fixed top-0 left-0 h-screen bg-gray-800 text-white w-64 transform ${
					isOpen ? 'translate-x-0 z-40' : '-translate-x-full'
				} transition-transform duration-300 md:translate-x-0 md:static`}>
				<div className='p-4 text-lg font-bold border-b border-gray-700'>
					Admin Dashboard
				</div>
				<nav className='mt-6'>
					<NavLink
						to='/dashboard'
						className={({ isActive }) =>
							`flex items-center px-4 py-2 text-sm ${
								isActive ? 'bg-gray-700' : 'hover:bg-gray-700'
							}`
						}>
						Dashboard
					</NavLink>
					<NavLink
						to='/'
						className={({ isActive }) =>
							`flex items-center px-4 py-2 text-sm ${
								isActive ? 'bg-gray-700' : 'hover:bg-gray-700'
							}`
						}>
						<FaHome className='mr-3' /> Homepage
					</NavLink>
					<NavLink
						to='/blog'
						className={({ isActive }) =>
							`flex items-center px-4 py-2 text-sm ${
								isActive ? 'bg-gray-700' : 'hover:bg-gray-700'
							}`
						}>
						<FaBlog className='mr-3' /> Blogs
					</NavLink>
					<NavLink
						to='/project'
						className={({ isActive }) =>
							`flex items-center px-4 py-2 text-sm ${
								isActive ? 'bg-gray-700' : 'hover:bg-gray-700'
							}`
						}>
						<FaProjectDiagram className='mr-3' /> Projects
					</NavLink>
				</nav>
				<div className='flex flex-col justify-end a m-4'>
					<p className='text-sm mb-4'>
						Welcome, {userInfo.data?.username}
					</p>
				</div>
			</div>

			{/* Mobile Overlay */}
			{isOpen && (
				<div
					onClick={toggleSidebar}
					className='fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden'
				/>
			)}
		</>
	);
};

export default Sidebar;
