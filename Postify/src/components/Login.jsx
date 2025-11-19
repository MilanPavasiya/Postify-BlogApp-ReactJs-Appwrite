import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as authLogin } from '../store/authSlice';
import { Button, Input, Logo } from './index';
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
import { useForm } from 'react-hook-form';

function Login() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { register, handleSubmit } = useForm();
	const [error, setError] = useState('');

	const onSubmit = async (data) => {
		setError('');
		try {
			const session = await authService.login(data);
			if (session) {
				const userData = await authService.getCurrentUser();

				if (userData) {
					dispatch(authLogin(userData));
					navigate('/');
				}
			}
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<div className='flex items-center justify-center w-full min-h-[calc(100vh-200px)] py-12'>
			<div className='mx-auto w-full max-w-md'>
				<div className='bg-white rounded-2xl shadow-lg border border-gray-200 p-8 md:p-10'>
					<div className='mb-6 flex justify-center'>
						<span className='inline-block w-full max-w-[120px]'>
							<Logo width='100%' />
						</span>
					</div>
					<h2 className='text-center text-3xl font-bold text-gray-900 mb-2'>
						Welcome back
					</h2>
					<p className='text-center text-gray-600 mb-8'>
						Sign in to your account to continue
					</p>
					{error && (
						<div className='mb-6 p-4 bg-red-50 border border-red-200 rounded-lg'>
							<p className='text-sm text-red-600 text-center'>{error}</p>
						</div>
					)}
					<form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
						<Input
							label='Email'
							type='email'
							placeholder='Enter your email'
							{...register('email', {
								required: true,
								validate: {
									matchPattern: (value) =>
										/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
										'Invalid email address',
								},
							})}
						/>
						<Input
							label='Password'
							type='password'
							placeholder='Enter your password'
							{...register('password', { required: true, minLength: 6 })}
						/>
						<Button type='submit' className='w-full mt-8'>
							Sign in
						</Button>
					</form>
					<p className='mt-6 text-center text-sm text-gray-600'>
						Don&apos;t have an account?&nbsp;
						<Link
							to='/signup'
							className='font-medium text-blue-600 hover:text-blue-700 transition-colors'>
							Sign up
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}

export default Login;
