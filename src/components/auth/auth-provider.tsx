import { useEffect, useState } from 'react';
import { AuthContext, mockLogin, type User } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const { toast } = useToast();
  
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const user = mockLogin(session.user.email || '');
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const user = mockLogin(session.user.email || '');
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        setUser(null);
        localStorage.removeItem('user');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = (email: string, password: string) => {
    // For demo purposes, skip actual auth and use mock data
    try {
      const mockUser = mockLogin(email);
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));

      toast({
        title: "¡Bienvenido!",
        description: "Has iniciado sesión exitosamente.",
      });
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Error",
        description: "No se pudo iniciar sesión. Por favor intenta de nuevo.",
        variant: "destructive",
      });
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: "Sesión Cerrada",
      description: "Has cerrado sesión exitosamente.",
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}