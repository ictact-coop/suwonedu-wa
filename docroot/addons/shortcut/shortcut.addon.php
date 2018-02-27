<?php
    if(!defined("__ZBXE__")) exit();

    /**
     * @file shortcut.addon.php
     * @author findwind (findwind@naver.com)
     * @brief shortcut
     * 수정 : fsfsdas(http://starforum.kr, admin@starforum.kr)
     *
     **/

    // called_position이 after_module_proc일 때만 실행; module이 admin이 아닐 경우에만 실행; 설정화면에서 실행 안 되게 함
    if(Context::get('module')=='admin' || $called_position != 'after_module_proc') return;

switch ($this->act) {
	case "dispBoardWrite":case "procCounterExecute":case "getPlannerEntriesXml":
	case "dispWidgetGenerate":case "dispAddonAdminSetup":
	case "dispPageAdminContentModify":case "dispPageAdminContentModify":
	case "dispBoardAdminCategoryInfo":case "dispBoardAdminGrantInfo":
	case "dispBoardAdminSkinInfo":case "dispBoardAdminBoardInfo":
	case "dispBoardAdminBoardAdditionSetup":case "dispWidgetGenerateCodeInPage":
	case "dispWidgetAdminAddContent":case "procPageAdminRemoveWidgetCache":
	case "dispCommunicationSendMessage":case "getMemberMenu":
	case "dispWidgetGenerateCode":case "dispWidgetInfo":case "dispBoardAdminInsertBoard":
	case "procMemberLogin":case "dispPlannerWrite":return; break;
	
	case "dispBoardContent" : $c_mid="board"; break;
	case "dispPlannerContent" : $c_mid="planner"; break;
	default : $c_mid=""; break;
}


	$c_page = Context::get('page');
  $last_page = Context::get('total_page');
  
switch ($c_mid) {
	case "board" : 

	if ($_GET['page']>$c_page) {
	echo("<script type=\"text/javascript\">alert(\"This page is last page.\"); 
	history.back();</script>"); exit;
	}

	$prev_list_Url=eregi_replace("&amp;", "&", getUrl('page',$c_page-1,'document_srl',''));
	$next_list_Url=eregi_replace("&amp;", "&", getUrl('page',$c_page+1,'document_srl',''));
	$write_Url=eregi_replace("&amp;", "&", getUrl('act','dispBoardWrite','document_srl',''));
	break;

	case "planner" : 
	$prev_list_Url="";
	$next_list_Url="";
	$write_Url=eregi_replace("&amp;", "&", getUrl('act','dispPlannerWrite','document_srl',''));
	break;

	default : 
	$prev_list_Url="";
	$next_list_Url="";
	$write_Url="";
	break;
}
	$script_shortcut = "
<script type = \"text/javascript\">
    var fields = ['charCode', 'keyCode', 'which', 'type', 'timeStamp', 
                  'altKey', 'ctrlKey', 'shiftKey', 'metaKey'];
    var types = ['keydown', 'keypress', 'keyup'];

	function go_URL(gurl) {	window.location = gurl; return false;	}

    document.onkeydown = function(e) {
	e = e || window.event;
	var k = KeyCode;
	var current_key = k.hot_key(k.translate_event(e));

		var tag = (e.target || e.srcElement).tagName.toLowerCase();
		if(tag == \"textarea\" || tag == \"input\") return;

	if (e.ctrlKey==true  &&  e.keyCode=='65') {  return true; } // Ctrl + A
	if (e.ctrlKey==true  &&  e.keyCode=='67') {  return true; } // Ctrl + C
	if (e.ctrlKey==true  &&  e.keyCode=='69') {  return true; } // Ctrl + E
	if (e.ctrlKey==true  &&  e.keyCode=='70') {  return true; } // Ctrl + F
	if (e.ctrlKey==true  &&  e.keyCode=='78') {  return true; } // Ctrl + N
	if (e.ctrlKey==true  &&  e.keyCode=='82') {  return true;  } // Ctrl + R
	if (e.ctrlKey==true  &&  e.keyCode=='84') {  return true;  } // Ctrl + T
	if (e.ctrlKey==true  &&  e.keyCode=='86') {  return true;  } // Ctrl + V
	if (e.ctrlKey==true  &&  e.keyCode=='88') {  return true;  } // Ctrl + X
	if (e.ctrlKey==true  &&  e.keyCode=='115') {  return true;  } // Ctrl + F4

	if (e.altKey==true  &&  e.keyCode=='68') {  return true;  } // Alt + D
	if (e.altKey==true  &&  e.keyCode=='37') {  return true;  } // Alt + Left
	if (e.altKey==true  &&  e.keyCode=='39') {  return true;  } // Alt + Right
	if (e.altKey==true  &&  e.keyCode=='115') {  return true;  } // Alt + F4

	if (e.keyCode=='116') {  return true; } // F5
	if (e.keyCode=='36') {  return true; } // Home
	if (e.keyCode=='35') {  return true; } // End
	if (e.keyCode=='33') {  return true; } // PageUp
	if (e.keyCode=='34') {  return true; } // PageDown";
	if (e.keyCode=='38') {  return true; } // Up-Arrow
	if (e.keyCode=='40') {  return true; } // Down-Arrow
	if (e.keyCode=='8') {  return true; } // BackSpace
	if (e.keyCode=='32') {  return true; } // Space";


if ($addon_info->ctrlkey_dis=="N")
{
$script_shortcut .= "
	if (e.ctrlKey==true  &&  e.keyCode=='49') {  return true; } // Ctrl + 1
	if (e.ctrlKey==true  &&  e.keyCode=='50') {  return true; } // Ctrl + 2
	if (e.ctrlKey==true  &&  e.keyCode=='51') {  return true; } // Ctrl + 3
	if (e.ctrlKey==true  &&  e.keyCode=='52') {  return true; } // Ctrl + 4
	if (e.ctrlKey==true  &&  e.keyCode=='53') {  return true; } // Ctrl + 5
	if (e.ctrlKey==true  &&  e.keyCode=='54') {  return true; } // Ctrl + 6
	if (e.ctrlKey==true  &&  e.keyCode=='55') {  return true; } // Ctrl + 7
	if (e.ctrlKey==true  &&  e.keyCode=='56') {  return true; } // Ctrl + 8
	if (e.ctrlKey==true  &&  e.keyCode=='57') {  return true; } // Ctrl + 9
	if (e.ctrlKey==true  &&  e.keyCode=='48') {  return true; } // Ctrl + 1
";
};

	
	$script_shortcut .= "
	switch (current_key)
		{
";

$addon_info->shortcut_write=strtolower($addon_info->shortcut_write);
$addon_info->shortcut_list=strtolower($addon_info->shortcut_list);
$addon_info->shortcut_prev=strtolower($addon_info->shortcut_prev);
$addon_info->shortcut_next=strtolower($addon_info->shortcut_next);
$addon_info->shortcut_prev_list=strtolower($addon_info->shortcut_prev_list);
$addon_info->shortcut_next_list=strtolower($addon_info->shortcut_next_list);

$addon_info->shortcut1=strtolower($addon_info->shortcut1);$addon_info->shortcut2=strtolower($addon_info->shortcut2);$addon_info->shortcut3=strtolower($addon_info->shortcut3);$addon_info->shortcut4=strtolower($addon_info->shortcut4);$addon_info->shortcut5=strtolower($addon_info->shortcut5);$addon_info->shortcut6=strtolower($addon_info->shortcut6);$addon_info->shortcut7=strtolower($addon_info->shortcut7);$addon_info->shortcut8=strtolower($addon_info->shortcut8);$addon_info->shortcut9=strtolower($addon_info->shortcut9);$addon_info->shortcut10=strtolower($addon_info->shortcut10);
$addon_info->shortcut11=strtolower($addon_info->shortcut11);$addon_info->shortcut12=strtolower($addon_info->shortcut12);$addon_info->shortcut13=strtolower($addon_info->shortcut13);$addon_info->shortcut14=strtolower($addon_info->shortcut14);$addon_info->shortcut15=strtolower($addon_info->shortcut15);$addon_info->shortcut16=strtolower($addon_info->shortcut16);$addon_info->shortcut17=strtolower($addon_info->shortcut17);$addon_info->shortcut18=strtolower($addon_info->shortcut18);$addon_info->shortcut19=strtolower($addon_info->shortcut19);$addon_info->shortcut20=strtolower($addon_info->shortcut20);
$addon_info->shortcut21=strtolower($addon_info->shortcut21);$addon_info->shortcut22=strtolower($addon_info->shortcut22);$addon_info->shortcut23=strtolower($addon_info->shortcut23);$addon_info->shortcut24=strtolower($addon_info->shortcut24);$addon_info->shortcut25=strtolower($addon_info->shortcut25);$addon_info->shortcut26=strtolower($addon_info->shortcut26);$addon_info->shortcut27=strtolower($addon_info->shortcut27);$addon_info->shortcut28=strtolower($addon_info->shortcut28);$addon_info->shortcut29=strtolower($addon_info->shortcut29);$addon_info->shortcut30=strtolower($addon_info->shortcut30);
$addon_info->shortcut31=strtolower($addon_info->shortcut31);$addon_info->shortcut32=strtolower($addon_info->shortcut32);$addon_info->shortcut33=strtolower($addon_info->shortcut33);$addon_info->shortcut34=strtolower($addon_info->shortcut34);$addon_info->shortcut35=strtolower($addon_info->shortcut35);$addon_info->shortcut36=strtolower($addon_info->shortcut36);$addon_info->shortcut37=strtolower($addon_info->shortcut37);$addon_info->shortcut38=strtolower($addon_info->shortcut38);$addon_info->shortcut39=strtolower($addon_info->shortcut39);$addon_info->shortcut40=strtolower($addon_info->shortcut40);

if ($addon_info->board_use=="Y")
{
if($addon_info->shortcut_list != null) $script_shortcut .= "
			case \"$addon_info->shortcut_list\" : 	go_list(); break;";
if($addon_info->shortcut_write != null && $write_Url!="") $script_shortcut .= "
			case \"$addon_info->shortcut_write\" : 	go_URL(\"$write_Url\"); break;";
if($addon_info->shortcut_prev != null) $script_shortcut .= "
			case \"$addon_info->shortcut_prev\" : 	go_prev(); break;";
if($addon_info->shortcut_next != null) $script_shortcut .= "
			case \"$addon_info->shortcut_next\" : 	go_next(); break;";
if($addon_info->shortcut_latest != null && $c_mid=="board") $script_shortcut .= "
			case \"$addon_info->shortcut_latest\" : 	go_latest(); break;";
if($addon_info->shortcut_prev_list != null && $c_page>1 && $prev_list_Url!="") $script_shortcut .= "
			case \"$addon_info->shortcut_prev_list\" : 	go_URL(\"$prev_list_Url\"); break;";
if($addon_info->shortcut_next_list != null && $next_list_Url!="") $script_shortcut .= "
			case \"$addon_info->shortcut_next_list\" : 	go_URL(\"$next_list_Url\"); break;";
}


	if($addon_info->shortcut1 != null) $script_shortcut .= "
			case \"$addon_info->shortcut1\" : 	go_URL(\"$addon_info->href1\"); break;";
	if($addon_info->shortcut2 != null) $script_shortcut .= "
			case \"$addon_info->shortcut2\" : 	go_URL(\"$addon_info->href2\"); break;";
	if($addon_info->shortcut3 != null) $script_shortcut .= "
			case \"$addon_info->shortcut3\" : 	go_URL(\"$addon_info->href3\"); break;";
	if($addon_info->shortcut4 != null) $script_shortcut .= "
			case \"$addon_info->shortcut4\" : 	go_URL(\"$addon_info->href4\"); break;";
	if($addon_info->shortcut5 != null) $script_shortcut .= "
			case \"$addon_info->shortcut5\" : 	go_URL(\"$addon_info->href5\"); break;";
	if($addon_info->shortcut6 != null) $script_shortcut .= "
			case \"$addon_info->shortcut6\" : 	go_URL(\"$addon_info->href6\"); break;";
	if($addon_info->shortcut7 != null) $script_shortcut .= "
			case \"$addon_info->shortcut7\" : 	go_URL(\"$addon_info->href7\"); break;";
	if($addon_info->shortcut8 != null) $script_shortcut .= "
			case \"$addon_info->shortcut8\" : 	go_URL(\"$addon_info->href8\"); break;";
	if($addon_info->shortcut9 != null) $script_shortcut .= "
			case \"$addon_info->shortcut9\" : 	go_URL(\"$addon_info->href9\"); break;";
	if($addon_info->shortcut10 != null) $script_shortcut .= "
			case \"$addon_info->shortcut10\" : 	go_URL(\"$addon_info->href10\"); break;";

	if($addon_info->shortcut11 != null) $script_shortcut .= "
			case \"$addon_info->shortcut11\" : 	go_URL(\"$addon_info->href11\"); break;";
	if($addon_info->shortcut12 != null) $script_shortcut .= "
			case \"$addon_info->shortcut12\" : 	go_URL(\"$addon_info->href12\"); break;";
	if($addon_info->shortcut13 != null) $script_shortcut .= "
			case \"$addon_info->shortcut13\" : 	go_URL(\"$addon_info->href13\"); break;";
	if($addon_info->shortcut14 != null) $script_shortcut .= "
			case \"$addon_info->shortcut14\" : 	go_URL(\"$addon_info->href14\"); break;";
	if($addon_info->shortcut15 != null) $script_shortcut .= "
			case \"$addon_info->shortcut15\" : 	go_URL(\"$addon_info->href15\"); break;";
	if($addon_info->shortcut16 != null) $script_shortcut .= "
			case \"$addon_info->shortcut16\" : 	go_URL(\"$addon_info->href16\"); break;";
	if($addon_info->shortcut17 != null) $script_shortcut .= "
			case \"$addon_info->shortcut17\" : 	go_URL(\"$addon_info->href17\"); break;";
	if($addon_info->shortcut18 != null) $script_shortcut .= "
			case \"$addon_info->shortcut18\" : 	go_URL(\"$addon_info->href18\"); break;";
	if($addon_info->shortcut19 != null) $script_shortcut .= "
			case \"$addon_info->shortcut19\" : 	go_URL(\"$addon_info->href19\"); break;";
	if($addon_info->shortcut20 != null) $script_shortcut .= "
			case \"$addon_info->shortcut20\" : 	go_URL(\"$addon_info->href20\"); break;";

	if($addon_info->shortcut21 != null) $script_shortcut .= "
			case \"$addon_info->shortcut21\" : 	go_URL(\"$addon_info->href21\"); break;";
	if($addon_info->shortcut22 != null) $script_shortcut .= "
			case \"$addon_info->shortcut22\" : 	go_URL(\"$addon_info->href22\"); break;";
	if($addon_info->shortcut23 != null) $script_shortcut .= "
			case \"$addon_info->shortcut23\" : 	go_URL(\"$addon_info->href23\"); break;";
	if($addon_info->shortcut24 != null) $script_shortcut .= "
			case \"$addon_info->shortcut24\" : 	go_URL(\"$addon_info->href24\"); break;";
	if($addon_info->shortcut25 != null) $script_shortcut .= "
			case \"$addon_info->shortcut25\" : 	go_URL(\"$addon_info->href25\"); break;";
	if($addon_info->shortcut26 != null) $script_shortcut .= "
			case \"$addon_info->shortcut26\" : 	go_URL(\"$addon_info->href26\"); break;";
	if($addon_info->shortcut27 != null) $script_shortcut .= "
			case \"$addon_info->shortcut27\" : 	go_URL(\"$addon_info->href27\"); break;";
	if($addon_info->shortcut28 != null) $script_shortcut .= "
			case \"$addon_info->shortcut28\" : 	go_URL(\"$addon_info->href28\"); break;";
	if($addon_info->shortcut29 != null) $script_shortcut .= "
			case \"$addon_info->shortcut29\" : 	go_URL(\"$addon_info->href29\"); break;";
	if($addon_info->shortcut30 != null) $script_shortcut .= "
			case \"$addon_info->shortcut30\" : 	go_URL(\"$addon_info->href30\"); break;";

	if($addon_info->shortcut31 != null) $script_shortcut .= "
			case \"$addon_info->shortcut31\" : 	go_URL(\"$addon_info->href31\"); break;";
	if($addon_info->shortcut32 != null) $script_shortcut .= "
			case \"$addon_info->shortcut32\" : 	go_URL(\"$addon_info->href32\"); break;";
	if($addon_info->shortcut33 != null) $script_shortcut .= "
			case \"$addon_info->shortcut33\" : 	go_URL(\"$addon_info->href33\"); break;";
	if($addon_info->shortcut34 != null) $script_shortcut .= "
			case \"$addon_info->shortcut34\" : 	go_URL(\"$addon_info->href34\"); break;";
	if($addon_info->shortcut35 != null) $script_shortcut .= "
			case \"$addon_info->shortcut35\" : 	go_URL(\"$addon_info->href35\"); break;";
	if($addon_info->shortcut36 != null) $script_shortcut .= "
			case \"$addon_info->shortcut36\" : 	go_URL(\"$addon_info->href36\"); break;";
	if($addon_info->shortcut37 != null) $script_shortcut .= "
			case \"$addon_info->shortcut37\" : 	go_URL(\"$addon_info->href37\"); break;";
	if($addon_info->shortcut38 != null) $script_shortcut .= "
			case \"$addon_info->shortcut38\" : 	go_URL(\"$addon_info->href38\"); break;";
	if($addon_info->shortcut39 != null) $script_shortcut .= "
			case \"$addon_info->shortcut39\" : 	go_URL(\"$addon_info->href39\"); break;";
	if($addon_info->shortcut40 != null) $script_shortcut .= "
			case \"$addon_info->shortcut40\" : 	go_URL(\"$addon_info->href40\"); break;";
	
$script_shortcut .= "}
		
	KeyCode.key_down(e);

";

if ($addon_info->browser_dis=="Y")
{
	$script_shortcut .= "	if (e.preventDefault) {	e.preventDefault();	e.stopPropagation();
	} else {	e.returnValue = false;	e.cancelBubble = true;	 }";
}
$script_shortcut .= "    };

	document.onkeypress = function(zbxe_shortcut_e) {
        if(typeof(zbxe_shortcut_e) !=\"undefined\")
        { KeyCode.key_down(zbxe_shortcut_e); }
        else
        { KeyCode.key_down(); };

    };

</script>

	";


$script_shortcut_footer ="
	<div class=\"hidden_div\" id=\"hidden_id\" style=\"position:absolute;width:0px;height:0px;left:-2000px;top:-2000px;z-index:-1;\">";

$ie_disable_key=explode(",",str_replace(" ", "", $addon_info->ie_shortcut_disable));
foreach($ie_disable_key as $key => $ie_disable_keycode) {
$script_shortcut_footer .="<input type=\"radio\" accesskey=\"$ie_disable_keycode\" onclick=\"document.getElementById('hidden_id').focus();\" />"; }

	$script_shortcut_footer .="</div>
	";

	Context::addJsFile('./addons/shortcut/js/shortcut.js');
	Context::addHtmlHeader($script_shortcut);
	Context::addHtmlFooter($script_shortcut_footer);

?>
