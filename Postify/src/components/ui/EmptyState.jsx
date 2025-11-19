import React from 'react';
import Button from './Button';

const EmptyState = ({
	icon,
	title,
	description,
	actionLabel,
	action,
	className = '',
}) => {
	return (
		<div className={`text-center py-12 px-4 ${className}`}>
			{icon && (
				<div className='mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mb-4'>
					{icon}
				</div>
			)}
			<h3 className='text-xl font-semibold text-gray-900 mb-2'>{title}</h3>
			{description && (
				<p className='text-gray-600 max-w-md mx-auto mb-6'>{description}</p>
			)}
			{action && actionLabel && (
				<Button onClick={action} variant='primary'>
					{actionLabel}
				</Button>
			)}
		</div>
	);
};

export default EmptyState;

