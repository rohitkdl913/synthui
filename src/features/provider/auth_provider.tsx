import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import APIRoute from '../../api_route';
import { useToast } from './toast_provider';
import { useNavigate } from 'react-router-dom';
import { User } from '../model/user';


interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  signup: (credentials: { name: string, email: string, password: string }) => Promise<void>;
  logout: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${APIRoute.user}`, { credentials: 'include', method: 'GET' });
        if (response.ok) {
          const userData = await response.json();
          console.log(userData.data);
          setUser(userData.data);
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials: { email: string; password: string }) => {
    try {

      const response = await fetch(`${APIRoute.login}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
        credentials: 'include'
      });

      const data = await response.json();
      console.log(data);
      if (!response.ok) throw new Error(data.detail);
      const userData = { name: data.data.name, email: data.data.email }
      setUser(userData);
      showToast('Login successful!', 'success');
      // document.cookie = `access_token=${data.data.access_token};max-age=604800;path=/;`;
      navigate("/dashboard", { replace: true });
    } catch (error: any) {
      showToast(error.message, 'error');
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      setUser(null);
      return true;
    } catch (error) {
      console.error('Logout failed:', error);
      return false;
    }
  };
  const signup = async (credentials: { name: string, email: string, password: string }) => {
    try {

      const response = await fetch(`${APIRoute.signup}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();
      console.log(data);
      if (!response.ok) throw new Error(data.detail);

      showToast('Account created successfully!', 'success');
      navigate("/login",{ replace: true });
    } catch (error: any) {
      showToast(error.message, 'error');
    }
  }
  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();
  console.log(`User Data:${user}`);

  if (loading) {
    return <div className="text-center text-gray-500 mt-10">Loading authentication status...</div>;
  }

  return user ? children : <Navigate to="/login" replace />;
};
