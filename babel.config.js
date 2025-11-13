module.exports = function (api) {
  api.cache(true);

  // Detectar se estamos fazendo build para web
  const isWeb = process.env.EXPO_PLATFORM === 'web' || process.env.PLATFORM === 'web';

  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel'
    ],
    // Só adiciona o plugin do reanimated se NÃO for web
    plugins: isWeb ? [] : ['react-native-reanimated/plugin'],
  };
};
