<?php
    /**
     * @class shopxeslider
     * @author Study4u
     * @brief content 이미지 슬라이더를 출력하는 위젯
     * @version 2.1
     **/

	class shopxeslider extends WidgetHandler {

		function proc($args) {

			// 정렬 대상
			if(!in_array($args->order_target, array('list_order','update_order'))) $args->order_target = 'list_order';
			$widget_info->order_target = $args->order_target;

			// 정렬 순서
			if(!in_array($args->order_type, array('asc','desc'))) $args->order_type = 'asc';
			$widget_info->order_type = $args->order_type;

			// 썸네일 생성 방법
			if(!in_array($args->thumbnail_type, array('crop','ratio'))) $args->thumbnail_type = 'crop';
			$widget_info->thumbnail_type = $args->thumbnail_type;

			// 출력되는 이미지 총 갯수
			$args->list_count = (int)$args->list_count;
			if(!$args->list_count) $args->list_count = 5;

			// 이미지 클릭 대상
			if(!in_array($args->open_article, array('N','Y','Z'))) $args->open_article = 'N';

			// ptyPoto 테마
			if(!$args->ptypoto) $args->ptypoto = 'pp_default';

			// 이미지 페이드 효과
			if(!in_array($args->img_fade, array('Y','N'))) $args->img_fade = 'Y';

			// 자동 슬라이드
			if(!in_array($args->slide_auto, array('true','false'))) $args->slide_auto = 'true';
			$widget_info->slide_auto = $args->slide_auto;

			/*
			shopxeslider 에 사용되는 변수들
			---------------------------------------------------------------------------------------------------------- */

			// 슬라이드 이미지 가로 크기
			$args->slider_img_width = (int)$args->slider_img_width;
			if(!$args->slider_img_width) $args->slider_img_width = 400;

			// 슬라이드 이미지 세로 크기
			$args->slider_img_height = (int)$args->slider_img_height;
			if(!$args->slider_img_height) $args->slider_img_height = 250;

			// 슬라이드 이미지 테투리 두께
			$args->slider_img_bdsize = (int)$args->slider_img_bdsize;
			if(!$args->slider_img_bdsize) $args->slider_img_bdsize = 0;

			// 슬라이드 이미지 테투리 색
			if($args->slider_img_bdcolor=='') $args->slider_img_bdcolor = "#ccc";

			// 네비게이션 크기
			$args->navigation_size = (int)$args->navigation_size;
			if(!$args->navigation_size) $args->navigation_size = 200;

			// 출력된 썸네일 목록 수
			$args->cols_list_count = (int)$args->cols_list_count;
			if(!$args->cols_list_count) $args->cols_list_count = 5;

			// 썸네일 가로 크기
			$args->thumbnail_width = (int)$args->thumbnail_width;
			if(!$args->thumbnail_width) $args->thumbnail_width = 80;

			// 썸네일 세로 크기
			$args->thumbnail_height = (int)$args->thumbnail_height;
			if(!$args->thumbnail_height) $args->thumbnail_height = 60;

			// 썸네일 테투리 두께
			$args->thumbnail_bdsize = (int)$args->thumbnail_bdsize;
			if(!$args->thumbnail_bdsize) $args->thumbnail_bdsize = 0;

			// 썸네일 테투리 색
			if($args->thumbnail_bdcolor=='') $args->thumbnail_bdcolor = "#ccc";

			// 제목 표시 유무
			if($args->show_title!='Y') $args->show_title = 'N';
            else $args->show_title = 'Y';

			// 제목 글자색 지정
			//if($args->title_font_color=='') $args->title_font_color = "#000";

			// 내용 표시 유무
			if($args->show_content!='Y') $args->show_content = 'N';
            else $args->show_content = 'Y';

			// 내용 글자색 지정
			//if($args->content_font_color=='') $args->content_font_color = "#000";

			// 컨트롤 버튼 표시 유무
			if($args->show_control!='Y') $args->show_control = 'N';
            else $args->show_control = 'Y';

			// 페이지 버튼 표시 유무
			if($args->navigation_control!='Y') $args->navigation_control = 'N';
            else $args->navigation_control = 'Y';

			// 게시물 순서 섞기
			if($args->content_items_shuffle!='Y') $args->content_items_shuffle = 'N';
            else $args->content_items_shuffle = 'Y';

			// 슬라이드 속도조절
			$args->slide_delay = (int)$args->slide_delay;
			if(!$args->slide_delay || $args->slide_delay<1000) $args->slide_delay = 3000;

			// 제목 길이 자르기
			$args->subject_cut_size = (int)$args->subject_cut_size;
			if(!$args->subject_cut_size) $args->subject_cut_size = 0;

			// 내용 길이 자르기
			$args->content_cut_size = (int)$args->content_cut_size;
			if(!$args->content_cut_size) $args->content_cut_size = 200;

            // easyAccordion 슬라이드 제목
            $args->easyAccordion_title = explode(';',$args->ea_title);

			// 최근 글 표시 시간
			$args->duration_new = (int)$args->duration_new;
			if(!$args->duration_new) $args->duration_new = 12;

			// 내부적으로 쓰이는 변수 설정
			$oModuleModel = &getModel('module');
			$module_srls = $args->modules_info = $args->module_srls_info = $args->mid_lists = array();
			$site_module_info = Context::get('site_module_info');

			// 대상 모듈이 선택되어 있지 않으면 해당 사이트의 전체 모듈을 대상으로 함
			if(!$args->module_srls){
				unset($obj);
				$obj->site_srl = (int)$site_module_info->site_srl;
				$output = executeQueryArray('widgets.shopxeslider.getMids', $obj);
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
				$output = executeQueryArray('widgets.shopxeslider.getMids', $obj);
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

			// 분류 구함
			$obj->module_srl = $args->module_srl;
			$output = executeQueryArray('widgets.shopxeslider.getCategories',$obj);
			if($output->toBool() && $output->data) {
				foreach($output->data as $key => $val) {
					$category_lists[$val->module_srl][$val->category_srl] = $val;
					//if($val->category_srl == $args->category_srl) $obj->category_srl = $args->category_srl;  // 카테고리 추가
				}
			}

			// 탭 구분
			$tab_list = $args->mid_lists;

			// 글 목록을 구함
			$obj->module_srl = $args->module_srl;
			$obj->category_srl = $args->category_srl; // XE v1.4.5.1 에서 추가된 구문 = 카테고리 추가
			$obj->sort_index = $args->order_target;
			$obj->order_type = $args->order_type=="desc"?"asc":"desc";
			$obj->list_count = $args->list_count;

			$output = executeQueryArray('widgets.shopxeslider.getNewestDocuments', $obj);
			if(!$output->toBool() || !$output->data) return;
			$oProductModel = &getModel("product"); //euna

			// 결과가 있으면 각 문서 객체화를 시킴
			$content_items = array();
			$first_thumbnail_idx = -1;
			if(count($output->data)) 
			{
				foreach($output->data as $key => $attribute) 
				{
					$oDocument = new documentItem();
					$oDocument->setAttribute($attribute, false);
					$GLOBALS['XE_DOCUMENT_LIST'][$oDocument->document_srl] = $oDocument;
					$document_srls[] = $oDocument->document_srl;
				}
				$oDocumentModel->setToAllDocumentExtraVars();

				for($i=0,$c=count($document_srls);$i<$c;$i++)
				{
					$oDocument = $GLOBALS['XE_DOCUMENT_LIST'][$document_srls[$i]];
					$document_srl = $oDocument->document_srl;
					$module_srl = $oDocument->get('module_srl');
					$category_srl = $oDocument->get('category_srl');

					// 모든 첨부된 파일을 썸네일 생성
					//$ThumbnailList =  $this->setThumbnailList($oDocument->getUploadedFiles(),$args->thumbnail_width,$args->thumbnail_height,$args->thumbnail_type,$document_srl);

		/*			if($args->target_ext_var == 'image' && $oDocument->getExtraEidValue($args->ext_var)!='') {
						$ext_image = $oDocument->getExtraEidValue($args->ext_var);
						if(preg_match("/\.(jpg|png|jpeg|gif)$/i",$ext_image)) {
							$thumbnail = $this->setExtThumbnail($ext_image,$args->thumbnail_width,$args->thumbnail_height,$args->thumbnail_type,$document_srl);
							$imgslider = $this->setExtThumbnail($ext_image,$args->slider_img_width,$args->slider_img_height,$args->thumbnail_type,$document_srl);
						} else {
							$thumbnail = $oDocument->getThumbnail($args->thumbnail_width,$args->thumbnail_height,$args->thumbnail_type);
							$imgslider = $oDocument->getThumbnail($args->slider_img_width,$args->slider_img_height,$args->thumbnail_type);
						}
					} else {
					$thumbnail = $oDocument->getThumbnail($args->thumbnail_width,$args->thumbnail_height,$args->thumbnail_type);
					$imgslider = $oDocument->getThumbnail($args->slider_img_width,$args->slider_img_height,$args->thumbnail_type);
					}*/
					$content_item = new shopxesliderItem($args->module_srls_info[$module_srl]->browser_title );
					$content_item->adds($oDocument->getObjectVars());
					if($args->target_ext_var == 'title') $content_item->setTitle($oDocument->getExtraEidValue($args->ext_var));
					else $content_item->setTitle($oDocument->getTitle());
					$content_item->setCategory( $category_lists[$module_srl][$category_srl]->title );
					$content_item->setDomain( $args->module_srls_info[$module_srl]->domain );
					if($args->target_ext_var == 'content') $content_item->setContent($oDocument->getExtraEidValue($args->ext_var));
					else $content_item->setContent($oDocument->getSummary($args->content_cut_size));

					if($args->target_ext_var == 'link'||$args->target_ext_var == 'image') {
						if($oDocument->getExtraEidValue($args->ext_var)=='') $content_item->setLink( getSiteUrl($domain,'','document_srl',$document_srl));
						else $content_item->setLink($oDocument->getExtraEidValue($args->ext_var));
					} else $content_item->setLink( getSiteUrl($domain,'','document_srl',$document_srl) );

					$content_item->setPlayer($oDocument->getUploadedFiles());
					$item = $oProductModel->getProductItemByDocumentSrl($document_srl) ;//euna
					$thumbnail  = $item->getThumbnail($args->thumbnail_width,$args->thumbnail_height,$args->thumbnail_type);//euna
					$imgslider = $item->getThumbnail($args->slider_img_width,$args->slider_img_height,$args->thumbnail_type);//euna
					$price_sale= $item->getItemPrice_sale() ;//euna
			
					$content_item->setThumbnail($thumbnail);
					$content_item->setImgslider($imgslider);
					$content_item->setItemPrice_sale($price_sale);//euna

			//		$content_item->setExtraImages($oDocument->printExtraImages($args->duration_new * 60 * 60));
					$content_item->add('mid', $args->mid_lists[$module_srl]);

					if($first_thumbnail_idx==-1 && $thumbnail) $first_thumbnail_idx = $i;
					$content_items[] = $content_item;
				}

				$content_items[0]->setFirstThumbnailIdx($first_thumbnail_idx);
			}

			$oTemplate = &TemplateHandler::getInstance();

			// 위젯에 넘기기 위한 변수 설정
			$widget_info->modules_info = $args->modules_info;
			$widget_info->list_count = $args->list_count;
			$widget_info->easyAccordion_title = $args->easyAccordion_title;
			$widget_info->module_name = $args->module_srls_info[$module_srl]->browser_title;

			// 슬라이드 이미지 가로 크기
			$widget_info->slider_img_width = $args->slider_img_width;

			// 슬라이드 이미지 세로 크기
			$widget_info->slider_img_height = $args->slider_img_height;

			// 슬라이드 이미지 테투리 두께
			$widget_info->slider_img_bdsize = $args->slider_img_bdsize;

			// 슬라이드 이미지 테투리 색
			$widget_info->slider_img_bdcolor = $args->slider_img_bdcolor;

			// 네비게이션 크기
			$widget_info->navigation_size = $args->navigation_size;

			// 출력된 썸네일 목록 수
			$widget_info->cols_list_count = $args->cols_list_count;

			// 썸네일 가로 크기
			$widget_info->thumbnail_width = $args->thumbnail_width;

			// 썸네일 세로 크기
			$widget_info->thumbnail_height = $args->thumbnail_height;

			// 썸네일 테투리 두께
			$widget_info->thumbnail_bdsize = $args->thumbnail_bdsize;

			// 썸네일 테투리 색
			$widget_info->thumbnail_bdcolor = $args->thumbnail_bdcolor;

			// 제목 표시 유무
			$widget_info->show_title = $args->show_title;

			// 제목 폰트 크기
			$widget_info->title_font_size = $args->title_font_size;

			// 제목 글씨체
			$widget_info->title_font_family = $args->title_font_family;

			// 제목 글씨체 직접입력
			$widget_info->title_font_user = $args->title_font_user;

			// 제목 글자색 지정
			$widget_info->title_font_color = $args->title_font_color;

			// 내용 표시 유무
			$widget_info->show_content = $args->show_content;

			// 내용 폰트 크기
			$widget_info->content_font_size = $args->content_font_size;

			// 내용 글씨체
			$widget_info->content_font_family = $args->content_font_family;

			// 내용 글씨체 직접입력
			$widget_info->content_font_user = $args->content_font_user;

			// 내용 글자색 지정
			$widget_info->content_font_color = $args->content_font_color;

			// 제목과 내용 박스 출력 유무
			if($args->show_content=='Y' || $args->show_title=='Y') $widget_info->show_content_title = 'Y';

			// 컨트롤 버튼 표시 유무
			$widget_info->show_control = $args->show_control;

			// 페이지 버튼 표시 유무
			$widget_info->navigation_control = $args->navigation_control;

			// 게시물 순서 섞기
			$widget_info->content_items_shuffle = $args->content_items_shuffle;

			// 이미지 클릭 연결 대상
			$widget_info->open_article = $args->open_article;

			// prettyPhoto 테마
			$widget_info->ptypoto_theme = $args->ptypoto;

			// 이미지 페이드 효과
			$widget_info->img_fade = $args->img_fade;

			// 슬라이드 속도 조절
			$widget_info->slide_delay = $args->slide_delay;

			// 자동 슬라이드
			$widget_info->slide_auto = $args->slide_auto;

			// 제목 길이 자르기
			$widget_info->subject_cut_size = $args->subject_cut_size;

			// 내용 길이 자르기
			$widget_info->content_cut_size = $args->content_cut_size;

			// 확장 변수명
			$widget_info->ext_var = $args->ext_var;
			$widget_info->target_ext_var = $args->target_ext_var;

			// 모듈 이름 높이
			$widget_info->mid_height = $args->mid_height;

			// 제목 높이
			$widget_info->title_height = $args->title_height;

			// 내용 높이
			$widget_info->content_height = $args->content_height;

			// 카테고리 번호
			$widget_info->category_srl = $args->category_srl;

			$widget_info->duration_new = $args->duration_new * 60*60;

			$widget_info->mid_lists = $args->mid_lists;
			$widget_info->content_items = $content_items;

			unset($args->easyAccordion_title);
			unset($args->modules_info);
	//		unset($oProductModel) ; //euna

			// 템플릿의 스킨 경로를 지정 (skin, colorset에 따른 값을 설정)
			$tpl_path = sprintf('%sskins/%s', $this->widget_path, $args->skin);
			Context::set('colorset', $args->colorset);
			Context::set('widget_info', $widget_info);
			Context::set('content_items', $content_items);

			// 템플릿 컴파일하여 html로 return
			$act = Context::get('act');
			if($act == "dispPageAdminContentModify" || $act == "procWidgetGenerateCodeInPage")
				return $oTemplate->compile($tpl_path, "edit");
			return $oTemplate->compile($tpl_path, "content");

		}

		function _getSummary($content, $str_size = 0) {
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

		function setThumbnailList($UploadedFile,$width = 80, $height = 0, $thumbnail_type, $document_srl){// 테스트...
            // 존재하지 않는 문서일 경우 return false
			if(!count($UploadedFile)) return;

            // 높이 지정이 별도로 없으면 정사각형으로 생성
            if(!$height) $height = $width;

            // 섬네일 정보 정의
            $thumbnail_path = sprintf('files/cache/thumbnails/%s',getNumberingPath($document_srl, 3));
			Context::set('thumbnail_path', $thumbnail_path);

            $source_file = null;
			$thumbnail_url = null;

			for($i=0,$loadno=count($UploadedFile);$i<$loadno;$i++) {
				$filename = strtolower($UploadedFile[$i]->source_filename);
				$source_file = $UploadedFile[$i]->uploaded_filename;
				$thumbnail_file = sprintf('%s%d_%dx%d.%s.jpg', $thumbnail_path, $i, $width, $height, $thumbnail_type);
				if(!file_exists($thumbnail_file)) {
					if(preg_match("/\.(jpg|png|jpeg|gif)$/i",$filename)) {
					$outputimg[$i] = FileHandler::createImageFile($source_file, $thumbnail_file, $width, $height, 'jpg', $thumbnail_type);
					}
				}
				$thumbnail_url[$i] = Context::getRequestUri().$thumbnail_file;
			}

			return $thumbnail_url;
		}

		function setExtThumbnail($ExtFile, $width = 80, $height = 0, $thumbnail_type, $document_srl){
            // 높이 지정이 별도로 없으면 정사각형으로 생성
            if(!$height) $height = $width;

            $thumbnail_path = null;
			$thumbnail_file = null;
			$source_file = null;

			if(!preg_match('/^(http|https):\/\//i',$ExtFile)) $ExtFile = Context::getRequestUri().$ExtFile;
			// 섬네일 정보 정의
            $thumbnail_path = sprintf('files/cache/tmp/%d', $document_srl);
			$source_file = sprintf('%s.jpg', $thumbnail_path);
			$thumbnail_file = sprintf('%s_%dx%d.%s.jpg', $thumbnail_path, $width, $height, $thumbnail_type);
			if(!is_dir('./files/cache/tmp')) FileHandler::makeDir('./files/cache/tmp');
			if(!file_exists($source_file)) {FileHandler::getRemoteFile($ExtFile, $source_file);}

			if(!file_exists($thumbnail_file)) {
				$outputimg = FileHandler::createImageFile($source_file, $thumbnail_file, $width, $height, 'jpg', $thumbnail_type);
			}

			return Context::getRequestUri().$thumbnail_file;
		}
	}

	class shopxesliderItem extends Object {

		var $browser_title = null;
		var $has_first_thumbnail_idx = false;
		var $first_thumbnail_idx = null;
		var $contents_link = null;
		var $domain = null;

		function shopxesliderItem($browser_title=''){
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
		function setExtraImages($extra_images){
			$this->add('extra_images',$extra_images);
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
			$this->setLinkedType($url);
			$this->add('url',$url);
		}

		function setTitle($title){
			$this->add('title',$title);
		}
		function setThumbnail($thumbnail){
			$this->add('thumbnail',$thumbnail);
		}
		function setImgslider($imgslider){
			$this->add('imgslider',$imgslider);
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
		function setItemPrice_sale($price_sale)//euna
		{
			$this->add('price_sale',$price_sale);
		}
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
		function getItemPrice_sale(){
			return $this->get('price_sale');
		}
		function getModuleSrl(){
			return $this->get('module_srl');
		}
		function getDocumentSrl(){
			return $this->get('document_srl');
		}
		function getTitle($cut_size = 0, $tail=''){
			$title = strip_tags($this->get('title'));

			if($cut_size) $title = cut_str($title, $cut_size, $tail);

			$attrs = array();
			if($this->get('title_bold') == 'Y') $attrs[] = 'font-weight:bold';
			if($this->get('title_color') && $this->get('title_color') != 'N') $attrs[] = 'color:#'.$this->get('title_color');

			if(count($attrs)) $title = sprintf("<span style=\"%s\">%s</span>", implode(';', $attrs), htmlspecialchars($title));

			return $title;
		}
		function getContent($cut_size = 0, $tail='...'){
			$content = strip_tags($this->get('content'));
			if($cut_size) $content = cut_str($content, $cut_size, $tail);

			return $content;
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
			//print_r($this->get('thumbnail')) ;
			return $this->get('thumbnail');
		}
		function getImgslider(){
			return $this->get('imgslider');
		}

		function getMemberSrl() {
			return $this->get('member_srl');
		}
		function setPlayer($uploadedfile){
			$this->add('file_list',$uploadedfile);
			for($i=0,$upfileno=count($uploadedfile);$i<$upfileno;$i++) {
			$filename = strtolower($uploadedfile[$i]->source_filename);
			if(preg_match('/\.(swf|mp3|mp4|flv|mov|f4v|3gp|3g2|aac|m4a)$/i',$filename)) $playfile = getSiteUrl().$uploadedfile[$i]->uploaded_filename;
			if(preg_match('/\.(xml|srt)$/i',$filename)) $subtitle = getSiteUrl().$uploadedfile[$i]->uploaded_filename;
			if(preg_match('/\.(jpg|gif|png)$/i',$filename)) $previewfile = getSiteUrl().$uploadedfile[$i]->uploaded_filename;
			}
			$this->add('playfile',$playfile);
			$this->add('subtitle',$subtitle);
			$this->add('previewfile',$previewfile);
		}

		function getPlayer(){
			return $this->get('playfile');
		}
		function getSubTitle(){
			return $this->get('subtitle');
		}
		function getPreview(){
			return $this->get('previewfile');
		}
		function getSourcefile($id){
			$filelist = $this->get('file_list');
			$getUploadedfile = $filelist[$id]->uploaded_filename;

			return $getUploadedfile;
		}

		function setLinkedType($itemSrc){
			$itemSrc = strtolower($itemSrc);
			if (preg_match("/youtube\.com\/watch/i",$itemSrc)) {
				$linkedtype = 'video';
			}elseif (preg_match("/vimeo\.com/i",$itemSrc)) {
				$linkedtype = 'video';
			}elseif(preg_match("/\.(mov|swf|flv)/i",$itemSrc)){ 
				$linkedtype = 'video';
			}elseif(preg_match("/\b.mp3\b/i",$itemSrc)){
				$linkedtype = 'audio';
			}elseif(preg_match("/\.(jpg|png|jpeg|gif)/i",$itemSrc)){
				$linkedtype = 'image';
			}
			$this->add('linkedtype',$linkedtype);
		}
		function getLinkedType(){
			return $this->get('linkedtype');
		}

		function getExtraVars() {
			$oDocumentModel = &getModel('document');
			return $oDocumentModel->getExtraVars($this->get('module_srl'), $this->document_srl);
		}
		function getExtraEidValue($extid) {
			$extra_vars = $this->getExtraVars();
			foreach($extra_vars as $idx => $key) {
				$extra_eid[$key->eid] = $key;
			}
			return $extra_eid[$extid]->value;
		}
	}
?>
