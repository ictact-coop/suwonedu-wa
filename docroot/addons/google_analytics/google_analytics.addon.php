<?php
    if(!defined("__ZBXE__")) exit();

    /**
     * @file google_analytics.addon.php
     * @author zero (zero@nzeo.com)
     * @brief google analytics 코드를 사이트에 추가함
     **/

    // 관리자 모듈이면 패스~
    if(Context::get('module')=='admin') return;

    // 한번만 출력시키기 위해 전역변수에 호출되었음을 체크해 놓음 (called position과 상관없음)
    if($GLOBALS['_called_addon_google_analytics_']) return;
    $GLOBALS['_called_addon_google_analytics_'] = true;

    $js_code = <<<EndOfGA



<script type="text/javascript">  
var _gaq = _gaq || [];  
_gaq.push(['_setAccount', '{$addon_info->uacct}']); 
_gaq.push(['_trackPageview']);  
(function() 
{    
var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;    
ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';    
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);  
}
)();
</script>

EndOfGA;
    Context::addHtmlHeader($js_code);
?>