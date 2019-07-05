'use strict';
const path = require('path');

module.exports = {
  dev: {
    entry: {
      app: './src/main.js',
    },
    templateSPA: './index.html',
    staticPath: './static',
    port: 8093,
    useEslint: false,
  },
  prod: {
    entry: {
      app: './src/main.js',
    },
    assetsPublicPath: './',
    assetsRoot: path.resolve('./dist'), // 编译输出的静态资源路径
    cssExtractPublicPath: '../../',
    templateSPA: './index.html',
    staticPath: './static',
    useEslint: false,
  },
  base: {
    mockPath: './mock',

    JSBabelInclude: ['src', 'mock'],

    prettier: {
      switch: true,
      files: [
        'mockdata/**/*.js',
        '.postcssrc.js',
        'env.config.js',
        'env.param.config.js',
        '.eslintrc.js',
      ],
    },
  },
};
