const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack');
const dotenv = require('dotenv');
dotenv.config();
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: `${process.env.API_ORIGIN}`,
  },
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          API_KEY: JSON.stringify(process.env.API_KEY),
          API_ORIGIN: JSON.stringify(process.env.API_ORIGIN),
        },
      }),
    ],
  },
})