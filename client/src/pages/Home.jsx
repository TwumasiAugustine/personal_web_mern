import React from 'react';
import HeroSection from '../components/home/HeroSection';
import About from '../components/home/About';
import Service from '../components/home/Service';
import Skill from '../components/home/Skill';
import Contact from '../components/home/Contact'
import Footer from '../components/home/Footer';
const Home = () => {
	return (
		<div className='container-fluid'>
			<HeroSection />
			<About/>
			<Service />
			<Skill />
			<Contact />
			<Footer/>
		</div>
	);
};

export default Home;
