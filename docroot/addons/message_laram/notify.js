jQuery(function($){
window.xeLevelNotifyMessage = function(text,url){
    var $bar;
    $bar = $('div.message.info');
    if(!$bar.length) {
        $bar = $('<div class="message info" />')
            .hide()
            .prependTo(document.body);
    }
//  text = text.replace('%d', count);
    h = $bar.html('<p><a href="' + url +'">'+text+'</a></p>').height();
    $bar.slideDown(600).animate({top:0});
    // hide after 10 seconds
    setTimeout(function(){
        $bar.slideUp();
    }, 10000);
};
xeLevelNotifyMessage(message,messageurl);
});
