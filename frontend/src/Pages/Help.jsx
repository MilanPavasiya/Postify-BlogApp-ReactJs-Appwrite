import React, { useState, useMemo } from 'react';
import { Container, Input, Button } from '../components/index';
import { Link } from 'react-router-dom';

function Help() {
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('all');

	const helpArticles = [
		{
			id: 1,
			title: 'Getting Started with Postify',
			content:
				'Learn how to create your account, navigate the platform, and create your first post. This guide covers all the basics you need to get started.',
			category: 'Getting Started',
			tags: ['account', 'first post', 'basics', 'tutorial'],
		},
		{
			id: 2,
			title: 'Creating and Publishing Posts',
			content:
				'Discover how to create engaging posts using our rich text editor. Learn about formatting options, image uploads, and post settings.',
			category: 'Posts',
			tags: ['create', 'publish', 'editor', 'formatting'],
		},
		{
			id: 3,
			title: 'Managing Your Posts',
			content:
				'Learn how to edit, delete, and organize your posts. Understand post status options and how to manage your content effectively.',
			category: 'Posts',
			tags: ['edit', 'delete', 'manage', 'organize'],
		},
		{
			id: 4,
			title: 'Image Upload Guidelines',
			content:
				'Understand image requirements, supported formats, and best practices for uploading images to your posts. Learn about file size limits and optimization tips.',
			category: 'Technical',
			tags: ['images', 'upload', 'formats', 'size'],
		},
		{
			id: 5,
			title: 'Privacy and Security',
			content:
				'Learn about how Postify protects your data and ensures your posts remain private. Understand your privacy settings and security features.',
			category: 'Privacy',
			tags: ['privacy', 'security', 'data', 'protection'],
		},
		{
			id: 6,
			title: 'Account Management',
			content:
				'Manage your account settings, update your profile information, and understand account-related features and limitations.',
			category: 'Account',
			tags: ['account', 'settings', 'profile', 'management'],
		},
		{
			id: 7,
			title: 'Rich Text Editor Guide',
			content:
				'Master the rich text editor with our comprehensive guide. Learn about all formatting options, shortcuts, and advanced features available.',
			category: 'Technical',
			tags: ['editor', 'formatting', 'text', 'features'],
		},
		{
			id: 8,
			title: 'Troubleshooting Common Issues',
			content:
				'Find solutions to common problems like image upload failures, editor issues, and account access problems. Get step-by-step troubleshooting guides.',
			category: 'Troubleshooting',
			tags: ['issues', 'problems', 'fix', 'solutions'],
		},
		{
			id: 9,
			title: 'Best Practices for Content Creation',
			content:
				'Learn tips and best practices for creating engaging and well-formatted posts. Discover how to make your content stand out.',
			category: 'Tips & Tricks',
			tags: ['content', 'best practices', 'tips', 'quality'],
		},
		{
			id: 10,
			title: 'Understanding Post Status',
			content:
				'Learn about active and inactive post statuses, when to use each, and how changing status affects your posts visibility.',
			category: 'Posts',
			tags: ['status', 'active', 'inactive', 'visibility'],
		},
	];

	const categories = [
		'all',
		...new Set(helpArticles.map((article) => article.category)),
	];

	const filteredArticles = useMemo(() => {
		return helpArticles.filter((article) => {
			const matchesSearch =
				searchQuery === '' ||
				article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
				article.tags.some((tag) =>
					tag.toLowerCase().includes(searchQuery.toLowerCase())
				);

			const matchesCategory =
				selectedCategory === 'all' || article.category === selectedCategory;

			return matchesSearch && matchesCategory;
		});
	}, [searchQuery, selectedCategory]);

	return (
		<div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50'>
			<div className='py-12 sm:py-16 md:py-24'>
				<Container>
					<div className='text-center mb-12 sm:mb-16 animate-fade-in px-4 sm:px-0'>
						<h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 sm:mb-6 animate-slide-up'>
							Help Center
						</h1>
						<p className='text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-3 sm:mb-4'>
							Search our help articles or browse by category to find answers to
							your questions. Can't find what you're looking for? We're here to
							help!
						</p>
					</div>

					<div className='max-w-5xl mx-auto px-4 sm:px-0'>
						<div className='mb-8 sm:mb-12'>
							<div className='bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6 mb-6'>
								<div className='mb-4'>
									<Input
										type='text'
										placeholder='Search for help articles...'
										value={searchQuery}
										onChange={(e) => setSearchQuery(e.target.value)}
										className='w-full'
									/>
								</div>
								<div className='flex flex-wrap gap-2 sm:gap-3'>
									{categories.map((category) => (
										<button
											key={category}
											onClick={() => setSelectedCategory(category)}
											className={`px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 transform hover:scale-105 ${
												selectedCategory === category
													? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
													: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
											}`}>
											{category.charAt(0).toUpperCase() + category.slice(1)}
										</button>
									))}
								</div>
							</div>
						</div>

						{filteredArticles.length > 0 ? (
							<div className='space-y-4 sm:space-y-6'>
								<div className='flex items-center justify-between mb-4'>
									<p className='text-sm sm:text-base text-gray-600'>
										Found{' '}
										<span className='font-semibold text-blue-600'>
											{filteredArticles.length}
										</span>{' '}
										article{filteredArticles.length !== 1 ? 's' : ''}
									</p>
								</div>
								{filteredArticles.map((article, index) => (
									<div
										key={article.id}
										className='bg-white rounded-xl shadow-lg border border-gray-100 p-6 sm:p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up'
										style={{ animationDelay: `${index * 0.05}s` }}>
										<div className='flex items-start justify-between gap-4'>
											<div className='flex-1'>
												<div className='flex items-center gap-3 mb-3'>
													<span className='px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-xs sm:text-sm font-semibold rounded-full'>
														{article.category}
													</span>
												</div>
												<h3 className='text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3'>
													{article.title}
												</h3>
												<p className='text-sm sm:text-base text-gray-600 leading-relaxed mb-4'>
													{article.content}
												</p>
												<div className='flex flex-wrap gap-2'>
													{article.tags.map((tag, tagIndex) => (
														<span
															key={tagIndex}
															className='px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md'>
															#{tag}
														</span>
													))}
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
						) : (
							<div className='bg-white rounded-xl shadow-lg border border-gray-200 p-8 sm:p-12 text-center'>
								<div className='text-6xl sm:text-8xl mb-4'>🔍</div>
								<h3 className='text-xl sm:text-2xl font-bold text-gray-900 mb-3'>
									No articles found
								</h3>
								<p className='text-sm sm:text-base text-gray-600 mb-6 max-w-md mx-auto'>
									We couldn't find any help articles matching your search. Try
									different keywords or browse by category.
								</p>
								<button
									onClick={() => {
										setSearchQuery('');
										setSelectedCategory('all');
									}}
									className='inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105'>
									Clear Filters
								</button>
							</div>
						)}

						<div className='mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8'>
							<div className='bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-white animate-fade-in'>
								<h2 className='text-xl sm:text-2xl font-bold mb-3 sm:mb-4'>
									Still Need Help?
								</h2>
								<p className='text-sm sm:text-base mb-4 sm:mb-6 opacity-90'>
									Can't find what you're looking for? Check out our FAQ page for
									more answers.
								</p>
								<Link
									to='/faq'
									className='inline-block bg-white text-blue-600 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-gray-100 transition-colors duration-200 transform hover:scale-105'>
									View FAQ
								</Link>
							</div>
							<div className='bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-white animate-fade-in'>
								<h2 className='text-xl sm:text-2xl font-bold mb-3 sm:mb-4'>
									Contact Support
								</h2>
								<p className='text-sm sm:text-base mb-4 sm:mb-6 opacity-90'>
									Our support team is ready to assist you with any questions or
									issues.
								</p>
								<Link
									to='/contact'
									className='inline-block bg-white text-purple-600 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-gray-100 transition-colors duration-200 transform hover:scale-105'>
									Get in Touch
								</Link>
							</div>
						</div>
					</div>
				</Container>
			</div>
		</div>
	);
}

export default Help;
