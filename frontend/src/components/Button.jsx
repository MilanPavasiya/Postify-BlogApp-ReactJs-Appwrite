import React from 'react';

function Button({
	children,
	type = 'button',
	bgColor = 'bg-gradient-to-r from-blue-600 to-purple-600',
	textColor = 'text-white',
	className = '',
	...props
}) {
	const isGradient = bgColor.includes('gradient');
	const hoverEffect = isGradient
		? 'hover:shadow-xl hover:scale-105 transform'
		: 'hover:shadow-md';

	return (
		<button
			type={type}
			className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 shadow-lg ${hoverEffect} disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${bgColor} ${textColor} ${className}`}
			{...props}>
			{children}
		</button>
	);
}

export default Button;
