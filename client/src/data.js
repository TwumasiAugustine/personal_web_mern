// Navigation Data
export const navigation = [
	{ id: 1, name: 'Home', to: '/' },
	{ id: 2, name: 'About', href: '/#about' },
	{ id: 3, name: 'Services', href: '/#services' },
	{ id: 4, name: 'Skills', href: '/#skills' },
	{ id: 5, name: 'Contact', href: '/#contact' },
	{ id: 6, name: 'Project', to: '/project' },
	{ id: 7, name: 'Blog', to: '/blog' },
];

export const specNav = [
	{ id: 1, name: 'Dashboard', to: '/dashboard' },
	{ id: 2, name: 'Signup', to: '/blog/signup' },
    { id: 3, name: 'Login', to: '/blog/login' },
    { id: 4, name: 'Logout', to: '/blog/logout' },
]

import {  FaReact, FaNodeJs } from 'react-icons/fa';
import {
	SiFirebase,
	SiExpress,
	SiJavascript,
	SiPostgresql,
	SiMongodb,
	SiMysql
} from 'react-icons/si';

export const skills = [
	
	{
		name: 'JavaScript',
		description: 'Programming Language for Web Development',
		icon: SiJavascript,
	},
	{
		name: 'React',
		description: 'JavaScript Library for Building User Interfaces',
		icon: FaReact,
	},
	{
		name: 'MongoDB',
		description: 'NoSQL Database',
		icon: SiMongodb,
	},
	{
		name: 'PostgreSQL',
		description: 'Relational Database',
		icon: SiPostgresql,
	},
	{
		name: 'MySQL',
		description: 'Relational Database',
		icon: SiMysql,
	},
	{
		name: 'Node.js',
		description: 'JavaScript Runtime for Server-Side Development',
		icon: FaNodeJs,
	},
	{
		name: 'Express.js',
		description: 'Web Application Framework for Node.js',
		icon: SiExpress,
	},
	{
		name: 'Firebase',
		description: 'Platform for Building Mobile and Web Applications',
		icon: SiFirebase,
	}
];
// Social links data
import {
	FaTwitter,
	FaLinkedinIn,
	FaGithubAlt,
	// FaStackOverflow,
	// FaCodepen
} from 'react-icons/fa';
export const social = [
	{ id: 1, url: 'https://x.com/dev_twumstine/', icon: FaTwitter },
	{ id: 2, url: 'https://www.linkedin.com/in/augustine-twumasi-3a68ab230/', icon: FaLinkedinIn },
	{ id: 3, url: 'https://github.com/TwumasiAugustine', icon: FaGithubAlt },
];
// Services Data
import {
	CodeBracketIcon,
	// DevicePhoneMobileIcon,
	GlobeAltIcon,
} from '@heroicons/react/24/outline';

export const services = [
	{
		name: 'Web Development',
		description:
			'We create responsive and user-friendly websites tailored to your business needs.',
		icon: CodeBracketIcon,
	},
	// {
	// 	name: 'Mobile Application',
	// 	description:
	// 		'Our team develops mobile applications that run smoothly on both iOS and Android platforms.',
	// 	icon: DevicePhoneMobileIcon,
	// },
	{
		name: 'Web Application',
		description:
			'We build web applications with the latest technologies to ensure high performance and scalability.',
		icon: GlobeAltIcon,
	},
];
