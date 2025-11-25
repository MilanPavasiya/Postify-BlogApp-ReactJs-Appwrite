import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';
import { Logo } from '../index';

function Sidebar() {
	const authStatus = useSelector((state) => state.auth.status);
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const logoutHandler = () => {
		authService.logout().then(() => dispatch(logout()));
	};

	const navItems = [
		{
			name: 'Home',
			slug: '/',
			icon: (
				<svg
					className='w-5 h-5'
					fill='none'
					stroke='currentColor'
					viewBox='0 0 24 24'>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
						d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
					/>
				</svg>
			),
			active: true,
		},
		{
			name: 'All Posts',
			slug: '/all-posts',
			icon: (
				<svg
					className='w-5 h-5'
					fill='none'
					stroke='currentColor'
					viewBox='0 0 24 24'>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
						d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
					/>
				</svg>
			),
			active: authStatus,
		},
		{
			name: 'Add Post',
			slug: '/add-post',
			icon: (
				<svg
					className='w-5 h-5'
					fill='none'
					stroke='currentColor'
					viewBox='0 0 24 24'>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
						d='M12 4v16m8-8H4'
					/>
				</svg>
			),
			active: authStatus,
		},
		{
			name: 'Documentation',
			slug: '/docs',
			icon: (
				<svg
					className='w-5 h-5'
					fill='none'
					stroke='currentColor'
					viewBox='0 0 24 24'>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
						d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
					/>
				</svg>
			),
			active: true,
		},
		{
			name: 'Features',
			slug: '/features',
			icon: (
				<svg
					className='w-5 h-5'
					fill='none'
					stroke='currentColor'
					viewBox='0 0 24 24'>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
						d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
					/>
				</svg>
			),
			active: true,
		},
		{
			name: 'Pricing',
			slug: '/pricing',
			icon: (
				<svg
					className='w-5 h-5'
					fill='none'
					stroke='currentColor'
					viewBox='0 0 24 24'>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
						d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
					/>
				</svg>
			),
			active: true,
		},
		{
			name: 'Contact',
			slug: '/contact',
			icon: (
				<svg
					className='w-5 h-5'
					fill='none'
					stroke='currentColor'
					viewBox='0 0 24 24'>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
						d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
					/>
				</svg>
			),
			active: true,
		},
		{
			name: 'Login',
			slug: '/login',
			icon: (
				<svg
					className='w-5 h-5'
					fill='none'
					stroke='currentColor'
					viewBox='0 0 24 24'>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
						d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1'
					/>
				</svg>
			),
			active: !authStatus,
		},
		{
			name: 'Signup',
			slug: '/signup',
			icon: (
				<svg
					className='w-5 h-5'
					fill='none'
					stroke='currentColor'
					viewBox='0 0 24 24'>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
						d='M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z'
					/>
				</svg>
			),
			active: !authStatus,
		},
	];

	const isActive = (slug) => {
		if (slug === '/') {
			return location.pathname === '/';
		}
		return location.pathname.startsWith(slug);
	};

	return (
		<aside className='hidden md:flex flex-col fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 shadow-sm z-40'>
			<div className='p-6 border-b border-gray-200'>
				<Link
					to='/'
					className='transition-all duration-300 hover:scale-105 transform inline-block'>
					<Logo width='120px' />
				</Link>
			</div>

			<nav className='flex-1 overflow-y-auto py-6 px-4'>
				<ul className='space-y-2'>
					{navItems.map((item) =>
						item.active ? (
							<li key={item.name}>
								<button
									onClick={() => navigate(item.slug)}
									className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
										isActive(item.slug)
											? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
											: 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600'
									}`}>
									<span
										className={`${
											isActive(item.slug)
												? 'text-white'
												: 'text-gray-500 group-hover:text-blue-600'
										} transition-colors duration-200`}>
										{item.icon}
									</span>
									<span className='font-medium text-sm'>{item.name}</span>
								</button>
							</li>
						) : null
					)}
				</ul>
			</nav>

			{authStatus && (
				<div className='p-4 border-t border-gray-200'>
					<button
						onClick={logoutHandler}
						className='w-full px-4 py-2.5 text-sm font-medium text-gray-700 rounded-lg transition-all duration-200 hover:bg-red-500 hover:text-white'>
						Logout
					</button>
				</div>
			)}

		</aside>
	);
}

export default Sidebar;

