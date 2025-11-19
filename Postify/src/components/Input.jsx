import React, { useId } from 'react';

const Input = React.forwardRef(
	({ label, type = 'text', className = '', ...props }, ref) => {
		const id = useId();
		return (
			<div className='w-full'>
				{label && (
					<label className='inline-block mb-2 text-sm font-medium text-gray-700' htmlFor={id}>
						{label}
					</label>
				)}
				<input
					type={type}
					className={`px-4 py-2.5 rounded-lg bg-white text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 border border-gray-300 w-full placeholder:text-gray-400 ${className}`}
					ref={ref}
					{...props}
					id={id}
				/>
			</div>
		);
	}
);

export default Input;
