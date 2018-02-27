<?php
/**
 * Class of stats module
 *
 * @author Amado
 */
class stats extends ModuleObject
{
	protected $session_type;

    public function __construct() {
    	$this->session_type = 'ip_address'; // ip_address, session_id;
	}

	/**
	 * Implement if additional tasks are necessary when installing
	 * @return Object
	 */
	function moduleInstall()
	{
		return new Object();
	}

	/**
	 * method if successfully installed
	 *
	 * @return bool
	 */
	function checkUpdate()
	{
		return FALSE;
	}

	/**
	 * Module update
	 *
	 * @return Object
	 */
	function moduleUpdate()
	{
		return FALSE;
	}

	/**
	 * re-generate the cache file
	 *
	 * @return Object
	 */
	function recompileCache()
	{
		
	}

	function getConfig() {
		$config = getModel('module')->getModuleConfig('stats');
		if(!$config->stats_ignore_admin) $config->stats_ignore_admin = 'N';
		if(!$config->stats_ignore_bot) $config->stats_ignore_bot = 'N';
		if(!$config->stats_ignore_ip) $config->stats_ignore_ip = '';
		if(!$config->stats_enable_admin_layer) $config->stats_enable_admin_layer = 'Y';
		
		return $config;
	}

}