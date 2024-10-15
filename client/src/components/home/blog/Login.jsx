import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '/src/UserContext';
/* eslint-disable react/prop-types */
import SEO from '/src/pages/SEO';

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [redirect, setRedirect] = useState(false);
	const { setUserInfo } = useContext(UserContext);
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch('http://localhost:4000/blog/login', {
				method: 'POST',
				body: JSON.stringify({ username, password }),
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include',
			});

			if (response.ok) {
				response.json().then((userInfo) => {
					setUserInfo(userInfo);
					setRedirect(true);
				});
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
			<form
				onSubmit={handleLogin}
				className='text-black w-full max-w-[400px]'>
				<label
					className='sr-only'
					htmlFor='username'>
					Username
				</label>
				<input
					id='username'
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					autoFocus
					autoComplete='username'
					className='border-[1px] outline-none focus:border-indigo-500 border-[#ccc] w-full p-2 block mb-2 rounded'
					type='text'
					placeholder='Username'
				/>
				<label
					className='sr-only'
					htmlFor='password'>
					Password
				</label>
				<input
					id='password'
					className='border-[1px] outline-none border-[#ccc] focus:border-indigo-500 w-full p-2 block mb-2 rounded-sm'
					type='password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
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
