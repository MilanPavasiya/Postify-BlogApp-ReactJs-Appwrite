import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../index';

function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className='bg-gray-50 border-t border-gray-200 mt-auto'>
			<div className='mx-auto max-w-7xl px-4 py-12'>
				<div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
					<div className='lg:col-span-2'>
						<div className='mb-6'>
							<Logo width='100px' />
						</div>
						<p className='text-sm text-gray-600'>
							&copy; {currentYear} Postify. All Rights Reserved.
						</p>
					</div>
					<div>
						<h3 className='mb-6 text-sm font-semibold uppercase tracking-wide text-gray-900'>
							Company
						</h3>
						<ul className='space-y-3'>
							<li>
								<Link
									className='text-sm text-gray-600 transition-colors hover:text-gray-900'
									to='/'>
									Features
								</Link>
							</li>
							<li>
								<Link
									className='text-sm text-gray-600 transition-colors hover:text-gray-900'
									to='/'>
									Pricing
								</Link>
							</li>
							<li>
								<Link
									className='text-sm text-gray-600 transition-colors hover:text-gray-900'
									to='/'>
									Affiliate Program
								</Link>
							</li>
							<li>
								<Link
									className='text-sm text-gray-600 transition-colors hover:text-gray-900'
									to='/'>
									Press Kit
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h3 className='mb-6 text-sm font-semibold uppercase tracking-wide text-gray-900'>
							Support
						</h3>
						<ul className='space-y-3'>
							<li>
								<Link
									className='text-sm text-gray-600 transition-colors hover:text-gray-900'
									to='/'>
									Account
								</Link>
							</li>
							<li>
								<Link
									className='text-sm text-gray-600 transition-colors hover:text-gray-900'
									to='/'>
									Help
								</Link>
							</li>
							<li>
								<Link
									className='text-sm text-gray-600 transition-colors hover:text-gray-900'
									to='/'>
									Contact Us
								</Link>
							</li>
							<li>
								<Link
									className='text-sm text-gray-600 transition-colors hover:text-gray-900'
									to='/'>
									Customer Support
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
