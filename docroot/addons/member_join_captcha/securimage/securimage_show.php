<?php 

	define('__ZBXE__', true);
	define('__XE__', true);
	require_once('../../../config/config.inc.php'); 
	$oContext = &Context::getInstance(); 
	$oContext->init(); 

	include 'securimage.php';

	$img = new securimage();

	$img->image_width = 250;
	$img->image_height = 80;
	$img->perturbation = 0.85;
	$img->image_bg_color = new Securimage_Color("#f6f6f6");
	$img->multi_text_color = array(new Securimage_Color("#3399ff"),
								   new Securimage_Color("#3300cc"),
								   new Securimage_Color("#3333cc"),
								   new Securimage_Color("#6666ff"),
								   new Securimage_Color("#99cccc")
								   );
	$img->use_multi_text = true;
	$img->text_angle_minimum = -5;
	$img->text_angle_maximum = 5;
	$img->use_transparent_text = true;
	$img->text_transparency_percentage = 30; 
	$img->num_lines = 7;
	$img->line_color = new Securimage_Color("#eaeaea");
	$img->signature_color = new Securimage_Color(rand(0, 64), rand(64, 128), rand(128, 255));
	$img->use_wordlist = true; 
	$img->show(); 

?>