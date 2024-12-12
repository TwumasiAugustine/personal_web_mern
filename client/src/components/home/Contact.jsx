/* eslint-disable no-unused-vars */
import axios from 'axios';
import { useState } from 'react';
import ContactCard from '/src/components/home/contactCard.jsx';
const serverUrl = import.meta.env.VITE_SERVER_URL;
import { serverURL } from '../../config';
const backendURL = serverURL || serverUrl || 'https://personal-web-mern.onrender.com';
const Contact = () => {
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		botVal: '',
		message: '',
	});

	const handleMessageChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const { name, email, botVal, message } = formData;

	const handleSendEmail = async (e) => {
		e.preventDefault();

		// Count the number of words in the message
		const wordCount = message.trim().split(/\s+/).length;
		if (wordCount > 50) {
			alert('Message cannot exceed 50 words.');
			return;
		}

		if (botVal) return console.warn('bot detected');
		setLoading(true);

		try {
			const response = await axios.post(
				`${backendURL}/send_message`,
				{
					name,
					email,
					message,
				},
				{
					withCredentials: true,
				},
			);

			alert('Message sent successfully');
		} catch (error) {
			console.error(error);
			alert('Error sending message', error);
		} finally {
			setFormData({
				name: '',
				email: '',
				botVal: '',
				message: '',
			});
			setLoading(false);
		}
	};

	return (
		<div
			id='contact'
			className='bg-white pb-10 sm:py-12 px-6 lg:px-8'>
			<div className='mx-auto'>
				<div className='mx-auto max-w-2xl lg:text-center'>
					<h2 className='text-indigo-600 text-2xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl py-3'>
						Contact Us
					</h2>
					<p className='mb-4 text-lg leading-8 text-gray-600'>
						We’d love to hear from you! Fill out the form below to
						get in touch.
					</p>
				</div>
				<div className='flex flex-col gap-10 justify-evenly lg:flex-row sm:mt-10 lg:mt-14 w-full'>
					<form
						onSubmit={handleSendEmail}
						className='grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8 w-full  max-w-[500px]'>
						<div>
							<label
								htmlFor='name'
								className='block text-sm font-medium text-gray-900'>
								Name
							</label>
							<input
								autoComplete='yes'
								type='text'
								id='name'
								name='name'
								required
								className='p-2 border outline-none mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm'
								placeholder='Your Name'
								value={name}
								onChange={handleMessageChange}
							/>
						</div>
						<div>
							<label
								htmlFor='email'
								className='block text-sm font-medium text-gray-900'>
								Email
							</label>
							<input
								autoComplete='yes'
								type='email'
								id='email'
								name='email'
								required
								className='border outline-none p-2 mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm'
								placeholder='Your Email'
								value={email}
								disabled={loading}
								onChange={handleMessageChange}
							/>
						</div>
						<div className='hidden sm:col-span-2'>
							<label
								htmlFor='bot_detector'
								className='block text-sm font-medium text-gray-900'>
								Bot Detector
							</label>
							<input
								type='text'
								id='bot_detector'
								placeholder='Subject'
								name='botVal'
								className='border p-2  block w-full rounded-md border-gray-300 outline-none shadow-sm focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm'
								value={botVal}
								onChange={handleMessageChange}
							/>
						</div>
						<div className='sm:col-span-2'>
							<label
								htmlFor='message'
								className='block text-sm font-medium text-gray-900'>
								Message
							</label>
							<textarea
								id='message'
								name='message'
								rows='5'
								required
								className='border p-2 outline-none mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm'
								placeholder='Your Message'
								value={message}
								onChange={handleMessageChange}
							/>
							<p className='float-end text-sm text-gray-500 mt-2'>
								{message.trim().split(/\s+/).length}/50
							</p>
						</div>
						<div className='sm:col-span-2'>
							<button
								tabIndex={0}
								type='submit'
								disabled={loading}
								className='w-full inline-block p-2 text-base font-small disabled:cursor-not-allowed text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500'>
								{loading ? 'Sending...' : 'Send Message'}
							</button>
						</div>
					</form>
					<>
						<ContactCard />
					</>
				</div>
			</div>
		</div>
	);
};

export default Contact;
