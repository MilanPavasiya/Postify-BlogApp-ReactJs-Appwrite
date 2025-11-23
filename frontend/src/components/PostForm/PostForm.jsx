import React, { useEffect, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, RTE, Select } from '../index';
import appwriteService from '../../appwrite/configuration.js';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { uploadToS3 } from '../../utils/uploadToS3.js';
import { validateImage } from '../../utils/validateImage.js';

function PostForm({ post }) {
	const [isLoading, setIsLoading] = useState(false);
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

	const slugTransform = useCallback((value) => {
		if (value && typeof value === 'string')
			return value
				.trim()
				.toLowerCase()
				.replace(/[^a-zA-Z\d\s]+/g, '-')
				.replace(/\s/g, '-');
		return '';
	}, []);

	useEffect(() => {
		if (userData) {
			reset({
				title: post?.title || '',
				slug: post?.$id || slugTransform(post?.title || ''),
				content: post?.content || '',
				status: post?.status || 'active',
			}, {
				keepDefaultValues: false,
			});
			setValue('image', null);
		}
	}, [userData, post, reset, slugTransform, setValue]);

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

		setIsLoading(true);

		try {
			let imageUrl = null;

			if (data.image && data.image[0]) {
				imageUrl = await uploadToS3(data.image[0]);

				if (!imageUrl && !post) {
					alert('Failed to upload image. Please try again.');
					setIsLoading(false);
					return;
				}
			}

			if (post) {
				const updatedPost = await appwriteService.updatePost(
					post.$id,
					{
						title: data.title,
						content: data.content,
						featuredImage: imageUrl || post.featuredImage || '',
						status: data.status,
					},
					userData.$id
				);
				if (updatedPost) navigate(`/post/${updatedPost.$id}`);
			} else {
				if (!imageUrl) {
					alert('Please upload a featured image.');
					setIsLoading(false);
					return;
				}

				const createdPost = await appwriteService.createPost({
					title: data.title,
					content: data.content,
					featuredImage: imageUrl,
					status: data.status,
					userId: userData.$id,
				});
				if (createdPost) navigate(`/post/${createdPost.$id}`);
			}
		} catch (error) {
			console.error('Error submitting post:', error);
			alert('An error occurred. Please try again.');
			setIsLoading(false);
		}
	};

	if (!userData) {
		return (
			<div className='flex items-center justify-center py-12'>
				<div className='text-center'>
					<div className='inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4'></div>
					<p className='text-gray-600'>Loading user data...</p>
				</div>
			</div>
		);
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='space-y-6 sm:space-y-8'>
			<div className='grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8'>
				<div className='lg:col-span-2 space-y-4 sm:space-y-6'>
					<div>
						<Input
							label='Title'
							placeholder='Enter post title'
							className='mb-2'
							disabled={isLoading}
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
							disabled={isLoading}
							{...register('slug', { required: 'URL is required' })}
							onInput={(e) => {
								if (!isLoading) {
									setValue('slug', slugTransform(e.currentTarget.value), {
										shouldValidate: true,
									});
								}
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
							defaultValue={post?.content || ''}
							key={post?.$id || 'new-post'}
							rules={{ required: 'Content is required' }}
							disabled={isLoading}
						/>
						{errors?.content && (
							<p className='text-red-600 text-sm'>{errors.content.message}</p>
						)}
					</div>
				</div>

				<div className='lg:col-span-1 space-y-4 sm:space-y-6'>
					<div className='bg-gray-50 rounded-xl p-4 sm:p-6 border border-gray-200'>
						<h3 className='text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6'>
							Post Settings
						</h3>

						<div className='mb-4'>
							<Input
								label='Upload Image'
								type='file'
								accept='image/png, image/jpg, image/jpeg, image/gif'
								disabled={isLoading}
								{...register('image', {
									required: !post ? 'Image is required' : false,
									validate: (files) => {
										if (!files || files.length === 0) {
											return !post ? 'Image is required' : true;
										}
										const file = files[0];
										const validation = validateImage(file);
										return validation.isValid || validation.error;
									},
								})}
							/>
							<p className='text-xs text-gray-500 mt-1'>
								Max file size: 1MB. Allowed formats: PNG, JPG, JPEG, GIF
							</p>
							{errors?.image && (
								<p className='text-red-600 text-sm mt-1'>
									{errors.image.message}
								</p>
							)}
						</div>

						{post && post.featuredImage && (
							<div className='w-full mb-4 sm:mb-6'>
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
								disabled={isLoading}
								{...register('status', { required: 'Status is required' })}
							/>
							{errors?.status && (
								<p className='text-red-600 text-sm'>{errors.status.message}</p>
							)}
						</div>

						<Button
							type='submit'
							disabled={isLoading}
							bgColor={
								post
									? 'bg-green-600 hover:bg-green-700'
									: 'bg-blue-600 hover:bg-blue-700'
							}
							className='w-full text-sm sm:text-base flex items-center justify-center gap-2'>
							{isLoading ? (
								<>
									<svg
										className='animate-spin h-4 w-4 sm:h-5 sm:w-5'
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'>
										<circle
											className='opacity-25'
											cx='12'
											cy='12'
											r='10'
											stroke='currentColor'
											strokeWidth='4'></circle>
										<path
											className='opacity-75'
											fill='currentColor'
											d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
										</svg>
										<span>{post ? 'Updating...' : 'Publishing...'}</span>
									</>
								) : (
									<span>{post ? 'Update Post' : 'Publish Post'}</span>
								)}
						</Button>
					</div>
				</div>
			</div>
		</form>
	);
}

export default PostForm;
