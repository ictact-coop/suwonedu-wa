<?php
class easyxeModel extends easyxe
{
	public function getEasyxeConfig()
	{
		static $config = NULL;
		if(is_null($config))
		{
			$oModuleModel = getModel('module');
			$config = $oModuleModel->getModuleConfig('easyxe');
			if(!isset($config))
			{
				$config = new stdClass;
			}

			if(!isset($config->customMessages))
			{
				$config->customMessages = new stdClass;
			}

			if(!isset($config->submanager_group))
			{
				$config->submanager_group = array();
			}
		}

		return $config;
	}

	public function getEasyxePartConfig($module_srl)
	{
		$oModuleModel = getModel('module');
		$config = $oModuleModel->getModulePartConfig('easyxe', $module_srl);
		if(!isset($config))
		{
			$config = new stdClass;
		}

		if(!isset($config->customMessages))
		{
			$config->customMessages = new stdClass;
		}

		return $config;
	}
}