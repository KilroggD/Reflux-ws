var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'dst');
var APP_DIR = path.resolve(__dirname, 'src/');

var config = {
    entry: APP_DIR + '/main.jsx',
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './dst'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?/,
                include: APP_DIR,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
};

module.exports = config;