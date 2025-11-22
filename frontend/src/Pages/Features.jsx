import React from 'react';
import { Container, Button } from '../components/index';
import { Link } from 'react-router-dom';

function Features() {
	const features = [
		{
			icon: '📝',
			title: 'Rich Text Editor',
			description: 'Create beautiful posts with our powerful TinyMCE editor. Format text, add images, and style your content effortlessly.',
			color: 'from-blue-500 to-cyan-500',
		},
		{
			icon: '🖼️',
			title: 'Image Upload',
			description: 'Upload and manage images seamlessly with S3 integration. Your images are safely stored and optimized.',
			color: 'from-purple-500 to-pink-500',
		},
		{
			icon: '🔒',
			title: 'Private Posts',
			description: 'All your posts are private and secure. Only you can view and manage your content.',
			color: 'from-green-500 to-emerald-500',
		},
		{
			icon: '⚡',
			title: 'Fast & Responsive',
			description: 'Built with modern technologies for lightning-fast performance across all devices.',
			color: 'from-orange-500 to-red-500',
		},
		{
			icon: '🎨',
			title: 'Beautiful Design',
			description: 'Enjoy a stunning, modern interface that makes creating and reading posts a pleasure.',
			color: 'from-indigo-500 to-purple-500',
		},
		{
			icon: '📱',
			title: 'Mobile Friendly',
			description: 'Fully responsive design that works perfectly on desktop, tablet, and mobile devices.',
			color: 'from-teal-500 to-blue-500',
		},
	];

	return (
		<div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50'>
			<div className='py-16 md:py-24'>
				<Container>
					<div className='text-center mb-16 animate-fade-in'>
						<h1 className='text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 animate-slide-up'>
							Amazing Features
						</h1>
						<p className='text-xl text-gray-600 max-w-2xl mx-auto mb-4'>
							Everything you need to create, manage, and share your content with style. Postify offers a comprehensive set of tools designed to make content creation effortless and enjoyable.
						</p>
						<p className='text-lg text-gray-500 max-w-2xl mx-auto'>
							From rich text editing to secure image storage, we've built every feature with your needs in mind.
						</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12'>
						{features.map((feature, index) => (
							<div
								key={index}
								className='group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 animate-fade-in-up'
								style={{ animationDelay: `${index * 0.1}s` }}>
								<div
									className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-3xl mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
									{feature.icon}
								</div>
								<h3 className='text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors'>
									{feature.title}
								</h3>
								<p className='text-gray-600 leading-relaxed'>{feature.description}</p>
							</div>
						))}
					</div>

					<div className='text-center'>
						<Link to='/signup'>
							<Button className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300'>
								Get Started Today
							</Button>
						</Link>
					</div>
				</Container>
			</div>
		</div>
	);
}

export default Features;

