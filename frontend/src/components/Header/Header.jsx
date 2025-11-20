import React from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
	const authStatus = useSelector((state) => state.auth.status);
	const navigate = useNavigate();

	const navItems = [
		{
			name: 'Home',
			slug: '/',
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

	return (
		<header className='sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm'>
			<Container>
				<nav className='flex items-center justify-between py-4'>
					<div className='flex items-center'>
						<Link to='/' className='transition-opacity hover:opacity-80'>
							<Logo width='70px' />
						</Link>
					</div>
					<ul className='flex items-center gap-2'>
						{navItems.map((item) =>
							item.active ? (
								<li key={item.name}>
									<button
										onClick={() => navigate(item.slug)}
										className='px-4 py-2 text-sm font-medium text-gray-700 rounded-lg transition-all duration-200 hover:bg-gray-100 hover:text-gray-900'>
										{item.name}
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
				</nav>
			</Container>
		</header>
	);
}

export default Header;
