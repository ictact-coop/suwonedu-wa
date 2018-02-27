<?php
    /**
     * @class xet_slider_parallax
     * @author JUNGBOK
     * @brief  최근게시물을 탭스타일의 슬라이드 효과로 출력
     * @version 1.0
     **/

	class xet_slider_parallax extends WidgetHandler {
		function proc($args) {

			// 콘텐츠 정렬 대상
			if(!in_array($args->order_target, array('list_order','update_order','readed_count','vote_count','rand()'))) $args->order_target = 'list_order';
			
			// 콘텐츠 정렬 순서
			if(!in_array($args->order_type, array('asc','desc'))) $args->order_type = 'asc';

			// 콘텐츠 출력 갯수
			if($args->list_count=='' || $args->list_count<0) $args->list_count = 5;
			
			// 위젯 세로 크기
			if($args->img_height=='' || $args->img_height<0) $args->img_height = 300;
		
			// 슬라이드 인터발 조절
			if($args->slider_interval=='' || $args->slider_interval<3000) $args->slider_interval = 5000;

			// 슬라이드 방식 선택
			if(!in_array($args->slider_type, array('true','false'))) $args->slider_type = 'true';

			// 썸네일 출력 타입
			if(!in_array($args->thumbnail_type, array('crop','ratio'))) $args->thumbnail_type = 'crop';

			// 썸네일 가로 크기
			if($args->thumbnail_width=='' || $args->thumbnail_width<0) $args->thumbnail_width = 200;

			// 썸네일 세로 크기
			if($args->thumbnail_height=='' || $args->thumbnail_height<0) $args->thumbnail_height = 200;			

			// 제목 길이
			if($args->subject_cut_size=='' || $args->subject_cut_size<0) $args->subject_cut_size = 0;

			// 내용 길이
			if($args->content_cut_size=='' || $args->content_cut_size<0) $args->content_cut_size = 200;

			// 내부적으로 쓰이는 변수 설정
			$oModuleModel = &getModel('module');
			$module_srls = $args->modules_info = $args->module_srls_info = $args->mid_lists = array();
			$site_module_info = Context::get('site_module_info');

			// 대상 모듈이 선택되어 있지 않으면 해당 사이트의 전체 모듈을 대상으로 함
			if(!$args->module_srls){
				unset($obj);
				$obj->site_srl = (int)$site_module_info->site_srl;
				$output = executeQueryArray('widgets.xet_slider_parallax.getMids', $obj);
				if($output->data) {
					foreach($output->data as $key => $val) {
						$args->modules_info[$val->mid] = $val;
						$args->module_srls_info[$val->module_srl] = $val;
						$args->mid_lists[$val->module_srl] = $val->mid;
						$module_srls[] = $val->module_srl;
					}
				}

				$args->modules_info = $oModuleModel->getMidList($obj);
				// 대상 모듈이 선택되어 있으면 해당 모듈만 추출
			} else {
				$obj->module_srls = $args->module_srls;
				$output = executeQueryArray('widgets.xet_slider_parallax.getMids', $obj);
				if($output->data) {
					foreach($output->data as $key => $val) {
						$args->modules_info[$val->mid] = $val;
						$args->module_srls_info[$val->module_srl] = $val;
						$module_srls[] = $val->module_srl;
					}
					$idx = explode(',',$args->module_srls);
					for($i=0,$c=count($idx);$i<$c;$i++) {
						$srl = $idx[$i];
						if(!$args->module_srls_info[$srl]) continue;
						$args->mid_lists[$srl] = $args->module_srls_info[$srl]->mid;
					}
				}
			}

			// 아무런 모듈도 검색되지 않았다면 종료
			if(!count($args->modules_info)) return Context::get('msg_not_founded');
			$args->module_srl = implode(',',$module_srls);

			$oDocumentModel = &getModel('document');

			// 글 목록을 구함
			$obj->module_srl = $args->module_srl;
			$obj->sort_index = $args->order_target;
			$obj->order_type = $args->order_type=="desc"?"asc":"desc";
			$obj->list_count = $args->list_count;
			$output = executeQueryArray('widgets.xet_slider_parallax.getNewestDocuments', $obj);
			if(!$output->toBool() || !$output->data) return;

			// 결과가 있으면 각 문서 객체화를 시킴
			$content_items = array();
			$first_thumbnail_idx = -1;
			if(count($output->data)) {
				foreach($output->data as $key => $attribute) {
					$oDocument = new documentItem();
					$oDocument->setAttribute($attribute, false);
					$GLOBALS['XE_DOCUMENT_LIST'][$oDocument->document_srl] = $oDocument;
					$document_srls[] = $oDocument->document_srl;
				}
				$oDocumentModel->setToAllDocumentExtraVars();

				for($i=0,$c=count($document_srls);$i<$c;$i++) {
					$oDocument = $GLOBALS['XE_DOCUMENT_LIST'][$document_srls[$i]];
					$document_srl = $oDocument->document_srl;
					$module_srl = $oDocument->get('module_srl');
					$thumbnail = $oDocument->getThumbnail($args->thumbnail_width,$args->thumbnail_height,$args->thumbnail_type);
					$img = $oDocument->getThumbnail($args->img_width,$args->img_height,$args->img_type);

					$content_item = new xet_slider_parallaxItem( $args->module_srls_info[$module_srl]->browser_title );
					$content_item->adds($oDocument->getObjectVars());
					$content_item->setTitle($oDocument->getTitle());
					$content_item->setDomain( $args->module_srls_info[$module_srl]->domain );
					$content_item->setContent($oDocument->getSummary($args->content_cut_size));
					$content_item->setLink( getSiteUrl($domain,'','document_srl',$document_srl) );
					$content_item->setThumbnail($thumbnail);
					$content_item->setIMG($img);
					$content_item->add('mid', $args->mid_lists[$module_srl]);
					if($first_thumbnail_idx==-1 && $thumbnail) $first_thumbnail_idx = $i;
					$content_items[] = $content_item;
				}

				$content_items[0]->setFirstThumbnailIdx($first_thumbnail_idx);
			}

			$oTemplate = &TemplateHandler::getInstance();

			// 위젯에 넘기기 위한 변수 설정
			$widget_info->modules_info = $args->modules_info;			

			// 콘텐츠 정렬 대상
			$widget_info->order_target = $args->order_target;

			// 콘텐츠 정렬 순서
			$widget_info->order_type = $args->order_type;

			// 콘텐츠 출력 갯수
			$widget_info->list_count = $args->list_count;

			// 위젯 세로 크기
			$widget_info->img_height = $args->img_height;

			// 슬라이드 인터발 조절
			$widget_info->slider_interval = $args->slider_interval;

			// 슬라이드 방식 선택
			$widget_info->slider_type = $args->slider_type;

			// 썸네일 출력 타입
			$widget_info->thumbnail_type = $args->thumbnail_type;

			// 썸네일 가로 크기
			$widget_info->thumbnail_width = $args->thumbnail_width;

			// 썸네일 세로 크기
			$widget_info->thumbnail_height = $args->thumbnail_height;

			// 제목색상
			$widget_info->subject_color = $args->subject_color;

			// 내용색상
			$widget_info->content_color = $args->content_color;

			// 테마색상
			$widget_info->theme_color = $args->theme_color;

			// 배경 이미지
			$widget_info->bg_img = $args->bg_img;

			// 배경색상
			$widget_info->bg_color = $args->bg_color;

			// 제목 길이
			$widget_info->subject_cut_size = $args->subject_cut_size;

			// 내용 길이
			$widget_info->content_cut_size = $args->content_cut_size;

			$widget_info->mid_lists = $args->mid_lists;
			$widget_info->content_items = $content_items;

			unset($args->modules_info);

			// 템플릿의 스킨 경로를 지정 (skin, colorset에 따른 값을 설정)
			Context::set('colorset', $args->colorset);
            Context::set('widget_info', $widget_info);

            $tpl_path = sprintf('%sskins/%s', $this->widget_path, $args->skin);
            return $oTemplate->compile($tpl_path, "content");
		}

		function _getSummary($content, $str_size = 50) {
			$content = preg_replace('!(<br[\s]*/{0,1}>[\s]*)+!is', ' ', $content);

			// </p>, </div>, </li> 등의 태그를 공백 문자로 치환
			$content = str_replace(array('</p>', '</div>', '</li>'), ' ', $content);

			// 태그 제거
			$content = preg_replace('!<([^>]*?)>!is','', $content);

			// < , > , " 를 치환
			$content = str_replace(array('&lt;','&gt;','&quot;','&nbsp;'), array('<','>','"',' '), $content);

			// 연속된 공백문자 삭제
			$content = preg_replace('/ ( +)/is', ' ', $content);

			// 문자열을 자름
			$content = trim(cut_str($content, $str_size, $tail));

			// >, <, "를 다시 복구
			$content = str_replace(array('<','>','"'),array('&lt;','&gt;','&quot;'), $content);

			// 영문이 연결될 경우 개행이 안 되는 문제를 해결
			$content = preg_replace('/([a-z0-9\+:\/\.\~,\|\!\@\#\$\%\^\&\*\(\)\_]){20}/is',"$0-",$content);
			return $content; 
		}
	}

	class xet_slider_parallaxItem extends Object {
		var $browser_title = null;
		var $has_first_thumbnail_idx = false;
		var $first_thumbnail_idx = null;
		var $contents_link = null;
		var $domain = null;

		function xet_slider_parallaxItem($browser_title=''){
			$this->browser_title = $browser_title;
		}
		function setContentsLink($link){
			$this->contents_link = $link;
		}
		function setFirstThumbnailIdx($first_thumbnail_idx){
			if(is_null($this->first_thumbnail) && $first_thumbnail_idx>-1) {
				$this->has_first_thumbnail_idx = true;
				$this->first_thumbnail_idx= $first_thumbnail_idx;
			}
		}
		
		function setDomain($domain) {
			static $default_domain = null;
			if(!$domain) {
				if(is_null($default_domain)) $default_domain = Context::getDefaultUrl();
				$domain = $default_domain;
			}
			$this->domain = $domain;
		}

		function setLink($url){
			$this->add('url',$url);
		}

		function setTitle($title){
			$this->add('title',$title);
		}

		function setThumbnail($thumbnail){
			$this->add('thumbnail',$thumbnail);
		}

		function setIMG($img){
			$this->add('img',$img);
		}

		function setContent($content){
			$this->add('content',$content);
		}

		function setRegdate($regdate){
			$this->add('regdate',$regdate);
		}

		function setNickName($nick_name){
			$this->add('nick_name',$nick_name);
		}

		function setAuthorSite($site_url){
			$this->add('author_site',$site_url);
		}
		
		function getBrowserTitle(){
			return $this->browser_title;
		}
		function getDomain() {
			return $this->domain;
		}
		function getContentsLink(){
			return $this->contents_link;
		}
		function getFirstThumbnailIdx(){
			return $this->first_thumbnail_idx;
		}
		function getLink(){
			return $this->get('url');
		}
		function getModuleSrl(){
			return $this->get('module_srl');
		}
		function getTitle($cut_size = 0, $tail='...'){
			$title = strip_tags($this->get('title'));

			if($cut_size) $title = cut_str($title, $cut_size, $tail);

			$attrs = array();
			if($this->get('title_bold') == 'Y') $attrs[] = 'font-weight:bold';
			if($this->get('title_color') && $this->get('title_color') != 'N') $attrs[] = 'color:#'.$this->get('title_color');

			if(count($attrs)) $title = sprintf("<span style=\"%s\">%s</span>", implode(';', $attrs), htmlspecialchars($title));

			return $title;
		}
		function getContent(){
			return $this->get('content');
		}
		
		function getNickName(){
			return $this->get('nick_name');
		}
		function getAuthorSite(){
			return $this->get('author_site');
		}
		
		function getRegdate($format = 'Y.m.d H:i:s') {
			return zdate($this->get('regdate'), $format);
		}
		
		function haveFirstThumbnail() {
			return $this->has_first_thumbnail_idx;
		}
		function getThumbnail(){
			return $this->get('thumbnail');
		}
		function getIMG(){
			return $this->get('img');
		}
		function getMemberSrl() {
			return $this->get('member_srl');
		}
	}
?>
