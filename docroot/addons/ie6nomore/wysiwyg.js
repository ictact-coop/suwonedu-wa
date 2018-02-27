//전역변수
var textareaName = new Array(); //type이 "editor"인 textarea 배열

//함수
function htmledit(excute, bool, value, num){
	if(navigator.appName != "Microsoft Internet Explorer" && excute=="backcolor") excute = "hilitecolor";
	document.getElementById('iframe'+textareaName[num]).contentWindow.document.execCommand(excute, bool, value);
	document.getElementById('fontfaceLayer'+num).style.display = "none";
	document.getElementById('fontsizeLayer'+num).style.display = "none";
	document.getElementById('fgLayer'+num).style.display = "none";
	document.getElementById('bgLayer'+num).style.display = "none";
	copyTohtml();
	document.getElementById('iframe'+textareaName[num]).contentWindow.focus();
}

function viewLayer(num, layerId){	
	document.getElementById('fontfaceLayer'+num).style.display = "none";
	document.getElementById('fontsizeLayer'+num).style.display = "none";
	document.getElementById('fgLayer'+num).style.display = "none";
	document.getElementById('bgLayer'+num).style.display = "none";
	if(layerId) document.getElementById(layerId).style.display = "inline";
	if(layerId) document.getElementById(layerId).focus();
}

function viewSource(elmId,elmName, num){	
	document.getElementById(elmId).style.display = "none";
	document.getElementsByName(elmName)[0].style.display = "inline";
	document.getElementById('viewSourceBtn'+num).style.display = "none";
	document.getElementById('viewEdirorBtn'+num).style.display = "inline";
	document.getElementsByName(elmName)[0].value = document.getElementById(elmId).contentWindow.document.body.innerHTML;
}

function viewEdiror(elmId,elmName, num){	
	document.getElementById(elmId).style.display = "inline";
	document.getElementsByName(elmName)[0].style.display = "none";
	document.getElementById('viewSourceBtn'+num).style.display = "inline";
	document.getElementById('viewEdirorBtn'+num).style.display = "none";
	document.getElementById(elmId).contentWindow.document.body.innerHTML = document.getElementsByName(elmName)[0].value;
}

function copyTohtml(){
	for (var i=0;i<textareaName.length;i++){
		document.getElementsByName(textareaName[i])[0].value = document.getElementById("iframe"+textareaName[i]).contentWindow.document.body.innerHTML;
	}
}

function copyToeditor(){
	for (var i=0;i<textareaName.length;i++){
		document.getElementById("iframe"+textareaName[i]).contentWindow.document.body.innerHTML = document.getElementsByName(textareaName[i])[0].value;
	}
}
//함수 끝

if(window.addEventListener) window.addEventListener("load", createELM, false);
else if(window.attachEvent) window.attachEvent("onload", createELM);

function createELM(){
	var left1 = (navigator.appName == "Microsoft Internet Explorer")?"181px":"110px"; //화면에 따라 약간씩 정해줘야해요..(IE:FireFox)
	var left2 = (navigator.appName == "Microsoft Internet Explorer")?"229px":"167px"; //화면에 따라 약간씩 정해줘야해요..(IE:FireFox)
	var left3 = (navigator.appName == "Microsoft Internet Explorer")?"179px":"175px"; //화면에 따라 약간씩 정해줘야해요..(IE:FireFox)
	var left4 = (navigator.appName == "Microsoft Internet Explorer")?"197px":"193px"; //화면에 따라 약간씩 정해줘야해요..(IE:FireFox)
	var c = 0;
	var textareaObj = document.getElementsByTagName('textarea');
	for (var i=0;i<textareaObj.length;i++){
		if(textareaObj[i].getAttribute("id")=="ie6_index_diy"){
			textareaName[c] = textareaObj[i].getAttribute("name");
			c++;
		}
	}

	for (var i=0;i<textareaName.length;i++){
		var textareaOrg = document.getElementsByName(textareaName[i])[0];
		
		//아이프레임생성
		var editorFrameObj = document.createElement("iframe");
		editorFrameObj.setAttribute("id","iframe"+textareaName[i]);
		editorFrameObj.setAttribute("scrolling","yes");
		editorFrameObj.setAttribute("frameBorder","no");
		editorFrameObj.setAttribute("wrap","virtual");
		editorFrameObj.style.width = "350px"
		editorFrameObj.style.height = "300px"
		editorFrameObj.style.border = "1px solid #D0D0D0";
		editorFrameObj.onmouseover = new Function("viewLayer('"+i+"');");
		textareaOrg.parentNode.insertBefore(editorFrameObj,textareaOrg);

		var doc = document.getElementById("iframe"+textareaName[i]).contentWindow.document;
		doc.open(); 
		doc.write("<html><head>");
		doc.write("<style type='text/css'>");
		doc.write("p{ margin:0px; }");
		doc.write("ul,ol{ margin-top:0; margin-bottom:0; }");	
		doc.write("body, table, td{");
		doc.write("scrollbar-3dlight-color:#E0E0E0;");
		doc.write("scrollbar-arrow-color:#E0E0E0;"); 
		doc.write("scrollbar-base-color:#E0E0E0;"); 
		doc.write("scrollbar-darkshadow-color:#FFFFFF;"); 
		doc.write("scrollbar-face-color:#FFFFFF;"); 
		doc.write("scrollbar-highlight-color:#FFFFFF;"); 
		doc.write("scrollbar-shadow-color:#E0E0E0;");
		doc.write("font-family:'Arial'; font-size:9pt; line-height:140%;}");
		doc.write("</style>");
		doc.write("</head><body bgcolor='#FFFFFF'>"+textareaOrg.value+"</body></html>"); 
		doc.close(); 
		doc.designMode = "on";
		textareaOrg.style.backgroundColor="#F0F0F0";
		textareaOrg.style.color="#336699";
		textareaOrg.style.fontSize="9pt";
		textareaOrg.style.fontFamily="Tahoma";
		textareaOrg.style.display="none";




		// 이벤트 처리(내용 상호복제 부분)
		if(document.addEventListener){
			doc.addEventListener("mousedown", copyTohtml, false);
			doc.addEventListener("blur", copyTohtml, false);
			textareaOrg.addEventListener("mousedown", copyToeditor, false);
			textareaOrg.addEventListener("blur", copyToeditor, false);
		}else if(document.attachEvent){
			doc.attachEvent("onmousedown", copyTohtml, false);
			document.getElementById("iframe"+textareaName[i]).attachEvent("onblur", copyTohtml, false);
			textareaOrg.attachEvent("onmousedown", copyToeditor, false);
			textareaOrg.attachEvent("onblur", copyToeditor, false);
		}

		//도구테이블생성
		var ctrlObj  = " <table width=\"350px\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" style=\"margin-top:5px;\"> ";
		ctrlObj += " <td style=\"font-size:5px;\"> ";
		ctrlObj += " 	<img src=\"./addons/ie6nomore/editor_images/ed_fontface.gif\" border=\"0\" alt=\"글꼴\" onClick=\"viewLayer('"+i+"', 'fontfaceLayer"+i+"');\"> ";
		ctrlObj += " 	<img src=\"./addons/ie6nomore/editor_images/ed_fontsize.gif\" border=\"0\" alt=\"크기\" onClick=\"viewLayer('"+i+"', 'fontsizeLayer"+i+"');\"> ";
		ctrlObj += " 	<img src=\"./addons/ie6nomore/editor_images/ed_virtical.gif\"> ";
		ctrlObj += " 	<A href=\"javascript:htmledit('bold', false, null, '"+i+"');\"><img src=\"./addons/ie6nomore/editor_images/ed_format_bold.gif\" border=\"0\" alt=\"두꺼운체\"></A> ";
		ctrlObj += " 	<A href=\"javascript:htmledit('italic', false, null, '"+i+"');\"><img src=\"./addons/ie6nomore/editor_images/ed_format_italic.gif\" border=\"0\" alt=\"기울림체\"></A> ";
		ctrlObj += " 	<A href=\"javascript:htmledit('underline', false, null, '"+i+"');\"><img src=\"./addons/ie6nomore/editor_images/ed_format_underline.gif\" border=\"0\" alt=\"밑줄\"></A> ";
		ctrlObj += " 	<A href=\"javascript:htmledit('StrikeThrough', false, null, '"+i+"');\"><img src=\"./addons/ie6nomore/editor_images/ed_format_strike.gif\" border=\"0\" alt=\"취소선\"></A> ";
		ctrlObj += " 	<img src=\"./addons/ie6nomore/editor_images/ed_virtical.gif\"> ";
		ctrlObj += " 	<img src=\"./addons/ie6nomore/editor_images/ed_color_fg.gif\" border=\"0\" alt=\"글자색상\" onClick=\"viewLayer('"+i+"', 'fgLayer"+i+"');\"> ";
		ctrlObj += " 	<img src=\"./addons/ie6nomore/editor_images/ed_color_bg.gif\" border=\"0\" alt=\"글자색상\" onClick=\"viewLayer('"+i+"', 'bgLayer"+i+"');\"> ";
		ctrlObj += " 	<img src=\"./addons/ie6nomore/editor_images/ed_virtical.gif\"> ";
		ctrlObj += " 	<A href=\"javascript:htmledit('justifyleft', false, null, '"+i+"');\"><img src=\"./addons/ie6nomore/editor_images/ed_align_left.gif\" border=\"0\" alt=\"좌측정렬\"></a> ";
		ctrlObj += " 	<A href=\"javascript:htmledit('justifycenter', false, null, '"+i+"');\"><img src=\"./addons/ie6nomore/editor_images/ed_align_center.gif\" border=\"0\" alt=\"중심정렬\"></a> ";
		ctrlObj += " 	<A href=\"javascript:htmledit('justifyright', false, null, '"+i+"');\"><img src=\"./addons/ie6nomore/editor_images/ed_align_right.gif\" border=\"0\" alt=\"우측정렬\"></a> ";
		ctrlObj += " 	<img src=\"./addons/ie6nomore/editor_images/ed_virtical.gif\"> ";
		ctrlObj += " 	<A href=\"javascript:htmledit('insertorderedlist', false, null), '"+i+"';\"><img src=\"./addons/ie6nomore/editor_images/ed_list_number.gif\" border=\"0\" alt=\"숫자목록\"></a> ";
		ctrlObj += " 	<A href=\"javascript:htmledit('insertunorderedlist', false, null, '"+i+"');\"><img src=\"./addons/ie6nomore/editor_images/ed_list_dot.gif\" border=\"0\" alt=\"점표시목록\"></a> ";
		ctrlObj += " 	<A href=\"javascript:htmledit('outdent', false, null, '"+i+"');\"><img src=\"./addons/ie6nomore/editor_images/ed_format_outdent.gif\" border=\"0\" alt=\"들여쓰기줄이기\"></a> ";
		ctrlObj += " 	<A href=\"javascript:htmledit('indent', false, null, '"+i+"');\"><img src=\"./addons/ie6nomore/editor_images/ed_format_indent.gif\" border=\"0\" alt=\"들여쓰기늘이기\"></a> ";
		ctrlObj += " 	<img src=\"./addons/ie6nomore/editor_images/ed_virtical.gif\"> ";
		ctrlObj += " 	<A href=\"javascript:htmledit('InsertHorizontalRule', false, null, '"+i+"');\"><img src=\"./addons/ie6nomore/editor_images/ed_hr.gif\" border=\"0\" alt=\"한줄넣기\"></a> ";
		ctrlObj += " 	<img src=\"./addons/ie6nomore/editor_images/ed_virtical.gif\"> ";
		ctrlObj += " 	<A href=\"javascript:htmledit('removeformat', false, null, '"+i+"');\"><img src=\"./addons/ie6nomore/editor_images/ed_reset.gif\" border=\"0\" alt=\"꾸밈 초기화\"></a> ";
		ctrlObj += " 	<img src=\"./addons/ie6nomore/editor_images/ed_virtical.gif\"> ";
		ctrlObj += " 	<img id=\"viewEdirorBtn"+i+"\" src=\"./addons/ie6nomore/editor_images/ed_editor.gif\" border=\"0\" alt=\"편집화면\" style=\"display:none\" onClick=\"viewEdiror('iframe"+textareaName[i]+"','"+textareaName[i]+"', '"+i+"');\"> ";
		ctrlObj += " 	<img id=\"viewSourceBtn"+i+"\" src=\"./addons/ie6nomore/editor_images/ed_html.gif\" border=\"0\" alt=\"소스보기\" style=\"display:inline\" onClick=\"viewSource('iframe"+textareaName[i]+"','"+textareaName[i]+"', '"+i+"');\"> ";
		ctrlObj += " 	<br> ";
		ctrlObj += " 	<div id=\"fontfaceLayer"+i+"\" style=\"margin-top:-20px; position:absolute; width:70px; border:1px solid #999999; left:"+left1+"; display:none;\"> ";
		ctrlObj += " 		<table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" bgcolor=\"#ffffff\"> ";
		ctrlObj += " 		<tr onmouseover=\"this.style.backgroundColor='#E0E0E0'\" onmouseout=\"this.style.backgroundColor=''\"><td style=\"padding-left:3px;\" onmousedown=\"htmledit('fontname', false, '돋움', '"+i+"');\">돋움</td></tr> ";
		ctrlObj += " 		<tr onmouseover=\"this.style.backgroundColor='#E0E0E0'\" onmouseout=\"this.style.backgroundColor=''\"><td style=\"padding-left:3px;\" onmousedown=\"htmledit('fontname', false, '굴림', '"+i+"');\">굴림</td></tr> ";
		ctrlObj += " 		<tr onmouseover=\"this.style.backgroundColor='#E0E0E0'\" onmouseout=\"this.style.backgroundColor=''\"><td style=\"padding-left:3px;\" onmousedown=\"htmledit('fontname', false, '바탕', '"+i+"');\">바탕</td></tr> ";
		ctrlObj += " 		<tr onmouseover=\"this.style.backgroundColor='#E0E0E0'\" onmouseout=\"this.style.backgroundColor=''\"><td style=\"padding-left:3px;\" onmousedown=\"htmledit('fontname', false, '궁서', '"+i+"');\">궁서</td></tr> ";
		ctrlObj += " 		<tr onmouseover=\"this.style.backgroundColor='#E0E0E0'\" onmouseout=\"this.style.backgroundColor=''\"><td style=\"padding-left:3px;\" onmousedown=\"htmledit('fontname', false, 'Arial', '"+i+"');\">Arial</td></tr> ";
		ctrlObj += " 		<tr onmouseover=\"this.style.backgroundColor='#E0E0E0'\" onmouseout=\"this.style.backgroundColor=''\"><td style=\"padding-left:3px;\" onmousedown=\"htmledit('fontname', false, 'Tahoma', '"+i+"');\">Tahoma</td></tr> ";
		ctrlObj += " 		<tr onmouseover=\"this.style.backgroundColor='#E0E0E0'\" onmouseout=\"this.style.backgroundColor=''\"><td style=\"padding-left:3px;\" onmousedown=\"htmledit('fontname', false, 'Verdana', '"+i+"');\">Verdana</td></tr> ";
		ctrlObj += " 		<tr onmouseover=\"this.style.backgroundColor='#E0E0E0'\" onmouseout=\"this.style.backgroundColor=''\"><td style=\"padding-left:3px;\" onmousedown=\"htmledit('fontname', false, 'Time', '"+i+"');\">Time</td></tr> ";
		ctrlObj += " 		</table> ";
		ctrlObj += " 	</div> ";
		ctrlObj += " 	<div id=\"fontsizeLayer"+i+"\" style=\"margin-top:-20px; position:absolute; width:38px; border:1px solid #999999; left:"+left2+"; display:none;\"> ";
		ctrlObj += " 		<table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" bgcolor=\"#ffffff\"> ";
		ctrlObj += " 		<tr onmouseover=\"this.style.backgroundColor='#E0E0E0'\" onmouseout=\"this.style.backgroundColor=''\"><td style=\"padding-left:3px;\" onmousedown=\"htmledit('fontsize', false, 1, '"+i+"');\">1</td></tr> ";
		ctrlObj += " 		<tr onmouseover=\"this.style.backgroundColor='#E0E0E0'\" onmouseout=\"this.style.backgroundColor=''\"><td style=\"padding-left:3px;\" onmousedown=\"htmledit('fontsize', false, 2, '"+i+"');\">2</td></tr> ";
		ctrlObj += " 		<tr onmouseover=\"this.style.backgroundColor='#E0E0E0'\" onmouseout=\"this.style.backgroundColor=''\"><td style=\"padding-left:3px;\" onmousedown=\"htmledit('fontsize', false, 3, '"+i+"');\">3</td></tr> ";
		ctrlObj += " 		<tr onmouseover=\"this.style.backgroundColor='#E0E0E0'\" onmouseout=\"this.style.backgroundColor=''\"><td style=\"padding-left:3px;\" onmousedown=\"htmledit('fontsize', false, 4, '"+i+"');\">4</td></tr> ";
		ctrlObj += " 		<tr onmouseover=\"this.style.backgroundColor='#E0E0E0'\" onmouseout=\"this.style.backgroundColor=''\"><td style=\"padding-left:3px;\" onmousedown=\"htmledit('fontsize', false, 5, '"+i+"');\">5</td></tr> ";
		ctrlObj += " 		<tr onmouseover=\"this.style.backgroundColor='#E0E0E0'\" onmouseout=\"this.style.backgroundColor=''\"><td style=\"padding-left:3px;\" onmousedown=\"htmledit('fontsize', false, 6, '"+i+"');\">6</td></tr> ";
		ctrlObj += " 		</table> ";
		ctrlObj += " 	</div> ";
		ctrlObj += " 	<div id=\"fgLayer"+i+"\" style=\"margin-top:-20px; position:absolute; width:160px; height:75px; border:1px solid #999999; left:"+left3+"; display:none;\"> ";
		ctrlObj += " 		<table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" bgcolor=\"#ffffff\"> ";
		ctrlObj += " 		<td> ";
		ctrlObj += " 			<table cellspacing=\"0\" cellpadding=\"0\" border=\"1\" bordercolor=\"#000000\" style=\"border-collapse:collapse; margin:7px;\"> ";
		ctrlObj += " 			<tr height=\"11\"> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#FE1100\" onmousedown=\"htmledit('forecolor', false, '#FE1100', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#FE4C24\" onmousedown=\"htmledit('forecolor', false, '#FE4C24', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#FE875A\" onmousedown=\"htmledit('forecolor', false, '#FE875A', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#FECDA7\" onmousedown=\"htmledit('forecolor', false, '#FECDA7', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#040967\" onmousedown=\"htmledit('forecolor', false, '#040967', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#2D328D\" onmousedown=\"htmledit('forecolor', false, '#2D328D', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#44499A\" onmousedown=\"htmledit('forecolor', false, '#44499A', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#686EB8\" onmousedown=\"htmledit('forecolor', false, '#686EB8', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#669900\" onmousedown=\"htmledit('forecolor', false, '#669900', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#66CC00\" onmousedown=\"htmledit('forecolor', false, '#66CC00', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#99FF00\" onmousedown=\"htmledit('forecolor', false, '#99FF00', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#FF99FF\" onmousedown=\"htmledit('forecolor', false, '#FF99FF', '"+i+"');\"></td> ";
		ctrlObj += " 			</tr> ";
		ctrlObj += " 			<tr height=\"11\"> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#6E0017\" onmousedown=\"htmledit('forecolor', false, '#6E0017', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#7B243D\" onmousedown=\"htmledit('forecolor', false, '#7B243D', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#834C6B\" onmousedown=\"htmledit('forecolor', false, '#834C6B', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#66FFFF\" onmousedown=\"htmledit('forecolor', false, '#66FFFF', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#006BD4\" onmousedown=\"htmledit('forecolor', false, '#006BD4', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#0087E1\" onmousedown=\"htmledit('forecolor', false, '#0087E1', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#37B7FE\" onmousedown=\"htmledit('forecolor', false, '#37B7FE', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#A7DEFE\" onmousedown=\"htmledit('forecolor', false, '#A7DEFE', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#FFCC00\" onmousedown=\"htmledit('forecolor', false, '#FFCC00', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#FFFF00\" onmousedown=\"htmledit('forecolor', false, '#FFFF00', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#FEFE9F\" onmousedown=\"htmledit('forecolor', false, '#FEFE9F', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#FEFED0\" onmousedown=\"htmledit('forecolor', false, '#FEFED0', '"+i+"');\"></td> ";
		ctrlObj += " 			</tr> ";
		ctrlObj += " 			<tr height=\"11\"> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#4E003D\" onmousedown=\"htmledit('forecolor', false, '#4E003D', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#6D2262\" onmousedown=\"htmledit('forecolor', false, '#6D2262', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#926594\" onmousedown=\"htmledit('forecolor', false, '#926594', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#C2A9C5\" onmousedown=\"htmledit('forecolor', false, '#C2A9C5', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#005557\" onmousedown=\"htmledit('forecolor', false, '#005557', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#03747B\" onmousedown=\"htmledit('forecolor', false, '#03747B', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#579D9F\" onmousedown=\"htmledit('forecolor', false, '#579D9F', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#A2C6CC\" onmousedown=\"htmledit('forecolor', false, '#A2C6CC', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#FF6600\" onmousedown=\"htmledit('forecolor', false, '#FF6600', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#FF9933\" onmousedown=\"htmledit('forecolor', false, '#FF9933', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#FECD8A\" onmousedown=\"htmledit('forecolor', false, '#FECD8A', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#FEE2B0\" onmousedown=\"htmledit('forecolor', false, '#FEE2B0', '"+i+"');\"></td> ";
		ctrlObj += " 			</tr> ";
		ctrlObj += " 			<tr height=\"11\"> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#1B0B73\" onmousedown=\"htmledit('forecolor', false, '#1B0B73', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#4C379D\" onmousedown=\"htmledit('forecolor', false, '#4C379D', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#876EBA\" onmousedown=\"htmledit('forecolor', false, '#876EBA', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#BBBAEF\" onmousedown=\"htmledit('forecolor', false, '#BBBAEF', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#008E37\" onmousedown=\"htmledit('forecolor', false, '#008E37', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#26B168\" onmousedown=\"htmledit('forecolor', false, '#26B168', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#47BE80\" onmousedown=\"htmledit('forecolor', false, '#47BE80', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#76D3A2\" onmousedown=\"htmledit('forecolor', false, '#76D3A2', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#B31C00\" onmousedown=\"htmledit('forecolor', false, '#B31C00', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#B03F21\" onmousedown=\"htmledit('forecolor', false, '#B03F21', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#AE623A\" onmousedown=\"htmledit('forecolor', false, '#AE623A', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#AC6E54\" onmousedown=\"htmledit('forecolor', false, '#AC6E54', '"+i+"');\"></td> ";
		ctrlObj += " 			</tr> ";
		ctrlObj += " 			<tr height=\"11\"> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#FEFEFE\" onmousedown=\"htmledit('forecolor', false, '#FEFEFE', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#E6E6E6\" onmousedown=\"htmledit('forecolor', false, '#E6E6E6', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#CDCDCD\" onmousedown=\"htmledit('forecolor', false, '#CDCDCD', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#B4B4B4\" onmousedown=\"htmledit('forecolor', false, '#B4B4B4', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#A8A8A8\" onmousedown=\"htmledit('forecolor', false, '#A8A8A8', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#8D8D8D\" onmousedown=\"htmledit('forecolor', false, '#8D8D8D', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#747474\" onmousedown=\"htmledit('forecolor', false, '#747474', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#595959\" onmousedown=\"htmledit('forecolor', false, '#595959', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#4B4B4B\" onmousedown=\"htmledit('forecolor', false, '#4B4B4B', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#303030\" onmousedown=\"htmledit('forecolor', false, '#303030', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#0A0A0A\" onmousedown=\"htmledit('forecolor', false, '#0A0A0A', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#000000\" onmousedown=\"htmledit('forecolor', false, '#000000', '"+i+"');\"></td> ";
		ctrlObj += " 			</tr> ";
		ctrlObj += " 			</table> ";
		ctrlObj += " 			</td> ";
		ctrlObj += " 		</table> ";
		ctrlObj += " 	</div> ";
		ctrlObj += " 	<div id=\"bgLayer"+i+"\" style=\"margin-top:-20px; position:absolute; width:160px; height:75px; border:1px solid #999999; left:"+left4+"; display:none;\"> ";
		ctrlObj += " 		<table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" bgcolor=\"#ffffff\"> ";
		ctrlObj += " 		<td> ";
		ctrlObj += " 			<table cellspacing=\"0\" cellpadding=\"0\" border=\"1\" bordercolor=\"#000000\" style=\"border-collapse:collapse; margin:7px;\"> ";
		ctrlObj += " 			<tr height=\"11\"> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#FE1100\" onmousedown=\"htmledit('backcolor', false, '#FE1100', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#FE4C24\" onmousedown=\"htmledit('backcolor', false, '#FE4C24', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#FE875A\" onmousedown=\"htmledit('backcolor', false, '#FE875A', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#FECDA7\" onmousedown=\"htmledit('backcolor', false, '#FECDA7', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#040967\" onmousedown=\"htmledit('backcolor', false, '#040967', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#2D328D\" onmousedown=\"htmledit('backcolor', false, '#2D328D', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#44499A\" onmousedown=\"htmledit('backcolor', false, '#44499A', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#686EB8\" onmousedown=\"htmledit('backcolor', false, '#686EB8', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#669900\" onmousedown=\"htmledit('backcolor', false, '#669900', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#66CC00\" onmousedown=\"htmledit('backcolor', false, '#66CC00', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#99FF00\" onmousedown=\"htmledit('backcolor', false, '#99FF00', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#FF99FF\" onmousedown=\"htmledit('backcolor', false, '#FF99FF', '"+i+"');\"></td> ";
		ctrlObj += " 			</tr> ";
		ctrlObj += " 			<tr height=\"11\"> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#6E0017\" onmousedown=\"htmledit('backcolor', false, '#6E0017', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#7B243D\" onmousedown=\"htmledit('backcolor', false, '#7B243D', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#834C6B\" onmousedown=\"htmledit('backcolor', false, '#834C6B', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#66FFFF\" onmousedown=\"htmledit('backcolor', false, '#66FFFF', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#006BD4\" onmousedown=\"htmledit('backcolor', false, '#006BD4', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#0087E1\" onmousedown=\"htmledit('backcolor', false, '#0087E1', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#37B7FE\" onmousedown=\"htmledit('backcolor', false, '#37B7FE', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#A7DEFE\" onmousedown=\"htmledit('backcolor', false, '#A7DEFE', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#FFCC00\" onmousedown=\"htmledit('backcolor', false, '#FFCC00', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#FFFF00\" onmousedown=\"htmledit('backcolor', false, '#FFFF00', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#FEFE9F\" onmousedown=\"htmledit('backcolor', false, '#FEFE9F', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#FEFED0\" onmousedown=\"htmledit('backcolor', false, '#FEFED0', '"+i+"');\"></td> ";
		ctrlObj += " 			</tr> ";
		ctrlObj += " 			<tr height=\"11\"> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#4E003D\" onmousedown=\"htmledit('backcolor', false, '#4E003D', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#6D2262\" onmousedown=\"htmledit('backcolor', false, '#6D2262', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#926594\" onmousedown=\"htmledit('backcolor', false, '#926594', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#C2A9C5\" onmousedown=\"htmledit('backcolor', false, '#C2A9C5', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#005557\" onmousedown=\"htmledit('backcolor', false, '#005557', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#03747B\" onmousedown=\"htmledit('backcolor', false, '#03747B', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#579D9F\" onmousedown=\"htmledit('backcolor', false, '#579D9F', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#A2C6CC\" onmousedown=\"htmledit('backcolor', false, '#A2C6CC', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#FF6600\" onmousedown=\"htmledit('backcolor', false, '#FF6600', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#FF9933\" onmousedown=\"htmledit('backcolor', false, '#FF9933', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#FECD8A\" onmousedown=\"htmledit('backcolor', false, '#FECD8A', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#FEE2B0\" onmousedown=\"htmledit('backcolor', false, '#FEE2B0', '"+i+"');\"></td> ";
		ctrlObj += " 			</tr> ";
		ctrlObj += " 			<tr height=\"11\"> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#1B0B73\" onmousedown=\"htmledit('backcolor', false, '#1B0B73', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#4C379D\" onmousedown=\"htmledit('backcolor', false, '#4C379D', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#876EBA\" onmousedown=\"htmledit('backcolor', false, '#876EBA', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#BBBAEF\" onmousedown=\"htmledit('backcolor', false, '#BBBAEF', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#008E37\" onmousedown=\"htmledit('backcolor', false, '#008E37', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#26B168\" onmousedown=\"htmledit('backcolor', false, '#26B168', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#47BE80\" onmousedown=\"htmledit('backcolor', false, '#47BE80', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#76D3A2\" onmousedown=\"htmledit('backcolor', false, '#76D3A2', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#B31C00\" onmousedown=\"htmledit('backcolor', false, '#B31C00', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#B03F21\" onmousedown=\"htmledit('backcolor', false, '#B03F21', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#AE623A\" onmousedown=\"htmledit('backcolor', false, '#AE623A', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#AC6E54\" onmousedown=\"htmledit('backcolor', false, '#AC6E54', '"+i+"');\"></td> ";
		ctrlObj += " 			</tr> ";
		ctrlObj += " 			<tr height=\"11\"> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#FEFEFE\" onmousedown=\"htmledit('backcolor', false, '#FEFEFE', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#E6E6E6\" onmousedown=\"htmledit('backcolor', false, '#E6E6E6', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#CDCDCD\" onmousedown=\"htmledit('backcolor', false, '#CDCDCD', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#B4B4B4\" onmousedown=\"htmledit('backcolor', false, '#B4B4B4', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#A8A8A8\" onmousedown=\"htmledit('backcolor', false, '#A8A8A8', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#8D8D8D\" onmousedown=\"htmledit('backcolor', false, '#8D8D8D', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#747474\" onmousedown=\"htmledit('backcolor', false, '#747474', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#595959\" onmousedown=\"htmledit('backcolor', false, '#595959', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#4B4B4B\" onmousedown=\"htmledit('backcolor', false, '#4B4B4B', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#303030\" onmousedown=\"htmledit('backcolor', false, '#303030', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#0A0A0A\" onmousedown=\"htmledit('backcolor', false, '#0A0A0A', '"+i+"');\"></td> ";
		ctrlObj += " 			<td width=\"11\" bgcolor=\"#000000\" onmousedown=\"htmledit('backcolor', false, '#000000', '"+i+"');\"></td> ";
		ctrlObj += " 			</tr> ";
		ctrlObj += " 			</table> ";
		ctrlObj += " 			</td> ";
		ctrlObj += " 		</table> ";
		ctrlObj += " 	</div> ";
		ctrlObj += " </td> ";
		//ctrlObj += " <td align=\"right\"><a href=\"javascript:PreView('"+i+"')\"><img src=\"images/btn_preview.gif\" border=\"0\" align=\"right\"></a></td> ";
		ctrlObj += " </table> ";

		var tableObj = document.createElement("table");
		if(document.all){
			var trObj = tableObj.insertRow();
			var tdObj = trObj.insertCell(); 
		}else{
			var trObj = document.createElement('tr'); 
			var tdObj = document.createElement('td');
			tableObj.setAttribute("cellspacing","0");
			tableObj.setAttribute("cellspacing","0");
			tableObj.setAttribute("border","0");
		}
			
			tableObj.setAttribute("id","td"+textareaName[i]);
		if(!document.all){
			trObj.appendChild(tdObj);
			tableObj.appendChild(trObj);
		}
		editorFrameObj.parentNode.insertBefore(tableObj,editorFrameObj);
		tdObj.innerHTML = ctrlObj;
	}
}