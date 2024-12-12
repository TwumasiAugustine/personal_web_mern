/* eslint-disable react/prop-types */
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import { UserContext } from '../../../context/UserContext';
const serverUrl = import.meta.env.VITE_SERVER_URL;
import { serverURL } from '../../../config';
const backendURL = serverURL || serverUrl || 'https://personal-web-mern.onrender.com';

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
        [
            'bold',
            'underline',
            'italic',
            'link',
            'image',
            'video',
            'blockquote',
            'strike',
            'code-block',
            'formula',
        ],
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

const UpdateBlog = ({ blogId, onCancel }) => {
    const navigate = useNavigate();
    const { setBlogPosts } = useContext(UserContext); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        summary: '',
        content: '',
    });
    const [files, setFiles] = useState(null);

    useEffect(() => {
        const fetchBlogPost = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(`${backendURL}/blog/post/${blogId}`);
                setFormData({
                    title: data.post.title,
                    summary: data.post.summary,
                    content: data.post.content,
                });
            } catch (error) {
                setError('Failed to load blog post. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        
        fetchBlogPost();
    }, [blogId]);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const { title, summary, content } = formData;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!title || !summary || !content) {
            setError('Please fill out all required fields.');
            setLoading(false);
            return;
        }

        const data = new FormData();
        data.append('title', title.trim());
        data.append('summary', summary.trim());
        data.append('content', content.trim());

        if (files) {
            data.append('thumbnail', files);  
        }

        try {
            const response = await axios.put(`${backendURL}/blog/post/${blogId}`, data, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true,
            });

            if (response.status === 200) {
                alert('Post updated successfully');
                navigate('/blog');
                setBlogPosts((prev) => prev.map((post) =>
                    post._id === blogId ? { ...post, ...formData } : post
                ));
            } else {
                throw new Error('Failed to update the post. Please try again.');
            }
        } catch (error) {
            console.error('Failed to update post:', error);
            setError('Failed to update post. Please check your input and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center w-full px-4 my-5">
            <h2 className="mb-4 text-3xl font-bold">Update Your Post</h2>
            {error && <div className="mb-4 text-red-500">{error}</div>}
            <form onSubmit={handleSubmit} className="w-full max-w-xl">
                <label htmlFor="title" className="block mb-2 text-sm font-medium">
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border rounded"
                    placeholder="Enter post title"
                />

                <label htmlFor="summary" className="block mb-2 text-sm font-medium">
                    Summary
                </label>
                <input
                    type="text"
                    id="summary"
                    name="summary"
                    value={formData.summary}
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border rounded"
                    placeholder="Enter post summary"
                />

                <label
                    htmlFor="files"
                    className="block p-2 mb-4 text-center bg-gray-200 border rounded cursor-pointer hover:bg-gray-300"
                >
                    {files ? files.name : 'Choose a new image (optional)'}
                </label>
                <input
                    type="file"
                    id="files"
                    name="files"
                    accept="image/*"
                    onChange={(e) => setFiles(e.target.files[0])}
                    className="hidden"
                />

                <label htmlFor="content" className="block mb-2 text-sm font-medium">
                    Content
                </label>
                <ReactQuill
                    id="content"
                    value={formData.content}
                    name="content"
                    onChange={(value) => 
                        setFormData((prev) => ({ ...prev, content: value }))
                    }
                    formats={formats}
                    modules={modules}
                    theme="snow"
                    placeholder="Write your post content here"
                    className="mb-4"
                />

                <div className="flex justify-between w-full items-center flex-row-reverse">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`p-2 text-sm text-white rounded ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                    >
                        {loading ? 'Updating...' : 'Update Post'}
                    </button>
                    <button
                        type="button"
                        className="px-4 py-2 text-sm text-white bg-gray-500 rounded hover:bg-gray-600"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateBlog;
