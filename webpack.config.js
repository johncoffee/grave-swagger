const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const {execSync} = require('child_process')
const dev = !process.argv.some(val => val.includes('production'))
console.log("Webpack mode "+ (dev ? 'development' : 'production'))

module.exports = {
  mode: dev ? 'development' : 'production',
  entry: [
    path.join(__dirname, 'src', 'index.ts'),
    path.join(__dirname, 'src/style/normalize.scss'),
    path.join(__dirname, 'src/style/styles.scss'),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    get filename() {
      let name = `[name].js`;
      if (!dev) {
        let suffix
        try {
          const resultBuffer = execSync('git rev-parse --short --verity HEAD')
          suffix = resultBuffer.toString().trim()
        }
        catch (e) {
          suffix = 'unknown-commit'
          console.error("Failed finding git commit hash")
        }
        name = name.replace('[name]', `[name]-${suffix}`)
      }
      return name
    },
  },
  module: {
    rules: [
      {
      test: /\.(sa|sc|c)ss$/,
        use: [
          // fallback to style-loader in development
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ]
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.ts', '.js' ]
  },
  plugins: [
    // new MiniCssExtractPlugin({
    //   // Options similar to the same options in webpackOptions.output
    //   // both options are optional
    // })
    new MiniCssExtractPlugin({
      // filename: "[name].css",
      // chunkFilename: "[id].css"
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: dev ? '[name].css' : '[name][hash].min.css',
      chunkFilename: dev ? '[id].css' : '[id][hash].min.css',
    })
  ],
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  devtool: 'sourcemap',
  devServer: {
    publicPath: "/dist/", // renaming the server output
    hot: false,
  }
};
