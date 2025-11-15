import React, { useEffect, useState } from 'react';
import appwriteService from '../appwrite/configuration';
import { Container, PostCard, Button } from '../components/index';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Home() {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	const authStatus = useSelector((state) => state.auth.status);

	useEffect(() => {
		if (!authStatus) {
			setLoading(false);
			return;
		}

		const fetchPosts = async () => {
			const response = await appwriteService.getAllPosts();
			setPosts(response ? response.documents : []);
			setLoading(false);
		};

		fetchPosts();
	}, [authStatus]);

	// Loader
	if (loading) {
		return (
			<div className='w-full py-20 text-center'>
				<h2 className='text-xl font-semibold'>Loading posts...</h2>
			</div>
		);
	}

	// Not logged in
	if (!authStatus) {
		return (
			<div className='w-full py-10 text-center'>
				<Container>
					<h1 className='text-2xl font-bold mb-4'>Login to see posts</h1>
					<Link to='/login'>
						<Button>Login</Button>
					</Link>
				</Container>
			</div>
		);
	}

	// Logged in but no posts
	if (posts.length === 0) {
		return (
			<div className='w-full py-10 text-center'>
				<Container>
					<h1 className='text-2xl font-bold mb-3'>No posts yet</h1>
					<p className='text-gray-600 mb-6'>
						Be the first one to create a post.
					</p>

					<Link to='/add-post'>
						<Button>Create Post</Button>
					</Link>
				</Container>
			</div>
		);
	}

	// Logged in + posts exist
	return (
		<div className='w-full py-8'>
			<Container>
				<div className='flex flex-wrap'>
					{posts.map((post) => (
						<div key={post.$id} className='p-2 w-1/4'>
							<PostCard {...post} />
						</div>
					))}
				</div>
			</Container>
		</div>
	);
}

export default Home;
