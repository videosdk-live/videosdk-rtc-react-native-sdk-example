/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const config = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    assetExts: ['png', 'jpg', 'jpeg', 'gif', 'webp'],
    platforms: ['ios', 'android', 'native', 'web'],
    sourceExts: ['js', 'json', 'ts', 'tsx', 'jsx'],
    resolverMainFields: ['react-native', 'browser', 'main'],
    resolveRequest: (context, moduleName, platform) => {
      if (moduleName === 'missing-asset-registry-path') {
        return {
          filePath: require.resolve('react-native/Libraries/Image/AssetRegistry'),
          type: 'sourceFile',
        };
      }
      return context.resolveRequest(context, moduleName, platform);
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
  