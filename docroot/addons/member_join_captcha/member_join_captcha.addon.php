<?php
    if(!defined("__ZBXE__")) exit();

    /**
     * @file member_join_captcha.addon.php
     * @author k2man (k2mani@gmail.com)
     * @brief 회원 자동 가입 방지
	 * captcha library  http://www.phpcaptcha.org - Securimage2.0.1BETA 
     **/

    if($called_position == 'before_module_init'){

		if (Context::get('act')=='procMemberInsert'){
			if(!$_SESSION['captcha_result']){
				$this->error = "msg_not_permitted";
			}

		} else if (Context::get('act') =='MemberJoinCaptchaAgree'){

            $obj = Context::getRequestVars();

			require_once ("./addons/member_join_captcha/securimage/securimage.php");
			$img = new Securimage();
			$_SESSION['captcha_result'] = $img->check($obj->captcha_string);

			header("Content-Type: text/xml; charset=UTF-8");
			header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
			header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
			header("Cache-Control: no-store, no-cache, must-revalidate");
			header("Cache-Control: post-check=0, pre-check=0", false);
			header("Pragma: no-cache");
			print("<response>\r\n<error>0</error>\r\n<message>success</message>\r\n</response>");

			Context::close();
			exit();
		}

	} elseif ($called_position == 'after_module_proc') {

		if (Context::get('act') == "dispMemberSignUpForm"){

			if (!$_SESSION['captcha_result']){

				Context::loadLang(_XE_PATH_.'addons/member_join_captcha/lang');
				Context::set('captcha_result',$_SESSION['captcha_result']);
				Context::addJsFile('./addons/member_join_captcha/member_join_captcha.js',false);
				$addon_tpl_path = './addons/member_join_captcha/tpl';
				$addon_tpl_file = 'captcha.html';
				
				$this->setTemplatePath($addon_tpl_path);
				$this->setTemplateFile($addon_tpl_file);

			} 
		} 
	}
?>
