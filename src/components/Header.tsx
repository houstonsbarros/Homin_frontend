import { useLocation, useNavigate, Link } from 'react-router-dom';
import ProfileDropdown from './ProfileDropdown';
import { User } from '../contexts/AuthContext';
import AccessibilityToolbar from './AccessibilityToolbar';

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

type HeaderProps = {
  user: User;
  onLogout: () => void;
  hideOnAuthPages?: boolean;
};

function Header({ user, onLogout }: HeaderProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  const handleNavigation = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 100);
    } else {
      scrollToSection(sectionId);
    }
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          {!isAuthPage && (
            <div className="flex items-center space-x-8">
              <button 
                onClick={() => handleNavigation('hero')}
                className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
              >
                Início
              </button>
              <button 
                onClick={() => handleNavigation('especialistas')}
                className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
              >
                Especialistas
              </button>
              <button 
                onClick={() => handleNavigation('equipe')}
                className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
              >
                Equipe
              </button>
              {user?.role === 'admin' && (
                <Link to="/admin" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                  Admin
                </Link>
              )}
            </div>
          )}
          <div className="flex items-center space-x-6">
            {user ? (
              <div className="flex items-center">
                <img 
                  src="/src/assets/images/logo.png" 
                  alt="HOMIN+ Logo" 
                  className="h-8 md:h-10 w-auto"
                />
                <div className="hidden md:block">
                  <AccessibilityToolbar />
                </div>
                <ProfileDropdown user={user} onLogout={onLogout} />
              </div>
            ) : (
              <div className="flex space-x-3">
                <Link
                  to="/login?role=user"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Entrar como Usuário
                </Link>
                <Link
                  to="/login?role=admin"
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                >
                  Entrar como Admin
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
