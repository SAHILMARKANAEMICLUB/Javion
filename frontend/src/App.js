import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loader from './components/Loader';
import Home from './pages/Home';
import Realisations from './pages/Realisations';
import Equipe from './pages/Equipe';
import Cinematic from './pages/Cinematic';
import ComingSoon from './pages/ComingSoon';
import New from './pages/New';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Contact from './pages/Contact';
import About from './pages/About';
import Industries from './pages/Industries';
import NotFound from './pages/NotFound';
import useLenisScroll from './hooks/useLenisScroll';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function Shell() {
  const { pathname } = useLocation();
  const showLegacyChrome =
    pathname.startsWith('/old') ||
    pathname.startsWith('/realisations') ||
    pathname.startsWith('/equipe') ||
    pathname.startsWith('/expertise');
  const hideChrome = !showLegacyChrome;
  useLenisScroll(showLegacyChrome);
  return (
    <>
      <ScrollToTop />
      {!hideChrome && <Navbar />}
      <Routes>
        <Route path="/" element={<ComingSoon />} />
        <Route path="/old" element={<Home />} />
        <Route path="/realisations" element={<Realisations />} />
        <Route path="/equipe-metal360" element={<Equipe />} />
        <Route path="/expertise" element={<Home />} />
        <Route path="/cinamatic" element={<Navigate to="/cinematic" replace />} />
        <Route path="/cinematic" element={<Cinematic />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/comming-soon" element={<Navigate to="/" replace />} />
        <Route path="/coming-soon" element={<Navigate to="/" replace />} />
        <Route path="/new" element={<New />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!hideChrome && <Footer />}
    </>
  );
}

function App() {
  const [ready, setReady] = useState(() =>
    typeof window !== 'undefined' && Boolean(window.__javionReady)
  );

  return (
    <div className="App">
      {!ready && <Loader onFinish={() => setReady(true)} />}
      <BrowserRouter>
        <Shell />
      </BrowserRouter>
    </div>
  );
}

export default App;
