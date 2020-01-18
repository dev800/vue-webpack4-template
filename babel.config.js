// https://jestjs.io/docs/en/getting-started#using-babel
// yarn add @babel/preset-env --dev
// yarn add @babel/preset-typescript --dev
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
      '@babel/preset-typescript',
    ],
  ],
};
