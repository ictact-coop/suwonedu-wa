<?php
	if(!defined('__XE__')) exit();

	$disp_member = Context::get('act');
	if(strpos($disp_member, 'dispMember') !== FALSE) return;

	if($called_position == 'before_module_proc' && Context::getResponseMethod()=='HTML' && !Context::get('hide_trolley')) {
		require_once('./addons/xe_trolley/xe_trolley.lib.php');

		$addon_info->r_trolley_id = 'xe_trolley';

		$logged_info = Context::get('logged_info');
		Context::set('logged_info', $logged_info);

		if($this->module == 'nproduct') {
			// Cookie Check & Update
			checkRecentItems($module_name, $addon_info, $this->module);
		}

		// Recent Item Set View
		setRecentView($addon_info);
	}

	if($called_position == 'before_display_content' && Context::getResponseMethod()=='HTML' && !Context::get('hide_trolley')) {

	
		$addon_info->r_trolley_id = 'xe_trolley';

		Context::set('addon_info',$addon_info);
		Context::set('recent_pass', '');

		// Template File
		$tpl_file = 'xe_trolley';
		$oTemplate = &TemplateHandler::getInstance();
		$output = $output.$oTemplate->compile('./addons/xe_trolley/tpl', $tpl_file);
	}
?>
