/* eslint-disable react/prop-types */
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../../context/UserContext';
const serverUrl = import.meta.env.VITE_SERVER_URL;
import { serverURL } from '../../../config';
const backendURL = serverURL || serverUrl || 'https://personal-web-mern.onrender.com';

const UpdateTable = ({ projectId, onCancel }) => {

	const { setProjects } = useContext(UserContext);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [formData, setFormData] = useState({
		title: '',
		description: '',
		url: '',
		tags: '',
	});

	const [image, setImage] = useState(null);
	const [imagePreview, setImagePreview] = useState(null);

	const { title, description, url, tags } = formData;

	useEffect(() => {
		const fetchProject = async () => {

			setLoading(true);
			try {
				const { data } = await axios.get(`${backendURL}/project/${projectId}`, {
					withCredentials: true,
				});
				
				setFormData({
					title: data.title,
					description: data.description,
					url: data.url,
					tags: Array.isArray(data.tags) ? data.tags.join(', ') : data.tags,
				});
				if (data.image) {
					setImagePreview(data.image);
				}
			} catch (err) {
				const errorMsg = err.response?.data?.message || 'Failed to load project details.';
				setError(errorMsg);
			} finally {
				setLoading(false);
			}
		};

		fetchProject();
	}, [projectId]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

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
		setError('');

		if (!title || !description || !url) {
			setError('Please fill out all required fields.');
			setLoading(false);
			return;
		}

		const projectData = new FormData();
		projectData.append('title', title.trim());
		projectData.append('description', description.trim());
		projectData.append('url', url.trim());
		projectData.append('tags', tags.split(',').map((tag) => tag.trim()));
		if (image) {
			projectData.append('image', image);
		}

		try {
			const response = await axios.put(`${backendURL}/project/${projectId}`, projectData, {
				headers: { 'Content-Type': 'multipart/form-data' },
				withCredentials: true,
			});
			if (response.status === 200) {
				alert('Project updated successfully!');
				setProjects((prev) =>prev.map((project) => project._id === projectId ? {...project, ...formData} : project))
			} else {
				throw new Error('Failed to update the project. Please try again.');
			}
		} catch (err) {
			setError('Failed to update project. Please try again.');
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex justify-center items-center min-h-screen">
			<div className="px-4 py-2 w-full max-w-4xl">
				<h2 className="text-xl font-bold mb-4 text-center">Update Project</h2>
				{error && <div className="text-red-500 mb-4">{error}</div>}
				<form onSubmit={handleSubmit} className="space-y-3">
					<div>
						<label htmlFor="title" className="block text-sm mb-2">
							Project Title
						</label>
						<input
							type="text"
							id="title"
							name="title"
							value={title}
							onChange={handleChange}
							className="w-full border rounded p-2"
							required
						/>
					</div>
					<div>
						<label htmlFor="description" className="block text-sm mb-2">
							Project Description
						</label>
						<textarea
							id="description"
							name="description"
							value={description}
							onChange={handleChange}
							className="w-full border rounded p-2"
							required
						></textarea>
					</div>
					<div className="lg:grid lg:grid-cols-2 lg:gap-4">
						<div>
							<label htmlFor="url" className="block text-sm mb-2">
								Project URL
							</label>
							<input
								type="url"
								id="url"
								name="url"
								value={url}
								onChange={handleChange}
								className="w-full border rounded p-2"
								required
							/>
						</div>
						<div>
							<label htmlFor="tags" className="block text-sm mb-2">
								Tags (Comma Separated)
							</label>
							<input
								type="text"
								id="tags"
								name="tags"
								value={tags}
								onChange={handleChange}
								className="w-full border rounded p-2"
							/>
						</div>
					</div>
					<div className="lg:grid lg:grid-cols-2 lg:gap-4">
						<div>
							<label htmlFor="image" className="block text-sm mb-2">
								Update Image
							</label>
							<input
								type="file"
								id="image"
								onChange={handleImageChange}
								className="w-full border rounded p-2"
							/>
						</div>
						{imagePreview && (
							<div>
								<p className="text-sm font-medium">Image Preview:</p>
								<img
									src={`${backendURL}/imagePreview`}
									alt="Preview"
									className="mt-2 w-[180px] border rounded"
								/>
							</div>
						)}
					</div>
					<div className="flex justify-between">
						<button
							type="submit"
							className={`px-4 py-2 text-white rounded ${
								loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
							}`}
							disabled={loading}
						>
							{loading ? 'Updating...' : 'Update Project'}
						</button>
						<button
							type="button"
							className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
							onClick={onCancel}
						>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};


export default UpdateTable;
