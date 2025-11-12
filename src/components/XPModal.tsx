// Modal de XP ganho
import React from "react";
import { View, Text, Modal, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

interface XPModalProps {
  visible: boolean;
  xpGained: number;
  reason: string;
  levelUp?: boolean;
  newLevel?: number;
  onClose: () => void;
}

const XPModal: React.FC<XPModalProps> = ({ visible, xpGained, reason, levelUp, newLevel, onClose }) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="flex-1 bg-black/70 items-center justify-end">
        <View className="bg-slate-900 rounded-t-3xl w-full border-t-4 border-purple-500">
          <LinearGradient
            colors={levelUp ? ["#7c3aed", "#a855f7"] : ["#1e293b", "#334155"]}
            style={{ padding: 24, alignItems: "center" }}
          >
            {levelUp ? (
              <>
                <View className="w-20 h-20 bg-yellow-400 rounded-full items-center justify-center mb-4">
                  <Ionicons name="star" size={48} color="white" />
                </View>
                <Text className="text-white text-4xl font-black text-center mb-2">
                  🎉 LEVEL UP!
                </Text>
                <Text className="text-purple-200 text-2xl font-bold text-center">
                  Agora você é Level {newLevel}
                </Text>
              </>
            ) : (
              <>
                <View className="w-16 h-16 bg-purple-500 rounded-full items-center justify-center mb-4">
                  <Ionicons name="add-circle" size={40} color="white" />
                </View>
                <Text className="text-white text-3xl font-black text-center mb-2">
                  +{xpGained} XP
                </Text>
                <Text className="text-purple-200 text-lg font-semibold text-center">
                  {reason}
                </Text>
              </>
            )}
          </LinearGradient>

          <View className="p-6">
            <Pressable
              onPress={onClose}
              className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl py-4 items-center active:opacity-80"
            >
              <Text className="text-white font-bold text-lg">Continuar Jogando</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default XPModal;
