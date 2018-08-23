 const path = require('path'),
       webpack = require('webpack'),
       ExtractTextPlugin = require('extract-text-webpack-plugin'),
       CleanPlugin = require('clean-webpack-plugin');

 module.exports = {
     entry: {
         main: './src/scripts/main.js'
     },
     output: {
        // path.resolve第二参数不必加/，不然报错
         path: path.resolve(__dirname, 'source'),
         filename: 'mudong.bundle.js'
     },
     module: {
         rules: [{
                 test: path.resolve(__dirname, 'src/scripts/jquery'),
                 use: [{
                     loader: 'expose-loader',
                     options: '$'
                 }]
             },
             {
                 test: /\.js$/,
                 include:[
                   path.resolve(__dirname,'src/scripts')
                 ],
                 use: {
                     loader: 'babel-loader',
                     options: {
                        // ?
                         presets: ['es2015']
                     }
                 },
             },
             {
                 test: /\.(styl|css)$/,
                 include:[
                   path.resolve(__dirname,'src/css')
                 ],
                 use: ExtractTextPlugin.extract({
                     fallback: 'style-loader',
                     use: [{
                             loader: 'css-loader',
                             // options: {
                             //     importLoaders: 1,
                             // }
                         },
                         {
                             loader: 'postcss-loader',
                             options: {
                                // ?
                                 plugins: [require("autoprefixer")({
                                     browsers: ['last 5 versions']
                                 })]
                             }
                         },
                         'stylus-loader'
                     ]
                 })
             },
             {
                 test: /\.(png|jpg|gif)$/,
                 include:[
                   path.resolve(__dirname,'source/images')
                 ],
                 use: [{
                     loader: 'url-loader',
                     options: {
                         name: '/newimg/[name].[hash:4].[ext]',
                         limit: 4096,
                         fallback:"file-loader"
                     }
                 }]
             },
             {
                 test: /\.(woff|svg|eot|ttf)\??.*$/,
                 include:[
                   path.resolve(__dirname,'src/css/fonts'),
                 ],
                 use: {
                     loader: 'file-loader',
                     options: {
                         name: '/fonts/[name].[hash:4].[ext]'
                     }
                 }
             }
         ]
     },
     plugins: [
         //npm install extract-text-webpack-plugin@next -D，webpack4加上@next
         new ExtractTextPlugin('mudong.min.css'),
         new CleanPlugin('source', {
             exclude: ['images', 'fonts','404.html']
         }),
         // 按发生顺序排序模块和块，节省空间，这样常用的模块和块获得更小的ID
         new webpack.optimize.OccurrenceOrderPlugin()
     ],
     // uglifyjs-webpack-plugin使用下面方式替代
     optimization:{
        minimize:true,
        // splitChunks:{
        //     chunks:"all",
        // },
     },
 }