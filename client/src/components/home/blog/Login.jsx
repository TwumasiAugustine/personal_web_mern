import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SEO from '/src/pages/SEO';

const serverUrl = import.meta.env.VITE_SERVER_URL;

const Login = () => {
	const [formData, setFormData] = useState({
		username: '',
		password: '',
	});

	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false); 
	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		const {username, password } = formData;
		setLoading(true);
		try {
			const response = await axios.post(
				`${serverUrl}/blog/login`,
				{username, password},
				{
					headers: { 'Content-Type': 'application/json' },
					withCredentials: true,
				}
			);

			if (response.status === 200) {
				alert('Successfully logged in');
				navigate('/blog');
				window.location.reload();
				setLoading(false);
			} else {
				alert('Wrong credentials');
				setLoading(false);
			}
		} catch (err) {
			alert('Error: ' + err.message);
			setLoading(false);
		}
	};

	return (
		<div className='flex flex-col justify-center items-center h-screen w-full p-4 box-border lg:ml-32'>
			<SEO
				title='Blog Login'
				description="Login to Twumasi's blog post"
				type='Personal blog'
				name='Twumasi Augustine'
			/>
			<h2 className='mb-5 p-2 font-bold text-xl'>Login</h2>
			<form onSubmit={handleLogin} className='text-black w-full max-w-[400px]'>
				<input
					id='username'
					name='username'
					value={formData.username}
					onChange={handleChange}
					autoFocus
					autoComplete='username'
					className='border-[1px] outline-none focus:border-indigo-500 border-[#ccc] w-full p-2 block mb-2 rounded'
					type='text'
					placeholder='Username'
				/>
				<div className='relative mb-2'>
					<input
						id='password'
						name='password'
						value={formData.password}
						onChange={handleChange}
						className='border-[1px] outline-none focus:border-indigo-500 border-[#ccc] w-full p-2 block rounded'
						type={showPassword ? 'text' : 'password'}
						placeholder='Password'
					/>
					<span
						className='absolute top-1/2 transform -translate-y-1/2 right-3 cursor-pointer text-gray-600'
						onClick={() => setShowPassword((prev) => !prev)}
					>
						{showPassword ? <FaEyeSlash /> : <FaEye />}
					</span>
				</div>
				<button
					className='w-full p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-sm'
					disabled={loading}
					type='submit'
				>
					{loading ? 'Logging in...' : 'Login'}
				</button>
			</form>
		</div>
	);
};

export default Login;
