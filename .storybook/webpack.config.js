// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add addional webpack configurations.
// For more information refer the docs: https://getstorybook.io/docs/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

module.exports = {
  plugins: [
    // your custom plugins
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.global\.sass$/,
        loader: 'style-loader!css-loader!sass-loader'
      },
      {
        test: /\.sass$/,
        exclude: [/\.global\.sass$/],
        loader: 'style-loader!css-loader?modules&localIdentName=[local]___[hash:base64:5]&importLoaders=1!sass-loader?indentedSyntax=true'
      },
    ],
  },
};
