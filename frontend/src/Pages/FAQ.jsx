import React, { useState } from 'react';
import { Container } from '../components/index';
import { Link } from 'react-router-dom';

function FAQ() {
	const [openIndex, setOpenIndex] = useState(0);

	const faqs = [
		{
			question: 'How do I create my first post?',
			answer:
				'Click on "Add Post" in the navigation menu, fill in the title, upload an image, write your content using the rich text editor, and click "Publish Post". It\'s that simple!',
			category: 'Getting Started',
		},
		{
			question: 'Can I edit my posts after publishing?',
			answer:
				'Yes! Navigate to any of your posts and click the "Edit" button. You can update the title, content, image, or status at any time.',
			category: 'Posts',
		},
		{
			question: 'Are my posts private?',
			answer:
				'Absolutely! All your posts are private and only visible to you. You have complete control over your content and privacy.',
			category: 'Privacy',
		},
		{
			question: 'What image formats are supported?',
			answer:
				'We support PNG, JPG, JPEG, and GIF formats. Images must be under 1MB in size for optimal performance.',
			category: 'Technical',
		},
		{
			question: 'How do I delete a post?',
			answer:
				'Go to the post you want to delete and click the "Delete" button. Please note that this action cannot be undone.',
			category: 'Posts',
		},
		{
			question: 'Can I format text in my posts?',
			answer:
				'Yes! Our rich text editor supports bold, italic, lists, links, images, and much more. Simply use the toolbar to format your content.',
			category: 'Technical',
		},
		{
			question: 'How do I change my account password?',
			answer:
				'Currently, password changes need to be done through the account settings. If you\'ve forgotten your password, please contact our support team for assistance.',
			category: 'Account',
		},
		{
			question: 'Can I export my posts?',
			answer:
				'At the moment, export functionality is not available. However, you can always copy your content directly from the post editor. We\'re working on adding export features in future updates.',
			category: 'Features',
		},
		{
			question: 'What happens if I exceed the image size limit?',
			answer:
				'If your image exceeds 1MB, you\'ll receive an error message. Please compress or resize your image before uploading. You can use online tools or image editing software to reduce the file size.',
			category: 'Technical',
		},
		{
			question: 'Is there a limit to how many posts I can create?',
			answer:
				'No! You can create as many posts as you want. There are no limits on the number of posts you can create on Postify.',
			category: 'Account',
		},
	];

	return (
		<div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50'>
			<div className='py-12 sm:py-16 md:py-24'>
				<Container>
					<div className='text-center mb-12 sm:mb-16 animate-fade-in px-4 sm:px-0'>
						<h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 sm:mb-6 animate-slide-up'>
							Frequently Asked Questions
						</h1>
						<p className='text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-3 sm:mb-4'>
							Find answers to common questions about Postify. Browse through our FAQ to learn more about features, account management, and troubleshooting.
						</p>
						<p className='text-sm sm:text-base md:text-lg text-gray-500 max-w-2xl mx-auto'>
							Still have questions? Visit our <Link to='/help' className='text-blue-600 hover:text-blue-700 font-medium underline'>Help Center</Link> or <Link to='/contact' className='text-blue-600 hover:text-blue-700 font-medium underline'>contact support</Link>.
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
										<div className='flex-1 pr-4'>
											<span className='text-xs sm:text-sm text-purple-600 font-semibold mb-1 block'>
												{faq.category}
											</span>
											<span className='text-base sm:text-lg font-semibold text-gray-900'>
												{faq.question}
											</span>
										</div>
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
							<h2 className='text-xl sm:text-2xl font-bold mb-3 sm:mb-4'>Need More Help?</h2>
							<p className='text-sm sm:text-base mb-4 sm:mb-6 opacity-90'>
								Can't find the answer you're looking for? Our support team is here to help you with any questions or issues.
							</p>
							<div className='flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center'>
								<Link
									to='/help'
									className='inline-block bg-white text-blue-600 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-gray-100 transition-colors duration-200 transform hover:scale-105'>
									Visit Help Center
								</Link>
								<Link
									to='/contact'
									className='inline-block bg-purple-700 hover:bg-purple-800 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold transition-colors duration-200 transform hover:scale-105 border-2 border-white'>
									Contact Support
								</Link>
							</div>
						</div>
					</div>
				</Container>
			</div>
		</div>
	);
}

export default FAQ;


