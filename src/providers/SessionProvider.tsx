import React, { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { SESSION_TIMEOUT_DURATION } from '@/utils/SessionTime';
import { Loader } from '@/ui/Loader';

interface SessionProviderProps {
  children: React.ReactNode;
}

interface SessionContextValue {
  isLoggedIn: boolean;
}

export const SessionContext = createContext<SessionContextValue>({
  isLoggedIn: false,
});

export const SessionProvider: React.FC<SessionProviderProps> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  let sessionTimeout: NodeJS.Timeout;

  useEffect(() => {
    const token = localStorage.getItem('user');
    const shouldRedirect =
      !token &&
      !router.pathname.startsWith('/login') &&
      !router.pathname.startsWith('/xyz');

    if (token) {
      setIsLoggedIn(true);
      resetSessionTimeout();
      setIsLoading(false);
    } else if (shouldRedirect) {
      setIsLoggedIn(false);
      setIsLoading(true);
      router.push('/login');
    } else {
      setIsLoggedIn(false);
      setIsLoading(false);
    }
  }, [router]);

  const resetSessionTimeout = () => {
    if (sessionTimeout) {
      clearTimeout(sessionTimeout);
    }
    sessionTimeout = setTimeout(() => {
      logout();
    }, SESSION_TIMEOUT_DURATION);
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('user');
    router.push('/login');
  };

  const handleUserActivity = () => {
    resetSessionTimeout();
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);
    return () => {
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
    };
  }, []);

  if (isLoading) {
    return <Loader />; // Render the Loader while redirecting
  }

  return (
    <SessionContext.Provider value={{ isLoggedIn }}>
      {children}
    </SessionContext.Provider>
  );
};
