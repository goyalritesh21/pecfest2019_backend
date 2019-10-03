module.exports = {
    entry: "./frontend/src/index.js",
    output: {
        path: __dirname+"/frontend/static/frontend",
        filename: "main.js",
        chunkFilename: "[name].main.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]

            },
            {
                test: /\.(png|jpg|gif)$/,
                loader : 'url-loader'
            }
        ]
    }
};