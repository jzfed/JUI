const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    //Add the babel loader
    module: {
        rules: [{
            test: /\.js$/, //Run the loader on all .js files
            exclude: /node_modules/, //ignore all files in the node_modules folder
            use: 'babel-loader',
        }]
    },
    //Add local development server config
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 34567,
    }
};