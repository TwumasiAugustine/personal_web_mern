/* eslint-disable no-unused-vars */
import { useState } from 'react';
import axios from 'axios';
const serverUrl = import.meta.env.VITE_SERVER_URL;
import { serverURL } from '../../../config';
const backendURL = serverURL || serverUrl || 'https://personal-web-mern.onrender.com';

const AddProject = () => {
	const [formData, setFormData] = useState({
		title: '',
		description: '',
		url: '',
		tags: '',
	});
	const [image, setImage] = useState(null);
	const [imagePreview, setImagePreview] = useState(null);
	const [loading, setLoading] = useState(false);

	const { title, description, url, tags } = formData;

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setImage(file);
			setImagePreview(URL.createObjectURL(file));
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const projectData = new FormData();
		projectData.append('title', title);
		projectData.append('description', description);
		projectData.append('url', url);
		projectData.append('tags', tags);
		if (image) projectData.append('image', image);

		try {
			const response = await axios.post(
				`${backendURL}/project`,
				projectData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				},
			);
			alert('Project added successfully!');
		} catch (err) {
			const errorMessage =
            err.response?.data?.message || 'An unexpected error occurred';
        alert(errorMessage);
		} finally {
			setLoading(false);
			setFormData({
				title: '',
				description: '',
				url: '',
				tags: '',
			})
			setImage(null);
			setImagePreview(null);
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	return (
		<div className='flex justify-center items-center h-screen'>
			<div className='px-4 py-2 rounded w-full max-w-4xl'>
				<h2 className='text-xl font-bold mb-4 text-center'>
					Add New Project
				</h2>
				<form
					onSubmit={handleSubmit}
					className='space-y-3 overflow-auto h-[80vh]'>
					<div>
						<label
							htmlFor='title'
							className='block mb-2 text-sm'>
							Project Title
						</label>
						<input
							type='text'
							id='title'
							name='title'
							className='w-full p-2 border border-gray-300 rounded'
							value={title}
							onChange={handleChange}
							required
						/>
					</div>
					<div>
						<label
							htmlFor='description'
							className='block mb-2 text-sm'>
							Project Description
						</label>
						<textarea
							id='description'
							name='description'
							className='w-full p-2 border border-gray-300 rounded'
							value={description}
							onChange={handleChange}
							required></textarea>
					</div>
					<div className='lg:grid lg:grid-cols-2 lg:gap-4'>
						<div>
							<label
								htmlFor='url'
								className='block mb-2 text-sm'>
								Project URL
							</label>
							<input
								type='url'
								id='url'
								name='url'
								className='w-full p-2 border border-gray-300 rounded'
								value={url}
								onChange={handleChange}
								required
							/>
						</div>
						<div>
							<label
								htmlFor='tags'
								className='block mb-2 text-sm'>
								Tags (Comma Separated)
							</label>
							<input
								type='text'
								id='tags'
								name='tags'
								className='w-full p-2 border border-gray-300 rounded'
								value={tags}
								onChange={handleChange}
								placeholder="e.g. 'React, Node.js, MongoDB'"
							/>
						</div>
					</div>
					<div className='lg:grid lg:grid-cols-2 lg:gap-4'>
						<div>
							<label
								htmlFor='image'
								className='block mb-2 text-sm'>
								Project Image
							</label>
							<input
								type='file'
								id='image'
								className='w-full p-2 border border-gray-300 rounded'
								onChange={handleImageChange}
							/>
						</div>
						{imagePreview && (
							<div className='mt-4 lg:mt-0'>
								<p className='font-medium text-gray-700 text-sm'>
									Image Preview:
								</p>
								<img
									src={imagePreview}
									alt='Preview'
									className='mt-2 w-[180px] object-contain border border-gray-300 rounded'
								/>
							</div>
						)}
					</div>
					<button
						type='submit'
						className='px-4 py-2 bg-blue-600 text-white rounded disabled:cursor-not-allowed w-full text-sm'
						disabled={loading}>
						{loading ? 'Adding...' : 'Add Project'}
					</button>
				</form>
			</div>
		</div>
	);
};

export default AddProject;
