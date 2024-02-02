module.exports = {
  root: true,
  extends: ['@react-native-community', 'plugin:sonarjs/recommended'],
  plugins: ["sonarjs"],
  rules: {
    "camelcase": [2, {"properties": "never"}],
    "PascalCase": [2, {"properties": "never"}]
  }
};
