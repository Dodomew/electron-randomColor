const merge = require('webpack-merge');
const common = require('./webpack.config.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    "sass-loader", //sass-loader transforms Sass into CSS.
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('autoprefixer')({...options}),
                            ]
                         }
                    },
                ]
            },
        ]
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
               test: /\.js(\?.*)?$/i,
               exclude: /(node_modules|bower_components)/,
           }),
        ],
    },
});
