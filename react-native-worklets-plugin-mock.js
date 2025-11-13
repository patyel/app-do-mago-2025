// Mock para react-native-worklets/plugin e react-native-reanimated/plugin
// Usado apenas para build web onde esses plugins não são necessários
module.exports = function() {
  return {
    name: 'worklets-mock-plugin',
    visitor: {}
  };
};
