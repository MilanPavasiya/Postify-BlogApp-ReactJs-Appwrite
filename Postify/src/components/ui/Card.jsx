import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Card = React.forwardRef(
	({ children, className = '', hover = false, asLink = false, to, ...props }, ref) => {
		const baseStyles =
			'bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden transition-all duration-200';

		const hoverStyles = hover
			? 'hover:shadow-lg hover:border-gray-300 hover:-translate-y-1'
			: '';

		const content = (
			<div ref={ref} className={`${baseStyles} ${hoverStyles} ${className}`} {...props}>
				{children}
			</div>
		);

		if (asLink && to) {
			return (
				<Link to={to} className='block'>
					{content}
				</Link>
			);
		}

		return content;
	}
);

Card.displayName = 'Card';

export const CardHeader = ({ children, className = '', ...props }) => (
	<div className={`p-6 pb-4 ${className}`} {...props}>
		{children}
	</div>
);

export const CardBody = ({ children, className = '', ...props }) => (
	<div className={`p-6 ${className}`} {...props}>
		{children}
	</div>
);

export const CardFooter = ({ children, className = '', ...props }) => (
	<div className={`p-6 pt-4 border-t border-gray-200 bg-gray-50 ${className}`} {...props}>
		{children}
	</div>
);

export default Card;

