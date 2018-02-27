<?php
   
	if(!defined("__ZBXE__")) exit();
    if($this->module == 'admin') return;

    if($called_position=='after_module_proc') 
	{
		$act = Context::get('act');
		$document_srl=Context::get('target_srl');
		$oDocumentModel = &getModel('document');
		$oDocument = $oDocumentModel->getDocument($document_srl);
	
     
		if($act=='procDocumentVoteDown' && $oDocument->mid!=$addon_info->move_blame_bbs &&  $addon_info->move_blame_bbs!="" && $addon_info->blame_count!="" && ($oDocument->get('blamed_count') == -1*$addon_info->blame_count+1 ))
		{			
			$document_srl_list[0]=$document_srl;       
			$oModule = &getModel('module');
	  	 	$temp_module= $oModule->getModuleSrlByMid($addon_info->move_blame_bbs); 
	  		$module_srl=$temp_module[0];  		
			$oDocumentAdminController = &getAdminController('document');
			$oDocumentAdminController->CopyDocumentModule($document_srl_list, $module_srl, null);
			$oDocumentController = &getController('document');
			$oDocumentController->deleteDocument($document_srl);
 
			$output = new Object(-1, '게시물의 비추천수가 많아 이동되었습니다.');
       		return;
		}
		else if($act=='procDocumentVoteUp' && $oDocument->mid!=$addon_info->move_vote_bbs && $addon_info->move_vote_bbs!="" && $addon_info->vote_count!="" && ($oDocument->get('voted_count') == $addon_info->vote_count-1)) 
		{
			$document_srl_list[0]=$document_srl;       
			$oModule = &getModel('module');
	  	 	$temp_module= $oModule->getModuleSrlByMid($addon_info->move_vote_bbs); 
	  		$module_srl=$temp_module[0];  		
			$oDocumentAdminController = &getAdminController('document');
			if($addon_info->c_or_m=="copy")
				$oDocumentAdminController->copyDocumentModule($document_srl_list, $module_srl, null);
			else
				$oDocumentAdminController->moveDocumentModule($document_srl_list, $module_srl, null);
		}
	} 
 	
?>
