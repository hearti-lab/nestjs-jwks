const Path = require('path');
const NodeExternals = require('webpack-node-externals');

module.exports = {
    entry: ['./src/index.ts'],
    mode: 'development',
    target: 'node',
    node: {
        __dirname: true,
        __filename: true
    },
    externals: [NodeExternals()],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        plugins: []
    },
    plugins: [],
    output: {
        path: Path.join(__dirname, 'lib'),
        filename: 'index.js'
    },
    optimization: {
        nodeEnv: false
    }
};
