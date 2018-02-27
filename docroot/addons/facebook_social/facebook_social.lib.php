<?php

function add_facebook_social($matches)
{
    $oDocumentModel =& getModel('document');
    $oDocument = $oDocumentModel->getDocument($matches[1]);
    $before = '<iframe src="http://www.facebook.com/widgets/like.php?href='.$oDocument->getPermanentUrl().'" scrolling="no" frameborder="0" allowTransparency=£¢true£¢ style="border:none; width:450px; height:80px"></iframe>';
    return $before.$matches[0];
}

?>
