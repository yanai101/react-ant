const webpack = require("webpack");
const CssExtractPlugin = require("extract-css-chunks-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    devtool: "source-map",
    mode: "production",
    output: {
        publicPath: ''
    },
    module: {
        rules: [

        ]
    },
    plugins: [
        new CssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css",
            hot: true, // optional as the plugin cannot automatically detect if you are using HOT, not for production use
            orderWarning: true, // Disable to remove warnings about conflicting order between imports
            reloadAll: true, // when desperation kicks in - this is a brute force HMR flag
            cssModules: true // if you use cssModules, this can help.
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
            title:'Prod version',
            minify:{
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            }
        }),
        new webpack.DefinePlugin({ 'process.env.API_URL': JSON.stringify('http://PRODURL:8000') })
    ]
}