import { useLocation, useNavigate, Link } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";
import { useAuth } from "../contexts/AuthContext";
import AccessibilityToolbar from "./AccessibilityToolbar";
import { useEffect } from "react";

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  const { user, logout, loginWithGoogle, loginWithToken } = useAuth();

  useEffect(() => {
    console.log("User in Header:", user);
    // If the header mounts and there's a token but no user, try restoring user from /auth/me
    (async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (token && !user && loginWithToken) {
          // Try direct fetch to /auth/me first to ensure network call appears and to debug
          try {
            // note: axios uses /api proxy; a raw fetch to /api/auth/me makes the request explicit
            const resp = await fetch('/api/auth/me', {
              headers: { Authorization: `Bearer ${token}` },
            });
            console.debug('Direct /api/auth/me response status:', resp.status);
            const json = await resp.json().catch(() => null);
            console.debug('Direct /api/auth/me body:', json);
            // If direct fetch succeeded, call loginWithToken to let AuthContext normalize and set user
            if (resp.ok && loginWithToken) {
              await loginWithToken(token);
            } else {
              // fallback to calling loginWithToken anyway to keep behavior consistent
              await loginWithToken(token);
            }
          } catch (innerErr) {
            console.debug('Direct fetch to /api/auth/me failed:', innerErr);
            await loginWithToken(token);
          }
        }
      } catch (e) {
        console.debug('Could not restore user from token in Header:', e);
      }
    })();
  }, [user]);

  const handleNavigation = (sectionId: string) => {
    if (location.pathname !== "/") {
      navigate("/");
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
                onClick={() => handleNavigation("hero")}
                className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
              >
                Início
              </button>
              <button
                onClick={() => handleNavigation("especialistas")}
                className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
              >
                Especialistas
              </button>
              <button
                onClick={() => handleNavigation("equipe")}
                className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
              >
                Equipe
              </button>
              {user?.role === "admin" && (
                <Link
                  to="/admin"
                  className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                >
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
                <ProfileDropdown user={user} onLogout={logout} />
              </div>
            ) : (
              <div className="flex space-x-3">
                <button
                  onClick={loginWithGoogle}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Entrar
                </button>
                {/* <Link
                  to="/login?role=admin"
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                >
                  Entrar como Admin
                </Link> */}
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
