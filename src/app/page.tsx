import BlogsAndPublications from '@/components/BlogsAndPublications';
import About from '@/components/About';
import Header from '@/components/Header';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between'>
      <Header />
      <Experience />
      <Projects />
      <BlogsAndPublications />
      <Skills />
      <About />
    </main>
  );
}
