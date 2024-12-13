import '/src/styles/home.css';
import myImg from '../../assets/Twumasi Augustine.png';
import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
	const texts = useMemo(() => ['Frontend Dev', 'Backend Dev', 'Full-stack Dev'], []);
	const typingSpeed = 150; 
	const pauseBetweenTexts = 2000; 
	const [textIndex, setTextIndex] = useState(0);
	const [charIndex, setCharIndex] = useState(0);
	const [isDeleting, setIsDeleting] = useState(false);

	useEffect(() => {
		const type = () => {
			const currentText = texts[textIndex];

			if (isDeleting) {
				setCharIndex((prevIndex) => {
					if (prevIndex <= 0) {
						setIsDeleting(false);
						setTextIndex(
							(prevIndex) => (prevIndex + 1) % texts.length,
						);
						return 0;
					}
					return prevIndex - 1;
				});
			} else {
				setCharIndex((prevIndex) => {
					if (prevIndex >= currentText.length) {
						setIsDeleting(true);
						return currentText.length;
					}
					return prevIndex + 1;
				});
			}
		};

		const typingInterval = setInterval(type, typingSpeed);
		return () => clearInterval(typingInterval);
	}, [textIndex, isDeleting, texts]);

	useEffect(() => {
		const pauseTimeout = setTimeout(
			() => {
				if (isDeleting) {
					setCharIndex((prevIndex) => Math.max(0, prevIndex - 1));
				} else {
					setCharIndex((prevIndex) =>
						Math.min(texts[textIndex].length, prevIndex + 1),
					);
				}
			},
			isDeleting ? pauseBetweenTexts : 0,
		);

		return () => clearTimeout(pauseTimeout);
	}, [charIndex, isDeleting, textIndex, texts]);

	return (
		<section
			id='home'
			className='bg-white relative isolate border-none'>
			<div
				aria-hidden='true'
				className='absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-60'>
				<div
					style={{
						clipPath:
							'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
					}}
					className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
				/>
			</div>
			<div className='relative lg:h-[90vh] sm:h-100 md:h-100 top-10'>
				<svg
					className='wave absolute -bottom-40 lg:bottom-0 left-0 w-full h-[20rem]'
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 1440 320'>
					<path
						fillOpacity='1'
						d='M0,192L48,208C96,224,192,256,288,250.7C384,245,480,203,576,186.7C672,171,768,181,864,197.3C960,213,1056,235,1152,229.3C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'></path>
				</svg>
				<div
					id='home-container'
					className='w-full flex lg:flex-nowrap flex-wrap lg:justify-between items-center h-full justify-center sm:p-5 text-black lg:gap-20 lg:p-20 p-10 mb-20'>
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 1 }}
						className='flex justify-center items-center w-full lg:w-1/2'>
						<img
							onContextMenu={(e) => e.preventDefault()}
							className='rounded-full lg:w-[250px] lg:h-[250px] w-[150px] h-[150px] border-gray-800 border-[2px] md:border-[3px] lg:border-[5px] bg-blend-color-burn'
							src={myImg}
							loading='lazy'
							alt='Profile of Twumasi Augustine'
						/>
					</motion.div>
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 1, delay: 0.5 }}
						className='text-center w-full lg:w-1/2'>
						<div className='min-w-max p-2'>
							<span className='whitespace-nowrap  text-indigo-600 sm:text-md text-3xl lg:text-4xl font-bold p-4 font-mono'>
								{texts[textIndex].slice(0, charIndex)}
							</span>
						</div>
						<h1 className='text-xl lg:text-3xl p-1'>
							Twumasi Augustine
						</h1>
						<p className='text-md lg:text-lg p-3 text-slate-600'>
							I&apos;m a web developer based in Kumasi, Ghana.
							I&apos;m passionate about building websites and
							applications that are fast, responsive, and
							user-friendly.
						</p>
						<motion.div
							initial={{ opacity: 0, y: 50 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 1, delay: 1 }}
							className='p-2 my-2'>
							<a
								className='lg:py-2.5 lg:px-5 p-2 text-sm hover:cursor-pointer bg-indigo-600 rounded text-white z-50 shadow-md'
								href='#contact'>
								Contact Us
							</a>
						</motion.div>
					</motion.div>
				</div>
			</div>
			<div
				aria-hidden='true'
				className='absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]'>
				<div
					style={{
						clipPath:
							'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
					}}
					className='relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#464042] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]'
				/>
			</div>
		</section>
	);
};

export default HeroSection;
