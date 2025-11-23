import React from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';

function LogoutBtn() {
	const dispatch = useDispatch();

	const logoutHandler = () => {
		authService.logout().then(() => dispatch(logout()));
	};
	return (
		<button
			className='px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 rounded-lg transition-all duration-200 hover:bg-gray-100 hover:text-gray-900'
			onClick={logoutHandler}>
			Logout
		</button>
	);
}

export default LogoutBtn;
