import { useState, useContext, useRef, useEffect, useCallback } from 'react';
import axios from 'axios';
import { NavLink, Outlet } from 'react-router-dom';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { navigation } from '../../data';
import { UserContext } from '../../context/UserContext';

const serverUrl = import.meta.env.VITE_SERVER_URL;

const NavBar = () => {
	const [openMenu, setOpenMenu] = useState(false);
	const [showSearch, setShowSearch] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const searchRef = useRef(null);

	const { userInfo, handleLogout } = useContext(UserContext);
	const userRole = userInfo?.data?.roles[0];

	const handleSearch = useCallback(async () => {
		if (!searchQuery) {
			setSearchResults([]);
			return;
		}

		const lowercasedQuery = searchQuery.toLowerCase();

		try {
			const response = await axios.get(`${serverUrl}/blog/search`, {
				params: { query: lowercasedQuery },
			});
			const { data } = response;

			const filteredResults = data.filter((result) => {
				return (
					(result.title &&
						result.title.toLowerCase().includes(lowercasedQuery)) ||
					(result.summary &&
						result.summary
							.toLowerCase()
							.includes(lowercasedQuery)) ||
					(result.content &&
						result.content.toLowerCase().includes(lowercasedQuery))
				);
			});

			setSearchResults(filteredResults);
		} catch (error) {
			alert('Error fetching search results');
		}
	}, [searchQuery]);

	useEffect(() => {
		handleSearch();
	}, [searchQuery, handleSearch]);

	const handleClickOutside = (event) => {
		if (searchRef.current && !searchRef.current.contains(event.target)) {
			setShowSearch(false);
			setSearchQuery('');
			setSearchResults([]);
		}
	};

	useEffect(() => {
		if (showSearch) {
			document.addEventListener('click', handleClickOutside);
		} else {
			document.removeEventListener('click', handleClickOutside);
		}

		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, [showSearch]);

	return (
		<nav className='bg-gray-800 sticky top-0 z-50'>
			<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
				<div className='flex h-16 items-center justify-between'>
					<div className='flex items-center justify-between'>
						<div className='hidden lg:block'>
							<div className='ml-10 flex items-baseline space-x-4'>
								{navigation.map(
									(item) =>
										item.to && (
											<NavLink
												key={item.id}
												to={item.to}
												className={({ isActive }) =>
													`text-gray-300 px-3 py-2 rounded-md text-sm font-medium ${
														isActive
															? 'bg-gray-900 text-white'
															: 'hover:bg-gray-700 hover:text-white'
													}`
												}>
												{item.name}
											</NavLink>
										),
								)}
							</div>
						</div>

						<div className='hidden lg:block'>
							<Menu
								as='div'
								className='relative'>
								<MenuButton className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
									Other Links
								</MenuButton>
								<MenuItems className='absolute right-0 w-48 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
									<div className='py-1'>
										{navigation.map(
											(item) =>
												item.href && (
													<MenuItem key={item.id}>
														{({ active }) => (
															<a
																href={item.href}
																className={`block px-4 py-2 text-sm text-gray-700 ${
																	active
																		? 'bg-gray-100'
																		: ''
																}`}>
																{item.name}
															</a>
														)}
													</MenuItem>
												),
										)}
									</div>
								</MenuItems>
							</Menu>
						</div>
					</div>

					{/* Search Icon and Bar */}
					<div
						className='relative lg:flex lg:items-center justify-center lg:ml-4 hidden'
						>
							<div className='absolute -top-7 right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10'>
								<input
									type='search'
									value={searchQuery}
									onChange={(e) =>
										setSearchQuery(e.target.value)
									}
									autoFocus
									placeholder='Search...'
									className='w-full px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
								/>
								{searchQuery && (
									<div className='mt-1 bg-white border border-gray-300 rounded-md max-h-40 overflow-y-auto'>
										{searchResults.length > 0 ? (
											searchResults.map((result) => (
												<ul
													key={result._id}
													className='px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer'>
													<li className='line-clamp-2'>
                                                        <NavLink
                                                            
															to={`/blog/${result._id}`}
															key={result._id}
															className='px-4 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer'>
															{result.summary ||
																'No content available'}
														</NavLink>
													</li>
												</ul>
											))
										) : (
											<div className='px-4 py-2 text-sm text-gray-700 text-center'>
												No results found.
											</div>
										)}
									</div>
								)}
							</div>
					</div>

					<div className='hidden lg:block'>
						<div className='ml-4 flex items-center lg:ml-6'>
							{userInfo?.data?.username && (
								<>
									{userRole === 'admin' && (
										<NavLink
											to='/dashboard'
											className={({ isActive }) =>
												`text-gray-300 px-3 py-2 rounded-md text-sm font-medium ${
													isActive
														? 'bg-gray-900 text-white'
														: 'hover:bg-gray-700 hover:text-white'
												}`
											}>
											Dashboard
										</NavLink>
									)}
									<a
										href='#'
										onClick={handleLogout}
										className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
										Logout
									</a>
								</>
							)}
						</div>
					</div>

					<div className='flex lg:hidden'>
						<button
							onClick={() => setOpenMenu(!openMenu)}
							type='searchon'
							className='relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
							<span className='sr-only'>Open main menu</span>
							<svg
								className='block h-6 w-6'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth='1.5'
								stroke='currentColor'
								aria-hidden='true'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'></path>
							</svg>
						</button>
					</div>
				</div>
			</div>

			{/* Mobile Menu */}
			<div
				className={`lg:hidden ${openMenu ? 'block' : 'hidden'}`}
				id='mobile-menu'>
				<div className='space-y-1 px-2 pb-3 pt-2 sm:px-3'>
					{navigation.map(
						(item) =>
							item.to && (
								<NavLink
									key={item.id}
									to={item.to}
									className={({ isActive }) =>
										`text-gray-300 px-3 py-2 rounded-md text-sm font-medium ${
											isActive
												? 'bg-gray-900 text-white'
												: 'hover:bg-gray-700 hover:text-white'
										}`
									}>
									{item.name}
								</NavLink>
							),
					)}
				</div>

				{/* Search in Mobile */}
				<div className='px-4 py-2'>
					<input
						type='search'
						value={searchQuery}
						autoFocus
						onChange={(e) => setSearchQuery(e.target.value)}
						placeholder='Search...'
						className='w-full px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
					/>
					{searchQuery && (
						<div className='mt-1 bg-white border border-gray-300 rounded-md max-h-40 overflow-y-auto'>
							{searchResults.length > 0 ? (
								searchResults.map((result) => (
									<ul
										key={result._id}
										className='px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer'>
										<li className='line-clamp-2'>
											<NavLink
												to={`/blog/${result._id}`}
												key={result._id}
												className='px-4  text-sm text-gray-700 hover:bg-gray-100 cursor-pointer lead-2'>
												{result.summary ||
													'No content available'}
											</NavLink>
										</li>
									</ul>
								))
							) : (
								<div className='px-4 py-2 text-sm text-gray-700 text-center'>
									No results found.
								</div>
							)}
						</div>
					)}
				</div>
			</div>

			<Outlet />
		</nav>
	);
};

export default NavBar;
