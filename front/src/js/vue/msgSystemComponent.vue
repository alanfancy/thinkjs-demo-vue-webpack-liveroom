<template>
    <div v-scrollBottom class="systemMsg">
        <p class="p1"><i class="icon icon02_07"></i><span>&nbsp;</span></p>
        <p class="p2">
            <!--回答正确
            <span class="c_ff8">奖励一朵小红花</span>
            <i class="icon icon04_05"></i>哦-->
            {{systemdata.msg}}
        </p>
    </div>
</template>
<script>
    import mixin from './myPlugin';
    export default{
        data(){
            return {
                test: 'world'
            }
        },
        props:{
            systemdata:Object
        },
        mixins:[mixin],
        mounted(){
            //console.log("系统通知：");
          //console.log(this.systemdata) ;
        },
        components: {}
    }
</script>
<style lang="less" scoped>
    .systemMsg{
        display:flex;
        background:#f5f5f5;padding:10px;font-size:14px;
        border:1px solid #ddd;border-radius:8px;vertical-align: middle;
        >p{
             line-height:20px;vertical-align: middle;
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