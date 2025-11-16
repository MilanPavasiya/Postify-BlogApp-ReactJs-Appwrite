import React from 'react';
import { Container, PostForm } from '../components/index';

function AddPost() {
	return (
		<div className='py-8'>
			<Container>
				<h1 className='text-2xl font-bold mb-4'>Add New Post</h1>
				<PostForm />
			</Container>
		</div>
	);
}

export default AddPost;
