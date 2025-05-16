import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authAPI from '../api/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  // Check for token on initial load
  useEffect(() => {
    const verifyToken = async () => {
      if (token) {
        try {
          const userData = await authAPI.getMe(token);
          setUser(userData);
        } catch (error) {
          logout();
        }
      }
    };
    verifyToken();
  }, [token]);

  const login = async (credentials) => {
    try {
      const { user, token } = await authAPI.login(credentials);
      localStorage.setItem('token', token);
      setToken(token);
      setUser(user);
      navigate('/dashboard');
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      const { user, token } = await authAPI.register(userData);
      localStorage.setItem('token', token);
      setToken(token);
      setUser(user);
      navigate('/dashboard');
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);