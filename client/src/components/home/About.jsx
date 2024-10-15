import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {
	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});

	const containerVariants = {
		hidden: { opacity: 0, y: 50 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.5,
				staggerChildren: 0.3,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 },
	};

	return (
		<section
			id='about'
			className='bg-white pt-10 sm:py-12'>
			<motion.div
				ref={ref}
				className='container mx-auto px-4 sm:px-6 lg:px-8'
				variants={containerVariants}
				initial='hidden'
				animate={inView ? 'visible' : 'hidden'}>
				<motion.h2
					className='text-indigo-600 text-2xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-center lg:text-6xl py-5'
					variants={itemVariants}>
					About
				</motion.h2>
				<motion.p
					className='text-md lg:text-justify lg:px-20 mb-4 sm:mb-6 md:mb-8 lg:mb-8'
					variants={itemVariants}>
					I’m a software entrepreneur with over 8 years of experience
					building startups and software consulting for startups and
					businesses. nm
				</motion.p>
				<motion.p
					className='text-md lg:text-justify lg:px-20 mb-4 sm:mb-6 md:mb-8 lg:mb-8'
					variants={itemVariants}>
					In 2011, after graduating from MEST, I co-founded Saya
					Mobile. Saya brought rich mobile messaging to millions of
					mass-market devices in emerging markets and was a TechCrunch
					Disrupt Finalist in San Francisco in 2012. In 2014, Saya was
					acquired by Kirusa, a US-based company.
				</motion.p>
				<motion.p
					className='text-md lg:text-justify lg:px-20'
					variants={itemVariants}>
					Since then, I have consulted, architect, developed and
					deployed systems for both startups and multinationals. Over
					the years, I have worked on projects ranging from mobile
					messaging, social networking, social media, health
					information and conversational AI systems.
				</motion.p>
			</motion.div>
		</section>
	);
};

export default About;
