import { createContext, useState, useEffect } from 'react';
import api from '@/lib/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // SECURE AUTH: Never trust localStorage for User Roles. Rely completely on the JWT token verification via the Backend Server.
  useEffect(() => {
    const fetchSecureProfile = async () => {
      const storedToken = localStorage.getItem('hostellite_token');
      if (!storedToken) {
        setLoading(false);
        return;
      }
      
      try {
        setToken(storedToken);
        // Explicitly hit the Backend Server for Auth logic and strict state routing
        const { data } = await api.get('/users/me');
        setUser(data.data.user);
      } catch (error) {
        console.error("JWT compromised or expired. Logging out automatically.");
        logout();
      } finally {
        setLoading(false);
      }
    };

    fetchSecureProfile();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, data } = response.data;
      
      localStorage.setItem('hostellite_token', token);
      setToken(token);
      setUser(data.user);
      
      return data.user;
    } catch (error) {
      throw error.response?.data?.message || 'Login failed. Please try again.';
    }
  };

  const register = async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      const { token, data } = response.data;
      
      localStorage.setItem('hostellite_token', token);
      setToken(token);
      setUser(data.user);
      
      return data.user;
    } catch (error) {
      throw error.response?.data?.message || 'Registration failed. Please try again.';
    }
  };

  const logout = () => {
    localStorage.removeItem('hostellite_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
