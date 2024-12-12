/* eslint-disable no-unused-vars */
import { useContext, Suspense, lazy, useState } from 'react';
import SEO from '../../../pages/SEO'
import { FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import { UserContext } from '../../../context/UserContext';
const serverUrl = import.meta.env.VITE_SERVER_URL;
import { serverURL } from '../../../config';
const backendURL = serverURL || serverUrl || 'https://personal-web-mern.onrender.com';
const UpdateBlog = lazy(() => import('../blog/UpdateBlog'));

const BlogTable = () => {
	const {
		blogPosts,
		setBlogPosts,
		postsPerPage,
		setPostsPerPage,
		currentPage,
		totalPages,
		handlePrevPage,
		handleNextPage,
	} = useContext(UserContext);

	const [updatingBlogId, setUpdatingBlogId] = useState(null);
	const handlePostsPerPageChange = (event) => {
		setPostsPerPage(Number(event.target.value));
	};

	const handleUpdateClick = (blogId) => {
		setUpdatingBlogId(blogId);
	};

	const handleCancelUpdate = () => {
		setUpdatingBlogId(null);
	};

	const handleDeleteClick = async (blogId) => {
    const userConfirmed = window.confirm('Are you sure you want to delete?');
    if (userConfirmed) {
        try {
            const response = await axios.delete(`${backendURL}/blog/post/${blogId}`);
            if (response.status === 200) {
                const updatedBlogPosts = blogPosts.filter((blogPost) => blogPost._id !== blogId);
                setBlogPosts(updatedBlogPosts);
                console.log('Deleted blog post', blogId);
            } else {
                console.error('Failed to delete blog post:', response.data.error);
            }
        } catch (err) {
            console.error('Error deleting blog post:', err);
        }
    }
};


	return updatingBlogId ? (
		<Suspense fallback={<div>Loading Update Blog...</div>}>
			<UpdateBlog blogId={updatingBlogId} onCancel={handleCancelUpdate} />
		</Suspense>
	) : (
		<div className="overflow-x-auto">
			<div className="flex justify-between items-center mb-4">
				<div>
					<label htmlFor="postsPerPage" className="mr-2 font-medium">
						Posts per page:
					</label>
					<select
						id="postsPerPage"
						value={postsPerPage}
						onChange={handlePostsPerPageChange}
						className="text-sm border rounded px-2 py-1"
					>
						<option value={4}>4</option>
						<option value={8}>8</option>
						<option value={12}>12</option>
						<option value={16}>16</option>
					</select>
				</div>
				<div>
					<button
						className="px-4 py-2 text-sm bg-gray-300 rounded mr-2 disabled:opacity-50"
						onClick={handlePrevPage}
						disabled={currentPage === 1}
					>
						Prev
					</button>
					<button
						className="px-4 py-2 text-sm bg-gray-300 rounded disabled:opacity-50"
						onClick={handleNextPage}
						disabled={currentPage === totalPages}
					>
						Next
					</button>
				</div>
			</div>
			<table className="table-auto w-full bg-white shadow rounded">
				<thead className="bg-gray-200">
					<tr className="text-center">
						<th className="px-4 py-2">#</th>
						<th className="px-4 py-2">Title</th>
						<th className="px-4 py-2">Author</th>
						<th className="px-4 py-2">Actions</th>
					</tr>
				</thead>
				<tbody>
					{blogPosts.map((blog, index) => (
						<tr key={blog._id} className="border-t text-center">
							<td className="px-4 py-2">{index + 1}</td>
							<td className="px-4 py-2">{blog.title}</td>
							<td className="px-4 py-2">{blog?.author}</td>
							<td className="px-4 py-2 flex justify-center items-center gap-x-8">
								<button
									className="text-sm text-blue-500 hover:text-blue-700"
									onClick={() => handleUpdateClick(blog._id)}
								>
									<FaEdit /> Update
								</button>
								<button
									className="text-sm text-red-500 hover:text-red-700"
									onClick={() => handleDeleteClick(blog._id)}
								>
									<FaTrash /> Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default BlogTable;