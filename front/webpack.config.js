var path=require('path');// 导入路径包
var webpack=require('webpack');
// var autoprefixer=require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');//提取样式插件
var HTMLWebpackPlugin=require('html-webpack-plugin');//静态资源 版本控制

var DEVELOPMENT=process.env.NODE_ENV==='development';
var PRODUCTION=process.env.NODE_ENV==='production';
//// 生产环境才需要用到的代码，比如控制台里看到的警告
var entry=PRODUCTION
    ?   ['./src/js/liveroom.js']
    :   [
        './src/js/liveroom.js',
        'webpack/hot/dev-server',//开启热重载 hot
        'webpack-dev-server/client?http://192.168.0.78:8090'//添加webpack-dev-server客户端
    ];
const extractCSS = new ExtractTextPlugin({//提取样式插件
    //'style-[contenthash:10].css'//根据内容生成hash值
    //,{allChunks: true}//所有分离文件的样式也会全部压缩到一个文件上
    //filename: "[name].[contenthash].css",
    //disable: process.env.NODE_ENV === "development"
    filename: 'css/css-[contenthash:10].css',
    disable: DEVELOPMENT
});
const extractLESS = new ExtractTextPlugin({
    filename: 'css/less-[contenthash:10].css',
    disable: DEVELOPMENT
});
var plugins=PRODUCTION
    ?   [
        new webpack.optimize.UglifyJsPlugin({
            // 最紧凑的输出
            //beautify: false,
            // 删除所有的注释
            //comments: false,
            //compress: {
                // 在UglifyJs删除没有用到的代码时不输出警告
                //warnings: false,
                // 删除所有的 `console` 语句
                // 还可以兼容ie浏览器
                //drop_console: true,
                // 内嵌定义了但是只用到一次的变量
                //collapse_vars: true,
                // 提取出出现多次但是没有定义成变量去引用的静态值
                //reduce_vars: true,
            //}
        }),// 压缩webpack 后生成的代码较长时间，通常推到生产环境中才使用
        extractCSS,
        extractLESS,
        new HTMLWebpackPlugin({// webpack 指定目录(package内设置)生成静态HTML文件//自动生成html插件
            template:'index-template.html'
        })
    ]
    :   [
        new webpack.HotModuleReplacementPlugin()//全局开启代码热替换 如果是CLI这里则不用写
    ];
plugins.push(
    new webpack.DefinePlugin({
        DEVELOPMENT:JSON.stringify(DEVELOPMENT),
        PRODUCTION:JSON.stringify(PRODUCTION)
    })
);

/*plugins.push(
    new webpack.ProvidePlugin({//把全局变量插入到所有的代码中
        $:"jquery",
        jQuery:"jquery",
        "window.jQuery":"jquery"
    })
);*/
const cssIdentifier=PRODUCTION ? '[hash:base64:10]' : '[path][name]---[local]';

const cssLoader=PRODUCTION ? extractCSS.extract({
        use: [
            {loader:'css-loader?localIdentName=' + cssIdentifier, options:{minimize:true}},
            {loader:'postcss-loader'}
        ],
        fallback: "style-loader"
}) : [
        {loader:'style-loader'},
        {loader:'css-loader?localIdentName=' + cssIdentifier, options:{minimize:true}},
        {loader:'postcss-loader'}
    ];
const lessLoader=PRODUCTION ? extractLESS.extract({
        use: [
            {loader:'css-loader?localIdentName=' + cssIdentifier, options:{minimize:true}},
            {loader: "less-loader", options: {strictMath: true,noIeCompat: true}}
        ],
        fallback: "style-loader"
    }) : [
        {loader:'style-loader'},
        {loader:'css-loader?localIdentName=' + cssIdentifier, options:{minimize:true}},
        {loader: "less-loader", options: {strictMath: true,noIeCompat: true}}
    ];
module.exports={
    externals:{//使用externals配置后,webpack可以不处理应用的某些依赖库，不编译进文件中
        'jquery':'jQuery'
    },
    devtool:'source-map',//打包代码的同时生成一个sourcemap文件，并在打包文件的末尾添加//# souceURL，注释会告诉JS引擎原始文件位置
    entry:entry,//入口文件
    plugins:plugins,
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.min.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: "/node_module/",
                use:[{
                    loader: "babel-loader",//?cacheDirectory开启babel缓存机制
                    options: {
                        cacheDirectory: true
                    }
                }]
            },
            {
                test: /\.css$/,
                exclude: "/node_module/",
                use: cssLoader
            },
            {
                test: /\.less$/,
                exclude: "/node_module/",
                use: lessLoader
            },
            {
                test: /\.vue$/,
                exclude: "/node_module/",
                use: [{
                    loader:"vue-loader",
                    /*options: {
                        loaders: {
                            css: cssLoader,
                            js: 'babel-loader',
                        }
                    }*/
                    options: {
                        cssModules: {
                            localIdentName: '[path][name]---[local]---[hash:base64:5]',//标识
                            camelCase: true  //驼峰风格
                        }
                    }
                }]
            },
            {
                test: /\.(png|jpg|gif)$/,
                exclude: "/node_module/",
                use:[{
                    //"url-loader?limit=20000&name=images/[hash:12].[ext]"
                    loader: "url-loader",
                    options:{
                        limit:5000,
                        name:'images/[hash:12].[ext]'
                    }
                }]
            }
        ]
        /*,loaders:[
            {
                test: /\.css$/,
                loaders: cssLoader,
                exclude: "./node_modules/"
            }
        ]*/
    },
    output:{
        path:path.join(__dirname,'dist'),// 指定打包之后的文件夹
        publicPath:PRODUCTION ? '/' : '/dist/',// 指定资源文件引用的目录
        filename: PRODUCTION ? 'js/bundle.[hash:12].min.js' : 'bundle.js'// 指定打包为一个文件 bundle.js
        //filename: '[name].js' // 可以打包为多个文件
    }
};