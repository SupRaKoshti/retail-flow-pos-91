import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Define user roles
export type UserRole = 'admin' | 'manager' | 'cashier';

// User interface
export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

// Login API response interface
interface LoginResponse {
  access: string;
  refresh: string;
  user: User;
}

// Auth context interface
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// API base URL (you can move this to an .env file)
const API_URL = 'http://localhost:8000/account/api/login/';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem('pos_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post<LoginResponse>(API_URL, { email, password });

      const { access, refresh, user } = response.data;

      // Store tokens and user info
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      localStorage.setItem('pos_user', JSON.stringify(user));

      setUser(user);
    } catch (error: any) {
      const message =
        error.response?.data?.detail ||
        error.response?.data?.error ||
        'Invalid credentials. Please try again.';
      throw new Error(message);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('pos_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
