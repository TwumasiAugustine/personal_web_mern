import { useState } from 'react';
import axios from 'axios';

const AddProject = () => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [url, setUrl] = useState('');
	const [tags, setTags] = useState('');
	const [image, setImage] = useState(null);
	const [imagePreview, setImagePreview] = useState(null);
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');

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
		const formData = new FormData();
		formData.append('title', title);
		formData.append('description', description);
		formData.append('url', url);
		formData.append('tags', tags);
		if (image) formData.append('image', image);

		try {
			const response = await axios.post('/api/projects', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
			setMessage('Project added successfully!');
		} catch (err) {
			setMessage('Failed to add project. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='flex justify-center items-center h-screen'>
			<div className='px-4 py-2 rounded w-full max-w-4xl'>
				<h2 className='text-xl font-bold mb-4 text-center'>Add New Project</h2>
				<form onSubmit={handleSubmit} className='space-y-3'>
					<div>
						<label htmlFor='title' className='block mb-2 text-sm'>
							Project Title
						</label>
						<input
							type='text'
							id='title'
							className='w-full p-2 border border-gray-300 rounded'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							required
						/>
					</div>
					<div>
						<label htmlFor='description' className='block mb-2 text-sm'>
							Project Description
						</label>
						<textarea
							id='description'
							className='w-full p-2 border border-gray-300 rounded'
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							required
						></textarea>
					</div>
					<div className='lg:grid lg:grid-cols-2 lg:gap-4'>
						<div>
							<label htmlFor='url' className='block mb-2 text-sm'>
								Project URL
							</label>
							<input
								type='url'
								id='url'
								className='w-full p-2 border border-gray-300 rounded'
								value={url}
								onChange={(e) => setUrl(e.target.value)}
								required
							/>
						</div>
						<div>
							<label htmlFor='tags' className='block mb-2 text-sm'>
								Tags (Comma Separated)
							</label>
							<input
								type='text'
								id='tags'
								className='w-full p-2 border border-gray-300 rounded'
								value={tags}
								onChange={(e) => setTags(e.target.value)}
								placeholder="e.g. 'React, Node.js, MongoDB'"
							/>
						</div>
					</div>
					<div className='lg:grid lg:grid-cols-2 lg:gap-4'>
						<div>
							<label htmlFor='image' className='block mb-2 text-sm'>
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
								<p className='font-medium text-gray-700 text-sm'>Image Preview:</p>
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
						disabled={loading}
					>
						{loading ? 'Adding...' : 'Add Project'}
					</button>
				</form>
				{message && <p className='mt-4 text-center'>{message}</p>}
			</div>
		</div>
	);
};

export default AddProject;
