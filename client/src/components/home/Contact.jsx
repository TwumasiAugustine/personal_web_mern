import axios from 'axios';
import { useState } from 'react';
import ContactCard from '/src/components/home/contactCard.jsx';

const Contact = () => {
	const [loading, setLoading] = useState(false);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [botVal, setBotVal] = useState('');
	const [message, setMessage] = useState('');


const handleMessageChange = (e) => {
    const text = e.target.value; 
    const wordCount = text.split(/\s+/).filter(Boolean).length; 

    if (wordCount > 250) {
        alert('Please enter no more than 250 words.');
    } else {
        setMessage(text); 
    }
};

	const handleSendEmail = async (e) => {
		e.preventDefault();

		if (botVal) return console.warn('bot detected');
		setLoading(true);

		try {
			const response = await axios.post(
				'http://localhost:4000/send_message',
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
			console.log(response.data);
			setLoading(false);
			setName('');
			setEmail('');
			setMessage('');
		} catch (error) {
			console.error(error);
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
								onChange={(e) => setName(e.target.value)}
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
								onChange={(e) => setEmail(e.target.value)}
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
								className='border p-2  block w-full rounded-md border-gray-300 outline-none shadow-sm focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm'
								value={botVal}
								onChange={(e) => setBotVal(e.target.value)}
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
								{message.length}/250 characters remaining
							</p>
						</div>
						<div className='sm:col-span-2'>
							<button
								tabIndex={0}
								type='submit'
								className='w-full inline-block p-2 text-base font-small text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500'>
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
