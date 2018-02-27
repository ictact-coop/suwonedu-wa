<?php
    /**
     * @class news_list
     * @author Study4U
     * @brief widget to display content
     * @version 0.2
     **/

    class contentslist extends WidgetHandler {

        function proc($args) {

			if($args->news_type!='document') $args->news_type = 'comment';
			else $args->news_type = 'document';

			$args->list_count = (int)$args->list_count;
			if(!$args->list_count) $args->list_count = 5;
			$args->list_type_arr = explode(',',$args->list_type);
			if(!$args->list_title) $args->list_title = $args->news_type;
			if($args->show_icon!='Y') $args->show_icon = 'N';
			else $args->show_icon = 'Y';
			
			if($args->order_target!='list_order') $args->order_target = 'update_order';
			else $args->order_target = 'list_order';

			if($args->order_type!='asc') $args->order_type = 'desc';
			else $args->order_type = 'asc';

			// 게시물 순서 섞기
			if($args->items_shuffle!='Y') $args->items_shuffle = 'N';
			else $args->items_shuffle = 'Y';

			// 필터링
			if($args->show_filter!='Y') $args->show_filter = 'N';
			else $args->show_filter = 'Y';

			if($args->ptypto!='Y') $args->ptypto = 'N';
			else $args->ptypto = 'Y';

			if(!$args->duration_new) $args->duration_new = 12;

			// 제목 글자수
			$args->subject_cut_size = (int)$args->subject_cut_size;
			if(!$args->subject_cut_size) $args->subject_cut_size = 0;

			// 제목 글씨체
			if(!$args->title_font_family) $args->title_font_family = "Default";

			// 내용 글자수
			$args->content_cut_size = (int)$args->content_cut_size;
			if(!$args->content_cut_size) $args->content_cut_size = 200;

			// 내용 글씨체
			if(!$args->content_font_family) $args->content_font_family = "Default";

			// 컬러셋
			if(!in_array($args->cl_colorset, array('random','orange','neon','pink','bluegloss','yellow','shape','purple','brown','white','black','gray','N'))) $args->cl_colorset = 'random';

			// 그라디언트
			if($args->cl_gradient!='Y') $args->cl_gradient = 'N';
			else $args->cl_gradient = 'Y';

			//컬러셋
			$color_name = array("red","orange","neon","pink","olive","yellow","shape","purple","brown","black","white","wax");
			$cl_grbdcolor = array("#DC143C","#ff5d00","#91e842","#ff7cd8","#abbd73","#f1da36","#71ceef","#c1bfea","#c19e67","#d7d7d7","#e5e5e5","#e9e9ce");
			$cl_gr1st = array("#ff3019","#ffa84c","#d2ff52","#fcecfc","#e4efc0","#fefcea","#b7deed","#ebe9f9","#f3e2c7","#B9B9B9","#fcfff4","#fcfff4");
			$cl_gr2nd = array("N","N","N","#fba6e1","N","N","N","#d8d0ef","#c19e67","#B9B9B9","#f1f1f1","N");
			$cl_gr3rd = array("N","N","N","#fd89d7","N","N","N","#cec7ec","#b68d4c","#B9B9B9","#f1f1f1","N");
			$cl_gr4th = array("#cf0404","#ff7b0d","#91e842","#ff7cd8","#abbd73","#f1da36","#21b4e2","#c1bfea","#b68d4c","#6A6A6A","#f3f3f3","#e9e9ce");
			$cl_grfc = array("#ffffff","#171717","#171717","#171717","#171717","#171717","#171717","#171717","#171717","#ffffff","#171717","#171717");

			if($args->cl_colorset == "random"){
				$color_no = mt_rand(0, 11);
				$args->cl_grbdcolor = $cl_grbdcolor[$color_no];
				$args->cl_grbgcolor = $cl_gr1st[$color_no];
				$args->cl_gr1st = $cl_gr1st[$color_no];
				$args->cl_gr2nd = $cl_gr2nd[$color_no];
				$args->cl_gr3rd = $cl_gr3rd[$color_no];
				$args->cl_gr4th = $cl_gr4th[$color_no];
				$args->cl_grfc = $cl_grfc[$color_no];
			} elseif($args->cl_colorset!="random"&&$args->cl_colorset!="N"){
				$color_no = array_search($args->cl_colorset, $color_name);
				$args->cl_grbdcolor = $cl_grbdcolor[$color_no];
				$args->cl_grbgcolor = $cl_gr1st[$color_no];
				$args->cl_gr1st = $cl_gr1st[$color_no];
				$args->cl_gr2nd = $cl_gr2nd[$color_no];
				$args->cl_gr3rd = $cl_gr3rd[$color_no];
				$args->cl_gr4th = $cl_gr4th[$color_no];
				$args->cl_grfc = $cl_grfc[$color_no];
			} else {
				if(!$args->cl_grbdcolor||$args->cl_grbdcolor == "transparent") $args->cl_grbdcolor = "#ffffff";
				if(!$args->cl_grbgcolor||$args->cl_grbgcolor == "transparent") $args->cl_grbgcolor = "#ffffff";
				if(!$args->cl_gr1st||$args->cl_gr1st == "transparent") $args->cl_gr1st = "#ffffff";
				if(!$args->cl_gr2nd) $args->cl_gr2nd = '';
				if(!$args->cl_gr3rd) $args->cl_gr3rd = '';
				if(!$args->cl_gr4th||$args->cl_gr4th == "transparent") $args->cl_gr4th = "#f2f2f2";
				if(!$args->cl_grfc||$args->cl_grfc == "transparent") $args->cl_grfc = "#000000";
			}

			if(!$args->cl_gr2ndpos) $args->cl_gr2ndpos = "50%";
			if(!$args->cl_gr3rdpos) $args->cl_gr3rdpos = "51%";
			if(!$args->cl_grbdsize) $args->cl_grbdsize = "2";
			if($args->cl_shadow!='Y') $args->cl_shadow = 'N';
			else $args->cl_shadow = 'Y';

			if(!$args->thumbnail_type) $args->thumbnail_type = 'crop';
			if(!$args->thumbnail_width) $args->thumbnail_width = 100;
			if(!$args->thumbnail_height) $args->thumbnail_height = 75;
			if(!$args->image_maxwidth) $args->image_maxwidth = 400;
			if(!$args->image_maxheight) $args->image_maxheight = 300;
			if($args->isotope_type!='clickable') $args->isotope_type = "variable-sizes";
			else $args->isotope_type = 'clickable';

			$oModuleModel = &getModel('module');
            $module_srls = $args->modules_info = $args->module_srls_info = $args->mid_lists = array();
            $site_module_info = Context::get('site_module_info');

			if(!$args->module_srls){
				unset($obj);
				$obj->site_srl = (int)$site_module_info->site_srl;
				$output = executeQueryArray('widgets.contentslist.getMids', $obj);
				if($output->data) {
					foreach($output->data as $key => $val) {
						$args->modules_info[$val->mid] = $val;
						$args->module_srls_info[$val->module_srl] = $val;
						$args->mid_lists[$val->module_srl] = $val->mid;
						$module_srls[] = $val->module_srl;
					}
				}

				$args->modules_info = $oModuleModel->getMidList($obj);

			} else {
				$obj->module_srls = $args->module_srls;
				$output = executeQueryArray('widgets.contentslist.getMids', $obj);
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

			if(!count($args->modules_info)) return Context::get('msg_not_founded');
			$args->module_srl = implode(',',$module_srls);

			switch($args->news_type){
				case 'comment':
					$content_items = $this->_getCommentItems($args);
					break;
				case 'document':
					$content_items = $this->_getDocumentItems($args);
					break;
				default:
					$content_items = $this->_getDocumentItems($args);
					break;
			}

			$output = $this->_compile($args,$content_items);
			return $output;
		}

        function _getCommentItems($args) {
            // List variables to use CommentModel::getCommentList()
            $obj->module_srl = $args->module_srl;
            $obj->sort_index = $args->order_target;
            $obj->list_count = $args->list_count;
            // Get model object of the comment module and execute getCommentList() method
            $oCommentModel = &getModel('comment');
            $output = $oCommentModel->getNewestCommentList($obj);

            $content_items = array();

            if(!count($output)) return;

            foreach($output as $key => $oComment) {
                $attribute = $oComment->getObjectVars();
                $title = $oComment->getSummary($args->content_cut_size);
				$thumbnail = $oComment->getThumbnail($args->thumbnail_width,$args->thumbnail_height,$args->thumbnail_type);
				$image_max = $oComment->getThumbnail($args->image_maxwidth,$args->image_maxheight,$args->thumbnail_type);
                $url = sprintf("%s#comment_%s",getUrl('','document_srl',$oComment->get('document_srl')),$oComment->get('comment_srl'));

                $attribute->mid = $args->mid_lists[$attribute->module_srl];
                $browser_title = $args->module_srls_info[$attribute->module_srl]->browser_title;
                $domain = $args->module_srls_info[$attribute->module_srl]->domain;

                $content_item = new newsItem($browser_title);
                $content_item->adds($attribute);
                $content_item->setTitle($title);
				$content_item->setThumbnail($thumbnail);
				$content_item->setImageMax($image_max);
                $content_item->setLink($url);
                $content_item->setDomain($domain);
                $content_item->add('mid', $args->mid_lists[$attribute->module_srl]);
                $content_items[] = $content_item;
            }
            return $content_items;
        }

        function _getDocumentItems($args){
            // Get model object from the document module
            $oDocumentModel = &getModel('document');
            // Get categories
            $obj->module_srl = $args->module_srl;
            $output = executeQueryArray('widgets.contentslist.getCategories',$obj);
            if($output->toBool() && $output->data) {
                foreach($output->data as $key => $val) {
                    $category_lists[$val->module_srl][$val->category_srl] = $val;
                }
            }
            // Get a list of documents
            $obj->module_srl = $args->module_srl;
            $obj->category_srl = $args->category_srl;
            $obj->sort_index = $args->order_target;
            $obj->order_type = $args->order_type=="desc"?"asc":"desc";
            $obj->list_count = $args->list_count;
			$obj->statusList = array('PUBLIC');
            $output = executeQueryArray('widgets.contentslist.getNewestDocuments', $obj);
            if(!$output->toBool() || !$output->data) return;
            // If the result exists, make each document as an object
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
                    $category_srl = $oDocument->get('category_srl');
					$thumbnail = $oDocument->getThumbnail($args->thumbnail_width,$args->thumbnail_height,$args->thumbnail_type);
					$image_max = $oDocument->getThumbnail($args->image_maxwidth,$args->image_maxheight,$args->thumbnail_type);
					$UploadedFilelist = $oDocument->getUploadedFiles();
                    $content_item = new newsItem( $args->module_srls_info[$module_srl]->browser_title );
                    $content_item->adds($oDocument->getObjectVars());
                    $content_item->add('original_content', $oDocument->get('content'));
                    $content_item->setTitle($oDocument->getTitle());
                    $content_item->setCategory( $category_lists[$module_srl][$category_srl]->title );
                    $content_item->setDomain( $args->module_srls_info[$module_srl]->domain );
                    $content_item->setContent($oDocument->getSummary($args->content_cut_size));
                    $content_item->setLink( getSiteUrl($domain,'','document_srl',$document_srl) );
					$content_item->setThumbnail($thumbnail);
					$content_item->setImageMax($image_max);
                    $content_item->setExtraImages($oDocument->printExtraImages($args->duration_new * 60 * 60));
					$content_item->setUpFileList($UploadedFilelist); // 첨부파일 이미지
					$content_item->add('mid', $args->mid_lists[$module_srl]);
					$content_item->setDocumentSrl($document_srl); // 게시글 번호
					$content_item->setDaysAgo($oDocument->get('regdate'));
					$content_item->setWhatValue($maximage_name);
					if($first_thumbnail_idx==-1 && $thumbnail) $first_thumbnail_idx = $i;
                    $content_items[] = $content_item;
                }

				$content_items[0]->setFirstThumbnailIdx($first_thumbnail_idx);
            }
            return $content_items;
        }

        function _getSummary($content, $str_size = 50)
        {
            $content = preg_replace('!(<br[\s]*/{0,1}>[\s]*)+!is', ' ', $content);
            // Replace tags such as </p> , </div> , </li> and others to a whitespace
            $content = str_replace(array('</p>', '</div>', '</li>'), ' ', $content);
            // Remove Tag
            $content = preg_replace('!<([^>]*?)>!is','', $content);
            // Replace tags to <, >, " and whitespace
            $content = str_replace(array('&lt;','&gt;','&quot;','&nbsp;'), array('<','>','"',' '), $content);
            // Delete  a series of whitespaces
            $content = preg_replace('/ ( +)/is', ' ', $content);
            // Truncate string
            $content = trim(cut_str($content, $str_size, $tail));
            // Replace back <, >, " to the original tags
            $content = str_replace(array('<','>','"'),array('&lt;','&gt;','&quot;'), $content);
            // Fixed to a newline bug for consecutive sets of English letters
            $content = preg_replace('/([a-z0-9\+:\/\.\~,\|\!\@\#\$\%\^\&\*\(\)\_]){20}/is',"$0-",$content);
            return $content; 
        }


       /**
         * @brief function to receive contents from rss url
         * For Tistory blog in Korea, the original RSS url has location header without contents. Fixed to work as same as rss_reader widget.
         **/

        function _compile($args,$content_items){
            $oTemplate = &TemplateHandler::getInstance();
            // Set variables for widget
            $widget_info->modules_info = $args->modules_info;
			$widget_info->list_title = $args->list_title;
            $widget_info->list_count = $args->list_count;
            $widget_info->subject_cut_size = $args->subject_cut_size;
            $widget_info->content_cut_size = $args->content_cut_size;

            $list_type = $args->list_type_arr;
			for($i=0,$c=count($list_type);$i<$c;$i++) {
				switch($list_type[$i]){
					case 'thumbnail':
						$args->show_thumbnail = "Y";
						break;
					case 'show_browser_title':
						$args->show_browser_title = "Y";
						break;
					case 'show_category':
						$args->show_category = "Y";
						break;
					case 'show_title':
						$args->show_title = "Y";
						break;
					case 'show_content':
						$args->show_content = "Y";
						break;
					case 'show_comment_count':
						$args->show_comment_count = "Y";
						break;
					case 'show_author':
						$args->show_author = "Y";
						break;
					case 'show_regdate':
						$args->show_regdate = "Y";
						break;
					case 'show_icon':
						$args->show_icon = "Y";
						break;				}
			}

			$widget_info->list_type = $args->list_type_arr;
			if($args->show_thumbnail!='Y') $args->show_thumbnail = 'N';
			$widget_info->show_thumbnail = $args->show_thumbnail;
			if($args->show_browser_title!='Y') $args->show_browser_title = 'N';
			$widget_info->show_browser_title = $args->show_browser_title;
			if($args->show_category!='Y') $args->show_category = 'N';
			$widget_info->show_category = $args->show_category;
			if($args->show_title!='Y') $args->show_title = 'N';
			$widget_info->show_title = $args->show_title;
			if($args->show_content!='Y') $args->show_content = 'N';
			$widget_info->show_content = $args->show_content;
			if($args->show_comment_count!='Y') $args->show_comment_count = 'N';
			$widget_info->show_comment_count = $args->show_comment_count;
			if($args->show_author!='Y') $args->show_author = 'N';
			$widget_info->show_author = $args->show_author;
			if($args->show_regdate!='Y') $args->show_regdate = 'N';
			$widget_info->show_regdate = $args->show_regdate;
			if($args->show_icon!='Y') $args->show_icon = 'N';
			$widget_info->show_icon = $args->show_icon;
			$widget_info->ptypto = $args->ptypto;
			$widget_info->duration_new = $args->duration_new * 60*60;

			$widget_info->show_title = $args->show_title;
			$widget_info->subject_cut_size = $args->subject_cut_size;
			$widget_info->title_font_family = $args->title_font_family;
			$widget_info->title_font_user = $args->title_font_user;
			if(preg_match('/^http:\/\//i',$args->title_fonturl)) $widget_info->title_fonturl = $args->title_fonturl;
			$widget_info->title_font_size = $args->title_font_size;
			$widget_info->title_font_color = $args->title_font_color;
			$widget_info->title_height = $args->title_height;

			$widget_info->show_content = $args->show_content;
			$widget_info->content_cut_size = $args->content_cut_size;
			$widget_info->content_font_family = $args->content_font_family;
			$widget_info->content_font_user = $args->content_font_user;
			if(preg_match('/^http:\/\//i',$args->content_fonturl)) $widget_info->content_fonturl = $args->content_fonturl;
			$widget_info->content_font_size = $args->content_font_size;
			$widget_info->content_font_color = $args->content_font_color;
			$widget_info->content_height = $args->content_height;
			if($args->title_font_family=='webfont'||$args->content_font_family=='webfont') $widget_info->webfont = 'Y';
			if($args->title_font_family=='cufon'||$args->content_font_family=='cufon') $widget_info->cufon = 'Y';
			if($widget_info->title_fonturl!=''||$widget_info->content_fonturl!='') $widget_info->fonturl = 'Y';
			if($widget_info->webfont == 'Y'||$widget_info->cufon == 'Y') $widget_info->fontype = 'Y';

			$widget_info->cl_colorset = $args->cl_colorset;
			$widget_info->cl_gradient = $args->cl_gradient;
			$widget_info->cl_gr1st = $args->cl_gr1st;
			$widget_info->cl_gr2ndpos = $args->cl_gr2ndpos;
			$widget_info->cl_gr2nd = $args->cl_gr2nd;
			$widget_info->cl_gr3rdpos = $args->cl_gr3rdpos;
			$widget_info->cl_gr3rd = $args->cl_gr3rd;
			$widget_info->cl_gr4th = $args->cl_gr4th;
			$widget_info->cl_grfc = $args->cl_grfc;
			$widget_info->cl_grbdcolor = $args->cl_grbdcolor;
			$widget_info->cl_grbgcolor = $args->cl_grbgcolor;
			$widget_info->cl_grbdsize = $args->cl_grbdsize;
			$widget_info->cl_shadow = $args->cl_shadow;

			$widget_info->thumbnail_type = $args->thumbnail_type;
			$widget_info->thumbnail_width = $args->thumbnail_width;
			$widget_info->thumbnail_height = $args->thumbnail_height;
			$widget_info->image_maxwidth = $args->image_maxwidth;
			$widget_info->image_maxheight = $args->image_maxheight;
			if($args->isotope_type=='variable-sizes') $widget_info->isotope_type = "variable-sizes";
			$widget_info->show_filter = $args->show_filter;

			$widget_info->items_shuffle = $args->items_shuffle;
			$widget_info->mid_lists = $args->mid_lists;

			// If it is a tab type, list up tab items and change key value(module_srl) to index 
			$widget_info->content_items = $content_items;
			unset($args->list_type_arr);
			unset($args->modules_info);

			Context::set('colorset', $args->colorset);
			Context::set('widget_info', $widget_info);
			Context::set('content_items', $content_items);
			Context::set('browser_info', $args->module_srls_info);
			//Context::set('is_what', $document_srls);

			$tpl_path = sprintf('%sskins/%s', $this->widget_path, $args->skin);

			// 템플릿 컴파일하여 html로 return
			$act = Context::get('act');
			if($act == "dispPageAdminContentModify" || $act == "procWidgetGenerateCodeInPage")
				return $oTemplate->compile($tpl_path, "edit");
			return $oTemplate->compile($tpl_path, "list");
        }

	}

    class newsItem extends Object {

		var $browser_title = null;
		var $has_first_thumbnail_idx = false;
		var $first_thumbnail_idx = null;
		var $contents_link = null;
		var $domain = null;

		function newsItem($browser_title=''){
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
			$this->add('url',$url);
		}
		function setTitle($title){
			$this->add('title',$title);
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
		// Save author's homepage url. By misol
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
		function getRegdate($format = 'Y.m.d H:i:s') {
			return zdate($this->get('regdate'), $format);
		}
		function printExtraImages() {
			return $this->get('extra_images');
		}
		function haveFirstThumbnail() {
			return $this->has_first_thumbnail_idx;
		}
		function setThumbnail($thumbnail){
			$this->add('thumbnail',$thumbnail);
		}
		function getThumbnail(){
			return $this->get('thumbnail');
		}
		function setImageMax($image_max){
			$this->add('image_max',$image_max);
		}
		function getImageMax(){
			return $this->get('image_max');
		}
		function getMemberSrl() {
			return $this->get('member_srl');
		}
		function setDocumentSrl($docsrl){
			$this->add('documentsrl',$docsrl);
		}
		function getDocumentSrl(){
			return $this->get('documentsrl');
		}
		function setUpFileList($uploadedfile){
			$imgno=count($uploadedfile);
			unset($previewfile);
			for($i=0;$i<$imgno;$i++) {
				$filename = strtolower($uploadedfile[$i]->source_filename);
				$srcname = substr($uploadedfile[$i]->uploaded_filename, 2);
			}

			if(preg_match('/\.(jpg|png|jpeg|gif)/i',$filename)) $previewfile = getSiteUrl().$srcname;

			if($previewfile!='') $this->add('previewfile',$srcname);
			$this->add('upfilelist',$srcname);
		}
		function getAttachedFile(){
			return $this->get('upfilelist');
		}
		function getPreview(){
			return $this->get('previewfile');
		}
		function setDaysAgo($whatime){
			if(abs(ceil(strtotime($whatime)-strtotime("now"))) < 60) $daysago = abs(ceil(strtotime($whatime)-strtotime("now")))."초전";
			elseif(abs(ceil((strtotime($whatime)-strtotime("now"))/60)) < 60) $daysago = abs(ceil((strtotime($whatime)-strtotime("now"))/60))."분전";
			elseif(abs(ceil((strtotime($whatime)-strtotime("now"))/3600)) < 24) $daysago = abs(ceil((strtotime($whatime)-strtotime("now"))/3600))."시전";
			elseif(abs(ceil((strtotime($whatime)-strtotime("now"))/86400)) < 30) $daysago = abs(ceil((strtotime($whatime)-strtotime("now"))/86400))."일전";
			else $daysago = date('m-d', $whatime);
			$this->add('daysago',$daysago);
		}
		function getDaysAgo(){
			return $this->get('daysago');
		}

		function rgb2comp($color) {
			$color = str_replace('#','',$color);
			$r = dechex(255 - hexdec(substr($color,0,2)));
			$r = (strlen($r) > 1) ? $r : '0'.$r;
			$g = dechex(255 - hexdec(substr($color,2,2)));
			$g = (strlen($g) > 1) ? $g : '0'.$g;
			$b = dechex(255 - hexdec(substr($color,4,2)));
			$b = (strlen($b) > 1) ? $b : '0'.$b;
			return $r.$g.$b;
		}
		function rgb2hsl($color,$hue = 0.5) {
			$color = str_replace('#','',$color);

			// $color is the six digit hex colour code we want to convert
			$redhex  = substr($color,0,2);
			$greenhex = substr($color,2,2);
			$bluehex = substr($color,4,2);

			// $var_r, $var_g and $var_b are the three decimal fractions to be input to our RGB-to-HSL conversion routine
			$var_r = (hexdec($redhex)) / 255;
			$var_g = (hexdec($greenhex)) / 255;
			$var_b = (hexdec($bluehex)) / 255;

			// Input is $var_r, $var_g and $var_b from above
			// Output is HSL equivalent as $h, $s and $l — these are again expressed as fractions of 1, like the input values
			$var_min = min($var_r,$var_g,$var_b);
			$var_max = max($var_r,$var_g,$var_b);
			$del_max = $var_max - $var_min;

			$l = ($var_max + $var_min) / 2;

			if ($del_max == 0){
				$h = 0;
				$s = 0;
			}else{
				if ($l < 0.5) $s = $del_max / ($var_max + $var_min);
				else $s = $del_max / (2 - $var_max - $var_min);

				$del_r = ((($var_max - $var_r) / 6) + ($del_max / 2)) / $del_max;
				$del_g = ((($var_max - $var_g) / 6) + ($del_max / 2)) / $del_max;
				$del_b = ((($var_max - $var_b) / 6) + ($del_max / 2)) / $del_max;

				if ($var_r == $var_max) $h = $del_b - $del_g;
				elseif ($var_g == $var_max) $h = (1 / 3) + $del_r - $del_b;
				elseif ($var_b == $var_max) $h = (2 / 3) + $del_g - $del_r;

				if ($h < 0) $h += 1;
				if ($h > 1) $h -= 1;
			};

			// Calculate the opposite hue, $h2
			$h2 = $h + $hue;
			if ($h2 > 1) $h2 -= 1;

			// Input is HSL value of complementary colour, held in $h2, $s, $l as fractions of 1
			// Output is RGB in normal 255 255 255 format, held in $r, $g, $b
			// Hue is converted using function hue_2_rgb, shown at the end of this code
			if ($s == 0){
				$r = $l * 255;
				$g = $l * 255;
				$b = $l * 255;
			}else{
				if ($l < $hue) $var_2 = $l * (1 + $s);
				else $var_2 = ($l + $s) - ($s * $l);

				$var_1 = 2 * $l - $var_2;
				$r = 255 * $this->hue_2_rgb($var_1,$var_2,$h2 + (1 / 3));
				$g = 255 * $this->hue_2_rgb($var_1,$var_2,$h2);
				$b = 255 * $this->hue_2_rgb($var_1,$var_2,$h2 - (1 / 3));
			};

			$rhex = sprintf("%02X",round($r));
			$ghex = sprintf("%02X",round($g));
			$bhex = sprintf("%02X",round($b));

			return $rgbhex = '#'.$rhex.$ghex.$bhex;
		}
		// Function to convert hue to RGB, called from above
		function hue_2_rgb($v1,$v2,$vh){
			if ($vh < 0) $vh += 1;
			if ($vh > 1) $vh -= 1;
			if ((6 * $vh) < 1) return ($v1 + ($v2 - $v1) * 6 * $vh);
			if ((2 * $vh) < 1) return ($v2);
			if ((3 * $vh) < 2) return ($v1 + ($v2 - $v1) * ((2 / 3 - $vh) * 6));
			return ($v1);
		}
		// 변수값을 알아보기 위한 테스트 함수
		function setWhatValue($what_value){
			$this->add('what_value',$what_value);
		}
		function getWhatValue() {
			return $this->get('what_value');
		}
	}
?>
