
/*
 * ====================================================
 * console兼容处理
 */
;(function(window){
	if(typeof console=="undefined"){
		window.console={};
	}
	var funs = ["log","debug","info","warn","error"];
	for(var i in funs){
		var fun = funs[i];
		if(typeof console[fun] =="undefined"){
			console[fun] = function(e){};
		}
	}
 })(window);


/*
 * ====================================================
 * SDK日志输出
 */
$(function(){
	GS.options({log:logFn, debug:true});
});

function logFn(log){
	if(log.msg.indexOf("layheadTime")>0)return;
	switch(log.type){
		case "DEBUG":
			console.debug(log);
			break;
		case "INFO":
			console.info(log);
			break;
		case "WARN":
			console.warn(log);
			break;
		case "ERROR":
			console.error(log);
			break;
		default:
			console.log(log);
	}
}

/*
 * ====================================================
 * 基础工具
 */
;(function(window){
	function checkTime(num){
		var n = Number(num);
		if(n<10)n = "0"+n;
		return n;
	} 
	var Util = {
			trim:function(str) {
				if (typeof str !== "string") {
					return str;
				}
				if (typeof str.trim === "function") {
					return str.trim();
				} else {
					return str.replace(/^(\u3000|\s|\t|\u00A0)*|(\u3000|\s|\t|\u00A0)*$/g, "");
				}
			},
			isEmpty:function(obj){
				if(obj === undefined){
					return true;
				}else if(obj==null){
					return true;
				}else if(typeof obj === "string"){
					if(this.trim(obj) == ""){
						return true;
					}
				}
				return false;
			},
			isNotEmpty:function(obj){
				return !this.isEmpty(obj);
			},
			breachHTML:function(str){
				if(typeof str !== "string" || this.isEmpty(str))return str;
				return str.replace(/\</g,"&lt;");
			},
			escapeHTML:function(str){
				if(typeof str !== "string" || this.isEmpty(str))return str;
				return str.replace(/\&/g,"&amp;").replace(/\</g,"&lt;");
			},
			currentTime:function(){
				return this.formatDate(new Date());
			},
			calcPercent:function(value, total){
				if(isNaN(value)||Number(value)==0)return "0";
				if(isNaN(total) || Number(total)==0)return "0";
				return Math.round(Number(value)*100/Number(total));
			},
			round:function(number,fractionDigits){
				fractionDigits = fractionDigits||2;
				with(Math){  
					return round(number*pow(10,fractionDigits))/pow(10,fractionDigits);  
				}  
			},
			timeDuration:function(second){
				if(!second || isNaN(second))return;
				second = parseInt(second);
				var time = '';
				var hour = second / 3600|0;
		        if (hour != 0) {
		        	time += checkTime(hour) + ':';
		        }
		        var min = (second % 3600) / 60|0;
		        time += checkTime(min) + ':';
		        var sec = (second - hour * 3600 - min * 60) |0;
		        time += checkTime(sec);
		        return time;
			},
			formatDate:function(date){
				var h = date.getHours();
				var m = date.getMinutes();
				var s = date.getSeconds();
				return checkTime(h)+":"+checkTime(m)+":"+checkTime(s);
			},
			formatTime:function(time){
				var date = new Date();
				date.setTime(time);
				var h = date.getHours();
				var m = date.getMinutes();
				var s = date.getSeconds();
				return checkTime(h)+":"+checkTime(m)+":"+checkTime(s);
			},
			formatText:function(text){
				text = text.replace(" ", "&nbsp;");
				text = text.replace(/\n/g, "<br/>");
				return text;
			},
            formatUrl:function(content){
                var reg = /(?:<img.+?>)|(http[s]?|(www\.)){1}[\w\.\/\?=%&@:#;\*\$\[\]\(\){}'"\-]+([0-9a-zA-Z\/#])+?/ig,
                    content = content.replace(reg, function(content) {
                        if(/<img.+?/ig.test(content)){
                            return content;
                        }else{
                            return '<a class="msg-url" target="_blank" href="'+content.replace(/^www\./,function(content){
                                return "http://" + content;
                            })+'">'+content+'</a>'
                        }

                    });
                return content;
            },
			//占位符替换
			replaceholder:function(str, values){
				return str.replace(/\{(\d+)\}/g, function(m, i) {
					return values[i];
				});
			},
			pasteHtmlAtCaret:function(html) {
			    var sel, range;
			    if (window.getSelection) {
			        // IE9 and non-IE
			        sel = window.getSelection();
			        if (sel.getRangeAt && sel.rangeCount) {
			            range = sel.getRangeAt(0);
			            range.deleteContents();

			            // Range.createContextualFragment() would be useful here but is
			            // non-standard and not supported in all browsers (IE9, for one)
			            var el = document.createElement("div");
			            el.innerHTML = html;
			            var frag = document.createDocumentFragment(), node, lastNode;
			            while ( (node = el.firstChild) ) {
			                lastNode = frag.appendChild(node);
			            }
			            range.insertNode(frag);

			            // Preserve the selection
			            if (lastNode) {
			                range = range.cloneRange();
			                range.setStartAfter(lastNode);
			                range.collapse(true);
			                sel.removeAllRanges();
			                sel.addRange(range);
			            }
			        }
			    } else if (document.selection && document.selection.type != "Control") {
			        // IE < 9
			        document.selection.createRange().pasteHTML(html);
			    }
			}
		};
	var i18n = function(key){
		return lang[key]||key;
	};
	window.Util = Util;
	window.i18n = i18n;
})(window);

/*
 *flash提示 
 */
$(function() {
	var result = flashChecker();
	if (!result.f) {
		$(".flash_box").show();
		$(".aui_close.draw_close").bind("click",function(){
			$(".flash_box").hide();
		});
	}
});


function flashChecker() {
	try {
		var hasFlash = false; //是否安装了flash或者启用了flash
	    var flashVersion = 0; //flash版本
	    if (document.all) {
	      var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
	      if (swf) {
	        hasFlash = true;
	        VSwf = swf.GetVariable("$version");
	        flashVersion = parseInt(VSwf.split(" ")[1].split(",")[0]);
	      }
	    } else {
	      if (navigator.plugins && navigator.plugins.length > 0) {
	        var swf = navigator.plugins["Shockwave Flash"];
	        if (swf) {
	          hasFlash = true;
	          var words = swf.description.split(" ");
	          for (var i = 0; i < words.length; ++i) {
	            if (isNaN(parseInt(words[i]))) continue;
	            flashVersion = parseInt(words[i]);
	          }
	        }
	      }
	    }
	    return { f: hasFlash, v: flashVersion };
	} catch (e) {
		return { f: false, v: "" };
	}
    
}