import { createContext } from 'react';
import type { AuthContextValue } from '@/features/authentication/types';

export const AuthContext = createContext<AuthContextValue | null>(null);
