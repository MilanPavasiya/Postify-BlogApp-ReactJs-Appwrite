import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components/index';
import appwriteService from '../appwrite/configuration';
import { useNavigate } from 'react-router-dom';

function AllPosts() {
	const [posts, setPosts] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const result = await appwriteService.getAllPosts();

				if (result?.documents?.length > 0) {
					setPosts(result.documents);
				} else {
					navigate('/');
				}
			} catch (error) {
				console.error('Error fetching posts:', error);
				navigate('/');
			}
		};

		fetchPosts();
	}, [navigate]);

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
