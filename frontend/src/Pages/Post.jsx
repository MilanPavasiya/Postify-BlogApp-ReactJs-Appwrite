import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import appwriteService from '../appwrite/configuration';
import { Button, Container } from '../components/index';
import parse from 'html-react-parser';
import { useSelector } from 'react-redux';

export default function Post() {
	const [post, setPost] = useState(null);
	const { slug } = useParams();
	const navigate = useNavigate();

	const userData = useSelector((state) => state.auth.userData);

	const isAuthor = post && userData ? post.userId === userData.$id : false;

	useEffect(() => {
		if (!userData) {
			navigate('/login');
			return;
		}

		if (slug) {
			appwriteService.getPost(slug, userData.$id).then((post) => {
				if (post) setPost(post);
				else navigate('/');
			});
		} else navigate('/');
	}, [slug, navigate, userData]);

	const deletePost = () => {
		if (!userData) {
			alert('You must be logged in to delete posts');
			return;
		}
		appwriteService.deletePost(post.$id, userData.$id).then((status) => {
			if (status) {
				navigate('/');
			} else {
				alert('Failed to delete post. You may not have permission.');
			}
		});
	};

	return post ? (
		<article className='py-8 md:py-12'>
			<Container>
				<div className='max-w-4xl mx-auto'>
					{/* Featured Image */}
					<div className='w-full mb-8 relative rounded-2xl overflow-hidden bg-gray-100'>
						<img
							src={post.featuredImage}
							alt={post.title}
							className='w-full h-auto object-cover'
						/>
						{isAuthor && (
							<div className='absolute top-4 right-4 flex gap-2'>
								<Link to={`/edit-post/${post.$id}`}>
									<Button bgColor='bg-green-600 hover:bg-green-700' className='shadow-lg'>
										Edit
									</Button>
								</Link>
								<Button bgColor='bg-red-600 hover:bg-red-700' onClick={deletePost} className='shadow-lg'>
									Delete
								</Button>
							</div>
						)}
					</div>

					{/* Title */}
					<header className='mb-8'>
						<h1 className='text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4'>
							{post.title}
						</h1>
					</header>

					{/* Content */}
					<div className='prose prose-lg max-w-none browser-css'>
						{parse(post.content)}
					</div>
				</div>
			</Container>
		</article>
	) : null;
}
