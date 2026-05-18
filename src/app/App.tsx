import { Navigate, Route, Routes } from 'react-router-dom';
import { GoogleAnalytics } from './components/GoogleAnalytics';
import {
  LEGACY_ROUTE_REDIRECTS,
  ServiceDetailLegacyRedirect,
} from './routes/legacyRedirects';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { AIChatbot } from './components/AIChatbot';
import { AboutPage } from './pages/AboutPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { ContactPage } from './pages/ContactPage';
import { GetStartedPage } from './pages/GetStartedPage';
import { HomePage } from './pages/HomePage';
import { PortfolioPage } from './pages/PortfolioPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { ServicesPage } from './pages/ServicesPage';
import { SolutionsPage } from './pages/SolutionsPage';

function AdminHomeRedirect() {
  const k = sessionStorage.getItem('vercom_admin_key');
  return <Navigate to={k ? '/admin/dashboard' : '/admin/login'} replace />;
}

function PublicSite() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/solutions" element={<SolutionsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:slug" element={<ServiceDetailPage />} />
        <Route path="/ServiceDetail" element={<ServiceDetailLegacyRedirect />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/industries" element={<SolutionsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/get-started" element={<GetStartedPage />} />
        {LEGACY_ROUTE_REDIRECTS.map(({ path, to }) => (
          <Route key={path} path={path} element={<Navigate to={to} replace />} />
        ))}
        <Route path="*" element={<HomePage />} />
      </Routes>
      <Footer />
      <FloatingWhatsApp />
      <AIChatbot />
    </>
  );
}

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <GoogleAnalytics />
      <Routes>
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin" element={<AdminHomeRedirect />} />
        <Route path="*" element={<PublicSite />} />
      </Routes>
    </div>
  );
}
