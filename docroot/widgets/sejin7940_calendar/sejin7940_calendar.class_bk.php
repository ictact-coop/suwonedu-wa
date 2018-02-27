<?php
    /**
     * @class sejin7940_calendar
     * @author zero (zero@nzeo.com)
     * @brief 보관현황 목록 출력
     * @version 0.1
     **/

    class sejin7940_calendar extends WidgetHandler {

        /**
         * @brief 위젯의 실행 부분
         *
         * ./widgets/위젯/conf/info.xml 에 선언한 extra_vars를 args로 받는다
         * 결과를 만든후 print가 아니라 return 해주어야 한다
         **/
        function proc($args) {
            $oModuleModel = &getModel('module');

            // 대상 모듈 (mid_list는 기존 위젯의 호환을 위해서 처리하는 루틴을 유지. module_srl로 위젯에서 변경)
            $oModuleModel = &getModel('module');
            if($args->mid_list) {
                $mid_list = explode(",",$args->mid_list);
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
            } 
			// 대상 모듈이 선택되어 있지 않으면 해당 사이트의 전체 모듈을 대상으로 함  (sejin7940 추가)
			elseif(!$args->module_srls){
				unset($obj);
				$obj->site_srl = (int)$site_module_info->site_srl;
				$output = executeQueryArray('widgets.sejin7940_calendar.getMids', $obj);
				if($output->data) {
					foreach($output->data as $key => $val) {
						// 권한 체크
						$grant_info = $oModuleModel->getGrant($oModuleModel->getModuleInfoByModuleSrl($val->module_srl), $_SESSION['logged_info']);
						$args->grant_view[$val->module_srl] = $grant_info->view;  // 보기권한 있는지 여부 저장
						if (!$grant_info->list) continue;  // 목록권한 없으면 아예 제외

						$args->modules_info[$val->mid] = $val;
						$args->module_srls_info[$val->module_srl] = $val;
						$args->mid_lists[$val->module_srl] = $val->mid;
						$module_srl[] = $val->module_srl;

						if($args->module_srls) $args->module_srls.=",".$val->module_srl;
						else $args->module_srls=$val->module_srl;
					}
				}
				$args->modules_info = $oModuleModel->getMidList($obj);
			}
			else $args->module_srls = explode(',',$args->module_srls);
			$obj->module_srls = $args->module_srls;


            // 선택된 모듈이 없으면 실행 취소
            if(!$obj->module_srls) return Context::getLang('msg_not_founded');

            // 모듈의 정보를 구함
            $module_info = $oModuleModel->getModuleInfoByModuleSrl($obj->module_srls);


            if(Context::get('search_target')==$args->date_var) {
                $regdate = Context::get('search_keyword');
                if($regdate) $obj->regdate = zdate($regdate, 'Ym');
            }
            if(!$obj->regdate) $obj->regdate = zdate(date('YmdHis'), 'Ym');

			// sejin7940 추가 (멀티 달력 표현 위해서 )

			if($args->multi=="-1") $obj->regdate=  date('Ym', mktime(1,0,0,zdate($obj->regdate,'m'),1,zdate($obj->regdate,'Y'))-60*60*24);
			elseif($args->multi=="1") $obj->regdate= date('Ym', mktime(1,0,0,zdate($obj->regdate,'m'),date('t', ztime($obj->regdate)),zdate($obj->regdate,'Y'))+60*60*24);


            // document 모듈의 model 객체를 받아서 getDailyArchivedList() method를 실행
            $oDocumentModel = &getModel('document');
            $output = $oDocumentModel->getDailyArchivedList($obj);

            // 위젯 자체적으로 설정한 변수들을 체크
            $title = $args->title;

            // 템플릿 파일에서 사용할 변수들을 세팅

			$widget_info->date_var = $args->date_var;

            $widget_info->cur_date = $obj->regdate;
            $widget_info->today_str = sprintf('%4d%s %2d%s',zdate($obj->regdate, 'Y'), Context::getLang('unit_year'), zdate($obj->regdate,'m'), Context::getLang('unit_month'));
            $widget_info->last_day = date('t', ztime($obj->regdate));
            $widget_info->start_week= date('w', ztime($obj->regdate));

            $widget_info->prev_month = date('Ym', mktime(1,0,0,zdate($obj->regdate,'m'),1,zdate($obj->regdate,'Y'))-60*60*24);
            $widget_info->prev_year = date('Y', mktime(1,0,0,1,1,zdate($obj->regdate,'Y'))-60*60*24);
            $widget_info->next_month = date('Ym', mktime(1,0,0,zdate($obj->regdate,'m'),$widget_info->last_day,zdate($obj->regdate,'Y'))+60*60*24);
            $widget_info->next_year = date('Y', mktime(1,0,0,12,$widget_info->last_day,zdate($obj->regdate,'Y'))+60*60*24);

            $widget_info->title = $title;

            if(count($output->data)) {
                foreach($output->data as $key => $val) $widget_info->calendar[$val->month] = $val->count;
            }

            if($module_info->site_srl) {
                $site_module_info = Context::get('site_module_info');
                if($site_module_info->site_srl == $module_info->site_srl) $widget_info->domain = $site_module_info->domain;
                else {
                    $site_info = $oModuleModel->getSiteInfo($module_info->site_srl);
                    $widget_info->domain = $site_info->domain;
                }
            } else $widget_info->domain = Context::getDefaultUrl();
            $widget_info->module_info = $module_info;
            $widget_info->mid = $module_info->mid;
            Context::set('widget_info', $widget_info);

            // 템플릿의 스킨 경로를 지정 (skin, colorset에 따른 값을 설정)
            $tpl_path = sprintf('%sskins/%s', $this->widget_path, $args->skin);
            Context::set('colorset', $args->colorset);

            // 템플릿 파일을 지정
            $tpl_file = 'calendar';

            // 템플릿 컴파일
            $oTemplate = &TemplateHandler::getInstance();
            return $oTemplate->compile($tpl_path, $tpl_file);
        }
    }
?>
