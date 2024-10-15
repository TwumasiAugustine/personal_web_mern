import { useState, useEffect , useContext} from 'react';
import { FaHome, FaBookmark, FaUser, FaBars } from 'react-icons/fa';
import { MdCreate, MdLogout } from 'react-icons/md';
import { social } from '/src/data.js';
import Logo from '/src/assets/myphotoencoded.jpeg';
import { Link, Outlet } from 'react-router-dom';
import {UserContext} from '/src/UserContext';
const NavBar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const {setUserInfo, userInfo} = useContext(UserContext)
	useEffect(() => {
		fetch('http://localhost:4000/profile', {
			credentials: 'include',
		}).then((response) => {
			response.json().then((userInfo) => {
				setUserInfo(userInfo);
			});
		});
	}, []);

	function logout (){
		fetch('http://localhost:4000/logout', {
			credentials: 'include',
			method: 'POST'
		})

		setUserInfo(null)
	}

	const username = userInfo?.username;
	return (
		<div>
			<header className='bg-gray-800 text-white p-4 lg:w-64 lg:h-full lg:fixed lg:flex lg:flex-col lg:justify-between lg:items-center shadow-md lg:px-8'>
				<div className='flex lg:flex-col justify-between items-center  lg:mb-0'>
					<h1 className='text-2xl font-bold'>
						<a
							href='#'
							className='no-underline'>
							Twumasi&apos;s Blog
						</a>
					</h1>
					<button
						onClick={() => setIsOpen(!isOpen)}
						className='text-white lg:hidden block border p-2 focus:outline-none'>
						<FaBars size={24} />
					</button>
				</div>
				<nav
					className={`rounded-lg p-4 lg:flex lg:flex-col lg:items-center ${
						isOpen ? 'block' : 'hidden'
					} lg:block`}>
					<div className='profile-section text-center mb-4 lg:mb-0'>
						<img
							className='w-24 h-24 mb-3 rounded-full mx-auto'
							src={Logo}
							alt='Profile'
						/>
						<div className='text-sm mb-3'>
							Hi, my name is Twumasi Doe. Briefly introduce
							yourself here. You can also provide a link to the
							about page.
							<br />
							<Link
								to='/'
								className='text-blue-500 p-2'>
								Find out more about me
							</Link>
						</div>
						<ul className='flex justify-center lg:justify-between items-center space-x-4 mb-4'>
							{social.map((link) => (
								<li
									key={link.id}
									className='list-inline-item flex'>
									<a
										target='_blank'
										href={link.url}
										className='p-2 bg-white rounded-full hover:cursor-pointer'>
										<link.icon className='text-gray-800 h-4 w-4' />
									</a>
								</li>
							))}
						</ul>
						<hr className='border-gray-700 my-4' />
					</div>
					<ul className='navbar-nav flex flex-col space-y-2 text-white mb-4'>
						<li className='nav-item'>
							<Link
								to='/blog'
								className='nav-link flex items-center'>
								<FaHome className='mr-2' />
								Blog Home
							</Link>
						</li>
						<li className='nav-item'>
							<Link
								to='/blog/detail'
								className='nav-link flex items-center'>
								<FaBookmark className='mr-2' />
								Blog Post
							</Link>
						</li>
						<li className='nav-item'>
							<Link
								to='/'
								className='nav-link flex items-center'>
								<FaUser className='mr-2' />
								About Me
							</Link>
						</li>
						{username && (
							<li className='nav-item'>
								<Link
								className='nav-link flex items-center'
								to='/blog/create'>
								<MdCreate className='mr-2'/>
									Create new post
								</Link>
								<a href='#' onClick={logout} className='nav-link flex items-center'>
									<MdLogout className='mr-2'/>
									Logout
								</a>
							</li>
						)}
						{!username && (
							<>
								<li className='nav-item'>
									<Link
										className='nav-link flex items-center'
										to='/blog/login'>
										Login
									</Link>
								</li>
								<li className='nav-item'>
									<Link
										className='nav-link flex items-center'
										to='/blog/register'>
										Register
									</Link>
								</li>
							</>
						)}
					</ul>
					<div className='text-center lg:text-left'>
						<a
							href='https://example.com/'
							target='_blank'
							rel='noopener noreferrer'
							className='p-2 bg-gray-600 hover:bg-gray-700 rounded-lg block'>
							Get in Touch
						</a>
					</div>
				</nav>
			</header>
			<Outlet />
		</div>
	);
};

export default NavBar;
