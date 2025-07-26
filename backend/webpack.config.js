const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: './src/main.ts',
    target: 'node',
    externals: [nodeExternals()],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'main.js',
      clean: true
    },
    resolve: {
      extensions: ['.ts', '.js'],
      plugins: [
        new TsconfigPathsPlugin({
          configFile: path.resolve(__dirname, 'tsconfig.json')
        })
      ]
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
                configFile: path.resolve(__dirname, 'tsconfig.json')
                // 🔴 projectReferences eliminado por innecesario
              }
            }
          ],
          exclude: /node_modules/
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin()
    ],

   stats: {
  warningsFilter: (warning) => {
    // Filtra solo las advertencias específicas que queremos ignorar
    const ignoredWarnings = [
      'node_modules/express/lib/view.js',
      'node_modules/@nestjs/common/utils/load-package.util.js',
      'node_modules/@nestjs/core/helpers/load-adapter.js'
    ];
    return !ignoredWarnings.some(pattern => warning.includes(pattern));
  }
},





    optimization: {
      minimize: false,
      minimizer: []
    },
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    performance: {
      hints: false
    },
    cache: {
      type: 'filesystem',
      buildDependencies: {
        config: [__filename]
      }
    }
  };
};
