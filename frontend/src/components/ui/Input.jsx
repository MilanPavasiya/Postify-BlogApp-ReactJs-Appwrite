import React, { useId } from 'react';

const Input = React.forwardRef(
	(
		{
			label,
			type = 'text',
			error,
			helperText,
			className = '',
			required = false,
			...props
		},
		ref
	) => {
		const id = useId();

		return (
			<div className='w-full'>
				{label && (
					<label
						htmlFor={id}
						className='block text-sm font-medium text-gray-700 mb-1.5'>
						{label}
						{required && <span className='text-red-500 ml-1'>*</span>}
					</label>
				)}
				<input
					type={type}
					id={id}
					ref={ref}
					className={`
						w-full px-4 py-2.5 rounded-lg border transition-all duration-200
						${error
							? 'border-red-300 focus:border-red-500 focus:ring-red-500'
							: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
						}
						focus:outline-none focus:ring-2 focus:ring-offset-0
						disabled:bg-gray-100 disabled:cursor-not-allowed
						placeholder:text-gray-400
						${className}
					`}
					aria-invalid={error ? 'true' : 'false'}
					aria-describedby={error ? `${id}-error` : helperText ? `${id}-helper` : undefined}
					{...props}
				/>
				{error && (
					<p id={`${id}-error`} className='mt-1.5 text-sm text-red-600'>
						{error}
					</p>
				)}
				{helperText && !error && (
					<p id={`${id}-helper`} className='mt-1.5 text-sm text-gray-500'>
						{helperText}
					</p>
				)}
			</div>
		);
	}
);

Input.displayName = 'Input';

export default Input;

