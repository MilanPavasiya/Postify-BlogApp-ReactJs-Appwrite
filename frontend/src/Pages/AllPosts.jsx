import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components/index';
import appwriteService from '../appwrite/configuration';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function AllPosts() {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [filter, setFilter] = useState('active');
	const navigate = useNavigate();
	const userData = useSelector((state) => state.auth.userData);

	useEffect(() => {
		if (!userData) {
			navigate('/login');
			return;
		}

		const fetchPosts = async () => {
			setLoading(true);
			try {
				const status = filter === 'all' ? null : filter;
				const result = await appwriteService.getAllPosts(userData.$id, status);

				if (result?.documents) {
					setPosts(result.documents);
				} else {
					setPosts([]);
				}
			} catch (error) {
				console.error('Error fetching posts:', error);
				setPosts([]);
			} finally {
				setLoading(false);
			}
		};

		fetchPosts();
	}, [navigate, userData, filter]);

	if (loading) {
		return (
			<div className='w-full py-20 text-center'>
				<div className='inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
				<p className='mt-4 text-gray-600'>Loading posts...</p>
			</div>
		);
	}

	return (
		<div className='w-full py-8 sm:py-12 md:py-16 bg-gradient-to-br from-purple-50 via-white to-blue-50'>
			<Container>
				<div className='mb-8 sm:mb-12 text-center animate-fade-in px-4 sm:px-0'>
					<h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent mb-3 sm:mb-4 animate-slide-up'>
						All Posts
					</h1>
					<p className='text-base sm:text-lg md:text-xl text-gray-600 animate-fade-in-up mb-6' style={{ animationDelay: '0.2s' }}>
						Browse all your posts
					</p>
					
					<div className='flex justify-center gap-2 sm:gap-3 mb-6'>
						<button
							onClick={() => setFilter('active')}
							className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-medium text-sm sm:text-base transition-all duration-200 ${
								filter === 'active'
									? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
									: 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
							}`}>
							Active Posts
						</button>
						<button
							onClick={() => setFilter('inactive')}
							className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-medium text-sm sm:text-base transition-all duration-200 ${
								filter === 'inactive'
									? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
									: 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
							}`}>
							Inactive Posts
						</button>
						<button
							onClick={() => setFilter('all')}
							className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-medium text-sm sm:text-base transition-all duration-200 ${
								filter === 'all'
									? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
									: 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
							}`}>
							All Posts
						</button>
					</div>
				</div>

				{posts.length > 0 ? (
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6'>
						{posts.map((post, index) => (
							<div
								key={post.$id}
								className='animate-fade-in-up'
								style={{ animationDelay: `${index * 0.1}s` }}>
								<PostCard {...post} />
							</div>
						))}
					</div>
				) : (
					<div className='text-center py-12 sm:py-16'>
						<div className='bg-white rounded-xl p-8 sm:p-12 shadow-lg border border-gray-200 max-w-md mx-auto'>
							<svg
								className='w-16 h-16 sm:w-20 sm:h-20 mx-auto text-gray-400 mb-4'
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
							<h3 className='text-lg sm:text-xl font-semibold text-gray-900 mb-2'>
								No {filter === 'all' ? '' : filter} posts found
							</h3>
							<p className='text-sm sm:text-base text-gray-600 mb-6'>
								{filter === 'active'
									? "You don't have any active posts yet. Create one to get started!"
									: filter === 'inactive'
									? "You don't have any inactive posts."
									: "You don't have any posts yet. Create one to get started!"}
							</p>
							{filter === 'active' || filter === 'all' ? (
								<Link
									to='/add-post'
									className='inline-block px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200 hover:scale-105 transform'>
									Create New Post
								</Link>
							) : null}
						</div>
					</div>
				)}
			</Container>
		</div>
	);
}

export default AllPosts;
