import BlogHome from '/src/components/home/blog/BlogHome';
import SEO from './SEO';
const Blog = () => {
	return (
		<div className='flex flex-col  lg:justify-between  container-fluid bg-white'>
			<SEO
				title='Twumasi&apos;s Blog'
				description='Personal blog for Twumasi'
				type='Personal blog'
				name='Twumasi Augustine'
			/>
			<BlogHome />
		</div>
	);
};

export default Blog;
