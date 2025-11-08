import { createContext, useContext, useState, ReactNode } from 'react';

export type User = {
  uid: string;
  username: string;
  email: string;
  photoURL?: string;
  role: 'user' | 'admin';
};

type AuthUser = {
  email: string;
  password: string;
  username: string;
  role: 'user' | 'admin';
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, username: string) => Promise<boolean>;
  loginWithGoogle: (userData: Omit<User, 'role'> & { role?: 'user' | 'admin' }) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

const ADMIN_USER: AuthUser = {
  email: 'homiin.saude@gmail.com',
  username: 'Admin',
  password: 'hominmais',
  role: 'admin' as const,
};

const DEFAULT_USER: AuthUser = {
  email: 'arthur@gmail.com',
  username: 'Arthur',
  password: '123456',
  role: 'user' as const,
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [users, setUsers] = useState([ADMIN_USER, DEFAULT_USER]);

  const login = async (email: string, password: string) => {
    const normalizedEmail = email.toLowerCase().trim();
    
    if (normalizedEmail === ADMIN_USER.email.toLowerCase() && password === ADMIN_USER.password) {
      const userData = {
        uid: 'admin-1',
        username: ADMIN_USER.username,
        email: ADMIN_USER.email,
        role: ADMIN_USER.role as 'admin',
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return true;
    }

    if (normalizedEmail === DEFAULT_USER.email.toLowerCase() && password === DEFAULT_USER.password) {
      const userData = {
        uid: 'user-1',
        username: DEFAULT_USER.username,
        email: DEFAULT_USER.email,
        role: DEFAULT_USER.role as 'user',
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return true;
    }

    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      const userData = {
        uid: `user-${Date.now()}`,
        username: foundUser.username,
        email: foundUser.email,
        role: foundUser.role,
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return true;
    }
    
    return false;
  };

  const register = async (email: string, password: string, username: string) => {
    if (users.some((u) => u.email === email)) {
      throw new Error('Este email já está em uso');
    }

    if (users.some((u) => u.username === username)) {
      throw new Error('Este nome de usuário já está em uso');
    }

    const newUser = {
      email,
      username,
      password,
      role: 'user' as const,
    };

    setUsers((prev) => [...prev, newUser]);
    
    const userData = {
      uid: `user-${Date.now()}`,
      username,
      email,
      role: 'user' as const,
    };
    
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    
    return true;
  };

  const loginWithGoogle = async (userData: Omit<User, 'role'> & { role?: 'user' | 'admin' }) => {
    try {
      const role = userData.role || 'user';
      
      const userToSave = {
        username: userData.username,
        email: userData.email || '',
        photoURL: userData.photoURL,
        role,
        uid: userData.uid
      };
      
      setUser(userToSave);
      localStorage.setItem('user', JSON.stringify(userToSave));
      return true;
    } catch (error) {
      console.error('Error during Google login:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
