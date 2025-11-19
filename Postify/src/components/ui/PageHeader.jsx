import React from 'react';

const PageHeader = ({ title, subtitle, children, className = '', ...props }) => {
	return (
		<div className={`mb-8 ${className}`} {...props}>
			{title && (
				<h1 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-2'>
					{title}
				</h1>
			)}
			{subtitle && (
				<p className='text-lg text-gray-600 max-w-2xl'>{subtitle}</p>
			)}
			{children && <div className='mt-4'>{children}</div>}
		</div>
	);
};

export default PageHeader;

