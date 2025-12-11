import { createContext, useEffect, useState, useCallback } from 'react';
import baseUrl from '@/apis/config';

// eslint-disable-next-line react-refresh/only-export-components
export let authContext = createContext(null);

export default function AuthContextProvider({ children }) {
  let [user, setUser] = useState(null);
  let [token, setToken] = useState(localStorage.getItem('token'));
  let [userLoading, setUserLoading] = useState(Boolean(localStorage.getItem('token')));

  const fetchProfile = useCallback(async () => {
    if (!token) return;
    try {
      setUserLoading(true);
      const res = await baseUrl.get('http://localhost:3000/users/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data?.data || null);
    } catch (error) {
      console.error('Failed to load profile from token', error);
      localStorage.removeItem('token');
      setUser(null);
      setToken(null);
    } finally {
      setUserLoading(false);
    }
  }, [token]);

  function logout() {
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
    setUserLoading(false);
  }

  useEffect(() => {
    if (token) {
      fetchProfile();
    } else {
      setUserLoading(false);
    }
  }, [fetchProfile, token]);

  return (
    <authContext.Provider value={{ user, setUser, token, setToken, logout, refreshUser: fetchProfile, userLoading }}>
      {children}
    </authContext.Provider>
  );
}
