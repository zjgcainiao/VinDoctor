// Adding expo-router/babel plugin in the plugins array 

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [

      "@babel/plugin-proposal-export-namespace-from",
      "react-native-reanimated/plugin",
    // "@gluestack-style/babel-plugin-styled-resolver",
      require.resolve("expo-router/babel"),
    ],
  };
};
