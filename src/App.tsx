import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import Hero from './components/Hero';
import HealthTips from './components/HealthTips';
import AwarenessCampaigns from './components/AwarenessCampaigns';
import Specialists from './components/Specialists';
import TeamSection from './components/TeamSection';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import Login from './pages/Login';
import Equipe from './pages/About';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { useEffect } from 'react';

const MainApp = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  useEffect(() => {
    document.documentElement.lang = 'pt-BR';
    document.title = 'HOMIN+ | Sua saúde em primeiro lugar';
    const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    if (link) {
      link.href = '/favicon.ico';
    }
    
    if (!document.getElementById('sr-only-style')) {
      const style = document.createElement('style');
      style.id = 'sr-only-style';
      style.textContent = `
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }
        
        .focus-visible:focus-visible {
          outline: 3px solid #3b82f6;
          outline-offset: 2px;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-400 via-blue-500 to-blue-600">
      <a 
        href="#main-content" 
        className="skip-to-content focus:opacity-100 focus:left-1/2 focus:transform focus:-translate-x-1/2"
      >
        Pular para o conteúdo principal
      </a>
      
      {!isAuthPage && user && <Header user={user} onLogout={logout} />}
      <main id="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/login" element={
            user ? <Navigate to="/" replace /> : <Login />
          } />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={
              <>
                <Hero />
                <div id="sobre">
                  <HealthTips />
                </div>
                <AwarenessCampaigns />
                <Specialists />
                <TeamSection />
              </>
            } />
            
            <Route path="/equipe" element={<Equipe />} />
            
            <Route path="/admin" element={
              user?.role === 'admin' ? 
                <AdminDashboard /> : 
                <Navigate to="/" replace />
            } />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {!location.pathname.startsWith('/admin') && <Footer />}
      {user && !location.pathname.startsWith('/admin') && <ChatBot />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </Router>
  );
}

export default App;
