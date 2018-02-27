<?php
if(!defined("__ZBXE__")) exit();

if($called_position != 'before_module_proc' || Context::getResponseMethod()!="HTML") return;
$logged_info = Context::get('logged_info');
if(!$logged_info) return;

$module = Context::get('module');
if(!$module) $module = $this->module;
if($module == 'communication' || $module == 'admin' || $module == 'member') return;
$link   = Context::getRequestUri().'?mid='.Context::get('mid').'&act=dispCommunicationMessages';
	
$aobj->receiver_srl = $logged_info->member_srl;
$aobj->readed = 'N';
$aobj->related_srl = 0;
$output = executeQueryArray('addons.message_alarm.getMessageCount', $aobj);
if(!count($output->data)) return;
if($addon_info->mode == 'jgrowl') {
	if($addon_info->jgrowl_js=='yes'){
		Context::addCSSFile("./addons/message_alarm/jquery.jgrowl.css", false);
		Context::addJsFile('./addons/message_alarm/jquery.jgrowl.min.js', false ,'', null, 'body');
	}
	if(!$addong_info->mode2=='default'){
		foreach($output->data as $key=>$val){
			$oMemberModel =& getModel('member');
			$member_info = $oMemberModel->getMemberInfoByMemberSrl($val->sender_srl);
			$message = $message."\n$.jGrowl('<a href=\"".getURL('act','dispCommunicationMessages','message_srl',$val->message_srl)."\">쪽지가 도착하였습니다. <br />".strip_tags($val->title)."<br /><p style=\'margin:0;text-align:right;font-size:.95em\'>by ".$member_info->nick_name."</p></a>',{life: 15000 });";
		}
		$text = '<script type="text/javascript">jQuery(function($){'.$message.'});</script>';
	} else {
		$text = '<script type="text/javascript">jQuery(function($){
			$.jGrowl("<a href=\"'.$link.'\">읽지않은 쪽지가 '.count($output->data).'개 있습니다.<br />지금 확인하시겠습니까?</a>", { life: 15000 });
		});</script>';
	}
}
elseif($addon_info->mode == 'default') {
	$text = '<script type="text/javascript">alert("읽지않은 쪽지가 '.count($output->data).'개 있습니다.")</script>';
}
elseif($addon_info->mode == 'layer') 
{
	$sc =  "var message = '읽지않은 쪽지가 ".count($output->data)."개 있습니다. 확인하시겠습니까?';\nvar messageurl = '".$link."';";
	$text = '<script type="text/javascript">'.$sc.'</script>';
	Context::addCSSFile("./addons/message_alarm/notify.css", false);
	Context::addJsFile('./addons/message_alarm/notify.js', false ,'', null, 'body');
}
elseif($addon_info->mode == 'confirm') 
{
	$sc =  "var message = '읽지않은 쪽지가 ".count($output->data)."개 있습니다.확인하시겠습니까?';\nvar url = '".$link."';\n if(confirm(message)) location.href= url ;";
	$text = '<script type="text/javascript">'.$sc.'</script>';
}
else {
	$sc =  "var message = '읽지않은 쪽지가 ".count($output->data)."개 있습니다. 지금 확인하시겠습니까?';\nvar messageurl = '".$link."';";
	$text = '<script type="text/javascript">'.$sc.'</script>';
}
Context::addHtmlFooter($text);
?>