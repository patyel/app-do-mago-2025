module.exports = function (api) {
  api.cache(true);

  // Detectar se estamos fazendo build para web
  // No EAS Build, não há EXPO_PLATFORM definido, então assumimos nativo
  const isWeb = process.env.EXPO_PLATFORM === 'web' || process.env.PLATFORM === 'web';

  // Para builds nativos (Android/iOS), sempre incluir o plugin
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      isWeb ? undefined : 'nativewind/babel'
    ].filter(Boolean),
    plugins: isWeb ? [] : ['react-native-reanimated/plugin'],
  };
};
