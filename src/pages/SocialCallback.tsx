import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function extractTokenFromLocation(search: string, hash: string) {
  const params = new URLSearchParams(search);
  const possibleKeys = ["access_token", "token", "accessToken", "jwt"];

  for (const key of possibleKeys) {
    const v = params.get(key);
    if (v) return v;
  }

  // If the token comes in the fragment (common with some providers)
  if (hash && hash.startsWith("#")) {
    const h = new URLSearchParams(hash.replace(/^#/, ""));
    for (const key of possibleKeys) {
      const v = h.get(key);
      if (v) return v;
    }
  }

  return null;
}

export default function SocialCallback() {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginWithToken } = useAuth();

  useEffect(() => {
    (async () => {
      const token = extractTokenFromLocation(location.search, location.hash);

      if (!token) {
        // If backend returned the token in a query param with a different name
        // or set a cookie, you may need to adjust this logic.
        console.error("No token found in callback URL");
        navigate("/", { replace: true });
        return;
      }

      try {
        await loginWithToken(token);
        // Remove token from URL to avoid leaking it in history/bookmarks
        try {
          const u = new URL(window.location.href);
          u.searchParams.delete("token");
          u.searchParams.delete("access_token");
          if (u.hash) {
            u.hash = u.hash.replace(/(?:#|&)?(?:access_token|token)=[^&]*/g, "");
          }
          window.history.replaceState(null, "", u.toString());
        } catch (e) {
          // fallback: replace to pathname only
          window.history.replaceState(null, "", window.location.pathname);
        }
        navigate("/", { replace: true });
      } catch (err) {
        console.error("Error logging in with token:", err);
        navigate("/login", { replace: true });
      }
    })();
  }, [location, loginWithToken, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow">
        <p>Finalizando autenticação. Aguarde...</p>
      </div>
    </div>
  );
}
