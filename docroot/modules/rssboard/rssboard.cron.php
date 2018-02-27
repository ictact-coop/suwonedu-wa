<?php

    /**
	 * @file	rssboard.cron.php
     * @author	ChoiHeeChul, KimJinHwan, ParkSunYoung
     * @brief 	RSS 게시판 업데이터 모듈을 주기적으로 실행시키기 위한 cron 용 스크립트 \n
     * 참고사이트 http://www.moonseller.net/247  
    */

define('__ZBXE__', true);

/** 
* @brief 필요한 설정 파일들을 include 
**/ 
require('./config/config.inc.php');
//require('./config/config.user.inc.php');

/** 
* @brief Context 객체를 생성하여 초기화 
* 모든 Request Argument/ 환경변수등을 세팅 
**/ 
$oContext = &Context::getInstance(); 
$oContext->init();

include './modules/rssboard/rssboard.class.php'; 
include './modules/rssboard/rssboard.controller.php';

require_once './modules/document/document.class.php';
require_once './modules/document/document.model.php'; 
require_once './modules/document/document.controller.php';

// RSS 게시판 업데이터의 doCrawl 실행
$rssboard = new rssboardController(); 
$rssboard->init();
$ret = $rssboard->doCrawl();
print "{$ret->message}\n"; // webcron 서비스를 위해서 output 생성
$oContext->close();

?>
