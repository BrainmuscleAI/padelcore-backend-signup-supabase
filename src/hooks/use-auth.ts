import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from './use-toast';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/lib/routes';

export function useSignUp() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const signUp = async ({
    email,
    password,
    username,
    fullName,
  }: {
    email: string;
    password: string;
    username: string;
    fullName: string;
  }) => {
    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
            full_name: fullName,
          },
        },
      });

      if (error) throw error;

      toast({
        title: "¡Registro Exitoso!",
        description: "Tu cuenta ha sido creada. Por favor inicia sesión.",
      });

      navigate(ROUTES.HOME);
      return data;
    } catch (error: any) {
      let message = "Error al crear la cuenta";
      if (error.message.includes("Email already registered")) {
        message = "Este correo ya está registrado";
      }
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    signUp,
    loading,
  };
}