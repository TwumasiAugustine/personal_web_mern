import  {Suspense, lazy} from 'react'
export const SingleBlogPost = lazy(() => import('./singleBlogPost'));
import {FaArrowRight, FaArrowLeft} from 'react-icons/fa'
import {blogPosts} from '/src/data'
const BlogPosts = () => {
    

	return (
		<div className='container single-col-max-width my-12 pr-5'>
			<Suspense
				fallback={
					<div className='flex justify-center items-center h-screen w-full text-black '>
						Loading...
					</div>
				}>
				{blogPosts.map((post) => (
					<SingleBlogPost
						key={post.id}
						post={post}
					/>
				))}
			</Suspense>
			<nav className='bg-indigo-600 text-sm p-2 text-white flex justify-between items-center my-5 '>
				<a
					className='flex items-center gap-2'
					href='#'>
					<FaArrowLeft /> <span>Prev</span>
				</a>
				<a
					className='flex items-center gap-2'
					href='#'>
					<span>Next</span> <FaArrowRight />
				</a>
			</nav>
		</div>
	);
};

export default BlogPosts;