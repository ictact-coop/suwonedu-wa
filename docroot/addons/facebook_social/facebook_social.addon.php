<?php
if(!defined("__ZBXE__")) exit();

if(Context::getResponseMethod() == "XMLRPC" || Context::get('module') == "admin") return;
if($called_position != "before_display_content") return; 

$pos_regx = "!<\!--AfterDocument\(([0-9]+),([0-9]+)\)-->!is";
require_once("facebook_social.lib.php");
$output = preg_replace_callback($pos_regx, add_facebook_social, $output); 

?>
