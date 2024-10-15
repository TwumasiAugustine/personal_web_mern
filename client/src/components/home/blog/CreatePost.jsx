import { useState } from 'react';
import ReactQuill from 'react-quill';
import { Navigate } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

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
		['bold', 'underline','italic', 'link', 'image', 'video', 'blockquote', 'strike', 'code-block', 'formula'],
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
	const [redirect, setRedirect] = useState(false);
	const [title, setTitle] = useState('');
	const [summary, setSummary] = useState('');
	const [content, setContent] = useState('');
	const [files, setFiles] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = new FormData();
		data.set('title', title);
		data.set('summary', summary);
		data.set('content', content);
		data.set('file', files);

		const response = await fetch('http://localhost:4000/blog/create_post', {
			method: 'POST',
			body: data,
		});

		if (response.ok) {
			setRedirect(true);
		}
	};

	if (redirect) {
		return <Navigate to={'/blog'} />;
	}

	return (
		<div className='flex flex-col h-screen justify-center items-center w-full box-border px-2 lg:ml-32'>
			<h2 className='p-4 font-bold text-3xl'>Create Your Post Here!</h2>
			<form
				onSubmit={handleSubmit}
				className='w-full max-w-[600px]'>
				<label
					htmlFor='title'
					className='sr-only'>
					Title
				</label>
				<input
					className='w-full block p-2 border-[1px] border-[#ccc] mb-2 rounded'
					id='title'
					type='text'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder='Title'
					required
				/>
				<label
					htmlFor='summary'
					className='sr-only'>
					Summary
				</label>
				<input
					className='w-full block p-2 border-[1px] border-[#ccc] mb-2 rounded'
					id='summary'
					type='text'
					value={summary}
					onChange={(e) => setSummary(e.target.value)}
					placeholder='Summary'
					required
				/>
				<label
					htmlFor='files'
					className='w-full block p-2 mb-2 border-[1px] border-[#ccc] rounded cursor-pointer bg-gray-200 hover:bg-gray-300 text-center'>
					{files ? files.name : 'Choose an image'}
				</label>
				<input
					id='files'
					className='hidden'
					type='file'
					accept='image/*'
					onChange={(e) => setFiles(e.target.files[0])}
				/>
				<ReactQuill
					value={content}
					onChange={(newValue) => setContent(newValue)}
					formats={formats}
					modules={modules}
					className='mb-2 min-h-32'
				/>
				<button
					className='w-full block mt-2 bg-indigo-600 p-2 text-white rounded'
					type='submit'>
					Create Post
				</button>
			</form>
		</div>
	);
};

export default CreatePost;
