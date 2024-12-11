import HeroSection from '../components/home/HeroSection';
import About from '../components/home/About';
import Service from '../components/home/Service';
import Skill from '../components/home/Skill';
import Contact from '../components/home/Contact'
import Footer from '../components/home/Footer';
import SEO from './SEO.jsx'
const Home = () => {
	return (
		<div className='container-fluid'>
			<SEO title="Home"
				description="This is the official website of Twumasi Augustine"
				keywords="Augustine, Twumasi, Software Engineer, Web Developer, Full Stack Developer, Augustine Twumasi"
				type="website"
			/>
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
