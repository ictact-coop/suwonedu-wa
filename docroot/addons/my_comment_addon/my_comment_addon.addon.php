<?php
	
	/**
	 * @file my_comment_addon.addon.php
	 * @author showjean (showjean@naver.com http://showjean.com/xe)
	 * @brief 작성 댓글 보기
	 * 
	 **/

	if(!defined('__ZBXE__') && !defined('__XE__')) exit();
	
	if($called_position == 'before_module_init') {
   
		if($this->module != 'member'){
			$logged_info = Context::get('logged_info');
			if(!$logged_info->member_srl) return;

			// 언어파일을 읽음
			Context::loadLang('./addons/my_comment_addon/lang');

			// 회원 로그인 정보중에 메뉴를 추가
			$oMemberController = &getController('member');
			$oMemberController->addMemberMenu('dispMemberOwnComment', 'mca_view_my_comment');
		}

		// hooking
		if($this->act == 'dispMemberOwnComment'){
			$this->act = 'dispMemberLoginForm';
			Context::set('act_for_display', 'dispMemberOwnComment');
			Context::set('isComment', 'true');
			Context::set('c_search_target', Context::get('search_target'));
			Context::set('c_search_keyword', Context::get('search_keyword'));
		}

	// 댓글 보기 처리;
	}else if($called_position == 'after_module_proc' ) {
		if($this->act == 'dispMemberLoginForm' && Context::get('isComment') == 'true'){
			$logged_info = Context::get('logged_info');
			if(!$logged_info->member_srl) return;
			$member_srl = $logged_info->member_srl;

			$oModuleModel = &getModel('module');
			$oDocModel = &getModel('document');

			//$module_srl = Context::get('module_srl');
			
			$search_target = Context::get('c_search_target');
			$search_keyword = Context::get('c_search_keyword');
			if(isset($search_target) && isset($search_keyword)){
				 switch($search_target) {
                    case 'mid' :                  
							$module_srls= $oModuleModel->getModuleSrlByMid($search_keyword); 
                            $module_srl = $module_srls;
                        break;
				 }
			}

			$args->search_target = 'member_srl';
			$args->search_keyword = $member_srl;
			$args->page = Context::get('page');
			$args->list_count = 20; 
			$args->page_count = 10; 
			$args->module_srl = $module_srl;
			$mids = str_replace(' ', '', $addon_info->exclude_mid);
			if(strLen($mids) > 0) {
				$module_srls = $oModuleModel->getModuleSrlByMid($mids);
				if(isset($module_srls)) $args->exclude_module_srl = $module_srls;
			}

			if(Mobile::isMobileCheckByAgent()){	
				$args->list_count = 10; 
				$args->page_count = 5; 
			}
		
			$oCommentModel = &getModel('comment');
			$columnList = array('comment_srl', 'document_srl', 'module_srl', 'is_secret', 'status', 'content', 'comments.member_srl', 'comments.nick_name', 'comments.regdate', 'ipaddress');
			$result = $oCommentModel->getTotalCommentList($args, $columnList);

			foreach($result->data as $key=>$comment){
				$module = $oModuleModel->getModuleInfoByModuleSrl($comment->get('module_srl'));	
				$comment->oModule = $module;
				$document = $oDocModel->getDocument($comment->get('document_srl'));
				$comment->oDocument = $document;
				$result->data[$key] = $comment;
				/*$numChildren = $oCommentModel->getChildCommentCount($comment->get('comment_srl'));
				$comment->numChildren = $numChildren;	// 대댓글 수를 구하면 눈에 띠게 느려져 제거 */
			}
		
	        // 언어파일을 읽음
	        Context::loadLang('./addons/my_comment_addon/lang');					
			
			$title_len = $addon_info->title_len;

			if(Mobile::isMobileCheckByAgent()){
				Mobile::setMobile(true);
				$title_len = $title_len > 20 ? 20 : $title_len;
				
				if(defined('__XE_VERSION__') && version_compare(__XE_VERSION__, '1.5.0', '>=')){
					$header = '<style type="text/css">div.xe_mobile{display:none !important;}</style>';			
					Context::addHtmlHeader($header);			// 유도 메시지 숨김
				}else{
					$self=&Context::getInstance();				
					if($self->html_footer){	// 숨길 수 없어서 아예 제거
						$self->html_footer = preg_replace('/\<div style="margin:1em 0\;padding\:.5em\;background\:\#333\;border\:1px solid \#666\;border\-left\:0\;border\-right\:0"\>\<p style="color\:\#fff\;text\-align\:center\;margin\:1em 0"\>(.*?)\<\/div\>/is', '', $self->html_footer);
					}
				}
				$this->setTemplateFile('comment_list_mobile');	
			}else{
				$this->setTemplateFile('comment_list');		
			}

			Context::set('search_target', $search_target);
			Context::set('search_keyword', $search_keyword);

			Context::set('total_count', $result->total_count);
			Context::set('total_page', $result->total_page);
			Context::set('page', $result->page);
			Context::set('title_len', $title_len);
			Context::set('doc_title_len', $addon_info->doc_title_len);
			Context::set('comment_list', $result->data);
			Context::set('page_navigation', $result->page_navigation);
			Context::set('usedIdentifiers', array('mid'=>'mid'));

			$this->setTemplatePath('./addons/my_comment_addon/tpl');
			
		}
	}else if($called_position == 'before_display_content' ) {
		if( Context::get('act_for_display') == 'dispMemberOwnComment'){
			if(Mobile::isMobileCheckByAgent()){
				$h = trim($addon_info->header_mob);
				$f = trim($addon_info->footer_mob);
			}else{
				$h = trim($addon_info->header);
				$f = trim($addon_info->footer);
			}
			$output_h = $output_f = '';
			$oTemplate_ = &TemplateHandler::getInstance();
			if(strLen($h) > 0){
				$h = explode('#', preg_replace('/\/([^\/]*?)$/is', '#$1', $h));
				$output_h = $oTemplate_->compile($h[0],$h[1]);
			}
			if(strLen($f) > 0){
				$f = explode('#', preg_replace('/\/([^\/]*?)$/is', '#$1', $f));
				$output_f = $oTemplate_->compile($f[0],$f[1]);
			}
			$output = str_replace("##my_comment_addon_header##", $output_h, $output);
			$output = str_replace("##my_comment_addon_footer##", $output_f, $output);		
			
		}
	}
?>