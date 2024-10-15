import LayOut from './pages/LayOut';
import Home from './pages/Home';
import Project from './pages/Project';
import Blog from './pages/Blog';
import Login from '/src/components/home/blog/Login';
import Register from '/src/components/home/blog/Register';
import BlogDetail from '/src/components/home/blog/BlogDetail';
import NavBar from '/src/components/home/blog/NavBar';
import CreatePost from './components/home/blog/CreatePost';
import NoPage from './pages/NoPage';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { UserContextProvider } from './UserContext';
const App = () => {
	const helmetContext = {};

	return (
		<UserContextProvider>
			<HelmetProvider context={helmetContext}>
				<Router>
					<AnimatePresence mode='wait'>
						<Routes>
							<Route
								path='/'
								element={<LayOut />}>
								<Route
									index
									element={<Home />}
								/>
								<Route
									path='project'
									element={<Project />}
								/>
							</Route>
							<Route
								path='/blog'
								element={<NavBar />}>
								<Route
									index
									element={<Blog />}
								/>
								<Route
									path='detail'
									element={<BlogDetail />}
								/>
								<Route path='create'
									element={<CreatePost/>}
								/>
								<Route
									path='login'
									element={<Login />}
								/>
								<Route
									path='register'
									element={<Register />}
								/>
							</Route>
							<Route
								path='*'
								element={<NoPage />}
							/>
						</Routes>
					</AnimatePresence>
				</Router>
			</HelmetProvider>
		</UserContextProvider>
	);
};

export default App;
