// Modal de conquista desbloqueada
import React from "react";
import { View, Text, Modal, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

interface AchievementModalProps {
  visible: boolean;
  achievement: {
    title: string;
    description: string;
    icon: string;
  } | null;
  onClose: () => void;
}

const AchievementModal: React.FC<AchievementModalProps> = ({ visible, achievement, onClose }) => {
  if (!achievement) return null;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 bg-black/80 items-center justify-center px-6">
        <View className="bg-slate-900 rounded-3xl overflow-hidden w-full max-w-sm border-4 border-yellow-400">
          <LinearGradient
            colors={["#f59e0b", "#d97706"]}
            style={{ padding: 32, alignItems: "center" }}
          >
            <View className="w-24 h-24 bg-white rounded-full items-center justify-center mb-4">
              <Ionicons name={achievement.icon as any} size={56} color="#f59e0b" />
            </View>
            <Text className="text-white text-3xl font-black text-center mb-2">
              🎉 CONQUISTA DESBLOQUEADA!
            </Text>
            <Text className="text-yellow-100 text-xl font-bold text-center">
              {achievement.title}
            </Text>
          </LinearGradient>

          <View className="p-6 bg-slate-900">
            <Text className="text-slate-300 text-center text-base leading-6 mb-6">
              {achievement.description}
            </Text>
            <View className="bg-gradient-to-r from-yellow-900/40 to-yellow-800/40 rounded-2xl p-4 mb-4 border border-yellow-500/50">
              <Text className="text-yellow-300 font-bold text-center text-lg">
                +50 XP Bônus! 🌟
              </Text>
            </View>
            <Pressable
              onPress={onClose}
              className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl py-4 items-center active:opacity-80"
            >
              <Text className="text-white font-bold text-lg">Continuar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AchievementModal;
