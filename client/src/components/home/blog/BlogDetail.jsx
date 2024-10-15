/* eslint-disable react/prop-types */
import SEO from '/src/pages/SEO';

const BlogDetail = () => {
    
	return (
		<div>
			<SEO
				title='Blog Post Details'
				description='Personal blog for Twumasi'
				type='Personal blog'
				name='Twumasi Augustine'
			/>
			<article className='blog-post  p-5 lg:py-10 p-md-5'>
				<div className='container max-w-3xl mx-auto'>
					<header className='blog-post-header'>
						<h2 className='title mb-2 text-2xl font-bold'>
							Blog Header
						</h2>
						<div className='meta mb-3 flex justify-start gap-5 text-sm text-gray-500'>
							<span className='date'>23/04/19</span>
							<span className='time'>
								5 min
							</span>
							<span className='comment'>
								<a
									className='text-link hover:underline'
									href='#'>
									5 comments
								</a>
							</span>
						</div>
					</header>
					<div className='blog-post-body'>
						{/* {content.body.map((section, index) => {
							switch (section.type) {
								case 'image':
									return (
										<img
											key={index}
											src={section.src}
											alt={section.alt}
											className='mb-4'
										/>
									);
								case 'text':
									return <p key={index}>{section.content}</p>;
								case 'video':
									return (
										<div
											key={index}
											className='video-embed mb-4 w-100'>
											<iframe
												loading='lazy'
												width='100%'
												height='315'
												src={section.content}
												title='Video player'
												frameBorder='0'
												allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
												allowFullScreen></iframe>
										</div>
									);
								default:
									return null;
							}
						})} */}
					</div>
					<nav className='blog-nav mt-5'>
						<ul className='bg-indigo-600 text-white flex flex-wrap justify-between p-2 gap-4'>
							{/* {content.nav.map((item, index) => (
								<li key={index}>
									<a
										href={item.link}
										className=' hover:underline'>
										{item.label}
									</a>
								</li>
							))} */}
						</ul>
					</nav>
				</div>
			</article>
		</div>
	);
};

export default BlogDetail;
