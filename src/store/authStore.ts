import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'customer' | 'vendor' | 'rider' | 'admin';

type AuthUser = {
  id?: string;
  name?: string;
  phone: string;
  role: UserRole;
};

type AuthState = {
  token: string | null;
  user: AuthUser | null;
  setAuth: (token: string, user: AuthUser) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setAuth: (token, user) => set({ token, user }),
      logout: () => set({ token: null, user: null })
    }),
    { name: 'rapidely-auth' }
  )
);
