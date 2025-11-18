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

export default AllPosts;
