<?php
if(!defined("__ZBXE__")) exit();

	function geRitLocalFile($src,$ri_avoid,$permanent='N') {
		$url = parse_url($src);
		$domain = str_ireplace('www.','',$url['host']);
		$path_parts = pathinfo($url['path']);
		$dir = $path_parts['dirname'];
		$fn = $path_parts['basename'];

        if(in_array($domain,$ri_avoid)) return $src;

		$dir =  cleanUrlRi($dir);
		$fn = cleanUrlRi($fn);

		if($permanent == 'Y') $f = './files/attach/outimage/';
        else $f ='./files/cache/outimage/';
        $tmp_folder = sprintf('%s%s%s',$f.$domain,$dir);
		if(!is_dir($tmp_folder)) FileHandler::makeDir($tmp_folder);
        $tmp_file = sprintf('%s%s%s/%s',$f,$domain,$dir,$fn);
		if(!preg_match("/\.(jpg|png|jpeg|gif)$/i",$tmp_file)) $tmp_file = $tmp_file.".gif";
		if(file_exists(realpath($tmp_file))) return str_replace('./','',$tmp_file);
        else if(FileHandler::getRemoteFile($src, $tmp_file)) return str_replace('./','',$tmp_file);
		else return $src;
    }

	function extractImage($content) {
		$content = strip_tags($content,'<img>');
		preg_match_all('@src\s*=\s*(["\'])([^\s>]+?)\1@i',$content, $temp_src); 
		return image_array($temp_src[2]);
	}
	
    function cleanUrlRi($text) {
		return implode("_",preg_split('/\s/i',strtolower($text)));
    }

	function image_array($temp_src) {
		if(!count($temp_src)) return array();
		foreach($temp_src as $val) {
            $src = str_replace("\"","",$val);
            if(preg_match('/^(http|https):\/\//i',$src)) $list[]= $src;
        }
        $list=array_unique($list);
		return $list;
	}
	
?>