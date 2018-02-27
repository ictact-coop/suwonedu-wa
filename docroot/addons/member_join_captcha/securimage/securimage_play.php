<?php

	define('__ZBXE__', true);
	require_once('../../../config/config.inc.php'); 
	$oContext = &Context::getInstance(); 
	$oContext->init(); 

	include 'securimage.php';

	$img = new Securimage();
	$img->audio_format = (isset($_GET['format']) && in_array(strtolower($_GET['format']), array('mp3', 'wav')) ? strtolower($_GET['format']) : 'mp3');

	$img->outputAudioFile();

?>