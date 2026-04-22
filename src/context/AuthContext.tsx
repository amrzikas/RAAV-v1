import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useToast } from './ToastContext';

export interface User {
  email: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const { addToast } = useToast();

  const login = async (email: string, password: string) => {
    // Mock authentication: Admin check
    if (email === 'admin@raav.com' && password === 'admin123') {
      setUser({ email, role: 'admin' });
      return true;
    } 
    // Regular user
    else if (email && password) {
      setUser({ email, role: 'user' });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    addToast('Successfully logged out.', 'info');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
