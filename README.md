本文件下的程序为半成品，目的在于验证技术，请勿直接用于开发生产！

VUEJS + WEBPACK 打包
thinkjs后台+socket.io
展示互动插件
在线视频直播+PPT课堂+聊天室

首次运行前请核对参数：

前台：
1.开启展示互动多媒体直播客户端
http://hls.gensee.com/training/site/r/63844980
老师口令：	123456
助教口令：	1234567
学生客户端口令：12345678
学生WEB端口令：	123456789
SDK  ID:	zAJbojojaA

2.检查front/src/js/liveroom.js的接口信息
>ownerId:'zAJbojojaA',//SDK id
>authCode:'123456789',//登陆口令

>Vue.use(socket,'ws://127.0.0.1:8360');

3.核对dev-server.js服务器的IP
4.核对webpack.config.js的webpack-dev-server客户端IP

后台：
1.检查socket.io是否安装成功
2.核对src/config/config.js的IP
host: '127.0.0.1'

后台启动：
npm start
前台启动：
npm run dev

测试地址：
http://127.0.0.1:8090/liveroom.html
测试账号：13412345678
密码：123456