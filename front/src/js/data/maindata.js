let data={
    noticeMsg:"答题正确，系统奖励您10个学分",//公告
    systemMsges:{msg:"系统奖励您10个学分"},//系统消息
    topData:{//top内容
        course_name:"等腰三角形与等边三角形",//课次名称
        teacher:"张三",//授课老师
        course_type:"英语",//科目
        grade:"初二",//年级
        pepole:"50 / 30",//报名人数/到课人数
        isclassbegin:false,//课次状态
        live_time:"110分钟",//直播时长
        work_total:"5题（答题记录）",//发布答题
        red_bag:"3个（红包记录）",//发布红包
        receive_assess:"4.6分（10条记录）",//收到评价
        course_sore:"25分（学分记录）"//本节课学分
    },
    tableData:{///表格内容
        tableColumns:['','排行','学生姓名','手机号码','客户端','操作'],
        tableRows:[
            {id:"11",checked:"checked",sort:"1",name:"张三",phone:"13512345678",stages:{dev:"pc",online:true},controls:{selected:"0",options:[{text:"请选择",value:"0"},{text:"课堂表现",value:"1"},{text:"编辑考勤数据",value:"2"},{text:"禁言",value:"3"}]}},
            {id:"12",checked:"",sort:"2",name:"张三",phone:"13512345678",stages:{dev:"pc",online:true},controls:{selected:"0",options:[{text:"请选择",value:"0"},{text:"课堂表现",value:"1"},{text:"编辑考勤数据",value:"2"},{text:"禁言",value:"3"}]}},
            {id:"13",checked:"",sort:"3",name:"张三",phone:"13512345678",stages:{dev:"mobile",online:true},controls:{selected:"0",options:[{text:"请选择",value:"0"},{text:"课堂表现",value:"1"},{text:"编辑考勤数据",value:"2"},{text:"禁言",value:"3"}]}},
            {id:"14",checked:"checked",sort:"4",name:"张三",phone:"13512345678",stages:{dev:"pc",online:false},controls:{selected:"0",options:[{text:"请选择",value:"0"},{text:"课堂表现",value:"1"},{text:"编辑考勤数据",value:"2"},{text:"禁言",value:"3"}]}},
            {id:"15",checked:"",sort:"5",name:"张三",phone:"13512345678",stages:{dev:"pad",online:true},controls:{selected:"0",options:[{text:"请选择",value:"0"},{text:"课堂表现",value:"1"},{text:"编辑考勤数据",value:"2"},{text:"禁言",value:"3"}]}},
            {id:"16",checked:"",sort:"6",name:"张三",phone:"13512345678",stages:{dev:"mobile",online:false},controls:{selected:"0",options:[{text:"请选择",value:"0"},{text:"课堂表现",value:"1"},{text:"编辑考勤数据",value:"2"},{text:"禁言",value:"3"}]}},
            {id:"17",checked:"",sort:"7",name:"张三",phone:"13512345678",stages:{dev:"pc",online:false},controls:{selected:"0",options:[{text:"请选择",value:"0"},{text:"课堂表现",value:"1"},{text:"编辑考勤数据",value:"2"},{text:"禁言",value:"3"}]}},
            {id:"18",checked:"",sort:"8",name:"张三",phone:"13512345678",stages:{dev:"pc",online:true},controls:{selected:"0",options:[{text:"请选择",value:"0"},{text:"课堂表现",value:"1"},{text:"编辑考勤数据",value:"2"},{text:"禁言",value:"3"}]}}
        ]
    }
};
export default data;