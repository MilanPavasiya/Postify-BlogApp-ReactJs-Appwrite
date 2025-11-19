import React from 'react';
import { Container, PostForm } from '../components/index';

function AddPost() {
	return (
		<div className='py-8 md:py-12'>
			<Container>
				<div className='max-w-7xl mx-auto'>
					<header className='mb-8'>
						<h1 className='text-3xl md:text-4xl font-bold text-gray-900 mb-2'>
							Create New Post
						</h1>
						<p className='text-gray-600'>Share your thoughts and ideas with the community</p>
					</header>
					<PostForm />
				</div>
			</Container>
		</div>
	);
}

export default AddPost;
