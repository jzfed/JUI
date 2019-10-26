const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractLess = new ExtractTextPlugin({
    filename: "jui.css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    //Add the babel loader
    module: {
        rules: [{
                test: /src\.js$/, //Run the loader on all .js files
                exclude: /node_modules/, //ignore all files in the node_modules folder
                use: 'babel-loader',
            },
            // compiles Less to CSS 
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: extractLess.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "less-loader"
                    }]
                })
            },
            {
                test: /\.css$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }]
            }
        ]
    },
    plugins: [
        extractLess
    ],
    //Add local development server config
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 34567,
    }
};