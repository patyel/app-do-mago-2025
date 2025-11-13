module.exports = function (api) {
  api.cache(true);

  // Detectar se estamos fazendo build para web
  const isWeb = process.env.EXPO_PLATFORM === 'web' || process.env.PLATFORM === 'web';

  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel'
    ],
    // Usa mock para web, plugin real para nativo
    plugins: isWeb ? ['./react-native-worklets-plugin-mock.js'] : ['react-native-reanimated/plugin'],
  };
};
