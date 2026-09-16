import { router } from 'expo-router';
import { useState } from 'react';

import { useAuthStore } from '@/store/authStore';

export function useSignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const signup = useAuthStore((state) => state.signup);

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const handleSignup = () => {
    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }

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
      signup(name, email);
      setIsSubmitting(false);
      router.replace('/');
    }, 500);
  };

  const handleDemoFill = () => {
    setName('Dominic Toretto');
    setEmail('dom@toretto.fast');
    setPassword('charger1970');
    setError('');
  };

  const navigateToLogin = () => {
    router.push('/login');
  };

  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    toggleShowPassword,
    error,
    isSubmitting,
    handleSignup,
    handleDemoFill,
    navigateToLogin,
  };
}
