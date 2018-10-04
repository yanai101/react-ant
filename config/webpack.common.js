const path = require('path');
const configPath = require('./paths.config');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const InterpolateHtmlPlugin = require("react-dev-utils/InterpolateHtmlPlugin");

const lessAnt = new ExtractTextPlugin({ filename: "css/antd.css", disable: false, allChunks: true});



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
                "awesome-typescript-loader"]
            },
            {
                test: /((\.jsx?)|(\.js))$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    'babel-loader',
                    {
                    loader: 'awesome-typescript-loader',
                    options: {
                        transpileOnly: true, // Note, this means you ignore errors.// Due to legacy, we ignore errors in TypeScript files too, DON'T DO THIS FOR TS FILES
                        useCache: true,
                        configFileName: process.env.TS_CONFIG_CODE || 'tsconfig.json'
                    }
                }],

            },
            {
                test: /\.less$/,
                use:
                lessAnt.extract({
                    fallback: "style-loader",     
                    use: [{
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
                }) 
              },
            /// for css from node modules...
            {
                test: /\.css$/,
                exclude: /(src)/,
                use: lessAnt.extract({
                    fallback: "style-loader",
                    use: [{
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
                })
            },
            /// for rgular css in our project only...
            {
                test: /\.css$/,
                exclude: /(node_modules|bower_components)/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
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
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
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
                })
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
        lessAnt,
        new HtmlWebpackPlugin({
            inject: true,
            hash: true,
        })
    ],
    resolve: {
        extensions: [".js", ".ts", ".tsx", ".css", ".scss", ".less"]
    }
};