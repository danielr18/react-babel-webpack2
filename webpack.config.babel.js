import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const defaultEnv = {
    dev: true,
    production: false,
};

export default (env = defaultEnv) => ({
    entry: [
        ...env.dev ? [
            'react-hot-loader/patch',
            'webpack-dev-server/client?http://localhost:8080', // webpack dev server host and port
            'webpack/hot/dev-server' // Enables Hot Module Replacement
        ] : [],
        './src/index.jsx'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        ...env.dev ? [
            //Webpack Development Plugins
            new webpack.HotModuleReplacementPlugin(),
        ] : [
            new ExtractTextPlugin('[name].css')
            //Webpack Production Plugins
        ],
    ],
    module: {
        preLoaders: [{
            test: /\.jsx?$/,
            loader: 'eslint',
            exclude: /node_modules/
        }],
        loaders: [{
            test: /.jsx?$/,
            loader: 'babel',
            exclude: /node_modules/,
            include: path.join(__dirname, 'src'),
            query: {
                babelrc: false,
                presets: [
                    [
                        /* webpack 2 brings native support for ES2015 Modules.
                        It now understands import and export without them being transformed to CommonJS. */
                        "es2015", {
                            "modules": false // disable transformation of the ES2015 module syntax.
                        }
                    ],
                    'react', // Strip flow types and transform JSX into React.createElement calls.
                ],
                plugins: [
                    ...env.dev ? [
                        //Babel Development Plugins
                        'react-hot-loader/babel'
                    ] : [],
                ]
            }
        }, {
            test: /\.(css|scss|sass)$/,
            loader: env.dev ? 'style!css!sass' : ExtractTextPlugin.extract({
                fallbackLoader: "style",
                loader: "css!sass"
            })
        }]
    },
    devServer: {
        hot: env.dev
    }
});
