import { create } from 'zustand'
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage" 

export interface LoginState{
    token: string|null,
    email: string|null,
    logged: boolean,
    role: string|null,
    logout:Function,
    login:Function,
}

export const useUserStore = create<LoginState>()(
  persist(
    (set, get) => ({
      token: null,
      email: null,
      logged: false,
      role: null,

      login: (token:string, email:string, role:string) => {
        set(() => ({
          token: token,
          email: email,
          logged: true,
          role: role
        }));
      },

      logout: () => {
        set(() => ({
          token: null,
          email: null,
          logged: false,
          role: null,
        }));
      },
    }),
    {
      name: "token-storage", 
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);