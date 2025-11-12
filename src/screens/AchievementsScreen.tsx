// Tela de Conquistas
import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import { useStatsStore } from "../state/statsStore";

type AchievementsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Achievements">;
};

const AchievementsScreen: React.FC<AchievementsScreenProps> = ({ navigation }) => {
  const { achievements } = useStatsStore();

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <View className="flex-1 bg-slate-950">
      <LinearGradient colors={["#0f172a", "#1e293b"]} style={{ flex: 1 }}>
        <SafeAreaView className="flex-1">
          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View className="px-6 pt-4 pb-6">
              <View className="flex-row items-center justify-between mb-6">
                <Pressable
                  onPress={() => navigation.goBack()}
                  className="w-12 h-12 bg-slate-800 rounded-full items-center justify-center active:opacity-70"
                >
                  <Ionicons name="arrow-back" size={24} color="white" />
                </Pressable>
                <Text className="text-white text-2xl font-bold">Conquistas</Text>
                <View className="w-12 h-12" />
              </View>

              {/* Progress - MAIS VISUAL */}
              <View className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-3xl p-6 mb-6 border-4 border-yellow-300">
                <View className="flex-row items-center justify-between mb-4">
                  <View className="flex-1">
                    <Text className="text-white text-5xl font-black mb-2">
                      {unlockedCount}/{achievements.length}
                    </Text>
                    <Text className="text-yellow-100 text-lg font-bold">
                      Conquistas Desbloqueadas
                    </Text>
                  </View>
                  <View className="w-20 h-20 bg-white rounded-full items-center justify-center">
                    <Ionicons name="trophy" size={48} color="#eab308" />
                  </View>
                </View>
                <View className="bg-yellow-900/50 rounded-full h-4 mb-2 overflow-hidden">
                  <View
                    className="bg-white h-4 rounded-full"
                    style={{ width: `${(unlockedCount / achievements.length) * 100}%` }}
                  />
                </View>
                <Text className="text-yellow-100 text-sm font-semibold text-center">
                  {((unlockedCount / achievements.length) * 100).toFixed(0)}% completo
                </Text>
              </View>

              {/* Achievements List - MAIS VISUAL */}
              <View className="space-y-4">
                {achievements.map((achievement) => (
                  <View
                    key={achievement.id}
                    className={`${
                      achievement.unlocked
                        ? "bg-gradient-to-br from-green-900/60 to-green-800/60 border-green-400"
                        : "bg-gradient-to-br from-slate-800 to-slate-900 border-slate-600"
                    } rounded-3xl p-6 border-2 ${achievement.unlocked ? "shadow-lg shadow-green-500/50" : ""}`}
                  >
                    <View className="flex-row items-center mb-3">
                      <View
                        className={`w-20 h-20 rounded-2xl items-center justify-center mr-4 ${
                          achievement.unlocked
                            ? "bg-gradient-to-br from-green-400 to-green-500 border-4 border-green-300"
                            : "bg-slate-700 border-2 border-slate-600"
                        }`}
                      >
                        <Ionicons
                          name={achievement.unlocked ? achievement.icon as any : "lock-closed"}
                          size={achievement.unlocked ? 40 : 32}
                          color="white"
                        />
                      </View>
                      <View className="flex-1">
                        <Text className={`font-black text-xl mb-1 ${achievement.unlocked ? "text-white" : "text-slate-500"}`}>
                          {achievement.title}
                        </Text>
                        <Text
                          className={`text-sm leading-5 ${
                            achievement.unlocked
                              ? "text-green-200"
                              : "text-slate-500"
                          }`}
                        >
                          {achievement.description}
                        </Text>
                      </View>
                    </View>

                    {achievement.unlocked ? (
                      <View className="bg-green-500/30 rounded-2xl p-3 flex-row items-center justify-between">
                        <View className="flex-row items-center">
                          <Ionicons name="checkmark-circle" size={24} color="#22c55e" />
                          <Text className="text-green-300 text-sm font-bold ml-2">
                            Desbloqueado
                          </Text>
                        </View>
                        {achievement.unlockedAt && (
                          <Text className="text-green-400 text-xs font-semibold">
                            {new Date(achievement.unlockedAt).toLocaleDateString("pt-BR", {
                              day: "2-digit",
                              month: "short",
                            })}
                          </Text>
                        )}
                      </View>
                    ) : (
                      <View className="bg-slate-700/50 rounded-2xl p-3 flex-row items-center">
                        <Ionicons name="lock-closed" size={20} color="#64748b" />
                        <Text className="text-slate-400 text-sm font-bold ml-2">
                          Continue jogando para desbloquear
                        </Text>
                      </View>
                    )}
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

export default AchievementsScreen;
