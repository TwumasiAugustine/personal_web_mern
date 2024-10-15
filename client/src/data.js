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
// Projects Data
export const projects = [
	{
		id: 1,
		title: 'Portfolio Website',
		description: 'Description for project one.',
		techStack: ['React', 'Node.js', 'MySQL'],
		imageUrl: '/src/assets/Capture.PNG',
		category: 'Web Development',
		url: 'https://www.twumasiaugustine.com',
		github: 'https://www.github.com/twumasiaugustine',
		date: '2024-01-15',
	},
	{
		id: 2,
		title: 'Portfolio Website',
		description: 'Description for project one.',
		techStack: ['React', 'Node.js', 'MySQL'],
		imageUrl: '/src/assets/Capture.PNG',
		category: 'Web Development',
		url: 'https://www.twumasiaugustine.com',
		github: 'https://www.github.com/twumasiaugustine',
		date: '2024-11-15',
	},
	{
		id: 3,
		title: 'Portfolio Website',
		description: 'Description for project one.',
		techStack: ['React', 'Node.js', 'MySQL'],
		imageUrl: '/src/assets/Capture.PNG',
		category: 'Web Development',
		url: 'https://www.twumasiaugustine.com',
		github: 'https://www.github.com/twumasiaugustine',
		date: '2023-12-15',
	},
	{
		id: 4,
		title: 'Portfolio Website',
		description: 'Description for project one.',
		techStack: ['React', 'Node.js', 'MySQL'],
		imageUrl: '/src/assets/Capture.PNG',
		category: 'Web Development',
		url: 'https://www.twumasiaugustine.com',
		github: 'https://www.github.com/twumasiaugustine',
		date: '2024-05-15',
	},
];

export const categories = ['Web Development', 'Mobile Apps', 'Web Apps'];
// Skills Data
import { FaHtml5, FaCss3Alt, FaReact, FaNodeJs } from 'react-icons/fa';
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
		name: 'HTML',
		description: 'HyperText Markup Language',
		icon: FaHtml5,
	},
	{
		name: 'CSS',
		description: 'Cascading Style Sheets for Styling Websites',
		icon: FaCss3Alt,
	},
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
	},
	{
		name: 'React Native',
		description: 'For  Building  Cross Platform Mobile Applications',
		icon: FaReact,
	},
];
// Social links data
import {
	FaTwitter,
	FaLinkedinIn,
	FaGithubAlt,
	FaStackOverflow,
	FaCodepen
} from 'react-icons/fa';
export const social = [
	{ id: 1, url: 'https://twitter.com', icon: FaTwitter },
	{ id: 2, url: 'https://linkedin.com', icon: FaLinkedinIn },
	{ id: 3, url: 'https://github.com', icon: FaGithubAlt },
	{ id: 4, url: 'https://stackoverflow.com', icon: FaStackOverflow },
	{ id: 5, url: 'https://codepen.io', icon: FaCodepen },
];
// Services Data
import {
	CodeBracketIcon,
	DevicePhoneMobileIcon,
	GlobeAltIcon,
} from '@heroicons/react/24/outline';

export const services = [
	{
		name: 'Web Development',
		description:
			'We create responsive and user-friendly websites tailored to your business needs.',
		icon: CodeBracketIcon,
	},
	{
		name: 'Mobile Application',
		description:
			'Our team develops mobile applications that run smoothly on both iOS and Android platforms.',
		icon: DevicePhoneMobileIcon,
	},
	{
		name: 'Web Application',
		description:
			'We build web applications with the latest technologies to ensure high performance and scalability.',
		icon: GlobeAltIcon,
	},
];
// Blog Post Data
// Blog Post Data
export const blogPosts = [
    {
        id: 1,
        title: 'Top 3 JavaScript Frameworks',
        date: 'Published 2 days ago',
        time: '5 min read',
        likes: 125,
        comments: [
            { id: 1, author: 'John Doe', content: 'Great insights on these frameworks!' },
            { id: 2, author: 'Jane Smith', content: 'I prefer Vue over React, but Angular is also powerful.' },
            { id: 3, author: 'Alex Johnson', content: 'Thanks for the breakdown, very helpful!' },
            { id: 4, author: 'Sam Green', content: 'Would love to see more on Svelte!' },
            { id: 5, author: 'Chris Lee', content: 'React is still my favorite, thanks for sharing!' },
            { id: 6, author: 'Patricia Brown', content: 'Angular’s learning curve is steep, but worth it.' },
            { id: 7, author: 'Michael King', content: 'Vue’s simplicity makes it a great choice for beginners.' },
            { id: 8, author: 'Linda White', content: 'Awesome article, very informative.' },
        ],
        intro: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa...',
        image: '/src/assets/Capture.PNG',
        link: 'blog-post.html',
    },
    {
        id: 2,
        title: 'About Remote Working',
        date: 'Published 3 months ago',
        time: '3 min read',
        likes: 200,
        comments: [
            { id: 1, author: 'Emily Clark', content: 'Remote working has been a game changer for me!' },
            { id: 2, author: 'Peter Parker', content: 'Managing work-life balance can be tricky.' },
            { id: 3, author: 'Bruce Wayne', content: 'I miss the social interactions of an office environment.' },
            { id: 4, author: 'Diana Prince', content: 'Flexibility is the biggest advantage of remote work.' },
            { id: 5, author: 'Clark Kent', content: 'Communication tools have made remote working easier.' },
            { id: 6, author: 'Tony Stark', content: 'I find myself more productive when working remotely.' },
            { id: 7, author: 'Natasha Romanoff', content: 'Remote work allows me to travel and work at the same time.' },
            { id: 8, author: 'Steve Rogers', content: 'Staying disciplined is key to success in remote working.' },
            { id: 9, author: 'Wanda Maximoff', content: 'It’s challenging to separate work from personal time.' },
            { id: 10, author: 'Vision', content: 'Technology plays a crucial role in making remote work feasible.' },
        ],
        intro: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa...',
        image: '/src/assets/Capture.PNG',
        link: 'blog-post.html',
    },
    {
        id: 3,
        title: 'A Guide to Becoming a Full-Stack Developer',
        date: 'Published 2 months ago',
        time: '15 min read',
        likes: 350,
        comments: [
            { id: 1, author: 'Elon Musk', content: 'Great guide for aspiring developers!' },
            { id: 2, author: 'Bill Gates', content: 'Full-stack development is the future.' },
            { id: 3, author: 'Jeff Bezos', content: 'Very thorough and informative.' },
            { id: 4, author: 'Mark Zuckerberg', content: 'The skills outlined here are spot on.' },
            { id: 5, author: 'Larry Page', content: 'I appreciate the detailed explanation of each technology.' },
            { id: 6, author: 'Sergey Brin', content: 'Full-stack developers are in high demand!' },
            { id: 7, author: 'Tim Cook', content: 'I enjoyed reading this guide, very well written.' },
            { id: 8, author: 'Satya Nadella', content: 'The combination of front-end and back-end skills is powerful.' },
            { id: 9, author: 'Sundar Pichai', content: 'This guide covers all the essentials.' },
            { id: 10, author: 'Jack Dorsey', content: 'Great resource for anyone looking to get into full-stack development.' },
            { id: 11, author: 'Susan Wojcicki', content: 'The roadmap provided is very clear and actionable.' },
            { id: 12, author: 'Marissa Mayer', content: 'This article is a must-read for new developers.' },
            { id: 13, author: 'Reed Hastings', content: 'The advice here is practical and easy to follow.' },
            { id: 14, author: 'Sheryl Sandberg', content: 'Thank you for this comprehensive guide!' },
            { id: 15, author: 'Meg Whitman', content: 'The best article I’ve read on full-stack development.' },
        ],
        intro: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa...',
        image: '/src/assets/Capture.PNG',
        link: 'blog-post.html',
    },
];
