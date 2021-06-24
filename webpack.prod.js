const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    mode: 'production',
    output: {
        filename: 'main.[contenthash].js'
    },
    module: {
        rules: [{
                test: /\.html$/,
                loader: 'html-loader',

                options: {
                    sources: false,
                    minimize: false
                }
            },
            {
                test: /\.css$/i,
                exclude: /style.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /style.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [{
                    loader: 'file-loader',
                }, ],
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },


        ]

    },
    optimization: {
        minimize: true,
        minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
    },

    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html',
            inject: 'body'
        }),
        new HtmlWebPackPlugin({
            template: './src/medicos.html',
            filename: './medicos.html',
            inject: 'body'
        }),

        new MiniCssExtractPlugin({
            filename: '[name].[fullhash].css',
        }),
        new CopyPlugin({
            patterns: [
                { from: 'src/assets', to: 'assets/' },
            ],
        }),

    ]
}