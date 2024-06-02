// 实现打包成umd,  CDN产物
const merge = require('webpack-merge');
const common = require('../../webpack.common.js');
const path = require('path');

// merge外面的webpack.common.js配置
module.exports = merge(common, {
  entry: './es/index.js',
  output: {
    filename: 'encode-hooks.js',
    library: 'encode-hooks',
    // 指定打包的路径
    path: path.resolve(__dirname, './dist'),
  },
});
