<?php
	function checkRecentItems($module_name=null, $addon_info=null, $module_type=null)
	{
		$prefix = trim($addon_info->r_trolley_id);

		// array 체크 후 불필요한것 삭제
		if($_COOKIE[$prefix.'Recent_item']) 
		{
			$prev_cookie = explode(',',$_COOKIE[$prefix.'Recent_item']);
			// 비어있는 array 삭제
			foreach($prev_cookie as $k => $v)
			{
				if(!$v)
				{
					$present_cookie = array_pop($document_srl_array);
					SetCookie($prefix.'Recent_item', $present_cookie, 30*24*60*60+time(), '/');
				}
			}
		}
		else setCookie($prefix.'Recent_item', '');

		// nstore 일 때 상품 클릭시 쿠키 셋업
		if(Context::get('document_srl'))
		{
			$document_srl_get = Context::get('document_srl');  // document_srl을 가져온다 
			$item_name = Context::get('item_name');
		
			if(!$_COOKIE[$prefix.'Recent_item'])
			{
				SetCookie($prefix.'Recent_item', $document_srl_get, 30*24*60*60+time(), '/'); // Cookie['document_srl']이 없을때
			}

			if($_COOKIE[$prefix.'Recent_item'] && $document_srl_get) // Cookie가 있을때
			{
				$srl_count = explode(',',$_COOKIE[$prefix.'Recent_item']); //string을 array로
				$compare = strstr($_COOKIE[$prefix.'Recent_item'], $document_srl_get); //document_srl_get과 쿠키가 중복되는지 확인

				// 중복시
				if($compare && $document_srl_get)
				{
					$srl_count = explode(',',$_COOKIE[$prefix.'Recent_item']); //string을 array로
					$document_srl_get_array = array( 0 => $document_srl_get);
					$diff_srl = array_diff($srl_count, $document_srl_get_array);;
					//array_shift($srl_count);  //array 의 첫번째를 빼준다.
					array_push($diff_srl,$document_srl_get); //array 의 마지막에 넣는다
					$document_srl = implode(',',$diff_srl);
					SetCookie($prefix.'Recent_item', $document_srl, 30*24*60*60+time(), '/');
				}
				// 비중복시
				else if(!$compare && $document_srl_get)
				{
					if(count($srl_count) < 13)  //Cookie의 array가 13개 이하일때 
					{
						$document_srl = $_COOKIE[$prefix.'Recent_item'];
						$document_srl = $document_srl.','.$document_srl_get;
						SetCookie($prefix.'Recent_item', $document_srl, 30*24*60*60+time(), '/');
					}
					else //Cookie의 array가 12개 이상일때
					{
						array_shift($srl_count);  //array 의 첫번째를 빼준다.
						array_push($srl_count,$document_srl_get); //array 의 마지막에 넣는다
						$document_srl = implode(',',$srl_count);
						SetCookie($prefix.'Recent_item', $document_srl, 30*24*60*60+time(), '/');
					}
				}
			}
		}
	}

	function setRecentView($addon_info)
	{
		$prefix = trim($addon_info->r_trolley_id);

		Context::set('addon_info', $addon_info);
		Context::set('r_prefix', $prefix);

		$mid = Context::get('mid');
	}
?>
