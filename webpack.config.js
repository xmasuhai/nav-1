// const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const globby = require('globby');
const path = require('path');
const paths = globby.sync(['./src/pages/*.js']);
const entry = {};
const plugin = [];

// (async () => {
//   const paths = await globby(['src/pages/']);
//   console.log("文件列表");
//   console.log(paths);
//   const names = paths.map(p => {
//     return paths.basename(p).split('.').slice(0, -1)[0]
//   })
//   console.log(names)
// })();
// 同步
paths.map(p => {
  const name = paths.basename(p).split('.').slice(0, -1)[0]
  entry[name] = p
  plugin.push(
    new HtmlWebpackPlugin({
      filename: `${name}.html`,
      chunks: [name]
    })
  )
});
module.exports = {
  entry: entry,
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin()
  ],
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }],
    rules: [{
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader']
    }]
  }
};