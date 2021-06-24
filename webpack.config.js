const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: 'development',

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


        ]

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
            filename: 'style.css',
        }),
        new CopyPlugin({
            patterns: [
                { from: 'src/assets', to: 'assets/' },
            ],
        }),

    ]
}