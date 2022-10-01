const path = require('path');

module.exports = {
  entry:   path.resolve(__dirname, "./src/index.ts"),
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.ttf$/,
        use: ['file-loader']
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'bundle.css',
            },
          },
          { loader: 'extract-loader' },
          { loader: 'css-loader' },
          {
            loader: 'sass-loader',
            options: {
              // Prefer Dart Sass
              implementation: require('sass'),

              // See https://github.com/webpack-contrib/sass-loader/issues/804
              webpackImporter: false,
              sassOptions: {
                includePaths: ['node_modules'],
              },
            },
          },
        ]
      }
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'arkeos-flowrigami.js',
    library: {
        name: 'arkeos-flowrigami',
        type: 'umd',
    },
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  externals: {
    lodash: {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: 'lodash',
      root: '_',
    },
  },
};