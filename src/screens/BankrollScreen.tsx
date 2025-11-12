// Tela de Gerenciamento de Banca
import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import { useBankrollStore } from "../state/bankrollStore";

const screenWidth = Dimensions.get("window").width;

export default function BankrollScreen() {
  const {
    initialBankroll,
    currentBankroll,
    dailyResults,
    setInitialBankroll,
    addDailyResult,
    getDailyResults,
    getTotalProfit,
  } = useBankrollStore();

  const [showInitialSetup, setShowInitialSetup] = useState(
    initialBankroll === 0
  );
  const [initialAmount, setInitialAmount] = useState("");
  const [profitAmount, setProfitAmount] = useState("");
  const [showAddResult, setShowAddResult] = useState(false);

  const handleSetInitial = () => {
    const amount = parseFloat(initialAmount);
    if (amount > 0) {
      setInitialBankroll(amount);
      setShowInitialSetup(false);
      setInitialAmount("");
    }
  };

  const handleAddResult = () => {
    const profit = parseFloat(profitAmount);
    if (!isNaN(profit)) {
      addDailyResult(profit);
      setProfitAmount("");
      setShowAddResult(false);
    }
  };

  const last30Days = getDailyResults(30);
  const totalProfit = getTotalProfit();
  const profitPercentage =
    initialBankroll > 0 ? (totalProfit / initialBankroll) * 100 : 0;

  if (showInitialSetup) {
    return (
      <SafeAreaView className="flex-1 bg-slate-900">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="flex-1 px-6 justify-center">
              <View className="bg-slate-800 rounded-3xl p-6 border-2 border-slate-700">
                <View className="items-center mb-6">
                  <View className="w-20 h-20 bg-emerald-500/20 rounded-full items-center justify-center mb-4">
                    <Ionicons name="wallet" size={40} color="#10b981" />
                  </View>
                  <Text className="text-white text-2xl font-bold mb-2">
                    Configure sua Banca
                  </Text>
                  <Text className="text-slate-400 text-center">
                    Informe o valor inicial da sua banca para começar o
                    acompanhamento
                  </Text>
                </View>

                <View className="mb-6">
                  <Text className="text-slate-300 text-sm mb-2 font-medium">
                    Valor Inicial (R$)
                  </Text>
                  <TextInput
                    className="bg-slate-700 text-white text-2xl px-4 py-4 rounded-xl border-2 border-slate-600"
                    placeholder="1000.00"
                    placeholderTextColor="#64748b"
                    keyboardType="decimal-pad"
                    value={initialAmount}
                    onChangeText={setInitialAmount}
                  />
                </View>

                <Pressable
                  onPress={handleSetInitial}
                  className="bg-emerald-500 py-4 rounded-xl items-center active:opacity-70"
                  disabled={!initialAmount || parseFloat(initialAmount) <= 0}
                >
                  <Text className="text-white text-lg font-bold">
                    Começar Acompanhamento
                  </Text>
                </Pressable>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-900" edges={["top"]}>
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="px-6 pt-4 pb-6">
          <Text className="text-white text-3xl font-bold mb-2">
            Gerenciamento de Banca
          </Text>
          <Text className="text-slate-400">
            Acompanhe sua evolução financeira
          </Text>
        </View>

        {/* Cards de Resumo */}
        <View className="px-6 mb-6">
          <View className="bg-slate-800 rounded-3xl p-6 border-2 border-slate-700 mb-4">
            <Text className="text-slate-400 text-sm mb-1">Banca Atual</Text>
            <Text className="text-white text-4xl font-bold">
              R$ {currentBankroll.toFixed(2)}
            </Text>
          </View>

          <View className="flex-row gap-3">
            <View className="flex-1 bg-slate-800 rounded-2xl p-4 border-2 border-slate-700">
              <Text className="text-slate-400 text-xs mb-1">Inicial</Text>
              <Text className="text-white text-lg font-bold">
                R$ {initialBankroll.toFixed(2)}
              </Text>
            </View>

            <View className="flex-1 bg-slate-800 rounded-2xl p-4 border-2 border-slate-700">
              <Text className="text-slate-400 text-xs mb-1">Lucro Total</Text>
              <Text
                className={`text-lg font-bold ${totalProfit >= 0 ? "text-emerald-400" : "text-red-400"}`}
              >
                R$ {totalProfit >= 0 ? "+" : ""}
                {totalProfit.toFixed(2)}
              </Text>
            </View>

            <View className="flex-1 bg-slate-800 rounded-2xl p-4 border-2 border-slate-700">
              <Text className="text-slate-400 text-xs mb-1">Variação</Text>
              <Text
                className={`text-lg font-bold ${profitPercentage >= 0 ? "text-emerald-400" : "text-red-400"}`}
              >
                {profitPercentage >= 0 ? "+" : ""}
                {profitPercentage.toFixed(1)}%
              </Text>
            </View>
          </View>
        </View>

        {/* Gráfico Visual Simples */}
        {last30Days.length > 0 && (
          <View className="mb-6 px-6">
            <Text className="text-white text-xl font-bold mb-4">
              Evolução (Últimos 7 dias)
            </Text>
            <View className="bg-slate-800 rounded-2xl p-4 border-2 border-slate-700">
              <View className="flex-row items-end h-40 justify-around">
                {last30Days.slice(-7).map((result, index) => {
                  const maxValue = Math.max(
                    ...last30Days.slice(-7).map((r) => r.bankrollAfter)
                  );
                  const height = (result.bankrollAfter / maxValue) * 100;
                  const date = new Date(result.date);

                  return (
                    <View key={index} className="flex-1 items-center">
                      <View
                        style={{ height: `${height}%` }}
                        className="w-8 bg-emerald-500 rounded-t-lg"
                      />
                      <Text className="text-slate-400 text-xs mt-2">
                        {date.getDate()}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        )}

        {/* Histórico */}
        <View className="px-6 mb-6">
          <Text className="text-white text-xl font-bold mb-4">
            Histórico (Últimos 30 dias)
          </Text>

          {last30Days.length === 0 ? (
            <View className="bg-slate-800 rounded-2xl p-6 border-2 border-slate-700 items-center">
              <Ionicons
                name="calendar-outline"
                size={40}
                color="#64748b"
                style={{ marginBottom: 8 }}
              />
              <Text className="text-slate-400 text-center">
                Nenhum resultado registrado ainda.{"\n"}Adicione seu primeiro
                resultado!
              </Text>
            </View>
          ) : (
            <View className="space-y-2">
              {last30Days.reverse().map((result, index) => {
                const date = new Date(result.date);
                const isToday =
                  date.toISOString().split("T")[0] ===
                  new Date().toISOString().split("T")[0];

                return (
                  <View
                    key={index}
                    className="bg-slate-800 rounded-2xl p-4 border-2 border-slate-700 flex-row justify-between items-center"
                  >
                    <View>
                      <Text className="text-white font-bold">
                        {isToday
                          ? "Hoje"
                          : date.toLocaleDateString("pt-BR", {
                              day: "2-digit",
                              month: "short",
                            })}
                      </Text>
                      <Text className="text-slate-400 text-xs">
                        Banca: R$ {result.bankrollAfter.toFixed(2)}
                      </Text>
                    </View>
                    <Text
                      className={`text-lg font-bold ${result.profit >= 0 ? "text-emerald-400" : "text-red-400"}`}
                    >
                      {result.profit >= 0 ? "+" : ""}R${" "}
                      {result.profit.toFixed(2)}
                    </Text>
                  </View>
                );
              })}
            </View>
          )}
        </View>

        <View className="h-32" />
      </ScrollView>

      {/* Botão Flutuante */}
      <View className="absolute bottom-6 right-6">
        <Pressable
          onPress={() => setShowAddResult(true)}
          className="w-16 h-16 bg-emerald-500 rounded-full items-center justify-center active:opacity-70 shadow-lg"
        >
          <Ionicons name="add" size={32} color="white" />
        </Pressable>
      </View>

      {/* Modal para adicionar resultado */}
      {showAddResult && (
        <View className="absolute inset-0 bg-black/70 justify-center items-center">
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View className="bg-slate-800 rounded-3xl p-6 mx-6 border-2 border-slate-700">
                <Text className="text-white text-2xl font-bold mb-4">
                  Adicionar Resultado
                </Text>

                <Text className="text-slate-400 text-sm mb-2">
                  Informe o lucro ou perda de hoje
                </Text>

                <TextInput
                  className="bg-slate-700 text-white text-2xl px-4 py-4 rounded-xl border-2 border-slate-600 mb-6"
                  placeholder="+100.00 ou -50.00"
                  placeholderTextColor="#64748b"
                  keyboardType="decimal-pad"
                  value={profitAmount}
                  onChangeText={setProfitAmount}
                />

                <View className="flex-row gap-3">
                  <Pressable
                    onPress={() => {
                      setShowAddResult(false);
                      setProfitAmount("");
                    }}
                    className="flex-1 bg-slate-700 py-3 rounded-xl items-center active:opacity-70"
                  >
                    <Text className="text-white font-bold">Cancelar</Text>
                  </Pressable>

                  <Pressable
                    onPress={handleAddResult}
                    className="flex-1 bg-emerald-500 py-3 rounded-xl items-center active:opacity-70"
                  >
                    <Text className="text-white font-bold">Adicionar</Text>
                  </Pressable>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </View>
      )}
    </SafeAreaView>
  );
}
