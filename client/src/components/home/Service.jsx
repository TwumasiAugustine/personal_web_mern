/* eslint-disable react-hooks/rules-of-hooks */
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {services} from '/src/data'

const Service = () => {
	return (
		<div id='services' className='bg-white pb-10 sm:py-12'>
			<div className='mx-auto max-w-7xl px-6 lg:px-8'>
				<div className='mx-auto  lg:text-center'>
					<h2 className='text-indigo-600 text-2xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl py-3'>
						Services
					</h2>
					<p className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
						Comprehensive Solutions for Your Needs
					</p>
					<p className='mt-6 text-lg leading-8 text-gray-600'>
						We offer a
						wide range of services to help your business thrive.
					</p>
				</div>
				<div className='mx-auto mt-10  sm:mt-20 lg:mt-14 lg:max-w-4xl'>
					<div className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3 w-full'>
						{services.map((service) => {
							const [ref, inView] = useInView({
								triggerOnce: true,
								threshold: 0.5,
							});

							return (
								<motion.div
									ref={ref}
									initial={{ opacity: 0, y: 50 }}
									animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
									transition={{ duration: 0.5 }}
									key={service.name}
									className='relative p-6 border border-gray-200 rounded-md shadow-md lg:min-w-[300px]'>
									<dt className='text-base font-semibold leading-7 text-gray-900'>
										<div className='absolute left-6 top-6 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600'>
											<service.icon
												aria-hidden='true'
												className='h-6 w-6 text-white'
											/>
										</div>
										<div className='ml-16'>{service.name}</div>
									</dt>
									<dd className='mt-2 text-base leading-7 text-slate-600 ml-16'>
										{service.description}
									</dd>
								</motion.div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Service;
