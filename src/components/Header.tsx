import { Link, useLocation } from 'react-router-dom';
import ProfileDropdown from './ProfileDropdown';
import { User } from '../contexts/AuthContext';

type HeaderProps = {
  user: User;
  onLogout: () => void;
  hideOnAuthPages?: boolean;
};

function Header({ user, onLogout }: HeaderProps) {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          {!isAuthPage && (
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                Início
              </Link>
              <Link to="/#especialistas" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                Especialistas
              </Link>
              <Link to="/#sobre" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                Sobre
              </Link>
              {user?.role === 'admin' && (
                <Link to="/admin" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                  Admin
                </Link>
              )}
            </div>
          )}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
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
