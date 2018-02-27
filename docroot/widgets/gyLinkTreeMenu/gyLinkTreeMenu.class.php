<?php
    /**
     * @class gyLinkMenu
     * @author gayeon (ghkdwind@naver.com)
     * @brief 
     * @version 0.1
     **/

    class gyLinkTreeMenu extends WidgetHandler {

        /**
         * @brief 위젯의 실행 부분
         *
         * ./widgets/위젯/conf/info.xml 에 선언한 extra_vars를 args로 받는다
         * 결과를 만든후 print가 아니라 return 해주어야 한다
         **/
        function proc($args) {
            $oModuleModel = &getModel('module');

			$widget_info->mid = Context::get('mid');
			$mod_srl = $oModuleModel->getModuleSrlByMid($widget_info->mid);
			$widget_info->module_srl = $mod_srl[0];

			if(!$args->widget_width or !is_numeric($args->widget_width)) $widget_info->widget_width = 200;
			else $widget_info->widget_width = $args->widget_width;
			
			if(!$args->widget_height or !is_numeric($args->widget_height)) $widget_info->widget_height = 400;
			else $widget_info->widget_height = $args->widget_height;

			if(!$args->widget_bg_color) $widget_info->widget_bg_color = 'fff';
			else $widget_info->widget_bg_color = $args->widget_bg_color;

			if(!$args->widget_border_color) $widget_info->widget_border_color = 'ccc';
			else $widget_info->widget_border_color = $args->widget_border_color;

			if(!$args->widget_border_type) $widget_info->widget_border_type = 'solid';
			else $widget_info->widget_border_type = $args->widget_border_type;

			if(!$args->widget_border_size or !is_numeric($args->widget_border_size)) $widget_info->widget_border_size = 1;
			else $widget_info->widget_border_size = $args->widget_border_size;

			if(!$args->widget_title_type) $widget_info->widget_title_type = 'text';
			else $widget_info->widget_title_type = $args->widget_title_type;

			if(!$args->widget_title_image) $widget_info->widget_title_image = '';
			else $widget_info->widget_title_image = $args->widget_title_image;

			if(!$args->widget_title_text) $widget_info->widget_title_text = 'SITE MAP';
			else $widget_info->widget_title_text = $args->widget_title_text;

			if(!$args->widget_title_color) $widget_info->widget_title_color = '000';
			else $widget_info->widget_title_color = $args->widget_title_color;

			if(!$args->widget_title_bg_color) $widget_info->widget_title_bg_color = 'F1F1F1';
			else $widget_info->widget_title_bg_color = $args->widget_title_bg_color;

			if(!$args->menu_color) $widget_info->menu_color = '333';
			else $widget_info->menu_color = $args->menu_color;

			if(!$args->selected_menu_color) $widget_info->selected_menu_color = '000';
			else $widget_info->selected_menu_color = $args->selected_menu_color;

			if(!$args->open_all_bg_color) $widget_info->open_all_bg_color = '333';
			else $widget_info->open_all_bg_color = $args->open_all_bg_color;

			if(!$args->open_all_text_color) $widget_info->open_all_text_color = 'FFF';
			else $widget_info->open_all_text_color = $args->open_all_text_color;

			if(!$args->open_all_hover_bg_color) $widget_info->open_all_hover_bg_color = '666';
			else $widget_info->open_all_hover_bg_color = $args->open_all_hover_bg_color;

			if(!$args->open_all_hover_text_color) $widget_info->open_all_hover_text_color = 'FFF';
			else $widget_info->open_all_hover_text_color = $args->open_all_hover_text_color;

			if(!$args->display_menu_type) $widget_info->display_menu_type = 'sg';
			else $widget_info->display_menu_type = $args->display_menu_type;

            Context::set('colorset', $args->colorset);
            Context::set('widget_info', $widget_info);

            $tpl_path = sprintf('%sskins/%s', $this->widget_path, $args->skin);
            $tpl_file = 'tree_menu';

            $oTemplate = &TemplateHandler::getInstance();
            return $oTemplate->compile($tpl_path, $tpl_file);
        }
    }
?>
