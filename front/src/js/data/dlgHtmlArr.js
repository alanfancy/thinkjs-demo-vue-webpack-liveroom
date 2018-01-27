//弹窗内容
let dlgHtmlArr=[];
dlgHtmlArr[0]="<div class='dlg_panel loginBox'>" +
                    "<div class='dlg_tit'>请登陆</div>"+
                    "<div class='dlg_con'>"+
                        "<form id='dlgForm' name='dlgForm' method='post' >" +
                            "<div class='dlg_login'>"+
                                "<p class='login_p'><input type='text' name='username' id='username' placeholder='请输入用户名' /></p>"+
                                "<p class='login_p'><input type='password' name='password' id='password' placeholder='请输入密码' /></p>"+
                            "</div>"+
                        "</form>" +
                    "</div>"+
                    "<div class='dlg_foot' >"+
                        "<div class='dlgBtn btn btn_lg_18 bn btn_27c' >登录</div>"+
                    "</div>"+
                "</div>";
dlgHtmlArr[1]="<div class='dlg_login'>"+
    "<p class='login_p'><input type='text' name='username' id='username' placeholder='请输入用户名' /></p>"+
    "</div>";


export default dlgHtmlArr;