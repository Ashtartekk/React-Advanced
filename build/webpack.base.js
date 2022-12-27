const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const WebpackBar = require("webpackbar");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDev = process.env.NODE_ENV === 'development'

console.log("NODE_ENV", process.env.NODE_ENV);
console.log("BASE_ENV", process.env.BASE_ENV);
module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "js/chunk-[contenthash].js", //定义叫什么名字
    path: path.join(__dirname, "../dist"), //输出的主要路径
    clean: true, //重新打包自动删除dist文件夹
    assetModuleFilename: "images/[name].[contenthash:8][ext]", //设置图片输出路径以及文件名称
  },
  module: {
    rules: [
      {
        test: /.(woff2?|eot|ttf|otf)$/,//匹配字体图标文件
        type: "asset",//type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 //小于10kb转base64位
          }
        },
        generator: {
          filename: 'fonts/[name].[contenthash:8][ext]' //文件输出目录和命名
        }
      },
      {
        test: /.(mp4|webm|ogg|mp3|wav|flac|aac)$/, //匹配媒体文件
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,//小于10kb转base64位
          }
        },
        generator: {
          filename: 'media/[name].[contenthash:8][ext]' //文件输出目录和命名
        }
      },
      {
        test: /\.css$/, //匹配所有的 css 文件
        enforce: 'pre',
        include: [path.resolve(__dirname, '../src')],
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ]
      },
      {
        test: /\.less$/, //匹配所有的 less 文件
        enforce: 'pre',
        include: [path.resolve(__dirname, '../src')],
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.scss$/, //匹配所有的 scss 文件
        enforce: 'pre',
        include: [path.resolve(__dirname, '../src')],
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/, type: 'asset/resource',
        parser: {
          //转base64条件
          dataUrlCondition: { maxSize: 25 * 1024, } //25kb
        }
      }, //webpack5写法
      {
        test: /.(ts|tsx)$/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(ts|tsx)$/,
        include: [path.resolve(__dirname, '../src')],
        enforce: 'pre',
        use: ['thread-loader', 'babel-loader']
      },
    ],
  },
  resolve: {
    modules: [path.resolve(__dirname, '../node_modules')], // 查找第三方模块只在本项目的node_modules中查找
    //路径别名
    alias: {
      '@': path.resolve('./src'), //pwd当前目录下的src等于@
      assets: '~/assets',
      tools: '~/tools'
    },
    //引入文件时省略后缀
    extensions: [".js", ".tsx", ".ts"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"), //模板取定义root节点的模板
      inject: 'body', //自动注入静态资源
    }),
    new WebpackBar({
      color: "#85d", //进度条颜色
      basic: false, //日志报告器
      profile: false, //探查器
    }),
    new webpack.DefinePlugin({
      "process.env.BASE_ENV": JSON.stringify(process.env.BASE_ENV),
    }),
  ],
  cache: {
    type: 'filesystem' // 使用文件缓存
  }
};
