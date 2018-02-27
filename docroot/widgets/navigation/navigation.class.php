<?php
    /**
     * @class navigator 
     * @author Study4U (http://study4u.hosting.paran.com)
     * @brief 배워서남준다 navigation
     * @version 0.4
     **/

    class navigation extends WidgetHandler {

        function proc($args) {
			$oModuleModel = &getModel('module');

			if($args->title) $widget_info->title = $args->title;
			if(!$args->start_depth) $args->start_depth = 0;

            if(!$args->menu_srl) {
                $current_module_info = Context::get('current_module_info');
                $args->layout_srl = $current_module_info->layout_srl;

                $oLayoutModel = &getModel('layout');
                $layout_info = $oLayoutModel->getLayout($current_module_info->layout_srl);
                if(!$layout_info) return;

                if($layout_info->extra_var_count) {
                    foreach($layout_info->extra_var as $var_id => $val) {
                        $layout_info->{$var_id} = $val->value;
                    }
                    if(!$layout_info->menu_count) return;

                    // 레이아웃 정보중 menu를 Context::set
                    foreach($layout_info->menu as $menu_id => $menu) {
                        if(file_exists($menu->php_file)) {
                            $args->menu_srl = $menu->menu_srl;
                            @include($menu->php_file);
                        }
                        break;
                    }
                } else return;
            } else {
                //$php_file = sprintf('%sfiles/cache/menu/%d.php', _XE_PATH_, $args->menu_srl);
                //@include($php_file);
		        $oMenuAdminModel = &getAdminModel('menu');
				$menu = $oMenuAdminModel->getMenu($args->menu_srl);
		        if(!file_exists($menu->php_file)) return;

				@include($menu->php_file);
			}

            if(!$menu) return;

            // 시작 depth가 2이상, 즉 상위 메뉴 선택 이후 하위 메뉴 출력시 처리
            if($args->start_depth == 2 && count($menu->list)) {
                $t_menu = null;
                foreach($menu->list as $key => $val) {
                    if($val['selected']) {
                        $t_menu->list = $val['list'];
                        break;
                    }
                }
                $menu = $t_menu;
            }

            $widget_info->menu_list = $menu->list;
			if($args->start_depth > 0) $widget_info->menu_select = &$this->getMenuSelected($menu->list, $args->start_depth);

			//$widget_info->menu_select = &$this->getMenuSelected($menu->list, $args->start_depth);

//			$this->_arrangeMenu($arranged_list, $menu->list, 0);
//          $widget_info->menu_select = $arranged_list;

			// men XML 파일
			$widget_info->xml_file = sprintf('%sfiles/cache/menu/%d.xml.php',Context::getRequestUri(), $args->menu_srl);
            $widget_info->menu_srl = $args->menu_srl;
			$widget_info->start_depth = $args->start_depth;
			if($args->nav_width=='') $args->nav_width=1000;
			$widget_info->nav_width = (int)$args->nav_width;
			$widget_info->bgcolor = $args->bgcolor;
			if($args->zindex=='') $args->zindex=100;
			$widget_info->zindex = (int)$args->zindex;

			Context::set('widget_info', $widget_info);
            Context::set('colorset', $args->colorset);

			// 템플릿 컴파일
            $tpl_path = sprintf('%sskins/%s', $this->widget_path, $args->skin);

            $oTemplate = &TemplateHandler::getInstance();
            return $oTemplate->compile($tpl_path, 'navigation');
        }

		function getMenuSelected(&$list, $depth=1) {
			if(!$list) return;

			foreach($list as $val) {
				if($val['selected']) {
					if($depth >1) return $this->getMenuSelected($val['list'], --$depth);
					else return $val;
				}
			}
        }
	}
?>
