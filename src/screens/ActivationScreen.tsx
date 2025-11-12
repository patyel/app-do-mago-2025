// Tela de Ativação de Código
import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { backendService } from "../services/backend";
import { useAccessCodeStore } from "../state/accessCodeStore";

type ActivationScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Activation">;
};

const ActivationScreen: React.FC<ActivationScreenProps> = ({ navigation }) => {
  const [codigo, setCodigo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const setCodigoStore = useAccessCodeStore((s) => s.setCodigo);

  const handleActivate = async () => {
    if (!codigo.trim()) {
      setError("Digite seu código de acesso");
      return;
    }

    setIsLoading(true);
    setError("");

    const resultado = await backendService.verificarCodigo(codigo.toUpperCase().trim());

    if (!resultado.sucesso) {
      setError(resultado.erro || "Código inválido");
      setIsLoading(false);
      return;
    }

    // Salva o código e info do usuário
    setCodigoStore(codigo.toUpperCase().trim(), resultado.usuario);

    setIsLoading(false);

    // Navega para Home
    navigation.replace("Home");
  };

  return (
    <View className="flex-1 bg-slate-950">
      <LinearGradient colors={["#0f172a", "#1e293b"]} style={{ flex: 1 }}>
        <SafeAreaView className="flex-1">
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1"
          >
            <ScrollView
              className="flex-1"
              contentContainerStyle={{ flexGrow: 1 }}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              {/* Header */}
              <View className="items-center mt-16 mb-8 px-6">
                <View className="w-24 h-24 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full items-center justify-center mb-6">
                  <Ionicons name="key" size={48} color="white" />
                </View>
                <Text className="text-4xl font-black text-white mb-2">
                  Ativar Acesso
                </Text>
                <Text className="text-purple-300 text-center text-base">
                  Digite o código que você recebeu
                </Text>
              </View>

              {/* Form */}
              <View className="px-6 flex-1">
                {/* Input do Código */}
                <View className="mb-6">
                  <Text className="text-white font-bold mb-2 text-base">
                    Código de Acesso
                  </Text>
                  <View className="bg-slate-800 rounded-2xl flex-row items-center px-4 border border-slate-700">
                    <Ionicons name="ticket" size={20} color="#94a3b8" />
                    <TextInput
                      value={codigo}
                      onChangeText={setCodigo}
                      placeholder="MAGO-2025-XXXXX"
                      placeholderTextColor="#64748b"
                      autoCapitalize="characters"
                      autoCorrect={false}
                      className="flex-1 py-4 px-3 text-white text-base font-mono"
                    />
                  </View>
                </View>

                {/* Error Message */}
                {error ? (
                  <View className="bg-red-500/20 border border-red-500 rounded-2xl p-4 mb-6">
                    <Text className="text-red-200 text-center font-semibold">
                      {error}
                    </Text>
                  </View>
                ) : null}

                {/* Info Box */}
                <View className="bg-purple-500/20 border border-purple-500 rounded-2xl p-5 mb-6">
                  <View className="flex-row items-center mb-3">
                    <Ionicons name="information-circle" size={24} color="#a855f7" />
                    <Text className="text-purple-300 font-bold ml-2 text-base">
                      Como obter um código?
                    </Text>
                  </View>
                  <Text className="text-purple-200 text-sm leading-6">
                    • O código é enviado após a compra{"\n"}
                    • Válido por 30 dias a partir da ativação{"\n"}
                    • Análises ilimitadas durante a validade{"\n"}
                    • Entre em contato para renovar: seuemail@exemplo.com
                  </Text>
                </View>

                {/* Activate Button */}
                <Pressable
                  onPress={handleActivate}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl py-4 items-center active:opacity-80 border-2 border-purple-400 mb-4"
                >
                  {isLoading ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <View className="flex-row items-center">
                      <Ionicons name="checkmark-circle" size={22} color="white" />
                      <Text className="text-white font-black text-lg ml-2">
                        Ativar Código
                      </Text>
                    </View>
                  )}
                </Pressable>

                {/* Demo Button */}
                <Pressable
                  onPress={() => {
                    setCodigo("MAGO-DEMO-2025");
                  }}
                  className="py-4"
                >
                  <Text className="text-purple-300 text-center text-sm">
                    💡 Dica: Use{" "}
                    <Text className="text-purple-400 font-bold">
                      MAGO-DEMO-2025
                    </Text>{" "}
                    para testar
                  </Text>
                </Pressable>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

export default ActivationScreen;
