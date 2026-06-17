import React from 'react';
import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Footer from './components/footer';
import Navbar from './components/navbar';
// import Preloader from './components/preloader';
import About from './pages/about';
import Blogs from './pages/blogs';
import BlogsInfo from './pages/blogsInfo';
import Experience from './pages/experience';
import Home from './pages/home';
import Projects from './pages/projects';
import QRTool from './pages/qrTool';
import Skills from './pages/skills';
import Vishnu from './pages/vishnu';

const FULLSCREEN_ROUTES = ['/vishnu'];

function App() {
  const location = useLocation();
  const isFullscreen = FULLSCREEN_ROUTES.includes(location.pathname);

  useEffect(() => {
    function disablePreloader() {
      const loader = document.getElementsByClassName('preloader')[0];
      loader.style.display = 'none';
    }
    setTimeout(() => {
      disablePreloader();
    }, 3000);
  }, []);

  return (
    <>
      {/* <Preloader></Preloader> */}
      {!isFullscreen && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home></Home>
              <Experience></Experience>
              <Projects></Projects>
              <Blogs></Blogs>
              <Skills></Skills>
              <About></About>
              <Footer></Footer>
            </>
          }
        ></Route>
        <Route path="/blogs-info/:name" element={<BlogsInfo></BlogsInfo>}></Route>
        <Route path="/qr" element={<QRTool />}></Route>
        <Route path="/vishnu" element={<Vishnu />}></Route>
      </Routes>
    </>
  );
}

export default App;
