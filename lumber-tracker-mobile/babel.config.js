module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        'babel-preset-expo',
        {
          jsxImportSource: 'react',
        },
      ],
    ],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@': './src',
            '@components': './src/components',
            '@screens': './src/screens',
            '@stations': './app/stations',
            '@context': './src/context',
            '@utils': './src/utils',
            '@types': './src/types',
            '@api': './src/api',
            '@constants': './src/constants',
            '@hooks': './src/hooks',
            '@styles': './src/styles'
          },
        },
      ],
      'react-native-worklets/plugin',
    ],
  };
};
