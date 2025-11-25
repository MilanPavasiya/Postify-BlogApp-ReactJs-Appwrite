import React, { useState } from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';

function Header() {
	const authStatus = useSelector((state) => state.auth.status);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const navItems = [
		{
			name: 'Home',
			slug: '/',
			active: true,
		},
		{
			name: 'Docs',
			slug: '/docs',
			active: true,
		},
		{
			name: 'Login',
			slug: '/login',
			active: !authStatus,
		},
		{
			name: 'Signup',
			slug: '/signup',
			active: !authStatus,
		},
		{
			name: 'All Posts',
			slug: '/all-posts',
			active: authStatus,
		},
		{
			name: 'Add Post',
			slug: '/add-post',
			active: authStatus,
		},
	];

	const handleNavClick = (slug) => {
		navigate(slug);
		setMobileMenuOpen(false);
	};

	const logoutHandler = () => {
		authService.logout().then(() => dispatch(logout()));
		setMobileMenuOpen(false);
	};

	return (
		<header className='md:hidden sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg'>
			<Container>
				<nav className='flex items-center justify-between py-3 md:py-4'>
					<div className='flex items-center'>
						<Link
							to='/'
							className='transition-all duration-300 hover:scale-105 transform inline-block'>
							<Logo width='100px' className='sm:w-[120px]' />
						</Link>
					</div>
					<ul className='hidden md:flex items-center gap-2'>
						{navItems.map((item) =>
							item.active ? (
								<li key={item.name}>
									<button
										onClick={() => navigate(item.slug)}
										className='px-3 lg:px-4 py-2 text-xs lg:text-sm font-medium text-gray-700 rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 hover:scale-105 transform relative group'>
										<span className='relative z-10'>{item.name}</span>
										<span className='absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300'></span>
									</button>
								</li>
							) : null
						)}
						{authStatus && (
							<li>
								<LogoutBtn />
							</li>
						)}
					</ul>

					<button
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						className='md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors'
						aria-label='Toggle menu'>
						{!mobileMenuOpen ? (
							<svg
								className='w-6 h-6'
								fill='none'
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								viewBox='0 0 24 24'
								stroke='currentColor'>
								<path d='M4 6h16M4 12h16M4 18h16'></path>
							</svg>
						) : (
							<svg
								className='w-6 h-6'
								fill='none'
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								viewBox='0 0 24 24'
								stroke='currentColor'>
								<path d='M6 18L18 6M6 6l12 12'></path>
							</svg>
						)}
					</button>
				</nav>

				{mobileMenuOpen && (
					<div className='md:hidden border-t border-gray-200 py-4 animate-fade-in'>
						<ul className='flex flex-col gap-2'>
							{navItems.map((item) =>
								item.active ? (
									<li key={item.name}>
										<button
											onClick={() => handleNavClick(item.slug)}
											className='w-full text-left px-4 py-3 text-base font-medium text-gray-700 rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600'>
											{item.name}
										</button>
									</li>
								) : null
							)}
							{authStatus && (
								<li className='px-4 py-2'>
									<button
										onClick={logoutHandler}
										className='w-full text-left px-4 py-3 text-base font-medium text-white bg-red-500 rounded-lg transition-all duration-300 hover:bg-red-600'>
										Logout
									</button>
								</li>
							)}
						</ul>
					</div>
				)}
			</Container>
		</header>
	);
}

export default Header;
