import React, { useId } from 'react';

function Select({ options, label, className = '', ...props }, ref) {
	const id = useId();
	return (
		<div className='w-full'>
			{label && (
				<label htmlFor={id} className='inline-block mb-2 text-sm font-medium text-gray-700'>
					{label}
				</label>
			)}
			<select
				{...props}
				ref={ref}
				id={id}
				className={`px-4 py-2.5 rounded-lg bg-white text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 border border-gray-300 w-full ${className}`}>
				{options?.map((option) => (
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</select>
		</div>
	);
}

export default React.forwardRef(Select);
