const Base = require('./base.js');

module.exports = class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    indexAction(){
        return this.display();
    }
    openAction(self){
        //console.log('hello');
        this.setCorsHeader();
    }
    async sendmsgAction(self){
        let data=this.http.data;
        //this.emit('repeatmsg',data);
      /*let se=await self.session('userinfo');
       console.log(se);*/
        let model=this.model("liveroom_user");
        let result=await model.field('mobile,name,titlename').where({stu_id:data.id}).find();
        // console.log(result);
        if(think.isEmpty(result)){
            return this.fail(2100,'mobile',{mobile:'用户名或密码有误'});
        }
        let msgdata={};
        msgdata.info={
            faceurl:"images/tface_30_30.jpg",
            title:result.titlename,
            name:result.name
        };
        msgdata.id=data.id;
        msgdata.msg=data.msg;
        msgdata.timed=data.timed;

        this.broadcast("repeatmsg",msgdata,true);
    }
    async loginAction(self){
        console.log(this.ctx.req.websocketData);
        let _userdata=this.ctx.req.websocketData;

        let model=this.model("liveroom_user");
        let result=await model.field(['stu_id','mobile','name','titlename']).where({mobile:_userdata.username,password:_userdata.password}).find();
        console.log(result);
        if(think.isEmpty(result)){
            return this.fail(2100,'mobile',{mobile:'用户名或密码有误'});
        }
        // await this.session('userinfo',"fuck");
        this.emit('user_data',result);
        // return this.success('登陆成功');
    }
    userlistAction(self){
        let _userlist=self.http.data;
        console.log('userlist:');
        console.log(_userlist);
        //this.emit('onuserlists', _userlist);
        this.broadcast("onuserlists",_userlist,true);
    }
    userjoinAction(self){
        let _userdata=self.http.data;
        console.log('userjoin:');
        console.log(_userdata);
        //this.emit('onuserjoin', _userdata);
        this.broadcast("onuserjoin",_userdata,true);
    }
    userleaveAction(self){
        let _userdata=self.http.data;
        console.log('userleave:');
        console.log(_userdata);
        //this.emit('onuserleave',_userdata);
        this.broadcast("onuserleave",_userdata,true);
    }
    setCorsHeader(){
        this.header('Access-Control-Allow-Origin', this.header('origin') || '*');
        this.header('Access-Control-Allow-Headers', 'x-requested-with');
        this.header('Access-Control-Request-Method', 'GET,POST,PUT,DELETE');
        this.header('Access-Control-Allow-Credentials', 'true');
    }
    userInfo(data){
        return {
            faceurl:"images/tface_30_30.jpg",
            title:data.titlename,
            name:data.name
        }
    }
}