import './App.css';
import Footer from './components/footer';
import Navbar from './components/navbar';
import About from './pages/about';
import Experience from './pages/experience';
import Home from './pages/home';
import Projects from './pages/projects';
import Skills from './pages/skills';

function App() {
  return (
    <div className="">
      <Navbar />
      <Home></Home>
      <Experience></Experience>
      <Projects></Projects>
      <Skills></Skills>
      <About></About>
      <Footer></Footer>
    </div>
  );
}

export default App;
