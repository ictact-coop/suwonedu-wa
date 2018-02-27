<?php
/* Copyright (C) UPGLE <http://www.upgle.com> */

if(!defined('__XE__'))
	exit();

/**
 * @file hide_mid.addon.php
 * @author UPGLE (admin@upgle.com)
 * @brief Hide a mid of XpressEngine
 */
if($called_position == 'before_module_init')
{
	if(!$this->document_srl) return;

	$oModuleModel = getModel('module');
	$module_info = $oModuleModel->getModuleInfoByDocumentSrl($this->document_srl);
	
	if($module_info) 
	{
		if(!$this->act && $this->mid && Context::getRequestMethod() == 'GET')
		{
			header('location:' . getNotEncodedUrl('', 'document_srl', $this->document_srl));
			Context::close();
			exit;
		}

		$this->mid = $module_info->mid;
		Context::set('mid', $this->mid);
	}
}
/* End of file hide_mid.addon.php */
/* Location: ./addons/hide_mid/hide_mid.addon.php */
