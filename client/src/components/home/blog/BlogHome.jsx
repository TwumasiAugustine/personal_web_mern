/* eslint-disable no-unused-vars */
import BlogSubscription from './blogSubscription'
import BlogPost from './blogPosts'
const BlogHome = () => {
	return (
		<section className='py-12 lg:px-20 lg:mr-0  flex-1 space-x-5  lg:w-100 lg:ml-80 px-5'>
			<BlogSubscription />
			<BlogPost />
		</section>
	);
};

export default BlogHome;

