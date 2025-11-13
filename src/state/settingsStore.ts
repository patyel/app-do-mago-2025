// Store para configurações e alertas
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

// Importação condicional para web
let Notifications: any = null;
if (Platform.OS !== "web") {
  Notifications = require("expo-notifications");

  // Configurar handler de notificações apenas em plataformas nativas
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });
}

export interface AlertSettings {
  enableNotifications: boolean;
  dailyGoalAlert: boolean;
  bankrollWarning: boolean;
  bankrollWarningPercent: number; // Alertar quando cair X%
  liveReminders: boolean;
  liveReminderTimes: ("11h" | "15h" | "19h")[];
  stopLoss: boolean;
  stopLossAmount: number;
  stopLossReached: boolean;
}

interface SettingsStore {
  settings: AlertSettings;

  // Actions
  updateSettings: (settings: Partial<AlertSettings>) => void;
  checkBankrollAlert: (currentBankroll: number, initialBankroll: number) => boolean;
  checkStopLoss: (dailyLoss: number) => boolean;
  resetStopLoss: () => void;
  scheduleLiveReminders: () => Promise<void>;
  sendNotification: (title: string, body: string) => Promise<void>;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set, get) => ({
      settings: {
        enableNotifications: true,
        dailyGoalAlert: true,
        bankrollWarning: true,
        bankrollWarningPercent: 20,
        liveReminders: true,
        liveReminderTimes: ["11h", "15h", "19h"],
        stopLoss: false,
        stopLossAmount: 0,
        stopLossReached: false,
      },

      updateSettings: (newSettings) => {
        const state = get();
        set({
          settings: { ...state.settings, ...newSettings },
        });

        // Se ativou lembretes, agenda notificações
        if (newSettings.liveReminders !== undefined && newSettings.liveReminders) {
          get().scheduleLiveReminders();
        }
      },

      checkBankrollAlert: (currentBankroll, initialBankroll) => {
        const state = get();
        if (!state.settings.bankrollWarning) return false;

        const percentLoss = ((initialBankroll - currentBankroll) / initialBankroll) * 100;

        if (percentLoss >= state.settings.bankrollWarningPercent) {
          get().sendNotification(
            "⚠️ Alerta de Banca",
            `Sua banca caiu ${percentLoss.toFixed(1)}%! Considere pausar.`
          );
          return true;
        }

        return false;
      },

      checkStopLoss: (dailyLoss) => {
        const state = get();
        if (!state.settings.stopLoss) return false;

        if (Math.abs(dailyLoss) >= state.settings.stopLossAmount) {
          set({
            settings: { ...state.settings, stopLossReached: true },
          });

          get().sendNotification(
            "🛑 Stop Loss Atingido",
            `Você atingiu seu limite de perda diário de R$${state.settings.stopLossAmount.toFixed(2)}. Volte amanhã!`
          );
          return true;
        }

        return false;
      },

      resetStopLoss: () => {
        const state = get();
        set({
          settings: { ...state.settings, stopLossReached: false },
        });
      },

      scheduleLiveReminders: async () => {
        if (Platform.OS === "web" || !Notifications) {
          console.log("Notificações não suportadas na web");
          return;
        }

        const state = get();
        if (!state.settings.enableNotifications || !state.settings.liveReminders) {
          return;
        }

        // Pede permissão
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== "granted") {
          return;
        }

        // Cancela notificações anteriores
        await Notifications.cancelAllScheduledNotificationsAsync();

        // Agenda para cada live selecionada
        const times = state.settings.liveReminderTimes;

        for (const time of times) {
          let hour = 11;
          if (time === "15h") hour = 15;
          if (time === "19h") hour = 19;

          await Notifications.scheduleNotificationAsync({
            content: {
              title: `🎰 Live das ${time}`,
              body: "Não esqueça de registrar seu resultado!",
              sound: true,
            },
            trigger: {
              type: Notifications.SchedulableTriggerInputTypes.DAILY,
              hour,
              minute: 0,
            },
          });
        }
      },

      sendNotification: async (title, body) => {
        if (Platform.OS === "web" || !Notifications) {
          console.log("Notificação (web):", title, body);
          return;
        }

        const state = get();
        if (!state.settings.enableNotifications) return;

        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== "granted") return;

        await Notifications.scheduleNotificationAsync({
          content: {
            title,
            body,
            sound: true,
          },
          trigger: null, // Envia imediatamente
        });
      },
    }),
    {
      name: "settings-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
