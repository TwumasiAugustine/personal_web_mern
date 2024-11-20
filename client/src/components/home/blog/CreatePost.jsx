import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
const serverUrl = import.meta.env.VITE_SERVER_URL;

const formats = [
	'bold',
	'header',
	'italic',
	'underline',
	'strike',
	'blockquote',
	'code-block',
	'link',
	'image',
	'video',
	'formula',
	'list',
	'bullet',
	'indent',
	'script',
	'direction',
	'align',
	'size',
	'color',
	'font',
];

const modules = {
	toolbar: [
		[{ header: [1, 2, 3, 4, 5, 6, false] }],
		['bold', 'underline', 'italic', 'link', 'image', 'video', 'blockquote', 'strike', 'code-block', 'formula'],
		[{ list: 'ordered' }, { list: 'bullet' }],
		[{ script: 'sub' }, { script: 'super' }],
		[{ indent: '-1' }, { indent: '+1' }],
		[{ font: [] }],
		[{ align: [] }],
		['clean'],
	],
	syntax: {
		highlight: (text) => hljs.highlightAuto(text).value,
	},
};

const CreatePost = () => {
	const [loading, setLoading] = useState(false);
	const [redirect, setRedirect] = useState(false);
	const [formData, setFormData] = useState({
		title: '',
		summary: '',
		content: '',
	});
	const [files, setFiles] = useState(null);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = new FormData();
		data.append('title', formData.title);
		data.append('summary', formData.summary);
		data.append('content', formData.content);
		if (files) data.append('thumbnail', files);
		setLoading(true);
		try {
			const response = await axios.post(
				`${serverUrl}/blog/create`,
				data,
				{
					headers: { 'Content-Type': 'multipart/form-data' },
					withCredentials: true,
				}
			);

			if (response.status === 201) {
				alert('Post created successfully');
				setLoading(false);
				setRedirect(true);
			}
		} catch (err) {
			alert('Failed to create post: ' + err.message);
			setLoading(false);
		}
	};

	if (redirect) {
		return <Navigate to='/blog' />;
	}

	return (
		<div className='flex flex-col h-100 justify-center items-center w-full box-border px-2 my-5 lg:ml-32'>
			<h2 className='p-4 font-bold text-3xl'>Create Your Post Here!</h2>
			<form onSubmit={handleSubmit} className='w-full max-w-[600px]'>
				<label
                    htmlFor='title'
                    className='block text-sm font-medium'>
                    Title
                </label>
				<input
					className='w-full block p-2 border-[1px] border-[#ccc] mb-2 rounded'
					name='title'
					id='title'
					type='text'
					value={formData.title}
					onChange={handleChange}
					placeholder='Write post title here...'
					required
				/>
				<label
					htmlFor='summary'
					className='block text-sm font-medium'>
					Summary
					</label>
				<input
					className='w-full block p-2 border-[1px] border-[#ccc] mb-2 rounded'
					id='summary'
					name='summary'
					type='text'
					value={formData.summary}
					onChange={handleChange}
					placeholder='Write post summary here...'
					required
				/>
				<label
					htmlFor='files'
					className='w-full block p-2 mb-2 border-[1px] border-[#ccc] rounded cursor-pointer bg-gray-200 hover:bg-gray-300 text-center'>
					{files ? files.name : 'Choose an image'}
				</label>
				<input
					id='files'
					name='files'
					className='hidden'
					type='file'
					accept='image/*'
					onChange={(e) => setFiles(e.target.files[0])}
				/>
				<label
                    htmlFor='content'
                    className='block text-sm font-medium'>
                    Content
                </label>
				<ReactQuill
					id='content'
					value={formData.content}
					name='content'
					onChange={(content) => setFormData((prev) => ({ ...prev, content }))}
					formats={formats}
					theme='snow'
					placeholder='Write your post here...'
					modules={modules}
					className='mb-2 min-h-32'
				/>
				<button
					className='w-full block mt-2 bg-indigo-600 p-2 text-white rounded'
					disabled={loading}
					type='submit'>
					{loading ? 'Creating...' : 'Create Post'}
				</button>
			</form>
		</div>
	);
};

export default CreatePost;
