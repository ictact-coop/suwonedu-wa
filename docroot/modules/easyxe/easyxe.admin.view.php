<?php
if(!class_exists('page'))
{
	require(_XE_PATH_ . 'modules/page/page.class.php');
}

if(!class_exists('pageAdminView'))
{
	require(_XE_PATH_ . 'modules/page/page.admin.view.php');
}

/**
 * @class easyxeAdminView
 * @author 퍼니엑스이 (contact@funnyxe.com)
 * @brief 퍼니엑스이 모듈의 admin view class
 **/

class easyxeAdminView extends pageAdminView
{
	private $widgetContextMenu = '
	<ul id="menu_1" class="jeegoocontext cm_default">
		<li data-cmd="cut">잘라내기</li>
		<li data-cmd="copy">복사
			<ul>
				<li data-cmd="clone_before">복사해서 바로 앞에 붙여넣기</li>
				<li data-cmd="clone_after">복사해서 바로 뒤에 붙여넣기</li>
			</ul>
		</li>
		<li data-cmd="paste" class="disabled">붙여넣기</li>
		<li class="separator"></li> 
		<li data-cmd="remove">삭제</li> 
		<li class="separator"></li> 
		<!--<li data-cmd="addWidgetBefore">앞에 위젯 추가</li> 
		<li data-cmd="addWidgetAfter">뒤에 위젯 추가</li>
		<li class="separator"></li>-->
		<li data-cmd="moveToFirst">맨 앞으로 이동</li> 
		<li data-cmd="moveToLast">맨 뒤로 이동</li> 
		<li class="separator"></li>
		<li data-cmd="moveToTop">앞으로</li> 
		<li data-cmd="moveToBottom">뒤로</li> 
		<li class="separator"></li> 
		<li data-cmd="resetCSS">
			CSS 초기화
			<ul>
				<li data-cmd="removeBorder">테두리 제거</li>
				<li data-cmd="removePadding">내부 여백 제거</li>
				<li data-cmd="removeMargin">외부 여백 제거</li>
			</ul>
		</li>
	</ul>';

	/**
	 * @brief 초기화
	 **/
	function init()
	{
		parent::init();

		$this->setTemplatePath('./modules/page/tpl/');
	}

	/**
	 * 페이지 모듈 확장 시 반드시 호출되어야 하는 코드
	 */
	private function _prepareExtend()
	{
		$this->setTemplatePath('./modules/easyxe/tpl/_extends/page');
	}

	/**
	 * Menu depth arrange
	 * @return void
	 */
	function straightenMenu($menu_item, $depth)
	{
		if(!$menu_item['link']) return;
		$obj = new stdClass;
		$obj->href = $menu_item['href'];
		$obj->depth = $depth;
		$obj->text = $menu_item['text'];
		$this->result[] = $obj;
		if(!$menu_item['list']) return;
		foreach($menu_item['list'] as $item)
		{
			$this->straightenMenu($item, $depth+1);
		}
	}

	public function dispPageAdminContent()
	{
		return parent::dispPageAdminContent();
	}

	/**
	 * 페이지 정보 수정
	 */
	function dispPageAdminInfo()
	{
		// 먼저, 부모 모듈의 기능을 그대로 실행한다
		$output = parent::dispPageAdminInfo();

		// 부모 모듈에서 에러가 발생했다면
		if(is_object($output) && !$output->toBool())
		{
			// 그대로 에러 반환
			return $output;
		}

		$oEasyxeModel = getModel('easyxe');
		$easyxe_config = $oEasyxeModel->getEasyxeConfig();

		if($easyxe_config->enabled == 'Y')
		{
			$this->setTemplatePath('./modules/easyxe/tpl/_extends/page/');
		}
		else
		{
			$this->setTemplatePath('./modules/page/tpl/');
		}

		// 문서 페이지인 경우
		if($this->module_info->page_type == 'ARTICLE')
		{
			// moduleModel 객체 생성
			$oModuleModel = getModel('module');

			// 설치된 모든 페이지 스킨을 가져온다
			$skin_list = $oModuleModel->getSkins('./modules/page');
			Context::set('skin_list',$skin_list);

			// 설치된 모든 모바일 페이지 스킨을 가져온다
			$mskin_list = $oModuleModel->getSkins('./modules/page', "m.skins");
			Context::set('mskin_list', $mskin_list);
		}
	}

	public function dispPageAdminContentModify()
	{
		parent::dispPageAdminContentModify();

		$oEasyxeModel = getModel('easyxe');
		$easyxe_config = $oEasyxeModel->getEasyxeConfig();

		if($easyxe_config->enabled == 'Y')
		{
			$this->setTemplatePath('./modules/easyxe/tpl/_extends/page');

			// 위젯 페이지인 경우
			if($this->module_info->page_type == 'WIDGET')
			{
				// 위젯 우클릭시 나타나는 메뉴 추가
				Context::addHTMLFooter($this->widgetContextMenu);
			}
		}
		else
		{
			$this->setTemplatePath('./modules/page/tpl/');
		}
	}

	public function dispPageAdminMobileContentModify()
	{
		parent::init();
		parent::dispPageAdminMobileContentModify();

		$oEasyxeModel = getModel('easyxe');
		$easyxe_config = $oEasyxeModel->getEasyxeConfig();

		if($easyxe_config->enabled == 'Y')
		{
			$this->setTemplatePath('./modules/easyxe/tpl/_extends/page');

			// 위젯 우클릭시 나타나는 메뉴 추가
			Context::addHTMLFooter($this->widgetContextMenu);
		}
		else
		{
			$this->setTemplatePath('./modules/page/tpl/');
		}
	}

	public function dispPageAdminPageAdditionSetup()
	{
		return parent::dispPageAdminPageAdditionSetup();
	}

	public function dispPageAdminGrantInfo()
	{
		return parent::dispPageAdminGrantInfo();
	}

	/** 
	 * EasyXE 설정
	 */
	public function dispEasyxeAdminSetting()
	{
		$oEasyxeModel = getModel('easyxe');
		$config = $oEasyxeModel->getEasyxeConfig();

		$oMemberModel = getModel('member');
		$group_list = $oMemberModel->getGroups(0);

		Context::set('config', $config);
		Context::set('group_list', $group_list);

		$oSecurity = new Security();
		$oSecurity->encodeHTML('group_list.');

		$this->setTemplatePath($this->module_path . 'tpl');
		$this->setTemplateFile('setting');
	}

	/** 
	 * 메뉴 편집기
	 */
	public function dispEasyxeAdminMenuTree()
	{
		// menuAdminModel 객체 생성
		$oMenuAdminModel = getAdminModel('menu');

		// 선택한 메뉴
		$menu_srl = Context::get('menu_srl');

		// 메뉴 정보를 구함
		$menu_info = $oMenuAdminModel->getMenu($menu_srl);

		if(!$menu_srl)
		{
			// mennuAdminController 객체 생성
			$oMenuAdminController = getAdminController('menu');

			// 시작 페이지가 있는 메뉴의 캐시 파일을 가져옴
			$homeMenuCacheFile = $oMenuAdminController->getHomeMenuCacheFile();

			if(file_exists($homeMenuCacheFile))
			{
				@include($homeMenuCacheFile);
			}
			$menu_info->php_file = './files/cache/menu/'.$homeMenuSrl.'.php';
		}

		if(file_exists($menu_info->php_file)) @include($menu_info->php_file);
		if(is_array($menu->list))
		{
			foreach($menu->list as $menu_item)
			{
				$this->straightenMenu($menu_item, 0);
			}
		}

		Context::set('menu_item_list', $this->result);

		$this->setTemplatePath($this->module_path . 'tpl');
		$this->setTemplateFile('menu');
	}

	public function dispEasyxeAdminCurrentPageDesign()
	{
		$oLayoutModel = getModel('layout');
		$layout_list = $oLayoutModel->getLayoutList(0);

		Context::set('layout_list', $layout_list);

		$this->setTemplatePath($this->module_path . 'tpl');
		$this->setTemplateFile('currentPageDesign');
	}

	/**
	 * 페이지 소스 보기
	 */
	public function dispEasyxeAdminViewPageSource()
	{
		$this->setLayoutPath('./common/tpl/');
		$this->setLayoutFile('popup_layout');

		$module_info = Context::get('module_info');
		if($module_info->module != 'page')
		{
			return new Object(-1, '사용할 수 없는 기능입니다.');
		}

		if($module_info->page_type != 'OUTSIDE')
		{
			return new Object(-1, '사용할 수 없는 기능입니다.');
		}

		if(!$module_info->path)
		{
			return new Object(-1, '외부 파일 경로를 입력한 뒤에 다시 시도해주세요.');
		}

		$page_content = htmlspecialchars(FileHandler::readFile($module_info->path));

		Context::set('page_source', $page_content);

		$this->setTemplatePath($this->module_path . 'tpl');
		$this->setTemplateFile('viewPageSource');
	}

	/**
	 * 모바일 페이지 소스 보기
	 */
	public function dispEasyxeAdminViewMobilePageSource()
	{
		$this->setLayoutPath('./common/tpl/');
		$this->setLayoutFile('popup_layout');

		$module_info = Context::get('module_info');
		if($module_info->module != 'page')
		{
			return new Object(-1, '사용할 수 없는 기능입니다.');
		}

		if($module_info->page_type != 'OUTSIDE')
		{
			return new Object(-1, '사용할 수 없는 기능입니다.');
		}

		if(!$module_info->mpath)
		{
			return new Object(-1, '외부 파일 경로를 입력한 뒤에 다시 시도해주세요.');
		}

		$page_content = htmlspecialchars(FileHandler::readFile($module_info->mpath));

		Context::set('page_source', $page_content);

		$this->setTemplatePath($this->module_path . 'tpl');
		$this->setTemplateFile('viewPageSource');
	}

	public function dispEasyxeAdminMemberActivity()
	{
		$args = new stdClass;
		$args->sort_index = 'total';
		$args->order_type = 'desc';
		$output = executeQueryArray('easyxe.getLoginRank', $args);

		Context::set('login_rank_list', $output->data);

		$this->setTemplatePath($this->module_path . 'tpl');
		$this->setTemplateFile('member_activity');
	}

	/**
	 * 인증 내역
	 */
	public function dispEasyxeAdminPageAuthorizeLog()
	{
		$this->setTemplatePath('./modules/easyxe/tpl/_extends/page');

		$args = new stdClass;
		$args->sort_index = 'auth_srl';
		$args->order_type = 'desc';
		$args->page = Context::get('page');
		$output = executeQueryArray('easyxe.getPageAuthorizeLog', $args);

		Context::set('log_list', $output->data);
		Context::set('page', $output->page);
		Context::set('page_navigation', $output->page_navigation);

		$this->setTemplateFile('page_authorize_log');
	}

	/**
	 * 레이아웃 일괄 변경
	 */
	public function dispEasyxeAdminChangeModuleLayout()
	{
		$type = Context::get('type');
		if(!in_array($type, array('P', 'M')))
		{
			$type = 'P';
		}

		$oLayoutModel = getModel('layout');
		$layout_list = $oLayoutModel->getLayoutList(0, $type);

		Context::set('layout_list', $layout_list);
		Context::set('type', $type);

		$this->setTemplatePath($this->module_path . 'tpl');
		$this->setTemplateFile('changeModuleLayout');
	}

	/**
	 * @brief Widget's code generator
	 */
	function dispEasyxeAdminGenerateCodeInPage()
	{
		$oWidgetModel = &getModel('widget');
		$widget_list = $oWidgetModel->getDownloadedWidgetList();
		Context::set('widget_list',$widget_list);

		// When there is no widget is selected in the first widget
		$selected_widget = Context::get('selected_widget');
		if(!$selected_widget) $selected_widget = $widget_list[0]->widget;

		$widget_info = $oWidgetModel->getWidgetInfo($selected_widget);
		Context::set('widget_info', $widget_info);
		Context::set('selected_widget', $selected_widget);

		$oModuleModel = &getModel('module');
		// Get a list of module categories
		$module_categories = $oModuleModel->getModuleCategories();
		// Get a mid list
		$site_module_info = Context::get('site_module_info');
		$args = new stdClass();
		$args->site_srl = $site_module_info->site_srl;
		$columnList = array('module_srl', 'module_category_srl', 'browser_title', 'mid');
		$mid_list = $oModuleModel->getMidList($args, $columnList);

		// Get a list of groups
		$oMemberModel = &getModel('member');
		$group_list = $oMemberModel->getGroups($site_module_info->site_srl);
		Context::set('group_list', $group_list);
		// module_category and module combination
		if($module_categories)
		{
			foreach($mid_list as $module_srl => $module) {
				$module_categories[$module->module_category_srl]->list[$module_srl] = $module;
			}
		}
		else
		{
			$module_categories[0] = new stdClass();
			$module_categories[0]->list = $mid_list;
		}

		Context::set('mid_list',$module_categories);
		// Menu Get a list
		$output = executeQueryArray('menu.getMenus');
		Context::set('menu_list',$output->data);
		// Wanted information on skin
		$skin_list = $oModuleModel->getSkins($widget_info->path);
		Context::set('skin_list', $skin_list);

		$this->setLayoutFile('default_layout');
		$this->setTemplatePath($this->module_path . 'tpl');
		$this->setTemplateFile('widget_generate_code_in_page');
	}
}