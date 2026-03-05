const path = require('path')

module.exports = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
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
        alias: {
            '@interfaces': path.resolve(__dirname, 'src/interfaces/'),
            '@config': path.resolve(__dirname, 'src/config/'),
            '@lib': path.resolve(__dirname, 'src/lib/'),
            '@': path.resolve(__dirname, 'src/')
        },
    },
    mode: 'production'
}