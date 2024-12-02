import { useState, useContext } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SEO from '/src/pages/SEO';
import Footer from '../Footer';
import {UserContext} from '../../../context/UserContext'
const serverUrl = import.meta.env.VITE_SERVER_URL;

const Login = () => {
	const [formData, setFormData] = useState({
		username: '',
		password: '',
	});

	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const {setUserInfo} = useContext(UserContext);
	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const {username, password } = formData;
	const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        const response = await axios.post(
            `${serverUrl}/blog/login`,
            { username, password },
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            }
		);
		
		const {data} = response

        if (response.status === 200) {
            setUserInfo({data});
            navigate('/blog');
        }
    } catch (err) {
        const errorMessage =
            err.response?.data?.message || 'An unexpected error occurred';
        alert(errorMessage); 
    } finally {
        setLoading(false);
        setFormData({
            username: '',
			password: '',
			
        });
    }
};

	return (
		<>
		<div className='flex flex-col justify-center items-center h-[76vh] w-full p-4 box-border '>
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
					value={username}
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
						value={password}
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
					className='w-full p-2 bg-indigo-600 hover:bg-indigo-500 disabled:cursor-not-allowed text-white rounded-sm'
					disabled={loading}
					type='submit'
				>
					{loading ? 'Logging in...' : 'Login'}
				</button>
			</form>
			</div>
			<Footer/>
			</>
	);
};

export default Login;
