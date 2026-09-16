import { router } from 'expo-router';
import { useState } from 'react';

import { useAuthStore } from '@/store/authStore';

export function useLoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const login = useAuthStore((state) => state.login);

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const handleLogin = () => {
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!password.trim() || password.length < 4) {
      setError('Password must be at least 4 characters long.');
      return;
    }

    setError('');
    setIsSubmitting(true);

    setTimeout(() => {
      login(email);
      setIsSubmitting(false);
      router.replace('/');
    }, 500);
  };

  const handleDemoFill = () => {
    setEmail('dom@toretto.fast');
    setPassword('charger1970');
    setError('');
  };

  const navigateToSignup = () => {
    router.push('/signup');
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    toggleShowPassword,
    error,
    isSubmitting,
    handleLogin,
    handleDemoFill,
    navigateToSignup,
  };
}
