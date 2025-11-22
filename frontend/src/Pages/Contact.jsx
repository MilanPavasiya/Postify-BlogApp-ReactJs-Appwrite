import React, { useState } from 'react';
import { Container, Button, Input } from '../components/index';
import { useForm } from 'react-hook-form';

function Contact() {
	const [submitted, setSubmitted] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const onSubmit = async (data) => {
		console.log('Contact form submitted:', data);
		setSubmitted(true);
		reset();
		setTimeout(() => setSubmitted(false), 5000);
	};

	return (
		<div className='min-h-screen bg-gradient-to-br from-pink-50 via-white to-orange-50'>
			<div className='py-16 md:py-24'>
				<Container>
					<div className='text-center mb-16 animate-fade-in'>
						<h1 className='text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-6 animate-slide-up'>
							Get in Touch
						</h1>
						<p className='text-xl text-gray-600 max-w-2xl mx-auto mb-4'>
							Have a question or feedback? We'd love to hear from you! Our team
							is committed to providing excellent support and we typically
							respond within 24 hours.
						</p>
						<p className='text-lg text-gray-500 max-w-2xl mx-auto'>
							Whether you need technical assistance, have a feature request, or
							just want to say hello, we're here to help.
						</p>
					</div>

					<div className='max-w-2xl mx-auto'>
						<div className='bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-100 animate-fade-in-up'>
							{submitted && (
								<div className='mb-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg animate-fade-in'>
									<p className='font-semibold'>
										Thank you! Your message has been received.
									</p>
								</div>
							)}

							<form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
								<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
									<div>
										<Input
											label='First Name'
											placeholder='John'
											{...register('firstName', {
												required: 'First name is required',
											})}
										/>
										{errors?.firstName && (
											<p className='text-red-600 text-sm mt-1'>
												{errors.firstName.message}
											</p>
										)}
									</div>
									<div>
										<Input
											label='Last Name'
											placeholder='Doe'
											{...register('lastName', {
												required: 'Last name is required',
											})}
										/>
										{errors?.lastName && (
											<p className='text-red-600 text-sm mt-1'>
												{errors.lastName.message}
											</p>
										)}
									</div>
								</div>

								<div>
									<Input
										label='Email'
										type='email'
										placeholder='john@example.com'
										{...register('email', {
											required: 'Email is required',
											pattern: {
												value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
												message: 'Invalid email address',
											},
										})}
									/>
									{errors?.email && (
										<p className='text-red-600 text-sm mt-1'>
											{errors.email.message}
										</p>
									)}
								</div>

								<div>
									<label className='block mb-2 text-sm font-medium text-gray-700'>
										Subject
									</label>
									<select
										{...register('subject', {
											required: 'Subject is required',
										})}
										className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all'>
										<option value=''>Select a subject</option>
										<option value='general'>General Inquiry</option>
										<option value='support'>Technical Support</option>
										<option value='feature'>Feature Request</option>
										<option value='bug'>Report a Bug</option>
										<option value='other'>Other</option>
									</select>
									{errors?.subject && (
										<p className='text-red-600 text-sm mt-1'>
											{errors.subject.message}
										</p>
									)}
								</div>

								<div>
									<label className='block mb-2 text-sm font-medium text-gray-700'>
										Message
									</label>
									<textarea
										{...register('message', {
											required: 'Message is required',
										})}
										rows={6}
										placeholder='Tell us how we can help...'
										className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all resize-none'></textarea>
									{errors?.message && (
										<p className='text-red-600 text-sm mt-1'>
											{errors.message.message}
										</p>
									)}
								</div>

								<Button
									type='submit'
									className='w-full bg-gradient-to-r from-pink-600 to-orange-600 hover:from-pink-700 hover:to-orange-700 text-white py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300'>
									Send Message
								</Button>
							</form>
						</div>

						<div className='mt-12 grid grid-cols-1 md:grid-cols-3 gap-6'>
							<div className='text-center p-6 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 animate-fade-in-up'>
								<div className='text-3xl mb-4'>📧</div>
								<h3 className='font-semibold text-gray-900 mb-2'>Email</h3>
								<p className='text-gray-600 text-sm'>support@postify.com</p>
							</div>
							<div
								className='text-center p-6 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 animate-fade-in-up'
								style={{ animationDelay: '0.1s' }}>
								<div className='text-3xl mb-4'>💬</div>
								<h3 className='font-semibold text-gray-900 mb-2'>Live Chat</h3>
								<p className='text-gray-600 text-sm'>Available 24/7</p>
							</div>
							<div
								className='text-center p-6 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 animate-fade-in-up'
								style={{ animationDelay: '0.2s' }}>
								<div className='text-3xl mb-4'>📞</div>
								<h3 className='font-semibold text-gray-900 mb-2'>Phone</h3>
								<p className='text-gray-600 text-sm'>+1 (555) 123-4567</p>
							</div>
						</div>
					</div>
				</Container>
			</div>
		</div>
	);
}

export default Contact;
