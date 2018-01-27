<template>
    <div class="left_sidebar">
        <div class="left_sidebar_top">
            <div class="faceBox">
                <div class="faceBigBg"></div>
                <div class="faceImg">
                    <img src="../../images/tface_56_56.jpg" />
                </div>
            </div>
            <p class="userName">{{liveinfo.data.name}}</p>
            <p class="sign">
                <a class="textBox" href="javascript:void(null)">
                    <i class="icon icon02_06 vn"></i>
                    <span class="text">签到</span>
                </a>
            </p>
        </div>
        <div class="left_sidebar_center">
            <p class="p1">
                <i class="icon icon04_05 fl"></i>
                <span>10</span>
            </p>
            <p class="p2">
                <i class="icon icon04_06 fl"></i>
                <span class="">1000</span>
            </p>
        </div>
        <div class="left_sidebar_bottom">
            <p class="p1">
                <a href="javascript:void(null)">
                    <i class="icon icon06_01"></i>
                </a>
            </p>
            <p>
                <a href="javascript:void(null)">
                    <i class="icon icon06_02"></i>
                </a>
            </p>
            <p>
                <a href="javascript:void(null)">
                    <i class="icon icon06_03"></i>
                </a>
            </p>
            <p>
                <a href="javascript:void(null)">
                    <i class="icon icon06_04"></i>
                </a>
            </p>
            <p>
                <a href="javascript:void(null)">
                    <i class="icon icon06_05"></i>
                </a>
            </p>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                test: 'world'
            }
        },
        props:{
            liveinfo:Object
        },
        components: {}
    }
</script>
<style lang="less" scoped>
</style>