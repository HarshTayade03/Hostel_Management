import { createContext, useState, useEffect } from 'react';
import api from '@/lib/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // SECURE AUTH: Rely completely on the HTTPOnly JWT cookie verification via the Backend Server.
  useEffect(() => {
    const fetchSecureProfile = async () => {
      try {
        // Explicitly hit the Backend Server for Auth logic and strict state routing
        // This will automatically send the HTTPOnly cookie if it exists
        const { data } = await api.get('/users/me');
        setUser(data.data.user);
      } catch (error) {
        // If 401 Unauthorized, it means cookie lacks or is invalid
        console.error("JWT compromised, expired, or missing. Logging out automatically.");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSecureProfile();
  }, []);



  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { data } = response.data;
      
      setUser(data.user);
      
      return data.user;
    } catch (error) {
      throw error.response?.data?.message || 'Login failed. Please try again.';
    }
  };

  const register = async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      const { data } = response.data;
      
      setUser(data.user);
      
      return data.user;
    } catch (error) {
      throw error.response?.data?.message || 'Registration failed. Please try again.';
    }
  };

  const logout = async () => {
    try {
      await api.get('/auth/logout');
    } catch (err) {
      console.error(err);
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
