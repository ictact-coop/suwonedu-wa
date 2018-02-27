<?php
    /**
     * @class treasurej_popular
	 * @author Treasurej (xepro@naver.com)
     * @author zero (zero@xpressengine.com)
     * @brief 모듈을 대상으로 인기글/최근글/댓글을 추출합니다.
     **/

    class treasurej_popular extends WidgetHandler {

        /**
         * @brief 위젯의 실행 부분
         *
         * ./widgets/위젯/conf/info.xml 에 선언한 extra_vars를 args로 받는다
         * 결과를 만든후 print가 아니라 return 해주어야 한다
         **/
        function proc($args) {
            $oDocumentModel = &getModel('document');
            $oCommentModel = &getModel('comment');
			
			$args->option_view_arr = explode(',',$args->option_view);
			$args->tab_view_arr = explode(',',$args->tab_view);
			
			// 위젯에 넘기기 위한 변수 설정
			$widget_info->option_view_arr = $args->option_view_arr;
			$widget_info->tab_view_arr = $args->tab_view_arr;
			$widget_info->widget_widths = $args->widget_widths;
			$widget_info->subject_cut_size = (int)$args->subject_cut_size;
			$widget_info->content_cut_size = (int)$args->content_cut_size;
			$widget_info->comment_cut_size = (int)$args->comment_cut_size;
			$widget_info->thumbnail_width = $args->thumbnail_width;
			$widget_info->thumbnail_height = $args->thumbnail_height;
			
			// 기본값 설정
			if(!$args->widget_widths) $widget_info->widget_widths = 240;
			if(!$args->subject_cut_size) $widget_info->subject_cut_size = 20;
			if(!$args->content_cut_size) $widget_info->content_cut_size = 50;
			if(!$args->comment_cut_size) $widget_info->comment_cut_size = 100;
            if(!$args->thumbnail_width) $widget_info->thumbnail_width = 60;
            if(!$args->thumbnail_height) $widget_info->thumbnail_height = 60;

            // 인수 정리
            $db_args->module_srls = $args->module_srls;
            $db_args->sort_index = 'documents.list_order';
            $db_args->order_type = 'asc';
            $db_args->list_count = $args->list_count;
			$db_args->clist_count = $args->clist_count;

            // 최신글을 구함
            $output = executeQueryArray('widgets.treasurej_popular.getNewestDocuments', $db_args);
            if($output->data) {
                foreach($output->data as $k => $v) {
                    $oDocument = null;
                    $oDocument = $oDocumentModel->getDocument();
                    $oDocument->setAttribute($v, false);
                    $GLOBALS['XE_DOCUMENT_LIST'][$oDocument->document_srl] = $oDocument;
                    $output->data[$k] = $oDocument;
                }
                $oDocumentModel->setToAllDocumentExtraVars();
            }
            $widget_info->newest_documents = $output->data;

            // 최신 댓글을 구함
            $db_args->sort_index = 'list_order';
            $output = executeQueryArray('widgets.treasurej_popular.getNewestComments', $db_args);
            if($output->data) {
                foreach($output->data as $k => $v) {
                    $oComment = null;
                    $oComment = $oCommentModel->getComment();
                    $oComment->setAttribute($v);
                    $output->data[$k] = $oComment;
                }
            }
            $widget_info->newest_comments = $output->data;

            // 인기글을 구함
            $db_args->sort_index = 'readed_count';
            $db_args->order_type = 'desc';
			// 기간 설정
			if($args->regdate) $db_args->regdate = date("Ymd", strtotime("-{$args->regdate} day"));
            $output = executeQueryArray('widgets.treasurej_popular.getPopularDocuments', $db_args);
            if($output->data) {
                foreach($output->data as $k => $v) {
                    $oDocument = null;
                    $oDocument = $oDocumentModel->getDocument();
                    $oDocument->setAttribute($v, false);
                    $GLOBALS['XE_DOCUMENT_LIST'][$oDocument->document_srl] = $oDocument;
                    $output->data[$k] = $oDocument;
                }
                $oDocumentModel->setToAllDocumentExtraVars();
            }
            $widget_info->popular_documents = $output->data;

            Context::set('widget_info', $widget_info);

            // 언어파일 로드
            Context::loadLang($this->widget_path.'lang');

            // 템플릿의 스킨 경로를 지정 (skin, colorset에 따른 값을 설정)
            $tpl_path = sprintf('%sskins/%s', $this->widget_path, $args->skin);
            Context::set('colorset', $args->colorset);

            // 템플릿 파일을 지정
            $tpl_file = 'list';

            // 템플릿 컴파일
            $oTemplate = &TemplateHandler::getInstance();
            return $oTemplate->compile($tpl_path, $tpl_file);
        }
    }
?>
