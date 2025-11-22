import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components/index';
import appwriteService from '../appwrite/configuration';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function AllPosts() {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
	const userData = useSelector((state) => state.auth.userData);

	useEffect(() => {
		if (!userData) {
			navigate('/login');
			return;
		}

		const fetchPosts = async () => {
			try {
				const result = await appwriteService.getAllPosts(userData.$id);

				if (result?.documents?.length > 0) {
					setPosts(result.documents);
				} else {
					navigate('/');
					return;
				}
			} catch (error) {
				console.error('Error fetching posts:', error);
				navigate('/');
				return;
			} finally {
				setLoading(false);
			}
		};

		fetchPosts();
	}, [navigate, userData]);

	if (loading) {
		return (
			<div className='w-full py-20 text-center'>
				<div className='inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
				<p className='mt-4 text-gray-600'>Loading posts...</p>
			</div>
		);
	}

	return (
		<div className='w-full py-12 md:py-16'>
			<Container>
				<div className='mb-8'>
					<h1 className='text-3xl md:text-4xl font-bold text-gray-900 mb-2'>
						All Posts
					</h1>
					<p className='text-gray-600'>Browse all posts from our community</p>
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

export default AllPosts;
