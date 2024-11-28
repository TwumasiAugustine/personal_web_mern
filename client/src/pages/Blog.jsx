import Footer from '../components/home/Footer';
import BlogPosts from '../components/home/blog/blogPosts';

import SEO from './SEO';
const Blog = () => {
	return (
		<div>
			<SEO
				title='Blog'
				description='Personal blog for Twumasi'
				type='Personal Blog'
				name='Twumasi Augustine'
			/>
			<BlogPosts />
			<Footer />
		</div>
	);
};

export default Blog;
