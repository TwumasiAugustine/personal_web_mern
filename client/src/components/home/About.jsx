/* eslint-disable react/no-unescaped-entities */
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
					I'm a full-stack web developer passionate about creating dynamic, responsive, and accessible web applications that empower individuals and businesses. With over three years of experience, I've honed my skills across the entire development stack.
				</motion.p>
				<motion.p
					className='text-md lg:text-justify lg:px-20 mb-4 sm:mb-6 md:mb-8 lg:mb-8'
					variants={itemVariants}>
					I specialize in building smooth user experiences with <strong>React.js</strong> while crafting robust back-end systems using <strong>Node.js</strong>,<strong> Express.js</strong>, and <strong>MongoDB</strong>. Designing modern, intuitive interfaces is something I truly enjoy, and I often turn to frameworks like <strong>Bootstrap</strong> and <strong>Tailwind CSS </strong> to achieve that. Throughout all my projects, I prioritize scalability and performance, ensuring that every layer of the application is well thought out.
				</motion.p>
				<motion.p
					className='text-md lg:text-justify lg:px-20 mb-4 sm:mb-6 md:mb-8 lg:mb-8'
					variants={itemVariants}>
					Lately, I've been diving into some exciting new technologies, including <strong>React Native</strong>,<strong> Firebase</strong>
					,<strong> TypeScript</strong>, <strong>Next.js</strong>, <strong>PostgreSQL</strong>, and <strong>SQL</strong>. I'm fully committed to continuous learning and growth, always eager to explore state-of-the-art tools and techniques. Each project is a chance for me to innovate and push my skills further.
				</motion.p>
			</motion.div>
		</section>
	);
};

export default About;
