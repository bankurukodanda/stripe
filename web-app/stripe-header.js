(function (global, undefined) {
    "use strict";
    var document = global.document,
        StripeHeader;
    
    /** Checking Jquery presence if it not available lodding it start */
    if(!window.jQuery)
    {
    var script = document.createElement('script');
    script.type = "text/javascript";
    script.src = "http://code.jquery.com/jquery-1.9.1.js";
    document.getElementsByTagName('head')[0].appendChild(script);
    } 
    /** Checking Jquery presence if it not available lodding it end */

    StripeHeader= function(){
        var _stripeHeader = {};
        _stripeHeader = {
            set : function(menuList){
                this.buildHeader(menuList);
                this.addListeners();
            },
            addListeners: function(){
                $(".menu").mouseover(function() {
                    $(this).find(".sub-menu-list").show();
                });
                $(".menu").mouseleave(function() {
                    $(this).find(".sub-menu-list").hide();
                });
                $("#menu-bar").mouseleave(function(){
                    if($(document).width() <= 767){
                        $("#menu-bar").hide();
                        $(".mobile-nav-close-icon").hide();
                        $(".mobile-nav-icon").show();
                    }
                })
                $(".sub-menu").click(function (e){
                    e.preventDefault();
                    $(this).parent().hide();
                    if($(document).width() <= 767){
                        $("#menu-bar").hide();
                        $(".mobile-nav-close-icon").hide();
                        $(".mobile-nav-icon").show();
                    }
                })
                
                $("body").click(function(e){ 
                    if(e.target.classList.contains("mobile-nav-icon")){
                        $("#menu-bar").show();
                        $(".mobile-nav-close-icon").show();
                        $(".mobile-nav-icon").hide();
                    } else if(!e.target.classList.contains("menu")){
                        $('#menu-bar').hide();
                        $(".mobile-nav-close-icon").hide();
                        $(".mobile-nav-icon").show();
                    }
                });
                $(".mobile-nav-icon").click(function(e){
                    $("#menu-bar").show();
                    $(".mobile-nav-close-icon").show();
                    $(this).hide();
                })


            },
            buildHeader: function(menuList){
                var menus = "";
                for(var menu in menuList){
                    var subMenuList = menuList[menu];
                    var subMenus = "";
                    for(var submenu in subMenuList){
                        var submenuLink =subMenuList[submenu].link ? subMenuList[submenu].link: "#";
                        subMenus = subMenus + '<li class="sub-menu"><a href="'+ submenuLink +'"><div class="sub-menu-title">'+ subMenuList[submenu].title +'</div><div class="sub-menu-desc">'+subMenuList[submenu]["sub-title"]+'</div></a></li>'
                    }
                    if(subMenuList.length){
                        var subMenuBar = '<ul class="sub-menu-list">'+subMenus+'</ul>';
                    }
                    menus = menus + '<li class="menu">'+ menu + subMenuBar+'</li>';
                }
                $("body").prepend('<ul id="menu-bar">'+menus+'</ul>');
                $("body").prepend('<i class="fa fa-times mobile-nav-close-icon"></i>');
                $("body").prepend('<i class="fa fa-align-justify mobile-nav-icon"></i>');
            }
            
        }
        return{
            set : function(menuList){_stripeHeader.set(menuList)}
        }
    }
    if( typeof global.stripeHeader === "undefined"){
        global.stripeHeader = new StripeHeader();
    }
}(this));