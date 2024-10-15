import { useState } from 'react';
import '/src/styles/home.css';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, Outlet } from 'react-router-dom';
import { navigation } from '/src/data.js';
import SEO from './SEO';

const NavBar = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const filterItemsByKey = (array, key) => {
		const seen = new Set();
		return array.filter((item) => {
			const keyValue = item[key];
			if (seen.has(keyValue)) {
				return false;
			} else {
				seen.add(keyValue);
				return true;
			}
		});
	};

	const filteredNavItems = filterItemsByKey(navigation, 'id');

	const handleNavLinkClick = () => {
		setMobileMenuOpen(false);
	};


	return (
		<div>
			<SEO
				title='Home'
				description='Personal portfolio website for Twumasi Augustine'
				type='Personal Portfolio Website'
				name='Twumasi Augustine'
			/>
			<header className='header-container fixed bg-gray-800 inset-x-0 top-0 z-50 h-16 shadow-md'>
				<nav
					aria-label='Global'
					className='flex items-center justify-between h-full px-4 md:px-6 lg:px-8'>
					<div className='flex lg:flex-1'>
						<Link
							to='/'
							className='-m-1.5 p-1.5'>
							<span className='sr-only'>Twumasi</span>
							<span className='text-white text-lg font-semibold'>
								Twumasi
							</span>
						</Link>
					</div>
					<div className='flex lg:hidden items-center'>
						<button
							type='button'
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
							className='inline-flex items-center justify-center rounded-md p-2.5 text-gray-200'>
							<span className='sr-only'>Open main menu</span>
							{mobileMenuOpen ? (
								<XMarkIcon
									className='h-6 w-6'
									aria-hidden='true'
								/>
							) : (
								<Bars3Icon
									className='h-6 w-6'
									aria-hidden='true'
								/>
							)}
						</button>
					</div>
					<div className='hidden lg:flex lg:gap-x-12'>
						{filteredNavItems
							.filter((item) => item.to)
							.map((item) => (
								<Link
									key={item.id}
									to={item.to}
									className='active text-sm font-semibold leading-6 text-white transition-colors duration-200'>
									{item.name}
								</Link>
							))}
						<div className='relative'>
							<button
								onClick={toggleDropdown}
								className='text-sm font-semibold leading-6 text-white flex items-center hover:text-indigo-500 transition-colors duration-200'>
								More
								<svg
									className={`w-4 h-4 ml-2 transition-transform ${
										isOpen ? 'rotate-180' : ''
									}`}
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										d='M19 9l-7 7-7-7'
									/>
								</svg>
							</button>
							{isOpen && (
								<div className='absolute right-0 mt-5 w-48 bg-white text-gray-800 rounded-md shadow-lg ring-1 ring-gray-900/5'>
									{filteredNavItems
										.filter((item) => item.href)
										.map((item) => (
											<a
												key={item.id}
												href={item.href}
												className='block px-4 py-2 text-gray-700 hover:bg-gray-100'
												target={
													item.href.startsWith('http')
														? '_blank'
														: '_self'
												}
												rel={
													item.href.startsWith('http')
														? 'noopener noreferrer'
														: undefined
												}>
												{item.name}
											</a>
										))}
								</div>
							)}
						</div>
					</div>
				</nav>
				{mobileMenuOpen && (
					<div className='fixed inset-0 z-40 bg-gray-800 bg-opacity-75 lg:hidden'>
						<div
							className='absolute inset-y-0 right-0 w-64 bg-gray-800 text-white shadow-lg transform transition-transform duration-300 ease-in-out'
							style={{
								transform: mobileMenuOpen
									? 'translateX(0)'
									: 'translateX(100%)',
							}}>
							<div className='p-6'>
								<div className='flex items-center justify-between'>
									<Link
										to='/'
										className='text-lg font-semibold text-gray-800'>
										Twumasi
									</Link>
									<button
										type='button'
										onClick={() => setMobileMenuOpen(false)}
										className='p-2 text-white'>
										<XMarkIcon
											className='h-6 w-6'
											aria-hidden='true'
										/>
									</button>
								</div>
								<div className='mt-6 space-y-4'>
									{filteredNavItems
										.filter((item) => item.to)
										.map((item) => (
											<Link
												key={item.id}
												to={item.to}
												className='active block px-4 py-2 text-base font-medium text-white hover:text-gray-300'
												onClick={handleNavLinkClick}>
												{item.name}
											</Link>
										))}
								</div>
								<div className='relative mt-6'>
									<button
										onClick={toggleDropdown}
										className='text-base font-bold flex items-center'>
										More
										<svg
											className={`w-4 h-4 ml-2 transition-transform ${
												isOpen ? 'rotate-180' : ''
											}`}
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth='2'
												d='M19 9l-7 7-7-7'
											/>
										</svg>
									</button>
									{isOpen && (
										<div className='absolute left-0 mt-2 w-full bg-white text-gray-800 rounded-md shadow-lg ring-1 ring-gray-900/5'>
											{filteredNavItems
												.filter((item) => item.href)
												.map((item) => (
													<a
														key={item.id}
														href={item.href}
														className='block px-4 py-2 text-black hover:bg-gray-100'
														target={
															item.href.startsWith(
																'http',
															)
																? '_blank'
																: '_self'
														}
														rel={
															item.href.startsWith(
																'http',
															)
																? 'noopener noreferrer'
																: undefined
														} onClick={handleNavLinkClick}>
														{item.name}
													</a>
												))}
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				)}
			</header>
			<Outlet />
		</div>
	);
};

export default NavBar;
