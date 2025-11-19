import React, { useEffect, useState } from 'react';
import { Container, PostForm } from '../components/index';
import appwriteService from '../appwrite/configuration';
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
	const [post, setPost] = useState(null);
	const { slug } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		if (slug) {
			appwriteService.getPost(slug).then((post) => {
				if (post) {
					setPost(post);
				}
			});
		} else {
			navigate('/');
		}
	}, [slug, navigate]);

	return post ? (
		<div className='py-8 md:py-12'>
			<Container>
				<div className='max-w-7xl mx-auto'>
					<header className='mb-8'>
						<h1 className='text-3xl md:text-4xl font-bold text-gray-900 mb-2'>
							Edit Post
						</h1>
						<p className='text-gray-600'>Update your post content and settings</p>
					</header>
					<PostForm post={post} />
				</div>
			</Container>
		</div>
	) : null;
}

export default EditPost;
