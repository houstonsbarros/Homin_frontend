import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import Hero from './components/Hero';
import HealthTips from './components/HealthTips';
import AwarenessCampaigns from './components/AwarenessCampaigns';
import Specialists from './components/Specialists';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import Login from './pages/Login';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

const MainApp = () => {
  const { user, logout } = useAuth();
  useLocation(); // Apenas para garantir que o componente seja re-renderizado na navegação

  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-400 via-blue-500 to-blue-600">
      {!isAuthPage && user && <Header user={user} onLogout={logout} />}
      <main>
        <Routes>
          <Route path="/login" element={
            user ? <Navigate to="/" replace /> : <Login />
          } />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={
              <>
                <Hero />
                <HealthTips />
                <AwarenessCampaigns />
                <Specialists />
              </>
            } />
            
            {/* Admin-only route */}
            <Route path="/admin" element={
              user?.role === 'admin' ? 
                <AdminDashboard /> : 
                <Navigate to="/" replace />
            } />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      {user && <ChatBot />}
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
