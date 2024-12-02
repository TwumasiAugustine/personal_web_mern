import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { UserContextProvider } from './context/UserContext';
import Home from './pages/Home';
import Project from './pages/Project';
import ProjectDetail from './components/home/project/ProjectDetail';
import Blog from './pages/Blog';
import PrivateRoute from './pages/PrivateRoute';
import NoPage from './pages/NoPage';
import PostDetail from './components/home/blog/PostDetail';
import Login from './components/home/blog/Login';
import Register from './components/home/blog/Register';
import Dashboard from './pages/Dashboard';
import NavBar from './components/home/NavBar';

const App = () => {
  const helmetContext = {};

  return (
    <UserContextProvider>
      <HelmetProvider context={helmetContext}>
        <Router>
          <NavBarWrapper />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" index element={<Home />} />
              <Route path="project" element={<Project />} />
              <Route path='project/:id' element={<ProjectDetail/>} />
              <Route path="blog" element={<Blog />} />
              <Route path="blog/:id" element={<PostDetail />} />
              <Route path="blog/login" element={<Login />} />
              <Route path="blog/signup" element={<Register />} />
              <Route path="/dashboard" element={
                <PrivateRoute
                  element={Dashboard}
                  roles = {['admin']}
              />} />
              <Route path="*" element={<NoPage />} />
            </Routes>
          </AnimatePresence>
        </Router>
      </HelmetProvider>
    </UserContextProvider>
  );
};

// Conditionally render NavBar based on route
const NavBarWrapper = () => {
  const location = useLocation();
  const noNavBarPaths = ['/dashboard'];

  return !noNavBarPaths.includes(location.pathname) ? <NavBar /> : null;
};

export default App;
