/* eslint-disable react/prop-types */
import { useState } from 'react';
import SEO from '/src/pages/SEO';

const Register = () => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleRegister = async (e) => {
		e.preventDefault();
		try {
			await fetch('http://localhost:4000/blog/register', {
				method: 'POST',
				body: JSON.stringify({ username, email, password }),
				headers: { 'Content-Type': 'application/json' },
			});
		} catch (err) {
			alert('Error: ' + err.message);
		}
	};

	return (
		<div className='flex flex-col justify-center items-center h-screen w-100 p-4 lg:ml-32'>
			<SEO
				title='Blog Register'
				description="Register for Twumasi's blog post"
				type='Personal blog'
				name='Twumasi Augustine'
			/>
			<h2 className='mb-5 p-2 font-bold text-xl'>Register</h2>
			<form
				onSubmit={handleRegister}
				className='text-black w-full max-w-[400px]'>
				<label
					className='sr-only'
					htmlFor='username'>
					Username
				</label>
				<input
					required
					id='username'
					autoFocus
					autoComplete='username'
					className='border-[1px] outline-none focus:border-indigo-500 border-[#ccc] w-full p-2 block mb-2 rounded'
					type='text'
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					placeholder='Username'
				/>
				<label
					className='sr-only'
					htmlFor='email'>
					Email
				</label>
				<input
					required
					id='email'
					autoComplete='email'
					className='border-[1px] outline-none focus:border-indigo-500 border-[#ccc] w-full p-2 block mb-2 rounded'
					type='email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder='Email'
				/>
				<label
					className='sr-only'
					htmlFor='password'>
					Password
				</label>
				<input
					required
					id='password'
					className='border-[1px] outline-none focus:border-indigo-500 border-[#ccc] w-full p-2 block mb-2 rounded'
					type='password'
					value={password}
					autoComplete='current-password'
					onChange={(e) => setPassword(e.target.value)}
					placeholder='Password'
				/>
				<button
					className='w-full p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-sm'
					type='submit'>
					Register
				</button>
			</form>
		</div>
	);
};

export default Register;
