<?php
    /**
	 * @file	rssboard.controller.php
     * @class 	rssboardController
     * @author	ChoiHeeChul, KimJinHwan, ParkSunYoung
     * @brief 	rssboard Controller
     **/

require_once('./modules/rssboard/simplepie.inc');


class rssboardController extends rssboard {
	
	
    /**
     * @brief 초기화 / 게시글 작성을 위한 관리자 정보를 저장
    **/	
    function init() {
		$oMemberModel = &getModel('member');
		$this->admin_info = $oMemberModel->getMemberInfoByUserID('admin');		
    }
	
    /**
     * @brief rss 업데이트 대상 목록을 가져와서 각각 업데이트
     **/
    function doCrawl() {

		$output = executeQueryArray('rssboard.getRssboardAll');	
	
		// 실패시 처리
		if(!$output->toBool()) return $output;
		
		foreach ($output->data as $val) {
			$this->doUpdateRss($val);
		}
		
		return new Object(0,'success');
		}
		
		/**
		 * @brief 각 개별 RSS 를 업데이트
		 **/
		function doUpdateRss($rssboard)
		{
		if( !isset($rssboard) || !isset($rssboard->rssurl) )
			return ;
	
		// 최종 업데이트 기준일 가져오기
		$last_updatedate = 0;
		if( $rssboard->updatedate!=0 )
		{
			$last_updatedate = $this->getRegdateTime($rssboard->updatedate);
			
			// 최종 업데이트 시간이 10분 이내면 무시
			if( time() < ($last_updatedate + 600) )
				return ;
		}
		
		// document module의 controller 객체 생성
		$oDocumentController = &getController('document');	
		
		// 현재 시간을 업데이트 시간으로 설정
		$updatetime = date('YmdHis');
					
		// SimplePie Library 를 이용해 RSS 가져오기		
		$feed = new SimplePie();
		$feed->force_feed();
		$feed->set_feed_url($rssboard->rssurl);
		$feed->enable_cache(false);
		$feed->init();
		$items = $feed->get_items();
		
		$link = $rssboard->rssurl;
			
		// 최종 업데이트 일 이후에 작성된 글을 대상 게시판에 추가
		foreach(array_reverse($items,true) as $item)
		{
			if ($last_updatedate > $item->get_date('U') )
			continue;
			$obj = null;
			$obj->title = htmlspecialchars_decode($item->get_title());
			
			// item link 를 가져오지 못할 경우 불가피하게 RSS 주소 사용
			if($item->get_link())
			$link = $item->get_link();
			
			$obj->content =  $item->get_description() . "<br/><br/><br/> 원문출처 : <a href='" . $item->get_link() . "' target='_blank'>" . $item->get_link() . "</a>";
			$obj->module_srl = $rssboard->module_srl;
			$obj->member_srl = $this->admin_info->member_srl;
			$obj->user_id =  $this->admin_info->user_id;
			$obj->user_name =  $this->admin_info->user_name;
			$obj->nick_name =  $this->admin_info->nick_name;
			$obj->email_address =  $this->admin_info->email_address;
			$obj->regdate = $item->get_date('YmdHis');
			$obj->category_srl = $rssboard->category_srl;
			$obj->allow_comment = 'Y';
	
			$output=$oDocumentController->insertDocument($obj,true);
		}
		
		// 최종 업데이트 시간 저장
		$args = null;
		$args->updatetime = $updatetime;
		$args->rssboard_srl = $rssboard->rssboard_srl;
		$output = executeQuery('rssboard.updateRssboardDate',$args);
    }
	
    /**
    * @brief DB에 저장된 시간을 unixtimestamp 로 변환 /n
    * document.item.php 에서 차용
    */
    function getRegdateTime($regdate) {
        $year = substr($regdate,0,4);
        $month = substr($regdate,4,2);
        $day = substr($regdate,6,2);
        $hour = substr($regdate,8,2);
        $min = substr($regdate,10,2);
        $sec = substr($regdate,12,2);
        return mktime($hour,$min,$sec,$month,$day,$year);
    }
}
?>
