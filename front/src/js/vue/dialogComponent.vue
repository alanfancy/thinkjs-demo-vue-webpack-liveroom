<template>
    <div class='dlgOutBox' id='dlgOutBox' :class="{workTime:this.workTime}">
        <div class='dlgBox' v-bind:thiswidth="opts.width" >
            <div class='dlg_panel'>
                    <a class='dlg_closed' :class="{noTit:!this.titShow}" href='javascript:void(null);' data-num='0' v-on:click="dlgHandler"><i class=''>X</i></a><!--icon icon_3-07-->
                    <div v-if="this.titShow" class='dlg_tit'>{{opts.tit}}</div>
                    <div class='dlg_con'>
                        <form id="dlgForm" name="dlgForm" method="post" v-html="opts.con"></form>
                    </div>
                    <div class='dlg_foot' v-if="this.footerShow">
                        <template v-if="singleBtn">
                            <div v-for="(btn,index) in opts.btn" :data-num='index' class='dlgBtn btn btn_lg_18 bn btn_27c' v-on:click="dlgHandler">{{btn}}</div>
                        </template>
                        <template v-else>
                            <div v-for="(btn,index) in opts.btn" :data-num='index' class='dlgBtn btn btn_lg_18 bn' v-on:click="dlgHandler" :class="{btn_grey:!index,btn_27c:index}">{{btn}}</div>
                        </template>
                    </div>
            </div>
        </div>
        <div data-num='0' class='dlg_masker' v-on:click="dlgHandler"></div>
    </div>
</template>

<script>
    import { mapMutations } from 'vuex';
    import { mapActions } from 'vuex';
    export default{
        data(){
            return {
                workTime:false,
                titShow:true,
                footerShow:true,
                singleBtn:false
            }
        },
        created:function(){
            $('.dlgBox').hide();
        },
        mounted:function(){
                this.dlgLayout(this.opts);
                let _this=this;
                let t=setInterval(function(){
                    _this.init(_this,t);
                },100);
                $(window).resize(function(){
                    _this.init(_this,t);
                });
                this.spinner('.spinner');
        },
        props:{
            isShow:Boolean,
            opts:Object
        },
        components: {},
        methods:{
            init:function(_this,_time){
                let h=$('.dlgBox').height();
                let w=$('.dlgBox').attr('thiswidth');
                _this.dlgPosition(w);
                if(w && h){
                    _this.dlgPosition(w);
                    $('.dlgBox').show();
                    clearInterval(_time);
                }
            },
            dlgPosition: function (w) {
                $('.dlg_masker').height($(window).height());
                $('.dlgBox').css({
                    'width':w?w:'500px',
                    'top':$(window).height()/2-$('.dlgBox').height()/2,
                    'marginLeft':w?-parseInt(w)/2:'-250px'//-parseInt(w)/2
                });
            },
            dlgLayout:function(_data){
                if(_data.btn){
                    this.singleBtn=_data.btn.length==1?true:false;
                };
                this.titShow=_data.tit ? true : false;
                this.footerShow=_data.btn ? true : false;
                this.workTime=_data.worktime?true:false;
            },
            ...mapMutations([
                'increment' // 映射 this.increment() 为 this.$store.commit('increment')
            ]),
            ...mapActions([
                'DIALOG_CLOSE'
            ]),
            dlgHandler:function(e){
                let num=e.target.getAttribute('data-num');
                let formId=$('#dlgForm');
                let _this=this;
                this.opts.dlgCallback({
                    _dlgObj:_this,
                    _dlgForm:formId,
                    _dlgNum:num
                });
//                if(num) return;
                //通知store关闭弹窗
                _this.$store.commit('DIALOG_CLOSE');
//                this.$emit('dlgbtnhandler',num);
            },
            spinner:function(_id){
                let minus=$(_id).find('.s1');
                let add=$(_id).find('.s2');
                let inp=$(_id).find('input');
                let inpVal=inp.val();
                minus.click(function(){
                    inpVal--;
                    inp.val(inpVal);
                });
                add.click(function(){
                    inpVal++;
                    inp.val(inpVal);
                });
            }
        },
        filters: {
        },
        directives:{

        }
    }
</script>
<style lang="less" scoped>
    .dlgOutBox{
        position:fixed;
        left:0;top:0;width:100%;z-index:9;
        .dlgBox{
            position:absolute;background:#fff;display:none;
            left:50%;z-index:1;border-radius:4px;
            min-width:500px;
            .dlg_panel{
                position:relative;
                .dlg_closed{
                    position:absolute;top:0px;right:0;z-index:9;width:54px;height:54px;line-height:54px;text-align:center;
                    font-size:16px;font-family:'Arial';color:#fff;
                    &.noTit{
                        color:#666;width:40px;height:40px;top:-5px;right:0px;
                     }
                }
                .dlg_tit{
                    font-size:18px;
                    color:#fff;background:#27c543;
                    padding:15px 20px;
                    border-top-left-radius: 4px;
                    border-top-right-radius: 4px;
                }
                .dlg_con{
                    padding:20px;
                    color:#999;
                    font-size:14px;
                    position:relative;
                }
                .dlg_foot{
                    margin-bottom:20px;text-align:center;
                    .dlgBtn{
                        text-align:center;width:170px;margin:0 5px;
                    }
                }
            }
        }
        .dlg_masker{
            position:relative;z-index:0;
            background:#000;opacity:0.8;
            width:100%;
        }
    }

</style>