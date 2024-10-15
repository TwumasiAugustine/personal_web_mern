
import { social } from '../../data';

const Footer = () => {
	return (
		<footer className='bg-gray-800 text-white py-4'>
			<div className='container mx-auto px-4 lg:px-6'>
				<div className='flex flex-col items-center lg:flex-row lg:justify-between'>
					<div className='text-center lg:text-left mb-3 lg:mb-0'>
						<p className='text-gray-400 text-sm'>
							&copy; {new Date().getFullYear()}
							<a
								className='hover:underline hover:text-blue-600'
								href='https://www.twumasiaugustine.com'
								target='_blank'
								rel='noopener noreferrer'>
								{' '}
								dev_twumstine.{' '}
							</a>
							All rights reserved.
						</p>
					</div>
						<ul className='flex justify-center lg:justify-between items-center space-x-4'>
						{social.map((link) => (
							<li key={link.id} className='list-inline-item flex'>
								<a href={link.url} className='p-2 bg-white rounded-full'>
									<link.icon className='text-gray-800 h-4 w-4' />
								</a>
							</li>
						))}
					</ul>
				</div>
			</div>
		</footer>
	);
};

export default Footer;

