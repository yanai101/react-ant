const path = require('path');
const configPath = require('./paths.config');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssExtractPlugin = require("extract-css-chunks-webpack-plugin");

const InterpolateHtmlPlugin = require("react-dev-utils/InterpolateHtmlPlugin");

const lessAnt =   require("extract-css-chunks-webpack-plugin");

// new CssExtractPlugin({ filename: "css/antd.css",chunkFilename: "[id].css",
// hot: true, // optional as the plugin cannot automatically detect if you are using HOT, not for production use
// orderWarning: true, // Disable to remove warnings about conflicting order between imports
// reloadAll: true, // when desperation kicks in - this is a brute force HMR flag
// cssModules: true // if you use cssModules, this can help.})
// });



module.exports = {
    entry: {
        app: './src/index.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: configPath.buildPath,
    },
    module: {
        rules: [
            // *** if not use tsx ***
            // {
            //     test: /\.js$/,
            //     enforce: "pre",
            //     exclude: /node_modules/,
            //     use: ["source-map-loader" ,"babel-loader"]
            // },
            {
                test: /\.tsx?$/,
                use: [
                    {
                    loader : "babel-loader",
                    options:{
                        plugins: [
                            ['import', { libraryName: "antd", libraryDirectory: "es" ,style: "css" }] //style: true  --> for less 
                        ]
                    }
                },
                "awesome-typescript-loader"
                ]
            },
            {
                test: /((\.jsx?)|(\.js))$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                     {
                    loader : "babel-loader",
                    options:{
                        plugins: [
                                ['import', { libraryName: "antd", libraryDirectory: "es" ,style: "css" }] //style: true  --> for less 
                            ]
                        }
                    },
                    {
                    loader: 'awesome-typescript-loader',
                    options: {
                            transpileOnly: true, // Note, this means you ignore errors.// Due to legacy, we ignore errors in TypeScript files too, DON'T DO THIS FOR TS FILES
                            useCache: true,
                            configFileName: process.env.TS_CONFIG_CODE || 'tsconfig.json'
                        }
                    }
                ],

            },
            {
                test: /\.less$/,
                use:[
                    lessAnt.loader,
                    {
                        loader: "css-loader",
                        options: {
                            modules: false,
                            importLoaders: 1, // make sure sass-loader is used on imported assets
                            // localIdentName: "[local]__[name]__[hash:base64:5]",
                            // publicPath: configPath.buildPath //"./dist"
                        }
                    },
                    {
                        loader :'sass-loader',
                        options: {
                            paths: [path.resolve('./node_modules/antd/lib/style/color/colors.less')]
                        }
                    }
                ]
            },
            // /// for css from node modules...
            {
                test: /\.css$/,
                exclude: /(src)/,
                use:[
                    lessAnt.loader,
                    {
                        loader: "css-loader",
                        options: {
                            modules: false,
                            importLoaders: 1, // make sure sass-loader is used on imported assets
                            localIdentName: "[local]__[name]__[hash:base64:5]",
                            publicPath: configPath.buildPath //"./dist"
                        }
                    },
                    {
                        loader: 'postcss-loader',
                    
                    }
                    
                ]
            },
            /// for rgular css in our project only...
            {
                test: /\.css$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    CssExtractPlugin.loader,
                    {
                    loader: "css-loader",
                    options: {
                        modules: true,
                        importLoaders: 1, // make sure sass-loader is used on imported assets
                        localIdentName: "[local]__[name]__[hash:base64:5]",
                        publicPath: configPath.buildPath //"./dist"
                    }
                },
                {
                    loader: 'postcss-loader',
                }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    CssExtractPlugin.loader,
                    {
                    loader: "css-loader",
                    options: {
                        modules: true,
                        importLoaders: 1, // make sure sass-loader is used on imported assets
                        localIdentName: "[local]__[name]__[hash:base64:5]",
                        publicPath: configPath.buildPath //"./dist"
                    }
                },
                {
                    loader: 'postcss-loader',
                },
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'media/[name].[hash:8].[ext]',
                    },
                }]

            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[path]/font/[name].[ext]',
                        length: 10000
                    }
                }]
            }
        ]
    },
    plugins: [
        new lessAnt({ filename: "css/antd.css",chunkFilename: "[id].css",
        hot: true, // optional as the plugin cannot automatically detect if you are using HOT, not for production use
        orderWarning: true, // Disable to remove warnings about conflicting order between imports
        reloadAll: true, // when desperation kicks in - this is a brute force HMR flag
        cssModules: true // if you use cssModules, this can help.})
        }),
        new CssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css",
            hot: true, // optional as the plugin cannot automatically detect if you are using HOT, not for production use
            orderWarning: true, // Disable to remove warnings about conflicting order between imports
            reloadAll: true, // when desperation kicks in - this is a brute force HMR flag
            cssModules: true // if you use cssModules, this can help.
        }),
    ],
    resolve: {
        extensions: [".js", ".ts", ".tsx", ".css", ".scss", ".less"]
    }
};
