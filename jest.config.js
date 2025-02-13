module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['./jest.setup.js','@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|react-native-reanimated)/)',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
