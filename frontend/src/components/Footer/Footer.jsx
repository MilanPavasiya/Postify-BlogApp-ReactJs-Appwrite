import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../index';

function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className='relative bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white mt-auto overflow-hidden'>
			<div className='absolute inset-0 opacity-10'>
				<div className='absolute top-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-purple-500 rounded-full filter blur-3xl animate-pulse'></div>
				<div
					className='absolute bottom-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse'
					style={{ animationDelay: '1s' }}></div>
			</div>

			<div className='relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16'>
				<div className='grid grid-cols-1 gap-8 sm:gap-10 md:gap-12 md:grid-cols-2 lg:grid-cols-4'>
					<div className='lg:col-span-2'>
						<div className='mb-4 sm:mb-6 transform hover:scale-105 transition-transform duration-300'>
							<Logo width='100px' className='sm:w-[120px]' textColor='white' />
						</div>
						<p className='text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 leading-relaxed max-w-md'>
							Create, share, and manage your content with Postify. The modern
							platform for storytelling and content creation.
						</p>
						<p className='text-xs sm:text-sm text-gray-400'>
							&copy; {currentYear} Postify. All Rights Reserved.
						</p>
					</div>
					<div>
						<h3 className='mb-4 sm:mb-6 text-xs sm:text-sm font-bold uppercase tracking-wide text-white'>
							Company
						</h3>
						<ul className='space-y-2 sm:space-y-3'>
							<li>
								<Link
									className='text-sm sm:text-base text-gray-300 hover:text-white transition-all duration-200 hover:translate-x-1 inline-block transform group'
									to='/features'>
									<span className='group-hover:text-purple-300'>Features</span>
								</Link>
							</li>
							<li>
								<Link
									className='text-sm sm:text-base text-gray-300 hover:text-white transition-all duration-200 hover:translate-x-1 inline-block transform group'
									to='/pricing'>
									<span className='group-hover:text-purple-300'>Pricing</span>
								</Link>
							</li>
							<li>
								<Link
									className='text-sm sm:text-base text-gray-300 hover:text-white transition-all duration-200 hover:translate-x-1 inline-block transform group'
									to='/contact'>
									<span className='group-hover:text-purple-300'>
										Contact Us
									</span>
								</Link>
							</li>
							<li>
								<Link
									className='text-sm sm:text-base text-gray-300 hover:text-white transition-all duration-200 hover:translate-x-1 inline-block transform group'
									to='/'>
									<span className='group-hover:text-purple-300'>About</span>
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h3 className='mb-4 sm:mb-6 text-xs sm:text-sm font-bold uppercase tracking-wide text-white'>
							Resources
						</h3>
						<ul className='space-y-2 sm:space-y-3'>
							<li>
								<Link
									className='text-sm sm:text-base text-gray-300 hover:text-white transition-all duration-200 hover:translate-x-1 inline-block transform group'
									to='/docs'>
									<span className='group-hover:text-blue-300'>
										Documentation
									</span>
								</Link>
							</li>
							<li>
								<Link
									className='text-sm sm:text-base text-gray-300 hover:text-white transition-all duration-200 hover:translate-x-1 inline-block transform group'
									to='/help'>
									<span className='group-hover:text-blue-300'>Help Center</span>
								</Link>
							</li>
							<li>
								<Link
									className='text-sm sm:text-base text-gray-300 hover:text-white transition-all duration-200 hover:translate-x-1 inline-block transform group'
									to='/contact'>
									<span className='group-hover:text-blue-300'>
										Contact Support
									</span>
								</Link>
							</li>
							<li>
								<Link
									className='text-sm sm:text-base text-gray-300 hover:text-white transition-all duration-200 hover:translate-x-1 inline-block transform group'
									to='/faq'>
									<span className='group-hover:text-blue-300'>FAQ</span>
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
