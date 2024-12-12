import { skills } from '/src/data.js';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Skill = () => {
	return (
		<div id='skills' className='bg-gray-900 text-white pb-12 sm:py-12 px-6 lg:px-8'>
			<div className='mx-auto max-w-7xl'>
				<div className='mx-auto max-w-2xl lg:text-center'>
					<h2 className='text-indigo-800 text-2xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl py-3'>
						Skills
					</h2>
					<p className='mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl'>
						Technical Proficiencies
					</p>
					<p className='mt-6 text-lg leading-8 text-gray-300'>
						Here are some of the technologies and tools I am
						proficient with.
					</p>
				</div>
				<div className='mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-full'>
					<div className='grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3'>
						{skills.map((skill) => {
							const [ref, inView] = useInView({
								triggerOnce: true,
								threshold: 0.3,
							});

							return (
								<motion.div
									ref={ref}
									initial={{ opacity: 0, y: 50 }}
									animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
									transition={{ duration: 0.5 }}
									key={skill.name}
									className='flex items-start'>
									<div className='flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-indigo-600'>
										<skill.icon
											aria-hidden='true'
											className='h-8 w-8 text-white'
										/>
									</div>
									<div className='ml-4'>
										<h3 className='text-xl font-semibold text-white'>
											{skill.name}
										</h3>
										<p className='mt-2 text-base leading-7 text-gray-300'>
											{skill.description}
										</p>
									</div>
								</motion.div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Skill;
  