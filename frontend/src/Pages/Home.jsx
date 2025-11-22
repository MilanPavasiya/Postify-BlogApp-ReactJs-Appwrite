import React, { useEffect, useState } from 'react';
import appwriteService from '../appwrite/configuration';
import { Container, PostCard, Button } from '../components/index';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Home() {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	const authStatus = useSelector((state) => state.auth.status);
	const userData = useSelector((state) => state.auth.userData);

	useEffect(() => {
		if (!authStatus || !userData) {
			setLoading(false);
			return;
		}

		const fetchPosts = async () => {
			const response = await appwriteService.getAllPosts(userData.$id);
			setPosts(response ? response.documents : []);
			setLoading(false);
		};

		fetchPosts();
	}, [authStatus, userData]);

	// Loader
	if (loading) {
		return (
			<div className='w-full py-20 text-center'>
				<div className='inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
				<p className='mt-4 text-gray-600'>Loading posts...</p>
			</div>
		);
	}

	if (!authStatus) {
		return (
			<div className='w-full min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-16 md:py-24 relative overflow-hidden'>
				<div className='absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl opacity-20 animate-pulse'></div>
				<div
					className='absolute bottom-0 right-0 w-96 h-96 bg-purple-400 rounded-full filter blur-3xl opacity-20 animate-pulse'
					style={{ animationDelay: '1s' }}></div>

				<Container>
					<div className='max-w-2xl mx-auto text-center relative z-10 animate-fade-in'>
						<h1 className='text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 animate-slide-up'>
							Welcome to Postify
						</h1>
						<p
							className='text-xl text-gray-600 mb-10 leading-relaxed animate-fade-in-up'
							style={{ animationDelay: '0.2s' }}>
							Discover and share amazing stories. Login to see posts or create
							your own.
						</p>
						<div
							className='animate-fade-in-up'
							style={{ animationDelay: '0.4s' }}>
							<Link to='/login'>
								<Button className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-base px-8 py-4 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300'>
									Get Started
								</Button>
							</Link>
						</div>
					</div>
				</Container>
			</div>
		);
	}

	if (posts.length === 0) {
		return (
			<div className='w-full min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-16 md:py-24 relative overflow-hidden'>
				<div className='absolute top-20 right-10 w-72 h-72 bg-purple-300 rounded-full filter blur-3xl opacity-20 animate-pulse'></div>
				<div
					className='absolute bottom-20 left-10 w-72 h-72 bg-blue-300 rounded-full filter blur-3xl opacity-20 animate-pulse'
					style={{ animationDelay: '1.5s' }}></div>

				<Container>
					<div className='max-w-2xl mx-auto text-center relative z-10 animate-fade-in'>
						<div className='mb-8 animate-bounce'>
							<span className='text-8xl'>📝</span>
						</div>
						<h1 className='text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6 animate-slide-up'>
							No posts yet
						</h1>
						<p
							className='text-xl text-gray-600 mb-10 leading-relaxed animate-fade-in-up'
							style={{ animationDelay: '0.2s' }}>
							Be the first one to create a post and share your thoughts with the
							community.
						</p>
						<div
							className='animate-fade-in-up'
							style={{ animationDelay: '0.4s' }}>
							<Link to='/add-post'>
								<Button className='bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-base px-8 py-4 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300'>
									Create Your First Post
								</Button>
							</Link>
						</div>
					</div>
				</Container>
			</div>
		);
	}

	return (
		<div className='w-full py-12 md:py-16 bg-gradient-to-br from-gray-50 via-white to-blue-50'>
			<Container>
				<div className='mb-12 text-center animate-fade-in'>
					<h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 animate-slide-up'>
						Latest Posts
					</h1>
					<p
						className='text-xl text-gray-600 animate-fade-in-up'
						style={{ animationDelay: '0.2s' }}>
						Discover stories from our community
					</p>
				</div>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
					{posts.map((post, index) => (
						<div
							key={post.$id}
							className='animate-fade-in-up'
							style={{ animationDelay: `${index * 0.1}s` }}>
							<PostCard {...post} />
						</div>
					))}
				</div>
			</Container>
		</div>
	);
}

export default Home;
