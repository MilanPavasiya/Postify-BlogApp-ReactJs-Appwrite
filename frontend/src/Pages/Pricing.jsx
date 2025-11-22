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
			<div className='py-16 md:py-24'>
				<Container>
					<div className='text-center mb-16 animate-fade-in'>
						<h1 className='text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-6 animate-slide-up'>
							Simple, Transparent Pricing
						</h1>
						<p className='text-xl text-gray-600 max-w-2xl mx-auto mb-4'>
							Choose the perfect plan for your needs. Start free, upgrade anytime. All plans include our core features with no hidden fees or surprises.
						</p>
						<p className='text-lg text-gray-500 max-w-2xl mx-auto'>
							Whether you're just getting started or need advanced features, we have a plan that fits your workflow.
						</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto'>
						{plans.map((plan, index) => (
							<div
								key={index}
								className={`relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 ${
									plan.popular
										? 'border-purple-500 scale-105'
										: 'border-gray-200'
								} animate-fade-in-up`}
								style={{ animationDelay: `${index * 0.1}s` }}>
								{plan.popular && (
									<div className='absolute -top-4 left-1/2 transform -translate-x-1/2'>
										<span className='bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg'>
											Most Popular
										</span>
									</div>
								)}
								<div className='text-center mb-8'>
									<h3 className='text-2xl font-bold text-gray-900 mb-2'>{plan.name}</h3>
									<div className='flex items-baseline justify-center gap-1 mb-2'>
										<span className='text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
											{plan.price}
										</span>
										<span className='text-gray-600'>{plan.period}</span>
									</div>
								</div>
								<ul className='space-y-4 mb-8'>
									{plan.features.map((feature, idx) => (
										<li key={idx} className='flex items-start gap-3'>
											<span className='text-green-500 text-xl'>✓</span>
											<span className='text-gray-700'>{feature}</span>
										</li>
									))}
								</ul>
								<Link
									to={plan.price === 'Custom' ? '/contact' : '/signup'}
									className='block w-full text-center'>
									<Button
										className={`w-full py-3 font-semibold ${
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

