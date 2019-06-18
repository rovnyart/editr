module.exports = () => ({
  presets: [
    [require.resolve('@babel/preset-env'), { modules: false, useBuiltIns: 'entry', corejs: '3.0.1' }],
    require.resolve('@babel/preset-react'),
  ],
  plugins: [
    [require.resolve('@babel/plugin-proposal-decorators'), { legacy: true }],
    require.resolve('@babel/plugin-syntax-dynamic-import'),
    [require.resolve('@babel/plugin-proposal-class-properties'), { loose: false }],
    require.resolve('@babel/plugin-proposal-optional-chaining'),
    [require.resolve('@babel/plugin-transform-runtime'), { regenerator: true }],
  ],
  env: {
    development: {
      plugins: [
        'react-hot-loader/babel', // peer dependepncy!
      ],
    },
    production: {
      plugins: [
        require.resolve('@babel/plugin-transform-react-constant-elements'),
        require.resolve('@babel/plugin-transform-react-inline-elements'),
      ],
    },
  },
});
