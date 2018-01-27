<template>
    <div v-scrollBottom class="userMsg " v-bind:class="{isme:msgdata.isme}" >
        <div class="faceBox">
            <div class="faceBg"></div>
            <div class="faceImg">
                <img v-bind:src="faceImg" />
            </div>
        </div>
        <div class="newsBox">
            <!--<p class="name">{{msgdata.info.name}}</p>-->
            <div class="msgInfo">
                <p class="p1">{{msgdata.info.title}}</p>
                <p class="p2">{{msgdata.info.name}}</p>
                <p class="p3">{{msgdata.timed}}</p>
            </div>
            <div class="msgCon">
                <i class="icon " :class="{icon01_02:!msgdata.isme,icon01_03:msgdata.isme}"></i>
                <p class="txtBg">{{msgdata.msg}}</p>
            </div>
        </div>
    </div>
</template>
<script>
    import mixin from './myPlugin';
    export default{
        data(){
            return {
                faceImg: '//qitian-ui-develop.b0.upaiyun.com/qitian-webcast/webviews/'+this.msgdata.info.faceurl
            }
        },
        props:{
            msgdata:Object
        },
        mixins:[mixin],
        components: {},
        method:{}
    }
</script>
<style lang="less" scoped>
    .userMsg {
        display:flex;
        &.isme {
            .newsBox {
                .msgInfo{
                    >p{display:inline-block;margin-right:5px;color:#ff8400;}
                    >.p1{padding:0 5px;background:#169bd5;border-radius:4px;color:#fff;}
                }
                .msgCon {
                    .txtBg {
                        padding: 5px 8px;
                        border-radius:3px;
                        font-size: 14px;
                        color: #000;
                        margin-left: 5px;
                        margin-top: 5px;
                        display: inline-block;
                        border: 1px solid #e6cd07;
                        background: #fcf5c5;
                    }
                }
            }
        }
        .newsBox {
                flex-grow:1;
                padding-left: 5px;
            .msgInfo{
                >p{display:inline-block;margin-right:5px;color:#999;}
                >.p1{padding:0 5px;background:#169bd5;border-radius:4px;color:#fff;}
            }
            .msgCon {
                position: relative;
                i {
                    position: absolute;left: 0;top: 5px;width: 8px;height: 6px;
                }
                .txtBg {
                    padding: 5px 8px;
                    border-radius:3px;
                    font-size: 14px;
                    color: #000;
                    margin-left: 5px;
                    margin-top: 5px;
                    display: inline-block;
                    border: 1px solid #ebebeb;
                    background: #f5f5f5;
                }
            }
        }
    }
</style>