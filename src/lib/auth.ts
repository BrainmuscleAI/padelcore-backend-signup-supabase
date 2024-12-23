import { createContext, useContext } from 'react';
import { supabase } from './supabase';

export type UserRole = 'player' | 'admin' | 'sponsor';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  companyName?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// Mock users for demo
const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Carlos Ramírez',
    email: 'player@demo.com',
    role: 'player',
  },
  {
    id: '2',
    name: 'Admin Demo',
    email: 'admin@demo.com',
    role: 'admin',
  },
  {
    id: '3',
    name: 'Juan Pérez',
    email: 'sponsor@demo.com',
    role: 'sponsor',
    companyName: 'Deportes México',
  },
];

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function mockLogin(email: string): User {
  const id = crypto.randomUUID();
  
  // For demo purposes, determine role based on email
  if (email === 'admin@demo.com') {
    return { ...MOCK_USERS[1], id };
  } else if (email === 'sponsor@demo.com') {
    return { ...MOCK_USERS[2], id };
  }
  
  // Default to player role with custom name
  return {
    id,
    name: email.split('@')[0],
    email,
    role: 'player',
  };
}