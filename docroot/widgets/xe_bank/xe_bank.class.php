<?php

		/**
		 * @class Bank
		 * @author HomeBox™ (wds0119@empal.com)
		 * @version 0.1
		 */
		class xe_bank extends WidgetHandler
{
		/**
		 * @brief 위젯의 실행 부분
		 * ./widgets/위젯/conf/info.xml에 선언한 extra_vars를 args로 받는다
		 * 결과값은 return 해준다.
		 **/

		function proc($args)
		{
			$widget_info->bank_name01 = $args->bank_name01;		// 은행명01
			$widget_info->bank_num01 = $args->bank_num01;			// 계좌번호01
			$widget_info->bank_name02 = $args->bank_name02;		// 은행명02
			$widget_info->bank_num02 = $args->bank_num02;			// 계좌번호02
			$widget_info->bank_info = $args->bank_info;					// 예금주

			// 템플릿의 스킨 경로를 지정 (skin, colorset에 따른 값을 설정)
			$tpl_path = sprintf('%sskins/%s', $this->widget_path, $args->skin);
			Context::set('widget_info', $widget_info);

			// 템플릿 파일명
			$tpl_file = 'xe_bank';

			// 템플릿 컴파일
			$oTemplate = &TemplateHandler::getInstance();
			return $oTemplate->compile($tpl_path, $tpl_file);

		}

}
/* End of file xe_bank.class.php */
/* Location: ./widgets/xe_bank/xe_bank.class.php */
