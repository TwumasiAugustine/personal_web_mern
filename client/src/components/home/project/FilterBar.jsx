/* eslint-disable react/prop-types */

const FilterBar = ({ onFilterChange }) => {
	const handleCategoryChange = (e) => {
		onFilterChange((prev) => ({
			...prev,
			category: e.target.value,
		}));
	};

	const handleDateChange = (e) => {
		onFilterChange((prev) => ({
			...prev,
			date: e.target.value,
		}));
	};

	return (
		<div className='flex  justify-between items-center w-full'>
			<div className='flex justify-between items-center space-x-4 w-full'>
				<label className='block text-sm font-medium '>
					Category:
					<select
						id='select'
						onChange={handleCategoryChange}
						className='mt-1 text-gray-800 bg-white block w-full pl-3 pr-10 py-2 text-base border-gray-500 border-[1px] focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded'>
						<option value=''>All</option>
						<option value='Web Development'>Web Development</option>
						<option value='Data Science'>Web App</option>
						<option value='Mobile Development'>Mobile Development</option>
					</select>
				</label>
				<label className='block text-sm font-medium'>
					Date:
					<input
						type='date'
						inputMode='numeric'
						onChange={handleDateChange}
						className='mt-1 text-gray-800 block w-full pl-3 pr-10 py-2 text-base border-[1px] border-gray-500 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded'
					/>
				</label>
			</div>
		</div>
	);
};

export default FilterBar;