const BlogSubscription = () => {
	return (
		<div className='text-center pb-5'>
			<h2 className='text-3xl  font-bold mb-3'>
				DevBlog - A Blog Template Made For Developers
			</h2>
			<p className='mb-4 text-gray-600'>
				Welcome to my blog. Subscribe and get my latest blog post in
				your inbox.
			</p>
			<form className='flex   lg:flex-row items-center justify-between w-full  lg:max-w-[500px]'>
				
					<label
						htmlFor='email'
						className='sr-only'>
						Your email
					</label>
					<input
						autoComplete='yes'
						type='email'
						id='email'
						name='email'
						className='border w-full m-2 p-2 rounded-md text-black focus:outline-none focus:border-indigo-500'
						placeholder='Enter email'
					/>
				
					<button
						type='submit'
						className='w-30  bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded-md'>
						Subscribe
					</button>
				
			</form>
		</div>
	);
};

export default BlogSubscription;
