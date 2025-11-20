import api from "./axios";

export function socialLoginBackend() {
  const next = `${window.location.origin}/auth/callback`;
  const BACKEND_ORIGIN = import.meta.env.VITE_BACKEND_ORIGIN;
  const url = `${BACKEND_ORIGIN}/auth/login?next=${encodeURIComponent(next)}`;

  window.location.href = url;
}

export async function fetchUserWithToken(token: string) {
  try {
    const res = await api.get("/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = res.data;
    if (data && data.user) {
      return { ...data.user, claims: data.claims ?? {} };
    }

    return data;
  } catch (error) {
    console.error("Error fetching user with token:", error);
    throw error;
  }
}
