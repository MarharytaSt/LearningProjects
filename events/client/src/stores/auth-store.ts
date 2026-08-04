import { create } from 'zustand';
import type { AuthLoginRequest, UserPublic } from '@/shared/api/types'
import { getAuthToken, setAuthToken } from '@/shared/api/auth-token';
import { authApi } from '@/shared/api/auth-api';
import { getApiErrorMessage } from '@/lib/utils';

type AuthState = {
    user: UserPublic | null;
    bootstraped: boolean;
    isAuthLoading: boolean;
    authError: string | null;

    bootstrap: () => Promise<void>;
    login: (payload: AuthLoginRequest) => Promise<void>;
    register: (payload: AuthLoginRequest) => Promise<void>;
    logout: () => void;
    clearAuthError: () => void;
    featchMe: () => Promise<void>;
}

function profileToUser(profile: {
    id: string;
    email: string;
    name: string;
}): UserPublic {
    return { id: profile.id, email: profile.email, name: profile.name }
}

export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    bootstraped: false,
    isAuthLoading: false,
    authError: null,
    bootstrap: async () => {
        if (get().bootstraped) {
            return;
        }
        set({ isAuthLoading: true, authError: null });

        try {
            if (!getAuthToken()) {
                set({ user: null, bootstraped: true, isAuthLoading: false });

                return;
            }

            const profile = await authApi.me();

            set({
                user: profileToUser(profile),
                bootstraped: true,
                isAuthLoading: false
            })
        } catch (error) {
            setAuthToken(null)
            set({
                user: null,
                bootstraped: true,
                isAuthLoading: false
            })
        }
    },
    login: async (payload) => {
        set({ isAuthLoading: true, authError: null })

        try {
            const { token, user } = await authApi.login(payload);

            setAuthToken(token);
            set({ user, isAuthLoading: false });
        } catch (error) {
            set({
                isAuthLoading: false,
                authError: getApiErrorMessage(error, 'Не удалось войти')
            })

            throw error;
        }
    },
    register: async (payload) => {
        set({ isAuthLoading: true, authError: null })

        try {
            const { token, user } = await authApi.register(payload);
            setAuthToken(token);
            set({ user, isAuthLoading: false });
        } catch (error) {
            set({
                isAuthLoading: false,
                authError: getApiErrorMessage(error, 'Не удалось заркегистрироваться')
            })

            throw error;
        }
    },
    logout: async () => {
        setAuthToken(null);
        set({user: null, authError: null});

    },
    clearAuthError: async () => {
        set({authError: null})
    },
    featchMe: async () => {
        if(!getAuthToken) {
            set({user: null});

            return;
        }

        try{
            const profile = await authApi.me();

            set({user: profileToUser(profile)});
        }catch(error) {
            setAuthToken(null);
            set({user: null});
        }
    },

}))