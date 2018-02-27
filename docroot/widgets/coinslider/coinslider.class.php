<?php
    /**
     * @class coinslider
     * @author EPMakes (chjh0628@naver.com)
     * @brief coinslider 이미지 슬라이드를 출력하는 위젯
     **/

    class coinslider extends WidgetHandler {

        /**
         * @brief 위젯의 실행 부분
         *
         * ./widgets/위젯/conf/info.xml 에 선언한 extra_vars를 args로 받는다
         * 결과를 만든후 print가 아니라 return 해주어야 한다
         **/

        function proc($args) {
            // 정렬 대상
            if(!in_array($args->order_target, array('list_order','update_order','regdate','rand()','voted_count','readed_count'))) $args->order_target = 'list_order';

            // 정렬 순서
            if(!in_array($args->order_type, array('asc','desc'))) $args->order_type = 'asc';

            // 출력된 목록 수
            $args->list_count = (int)$args->list_count;
            if(!$args->list_count) $args->list_count = 5;

            // 제목 길이 자르기
            if(!$args->subject_cut_size) $args->subject_cut_size = 0;

            // 내용 길이 자르기
            if(!$args->content_cut_size) $args->content_cut_size = 100;

            // 썸네일 생성 방법
            if(!$args->thumbnail_type) $args->thumbnail_type = 'crop';

            // 썸네일 가로 크기
            if(!$args->thumbnail_width) $args->thumbnail_width = 565;

            // 썸네일 세로 크기
            if(!$args->thumbnail_height) $args->thumbnail_height = 290;

			// 1.3 추가 변수들
			if(!$args->show_title) $args->show_title = 'Y';
			if(!$args->hyperlink) $args->hyperlink = 'Y';
			if(!$args->hyperlink_src) $args->hyperlink_src = 'article';
			if(!$args->hyperlink_type) $args->hyperlink_type = 'currentwindow';
			if(!$args->content_position) $args->content_position = 'bottom';

			// coin-slider 설정들
			if(!$args->slide_delay) $args->slide_delay = 3000;
			if(!$args->square_width) $args->square_width = 7;
			if(!$args->square_height) $args->square_height = 5;
			if(!$args->square_delay) $args->square_delay = 30;
			if(!$args->content_opacity) $args->content_opacity = 0.7;
			if(!$args->content_speed) $args->content_speed = 500;
			if(!$args->slide_effect) $args->slide_effect = 'random';
			if(!$args->hover_pause) $args->hover_pause = 'N';
			if(!$args->show_navigation) $args->show_navigation = 'N';
			if(!$args->show_imagelist) $args->show_imagelist = 'N';

            // 내부적으로 쓰이는 변수 설정
            $oModuleModel = &getModel('module');
            $module_srls = $args->modules_info = $args->module_srls_info = $args->mid_lists = array();
            $site_module_info = Context::get('site_module_info');

			// 대상 모듈이 선택되어 있지 않으면 해당 사이트의 전체 모듈을 대상으로 함
			if(!$args->module_srls){
				unset($obj);
				$obj->site_srl = (int)$site_module_info->site_srl;
				$output = executeQueryArray('widgets.coinslider.getMids', $obj);
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
				$output = executeQueryArray('widgets.coinslider.getMids', $obj);
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

            // document 모듈의 model 객체를 받아서 결과를 객체화 시킴
            $oDocumentModel = &getModel('document');

            // 분류 구함
            $obj->module_srl = $args->module_srl;
            $output = executeQueryArray('widgets.coinslider.getCategories',$obj);
            if($output->toBool() && $output->data) {
                foreach($output->data as $key => $val) {
                    $category_lists[$val->module_srl][$val->category_srl] = $val;
                }
            }

            // 최신 시간 설정
            $time_check = date("YmdHis", time()-12 * 60 * 60);

            // 글 목록을 구함 (+권한 확인)
            $obj->module_srl = $args->module_srl;
            $obj->sort_index = $args->order_target;
            $obj->order_type = $args->order_type=="desc"?"asc":"desc";
			$obj->list_count = 50; // 한번에 가져올 글 목록 개수
			$pagecount = 0;
			$needcount = $args->list_count; // 가져와야 하는 글 개수(목록 수 * 페이지 수)
			$getcount = 0; // 가져온 글 개수
            $content_items = array();
            $first_thumbnail_idx = -1;
			while(true) {
				$pagecount = $pagecount + 1;
				$obj->page = $pagecount;
				$output = executeQueryArray('widgets.coinslider.getNewestDocuments', $obj);
				// 더이상 결과가 없으면 break
				if(!$output->toBool() || !$output->data || !count($output->data)) break;
				// 권한 확인해서 문서 목록 생성하기
                foreach($output->data as $key => $attribute) {
                    $oDocument = new documentItem();
                    $oDocument->setAttribute($attribute, false);

					if ($getcount >= $needcount) {
						break;
					} 

					// 썸네일 이미지 있는지 확인
					if (!$oDocument->getThumbnail($args->thumbnail_width,$args->thumbnail_height,$args->thumbnail_type)) continue;

					// 권한이 있다면 객체화 준비
                    $GLOBALS['XE_DOCUMENT_LIST'][$oDocument->document_srl] = $oDocument;
                    $document_srls[] = $oDocument->document_srl;
					$getcount = $getcount + 1;
					if ($getcount >= $needcount) break;
                }
				if ($getcount >= $needcount) break;
				if ($pagecount >= $output->total_page) break;
			}

            // 결과가 있으면 각 문서 객체화를 시킴
            if($getcount > 0) {
                $oDocumentModel->setToAllDocumentExtraVars();

                for($i=0,$c=count($document_srls);$i<$c;$i++) {
                    $oDocument = $GLOBALS['XE_DOCUMENT_LIST'][$document_srls[$i]];
                    $document_srl = $oDocument->document_srl;
                    $module_srl = $oDocument->get('module_srl');
                    $category_srl = $oDocument->get('category_srl');
                    $thumbnail = $oDocument->getThumbnail($args->thumbnail_width,$args->thumbnail_height,$args->thumbnail_type);

                    $content_item = new coinsliderItem( $args->module_srls_info[$module_srl]->browser_title );
                    $content_item->adds($oDocument->getObjectVars());

					$content_item->setTitle($oDocument->getTitle());
                    $content_item->setCategory( $category_lists[$module_srl][$category_srl]->title );
                    $content_item->setContent($oDocument->getSummary($args->content_cut_size));
					if($args->hyperlink_src == 'article') $content_item->setLink( getSiteUrl($domain,'','document_srl',$document_srl) );
					else if($args->hyperlink_src == 'extravar') $content_item->setLink( $oDocument->getExtraEidValue($args->hyperlink_extravar) );
                    $content_item->setThumbnail($thumbnail);
                    $content_item->add('mid', $args->mid_lists[$module_srl]);
                    if($first_thumbnail_idx==-1 && $thumbnail) $first_thumbnail_idx = $i;
                    $coinslider_items[] = $content_item;
                }

                $coinslider_items[0]->setFirstThumbnailIdx($first_thumbnail_idx);
            }

            $oTemplate = &TemplateHandler::getInstance();

            // 위젯에 넘기기 위한 변수 설정
            $widget_info->modules_info = $args->modules_info;
            $widget_info->option_view_arr = $args->option_view_arr;
            $widget_info->list_count = $args->list_count;
            $widget_info->subject_cut_size = $args->subject_cut_size;
            $widget_info->content_cut_size = $args->content_cut_size;

            $widget_info->thumbnail_type = $args->thumbnail_type;
            $widget_info->thumbnail_width = $args->thumbnail_width;
            $widget_info->thumbnail_height = $args->thumbnail_height;
            $widget_info->mid_lists = $args->mid_lists;

            $widget_info->show_browser_title = $args->show_browser_title;
            $widget_info->content_position = $args->content_position;
            $widget_info->show_title = $args->show_title;
            $widget_info->show_content = $args->show_content;

            $widget_info->list_type = $args->list_type;
			$widget_info->coinslider_items = $coinslider_items;
			$widget_info->widget_division = $args->widget_division;

            $widget_info->hyperlink = $args->hyperlink;
            $widget_info->hyperlink_src = $args->hyperlink_src;
            $widget_info->hyperlink_type = $args->hyperlink_type;

			$widget_info->slide_delay = $args->slide_delay;
			$widget_info->square_width = $args->square_width;
			$widget_info->square_height = $args->square_height;
			$widget_info->square_delay = $args->square_delay;
			$widget_info->content_opacity = $args->content_opacity;
			$widget_info->content_speed = $args->content_speed;
			$widget_info->slide_effect = $args->slide_effect;
			$widget_info->hover_pause = $args->hover_pause;
			$widget_info->show_navigation = $args->show_navigation;
			$widget_info->show_imagelist = $args->show_imagelist;

            Context::set('colorset', $args->colorset);
            Context::set('widget_info', $widget_info);

            $tpl_path = sprintf('%sskins/%s', $this->widget_path, $args->skin);
			Context::set('skin_path', $tpl_path);
			$act = Context::get('act');
			if($act == "dispPageAdminContentModify" || $act == "procWidgetGenerateCodeInPage")
	            return $oTemplate->compile($tpl_path, "editor");
            return $oTemplate->compile($tpl_path, "list");
        }

        function _getSummary($content, $str_size = 50)
        {
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

    class coinsliderItem extends Object {

        var $browser_title = null;
        var $has_first_thumbnail_idx = false;
        var $first_thumbnail_idx = null;
        var $contents_link = null;
        var $domain = null;

        function coinsliderItem($browser_title=''){
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
        function setLink($url){
            $this->add('url',$url);
        }
        function setTitle($title){
            $this->add('title',$title);
        }

        function setThumbnail($thumbnail){
            $this->add('thumbnail',$thumbnail);
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

        // 글 작성자의 홈페이지 주소를 저장 by misol
        function setAuthorSite($site_url){
            $this->add('author_site',$site_url);
        }
        function setCategory($category){
            $this->add('category',$category);
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
        function getCategory(){
            return $this->get('category');
        }
        function getNickName(){
            return $this->get('nick_name');
        }
        function getAuthorSite(){
            return $this->get('author_site');
        }
        function getCommentCount(){
            $comment_count = $this->get('comment_count');
            return $comment_count>0 ? $comment_count : '';
        }
        function getTrackbackCount(){
            $trackback_count = $this->get('trackback_count');
            return $trackback_count>0 ? $trackback_count : '';
        }
        function getRegdate($format = 'Y.m.d H:i:s') {
            return zdate($this->get('regdate'), $format);
        }
        function printExtraImages() {
            return $this->get('extra_images');
        }
        function haveFirstThumbnail() {
            return $this->has_first_thumbnail_idx;
        }
        function getThumbnail(){
            return $this->get('thumbnail');
        }
        function getMemberSrl() {
            return $this->get('member_srl');
        }
    }
?>
