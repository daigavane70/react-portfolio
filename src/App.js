import { useEffect } from 'react';
import './App.css';
import Footer from './components/footer';
import Navbar from './components/navbar';
import Preloader from './components/preloader';
import About from './pages/about';
import Experience from './pages/experience';
import Home from './pages/home';
import Projects from './pages/projects';
import Resume from './pages/resume';
import Skills from './pages/skills';

function App() {
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
    <div className="">
      <Preloader></Preloader>
      <Navbar />
      <Home></Home>
      <Experience></Experience>
      <Projects></Projects>
      <Skills></Skills>
      <About></About>
      <Resume></Resume>
      <Footer></Footer>
    </div>
  );
}

export default App;
