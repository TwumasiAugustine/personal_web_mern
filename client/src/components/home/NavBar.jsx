import { useState, useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom'; // Change to NavLink
import {
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
} from '@headlessui/react';
import { navigation } from '../../data';
import { UserContext } from '../../context/UserContext';

const NavBar = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const { userInfo, handleLogout } = useContext(UserContext);

    return (
        <nav className='bg-gray-800 sticky top-0 z-50'>
            <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                <div className='flex h-16 items-center justify-between'>
                    <div className='flex items-center'>
                        <div className='hidden lg:block'>
                            <div className='ml-10 flex items-baseline space-x-4'>
                                {navigation.map((item) =>
                                    item.to && (
                                        <NavLink
                                            key={item.id}
                                            to={item.to}
                                            className={({ isActive }) =>
                                                `text-gray-300 px-3 py-2 rounded-md text-sm font-medium ${
                                                    isActive ? 'bg-gray-900 text-white' : 'hover:bg-gray-700 hover:text-white'
                                                }`
                                            }
                                        >
                                            {item.name}
                                        </NavLink>
                                    )
                                )}
                            </div>
                        </div>

                        <div className='hidden lg:block'>
                            <Menu as='div' className='relative'>
                                <MenuButton className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
                                    Other Links
                                </MenuButton>
                                <MenuItems className='absolute right-0 w-48 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                                    <div className='py-1'>
                                        {navigation.map((item) =>
                                            item.href && (
                                                <MenuItem key={item.id}>
                                                    {({ active }) => (
                                                        <a
                                                            href={item.href}
                                                            className={`block px-4 py-2 text-sm text-gray-700 ${
                                                                active ? 'bg-gray-100' : ''
                                                            }`}
                                                        >
                                                            {item.name}
                                                        </a>
                                                    )}
                                                </MenuItem>
                                            )
                                        )}
                                    </div>
                                </MenuItems>
                            </Menu>
                        </div>
                    </div>

                    <div className='hidden lg:block'>
                        <div className='ml-4 flex items-center lg:ml-6'>
                            {userInfo?.username ? (
                                <>
                                    <NavLink
                                        to='/dashboard'
                                        className={({ isActive }) =>
                                            `text-gray-300 px-3 py-2 rounded-md text-sm font-medium ${
                                                isActive ? 'bg-gray-900 text-white' : 'hover:bg-gray-700 hover:text-white'
                                            }`
                                        }
                                    >
                                        Dashboard
                                    </NavLink>
                                    <a
                                        href='#'
                                        onClick={handleLogout}
                                        className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
                                    >
                                        Logout
                                    </a>
                                </>
                            ) : (
                                <>
                                    <NavLink
                                        to='/blog/signup'
                                        className={({ isActive }) =>
                                            `text-gray-300 px-3 py-2 rounded-md text-sm font-medium ${
                                                isActive ? 'bg-gray-900 text-white' : 'hover:bg-gray-700 hover:text-white'
                                            }`
                                        }
                                    >
                                        Signup
                                    </NavLink>
                                    <NavLink
                                        to='/blog/login'
                                        className={({ isActive }) =>
                                            `text-gray-300 px-3 py-2 rounded-md text-sm font-medium ${
                                                isActive ? 'bg-gray-900 text-white' : 'hover:bg-gray-700 hover:text-white'
                                            }`
                                        }
                                    >
                                        Login
                                    </NavLink>
                                </>
                            )}
                        </div>
                    </div>

                    <div className='flex lg:hidden'>
                        <button
                            onClick={() => setOpenMenu(!openMenu)}
                            type='button'
                            className='relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
                        >
                            <span className='sr-only'>Open main menu</span>
                            <svg
                                className='block h-6 w-6'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth='1.5'
                                stroke='currentColor'
                                aria-hidden='true'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
                                ></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div
                className={`lg:hidden ${openMenu ? 'block' : 'hidden'}`}
                id='mobile-menu'
            >
                <div className='space-y-1 px-2 pb-3 pt-2 sm:px-3'>
                    {navigation.map((item) =>
                        item.to && (
                            <NavLink
                                key={item.id}
                                to={item.to}
                                className={({ isActive }) =>
                                    `text-gray-300 px-3 py-2 rounded-md text-sm font-medium ${
                                        isActive ? 'bg-gray-900 text-white' : 'hover:bg-gray-700 hover:text-white'
                                    }`
                                }
                            >
                                {item.name}
                            </NavLink>
                        )
                    )}
                </div>

                <div className='border-t border-gray-700 pb-3 pt-4'>
                    <div className='space-y-1 px-2'>
                        {userInfo?.username ? (
                            <>
                                <NavLink
                                    to='/dashboard'
                                    className={({ isActive }) =>
                                        `text-gray-300 px-3 py-2 rounded-md text-sm font-medium ${
                                            isActive ? 'bg-gray-900 text-white' : 'hover:bg-gray-700 hover:text-white'
                                        }`
                                    }
                                >
                                    Dashboard
                                </NavLink>
                                <a
                                    href='#'
                                    onClick={handleLogout}
                                    className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
                                >
                                    Logout
                                </a>
                            </>
                        ) : (
                            <>
                                <NavLink
                                    to='/blog/signup'
                                    className={({ isActive }) =>
                                        `text-gray-300 px-3 py-2 rounded-md text-sm font-medium ${
                                            isActive ? 'bg-gray-900 text-white' : 'hover:bg-gray-700 hover:text-white'
                                        }`
                                    }
                                >
                                    Signup
                                </NavLink>
                                <NavLink
                                    to='/blog/login'
                                    className={({ isActive }) =>
                                        `text-gray-300 px-3 py-2 rounded-md text-sm font-medium ${
                                            isActive ? 'bg-gray-900 text-white' : 'hover:bg-gray-700 hover:text-white'
                                        }`
                                    }
                                >
                                    Login
                                </NavLink>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <Outlet />
        </nav>
    );
};

export default NavBar;
