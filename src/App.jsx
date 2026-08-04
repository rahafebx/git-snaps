import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from "./context/ThemeContext";
import { BlogProvider } from "./context/BlogContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { PostDetail } from "./pages/PostDetail";
import { LabDetails } from "./pages/LabDetails";
import { NotFound } from "./pages/NotFound";
import { About } from "./pages/About";
import { Labs } from "./pages/Labs";
import { Bookmarks } from "./pages/Bookmarks";
import useScrollToTop from "./hooks/useScrollToTop";

function ScrollToTop() {
  useScrollToTop();
  return null;
}

function PageTransition({ children }) {
  const location = useLocation();
  return (
    <div key={location.pathname} className="animate-fade-in">
      {children}
    </div>
  );
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
              <PageTransition>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/labs" element={<Labs />} />
                  <Route path="/bookmarks" element={<Bookmarks />} />
                  <Route path="/post/:slug" element={<PostDetail />} />
                  <Route path="/lab/:slug" element={<LabDetails />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </PageTransition>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </BlogProvider>
    </ThemeProvider>
  );
}

export default App;
