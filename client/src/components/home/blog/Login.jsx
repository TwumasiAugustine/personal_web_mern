import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { UserContext } from '/context/UserContext';
/* eslint-disable react/prop-types */
import SEO from '/src/pages/SEO';

const Login = () => {
	const [formData, setFormData] = useState({
		username: '',
		password: '',
	});
	const [redirect, setRedirect] = useState(false);
	// const { setUserInfo } = useContext(UserContext);
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
		try {
			const response = await axios.post(
				'http://localhost:4000/login',
				formData,
				{
					headers: { 'Content-Type': 'application/json' },
					withCredentials: true,
				}
			);

			if (response.status === 200) {
				setUserInfo(response.data);
				setRedirect(true);
			} else {
				alert('Wrong credentials');
			}
		} catch (err) {
			alert('Error: ' + err.message);
		}
	};

	if (redirect) {
		navigate('/blog');
		window.location.reload();
	}

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
				<input
					id='password'
					name='password'
					value={formData.password}
					onChange={handleChange}
					className='border-[1px] outline-none border-[#ccc] focus:border-indigo-500 w-full p-2 block mb-2 rounded-sm'
					type='password'
					placeholder='Password'
				/>
				<button
					className='w-full p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-sm'
					type='submit'>
					Login
				</button>
			</form>
		</div>
	);
};

export default Login;
