import React from 'react';
import { Container, PostForm } from '../components/index';
import { useSelector } from 'react-redux';

function AddPost() {
	const userData = useSelector((state) => state.auth.userData);
	
	return (
		<div className='py-6 sm:py-8 md:py-12'>
			<Container>
				<div className='max-w-7xl mx-auto px-4 sm:px-0'>
					<header className='mb-6 sm:mb-8'>
						<h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2'>
							Create New Post
						</h1>
						<p className='text-sm sm:text-base text-gray-600'>Share your thoughts and ideas with the community</p>
					</header>
					<PostForm key={userData?.$id || 'no-user'} />
				</div>
			</Container>
		</div>
	);
}

export default AddPost;
