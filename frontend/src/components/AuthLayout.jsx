import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function AuthLayout({ children, authentication = true }) {
	const navigate = useNavigate();
	const [loader, setLoader] = useState(true);
	const authStatus = useSelector((state) => state.auth.status);

	useEffect(() => {
		if (authentication && authStatus !== authentication) {
			navigate('/login');
		} else if (!authentication && authStatus !== authentication) {
			navigate('/');
		}
		setLoader(false);
	}, [authStatus, navigate, authentication]);

	return loader ? (
		<div className='flex items-center justify-center min-h-[calc(100vh-200px)]'>
			<div className='text-center'>
				<div className='inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4'></div>
				<p className='text-gray-600'>Loading...</p>
			</div>
		</div>
	) : (
		<>{children}</>
	);
}
