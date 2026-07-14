import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { BlogProvider } from './context/BlogContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { PostDetail } from './pages/PostDetail';
import { LabDetails } from './pages/LabDetails';
import { About } from './pages/About';
import useScrollToTop from './hooks/useScrollToTop';

function ScrollToTop() {
  useScrollToTop();
  return null;
}

function App() {
  return (
    <ThemeProvider>
      <BlogProvider>
        <BrowserRouter>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 transition-colors duration-200">
            <Navbar />
            <main className="grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/post/:slug" element={<PostDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="/lab/:slug" element={<LabDetails />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </BlogProvider>
    </ThemeProvider>
  );
}

export default App;