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
  const isImmersive =
    pathname.startsWith('/cinamatic') ||
    pathname.startsWith('/cinematic') ||
    pathname.startsWith('/coming-soon') ||
    pathname.startsWith('/comming-soon') ||
    pathname.startsWith('/new');
  const hideChrome = isImmersive;
  useLenisScroll(!isImmersive);
  return (
    <>
      <ScrollToTop />
      {!hideChrome && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/realisations" element={<Realisations />} />
        <Route path="/equipe-metal360" element={<Equipe />} />
        <Route path="/expertise" element={<Home />} />
        <Route path="/cinamatic" element={<Navigate to="/cinematic" replace />} />
        <Route path="/cinematic" element={<Cinematic />} />
        <Route path="/comming-soon" element={<Navigate to="/coming-soon" replace />} />
        <Route path="/coming-soon" element={<ComingSoon />} />
        <Route path="/new" element={<New />} />
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
