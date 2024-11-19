/* eslint-disable react/prop-types */
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import SEO from '/src/pages/SEO';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
const serverUrl = import.meta.env.VITE_SERVER_URL;

const Register = () => {
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		confirm_password: '',
		roles: ['user']
	});
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false); 
	const [showConfirmPassword, setShowConfirmPassword] = useState(false); 

	const navigate = useNavigate();
	const handleFormDataChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleRegister = async (e) => {
		e.preventDefault();

		console.log(formData)
		const {username, email, password, confirm_password, roles: role } = formData;
		if (password !== confirm_password) {
			return alert('Password and Confirm Password do not match');
		}
		setLoading(true);
		try {
			const response = await axios.post(
				`${serverUrl}/blog/signup`,
				{username, password, email, role},
				{
					headers: { 'Content-Type': 'application/json' },
					withCredentials: true,
				}
			);

			if (response.status === 201) {
				alert('Registration successful! You can now log in.');
				navigate('/blog/login')
			} else {
				alert('Failed to register. Please try again.');
				setLoading(false);
			}
		} catch (err) {
			alert('Error: ' + err.message);
			setLoading(false);
		}
	};

	return (
		<div className='flex flex-col justify-center items-center h-screen w-100 p-4 lg:ml-32'>
			<SEO
				title='Blog Sign Up'
				description="Sign Up for Twumasi's blog post"
				type='Personal blog'
				name='Twumasi Augustine'
			/>
			<h2 className='mb-5 p-2 font-bold text-xl'>Sign Up</h2>
			<form
				onSubmit={handleRegister}
				className='text-black w-full max-w-[400px]'
			>
				<input
					required
					id='username'
					autoFocus
					autoComplete='username'
					className='border-[1px] outline-none focus:border-indigo-500 border-[#ccc] w-full p-2 block mb-2 rounded'
					type='text'
					name='username'
					value={formData.username}
					onChange={handleFormDataChange}
					placeholder='Username'
				/>
				<input
					required
					id='email'
					autoComplete='email'
					className='border-[1px] outline-none focus:border-indigo-500 border-[#ccc] w-full p-2 block mb-2 rounded'
					type='email'
					name='email'
					value={formData.email}
					onChange={handleFormDataChange}
					placeholder='Email'
				/>

				<div className='relative mb-2'>
					<input
						required
						id='password'
						className='border-[1px] outline-none focus:border-indigo-500 border-[#ccc] w-full p-2 block rounded'
						type={showPassword ? 'text' : 'password'}
						name='password'
						value={formData.password}
						autoComplete='current-password'
						onChange={handleFormDataChange}
						placeholder='Password'
					/>
					<span
						className='absolute top-1/2 transform -translate-y-1/2 right-3 cursor-pointer text-gray-600'
						onClick={() => setShowPassword((prev) => !prev)}
					>
						{showPassword ? <FaEyeSlash /> : <FaEye />}
					</span>
				</div>

				<div className='relative mb-2'>
					<input
						required
						id='confirm_password'
						className='border-[1px] outline-none focus:border-indigo-500 border-[#ccc] w-full p-2 block rounded'
						type={showConfirmPassword ? 'text' : 'password'}
						name='confirm_password'
						value={formData.confirm_password}
						autoComplete='current-password'
						onChange={handleFormDataChange}
						placeholder='Confirm Password'
					/>
					<span
						className='absolute top-1/2 transform -translate-y-1/2 right-3 cursor-pointer text-gray-600'
						onClick={() => setShowConfirmPassword((prev) => !prev)}
					>
						{showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
					</span>
				</div>

				<button
					className='w-full p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-sm'
					tabIndex={0}
					disabled={loading}
					type='submit'
				>
					{loading ? 'Signing Up...' : 'Sign Up'}
				</button>
			</form>
		</div>
	);
};

export default Register;
