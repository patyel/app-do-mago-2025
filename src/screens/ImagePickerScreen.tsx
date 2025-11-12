// Tela de Upload de Imagem
import React, { useState } from "react";
import { View, Text, Pressable, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";

type CameraScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Camera">;
};

const CameraScreen: React.FC<CameraScreenProps> = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const pickImage = async () => {
    // Solicita permissão
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permissão Necessária",
        "Precisamos de acesso à sua galeria para você enviar fotos"
      );
      return;
    }

    // Abre o seletor de imagens
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const analyzeImage = () => {
    if (selectedImage) {
      navigation.navigate("Analysis", { imageUri: selectedImage });
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
  };

  return (
    <View className="flex-1 bg-slate-950">
      <LinearGradient colors={["#0f172a", "#1e293b"]} style={{ flex: 1 }}>
        <SafeAreaView className="flex-1">
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 pt-4 pb-6">
            <Pressable
              onPress={() => navigation.goBack()}
              className="w-12 h-12 bg-slate-800 rounded-full items-center justify-center active:opacity-70"
            >
              <Ionicons name="arrow-back" size={24} color="#a855f7" />
            </Pressable>
            <Text className="text-white text-xl font-bold">Enviar Foto</Text>
            <View className="w-12" />
          </View>

          {/* Content */}
          <View className="flex-1 px-6 justify-center">
            {!selectedImage ? (
              // Estado: Nenhuma imagem selecionada
              <View className="items-center">
                <View className="w-32 h-32 bg-purple-500/20 rounded-full items-center justify-center mb-8">
                  <Ionicons name="images" size={64} color="#a855f7" />
                </View>

                <Text className="text-white text-2xl font-bold text-center mb-3">
                  Escolha uma Foto
                </Text>
                <Text className="text-slate-400 text-center mb-8 px-4">
                  Selecione uma foto do painel da roleta mostrando os últimos resultados
                </Text>

                <Pressable
                  onPress={pickImage}
                  className="bg-purple-500 rounded-2xl py-4 px-8 items-center active:opacity-80"
                >
                  <View className="flex-row items-center">
                    <Ionicons name="cloud-upload" size={24} color="white" />
                    <Text className="text-white font-bold text-lg ml-2">
                      Escolher da Galeria
                    </Text>
                  </View>
                </Pressable>

                {/* Dicas */}
                <View className="mt-12 bg-slate-800 rounded-2xl p-5 w-full">
                  <View className="flex-row items-center mb-3">
                    <Ionicons name="bulb" size={20} color="#a855f7" />
                    <Text className="text-white font-bold ml-2">Dicas</Text>
                  </View>
                  <Text className="text-slate-300 text-sm leading-6">
                    • Certifique-se que os números estão visíveis{"\n"}
                    • Use boa iluminação{"\n"}
                    • Evite reflexos e sombras{"\n"}
                    • Foto deve mostrar pelo menos 8 números
                  </Text>
                </View>
              </View>
            ) : (
              // Estado: Imagem selecionada
              <View className="items-center">
                <Text className="text-white text-xl font-bold mb-6">
                  Prévia da Foto
                </Text>

                {/* Preview da imagem */}
                <View className="w-full aspect-[4/3] rounded-3xl overflow-hidden mb-6 border-2 border-purple-500">
                  <Image
                    source={{ uri: selectedImage }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                </View>

                {/* Botões */}
                <View className="w-full space-y-3">
                  <Pressable
                    onPress={analyzeImage}
                    className="bg-purple-500 rounded-2xl py-4 items-center active:opacity-80"
                  >
                    <View className="flex-row items-center">
                      <Ionicons name="sparkles" size={24} color="white" />
                      <Text className="text-white font-bold text-lg ml-2">
                        Analisar com Magia IA
                      </Text>
                    </View>
                  </Pressable>

                  <Pressable
                    onPress={clearImage}
                    className="bg-slate-800 rounded-2xl py-4 items-center active:opacity-80"
                  >
                    <View className="flex-row items-center">
                      <Ionicons name="trash" size={20} color="#ef4444" />
                      <Text className="text-red-400 font-bold ml-2">
                        Escolher Outra Foto
                      </Text>
                    </View>
                  </Pressable>
                </View>
              </View>
            )}
          </View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

export default CameraScreen;
