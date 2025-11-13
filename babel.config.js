module.exports = function (api) {
  api.cache(true);

  // Detectar se estamos fazendo build para web
  const isWeb = process.env.EXPO_PLATFORM === 'web' || process.env.PLATFORM === 'web';

  if (isWeb) {
    // Build web: SEM nativewind/babel que causa problema
    return {
      presets: [
        ['babel-preset-expo', { jsxImportSource: 'nativewind' }]
      ],
      plugins: [],
    };
  }

  // Build nativo: COM nativewind/babel e reanimated
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel'
    ],
    plugins: ['react-native-reanimated/plugin'],
  };
};
