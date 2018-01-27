<template>
    <div>

        <gs:video-live embednetsettings="false" site="hls.gensee.com" ctx="gensee_tra" v-bind:ownerid="ownernum" v-bind:code="codename" httpmode="false" chatenabled="true" ver="4.0" userdata="" bar="false" :uid="muid" uname="ddksdf" lang="zh_CN" visible="true" class="gs-sdk-widget">
           <object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" :id="flashid" width="100%" height="100%" codebase="https://fpdownload.macromedia.com/get/flashplayer/current/swflash.cab#version=11.1.0.0">
           <param name="movie" value="https://static.gensee.com/webcast/static/sdk/flash/GenseeEasyLive.swf?160426">
           <param name="wmode" value="transparent">
           <param name="quality" value="high">
           <param name="bgcolor" value="#000000">
           <param name="allowScriptAccess" value="always">
           <param name="allowFullScreen" value="true">
           <param name="flashvars" :value="codeName">
           <embed src="https://static.gensee.com/webcast/static/sdk/flash/GenseeEasyLive.swf?160426" quality="high" bgcolor="#000000" wmode="transparent" width="100%" height="100%" :name="flashid" align="middle" play="true" loop="false" allowscriptaccess="always" allowfullscreen="true" type="application/x-shockwave-flash" :flashvars="codeName" pluginspage="http://www.adobe.com/go/getflashplayer"></embed>
           </object>
          </gs:video-live>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                codeName:this.codenameFn()
            }
        },
        props: {
            muid:String,
            ownernum:String,
            codename:String,
            flashid:String,
            widgetid:String
        },
        mounted(){

        },
        components: {},
        methods: {
            codenameFn(){
                let string="sc=1&entry=https%3A%2F%2Fhls.gensee.com%2Ftraining&code="+this.codename+"&lang=zh_CN&nickName=fff&httpMode=false&group=&widgetid="+this.widgetid+"&userdata=&showCBar=false&backURI=&ver=4.0&publicChat=true&init=&liveImprovedMode=false&visible=true&embedNetSettings=false&batchRecChat=false&fullscreen=false";
                return string
            }
        }
    }
</script>
<style lang="less" scoped>
</style>