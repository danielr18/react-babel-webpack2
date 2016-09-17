import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import {HotModuleReplacementPlugin} from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const defaultEnv = {
    dev: true,
    production: false,
};

export default (env = defaultEnv) => ({
  entry: [
    ...env.dev ? [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/dev-server',
    ] : [],
    path.join(__dirname, 'src/index.jsx'),
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    ...env.dev ? [
      new HotModuleReplacementPlugin(),
    ] : [
      new ExtractTextPlugin('[name].css'),
    ],
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.join(__dirname, 'src/index.html'),
    }),
  ],
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        include: path.join(__dirname, 'src'),
        query: {
          babelrc: false,
          presets: [
            ['es2015', { modules: false }],
            'react',
          ],
        }
      },
      {
        test: /\.(css|scss|sass)$/,
        loader: env.dev ? 'style!css!sass' : ExtractTextPlugin.extract({
          fallbackLoader: 'style',
          loader: 'css!sass'
        })
      },
    ]
  },
  devServer: {
    hot: env.dev
  },
  devtool: env.dev ? 'cheap-module-eval-source-map' : 'cheap-module-source-map',
});
