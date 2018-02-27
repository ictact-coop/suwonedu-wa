var $j = jQuery.noConflict();
var size1 = true;
var size2 = true;
var size3 = true;
var size4 = true;

$j(document).ready(function () {
    
    placeholderReplace();
  
});


function selectMenu() {
    var $menu_select = $j("<div class='select'><ul></ul></div>");
    $j("<span>&nbsp;</span>").prependTo($menu_select);
    $menu_select.appendTo(".selectnav");
    if ($j(".main_nav2").hasClass('drop_down')) {
        $j(".main_nav2 ul li a").each(function () {
            var menu_url = $j(this).attr("href");
            var menu_text = $j(this).text();
            if ($j(this).parents("ul").length == 2) {
                menu_text = "&nbsp;&nbsp;&nbsp;" + menu_text
            }
            if ($j(this).parents("li").length == 2) {
                if (!$j(this).parents("li").hasClass('sl')) {
                    menu_text = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + menu_text
                }
            }
            var li = $j("<li />");
            var link = $j("<a />", {
                    "href": menu_url,
                    "html": menu_text
                }).appendTo(li);
            li.appendTo($menu_select.find('ul'))
        })
    } else if ($j(".main_nav2").hasClass('drop_down2')) {
        $j(".main_nav2 ul li a").each(function () {
            var menu_url = $j(this).attr("href");
            var menu_text = $j(this).text();
            if ($j(this).parents("li").length == 2) {
                menu_text = "&nbsp;&nbsp;&nbsp;" + menu_text
            }
            if ($j(this).parents("li").length == 3) {
                menu_text = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + menu_text
            }
            if ($j(this).parents("li").length > 3) {
                menu_text = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + menu_text
            }
            var li = $j("<li />");
            var link = $j("<a />", {
                    "href": menu_url,
                    "html": menu_text
                }).appendTo(li);
            li.appendTo($menu_select.find('ul'))
        })
    } else if ($j(".main_nav2").hasClass('drop_down3')) {
       
    }
    $j(".select span").click(function () {
        if ($j(".select ul").is(":visible")) {
            $j(".select ul").slideUp()
        } else {
            $j(".select ul").slideDown()
        }
    });
    $j(".selectnav ul li a").click(function () {
        $j(".select ul").slideUp()
    })
}
function placeholderReplace() {
    $j('[placeholder]').focus(function () {
        var input = $j(this);
        if (input.val() == input.attr('placeholder')) {
            if (this.originalType) {
                this.type = this.originalType;
                delete this.originalType
            }
            input.val('');
            input.removeClass('placeholder')
        }
    }).blur(function () {
        var input = $j(this);
        if (input.val() == '') {
            if (this.type == 'password') {
                this.originalType = this.type;
                this.type         = 'text'
            }
            input.addClass('placeholder');
            input.val(input.attr('placeholder'))
        }
    }).blur();
    $j('[placeholder]').parents('form').submit(function () {
        $j(this).find('[placeholder]').each(function () {
            var input = $j(this);
            if (input.val() == input.attr('placeholder')) {
                input.val('')
            }
        })
    })
}








