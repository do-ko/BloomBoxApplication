// babel.config.js
module.exports = {
    presets: [
      '@babel/preset-env',
      '@babel/preset-react',
      '@babel/preset-flow',
      'module:metro-react-native-babel-preset'
    ],
    
    plugins: [
      // ... other plugins
      ["@babel/plugin-transform-private-methods", { "loose": true }],
      ["@babel/plugin-transform-private-property-in-object", { "loose": true }]
    ]

  }