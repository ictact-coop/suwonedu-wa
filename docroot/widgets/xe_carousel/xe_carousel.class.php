<?php
    
    class xe_carousel extends WidgetHandler {
        function proc($args) { 
			// 컬러셋
            $widget_info->widget_colorset = (int)$args->widget_colorset;
            if(!$widget_info->widget_colorset) $widget_info->widget_colorset = '#9ece5d';
			
            // 글자 제목 길이
            $widget_info->subject_cut_size = (int)$args->subject_cut_size;
            if(!$widget_info->subject_cut_size) $widget_info->subject_cut_size = 30;

           
            // 썸네일 생성 방법
            $widget_info->thumbnail_type = $args->thumbnail_type;
            if(!$widget_info->thumbnail_type) $widget_info->thumbnail_type = 'crop';

            // 썸네일 가로 크기
            $widget_info->thumbnail_width = (int)$args->thumbnail_width;
            if(!$widget_info->thumbnail_width) $widget_info->thumbnail_width = 232;

            // 썸네일 세로 크기
            $widget_info->thumbnail_height = (int)$args->thumbnail_height;
            if(!$widget_info->thumbnail_height) $widget_info->thumbnail_height = 150;

           
            // 가로 이미지 수
            $widget_info->cols_list_count = (int)$args->cols_list_count;
            if(!$widget_info->cols_list_count) $widget_info->cols_list_count = 12;

            // 정렬 대상
            $widget_info->order_target = $args->order_target;
            if(!in_array($widget_info->order_target, array('list_order','update_order'))) $widget_info->order_target = 'list_order';

            // 정렬 순서
            $widget_info->order_type = $args->order_type;
            if(!in_array($widget_info->order_type, array('asc','desc'))) $widget_info->order_type = 'asc';

			//롤링 이미지갯수
			$widget_info->roll_list_count = $args->roll_list_count;
            if(!$widget_info->roll_list_count) $widget_info->roll_list_count = 3;
			
			//컨텐츠정보박스
			$widget_info->display_content_info = $args->display_content_info;
            if(!$widget_info->display_content_info) $widget_info->display_content_info = 'Y';
			
			//툴팁사용여부
			$widget_info->tooltip_enum = $args->tooltip_enum;
            if(!$widget_info->tooltip_enum) $widget_info->tooltip_enum = 'Y';
			
			//버튼사용여부
			$widget_info->button_enum = $args->button_enum;
            if(!$widget_info->button_enum) $widget_info->button_enum = 'Y';
			
			$widget_info->display_browser_title = $args->display_browser_title;
            if(!$widget_info->display_browser_title) $widget_info->display_browser_title = 'Y';
			
			
			
            // 노출 여부 체크
            if($args->display_author!='Y') $widget_info->display_author = 'N';
            else $widget_info->display_author = 'Y';
            if($args->display_regdate!='Y') $widget_info->display_regdate = 'N';
            else $widget_info->display_regdate = 'Y';
            if($args->display_readed_count!='Y') $widget_info->display_readed_count = 'N';
            else $widget_info->display_readed_count = 'Y';
            
            // 제목
            $widget_info->title = $args->title;
			
			
			
            // 대상 모듈 (mid_list는 기존 위젯의 호환을 위해서 처리하는 루틴을 유지. module_srl로 위젯에서 변경)
            if($args->mid_list) {
                $mid_list = explode(",",$args->mid_list);
                $oModuleModel = &getModel('module');
                if(count($mid_list)) {
                    $module_srl = $oModuleModel->getModuleSrlByMid($mid_list);
                } else {
                    $site_module_info = Context::get('site_module_info');
                    if($site_module_info) {
                        $margs->site_srl = $site_module_info->site_srl;
                        $oModuleModel = &getModel('module');
                        $output = $oModuleModel->getMidList($margs);
                        if(count($output)) $mid_list = array_keys($output);
                        $module_srl = $oModuleModel->getModuleSrlByMid($mid_list);
                    }
                }
            } else $module_srl = explode(',',$args->module_srls);

            $obj->module_srl = implode(",",$module_srl);
            $obj->sort_index = $widget_info->order_target;
            $obj->order_type = $widget_info->order_type=="desc"?"asc":"desc";
            $obj->list_count = $widget_info->cols_list_count;

            $output = executeQueryArray('widgets.xe_carousel.getNewestDocuments', $obj);

            // document 모듈의 model 객체를 받아서 결과를 객체화 시킴
            $oDocumentModel = &getModel('document');

            // 오류가 생기면 그냥 무시
            if(!$output->toBool()) return;

            // 결과가 있으면 각 문서 객체화를 시킴
            if(count($output->data)) {
                foreach($output->data as $key => $attribute) {
                    $document_srl = $attribute->document_srl;

                    $oDocument = null;
                    $oDocument = new documentItem();
                    $oDocument->setAttribute($attribute, false);
                    $GLOBALS['XE_DOCUMENT_LIST'][$oDocument->document_srl] = $oDocument;

                    $document_list[$key] = $oDocument;
                }
                $oDocumentModel->setToAllDocumentExtraVars();
            } else {

                $document_list = array();
                
            }

            $document_count = count($document_list);
            $total_count = $widget_info->cols_list_count;
            for($i=$document_count;$i<$total_count;$i++){
				if($document_list[$i]){
					$document_list[] = new DocumentItem();
				}
		    }

            $widget_info->document_list = $document_list;

            Context::set('widget_info', $widget_info);

            // 템플릿의 스킨 경로를 지정 (skin, colorset에 따른 값을 설정)
            $tpl_path = sprintf('%sskins/%s', $this->widget_path, $args->skin);
            Context::set('colorset', $args->colorset);

            // 템플릿 파일을 지정
            $tpl_file = 'list';

            // 템플릿 컴파일
            $oTemplate = &TemplateHandler::getInstance();
            $output = $oTemplate->compile($tpl_path, $tpl_file);
            return $output;
        }
    }
?>
