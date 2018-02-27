<?php
	if(!defined("__ZBXE__")) exit();
	
	/**
	 * @file elkha_www.addon.php
	 * @author Elkha (elkha1914@hotmail.com)
	 **/

	// 모듈 객체 생성 이전
	if($called_position != before_module_init) return;
	// 관리자 모드
	// if(Context::get("module")=="admin") return;

	// 설정한 주소
	$site_module_info = Context::get("site_module_info");
	$domain = $site_module_info->domain;
	$domain = parse_url($domain);

	// 설정한 주소 - www 포함 여부
	if(strpos($domain["host"], "www.") === 0) $www_setting = true;
	else $www_setting = false;

	// 현재 주소 - www 포함 여부
	if(strpos($_SERVER["HTTP_HOST"], "www.") === 0) $www_current = true;
	else $www_current = false;

	if($www_setting && $www_current) return;
	if(!$www_setting && !$www_current) return;

	// www 추가
	if($www_setting) $goto = "www." . $_SERVER["HTTP_HOST"];
	// www 제거
	if(!$www_setting) $goto = str_replace("www.", "", $_SERVER["HTTP_HOST"]);

	// www 추가/제거된 도메인이 XE 설정과 같은지 검사
	if($goto!=$domain["host"]) return;

	header("Location: http://$goto" . $_SERVER["REQUEST_URI"]);
	exit;
?>