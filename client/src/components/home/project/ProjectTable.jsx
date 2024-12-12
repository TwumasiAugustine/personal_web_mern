/* eslint-disable no-unused-vars */
import { useContext, Suspense, lazy, useState } from 'react';
import SEO from '../../../pages/SEO';
import { FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import { UserContext } from '../../../context/UserContext';
const serverUrl = import.meta.env.VITE_SERVER_URL;
import { serverURL } from '../../../config';
const backendURL = serverURL || serverUrl || 'https://personal-web-mern.onrender.com';

const UpdateProject = lazy(() => import('./UpdateProject'));

const ProjectTable = () => {
	const {
		projects,
		setProjects,
		projectsPerPage,
		setProjectsPerPage,
		currentPage,
		totalPages,
		handlePrevPage,
		handleNextPage,
	} = useContext(UserContext);

	const [updatingProjectId, setUpdatingProjectId] = useState(null);

	const handleProjectsPerPageChange = (event) => {
		setProjectsPerPage(Number(event.target.value));
	};

	const handleUpdateClick = (projectId) => {
		setUpdatingProjectId(projectId);
	};

	const handleCancelUpdate = () => {
		setUpdatingProjectId(null);
	};

	const handleDeleteClick = async (projectId) => {
		const userConfirmed = window.confirm('Are you sure you want to delete this project?');
		if (userConfirmed) {
			try {
                const response = await axios.delete(`${backendURL}/project/${projectId}`,
                    {withCredentials: true}
                );
				if (response.status === 200) {
					const updatedProjects = projects.filter((project) => project._id !== projectId);
					setProjects(updatedProjects);
					console.log('Deleted project', projectId);
				} else {
					console.error('Failed to delete project:', response.data.error);
				}
			} catch (err) {
				console.error('Error deleting project:', err);
			}
		}
	};

	return updatingProjectId ? (
		<Suspense fallback={<div>Loading Update Project...</div>}>
			<UpdateProject projectId={updatingProjectId} onCancel={handleCancelUpdate} />
		</Suspense>
	) : (
		<div className="overflow-x-auto">
			<div className="flex justify-between items-center mb-4">
				<div>
					<label htmlFor="projectsPerPage" className="mr-2 font-medium">
						Projects per page:
					</label>
					<select
						id="projectsPerPage"
						value={projectsPerPage}
						onChange={handleProjectsPerPageChange}
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
					<tr className="text-center text-sm">
						<th className="px-4 py-2">#</th>
						<th className="px-4 py-2">Project Name</th>
						<th className="px-4 py-2">URL</th>
						<th className="px-4 py-2">Actions</th>
					</tr>
				</thead>
				<tbody>
					{projects.map((project, index) => (
						<tr key={project._id} className="border-t text-center">
							<td className="px-4 py-2">{index + 1}</td>
                            <td className="px-4 py-2">{project.title}</td>
                            <td className="px-4 py-2">
                                <a href={project?.url} className='text-blue-600 hover:underline' target='_blank'>{project?.url}</a>
                            </td>
							<td className="px-4 py-2 flex justify-center items-center gap-x-8">
								<button
									className="text-sm text-blue-500 hover:text-blue-700"
									onClick={() => handleUpdateClick(project._id)}
								>
									<FaEdit /> Update
								</button>
								<button
									className="text-sm text-red-500 hover:text-red-700"
									onClick={() => handleDeleteClick(project._id)}
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

export default ProjectTable;
