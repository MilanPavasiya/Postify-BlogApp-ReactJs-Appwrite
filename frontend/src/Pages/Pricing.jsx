import React from 'react';
import { Container, Button } from '../components/index';
import { Link } from 'react-router-dom';

function Pricing() {
	const plans = [
		{
			name: 'Free',
			price: '$0',
			period: '/forever',
			features: ['Unlimited Posts', 'Image Uploads', 'Rich Text Editor', 'Private Posts', 'Basic Support'],
			color: 'from-gray-400 to-gray-600',
			popular: false,
		},
		{
			name: 'Pro',
			price: '$9',
			period: '/month',
			features: [
				'Everything in Free',
				'Priority Support',
				'Advanced Analytics',
				'Custom Themes',
				'Export Posts',
				'API Access',
			],
			color: 'from-blue-500 to-purple-600',
			popular: true,
		},
		{
			name: 'Enterprise',
			price: 'Custom',
			period: '',
			features: [
				'Everything in Pro',
				'Dedicated Support',
				'Custom Integrations',
				'Advanced Security',
				'Team Collaboration',
				'Custom Branding',
			],
			color: 'from-purple-600 to-pink-600',
			popular: false,
		},
	];

	return (
		<div className='min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50'>
			<div className='py-12 sm:py-16 md:py-24'>
				<Container>
					<div className='text-center mb-12 sm:mb-16 animate-fade-in px-4 sm:px-0 overflow-visible'>
						<h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-4 sm:mb-6 animate-slide-up leading-normal overflow-visible pb-1'>
							Simple, Transparent Pricing
						</h1>
						<p className='text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-3 sm:mb-4'>
							Choose the perfect plan for your needs. Start free, upgrade anytime. All plans include our core features with no hidden fees or surprises.
						</p>
						<p className='text-sm sm:text-base md:text-lg text-gray-500 max-w-2xl mx-auto'>
							Whether you're just getting started or need advanced features, we have a plan that fits your workflow.
						</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto px-4 sm:px-0'>
						{plans.map((plan, index) => (
							<div
								key={index}
								className={`relative bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 ${
									plan.popular
										? 'border-purple-500 md:scale-105'
										: 'border-gray-200'
								} animate-fade-in-up`}
								style={{ animationDelay: `${index * 0.1}s` }}>
								{plan.popular && (
									<div className='absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2'>
										<span className='bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold shadow-lg'>
											Most Popular
										</span>
									</div>
								)}
								<div className='text-center mb-6 sm:mb-8'>
									<h3 className='text-xl sm:text-2xl font-bold text-gray-900 mb-2'>{plan.name}</h3>
									<div className='flex items-baseline justify-center gap-1 mb-2'>
										<span className='text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
											{plan.price}
										</span>
										<span className='text-sm sm:text-base text-gray-600'>{plan.period}</span>
									</div>
								</div>
								<ul className='space-y-3 sm:space-y-4 mb-6 sm:mb-8'>
									{plan.features.map((feature, idx) => (
										<li key={idx} className='flex items-start gap-2 sm:gap-3'>
											<span className='text-green-500 text-lg sm:text-xl flex-shrink-0 mt-0.5'>✓</span>
											<span className='text-sm sm:text-base text-gray-700'>{feature}</span>
										</li>
									))}
								</ul>
								<Link
									to={plan.price === 'Custom' ? '/contact' : '/signup'}
									className='block w-full text-center'>
									<Button
										className={`w-full py-2.5 sm:py-3 text-sm sm:text-base font-semibold ${
											plan.popular
												? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl'
												: 'bg-gray-100 hover:bg-gray-200 text-gray-900'
										} transition-all duration-300 transform hover:scale-105`}>
										{plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
									</Button>
								</Link>
							</div>
						))}
					</div>
				</Container>
			</div>
		</div>
	);
}

export default Pricing;

