import React, { useState } from 'react';
import { Container } from '../components/index';

function Help() {
	const [openIndex, setOpenIndex] = useState(0);

	const faqs = [
		{
			question: 'How do I create my first post?',
			answer:
				'Click on "Add Post" in the navigation menu, fill in the title, upload an image, write your content using the rich text editor, and click "Publish Post". It\'s that simple!',
		},
		{
			question: 'Can I edit my posts after publishing?',
			answer:
				'Yes! Navigate to any of your posts and click the "Edit" button. You can update the title, content, image, or status at any time.',
		},
		{
			question: 'Are my posts private?',
			answer:
				'Absolutely! All your posts are private and only visible to you. You have complete control over your content and privacy.',
		},
		{
			question: 'What image formats are supported?',
			answer:
				'We support PNG, JPG, JPEG, and GIF formats. Images must be under 1MB in size for optimal performance.',
		},
		{
			question: 'How do I delete a post?',
			answer:
				'Go to the post you want to delete and click the "Delete" button. Please note that this action cannot be undone.',
		},
		{
			question: 'Can I format text in my posts?',
			answer:
				'Yes! Our rich text editor supports bold, italic, lists, links, images, and much more. Simply use the toolbar to format your content.',
		},
	];

	return (
		<div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50'>
			<div className='py-12 sm:py-16 md:py-24'>
				<Container>
					<div className='text-center mb-12 sm:mb-16 animate-fade-in px-4 sm:px-0'>
						<h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 sm:mb-6 animate-slide-up'>
							Help Center
						</h1>
						<p className='text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-3 sm:mb-4'>
							Find answers to common questions and learn how to get the most out of Postify. Our comprehensive help center covers everything from getting started to advanced features.
						</p>
						<p className='text-sm sm:text-base md:text-lg text-gray-500 max-w-2xl mx-auto'>
							Can't find what you're looking for? Our support team is always ready to help.
						</p>
					</div>

					<div className='max-w-3xl mx-auto px-4 sm:px-0'>
						<div className='space-y-3 sm:space-y-4'>
							{faqs.map((faq, index) => (
								<div
									key={index}
									className='bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden animate-fade-in-up'
									style={{ animationDelay: `${index * 0.1}s` }}>
									<button
										onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
										className='w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200'>
										<span className='text-base sm:text-lg font-semibold text-gray-900 pr-2'>
											{faq.question}
										</span>
										<span
											className={`text-xl sm:text-2xl text-gray-400 transform transition-transform duration-300 flex-shrink-0 ${
												openIndex === index ? 'rotate-180' : ''
											}`}>
											▼
										</span>
									</button>
									<div
										className={`overflow-hidden transition-all duration-300 ${
											openIndex === index ? 'max-h-96' : 'max-h-0'
										}`}>
										<div className='px-4 sm:px-6 pb-3 sm:pb-4 text-sm sm:text-base text-gray-600 leading-relaxed'>{faq.answer}</div>
									</div>
								</div>
							))}
						</div>

						<div className='mt-8 sm:mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-white text-center animate-fade-in'>
							<h2 className='text-xl sm:text-2xl font-bold mb-3 sm:mb-4'>Still need help?</h2>
							<p className='text-sm sm:text-base mb-4 sm:mb-6 opacity-90'>
								Can't find what you're looking for? Contact our support team and we'll get back to
								you as soon as possible.
							</p>
							<a
								href='/contact'
								className='inline-block bg-white text-blue-600 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-gray-100 transition-colors duration-200 transform hover:scale-105'>
								Contact Support
							</a>
						</div>
					</div>
				</Container>
			</div>
		</div>
	);
}

export default Help;

