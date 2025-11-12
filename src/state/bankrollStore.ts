// Store para gerenciar banca do usuário
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface DailyResult {
  date: string; // ISO string
  profit: number; // positivo = lucro, negativo = perda
  bankrollAfter: number;
}

interface BankrollStore {
  initialBankroll: number;
  currentBankroll: number;
  dailyResults: DailyResult[];

  // Actions
  setInitialBankroll: (amount: number) => void;
  addDailyResult: (profit: number) => void;
  getDailyResults: (days: number) => DailyResult[];
  getTotalProfit: () => number;
}

export const useBankrollStore = create<BankrollStore>()(
  persist(
    (set, get) => ({
      initialBankroll: 0,
      currentBankroll: 0,
      dailyResults: [],

      setInitialBankroll: (amount) => {
        set({
          initialBankroll: amount,
          currentBankroll: amount,
          dailyResults: [],
        });
      },

      addDailyResult: (profit) => {
        const state = get();
        const today = new Date().toISOString().split("T")[0];

        // Verifica se já existe resultado para hoje
        const existingIndex = state.dailyResults.findIndex(
          (r) => r.date.split("T")[0] === today
        );

        const newBankroll = state.currentBankroll + profit;

        const newResult: DailyResult = {
          date: new Date().toISOString(),
          profit,
          bankrollAfter: newBankroll,
        };

        if (existingIndex >= 0) {
          // Atualiza resultado de hoje
          const updatedResults = [...state.dailyResults];
          updatedResults[existingIndex] = newResult;
          set({
            currentBankroll: newBankroll,
            dailyResults: updatedResults,
          });
        } else {
          // Adiciona novo resultado
          set({
            currentBankroll: newBankroll,
            dailyResults: [...state.dailyResults, newResult],
          });
        }
      },

      getDailyResults: (days) => {
        const state = get();
        return state.dailyResults.slice(-days);
      },

      getTotalProfit: () => {
        const state = get();
        return state.currentBankroll - state.initialBankroll;
      },
    }),
    {
      name: "bankroll-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
