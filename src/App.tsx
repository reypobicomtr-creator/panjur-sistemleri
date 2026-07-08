import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Calculator from './components/Calculator';
import Gallery from './components/Gallery';
import About from './components/About';
import ServiceAreas from './components/ServiceAreas';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Privacy from './components/Privacy';
import Terms from './components/Terms';
import WhatsAppButton from './components/WhatsAppButton';
import AdminLayout from './pages/admin/AdminLayout';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import Settings from './pages/admin/Settings';
import Pricing from './pages/admin/Pricing';
import GalleryManager from './pages/admin/GalleryManager';
import ReviewsManager from './pages/admin/ReviewsManager';
import Messages from './pages/admin/Messages';

type LegalModal = 'privacy' | 'terms' | null;

function PublicLayout() {
  const [legalModal, setLegalModal] = useState<LegalModal>(null);

  return (
    <main className="min-h-screen bg-white font-sans text-gray-900 antialiased">
      <Header />
      <Hero />
      <Services />
      <Calculator />
      <Gallery />
      <About />
      <ServiceAreas />
      <Testimonials />
      <CTA />
      <Contact />
      <Footer onPrivacyClick={() => setLegalModal('privacy')} onTermsClick={() => setLegalModal('terms')} />

      {legalModal === 'privacy' && <Privacy onClose={() => setLegalModal(null)} />}
      {legalModal === 'terms' && <Terms onClose={() => setLegalModal(null)} />}

      <WhatsAppButton />
    </main>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<PublicLayout />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="ayarlar" element={<Settings />} />
            <Route path="fiyatlar" element={<Pricing />} />
            <Route path="galeri" element={<GalleryManager />} />
            <Route path="yorumlar" element={<ReviewsManager />} />
            <Route path="mesajlar" element={<Messages />} />
          </Route>
          <Route path="*" element={<PublicLayout />} />
        </Routes>
      </AuthProvider>
    </HashRouter>
  );
}
