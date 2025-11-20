import React, { useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, RTE, Select } from '../index';
import appwriteService from '../../appwrite/configuration.js';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { uploadToS3 } from '../../utils/uploadToS3.js';

function PostForm({ post }) {
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		reset,
		control,
		getValues,
		formState: { errors },
	} = useForm({
		defaultValues: {
			title: post?.title || '',
			slug: post?.$id || '',
			content: post?.content || '',
			status: post?.status || 'active',
		},
	});

	const navigate = useNavigate();
	const userData = useSelector((state) => state.auth.userData);

	// Transform title to slug
	const slugTransform = useCallback((value) => {
		if (value && typeof value === 'string')
			return value
				.trim()
				.toLowerCase()
				.replace(/[^a-zA-Z\d\s]+/g, '-')
				.replace(/\s/g, '-');
		return '';
	}, []);

	// Reset form values when userData or post changes
	useEffect(() => {
		if (userData) {
			reset({
				title: post?.title || '',
				slug: slugTransform(post?.title || ''),
				content: post?.content || '',
				status: post?.status || 'active',
			});
			setValue('image', null); // clear previous image for new user
		}
	}, [userData, post, reset, slugTransform, setValue]);

	// Update slug dynamically as title changes
	useEffect(() => {
		const subscription = watch((value, { name }) => {
			if (name === 'title') {
				setValue('slug', slugTransform(value.title), { shouldValidate: true });
			}
		});
		return () => subscription.unsubscribe();
	}, [watch, slugTransform, setValue]);

	const onSubmit = async (data) => {
		if (!userData) {
			alert('User data not loaded yet. Please wait.');
			return;
		}

		let imageUrl = null;

		// Upload image to S3 if provided
		if (data.image && data.image[0]) {
			imageUrl = await uploadToS3(data.image[0]);

			if (!imageUrl && !post) {
				alert('Failed to upload image. Please try again.');
				return;
			}
		}

		if (post) {
			// Update existing post
			const updatedPost = await appwriteService.updatePost(post.$id, {
				...data,
				featuredImage: imageUrl || post.featuredImage || '',
			});
			if (updatedPost) navigate(`/post/${updatedPost.$id}`);
		} else {
			// Create new post
			const userId = userData.$id;

			if (!imageUrl) {
				alert('Please upload a featured image.');
				return;
			}

			const createdPost = await appwriteService.createPost({
				...data,
				featuredImage: imageUrl,
				userId,
			});
			if (createdPost) navigate(`/post/${createdPost.$id}`);
		}
	};

	// Block render until userData is loaded
	if (!userData) return <p>Loading user data...</p>;

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
			<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
				<div className='lg:col-span-2 space-y-6'>
					<div>
						<Input
							label='Title'
							placeholder='Enter post title'
							className='mb-2'
							{...register('title', { required: 'Title is required' })}
						/>
						{errors?.title && (
							<p className='text-red-600 text-sm'>{errors.title.message}</p>
						)}
					</div>

					<div>
						<Input
							label='URL'
							placeholder='Post URL (auto-generated)'
							className='mb-2'
							readOnly
							{...register('slug', { required: 'URL is required' })}
							onInput={(e) => {
								setValue('slug', slugTransform(e.currentTarget.value), {
									shouldValidate: true,
								});
							}}
						/>
						{errors?.slug && (
							<p className='text-red-600 text-sm'>{errors.slug.message}</p>
						)}
					</div>

					<div>
						<RTE
							label='Content'
							name='content'
							control={control}
							defaultValues={getValues('content')}
							rules={{ required: 'Content is required' }}
						/>
						{errors?.content && (
							<p className='text-red-600 text-sm'>{errors.content.message}</p>
						)}
					</div>
				</div>

				<div className='lg:col-span-1 space-y-6'>
					<div className='bg-gray-50 rounded-xl p-6 border border-gray-200'>
						<h3 className='text-lg font-semibold text-gray-900 mb-6'>
							Post Settings
						</h3>

						<div className='mb-4'>
							<Input
								label='Upload Image'
								type='file'
								accept='image/png, image/jpg, image/jpeg, image/gif'
								{...register('image', {
									required: !post ? 'Image is required' : false,
								})}
							/>
							{errors?.image && (
								<p className='text-red-600 text-sm'>{errors.image.message}</p>
							)}
						</div>

						{post && post.featuredImage && (
							<div className='w-full mb-6'>
								<label className='block mb-2 text-sm font-medium text-gray-700'>
									Current Image
								</label>
								<div className='rounded-lg overflow-hidden border border-gray-200'>
									<img
										src={post.featuredImage}
										alt={post.title}
										className='w-full h-auto object-cover'
									/>
								</div>
							</div>
						)}

						<div className='mb-4'>
							<Select
								options={['active', 'inactive']}
								label='Status'
								{...register('status', { required: 'Status is required' })}
							/>
							{errors?.status && (
								<p className='text-red-600 text-sm'>{errors.status.message}</p>
							)}
						</div>

						<Button
							type='submit'
							bgColor={
								post
									? 'bg-green-600 hover:bg-green-700'
									: 'bg-blue-600 hover:bg-blue-700'
							}
							className='w-full'>
							{post ? 'Update Post' : 'Publish Post'}
						</Button>
					</div>
				</div>
			</div>
		</form>
	);
}

export default PostForm;
