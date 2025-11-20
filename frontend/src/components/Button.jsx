import React from 'react';

function Button({
	children,
	type = 'button',
	bgColor = 'bg-blue-600',
	textColor = 'text-white',
	className = '',
	...props
}) {
	return (
		<button
			type={type}
			className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed ${bgColor} ${textColor} ${className}`}
			{...props}>
			{children}
		</button>
	);
}

export default Button;
