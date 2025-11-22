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

	// Not logged in
	if (!authStatus) {
		return (
			<div className='w-full py-16 md:py-24'>
				<Container>
					<div className='max-w-2xl mx-auto text-center'>
						<h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>
							Welcome to Postify
						</h1>
						<p className='text-xl text-gray-600 mb-8'>
							Discover and share amazing stories. Login to see posts or create your own.
						</p>
						<Link to='/login'>
							<Button className='text-base px-8 py-3'>Get Started</Button>
						</Link>
					</div>
				</Container>
			</div>
		);
	}

	// Logged in but no posts
	if (posts.length === 0) {
		return (
			<div className='w-full py-16 md:py-24'>
				<Container>
					<div className='max-w-2xl mx-auto text-center'>
						<h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>
							No posts yet
						</h1>
						<p className='text-xl text-gray-600 mb-8'>
							Be the first one to create a post and share your thoughts with the community.
						</p>
						<Link to='/add-post'>
							<Button className='text-base px-8 py-3'>Create Your First Post</Button>
						</Link>
					</div>
				</Container>
			</div>
		);
	}

	// Logged in + posts exist
	return (
		<div className='w-full py-12 md:py-16'>
			<Container>
				<div className='mb-8'>
					<h1 className='text-3xl md:text-4xl font-bold text-gray-900 mb-2'>
						Latest Posts
					</h1>
					<p className='text-gray-600'>Discover stories from our community</p>
				</div>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
					{posts.map((post) => (
						<PostCard key={post.$id} {...post} />
					))}
				</div>
			</Container>
		</div>
	);
}

export default Home;
