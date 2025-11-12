// Store para gerenciar código de acesso
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UserInfo {
  nome: string;
  expiraEm: string;
  diasRestantes: number;
  totalAnalises: number;
}

interface AccessCodeStore {
  codigo: string | null;
  userInfo: UserInfo | null;
  isActive: boolean;

  // Actions
  setCodigo: (codigo: string, userInfo: UserInfo) => void;
  clearCodigo: () => void;
  updateUserInfo: (userInfo: UserInfo) => void;
}

export const useAccessCodeStore = create<AccessCodeStore>()(
  persist(
    (set) => ({
      codigo: null,
      userInfo: null,
      isActive: false,

      setCodigo: (codigo, userInfo) => {
        set({
          codigo,
          userInfo,
          isActive: true,
        });
      },

      clearCodigo: () => {
        set({
          codigo: null,
          userInfo: null,
          isActive: false,
        });
      },

      updateUserInfo: (userInfo) => {
        set({ userInfo });
      },
    }),
    {
      name: "access-code-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
