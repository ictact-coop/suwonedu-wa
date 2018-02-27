<?php
	if(!defined("__XE__") && !defined("__ZBXE__") ) exit();

	/**
	 * @file searchhighlight.addon.php
	 * @brief 통합검색어에 강조 표시를 해준다.
	 **/
	if($called_position == 'before_module_proc') {
		if(Context::getResponseMethod() == 'HTML') {
			if($this->act == 'IS' && Context::get('is_keyword') != '') {
				Context::addCSSFile('./addons/searchhighlight/css/default.css');
				Context::set('searchhighlight', 'IS');
				return;
			}else if($this->act == 'dispBoardContent' && Context::get('search_keyword') != ''){
				Context::addCSSFile('./addons/searchhighlight/css/default.css');
				Context::set('searchhighlight', 'DC');
				return;
			}
		}
	}else if($called_position == 'before_display_content' && Context::get('module') != 'admin'){
		if(Context::getResponseMethod() == 'HTML') {
			if(Context::get('searchhighlight') != '') {
				$is_keyword = Context::get('search_keyword');
				if(Context::get('searchhighlight') == 'IS') $is_keyword = Context::get('is_keyword');
				$keywords = explode(" ", $is_keyword);
				
				$track = $output;
				foreach ($keywords as $val){
					$track = preg_replace('/\<(li|d[tdl]|img|p|a|span|div|font)([^\>]*?)\>([^\<]*?)('.$val.')([^\>]*?)\>/is', '<$1$2>$3<span class="search_highlight">$4</span>$5>', $track);
				}
			
				if($track) $output = $track;
				unset($track);
			}
		}
	}
?>
