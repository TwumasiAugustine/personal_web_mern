import LayOut from './pages/LayOut';
import Home from './pages/Home';
import Project from './pages/Project';
import Blog from './pages/Blog';
import Login from './components/home/blog/Login';
import Register from './components/home/blog/Register';
import NavBar from './components/home/blog/NavBar';
import Dashboard from './components/home/blog/Dashboard';
import CreatePost from './components/home/blog/CreatePost';
import PostDetail from './components/home/blog/PostDetail';
import NoPage from './pages/NoPage';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { UserContextProvider } from './context/UserContext';
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
									path=':id'
									element={<PostDetail />}
								/>
								<Route path='create'
									element={<CreatePost/>}
								/>
								<Route
									path='login'
									element={<Login />}
								/>
								<Route
									path='signup'
									element={<Register />}
								/>
								<Route
									path='dashboard'
									element={<Dashboard />}
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
