import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import MainLayout from "./Layout/MainLayout";
import HomePage from "./Pages/HomePage";
import { ThemeProvider } from "./context/ThemeContext";
import { BlogProvider } from "./context/BlogContext";
import { LoadingProvider } from "./context/LoadingContext";
import { SupabaseProvider } from "./context/SupabaseContext";
import LoadingOverlay from "./Componets/LoadingOverlay";
import AboutPage from "./Pages/AboutPage";
import MembershipPage from "./Pages/MembershipPage";
import ExecutivesPage from "./Pages/ExecutivesPage";
import SectorsPage from "./Pages/SectorsPage";
import MediaHubPage from "./Pages/MediaHubPage";
import BlogPage from "./Pages/BlogPage";
import BlogPostPage from "./Pages/BlogPostPage";
import ApplicationPage from "./Pages/ApplicationPage";
import SuccessPage from "./Pages/SuccessPage";
import AdminDashboard from "./Pages/AdminDashboard";

// Page transition animation
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut'
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: 'easeIn'
    }
  }
};

// Animated page wrapper
const AnimatedPage = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      {children}
    </motion.div>
  );
};

// Component to handle route changes with loading
const RouteHandler = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Admin Dashboard - separate layout */}
        <Route path="/admin" element={
          <AnimatedPage>
            <AdminDashboard />
          </AnimatedPage>
        } />
        
        {/* All other routes inside MainLayout */}
        <Route path="/" element={<MainLayout />}>
          {/* Index route renders at the "/" path */}
          <Route index element={
            <AnimatedPage>
              <HomePage />
            </AnimatedPage>
          } />
          
          {/* Main site pages */}
          <Route path="about" element={
            <AnimatedPage>
              <AboutPage />
            </AnimatedPage>
          } />
          <Route path="membership" element={
            <AnimatedPage>
              <MembershipPage />
            </AnimatedPage>
          } />
          <Route path="executives" element={
            <AnimatedPage>
              <ExecutivesPage />
            </AnimatedPage>
          } />
          <Route path="sectors" element={
            <AnimatedPage>
              <SectorsPage />
            </AnimatedPage>
          } />
          <Route path="media" element={
            <AnimatedPage>
              <MediaHubPage />
            </AnimatedPage>
          } />
          <Route path="blog" element={
            <AnimatedPage>
              <BlogPage />
            </AnimatedPage>
          } />
          <Route path="/blog/:id" element={
            <AnimatedPage>
              <BlogPostPage />
            </AnimatedPage>
          } />
          <Route path="apply" element={
            <AnimatedPage>
              <ApplicationPage />
            </AnimatedPage>
          } />
          
          {/* Success page */}
          <Route path="success" element={
            <AnimatedPage>
              <SuccessPage />
            </AnimatedPage>
          } />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <ThemeProvider>
      <SupabaseProvider>
        <BlogProvider>
          <LoadingProvider>
            <BrowserRouter>
              <LoadingOverlay />
              <RouteHandler />
            </BrowserRouter>
          </LoadingProvider>
        </BlogProvider>
      </SupabaseProvider>
    </ThemeProvider>
  );
}

export default App;
