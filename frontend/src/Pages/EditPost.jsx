import React, { useEffect, useState } from 'react';
import { Container, PostForm } from '../components/index';
import appwriteService from '../appwrite/configuration';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function EditPost() {
	const [post, setPost] = useState(null);
	const { slug } = useParams();
	const navigate = useNavigate();
	const userData = useSelector((state) => state.auth.userData);

	useEffect(() => {
		if (!userData) {
			navigate('/login');
			return;
		}

		if (slug) {
			appwriteService.getPost(slug, userData.$id).then((post) => {
				if (post) {
					setPost(post);
				} else {
					navigate('/');
				}
			});
		} else {
			navigate('/');
		}
	}, [slug, navigate, userData]);

	return post ? (
		<div className='py-6 sm:py-8 md:py-12'>
			<Container>
				<div className='max-w-7xl mx-auto px-4 sm:px-0'>
					<header className='mb-6 sm:mb-8'>
						<h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2'>
							Edit Post
						</h1>
						<p className='text-sm sm:text-base text-gray-600'>Update your post content and settings</p>
					</header>
					<PostForm key={`${post.$id}-${userData?.$id || 'no-user'}`} post={post} />
				</div>
			</Container>
		</div>
	) : null;
}

export default EditPost;
