require('../less/liveroom.less');
require('../less/dialog.less');
import Vue from 'vue';
import Vuex from 'vuex';
import socket from 'vue-socket.io';
import mixin from './vue/myPlugin';
import leftComponent from './vue/leftComponent.vue';//左侧组件
import centerComponent from './vue/centerComponent.vue';//中间组件
import rightComponent from './vue/rightComponent.vue';//右侧组件
import dialogComponent from './vue/dialogComponent.vue';
//import myInfo from './data/myInfo';//本机用户信息
import infoData from './data/infoData';//接收到的消息
import dlgHtmlArr from './data/dlgHtmlArr';//弹窗html

let liveInfo={
    ownerId:'zAJbojojaA',//SDK id  'zQPZUoEzky',//
    authCode:'123456789',//登陆口令   '444444',//
    //uName:'user_test',//用户名
    data:{
        stuid:null
    }
};
//sessionStorage.clear();
let getUserData=sessionStorage.getItem('userdata');

/*let sessionData=JSON.parse(getSession);
let stuid=sessionData.stuid;*/

Vue.use(socket,'ws://192.168.0.78:8360');
function storageData(obj){
    this.stuid=obj.stu_id;
    this.mobile=obj.mobile;
    this.name=obj.name;
    this.titlename=obj.titlename;
}
let start=new Vue({
    sockets:{
        connect(){
            console.log('已连接');
        },
        user_data(_data){
            let s=new storageData(_data);
            let _userdata=JSON.stringify(s);
            console.log('set:');
            console.log(_userdata);
            let setSession=window.sessionStorage;
            setSession.setItem('userdata',_userdata);
            $('.loginBox').remove();
            window.location.reload();
        }
    }
});
if(getUserData){
    liveInfo.data=JSON.parse(getUserData);
    $('.outBox').show();
    pageView();
}else{
    $('.outBox').hide();
    if(!$("#dlgForm").html()){
        $('body').append(dlgHtmlArr[0]);
    }
    $('.dlgBtn').bind('click',function(){
        let n=$("#dlgForm").find('#username').val();
        let p=$("#dlgForm").find('#password').val();
        if(!n || !p){
            alert("用户名或密码有误！");
            return;
        }
        let logindata={
            username:n,
            password:p,
        };
        start.$socket.emit('login', logindata,function(da){
            alert('112233');
            console.log(da);
        });
    });
}

function pageView(){
//1. 根据组获得通讯通道
let channel = channel||GS.createChannel();
/*channel.bind("onNetSettings",function(event){
    console.log(event.data)
});*/
//SDK加载完成
channel.bind("onDataReady", function (event) {
    console.log("minInterval:");
    console.log(event.data.minInterval);
    channel.send("requireNetSettings");
});
channel.bind("onStart",function(event){
    console.log('onStart');
    console.log(event.data);
});
/*///用户列表
channel.bind("onUserList", function (event) {
    console.log(event.data);
});

 //2. 通过通道监听点名事件
 channel.bind("onRollcall", function (event) {
    console.log(event.data.timeout);
 });
//2. 通过通道监听问答事件
channel.bind("onQA", function (event) {
    alert(event.data.question);
});
//3.通过通道提问，提问，私聊，公聊的提交可以设置回调函数，同时resultInfo的格式为//{result:true|false,data:data},data即为提交的数据
channel.send("submitRollcall", {
    "id" : 23534677685687
},function(resultInfo){
});
///监听消息
channel.bind("onMessage", function (event) {
    console.log(event.data);
});
///监听系统设置
channel.bind("onSetting", function (event) {
    console.log(event.data);
});
// 4.通过通道提交点名信息
channel.send("submitQuestion", {
        "content" : "what's your name?"
});*/
    let bus=new Vue({
        sockets:{}
    });
Vue.use(Vuex);
let store=new Vuex.Store({
    state:{
        connect:false,
        message:null,
        dlgShow:false,
        dlgData:
            {
                width:'500px',
                tit:'温馨提示',
                con:"无数据",
                btn: ['取消','确认'],
                dlgCallback(){}
            }
    },
    mutations:{
        SOCKET_CONNECT:(state,status)=>{
            state.connect=true;
        },
        SOCKET_USER_MESSAGE:(state,message)=>{
            state.message=message;
        },
        DIALOG_OPEN:function(state,opts){///打开弹窗
            // console.log("opts:"+opts);
            state.dlgShow=true;
            state.dlgData=opts;
            dialogVue.$data.dlgData=state.dlgData;
            dialogVue.$data.dlgShow=state.dlgShow;
        },
        DIALOG_CLOSE:function(state,opts){//关闭弹窗
            state.dlgShow=false;
            dialogVue.$data.dlgShow=state.dlgShow;
        }
    },
    actions:{
        socket_userMessage:(context,message)=>{
            context.commit('SOCKET_USER_MESSAGE',message);
            //rightSide.sendMsg(message);
            bus.$emit('send-message', message)
        },
        submitNetChoice(context,data){
            //提交优选网络选择信息
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    channel.send("submitNetChoice", data);
                }, 0)
            })
        }
    }
});
const dialogVue=new Vue({
    el:"#dialogCom",
    data:{
        dlgShow:false,
        dlgData:
            {
                width:'500px',
                tit:'温馨提示',
                con:"无数据",
                btn: ['取消','确认'],
                dlgCallback(){}
            }
    },
    store,
    sockets:{
        connect(){}
    },
    components:{
        dialogComponent
    },
    mounted(){
        this.onKickOut();
    },
    methods:{
        dlgClose:function(){
            // this.isShow=false;
        },
        dlgLogin:function(){
            let _this=this;
            this.dlgData={
                width: '500px',
                tit:'请登陆',
                con: dlgHtmlArr[0],
                btn: ['登陆'],
                dlgCallback: function (res) {
                    // if(res._dlgNum) return;
                    // let logindata=$(res._dlgForm).serialize();
                    let logindata={
                        username:$(res._dlgForm).find('#username').val(),
                        password:$(res._dlgForm).find('#password').val(),
                    };
                    _this.$socket.emit('login', logindata);
                }
            };
            this.dlgShow=true;
        },
        dlgWork:function(){
            let _this=this;
            this.dlgData={
                width: '500px',
                tit:'请登陆',
                con: "work",
                btn: ['登陆'],
                worktime:true,
                dlgCallback: function (res) {

                }
            };
            this.dlgShow=true;
        },
        dlgBtnHandler:function(num){
            // store.submitFn(num);
            // this.dlgClose();
        },
        onKickOut(){
            //被踢出
            channel.send("onKickOut", event=>{
                //console.log(event.data.reason);
                let _this=this;
                let reason=event.data.reason?"离开":"被管理员踢出";
                let suggest=event.data.reason?"你可以尝试重新登陆":"请遵守课堂纪律";
                _this.dlgData={
                    width: '500px',
                    tit:'',
                    con: "您已"+reason+"聊天室，"+suggest,
                    btn: ['关闭'],
                    worktime:true,
                    dlgCallback: function (res) {
                        window.close();
                    }
                };
                _this.dlgShow=true;
            });
        }
    }
});

    const leftSide=new Vue({
    el:'#leftSideBar',
    data:{
      liveInfo:liveInfo
    },
    components:{
        leftComponent
    }
});
    const centerMain=new Vue({
    el:'#centerMain',
    data:{
        liveInfo:liveInfo,///房间信息
        netSettings:{////网络优选
            selected: '0',
            options: []
        },
        netStatus:3,//网络状态
        userList:{},
        Total:0//在线人数
    },
    store,
    sockets:{},
    components:{
        centerComponent
    },
    mounted(){
        //dialogVue.dlgWork();
        this.onUserList();
        this.onUserOnline();
        this.onUserJoin();
        this.onUserLeave();
        this.onNetStatus();
        this.onNetSettings();
    },
    mixins:[mixin],
    methods:{
        onUserList(){
            //用户列表
            let _this=this;
            channel.bind("onUserList", function (event) {
                //console.log("onUserList:");
                //console.log(event.data.list);
                liveInfo.lists=event.data.list;
                _this.$socket.emit('userlist', liveInfo);
            });
        },
        onUserOnline(){
            //在线人数（非实时）
            let _this=this;
            channel.bind("onUserOnline", function (event) {
                //console.log(event.data);
                _this.Total=event.data.count;
            });
        },
        onUserJoin(){
            //用户加入
            let _this=this;
            channel.bind("onUserJoin", function (event) {
                    let list=event.data.list;
                    liveInfo.lists=list;
                    _this.$socket.emit('userjoin',liveInfo);
            });
        },
        onUserLeave(){
            //用户离开
            let _this=this;
            channel.bind("onUserLeave", function (event) {
                let list=event.data.list;
                liveInfo.lists=list;
                _this.$socket.emit('userleave',liveInfo);
            });
        },
        onNetStatus(){
            //收到网络状态信息
            let _this=this;
            channel.bind("onNetStatus", function (event) {
                console.log("网络状态："+event.data.level);
                _this.netStatus=event.data.level;
            });
        },
        onNetSettings(){
            //获取优选网络信息
            let _this=this;
            channel.bind("onNetSettings",function(event){
                /*console.log("网络：");
                console.log(event.data);*/
                _this.netSettings.options=event.data.list;
                for(let i in event.data.list ){
                    if(event.data.list[i].selected=='true'){
                        _this.netSettings.selected=i;
                    }
                }
            });
        }
    }
});
    const rightSide=new Vue({
    el:'#rightSideBar',
    sockets:{
        repeatmsg(data){
            //console.log('repeat:');
            //console.log(data);
            //this.$refs.msgchannel.receiveMsg(data);
            this.msgSend(data);
        },
        onuserlists(lists){
            console.log('back lists:');
            console.log(lists);
        },
        onuserjoin(_liveInfo){
            console.log('进入:');
            console.log(_liveInfo);
            this.systemMsg(_liveInfo,'进入');
        },
        onuserleave(_liveInfo){
            console.log('离开:');
            console.log(_liveInfo);
            this.systemMsg(_liveInfo,'离开');
        }
    },
    store,
    created(){
        bus.$on('send-message', function (data) {
            this.$socket.emit('sendmsg', data);
        })
    },
    data:{
        //myId:_id,
        msgData:infoData,
        liveInfo:liveInfo,
        noticeMsgArr:[
            '热烈庆祝七天课堂在线直播新版面正式上线！',
            '关于上课时间调整注意事项'
        ]
    },
    components:{
        rightComponent
    },
    methods:{
        systemMsg(_liveInfo,stage){
                let names='';
            console.log('_liveInfo:');
                console.log(_liveInfo);
                for(let i in _liveInfo.lists){
                    if(_liveInfo.lists[i].name===this.liveInfo.name){
                        return false;
                    };
                    if(names!=''){
                        names+="、";
                    }
                    names+=_liveInfo.lists[i].name;
                };
                this.msgSend({
                    id:0,
                    msg:names+stage+"了课堂",
                    timed:(new Date()).Format("yyyy-MM-dd hh:mm:ss")
                });
        },
        msgSend(data){
            this.$refs.msgchannel.receiveMsg(data);
        }
    }
});
}
if(DEVELOPMENT){
    if(module.hot){//启用热重载
        module.hot.accept();
    }
}

