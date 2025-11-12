// Calculadora de Lucro e Gestão de Apostas
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

export default function CalculatorScreen() {
  const [dailyGoal, setDailyGoal] = useState("");
  const [bankroll, setBankroll] = useState("");
  const [betType, setBetType] = useState<"dozen" | "column">("dozen");
  const [showResults, setShowResults] = useState(false);

  const calculateBetting = () => {
    const goal = parseFloat(dailyGoal);
    const bank = parseFloat(bankroll);

    if (isNaN(goal) || isNaN(bank) || goal <= 0 || bank <= 0) {
      return null;
    }

    // Pagamento da roleta: dúzias e colunas pagam 2:1
    const payout = 2;

    // Progressão de Martingale para 2 apostas (primeira e segunda tentativa)
    // Se apostar X e perder, na próxima aposta 2X para recuperar
    const firstBet = goal / payout;
    const secondBet = (firstBet + goal) / payout; // Recupera a primeira aposta + lucro desejado

    // Total necessário para completar a progressão
    const totalNeeded = firstBet + secondBet;

    // Percentual da banca
    const percentageOfBank = (totalNeeded / bank) * 100;

    // Número de operações possíveis com a banca
    const possibleOperations = Math.floor(bank / totalNeeded);

    return {
      firstBet: firstBet.toFixed(2),
      secondBet: secondBet.toFixed(2),
      totalNeeded: totalNeeded.toFixed(2),
      percentageOfBank: percentageOfBank.toFixed(1),
      possibleOperations,
      profitPerOperation: goal.toFixed(2),
    };
  };

  const results = showResults ? calculateBetting() : null;

  return (
    <SafeAreaView className="flex-1 bg-slate-900" edges={["top"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView className="flex-1">
            {/* Header */}
            <View className="px-6 pt-4 pb-6">
              <Text className="text-white text-3xl font-bold mb-2">
                Calculadora de Lucro
              </Text>
              <Text className="text-slate-400">
                Planeje suas apostas e calcule seu lucro diário
              </Text>
            </View>

            {/* Formulário */}
            <View className="px-6 mb-6">
              <View className="bg-slate-800 rounded-3xl p-6 border-2 border-slate-700">
                {/* Meta Diária */}
                <View className="mb-6">
                  <Text className="text-white text-sm font-medium mb-2">
                    Meta de Lucro Diário (R$)
                  </Text>
                  <TextInput
                    className="bg-slate-700 text-white text-2xl px-4 py-4 rounded-xl border-2 border-slate-600"
                    placeholder="100.00"
                    placeholderTextColor="#64748b"
                    keyboardType="decimal-pad"
                    value={dailyGoal}
                    onChangeText={(text) => {
                      setDailyGoal(text);
                      setShowResults(false);
                    }}
                  />
                </View>

                {/* Banca */}
                <View className="mb-6">
                  <Text className="text-white text-sm font-medium mb-2">
                    Banca Disponível (R$)
                  </Text>
                  <TextInput
                    className="bg-slate-700 text-white text-2xl px-4 py-4 rounded-xl border-2 border-slate-600"
                    placeholder="1000.00"
                    placeholderTextColor="#64748b"
                    keyboardType="decimal-pad"
                    value={bankroll}
                    onChangeText={(text) => {
                      setBankroll(text);
                      setShowResults(false);
                    }}
                  />
                </View>

                {/* Tipo de Aposta */}
                <View className="mb-6">
                  <Text className="text-white text-sm font-medium mb-2">
                    Tipo de Aposta
                  </Text>
                  <View className="flex-row gap-3">
                    <Pressable
                      onPress={() => setBetType("dozen")}
                      className={`flex-1 py-3 rounded-xl items-center border-2 ${
                        betType === "dozen"
                          ? "bg-emerald-500 border-emerald-400"
                          : "bg-slate-700 border-slate-600"
                      }`}
                    >
                      <Text className="text-white font-bold">Dúzias</Text>
                    </Pressable>

                    <Pressable
                      onPress={() => setBetType("column")}
                      className={`flex-1 py-3 rounded-xl items-center border-2 ${
                        betType === "column"
                          ? "bg-emerald-500 border-emerald-400"
                          : "bg-slate-700 border-slate-600"
                      }`}
                    >
                      <Text className="text-white font-bold">Colunas</Text>
                    </Pressable>
                  </View>
                </View>

                {/* Botão Calcular */}
                <Pressable
                  onPress={() => setShowResults(true)}
                  className="bg-emerald-500 py-4 rounded-xl items-center active:opacity-70"
                  disabled={!dailyGoal || !bankroll}
                >
                  <Text className="text-white text-lg font-bold">
                    Calcular Gestão
                  </Text>
                </Pressable>
              </View>
            </View>

            {/* Resultados */}
            {showResults && results && (
              <View className="px-6 mb-6">
                <Text className="text-white text-2xl font-bold mb-4">
                  Plano de Apostas
                </Text>

                {/* Cards de Resultado */}
                <View className="space-y-3">
                  {/* Primeira Aposta */}
                  <View className="bg-slate-800 rounded-2xl p-5 border-2 border-emerald-500/30">
                    <View className="flex-row items-center mb-2">
                      <View className="w-8 h-8 bg-emerald-500 rounded-full items-center justify-center mr-3">
                        <Text className="text-white font-bold">1</Text>
                      </View>
                      <Text className="text-white text-lg font-bold">
                        Primeira Aposta
                      </Text>
                    </View>
                    <Text className="text-emerald-400 text-3xl font-bold">
                      R$ {results.firstBet}
                    </Text>
                    <Text className="text-slate-400 text-sm mt-1">
                      Aposte este valor em 2{" "}
                      {betType === "dozen" ? "dúzias" : "colunas"}
                    </Text>
                  </View>

                  {/* Segunda Aposta */}
                  <View className="bg-slate-800 rounded-2xl p-5 border-2 border-amber-500/30">
                    <View className="flex-row items-center mb-2">
                      <View className="w-8 h-8 bg-amber-500 rounded-full items-center justify-center mr-3">
                        <Text className="text-white font-bold">2</Text>
                      </View>
                      <Text className="text-white text-lg font-bold">
                        Segunda Aposta (se perder)
                      </Text>
                    </View>
                    <Text className="text-amber-400 text-3xl font-bold">
                      R$ {results.secondBet}
                    </Text>
                    <Text className="text-slate-400 text-sm mt-1">
                      Para recuperar e atingir a meta
                    </Text>
                  </View>

                  {/* Total Necessário */}
                  <View className="bg-slate-800 rounded-2xl p-5 border-2 border-slate-700">
                    <Text className="text-slate-400 text-sm mb-1">
                      Total Necessário
                    </Text>
                    <Text className="text-white text-2xl font-bold">
                      R$ {results.totalNeeded}
                    </Text>
                    <Text className="text-slate-400 text-xs mt-1">
                      {results.percentageOfBank}% da sua banca
                    </Text>
                  </View>

                  {/* Operações Possíveis */}
                  <View className="bg-slate-800 rounded-2xl p-5 border-2 border-slate-700">
                    <Text className="text-slate-400 text-sm mb-1">
                      Operações Possíveis
                    </Text>
                    <Text className="text-white text-2xl font-bold">
                      {results.possibleOperations}x
                    </Text>
                    <Text className="text-slate-400 text-xs mt-1">
                      Com sua banca atual
                    </Text>
                  </View>

                  {/* Lucro por Operação */}
                  <View className="bg-emerald-500/10 rounded-2xl p-5 border-2 border-emerald-500">
                    <Text className="text-emerald-400 text-sm mb-1">
                      Lucro por Operação
                    </Text>
                    <Text className="text-emerald-400 text-2xl font-bold">
                      R$ {results.profitPerOperation}
                    </Text>
                    <Text className="text-emerald-400/70 text-xs mt-1">
                      Se acertar em qualquer tentativa
                    </Text>
                  </View>
                </View>

                {/* Dicas de Gestão */}
                <View className="mt-6 bg-blue-500/10 rounded-2xl p-5 border-2 border-blue-500/30">
                  <View className="flex-row items-center mb-3">
                    <Ionicons
                      name="bulb"
                      size={24}
                      color="#3b82f6"
                      style={{ marginRight: 8 }}
                    />
                    <Text className="text-blue-400 text-lg font-bold">
                      Dicas de Gestão
                    </Text>
                  </View>

                  <View className="space-y-2">
                    <View className="flex-row">
                      <Text className="text-blue-400 mr-2">•</Text>
                      <Text className="text-blue-300 text-sm flex-1">
                        Nunca aposte mais de 5% da sua banca total em uma
                        operação
                      </Text>
                    </View>
                    <View className="flex-row">
                      <Text className="text-blue-400 mr-2">•</Text>
                      <Text className="text-blue-300 text-sm flex-1">
                        Pare ao atingir sua meta diária para evitar perdas
                        desnecessárias
                      </Text>
                    </View>
                    <View className="flex-row">
                      <Text className="text-blue-400 mr-2">•</Text>
                      <Text className="text-blue-300 text-sm flex-1">
                        Use o padrão de 4 ou mais repetições identificado pelo
                        app
                      </Text>
                    </View>
                    <View className="flex-row">
                      <Text className="text-blue-400 mr-2">•</Text>
                      <Text className="text-blue-300 text-sm flex-1">
                        Se perder 2 vezes seguidas, pare e reavalie a estratégia
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            )}

            <View className="h-20" />
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
