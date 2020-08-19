const path = require('path');
    const webpack = require('webpack');

    module.exports = {
        entry: './main.js',
        output: { path: __dirname, filename: 'bundle.js' },
        watch: true,
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "window.jQuery": "jquery"
            })
        ],
        module: {
            loaders: [
                {
                    test: /[\/\\]node_modules[\/\\]some-module[\/\\]index\.js$/,
                    loader: "imports?this=>window"
                },
                {
                    test: /[\/\\]node_modules[\/\\]some-module[\/\\]index\.js$/,
                    loader: "imports?define=>false"
                }
        ]
        }
    }