import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loader from './components/Loader';
import Home from './pages/Home';
import Realisations from './pages/Realisations';
import Equipe from './pages/Equipe';
import useLenisScroll from './hooks/useLenisScroll';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function Shell() {
  useLenisScroll();
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/realisations" element={<Realisations />} />
        <Route path="/equipe-metal360" element={<Equipe />} />
        <Route path="/expertise" element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="App">
      {!loaded && <Loader onFinish={() => setLoaded(true)} />}
      <BrowserRouter>
        <Shell />
      </BrowserRouter>
    </div>
  );
}

export default App;
