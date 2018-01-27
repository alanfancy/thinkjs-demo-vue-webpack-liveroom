<template>
    <div class="systemMsg flyMsg">
        <p class="p1"><i class="icon icon02_07"></i><span>公告：</span></p>
        <p class="p2">{{noticedata}}</p>
        <a class="fly_closed" href="javascript:void(null)" :num="noticenum" v-on:click="closed">X</a>
        <div class="flybg"></div>
    </div>
</template>
<script>
    export default{
        data(){
            return {}
        },
        props:{
            noticedata:String,
            noticenum:Number
        },
        methods:{
            closed:function(){
                this.$emit('toclose');
            }
        },
        components: {}
    }
</script>
<style lang="less" scoped>
    .systemMsg{
        display:flex;
        background:#f5f5f5;padding:10px;font-size:14px;
        border:1px solid #ddd;border-radius:8px;vertical-align: middle;
        &.flyMsg{
             z-index:2;position:absolute;top:34px;left:0;width:100%;
             padding:10px 0;background:none;border:none;color:white;
            >.p1{padding-left:10px;position:relative;z-index:2;}
            >.p2{padding-right:20px;position:relative;z-index:1;}
            >.fly_closed{
                 position: absolute;top:5px;right:0;color:#fff;z-index:3;
                 font-size:16px;height:20px;line-height:20px;width:20px;text-align:center;
                 display:inline-block;font-family: Arial;
             }
            >.flybg{
                 width:100%;height:100%;background:#27c543;
                 position:absolute;top:0;left:0;z-index:0;
                opacity:.8;
            }
        }
        >p{
             line-height:22px;vertical-align: middle;
            >i{
                 margin-right:5px;vertical-align: middle;
             }
        }
        >.p1{white-space:nowrap;}
        >.p2{
             flex-grow:1;
             word-break: break-all;
            >i{
                 margin:0 5px;
             }
        }
    }
</style>