<?php
class CompatibilityManager
{
	private static $act;
	private static $supportMethods = array();

	public function CompatibilityManager($act)
	{
		self::$act = $act;
	}

	public static function isSupport()
	{
		// XE 1.7 미만은 지원하지 않음
		if(version_compare('1.7', __XE_VERSION__, '>'))
		{
			return FALSE;
		}

		return TRUE;
	}
}