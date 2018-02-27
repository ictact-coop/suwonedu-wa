<?php
    if(!defined("__ZBXE__")) exit();
 
    /**
     * @outimage.addon.php
     * @author 카르마(http://www.wildgreen.co.kr)
     *
     **/
 
    $oDocumentModel = &getModel('document');
 
    $act_arr = array('dispBoardContent','dispBodexContent','dispTextyle','dispBodexContentView','dispBoardContentView');
    $document_act = array('dispBoardContent','procBoardInsertDocument','procBodexInsertDocument');
    $comment_act = array('procBoardInsertComment','procBodexInsertComment');
     
    $ri_avoid_domain = explode(',', $addon_info->ri_avoid_domain);
    array_push($ri_avoid_domain,$_SERVER['HTTP_HOST']);
    require_once('./addons/auto_outimage/auto_outimage.func.php');
 
    if($addon_info->ri_permanent_get =='Y') {
        if($called_position == 'after_module_proc' && in_array($this->act,$document_act) ) {
            $var = $this->variables;
            $document_srl = Context::get('document_srl');;
            if(!$document_srl) return;
            $module_info = $oModuleModel->getModuleInfoByDocumentSrl($document_srl);
            $args->document_srl = $document_srl;
            $output =  executeQuery('document.getDocument', $args);
            $content = $output->data->content;
            //$oDocument = $oDocumentModel->getDocument($document_srl);
            //$content = $oDocument->getContent(false,false,false,false);
            $upload_target_srl = $document_srl;
            $oFileController = &getController('file');
 
            $contImg = extractImage($content);
            if(count($contImg)) {
                $replace = $content;
                foreach($contImg as $src) {
                    $ri_localfile = geRitLocalFile($src,$ri_avoid_domain,'N');
                    if(strcmp($src,$ri_localfile)==true)
                    {
                        $url = parse_url($ri_localfile);
                        $path_parts = pathinfo($url['path']);
                        $file_info['name']=$path_parts['basename'];
                        $file_info['tmp_name']=$ri_localfile;
                        $file_obj = $oFileController->insertFile($file_info,$module_info->module_srl,$upload_target_srl,0,true);
                        if(@$file_obj->variables['uploaded_filename']!=null) $replace = str_replace($src,$file_obj->variables['uploaded_filename'],$replace);
                        @unlink($ri_localfile);
                    }
                }
                $obj->module_srl = $module_info->module_srl;
                $obj->content = $replace;
                $obj->document_srl = $document_srl;
                executeQuery('addons.auto_outimage.updateDocument', $obj);
            }
        } elseif($addon_info->ri_comment_get != 'N' && $called_position == 'after_module_proc' && in_array($this->act,$comment_act)) {
            $var = $this->variables;
            $document_srl = $var[document_srl];
            $module_info = $oModuleModel->getModuleInfoByDocumentSrl($document_srl);
            $comment_srl = $var[comment_srl];
            if(!$comment_srl) return;
            $oCommentModel = &getModel('comment');
            $comment = $oCommentModel->getComment($comment_srl);
            $content = $comment->getContent(false,false,false,false);
             
            $upload_target_srl = $comment_srl;
            $oFileController = &getController('file');
 
            $contImg = extractImage($content);
            if(count($contImg)) {
                foreach($contImg as $src) {
                    $ri_localfile = geRitLocalFile($src,$ri_avoid_domain,'N');
                    if(strcmp($src,$ri_localfile)==true)
                    {
                        $url = parse_url($ri_localfile);
                        $path_parts = pathinfo($url['path']);
                        $file_info['name']=$path_parts['basename'];
                        $file_info['tmp_name']=$ri_localfile;
                        $file_obj = $oFileController->insertFile($file_info,$module_info->module_srl,$upload_target_srl,0,true);
                        if(@$file_obj->variables['uploaded_filename']!=null) $replace = str_replace($src,$file_obj->variables['uploaded_filename'],$replace);
                        @unlink($ri_localfile);
                    }
                }
                $obj->module_srl = $module_info->module_srl;
                $obj->content = $content;
                $obj->comment_srl = $comment_srl;
                $output = executeQuery('addons.auto_outimage.updateComment', $obj);
            }
        }
    } else {
     
    $document_srl = Context::get('document_srl');
    if(!$document_srl) return;
    $current_module_info = Context::get('current_module_info');
     
    $oView = &getView($current_module_info->module);
    $act = $oView->act;
     
    if($_COOKIE['mobile'] || in_array($act,$act_arr) && $called_position == 'before_display_content') {
         
        $oDocument = $oDocumentModel->getDocument($document_srl);
        $content = $oDocument->getContent(false,false,false,false);
        $_comment_list = $oDocument->getComments();
 
        $contImg = extractImage($content);
        if(count($contImg)) {
            $replace = $content;
            foreach($contImg as $src) {
                $ri_localfile = geRitLocalFile($src,$ri_avoid_domain,$addon_info->ri_permanent_get);
                $replace = str_replace($src,$ri_localfile,$replace);
            }
            $output = str_replace($content,$replace,$output);
        }
 
        if($addon_info->ri_comment_get == 'Y' && $oDocument->getCommentCount()) {
            $pattern_comments_area = '/<div class="comment_[0-9]+_[0-9]+ xe_content">(.*?)<!--AfterComment\([0-9]+,[0-9]+\)-->/is';
            preg_match_all($pattern_comments_area, $output,$match);
            if(!count($match[0])) return;
            foreach ($match[0] as $comment) {
                $list = extractImage($comment);
                if(count($list)) {
                    $repcom = $comment;
                    foreach($list as $rfile) {
                        $ri_localfile = geRitLocalFile($rfile,$ri_avoid_domain,$addon_info->ri_permanent_get);
                        $repcom = str_replace($rfile,$ri_localfile,$repcom);
                    }
                    $output = str_replace($comment,$repcom,$output);
                }
            }
 
        }
    }
    }
?>