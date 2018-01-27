<template>
    <div class="center_main">
        <div class="center_mainBox">
            <div class="center_main_top">
                <div class="center_main_titBox">
                    <div class="center_main_title">
                        <i class="icon icon04_07 fl"></i>
                        <p>
                            <span>2015-2016初二英语秋寒班</span>
                            <span class="time">（2015.12.20  20:00-22:00）</span>
                        </p>
                    </div>
                    <div class="center_main_icon">
                        <a href='javascript:void(null)'>
                            <i class="icon icon04_01"></i>
                        </a>
                        <a href='javascript:void(null)'>
                            <i class="icon icon04_02"></i>
                        </a>
                        <a href='javascript:void(null)'>
                            <i class="icon icon04_03"></i>
                        </a>
                        <a href='javascript:void(null)'>
                            <i class="icon icon04_04"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div class="center_main_center">
                <gs:doc site="hls.gensee.com" ctx="training" :ownerid="liveinfo.ownerId" :authcode="liveinfo.authCode" />
            </div>
            <div class="center_main_bottom">
                <div class="center_main_bottom_line">
                    <p class="selectBox">
                        <select v-model="netsettings.selected" v-on:change="netSelecHandler($event.target.value)">
                            <option v-for="(opts,index) in netsettings.options" v-bind:value="index" >{{opts.label}}</option>
                        </select>
                    </p>
                    <p class="speed"><i class="netIcon" :class="netIcon()"></i></p>
                </div>
                <div class="center_main_bottom_center">
                    <p>
                        <a href='javascript:void(null)'>
                            <i class="icon icon02_01"></i>
                            <span>帮助</span>
                        </a>
                        <a href='javascript:void(null)'>
                            <i class="icon icon02_03"></i>
                            <span>分享</span>
                        </a>
                        <a href='javascript:void(null)'>
                            <i class="icon icon02_02"></i>
                            <span>在线</span>
                            <span class="number">{{count}}</span>
                            <span>人</span>
                        </a>
                    </p>
                </div>
                <div class="center_main_bottom_right">
                    <a href='javascript:void(null)'>
                        <i class="icon icon02_05"></i>
                    </a>
                    <!--<p class="voicebar"></p>-->
                    <a href='javascript:void(null)'>
                        <i class="icon icon02_04"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                netCls:null,
                netIcon(){
                    console.log("netstatus:");
                    console.log(this.netstatus);
                    let cls=null;
                    if(this.netstatus==0){
                        cls='sp4';
                    }else if(this.netstatus==1){
                        cls='sp3';
                    }else if(this.netstatus==2){
                        cls='sp2';
                    }else if(this.netstatus==3){
                        cls='sp1';
                    }else{
                        cls='sp0';
                    }
                    return cls;
                }
            }
        },
        props:{
            liveinfo:Object,
            count:String,
            netsettings:Object,
            netstatus:String
        },
        mounted(){

        },
        components: {},
        methods:{
            netSelecHandler(select){
                this.$store.dispatch('submitNetChoice', {
                    "label":this.netsettings.options[select].label
                })
            }
            /*netIcon(){
                let cls=null;
                if(this.netstatus==0){
                    cls='sp4';
                }else if(this.netstatus==1){
                    cls='sp3';
                }else if(this.netstatus==2){
                    cls='sp2';
                }else if(this.netstatus==3){
                    cls='sp1';
                }else{
                    cls='sp0';
                }
                return cls;
            }*/
        }
    }
</script>
<style lang="less" scoped>
</style>