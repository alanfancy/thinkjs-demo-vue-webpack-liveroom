<template>
    <div class="right_mediabar">
        <div class="right_mediabarBox">
            <div class="right_mediabar_top">
                <div class="topImg">
                    <gs:video-live site="hls.gensee.com" ctx="training" :ownerid="liveinfo.ownerId" :authcode="liveinfo.authCode" :uname="liveinfo.data.name" />
                </div>
            </div>
            <div class="right_mediabar_center">

                <ul class="info_tabsUl">
                    <li v-for="(item, index) in items" v-bind:class="{active:item.isActive}" v-on:click="tabsHandler(index)">
                        <a href="javascript:void(null)">{{item.title}}<i v-if="index&&item.qaNum" class="icon icon01_01"></i></a>
                    </li>
                </ul>
                <template v-if="items[0].isActive">
                    <msg-notice-component v-if="noticeMsg!=''" :noticedata="noticeMsg" v-on:toclose="closeNotice" :noticenum="noticeNum"></msg-notice-component>
                    <div class="msg_detail">
                        <ul>
                            <li v-for="msg in newMsges">
                                <msg-system-component v-if="msg.id==0" :systemdata=msg></msg-system-component>
                                <msg-user-component v-else :msgdata=msg></msg-user-component>
                            </li>
                        </ul>
                    </div>
                </template>
                <template v-if="items[1].isActive">
                    <div class="msg_detail">
                        <p>sdfsf</p>
                    </div>
                </template>
            </div>
            <div class="right_mediabar_bottom">
                <ul class="doworkUl">
                    <li class="number">1</li>
                    <li class="number">2</li>
                    <li>A</li>
                    <li>B</li>
                    <li>C</li>
                    <li>D</li>
                    <li class="gift"><i class="icon icon04_05"></i></li>
                </ul>
                <div class="inputBox">
                    <div class="inputContent">
                        <p class="faceBtn"><i class="icon icon02_08"></i></p>
                        <input class="msgInp" id="msgInp" type="text" name="msgInp" placeholder="说点什么吧" v-model="newTodoMsg">

                        <div class="msgSend">
                            <i class="icon icon08_01"></i>
                            <p v-on:click="sendMsgHanlder()" >发送</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import mixin from './myPlugin';
    import msgNoticeComponent from './msgNoticeComponent.vue';//公告
    import msgSystemComponent from './msgSystemComponent.vue';//系统通知
    import msgUserComponent from './msgUserComponent.vue';//消息组件
    export default{
        data(){
            return {
                items:[
                    {title:"公共聊天",isActive:true},
                    {title:"老师聊天",isActive:false,qaNum:0}
                ],
                noticeNum:0,
                noticeMsg:this.notices[this.noticeNum],
                newTodoMsg:'',//记录输入框的消息
                newMsges:[]//消息记录，增加即可发送消息
            }
        },
        props:{
            //myid:String,
            msginfo:Object,
            notices:Array,
            liveinfo:Object
        },
        mixins:[mixin],
        mounted(){
            //console.log("right:");
            //console.log(this.myid);
            this.dataFormat();
//            this.notiveMsg(this.notices[this.noticeNum]);
            this.historyMsg(this.msginfo);///模拟历史消息，//页面打开时加载历史消息
            this.notiveMsg(this.notices[this.noticeNum]);//公告
        },
        components: {
            msgNoticeComponent,
            msgSystemComponent,
            msgUserComponent
        },
        methods:{
            //点击发送消息执行的事件
            sendMsgHanlder:function(event){
                //发送消息
                if(this.newTodoMsg=='') return false;
                try{
                    console.log(this.liveinfo.data.stuid);
                    this.sendMsg(this.liveinfo.data.stuid);
                }catch(err){
                    console.log("缺少参数："+err);
                }

                //公告
//            this.notiveMsg(data.noticeMsg);
            },
            //发送消息
            sendMsg:function(_id){
                let newMsgObj={};//每条消息的数据需要新建对象
//                newMsgObj.info=_infoData.info;
                newMsgObj.id=_id;
                newMsgObj.msg=this.newTodoMsg;
                newMsgObj.timed=(new Date()).Format("yyyy-MM-dd hh:mm:ss");
                //newMsgObj.isme=true;//本人发送的消息
                this.newTodoMsg='';
                //加入数组即可发送
                //this.newMsges.push(newMsgObj);
                this.$store.dispatch('socket_userMessage', newMsgObj);
            },
            //页面打开时加载历史消息
            historyMsg:function(data){
                for(let i=0;i<data.length;i++){
                    this.receiveMsg(data[i]);
                }
            },
            //接收到的消息
            receiveMsg:function(_infoData){
                let newMsgObj={};//每条消息的数据需要新建对象
                if(_infoData.id!=0){//当id为0时，判断为系统消息
                    newMsgObj.info=_infoData.info;
                    if(_infoData.id===this.liveinfo.data.stuid){//如果id相等即为本人发送的消息
                        newMsgObj.isme=true;
                    }
                }
                newMsgObj.id=_infoData.id;
                newMsgObj.msg=_infoData.msg;
                newMsgObj.timed=_infoData.timed;
                //加入数组即可发送
                this.newMsges.push(newMsgObj);
            },
            //公告
            notiveMsg:function(msg){
                this.noticeMsg=msg;
            },
            //关闭公告
            closeNotice:function(){
                this.noticeMsg='';
                if(this.noticeNum<this.notices.length-1){
                    this.noticeNum++;
                    this.notiveMsg(this.notices[this.noticeNum]);
                }
            }
        }
    }
</script>
<style lang="less" scoped>
</style>