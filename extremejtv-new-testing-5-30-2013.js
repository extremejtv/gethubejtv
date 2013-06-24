//timer();

ExtremeJtvEngine = function()
   {var has_chat = false;
    var has_body = false;
    var ddebug = 
    {log: function(string)
       {if (window.console && console.log)
           {
           console.log("Extreme Debug: " + string);
           }
       }
   , warn: function(string)
       {if (window.console && console.warn)
           {
           console.warn("Extreme Debug: " + string);
           }
       }
   , error: function(string)
       {if (window.console && console.error)
           {
           console.error("Extreme Debug: " + string);
           }
       }
   , info: function(string)
       {if (window.console && console.info)
           {console.info("Extreme Debug: " + string);
           }
       }
   };
   
    function replaceAll(str, s1, s2)
       {return str.split(s1).join(s2);
       }
   
    function stripslashes(str)
       {str = str.replace(/\\'/g, '\'');
        str = str.replace(/\\"/g, '"');
        str = str.replace(/\\0/g, '\0');
        str = str.replace(/\\\\/g, '\\');
        return str;
       }
   
    function ejtvbhook(hooklist)
       {var results = {};
        for (key in hooklist)
           {var search = hooklist[key];
            var found = $$(search);
            if (found.length === 0)
               {ddebug.error("Couldn't find " + search);
                return null;
               }
            results[key] = found[0];
           }
        ddebug.log("EJTVHOOK SEARCH COMPLETE EXTREME LOADED");
        return results;
       }
   
    function ejtvclearout()
       {ddebug.log("Running clearout ad blocker and blocking all ads.");
        var removefooter = ! ( ! $('live_site_player_flash'));
        var clearlist =["#related_channels",".tabs.bottom","#footer", "#taboola-div",".abgc",".managed_ad", "#FrontPageMedRectv2", "#fp_ad", "#ad",".ad_300x250", "#FPTakeoverHeaderv2", 
          "#FPTakeoverHeaderv2_holder", "#FPTakeoverSkinv2_holder", "#FPTakeoverHeaderV3_holder", "#psAdsUrlGetter", "#ad_iframe", "#footer_search", 
          "#footer_columns_container",".footer_ad", "#frontpage_takeover_banner", "#iphone_banner", "#things_todo", "#fp-categories", "#portal_headlines", "#search_tags",
          ".fp-section_desc",".home_action_separator", "#home_actions_less", "#home-new_gifts", "#callout", "#advanced_callout", "#go_pro_link", 
          "#HomePageMedRect_holder", "#producer_spotlight_holder", "#app_spotlight", "#next_live_channel", "#admin_nxtchan", "#channel_header", "#broadcast_banner", "#dvr", 
          "#channel_lists",".firstcolor_header",".channel_info", "#channel_schedule_container", "#top_fans_container", "#channel_gifts_container", 
          "#chat_gifts", "#fp-new_gifts",".hint",".meebo-215", "#meeboFlashMovie0", "#meebo-canvas-35", "#meebo-canvas-29.meebo-26", 
          "m.meebo-67.meebo-73.meebo-75.meebo-332.meebo-333", "#meebo-69", "#meebo-68", "#meebo-canvas-33.meebo-26", "m.meebo-22.meebo-27.meebo-328", "#meebo.cim.sharePageButton.meebo-22.meebo-27", 
          "m#meebo-canvas-16.meebo-26", "m#meebo-canvas-34.meebo-26", "#svg.meebo-0", "m#meebo-canvas-34.meebo-70", "m.meebo-23.meebo-31", 
          "#webkit-user-select", "#header_notification"];
        clearlist.each(function(search)
           {if (search === '')
               {return;
               }
            if (search == "footer_columns_container" && ! removefooter)
               {return;
               }
            var found = $$(search);
            found.each(function(obj)
               {obj.remove();
               });
           });
        var search = $('header_site_search');
        if (search)
           {search.style.visibility = "visible";
           }
       }
   
    function embedclearout()
       {var clearlist =["#chat_menu_buttons",".chat_thumb"];
        clearlist.each(function(search)
           {if (search === '')
               {return;
               }
            var found = $$(search);
            found.each(function(obj)
               {obj.remove();
               });
           });
       }
   
    function ejtvchat_resize()
       {var chatboxheight = 450;
        var hooks = ejtvbhook( {chat_lines: '#chat_lines', right_col: '#right_col', jtv_chat: '#jtv_chat', chat_text_input: '#chat_text_input', chat_container: '#chat_container', 
          wrapper:'.wrapper'});
        if ( ! hooks)
           {return;
           }
        hooks['chat_lines'].style.height = (chatboxheight - 140) + "px";
        hooks['right_col'].style.width = "460px";
        hooks['jtv_chat'].style.height = chatboxheight + "px";
        hooks['chat_text_input'].style.width = "95%";
        hooks['chat_text_input'].style.marginLeft = "0px";
        hooks['chat_container'].style.marginBottom = "0px";
        hooks['chat_container'].style.marginTop = "0px";
        hooks['wrapper'].style.width = "1100px";
        hooks['chat_lines'].style.maxHeight = "";
       }
   
    function ejtvchat_moderator()
       {if ( ! window.Chat)
           {return;
           }
        if ( ! popout_chat)
           {return;
           }
        if (CurrentChat.set_mod_icons_visible)
           {CurrentChat.set_mod_icons_visible(true);
           }
        PP.channel_hide_chat_links = false;
        toggle_chat_settings_menu2 = toggle_chat_settings_menu;
       
        toggle_chat_settings_menu = function()
           {
               {if (CurrentChat && CurrentChat.show_timestamps)
                   {var checkbox = $('toggle_chat_timestamps');
                    if (checkbox)
                       {checkbox.checked = true;
                       }
                   }
               }
               {var checkbox = $('mod_icons');
                if (checkbox)
                   {checkbox.checked = ($('chat_lines').className.indexOf("nobuttons") == - 1);
                   }
               }
            toggle_chat_settings_menu2();
           };
        Chat.prototype.debug = true;
        Chat.prototype.insert_chat_line2 = Chat.prototype.insert_chat_line;
       
        Chat.prototype.insert_chat_line = function(info)
           {if (info.tagtype == "broadcaster")
               {info.tagname = "H";
               }
            if (info.tagtype == "staff")
               {info.tagtype = "admin";
                info.tagname = "S";
               }
            if (info.tagtype == "admin")
               {info.tagtype = "staff";
                info.tagname = "A";
               }
            if (info.tagtype == "mod")
               {info.tagtype = "bot";
                info.tagname = "M";
               }
            if (info.tagtype == "pro")
               {info.tagtype = "pro";
                info.tagname = "P";
               }
            if (info.tagtype == "greeter")
               {info.tagtype = "greeter";
                info.tagname = "G";
               }
            var tagoption = document.getElementById("tagoption");
            if (tagoption.value == "enable")
               {if (info.nickname == "dezzertv")
                   {info.tagtype = "staff";
                    info.tagname = "ᶠᶸᶜᵏᵧₒᵤ";
                    info.nickname = "<Dezz style=\"color:black;\">Dezz</span>";
                   }
                //if (info.nickname == "sethee")
                //   {info.tagtype = "broadcaster";
                //    info.tagname = "Admin";
                //   info.nickname = "<font style='color: black;'>Seth</font>";
                //   }

            if (info.nickname == "sethee")
               {$$('#chat_line_list .chat_from_sethee .chat_line').each(function(message){message.innerHTML = "<b><span style=\"color: #000000\">" + message.innerHTML + "</span></b>";
                   });
               }
            if(info.nickname=="sethee"){if(info.tagtype=="bot"||info.tagtype=="mod"||info.tagtype=="broadcaster"){info.tagtype="sethee"; info.tagname="E"; info.nickname="<font style='color: black;'>Seth</font>";}}

                if (info.nickname == "sethz")
                   {info.tagtype = "mod";
                    info.tagname = "B";
                    info.nickname = "<font style='color: black;'>Bot</font>";
                   }
                if (info.nickname == "sample")
                   {info.tagtype = "user";
                    info.tagname = "<img src='http://24.media.tumblr.com/tumblr_mb3696BDT31rxvudho1_500.jpg' height='27' width='35'>";
                    info.nickname = "Sample";
                   }
                if (info.nickname == "dezz__")
                   {info.tagtype = "staff";
                    info.tagname = "ᶠᶸᶜᵏᵧₒᵤ";
                    info.nickname = "<font color='black'>Dezz</font>";
                   }
               }
            if (info.chat_type == "twitter")
               {info.nickname = "TW-" + info.nickname;
               }
            if (info.chat_type == "facebook")
               {info.nickname = "FB-" + info.nickname;
               }
            if (info.chat_type == "myspace")
               {info.nickname = "MS-" + info.nickname;
               }
            this.insert_chat_line2(info);
           };
        Chat.prototype.emoticonize2 = Chat.prototype.emoticonize;
       
        Chat.prototype.emoticonize = function(msg)
           {msg = this.emoticonize2(msg);
            msg = ejtvsmilize(msg);
setTimeout("setupZoom();", 100);
            return msg;
           };
       
        CurrentChat.handlers.clear_chat = function(info)
           {if (info.target == "all")
               {CurrentChat.admin_message("Chat was cleared by a mod!");
               }
            else if (info.target == "user")
               {var nickname = CurrentChat.real_username(info.user);
                $$('#chat_line_list .chat_from_' + info.user.replace( /%/g, '_').replace(/[<>,]/g, '') + ' .chat_line').each(function(message)
                   {message.innerHTML = "<span style=\"color: #FF0040\">" + message.innerHTML + "</span>";
                   });
                this.admin_message(nickname + " was purged! ");
               }
           };
        var settingsbox = document.getElementById("chat_settings_dropmenu");
        if (settingsbox)
           {settingsbox.style.top = "auto";
           }
       }
   
    function ExtremeJtvbox()
       {var settingsmenu = document.getElementById("chat_help");
        if ( ! settingsmenu)
           {return;
           }
        settingsmenu = settingsmenu.parentNode;
        if ( ! settingsmenu)
           {return;
           }
        var ExtremeJtvdiv = document.createElement("div");
        ExtremeJtvdiv.setAttribute("align", "left");
        ExtremeJtvdiv.style.margin = "0px auto";
        ExtremeJtvdiv.innerHTML = 
          '<ul class="dropmenu_col inline_all"> <li id="chat_section_chatroom" class="dropmenu_section"> <h3 class="dropmenu_section_title">ExtremeJTV</h3> <li class="radio_box" style="width: 200px;"> <input checked="" type="checkbox" value="enable" class="left" id="imgoption" onchange="this.checked ? this.setAttribute(\'value\',\'enable\') : this.setAttribute(\'value\',\'disable\')" style="vertical-align: middle;"> <label for="imgoption" style="vertical-align: middle;"> [img][/img] Command</label> <li class="radio_box" style="width: 200px;"> <input checked="" type="checkbox" value="enable" class="left" id="vidoption" onchange="this.checked ? this.setAttribute(\'value\',\'enable\') : this.setAttribute(\'value\',\'disable\')" style="vertical-align: middle;"> <label for="vidoption" style="vertical-align: middle;"> [vid][/vid] Command</label> <li class="radio_box" style="width: 200px;"> <input checked="" type="checkbox" value="enable" class="left" id="tagoption" onchange="this.checked ? this.setAttribute(\'value\',\'enable\') : this.setAttribute(\'value\',\'disable\')" style="vertical-align: middle;"> <label for="tagoption" style="vertical-align: middle;"> Custom User Tags </label> <li class="radio_box" style="width: 200px;"> <input checked="" type="checkbox" value="enable" class="left" id="emoteoption" onchange="this.checked ? this.setAttribute(\'value\',\'enable\') : this.setAttribute(\'value\',\'disable\')" style="vertical-align: middle;"> <label for="emoteoption" style="vertical-align: middle;"> Custom Chat Emoticons </label> <a></a> <button onclick="document.location.reload(true)" class="pretty_button spacer small"><span class="main">Refresh Chat</span></button> <button onclick="extremejtv_action(\'clear\');" class="pretty_button spacer small"><span class="main">Clear My Chat</span></button> <button id="trans" onclick="bjtv_action(\'trans\');" class="pretty_button spacer small"><span class="main">Enable Translucent Chat</span></buttion> <button id="darken" onclick="bjtv_action(\'dark\'); bjtv_action(\'notrans\');" class="pretty_button spacer small"><span class="main">Darken Chat Window</span></button> <button onclick="extremejtv_action(\'adark\');" class="pretty_button spacer small"><span class="main">Darken Background</span></button> <button onclick="extremejtv_action(\'light\');" class="pretty_button spacer small"><span class="main">Lighten Background</span></button> <button onclick="extremejtv_action(\'version\');" class="pretty_button spacer small"><span class="main">Version Check</span></button> </li> </li></li></li></ul> ';
        settingsmenu.appendChild(ExtremeJtvdiv);
       }
   
    function ejtvsmilize(message)
       {var imgoption = document.getElementById("imgoption");
        var emoteoption = document.getElementById("emoteoption");
        var vidoption = document.getElementById("vidoption");
        if (message.search( "/img") != - 1)
           {if (message.search("imageurl") == - 1)
               {if (imgoption.value == "enable")
                   {for (j = 0;j <= message.length;j++)
                       {for (i = 1;i <= message.length;i++)
                           {var text1 = message.split("[img]")[i];
                            if (text1)
                               {var text1_2 = text1.split("[/img]")[0];
                                if (text1_2)
                                   {var img = text1_2.substring(text1_2.search('href') + 6, text1_2.search('target') - 2);
                                   }
                                message = replaceAll(message,"[img]" + text1_2 +"[/img]", "<a href='" + img + "'>" + "<img src='" + img + 
                                  "' alt='ZoomPicture' title='Click picture to view!' style='max-height:150px; max-width:150px; vertical-align:bottom;'>" + "</a>");
                               }
                           }
                       }
                   }
               }
           }
        if (message.search( "/vid") != - 1)
           {if (message.search("imageurl") == - 1)
               {if (vidoption.value == "enable")
                   {for (j = 0;j <= message.length;j++)
                       {for (i = 1;i <= message.length;i++)
                           {var text1 = message.split("[vid]")[i];
                            if (text1)
                               {var text1_2 = text1.split("[/vid]")[0];
                                if (text1_2)
                                   {var vid = text1_2.substring(text1_2.search('href') + 6, text1_2.search('target') - 2);
                                   }
                                message = replaceAll(message,"[vid]" + text1_2 +"[/vid]", "<video src='" + vid + 
                                  "' alt='ZoomVideo' title='Click play to watch this video!' controls='controls' style='max-height:200px; max-width:200px; vertical-align:bottom;'>");
                               }
                           }
                       }
                   }
               }
           }
        if (emoteoption.value == "enable")
           {message = replaceAll(message,":jtvdev:", "<a href='http://www.jtvdev.com' target=_blank>extremejtv</a>");
            message = replaceAll(message,":extremejtv:", 
              "<a href='http://m-net.arbornet.org/~lotw' target=_blank>extremejtv</a>");
            message = replaceAll(message,":message:", 
              "<a href='http://www.justin.tv/message/compose?to=sethee' target=_blank><button class='pretty_button spacer small'><span class='main'>Mail Seth</span></button></a>");
            message = replaceAll(message,":emote:", 
              "<a href='http://m-net.arbornet.org/~lotw/emotes.html' target=_blank><button class='pretty_button spacer small'><span class='main'>Emote List</span></button></a>");
            message = replaceAll(message,":website:", 
              "<a href='http://m-net.arbornet.org/~lotw' target=_blank><button class='pretty_button spacer small'><span class='main'>JTVDEV Website</span></button></a>");
            message = replaceAll(message,":news:", 
              "<a href='http://m-net.arbornet.org/~lotw/changelog.php' target=_blank><button class='pretty_button spacer small'><span class='main'>Click for News!</span></button></a>");//message = replaceAll(message, "google", "<b><font style='color: blue;'>G</font><font style='color: red;'>o</font><font style='color: gold;'>o</font><font style='color: blue;'>g</font><font style='color: green;'>l</font><font style='color: red;'>e</font></b>");
              //message = replaceAll(message, "Google", "<b><font style='color: blue;'>G</font><font style='color: red;'>o</font><font style='color: gold;'>o</font><font style='color: blue;'>g</font><font style='color: green;'>l</font><font style='color: red;'>e</font></b>");
            message = replaceAll(message,":tf:", "<img src='http://m-net.arbornet.org/~lotw/emotes/t.png'>");
            message = replaceAll(message,":qrcode:", "<img src='http://m-net.arbornet.org/~lotw/emotes/qrcode.png'>");
            message = replaceAll(message, "=Z", "<img src='http://m-net.arbornet.org/~lotw/jtv/bored.gif'>");
            message = replaceAll(message, "B]", "<img src='http://m-net.arbornet.org/~lotw/jtv/cool.gif'>");
            message = replaceAll(message, "(3", "<img src='http://m-net.arbornet.org/~lotw/jtv/horny.gif'>");
            message = replaceAll(message, "<8", "<img src='http://m-net.arbornet.org/~lotw/jtv/horny.gif'>");
            message = replaceAll(message,":ils:", "<img src='http://m-net.arbornet.org/~lotw/emotes/c493.gif'>");
            message = replaceAll(message,":dtd:", "<img src='http://m-net.arbornet.org/~lotw/emotes/fd4r.gif'>");
            message = replaceAll(message,":dg:", "<img src='http://m-net.arbornet.org/~lotw/emotes/dg.gif'>");
            message = replaceAll(message, "R]", "<img src='http://m-net.arbornet.org/~lotw/jtv/pirate.gif'>");
            message = replaceAll(message, "=P", "<img src='http://m-net.arbornet.org/~lotw/jtv/raspberry.gif'>");
            message = replaceAll(message,":P", "<img src='http://m-net.arbornet.org/~lotw/jtv/raspberry.gif'>");
            message = replaceAll(message, "=/", "<img src='http://m-net.arbornet.org/~lotw/jtv/sk.gif'>");
            message = replaceAll(message,":]", "<img src='http://m-net.arbornet.org/~lotw/jtv/happy.gif'>");
            message = replaceAll(message,";]", "<img src='http://m-net.arbornet.org/~lotw/jtv/wink.gif'>");
            message = replaceAll(message,":@", "<img src='http://m-net.arbornet.org/~lotw/emotes/angry.gif'>");
            message = replaceAll(message,":U", "<img src='http://m-net.arbornet.org/~lotw/tags/zedo.png'>");
            message = replaceAll(message, "&gt;D", "<img src='http://m-net.arbornet.org/~lotw/emotes/m.gif'>");
            message = replaceAll(message, "&gt;)", "<img src='http://i.imgur.com/7b54m.gif'>");
            message = replaceAll(message,":B", "<img src='http://m-net.arbornet.org/~lotw/emotes/m.gif'>");
            message = replaceAll(message, "xD", "<img src='http://m-net.arbornet.org/~lotw/emotes/xd.jpg'>");
            message = replaceAll(message,":lovely:", "<img src='http://m-net.arbornet.org/~lotw/emotes/2342.gif'>");
            message = replaceAll(message, "*jtvdev*", "<img src='http://m-net.arbornet.org/~lotw/jtvd.png'>");
            message = replaceAll(message,":nc:", "<img src='http://m-net.arbornet.org/~lotw/emotes/nyancat.gif'>");
            message = replaceAll(message,":bj:", "<img src='http://m-net.arbornet.org/~lotw/emotes/bj.gif'>");
            message = replaceAll(message,":dh:", "<img src='http://m-net.arbornet.org/~lotw/emotes/dick-head.gif'>");
            message = replaceAll(message,":hm:", "<img src='http://m-net.arbornet.org/~lotw/emotes/homoswitch.gif'>");
            message = replaceAll(message,":smash:", "<img src='http://m-net.arbornet.org/~lotw/emotes/smash.gif'>");
            message = replaceAll(message,":nerd:", "<img src='http://m-net.arbornet.org/~lotw/emotes/nerd.gif'>");
            message = replaceAll(message, "D:", "<img src='http://m-net.arbornet.org/~lotw/emotes/sad.gif'>");
            message = replaceAll(message,":cn:", "<img src='http://m-net.arbornet.org/~lotw/emotes/c.png'>");
            message = replaceAll(message,":*", "<img src='http://m-net.arbornet.org/~lotw/emotes/kiss.gif'>");
            message = replaceAll(message, "^^", "<img src='http://m-net.arbornet.org/~lotw/emotes/above.gif'>");
            message = replaceAll(message,":run:", "<img src='http://m-net.arbornet.org/~lotw/emotes/run.gif'>");
            message = replaceAll(message,":hm:", "<img src='http://m-net.arbornet.org/~lotw/emotes/homoswitch.gif'>");
            message = replaceAll(message,":smash:", "<img src='http://m-net.arbornet.org/~lotw/emotes/smash.gif'>");
            message = replaceAll(message,":nerd:", "<img src='http://m-net.arbornet.org/~lotw/emotes/nerd.gif'>");
            message = replaceAll(message,":snorlax:", "<img src='http://m-net.arbornet.org/~lotw/emotes/Snorlax.png'>");
            message = replaceAll(message,":dh:", "<img src='http://m-net.arbornet.org/~lotw/emotes/dick-head.gif'>");
            message = replaceAll(message,":jo:", "<img src='http://m-net.arbornet.org/~lotw/emotes/jackoff.gif'>");
            message = replaceAll(message,":staff:", "<img src='http://m-net.arbornet.org/~lotw/emotes/staff.jpg'>");
            message = replaceAll(message,":admin:", "<img src='http://m-net.arbornet.org/~lotw/emotes/admin.jpg'>");
            message = replaceAll(message,":host:", "<img src='http://m-net.arbornet.org/~lotw/emotes/host.jpg'>");
            message = replaceAll(message,":mod:", "<img src='http://m-net.arbornet.org/~lotw/emotes/mod.jpg'>");
            message = replaceAll(message,":apro:", "<img src='http://m-net.arbornet.org/~lotw/emotes/pro.jpg'>");
            message = replaceAll(message,":bot:", "<img src='http://m-net.arbornet.org/~lotw/emotes/bot.jpg'>");
            message = replaceAll(message,":movies:", "<img src='http://m-net.arbornet.org/~lotw/emotes/movies.gif'>");
            message = replaceAll(message,":smoke:", "<img src='http://m-net.arbornet.org/~lotw/emotes/smoke.gif'>");
            message = replaceAll(message, "Lmao", "<img src='http://m-net.arbornet.org/~lotw/emotes/lmao.gif'>");
            message = replaceAll(message, "Brb", "<img src='http://m-net.arbornet.org/~lotw/emotes/brb.gif'>");
            message = replaceAll(message, "fokoff", "<img src='http://m-net.arbornet.org/~lotw/emotes/fo.gif'>");
            message = replaceAll(message, "HeHe", "<img src='http://m-net.arbornet.org/~lotw/emotes/hehe.gif'>");
            message = replaceAll(message, "Thank You", "<img src='http://m-net.arbornet.org/~lotw/emotes/thankyou.gif'>");
            message = replaceAll(message,":sillyfool:", "<img src='http://m-net.arbornet.org/~lotw/emotes/sillyfool.gif'>");
            message = replaceAll(message,":simba:", "<img src='http://m-net.arbornet.org/~lotw/emotes/simba.gif'>");
            message = replaceAll(message,":smurf:", "<img src='http://m-net.arbornet.org/~lotw/emotes/smurf.gif'>");
            message = replaceAll(message,":taz:", "<img src='http://m-net.arbornet.org/~lotw/emotes/taz.gif'>");
            message = replaceAll(message,":yay:", "<img src='http://m-net.arbornet.org/~lotw/emotes/yay.gif'>");
            message = replaceAll(message,":typehere:", "<img src='http://m-net.arbornet.org/~lotw/emotes/typehere.gif'>");
            message = replaceAll(message, "HELLO", "<img src='http://m-net.arbornet.org/~lotw/emotes/hello.gif'>");
            message = replaceAll(message, "Hello", "<img src='http://m-net.arbornet.org/~lotw/emotes/hello2.gif'>");
            message = replaceAll(message, "Awesome", "<img src='http://m-net.arbornet.org/~lotw/emotes/awesome.gif'>");
            message = replaceAll(message, "ohshit", "<img src='http://m-net.arbornet.org/~lotw/emotes/ohshit.gif'>");
            message = replaceAll(message, "GOOD", "<img src='http://m-net.arbornet.org/~lotw/emotes/good.gif'>");
            message = replaceAll(message, "Hey", "<img src='http://m-net.arbornet.org/~lotw/emotes/hey.gif'>");
            message = replaceAll(message, "miss you", "<img src='http://m-net.arbornet.org/~lotw/emotes/missyou.gif'>");
            message = replaceAll(message, "Smile", "<img src='http://m-net.arbornet.org/~lotw/emotes/smile.gif'>");
            message = replaceAll(message, "Thanks", "<img src='http://m-net.arbornet.org/~lotw/emotes/thanks.gif'>");
            message = replaceAll(message, "LOL", "<img src='http://m-net.arbornet.org/~lotw/emotes/l0l.gif'>");
            message = replaceAll(message, "LoL", "<img src='http://m-net.arbornet.org/~lotw/emotes/lol2.gif'>");
            message = replaceAll(message, "lolo", "<img src='http://m-net.arbornet.org/~lotw/emotes/lol3.gif'>");
            message = replaceAll(message, "DotCom", "<img src='http://m-net.arbornet.org/~lotw/emotes/kim.png'>");
            message = replaceAll(message, "Asl", "<img src='http://m-net.arbornet.org/~lotw/emotes/asl.gif'>");
            message = replaceAll(message, "Yes!", "<img src='http://m-net.arbornet.org/~lotw/emotes/yes.gif'>");
            message = replaceAll(message, "No!", "<img src='http://m-net.arbornet.org/~lotw/emotes/no.gif'>");
            message = replaceAll(message, "Mappa", 
              "<img src='http://m-net.arbornet.org/~lotw/tag/p9aYw.jpg' height='35' width='32'>");
            message = replaceAll(message, "Sorry", "<img src='http://m-net.arbornet.org/~lotw/emotes/sorry.gif'>");
            message = replaceAll(message, "Oops", "<img src='http://m-net.arbornet.org/~lotw/emotes/oops.gif'>");
            message = replaceAll(message, "boobies", "<img src='http://m-net.arbornet.org/~lotw/emotes/boobies.gif'>");
            message = replaceAll(message, "sleepyz", "<img src='http://m-net.arbornet.org/~lotw/emotes/sleepyz.gif'>");
            message = replaceAll(message, "partytime", "<img src='http://m-net.arbornet.org/~lotw/emotes/partytime.gif'>");
            message = replaceAll(message, "Rl)", 
              "<img src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-c2b7132654a19e02-24x18.png'>");
            message = replaceAll(message,":l)", 
              "<img src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-13d54d9e49b593b3-24x18.png'>");
            message = replaceAll(message,":lp", 
              "<img src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-1a3f5d14a3190ef1-24x18.png'>");
            message = replaceAll(message,";lP", 
              "<img src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-912125d7459226cc-24x18.png'>");
            message = replaceAll(message, "Bl)", 
              "<img src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-e073a3348e028b40-24x18.png'>");
            message = replaceAll(message,";l)", 
              "<img src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-aa3dd5587f06bb7b-24x18.png'>");
            message = replaceAll(message, "<l3", 
              "<img src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-67cde8d0b7916e57-24x18.png'>");
            message = replaceAll(message, "Olo", 
              "<img src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-e9218a512e65b0de-24x18.png'>");
            message = replaceAll(message, "Kreygasm", 
              "<img src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-3a624954918104fe-19x27.png'>");
            message = replaceAll(message, "Kappa", 
              "<img src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-ddc6e3a8732cb50f-25x28.png'>");
            message = replaceAll(message, "RedCoat", 
              "<img src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-6b8d1be08f244e92-19x27.png'>");
            message = replaceAll(message, "StoneLightning", 
              "<img src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-8b5aaae6e2409deb-20x27.png'>");
            message = replaceAll(message, "TheRinger", 
              "<img src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-1903cc415afc404c-20x27.png'>");
            message = replaceAll(message, "JKanStyle", 
              "<img src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-3a7ee1bc0e5c9af0-21x27.png'>");
            message = replaceAll(message, "OptimizePrime", 
              "<img src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-41f8a86c4b15b5d8-22x27.png'>");
            message = replaceAll(message, "CougarHunt", 
              "<img src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-551cd64fc3d4590a-21x27.png'>");
            message = replaceAll(message, "EagleEye", 
              "<img src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-95eb8045e7ae63b8-18x27.png'>");
            message = replaceAll(message, "BrokeBack", 
              "<img src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-35ae4e0e8dd045e1-22x27.png'>");
            message = replaceAll(message, "BionicBunion", 
              "<img src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-740242272832a108-30x30.png'>");
            message = replaceAll(message, "PazPazowitz", 
              "<img src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-521420789e1e93ef-18x27.png'>");
            message = replaceAll(message, "SwiftRage", 
              "<img src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-680b6b3887ef0d17-21x28.png'>");
            message = replaceAll(message, "BrainSlug", 
              "<img src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-39f055e707725b5d-18x27.png'>");
            message = replaceAll(message, "DansGame", 
              "<img src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-ce52b18fccf73b29-25x32.png'>");
            message = replaceAll(message, "PJSalt", 
              "<img src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-18be1a297459453f-36x30.png'>");
            message = replaceAll(message, "MVGame", 
              "<img src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-1a1a8bb5cdf6efb9-24x32.png'>");
            message = replaceAll(message, "BCWarrior", 
              "<img src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-1e3ccd969459f889-29x27.png'>");
            message = replaceAll(message, "MrDestructoid", 
              "<img src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-ac61a7aeb52a49d3-39x27.png'>");
            message = replaceAll(message, "PicoMause", 
              "<img src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-ce027387c35fb601-22x27.png'>");
            message = replaceAll(message, "JonCarnage", 
              "<img src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-6aaca644ea5374c6-20x27.png'>");
            message = replaceAll(message, "StrawBeary", 
              "<img src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-3dac9659e838fab2-20x27.png'>");
            message = replaceAll(message, "GingerPower", 
              "<img src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-2febb829eae08b0a-21x27.png'>");
            message = replaceAll(message, "SuperVinlin", 
              "<img src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-92a1b848540e9347-23x27.png'>");
            message = replaceAll(message, "SMOrc", 
              "<img src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-9f276ed33053ec70-32x32.png'>");
            message = replaceAll(message, "FreakinStinkin", 
              "<img src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-d14278fea8fad146-19x27.png'>");
            message = replaceAll(message, "BlargNaut", 
              "<img src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-a5293e92212cadd9-21x27.png'>");
            message = replaceAll(message, "KevinTurtle", 
              "<img src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-d530ef454aa17093-21x27.png'>");
            message = replaceAll(message, "NoNoSpot", 
              "<img src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-179f310b0746584d-23x27.png'>");
            message = replaceAll(message, "SoBayed", 
              "<img src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-58f4782b85d0069f-17x27.png'>");
            message = replaceAll(message, "SSSsss", 
              "<img src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-5d019b356bd38360-24x24.png'>");
            message = replaceAll(message, "PunchTrees", 
              "<img src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-b85003ffba04e03e-24x24.png'>");
            message = replaceAll(message, "UleetBackup", 
              "<img src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-5342e829290d1af0-17x27.png'>");
            message = replaceAll(message, "ArsonNoSexy", 
              "<img src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-e13a8382e40b19c7-18x27.png'>");
            message = replaceAll(message, "TehFunrun", 
              "<img src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-a204e65775b969c5-27x27.png'>");
            message = replaceAll(message, "NinjaTroll", 
              "<img src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-89e474822a976928-19x27.png'>");
            message = replaceAll(message,":jo:", "<img src='http://m-net.arbornet.org/~lotw/emotes/jackoff.gif'>");
            message = replaceAll(message, "watchp0rn", "<img src='http://m-net.arbornet.org/~lotw/emotes/sex_porn.gif'>");
            message = replaceAll(message,":thewave:", "<img src='http://m-net.arbornet.org/~lotw/emotes/thewave.gif'>");
            message = replaceAll(message,":feedtroll:", "<img src='http://m-net.arbornet.org/~lotw/emotes/feedtroll.gif'>");
            message = replaceAll(message,":stupidd:", "<img src='http://m-net.arbornet.org/~lotw/emotes/stupid.gif'>");
            message = replaceAll(message,":faceplant:", "<img src='http://m-net.arbornet.org/~lotw/emotes/faceplant.gif'>");
            message = replaceAll(message,":bananaman:", "<img src='http://m-net.arbornet.org/~lotw/emotes/bananaman.gif'>");
            message = replaceAll(message, "spammer", "<img src='http://m-net.arbornet.org/~lotw/emotes/spam.gif'>");
            message = replaceAll(message,":trollkill:", "<img src='http://m-net.arbornet.org/~lotw/emotes/killatroll.gif'>");
            message = replaceAll(message, "COOL", "<img src='http://m-net.arbornet.org/~lotw/emotes/cool.gif'>");
            message = replaceAll(message,":afro:", "<img src='http://m-net.arbornet.org/~lotw/emotes/afro.gif'>");
            message = replaceAll(message, "ellokitty", "<img src='http://m-net.arbornet.org/~lotw/emotes/hellokitty.gif'>");
            message = replaceAll(message, "yeskitty", "<img src='http://m-net.arbornet.org/~lotw/emotes/yeskitty.gif'>");
            message = replaceAll(message, "nokitty", "<img src='http://m-net.arbornet.org/~lotw/emotes/nokitty.gif'>");
            message = replaceAll(message,":fu:", "<img src='http://m-net.arbornet.org/~lotw/emotes/fu.gif'>");
            message = replaceAll(message,":usexy:", "<img src='http://m-net.arbornet.org/~lotw/emotes/usexy.gif'>");
            message = replaceAll(message,":hb:", "<img src='http://m-net.arbornet.org/~lotw/emotes/birthday.gif'>");
            message = replaceAll(message,":dogrun:", "<img src='http://m-net.arbornet.org/~lotw/emotes/dogrun.gif'>");
            message = replaceAll(message,":rant:", "<img src='http://m-net.arbornet.org/~lotw/emotes/rant.gif'>");
            message = replaceAll(message,":love:", "<img src='http://m-net.arbornet.org/~lotw/emotes/love.gif'>");
            message = replaceAll(message,":banned:", "<img src='http://m-net.arbornet.org/~lotw/emotes/banned.gif'>");
            message = replaceAll(message,":chillpill:", "<img src='http://m-net.arbornet.org/~lotw/emotes/chillpill.gif'>");
            message = replaceAll(message,":ghost:", "<img src='http://m-net.arbornet.org/~lotw/emotes/aghost.gif'>");
            message = replaceAll(message, "(penguin)", "<img src='http://m-net.arbornet.org/~lotw/emotes/n00.gif'>");
            message = replaceAll(message,":blahblah:", "<img src='http://m-net.arbornet.org/~lotw/emotes/blahblah.gif'>");
            message = replaceAll(message,":run:", "<img src='http://m-net.arbornet.org/~lotw/emotes/run.gif'>");
            message = replaceAll(message,":ustupid:", "<img src='http://m-net.arbornet.org/~lotw/emotes/ustupid.gif'>");
            message = replaceAll(message, "Brb", "<img src='http://m-net.arbornet.org/~lotw/emotes/brb.gif'>");
            message = replaceAll(message, "fuckoff", "<img src='http://m-net.arbornet.org/~lotw/emotes/fuckoff.gif'>");
            message = replaceAll(message, "HeHe", "<img src='http://m-net.arbornet.org/~lotw/emotes/hehe.gif'>");
            message = replaceAll(message, "Thank You", "<img src='http://m-net.arbornet.org/~lotw/emotes/thankyou.gif'>");
            message = replaceAll(message,":nanabooboo:", "<img src='http://m-net.arbornet.org/~lotw/emotes/nanaboo.gif'>");
            message = replaceAll(message,":killpuppy:", "<img src='http://m-net.arbornet.org/~lotw/emotes/killpuppy.gif'>");
            message = replaceAll(message,":doit:", "<img src='http://m-net.arbornet.org/~lotw/emotes/doit.gif'>");
            message = replaceAll(message, "(mooning)", "<img src='http://m-net.arbornet.org/~lotw/emotes/mooning.png'>");
            message = replaceAll(message, "rockingkitty", 
              "<img src='http://m-net.arbornet.org/~lotw/emotes/rockingkitty.gif'>");
            message = replaceAll(message,":finger:", "<img src='http://m-net.arbornet.org/~lotw/emotes/finger2.gif'>");
            message = replaceAll(message,":awwmonkey:", "<img src='http://m-net.arbornet.org/~lotw/emotes/awwmonkey.gif'>");
            message = replaceAll(message,":babysmoke:", "<img src='http://m-net.arbornet.org/~lotw/emotes/babysmoke.gif'>");
            message = replaceAll(message,":bananacock:", "<img src='http://m-net.arbornet.org/~lotw/emotes/bananacock.gif'>");
            message = replaceAll(message,":bearweed:", "<img src='http://m-net.arbornet.org/~lotw/emotes/bearweed.gif'>");
            message = replaceAll(message,":bitchslap:", "<img src='http://m-net.arbornet.org/~lotw/emotes/bitchslap.gif'>");
            message = replaceAll(message,":chattergoat:", "<img src='http://m-net.arbornet.org/~lotw/emotes/chattergoat.gif'>");
            message = replaceAll(message,":cheers:", "<img src='http://m-net.arbornet.org/~lotw/emotes/cheers.gif'>");
            message = replaceAll(message,":damntrolls:", "<img src='http://m-net.arbornet.org/~lotw/emotes/damntrolls.gif'>");
            message = replaceAll(message,":dumbfuck:", "<img src='http://m-net.arbornet.org/~lotw/emotes/dumbfuck.gif'>");
            message = replaceAll(message,":eatabanana:", "<img src='http://m-net.arbornet.org/~lotw/emotes/eatabanana.gif'>");
            message = replaceAll(message,":evildevil:", "<img src='http://m-net.arbornet.org/~lotw/emotes/evildevil.gif'>");
            message = replaceAll(message,":evilit:", "<img src='http://m-net.arbornet.org/~lotw/emotes/evilit.gif'>");
            message = replaceAll(message,":atroll:", "<img src='http://m-net.arbornet.org/~lotw/emotes/atroll.gif'>");
            message = replaceAll(message,":givemedrink:", "<img src='http://m-net.arbornet.org/~lotw/emotes/givemebeer.gif'>");
            message = replaceAll(message,":grr:", "<img src='http://m-net.arbornet.org/~lotw/emotes/grr.gif'>");
            message = replaceAll(message,":hereisyourgirlfriend:", 
              "<img src='http://m-net.arbornet.org/~lotw/emotes/hereisyourgirlfriend.gif'>");
            message = replaceAll(message,":iamnaked:", "<img src='http://m-net.arbornet.org/~lotw/emotes/iamnaked.gif'>");
            message = replaceAll(message,":kittygun:", "<img src='http://m-net.arbornet.org/~lotw/emotes/kittygun.gif'>");
            message = replaceAll(message,":kittyplay:", "<img src='http://m-net.arbornet.org/~lotw/emotes/kittyplay.gif'>");
            message = replaceAll(message,":kittyshock:", "<img src='http://m-net.arbornet.org/~lotw/emotes/kittyshock.gif'>");
            message = replaceAll(message,":lolmonkey:", "<img src='http://m-net.arbornet.org/~lotw/emotes/lolmonkey.gif'>");
            message = replaceAll(message,":grrpissy:", "<img src='http://m-net.arbornet.org/~lotw/emotes/pissy.gif'>");
            message = replaceAll(message,":awwpoorbaby:", "<img src='http://m-net.arbornet.org/~lotw/emotes/poorbaby.gif'>");
            message = replaceAll(message,":smokeit:", "<img src='http://m-net.arbornet.org/~lotw/emotes/smokeit.gif'>");
            message = replaceAll(message,":speakenglish:", 
              "<img src='http://m-net.arbornet.org/~lotw/emotes/speakenglish.gif'>");
            message = replaceAll(message,":trollkill2:", "<img src='http://m-net.arbornet.org/~lotw/emotes/trollkill2.gif'>");
            message = replaceAll(message,":wiseman:", "<img src='http://m-net.arbornet.org/~lotw/emotes/wiseman.gif'>");
            message = replaceAll(message,":wtfelmo:", "<img src='http://m-net.arbornet.org/~lotw/emotes/wtfelmo.gif'>");
            message = replaceAll(message,":virus:", 
              "<img src='http://m-net.arbornet.org/~lotw/emotes/v1.gif'><img src='http://m-net.arbornet.org/~lotw/emotes/v2.gif'><img src='http://m-net.arbornet.org/~lotw/emotes/v3.gif'>");
            message = replaceAll(message,":bong:", "<img src='http://m-net.arbornet.org/~lotw/emotes/bong.gif'>");
            message = replaceAll(message, "Bye", "<img src='http://m-net.arbornet.org/~lotw/emotes/bye.gif'>");
            message = replaceAll(message,":fart:", "<img src='http://m-net.arbornet.org/~lotw/emotes/fart.gif'>");
            message = replaceAll(message, "HaHaHa", "<img src='http://m-net.arbornet.org/~lotw/emotes/haha.gif'>");
            message = replaceAll(message,":joint:", "<img src='http://m-net.arbornet.org/~lotw/emotes/joint.gif'>");
            message = replaceAll(message,":jointroll:", "<img src='http://m-net.arbornet.org/~lotw/emotes/jointroll.gif'>");
            message = replaceAll(message,":weewee:", "<img src='http://m-net.arbornet.org/~lotw/emotes/pissonyou.gif'>");
            message = replaceAll(message,":smokepuffpass:", 
              "<img src='http://m-net.arbornet.org/~lotw/emotes/puffpuffpass.gif'>");
            message = replaceAll(message,":troll:", "<img src='http://m-net.arbornet.org/~lotw/emotes/troll.png'>");
            message = replaceAll(message,":trollcat:", "<img src='http://m-net.arbornet.org/~lotw/emotes/trollcat.png'>");
            message = replaceAll(message,":banhammer:", "<img src='http://m-net.arbornet.org/~lotw/emotes/banhammer.png'>");
            message = replaceAll(message,":bopatroll:", "<img src='http://m-net.arbornet.org/~lotw/emotes/bopatroll.gif'>");
            message = replaceAll(message,":bouncewitme:", "<img src='http://m-net.arbornet.org/~lotw/emotes/bouncewitme.gif'>");
            message = replaceAll(message,":brokenheart:", "<img src='http://m-net.arbornet.org/~lotw/emotes/brokenheart.gif'>");
            message = replaceAll(message,":burnbabyburn:", 
              "<img src='http://m-net.arbornet.org/~lotw/emotes/burnbabyburn.gif'>");
            message = replaceAll(message,":butterfly:", "<img src='http://m-net.arbornet.org/~lotw/emotes/butterfly.gif'>");
            message = replaceAll(message,":dapimp:", "<img src='http://m-net.arbornet.org/~lotw/emotes/dapimp.gif'>");
            message = replaceAll(message,":gangbanger:", "<img src='http://m-net.arbornet.org/~lotw/emotes/gangbanger.gif'>");
            message = replaceAll(message,":huh:", "<img src='http://m-net.arbornet.org/~lotw/emotes/huh.gif'>");
            message = replaceAll(message,":ikillyou:", "<img src='http://m-net.arbornet.org/~lotw/emotes/ikillyou.gif'>");
            message = replaceAll(message, "i love you", "<img src='http://m-net.arbornet.org/~lotw/emotes/iloveyou.gif'>");
            message = replaceAll(message, "I love you", "<img src='http://m-net.arbornet.org/~lotw/emotes/iloveyou.gif'>");
            message = replaceAll(message,":kittykitty:", "<img src='http://m-net.arbornet.org/~lotw/emotes/kittykitty.gif'>");
            message = replaceAll(message,":lilpuppy:", "<img src='http://m-net.arbornet.org/~lotw/emotes/lilpuppy.gif'>");
            message = replaceAll(message,":teddy:", "<img src='http://m-net.arbornet.org/~lotw/emotes/teddy.gif'>");
            message = replaceAll(message,":alienlove:", "<img src='http://m-net.arbornet.org/~lotw/emotes/alienlove.gif'>");
            message = replaceAll(message,":babykiss:", "<img src='http://m-net.arbornet.org/~lotw/emotes/babykiss.gif'>");
            message = replaceAll(message,":bunny:", "<img src='http://m-net.arbornet.org/~lotw/emotes/bunny.gif'>");
            message = replaceAll(message,":kittywave:", "<img src='http://m-net.arbornet.org/~lotw/emotes/byekitty.gif'>");
            message = replaceAll(message,":cuddles:", "<img src='http://m-net.arbornet.org/~lotw/emotes/cuddles.gif'>");
            message = replaceAll(message,":dance:", "<img src='http://m-net.arbornet.org/~lotw/emotes/dance.gif'>");
            message = replaceAll(message,":elmo:", "<img src='http://m-net.arbornet.org/~lotw/emotes/elmo.gif'>");
            message = replaceAll(message,":fence:", "<img src='http://m-net.arbornet.org/~lotw/emotes/fence.gif'>");
            message = replaceAll(message,":froggy:", "<img src='http://m-net.arbornet.org/~lotw/emotes/froggy.gif'>");
            message = replaceAll(message,":funny:", "<img src='http://m-net.arbornet.org/~lotw/emotes/funny.gif'>");
            message = replaceAll(message,":geek:", "<img src='http://m-net.arbornet.org/~lotw/emotes/geek.gif'>");
            message = replaceAll(message,":helpwanted:", "<img src='http://m-net.arbornet.org/~lotw/emotes/helpwanted.gif'>");
            message = replaceAll(message,":kittybox:", "<img src='http://m-net.arbornet.org/~lotw/emotes/kittybox.gif'>");
            message = replaceAll(message,":mj:", "<img src='http://m-net.arbornet.org/~lotw/emotes/mj.gif'>");
            message = replaceAll(message,":ntur:", "<img src='http://m-net.arbornet.org/~lotw/emotes/tur.gif'>");
            message = replaceAll(message,":urboring:", "<img src='http://m-net.arbornet.org/~lotw/emotes/suicide.gif'>");
            message = replaceAll(message,":doo:", "<img src='http://m-net.arbornet.org/~lotw/emotes/poo.gif'>");
            message = replaceAll(message,":iperv:", "<img src='http://m-net.arbornet.org/~lotw/emotes/perv.gif'>");
            message = replaceAll(message, "pills", "<img src='http://m-net.arbornet.org/~lotw/emotes/pills.gif'>");
            message = replaceAll(message,":tatas:", "<img src='http://m-net.arbornet.org/~lotw/emotes/tatas.gif'>");
            message = replaceAll(message,":mrpenis:", "<img src='http://m-net.arbornet.org/~lotw/emotes/mrpenis.gif'>");
            message = replaceAll(message,":asperm:", "<img src='http://m-net.arbornet.org/~lotw/emotes/asperm.gif'>");
            message = replaceAll(message,":slappy:", "<img src='http://m-net.arbornet.org/~lotw/emotes/slappy.gif'>");
            message = replaceAll(message,":ilovesex:", "<img src='http://m-net.arbornet.org/~lotw/emotes/ilovesex.gif'>");
            message = replaceAll(message,":shakeit:", "<img src='http://m-net.arbornet.org/~lotw/emotes/shakeit.gif'>");
            message = replaceAll(message,":apuppylicks:", "<img src='http://m-net.arbornet.org/~lotw/emotes/puppylicks.gif'>");
            message = replaceAll(message,":ghostkisses:", "<img src='http://m-net.arbornet.org/~lotw/emotes/ghostkisses.gif'>");
            message = replaceAll(message,":spreadlove:", "<img src='http://m-net.arbornet.org/~lotw/emotes/spreadlove.gif'>");
            message = replaceAll(message, "drunk", "<img src='http://m-net.arbornet.org/~lotw/emotes/drunk.gif'>");
            message = replaceAll(message, "coffee", "<img src='http://m-net.arbornet.org/~lotw/emotes/coffee.gif'>");
            message = replaceAll(message, "beer", "<img src='http://m-net.arbornet.org/~lotw/emotes/beer.gif'>");
            message = replaceAll(message,":andshewaslike:", "<img src='http://m-net.arbornet.org/~lotw/emotes/andshewaslike.gif'>");
            message = replaceAll(message, "money", "<img src='http://m-net.arbornet.org/~lotw/emotes/money.gif'>");
            message = replaceAll(message, "=[", "<img src='http://m-net.arbornet.org/~lotw/emotes/sethface.gif'>");
            message = replaceAll(message,":bubblegum:", "<img src='http://m-net.arbornet.org/~lotw/emotes/bubblegum.gif'>");
            message = replaceAll(message,":muah:", "<img src='http://m-net.arbornet.org/~lotw/emotes/muah.gif'>");
            message = replaceAll(message,":happyfeet:", "<img src='http://m-net.arbornet.org/~lotw/emotes/happyfeet.gif'>");
            message = replaceAll(message,":flower:", "<img src='http://m-net.arbornet.org/~lotw/emotes/flower.gif'>");
            message = replaceAll(message,":batman:", "<img src='http://m-net.arbornet.org/~lotw/emotes/batman.gif'>");
            message = replaceAll(message, "(puke)", "<img src='http://m-net.arbornet.org/~lotw/emotes/sick.gif'>");
            message = replaceAll(message,":rosey:", "<img src='http://m-net.arbornet.org/~lotw/emotes/rosey.gif'>");
            message = replaceAll(message,":wuv:", "<img src='http://m-net.arbornet.org/~lotw/emotes/wuv.gif'>");
            message = replaceAll(message,":!:", "<img src='http://m-net.arbornet.org/~lotw/emotes/!.gif'>");
            message = replaceAll(message,":sheepfok:", "<img src='http://m-net.arbornet.org/~lotw/emotes/sleepfok.gif'>");
            message = replaceAll(message,":fap:", "<img src='http://m-net.arbornet.org/~lotw/emotes/wanker.gif'>");
            message = replaceAll(message,":erect:", "<img src='http://m-net.arbornet.org/~lotw/emotes/erect.gif'>");
            message = replaceAll(message,":blowme:", "<img src='http://m-net.arbornet.org/~lotw/emotes/blowme.gif'>");
            message = replaceAll(message,":ghostiemeenie:", 
              "<img src='http://m-net.arbornet.org/~lotw/emotes/ghostiemeenie.gif'>");
            message = replaceAll(message,":iloveghostie:", 
              "<img src='http://m-net.arbornet.org/~lotw/emotes/iloveghostie.gif'>");
            message = replaceAll(message,":ilovemeenie:", "<img src='http://m-net.arbornet.org/~lotw/emotes/ilovemeenie.gif'>");
            message = replaceAll(message,":bish:", "<img src='http://m-net.arbornet.org/~lotw/emotes/bish.gif'>");
            message = replaceAll(message, "foxx_", "<img src='http://m-net.arbornet.org/~lotw/emotes/foxx.png'>");
            message = replaceAll(message, "Foxx_", "<img src='http://m-net.arbornet.org/~lotw/emotes/foxx.jpg'>");
            message = replaceAll(message,":superhippy:", "<img src='http://m-net.arbornet.org/~lotw/emotes/superhero.jpg'>");
            message = replaceAll(message, "o_0", "<img src='http://m-net.arbornet.org/~lotw/emotes/drunkmonkey.gif'>");
            message = replaceAll(message, "o_O", "<img src='http://m-net.arbornet.org/~lotw/emotes/drunkmonkey.gif'>");
            message = replaceAll(message,":iamsorry:", "<img src='http://m-net.arbornet.org/~lotw/emotes/iamsorry.gif'>");
            message = replaceAll(message,":luvyou:", "<img src='http://m-net.arbornet.org/~lotw/emotes/luvyou.gif'>");
            message = replaceAll(message,":missu:", "<img src='http://m-net.arbornet.org/~lotw/emotes/missu.gif'>");
            message = replaceAll(message,":working:", "<img src='http://m-net.arbornet.org/~lotw/emotes/working.gif'>");
            message = replaceAll(message, "powerpuffs", "<img src='http://m-net.arbornet.org/~lotw/emotes/powerpuffs.gif'>");
            message = replaceAll(message,":failtroll:", "<img src='http://m-net.arbornet.org/~lotw/emotes/failtroll.gif'>");
            message = replaceAll(message,":fatfail:", "<img src='http://m-net.arbornet.org/~lotw/emotes/fatfail.gif'>");
            message = replaceAll(message,":flyvideo:", "<img src='http://m-net.arbornet.org/~lotw/emotes/flyvideo.gif'>");
            message = replaceAll(message,":foreplay:", "<img src='http://m-net.arbornet.org/~lotw/emotes/foreplay.gif'>");
            message = replaceAll(message,":life:", "<img src='http://m-net.arbornet.org/~lotw/emotes/life.gif'>");
            message = replaceAll(message,":neo:", "<img src='http://m-net.arbornet.org/~lotw/emotes/neo.gif'>");
            message = replaceAll(message,":ragequit:", "<img src='http://m-net.arbornet.org/~lotw/emotes/ragequit.gif'>");
            message = replaceAll(message,":supbish:", "<img src='http://m-net.arbornet.org/~lotw/emotes/supbish.gif'>");
            message = replaceAll(message,":getp3nis:", "<img src='http://m-net.arbornet.org/~lotw/emotes/penis.gif'>");
            message = replaceAll(message,":goodkitty:", "<img src='http://m-net.arbornet.org/~lotw/emotes/goodkitty.gif'>");
            message = replaceAll(message,":hb:", "<img src='http://m-net.arbornet.org/~lotw/emotes/heartbroken.gif'>");
            message = replaceAll(message,":bh2:", "<img src='http://m-net.arbornet.org/~lotw/emotes/brokenheart2.gif'>");
            message = replaceAll(message,":bh3:", "<img src='http://m-net.arbornet.org/~lotw/emotes/brokenhearted.gif'>");
            message = replaceAll(message,":ignore:", "<img src='http://m-net.arbornet.org/~lotw/emotes/ignore.gif'>");
            message = replaceAll(message,":jelly:", "<img src='http://m-net.arbornet.org/~lotw/emotes/jelly.gif'>");
            message = replaceAll(message,":hoho:", "<img src='http://m-net.arbornet.org/~lotw/emotes/jtvhoho.png'>");
            message = replaceAll(message,":kissme:", "<img src='http://m-net.arbornet.org/~lotw/emotes/kissme.gif'>");
            message = replaceAll(message,":1lollol:", "<img src='http://m-net.arbornet.org/~lotw/emotes/lollol.gif'>");
            message = replaceAll(message, "ninja", "<img src='http://m-net.arbornet.org/~lotw/emotes/ninja.gif'>");
            message = replaceAll(message, "noob", "<img src='http://m-net.arbornet.org/~lotw/emotes/noob.gif'>");
            message = replaceAll(message,":1old:", "<img src='http://m-net.arbornet.org/~lotw/emotes/old.gif'>");
            message = replaceAll(message,":btool:", "<img src='http://m-net.arbornet.org/~lotw/emotes/btool3.gif'>");
            message = replaceAll(message,":2omg:", "<img src='http://m-net.arbornet.org/~lotw/emotes/omg2.gif'>");
            message = replaceAll(message,":1pourdrink:", "<img src='http://m-net.arbornet.org/~lotw/emotes/pourbeer.gif'>");
            message = replaceAll(message, "(r)", "<img src='http://m-net.arbornet.org/~lotw/emotes/r.gif'>");
            message = replaceAll(message,":smack:", "<img src='http://m-net.arbornet.org/~lotw/emotes/smack.gif'>");
            message = replaceAll(message,":spank:", "<img src='http://m-net.arbornet.org/~lotw/emotes/spank.gif'>");
            message = replaceAll(message,":splat:", "<img src='http://m-net.arbornet.org/~lotw/emotes/splat.gif'>");
            message = replaceAll(message,":swallow:", "<img src='http://m-net.arbornet.org/~lotw/emotes/swallow.gif'>");
            message = replaceAll(message, "teabag", "<img src='http://m-net.arbornet.org/~lotw/emotes/teabag.gif'>");
            message = replaceAll(message, "hotkarl", "<img src='http://m-net.arbornet.org/~lotw/emotes/hotkarl.gif'>");
            message = replaceAll(message, "dirtysanchez", 
              "<img src='http://m-net.arbornet.org/~lotw/emotes/dirtysanchez.gif'>");
            message = replaceAll(message, "goldenshower", 
              "<img src='http://m-net.arbornet.org/~lotw/emotes/goldenshower.gif'>");
            message = replaceAll(message,":teasekitty:", "<img src='http://m-net.arbornet.org/~lotw/emotes/teasekitty.gif'>");
            message = replaceAll(message,":yeasure:", "<img src='http://m-net.arbornet.org/~lotw/emotes/yeasure.gif'>");
            message = replaceAll(message, "america", "<img src='http://m-net.arbornet.org/~lotw/emotes/america.gif'>");
            message = replaceAll(message,":fault:", "<img src='http://m-net.arbornet.org/~lotw/emotes/fault.gif'>");
            message = replaceAll(message,":hitman:", "<img src='http://m-net.arbornet.org/~lotw/emotes/hitman.gif'>");
            message = replaceAll(message, "scotland", "<img src='http://m-net.arbornet.org/~lotw/emotes/scotland.jpg'>");
            message = replaceAll(message,":blush:", "<img src='http://m-net.arbornet.org/~lotw/emotes/blush.gif'>");
            message = replaceAll(message,":dmca:", "<img src='http://m-net.arbornet.org/~lotw/emotes/dmca.gif'>");
            message = replaceAll(message,":failwhale:", "<img src='http://m-net.arbornet.org/~lotw/emotes/failwhale.png'>");
            message = replaceAll(message,":frenchkiss:", "<img src='http://m-net.arbornet.org/~lotw/emotes/frenchkiss.gif'>");
            message = replaceAll(message,":girly:", "<img src='http://m-net.arbornet.org/~lotw/emotes/girl.gif'>");
            message = replaceAll(message,":awesomes:", "<img src='http://m-net.arbornet.org/~lotw/emotes/awesomeseth.gif'>");
            message = replaceAll(message,":lovehippy:", "<img src='http://m-net.arbornet.org/~lotw/emotes/lovehippy.gif'>");
            message = replaceAll(message,":tro0phere:", "<img src='http://m-net.arbornet.org/~lotw/emotes/tro0p.gif'>");
            message = replaceAll(message,":wtfbishes:", "<img src='http://m-net.arbornet.org/~lotw/emotes/wtfbishes.gif'>");
            message = replaceAll(message,":now:", "<img src='http://m-net.arbornet.org/~lotw/emotes/now.png'>");
            message = replaceAll(message,":lilly:", "<img src='http://m-net.arbornet.org/~lotw/emotes/lilly.gif'>");
            message = replaceAll(message,":next:", "<img src='http://m-net.arbornet.org/~lotw/emotes/next.png'>");
            message = replaceAll(message,":lotuslove:", "<img src='http://m-net.arbornet.org/~lotw/emotes/lotuslove.gif'>");
            message = replaceAll(message,":foolkiller:", "<img src='http://m-net.arbornet.org/~lotw/emotes/foolkiller.gif'>");
            message = replaceAll(message,":extreme:", "<img src='http://m-net.arbornet.org/~lotw/emotes/foolkiller2.gif'>");
            message = replaceAll(message, "#yup#", 
              "<img src='http://images3.wikia.nocookie.net/__cb20080713124004/evchk/images/f/fa/Agree1.gif' style='vertical-align:top;'>");
            message = replaceAll(message, "#ng#", 
              "<img src='http://images1.wikia.nocookie.net/__cb20080713124411/evchk/images/c/cd/Donno.gif' style='vertical-align:top;'>");
            message = replaceAll(message, "#hehe#", 
              "<img src='http://images3.wikia.nocookie.net/__cb20080713124553/evchk/images/9/94/Hehe.gif' style='vertical-align:top;'>");
            message = replaceAll(message, "#love#", 
              "<img src='http://images4.wikia.nocookie.net/__cb20080713124740/evchk/images/5/51/Love.gif' style='vertical-align:top;'>");
            message = replaceAll(message, "#oh#", 
              "<img src='http://images2.wikia.nocookie.net/__cb20080713124919/evchk/images/7/7b/Surprise.gif' style='vertical-align:top;'>");
            message = replaceAll(message, "#cn#", 
              "<img src='http://images1.wikia.nocookie.net/__cb20080713131042/evchk/images/a/a0/Chicken.gif' style='vertical-align:top;'>");
            message = replaceAll(message, "#a ss#", 
              "<img src='http://images1.wikia.nocookie.net/__cb20080713124105/evchk/images/f/fd/Ass.gif' style='vertical-align:top;'>");
            message = replaceAll(message, "#fire#", 
              "<img src='http://images1.wikia.nocookie.net/__cb20080713124439/evchk/images/7/78/Fire1.gif' style='vertical-align:top;'>");
            message = replaceAll(message, "#good#", 
              "<img src='http://images3.wikia.nocookie.net/__cb20080713124537/evchk/images/5/5d/Good.gif' style='vertical-align:top;'>");
            message = replaceAll(message, "#good2#", 
              "<img src='http://forum6.hkgolden.com/faces/ThumbUp.gif' style='vertical-align:top;'>");
            message = replaceAll(message, "#bad#", 
              "<img src='http://forum6.hkgolden.com/faces/ThumbDown.gif' style='vertical-align:top;'>");
            message = replaceAll(message, "#hoho#", 
              "<img src='http://images1.wikia.nocookie.net/__cb20080713124605/evchk/images/c/c3/Hoho.gif' style='vertical-align:top;'>");
            message = replaceAll(message, "#kill#", 
              "<img src='http://images3.wikia.nocookie.net/__cb20080713124619/evchk/images/9/9f/Kill.gif' style='vertical-align:top;'>");
            message = replaceAll(message, "#kill2#", 
              "<img src='http://images2.wikia.nocookie.net/__cb20080713124648/evchk/images/a/ab/Kill2.gif' style='vertical-align:top;'>");
            message = replaceAll(message, "#bye#", 
              "<img src='http://images2.wikia.nocookie.net/__cb20080713124231/evchk/images/e/e2/Bye.gif' style='vertical-align:top;'>");
            message = replaceAll(message, "z_z", 
              "<img src='http://images2.wikia.nocookie.net/__cb20080713125036/evchk/images/2/2c/Z.gif' style='vertical-align:top;'>");
            message = replaceAll(message, "Z_Z", 
              "<img src='http://images2.wikia.nocookie.net/__cb20080713125036/evchk/images/2/2c/Z.gif' style='vertical-align:top;'>");
            message = replaceAll(message, "@_@", 
              "<img src='http://images4.wikia.nocookie.net/__cb20080713123825/evchk/images/8/8c/%40.gif' style='vertical-align:top;'>");
            message = replaceAll(message, "#adore#", 
              "<img src='http://images4.wikia.nocookie.net/__cb20080713123917/evchk/images/9/92/Adore.gif' style='vertical-align:top;'>");
            message = replaceAll(message, "#no#", 
              "<img src='http://images4.wikia.nocookie.net/__cb20080713124751/evchk/images/b/bd/No.gif' style='vertical-align:top;'>");
            message = replaceAll(message, "???", 
              "<img src='http://images3.wikia.nocookie.net/__cb20080713125011/evchk/images/e/e3/Wonder2.gif' style='vertical-align:top;'>");
            message = replaceAll(message,"[fuc k]", 
              "<img src='http://images4.wikia.nocookie.net/__cb20080713124520/evchk/images/f/fb/Fuck.gif' style='vertical-align:top;'>");
            message = replaceAll(message,"[banghead]", 
              "<img src='http://images2.wikia.nocookie.net/__cb20060327092722/evchk/images/6/65/Banghead.gif' style='vertical-align:top;'>");
            message = replaceAll(message,"[bouncer]", 
              "<img src='http://images2.wikia.nocookie.net/__cb20080713124203/evchk/images/2/2e/Bouncer.gif' style='vertical-align:top;'>");
            message = replaceAll(message,"[bouncy]", 
              "<img src='http://images4.wikia.nocookie.net/__cb20080713124217/evchk/images/c/cf/Bouncy.gif' style='vertical-align:top;'>");
            message = replaceAll(message,"[censored]", 
              "<img src='http://images1.wikia.nocookie.net/__cb20080713124245/evchk/images/c/cc/Censored.gif' style='vertical-align:top;'>"); //message = replaceAll(message, "***", "<img src='http://images1.wikia.nocookie.net/__cb20080713124245/evchk/images/c/cc/Censored.gif'>");
            message = replaceAll(message,"[flowerface]", 
              "<img src='http://images2.wikia.nocookie.net/__cb20080713124455/evchk/images/5/52/Flowerface.gif' style='vertical-align:top;'>");
            message = replaceAll(message,"[offtopic]", 
              "<img src='http://images1.wikia.nocookie.net/__cb20080713124802/evchk/images/4/47/Offtopic.gif' style='vertical-align:top;'>");
            message = replaceAll(message,"[shocking]", 
              "<img src='http://images3.wikia.nocookie.net/__cb20080713124841/evchk/images/3/38/Shocking.gif' style='vertical-align:top;'>");
            message = replaceAll(message,"[photo]", 
              "<img src='http://images1.wikia.nocookie.net/__cb20080713124827/evchk/images/8/8e/Photo.gif' style='vertical-align:top;'>");
            message = replaceAll(message,"[sosad]", 
              "<img src='http://images2.wikia.nocookie.net/__cb20060324170818/evchk/images/b/b2/Sosad.gif' style='vertical-align:top;'>");
            message = replaceAll(message,"[yipes]", 
              "<img src='http://images2.wikia.nocookie.net/__cb20080713125021/evchk/images/d/da/Yipes.gif' style='vertical-align:top;'>");
            message = replaceAll(message,"[369]", 
              "<img src='http://images2.wikia.nocookie.net/__cb20061215004441/evchk/images/e/ed/369.gif' style='vertical-align:top;'>");
            message = replaceAll(message,"[bomb]", 
              "<img src='http://images4.wikia.nocookie.net/__cb20080713124146/evchk/images/e/ed/Bomb.gif' style='vertical-align:top;'>");
            message = replaceAll(message,"[slick]", 
              "<img src='http://images2.wikia.nocookie.net/__cb20080713124855/evchk/images/c/c6/Slick.gif' style='vertical-align:top;'>");
            message = replaceAll(message,"[p1]", "<img src='http://i.imgur.com/ix1l0.gif' style='vertical-align:top;'>");
            message = replaceAll(message,"[p2]", "<img src='http://i.imgur.com/3RkEx.gif' style='vertical-align:top;'>");
            message = replaceAll(message,"[p3]", "<img src='http://i.imgur.com/SwZO4.gif' style='vertical-align:top;'>");
            message = replaceAll(message,"[p4]", "<img src='http://i.imgur.com/pKkhC.gif' style='vertical-align:top;'>");
            message = replaceAll(message,"[p5]", 
              "<img src='http://wiki.pokemonpl.net/images/2/2d/025mini.gif' style='vertical-align:top;'>");
            message = replaceAll(message,"[p6]", "<img src='http://i.imgur.com/CpP3A.gif' style='vertical-align:top;'>");
            message = replaceAll(message,"[p7]", "<img src='http://i.imgur.com/3PqvE.gif' style='vertical-align:top;'>");
            message = replaceAll(message,"[byecry]", 
              "<img src='http://m-net.arbornet.org/~lotw/emotes/byecry.gif' style='vertical-align:top;'>");
            message = replaceAll(message,"[byesad]", 
              "<img src='http://m-net.arbornet.org/~lotw/emotes/byesad.gif' style='vertical-align:top;'>");
            message = replaceAll(message,"[small]", 
              "<img src='http://m-net.arbornet.org/~lotw/emotes/small.gif' style='vertical-align:top;'>");
            message = replaceAll(message,"[dogrun]", 
              "<img src='http://m-net.arbornet.org/~lotw/emotes/dogrun.gif' height=32 style='vertical-align:top;'>");
            message = replaceAll(message,"[bitchplease]", 
              "<img src='http://m-net.arbornet.org/~lotw/emotes/bitchplease.png' height=50 style='vertical-align:top;'>");
            message = replaceAll(message,"[foreveralone]", 
              "<img src='http://m-net.arbornet.org/~lotw/emotes/foreveralone.png' height=50 style='vertical-align:top;'>");
            message = replaceAll(message,"[yuno]", 
              "<img src='http://m-net.arbornet.org/~lotw/emotes/yuno.png' height=50 style='vertical-align:top;'>");
            message = replaceAll(message,"[megusta]", 
              "<img src='http://m-net.arbornet.org/~lotw/emotes/megusta.png' height=32 style='vertical-align:top;'>");
            message = replaceAll(message,"[fuc kyea]", 
              "<img src='http://m-net.arbornet.org/~lotw/emotes/fuckyea.png' height=50 style='vertical-align:top;'>");
            message = replaceAll(message,"[lol]", 
              "<img src='http://m-net.arbornet.org/~lotw/emotes/lol.png' height=50 style='vertical-align:top;'>");
            message = replaceAll(message,"[fap]", 
              "<img src='http://m-net.arbornet.org/~lotw/emotes/fap.png' height=50 style='vertical-align:top;'>");
            message = replaceAll(message,"[soon]", 
              "<img src='http://m-net.arbornet.org/~lotw/emotes/soon.png' height=50 style='vertical-align:top;'>");
            message = replaceAll(message,"[fullpanel]", 
              "<img src='http://m-net.arbornet.org/~lotw/emotes/fullpanel.png' height=50 style='vertical-align:top;'>");
            message = replaceAll(message,"[jackiechan]", 
              "<img src='http://m-net.arbornet.org/~lotw/emotes/jackiechan.png' height=50 style='vertical-align:top;'>");
            message = replaceAll(message,"[seriously?]", 
              "<img src='http://m-net.arbornet.org/~lotw/emotes/seriously.png' height=50 style='vertical-align:top;'>");
            message = replaceAll(message,"[truestory]", 
              "<img src='http://m-net.arbornet.org/~lotw/emotes/truestory.png' height=50 style='vertical-align:top;'>");
            message = replaceAll(message,"[youdontsay?]", 
              "<img src='http://m-net.arbornet.org/~lotw/emotes/youdontsay.png' height=50 style='vertical-align:top;'>");
            message = replaceAll(message,"[soclose]", 
              "<img src='http://m-net.arbornet.org/~lotw/emotes/soclose.png' height=50 style='vertical-align:top;'>");
            message = replaceAll(message,"[feellikeasir]", 
              "<img src='http://m-net.arbornet.org/~lotw/emotes/feellikeasir.png' height=50 style='vertical-align:top;'>");
            message = replaceAll(message,"[ymscare]", 
              "<img src='http://m-net.arbornet.org/~lotw/emotes/ymscare.png' height=50 style='vertical-align:top;'>");
            message = replaceAll(message,"[yesucan]", 
              "<img src='http://m-net.arbornet.org/~lotw/emotes/yesucan.png' height=50 style='vertical-align:top;'>");
            message = replaceAll(message,"[rufkingkiddingme?]", 
              "<img src='http://m-net.arbornet.org/~lotw/emotes/rufkingkiddingme.png' height=50 style='vertical-align:top;'>");
            message = replaceAll(message,"[deskflip]", 
              "<img src='http://m-net.arbornet.org/~lotw/emotes/deskflip.png' height=50 style='vertical-align:top;'>");
            message = replaceAll(message,"[ragepose]", 
              "<img src='http://m-net.arbornet.org/~lotw/emotes/ragepose.png' height=50 style='vertical-align:top;'>");
            message = replaceAll(message,"[gaaaaaayyy]", 
              "<img src='http://m-net.arbornet.org/~lotw/emotes/gay.png' style='vertical-align:top;'>");
            message = replaceAll(message,"[okay]", 
              "<img src='http://m-net.arbornet.org/~lotw/emotes/okay.png' height=50 style='vertical-align:top;'>");
            message = replaceAll(message,"[peanuts]", 
              "<img src='http://m-net.arbornet.org/~lotw/emotes/peanuts.gif' style='vertical-align:top;'>");
            message = replaceAll(message,"[grapebird]", 
              "<img src='http://m-net.arbornet.org/~lotw/emotes/grapeb.gif' height=31 style='vertical-align:bottom;'>");
            message = replaceAll(message,":.)", 
              "<img src='http://images1.wikia.nocookie.net/__cb20080713124909/evchk/images/f/fb/Smile.gif' style='vertical-align:bottom;'>");
            message = replaceAll(message,"[angel]", 
              "<img src='http://images2.wikia.nocookie.net/__cb20080713124039/evchk/images/2/21/Angel.gif' style='vertical-align:bottom;'>");
            message = replaceAll(message, "xx(", 
              "<img src='http://images4.wikia.nocookie.net/__cb20080713124334/evchk/images/8/80/Dead.gif' style='vertical-align:bottom;'>");
            message = replaceAll(message, "o.)", 
              "<img src='http://images2.wikia.nocookie.net/__cb20060324164344/evchk/images/0/0f/Clown.gif' style='vertical-align:bottom;'>");
            message = replaceAll(message,":.(", 
              "<img src='http://images3.wikia.nocookie.net/__cb20080713124510/evchk/images/1/1c/Frown.gif' style='vertical-align:bottom;'>");
            message = replaceAll(message,":~(", 
              "<img src='http://images3.wikia.nocookie.net/__cb20080713124321/evchk/images/c/c6/Cry1.gif' style='vertical-align:bottom;'>");
            message = replaceAll(message,";.)", 
              "<img src='http://images3.wikia.nocookie.net/__cb20080713124947/evchk/images/e/e0/Wink.gif' style='vertical-align:bottom;'>");
            message = replaceAll(message,":-[", 
              "<img src='http://images3.wikia.nocookie.net/__cb20080713124051/evchk/images/0/08/Angry.gif' style='vertical-align:bottom;'>");
            message = replaceAll(message,":-]", 
              "<img src='http://images.wikia.com/evchk/images/a/aa/Devil.gif' style='vertical-align:bottom;'>");
            message = replaceAll(message,":.d", 
              "<img src='http://images4.wikia.nocookie.net/__cb20080713124132/evchk/images/8/8c/Biggrin.gif' style='vertical-align:bottom;'>");
            message = replaceAll(message,":.D", 
              "<img src='http://images4.wikia.nocookie.net/__cb20080713124132/evchk/images/8/8c/Biggrin.gif' style='vertical-align:bottom;'>");
            message = replaceAll(message,":.o", 
              "<img src='http://images2.wikia.nocookie.net/__cb20080713124814/evchk/images/5/5c/Oh.gif' style='vertical-align:bottom;'>");
            message = replaceAll(message,":.O", 
              "<img src='http://images2.wikia.nocookie.net/__cb20080713124814/evchk/images/5/5c/Oh.gif' style='vertical-align:bottom;'>");
            message = replaceAll(message,":.p", 
              "<img src='http://images2.wikia.nocookie.net/__cb20080713124935/evchk/images/8/88/Tongue.gif' style='vertical-align:bottom;'>");
            message = replaceAll(message,":.P", 
              "<img src='http://images2.wikia.nocookie.net/__cb20080713124935/evchk/images/8/88/Tongue.gif' style='vertical-align:bottom;'>");
            message = replaceAll(message, "^3^", 
              "<img src='http://images1.wikia.nocookie.net/__cb20080713124726/evchk/images/1/18/Kiss.gif' style='vertical-align:bottom;'>");
            message = replaceAll(message, "?_?", 
              "<img src='http://images3.wikia.nocookie.net/__cb20080713124956/evchk/images/7/7d/Wonder.gif' style='vertical-align:bottom;'>");
            message = replaceAll(message,":$", 
              "<img src='http://forum.mess.be/style_emoticons/mess.be/msn_embarrassed.gif' style='vertical-align:bottom'>");
            message = replaceAll(message, "(awkward)", 
              "<img src='http://m-net.arbornet.org/~lotw/emotes/8.gif' style='vertical-align:bottom'>");
            message = replaceAll(message, "(drooling)", 
              "<img src='http://m-net.arbornet.org/~lotw/emotes/17.gif' style='vertical-align:bottom'>");
            message = replaceAll(message, "(hush)", 
              "<img src='http://m-net.arbornet.org/~lotw/emotes/20.gif' style='vertical-align:bottom'>");
            message = replaceAll(message, "(lusty)", 
              "<img src='http://m-net.arbornet.org/~lotw/emotes/22.gif' style='vertical-align:bottom'>");
            message = replaceAll(message, "(shy)", 
              "<img src='http://m-net.arbornet.org/~lotw/emotes/33.gif' style='vertical-align:bottom'>");
            message = replaceAll(message, "(brilliant)", 
              "<img src='http://m-net.arbornet.org/~lotw/emotes/46.gif' style='vertical-align:bottom'>");
            message = replaceAll(message,"[nogirls]", 
              "<img src='http://m-net.arbornet.org/~lotw/emotes/air_girl.gif' height=46 style='vertical-align:bottom'>");
            message = replaceAll(message,"[notsad]", 
              "<img src='http://m-net.arbornet.org/~lotw/emotes/notsad.gif' height=17 style='vertical-align:bottom'>");
            message = replaceAll(message, "(disregard)", 
              "<img src='http://m-net.arbornet.org/~lotw/emotes/30.gif' style='vertical-align:bottom'>");
            message = replaceAll(message, "(flighty)", 
              "<img src='http://m-net.arbornet.org/~lotw/emotes/31.gif' style='vertical-align:bottom'>");
            message = replaceAll(message, "(beat)", 
              "<img src='http://m-net.arbornet.org/~lotw/emotes/34.gif' style='vertical-align:bottom'>");
            message = replaceAll(message,"[angelx]", 
              "<img src='http://m.hkgolden.com/faces/xmas/angel.gif' style='vertical-align:bottom'>");
            message = replaceAll(message,"[xx (x]", 
              "<img src='http://m.hkgolden.com/faces/xmas/dead.gif' style='vertical-align:bottom'>");
            message = replaceAll(message,"[)x]", 
              "<img src='http://m.hkgolden.com/faces/xmas/smile.gif' style='vertical-align:bottom'>");
            message = replaceAll(message,"[o )x]", 
              "<img src='http://m.hkgolden.com/faces/xmas/clown.gif' style='vertical-align:bottom'>");
            message = replaceAll(message,"[o )jx]", 
              "<img src='http://m.hkgolden.com/faces/xmas/clown_jesus.gif' style='vertical-align:bottom'>");
            message = replaceAll(message,"[(x]", 
              "<img src='http://m.hkgolden.com/faces/xmas/frown.gif' style='vertical-align:bottom'>");
            message = replaceAll(message,"[~(x]", 
              "<img src='http://m.hkgolden.com/faces/xmas/cry.gif' style='vertical-align:bottom'>");
            message = replaceAll(message,"[;x]", 
              "<img src='http://m.hkgolden.com/faces/xmas/wink.gif' style='vertical-align:bottom'>");
            message = replaceAll(message,"[:[x]", 
              "<img src='http://m.hkgolden.com/faces/xmas/angry.gif' style='vertical-align:bottom'>");
            message = replaceAll(message,"[:.]x]", 
              "<img src='http://m.hkgolden.com/faces/xmas/devil.gif' style='vertical-align:bottom'>");
            message = replaceAll(message,"[:dx]", 
              "<img src='http://m.hkgolden.com/faces/xmas/biggrin.gif' style='vertical-align:bottom'>");
            message = replaceAll(message,"[Ox]", 
              "<img src='http://m.hkgolden.com/faces/xmas/oh.gif' style='vertical-align:bottom'>");
            message = replaceAll(message,"[Px]", 
              "<img src='http://m.hkgolden.com/faces/xmas/tongue.gif' style='vertical-align:bottom'>");
            message = replaceAll(message,"[^x^]", 
              "<img src='http://m.hkgolden.com/faces/xmas/kiss.gif' style='vertical-align:bottom'>");
            message = replaceAll(message,"[??x]", 
              "<img src='http://m.hkgolden.com/faces/xmas/wonder.gif' style='vertical-align:bottom'>");
            message = replaceAll(message, "#yupx#", 
              "<img src='http://m.hkgolden.com/faces/xmas/agree.gif' style='vertical-align:bottom'>");
            message = replaceAll(message, "#ngx#", 
              "<img src='http://m.hkgolden.com/faces/xmas/donno.gif' style='vertical-align:bottom'>");
            message = replaceAll(message, "#hehex#", 
              "<img src='http://m.hkgolden.com/faces/xmas/hehe.gif' style='vertical-align:bottom'>");
            message = replaceAll(message, "#lovex#", 
              "<img src='http://m.hkgolden.com/faces/xmas/love.gif' style='vertical-align:bottom'>");
            message = replaceAll(message, "#ohx#", 
              "<img src='http://m.hkgolden.com/faces/xmas/surprise.gif' style='vertical-align:bottom'>");
            message = replaceAll(message, "#a ssx#", 
              "<img src='http://m.hkgolden.com/faces/xmas/ass.gif' style='vertical-align:bottom'>");
            message = replaceAll(message,"[sosadx]", 
              "<img src='http://m.hkgolden.com/faces/xmas/sosad.gif' style='vertical-align:bottom'>");
            message = replaceAll(message, "#goodx#", 
              "<img src='http://m.hkgolden.com/faces/xmas/good.gif' style='vertical-align:bottom'>");
            message = replaceAll(message, "#hohox#", 
              "<img src='http://m.hkgolden.com/faces/xmas/hoho.gif' style='vertical-align:bottom'>");
            message = replaceAll(message, "#killx#", 
              "<img src='http://m.hkgolden.com/faces/xmas/kill.gif' style='vertical-align:bottom'>");
            message = replaceAll(message, "#byex#", 
              "<img src='http://m.hkgolden.com/faces/xmas/bye.gif' style='vertical-align:bottom'>");
            message = replaceAll(message,"[ZZx]", 
              "<img src='http://m.hkgolden.com/faces/xmas/z.gif' style='vertical-align:bottom'>");
            message = replaceAll(message,"[@@x]", 
              "<img src='http://m.hkgolden.com/faces/xmas/@.gif' style='vertical-align:bottom'>");
            message = replaceAll(message, "#adorex#", 
              "<img src='http://m.hkgolden.com/faces/xmas/adore.gif' style='vertical-align:bottom'>");
            message = replaceAll(message, "#adore2x#", 
              "<img src='http://m.hkgolden.com/faces/xmas/adore2.gif' style='vertical-align:bottom'>");
            message = replaceAll(message,"[?x]", 
              "<img src='http://m.hkgolden.com/faces/xmas/wonder2.gif' style='vertical-align:bottom'>");
            message = replaceAll(message,"[bangheadx]", 
              "<img src='http://m.hkgolden.com/faces/xmas/banghead.gif' style='vertical-align:bottom'>");
            message = replaceAll(message,"[bouncerx]", 
              "<img src='http://m.hkgolden.com/faces/xmas/bouncer.gif' style='vertical-align:bottom'>");
            message = replaceAll(message,"[offtopicx]", 
              "<img src='http://m.hkgolden.com/faces/xmas/offtopic.gif' style='vertical-align:bottom'>");
            message = replaceAll(message,"[censoredx]", 
              "<img src='http://m.hkgolden.com/faces/xmas/censored.gif' style='vertical-align:bottom'>");
            message = replaceAll(message,"[flowerfacex]", 
              "<img src='http://m.hkgolden.com/faces/xmas/flowerface.gif' style='vertical-align:bottom'>");
            message = replaceAll(message,"[shockingx]", 
              "<img src='http://m.hkgolden.com/faces/xmas/shocking.gif' style='vertical-align:bottom'>");
            message = replaceAll(message,"[photox]", 
              "<img src='http://m.hkgolden.com/faces/xmas/photo.gif' style='vertical-align:bottom'>");
            message = replaceAll(message,"[yipesx]", 
              "<img src='http://m.hkgolden.com/faces/xmas/yipes.gif' style='vertical-align:bottom'>");
            message = replaceAll(message,"[yipes2x]", 
              "<img src='http://m.hkgolden.com/faces/xmas/yipes2.gif' style='vertical-align:bottom'>");
            message = replaceAll(message,"[yipes3x]", 
              "<img src='http://m.hkgolden.com/faces/xmas/yipes3.gif' style='vertical-align:bottom'>");
            message = replaceAll(message,"[yipes4x]", 
              "<img src='http://m.hkgolden.com/faces/xmas/yipes4.gif' style='vertical-align:bottom'>");
            message = replaceAll(message,"[369x]", 
              "<img src='http://m.hkgolden.com/faces/xmas/369.gif' style='vertical-align:bottom'>");
            message = replaceAll(message,"[bombx]", 
              "<img src='http://m.hkgolden.com/faces/xmas/bomb.gif' style='vertical-align:bottom'>");
            message = replaceAll(message,"[slickx]", 
              "<img src='http://m.hkgolden.com/faces/xmas/slick.gif' style='vertical-align:bottom'>");
            message = replaceAll(message,"[fuckx]", 
              "<img src='http://m.hkgolden.com/faces/xmas/diu.gif' style='vertical-align:bottom'>");
            message = replaceAll(message, "#nox#", 
              "<img src='http://m.hkgolden.com/faces/xmas/no.gif' style='vertical-align:bottom'>");
            message = replaceAll(message, "#kill2x#", 
              "<img src='http://m.hkgolden.com/faces/xmas/kill2.gif' style='vertical-align:bottom'>");
            message = replaceAll(message, "#kill3x#", 
              "<img src='http://m.hkgolden.com/faces/xmas/kill3.gif' style='vertical-align:bottom'>");
            message = replaceAll(message, "#cnx#", 
              "<img src='http://m.hkgolden.com/faces/xmas/chicken.gif' style='vertical-align:bottom'>");
            message = replaceAll(message, "#cn2x#", 
              "<img src='http://m.hkgolden.com/faces/xmas/chicken2.gif' style='vertical-align:bottom'>");
            message = replaceAll(message,"[bouncyx]", 
              "<img src='http://m.hkgolden.com/faces/xmas/bouncy.gif' style='vertical-align:bottom'>");
            message = replaceAll(message,"[bouncy2x]", 
              "<img src='http://m.hkgolden.com/faces/xmas/bouncy2.gif' style='vertical-align:bottom'>");
            message = replaceAll(message, "#firex#", 
              "<img src='http://m.hkgolden.com/faces/xmas/fire.gif' style='vertical-align:bottom'>");
            message = replaceAll(message,"[)gx]", 
              "<img src='http://m.hkgolden.com/faces/xmas/green/smile.gif' style='vertical-align:bottom'>");
            message = replaceAll(message,"[o )gx]", 
              "<img src='http://m.hkgolden.com/faces/xmas/green/clown.gif' style='vertical-align:bottom'>");
            message = replaceAll(message,"[(gx]", 
              "<img src='http://m.hkgolden.com/faces/xmas/green/frown.gif' style='vertical-align:bottom'>");
            message = replaceAll(message,"[~(gx]", 
              "<img src='http://m.hkgolden.com/faces/xmas/green/cry.gif' style='vertical-align:bottom'>");
            message = replaceAll(message, "#yupgx#", 
              "<img src='http://m.hkgolden.com/faces/xmas/green/agree.gif' style='vertical-align:bottom'>");
            message = replaceAll(message,"[sosadgx]", 
              "<img src='http://m.hkgolden.com/faces/xmas/green/sosad.gif' style='vertical-align:bottom'>");
            message = replaceAll(message, "#goodgx#", 
              "<img src='http://m.hkgolden.com/faces/xmas/green/good.gif' style='vertical-align:bottom'>");
            message = replaceAll(message, "#byegx#", 
              "<img src='http://m.hkgolden.com/faces/xmas/green/bye.gif' style='vertical-align:bottom'>");
            message = replaceAll(message,"[369gx]", 
              "<img src='http://m.hkgolden.com/faces/xmas/green/369.gif' style='vertical-align:bottom'>");
            message = replaceAll(message,"[fuc kgx]", 
              "<img src='http://m.hkgolden.com/faces/xmas/green/diu.gif' style='vertical-align:bottom'>");
            message = replaceAll(message,"[o )n]", 
              "<img src='http://m.hkgolden.com/faces/newyear/clown.gif' style='vertical-align:bottom'>");
            message = replaceAll(message,"[o )2n]", 
              "<img src='http://m.hkgolden.com/faces/newyear/clown2.gif' style='vertical-align:bottom'>");
            message = replaceAll(message,"[o )3n]", 
              "<img src='http://m.hkgolden.com/faces/newyear/clown3.gif' style='vertical-align:bottom'>");
            message = replaceAll(message, "#a ssn#", 
              "<img src='http://m.hkgolden.com/faces/newyear/ass.gif' style='vertical-align:bottom'>");
            message = replaceAll(message,"[sosadn]", 
              "<img src='http://m.hkgolden.com/faces/newyear/sosad.gif' style='vertical-align:bottom'>");
            message = replaceAll(message,"[sosad2n]", 
              "<img src='http://m.hkgolden.com/faces/newyear/sosad2.gif' style='vertical-align:bottom'>");
            message = replaceAll(message,"[sosad3n]", 
              "<img src='http://m.hkgolden.com/faces/newyear/sosad3.gif' style='vertical-align:bottom'>");
            message = replaceAll(message,"[bangheadn]", 
              "<img src='http://m.hkgolden.com/faces/newyear/banghead.gif' style='vertical-align:bottom'>");
            message = replaceAll(message,"[banghead2n]", 
              "<img src='http://m.hkgolden.com/faces/newyear/banghead2.gif' style='vertical-align:bottom'>");
            message = replaceAll(message,"[yipesn]", 
              "<img src='http://m.hkgolden.com/faces/newyear/yipes.gif' style='vertical-align:bottom'>");
            message = replaceAll(message,"[369n]", 
              "<img src='http://m.hkgolden.com/faces/newyear/369.gif' style='vertical-align:bottom'>");
            message = replaceAll(message,"[3692n]", 
              "<img src='http://m.hkgolden.com/faces/newyear/3692.gif' style='vertical-align:bottom'>");
            message = replaceAll(message,"[fuckn]", 
              "<img src='http://m.hkgolden.com/faces/newyear/diu.gif' style='vertical-align:bottom'>");
            message = replaceAll(message,"[bouncern]", 
              "<img src='http://m.hkgolden.com/faces/newyear/bouncer.gif' style='vertical-align:bottom'>");
            message = replaceAll(message,"[offtopicn]", 
              "<img src='http://m.hkgolden.com/faces/newyear/offtopic.gif' style='vertical-align:bottom'>");
            message = replaceAll(message,"[offtopic2n]", 
              "<img src='http://m.hkgolden.com/faces/newyear/offtopic2.gif' style='vertical-align:bottom'>");
            message = replaceAll(message,"[b]", "<b>");
            message = replaceAll(message,"[/b]", "</b>");
            message = replaceAll(message,"[i]", "<i>");
            message = replaceAll(message,"[/i]", "</i>");
            message = replaceAll(message,"[u]", "<u>");
            message = replaceAll(message,"[/u]", "</u>");
            message = replaceAll(message,"[s]", "<s>");
            message = replaceAll(message,"[/s]", "</s>");
            message = replaceAll(message,"[size=7]", "<font style='font-size:50px'>");
            message = replaceAll(message,"[/size=7]", "</font>");
            message = replaceAll(message,"[size=6]", "<font style='font-size:37px'>");
            message = replaceAll(message,"[/size=6]", "</font>");
            message = replaceAll(message,"[size=5]", "<font style='font-size:28px'>");
            message = replaceAll(message,"[/size=5]", "</font>");
            message = replaceAll(message,"[size=4]", "<font style='font-size:22px'>");
            message = replaceAll(message,"[/size=4]", "</font>");
            message = replaceAll(message,"[size=3]", "<font style='font-size:19px'>");
            message = replaceAll(message,"[/size=3]", "</font>");
            message = replaceAll(message,"[size=2]", "<font style='font-size:16px'>");
            message = replaceAll(message,"[/size=2]", "</font>");
            message = replaceAll(message,"[size=1]", "<font style='font-size:14px'>");
            message = replaceAll(message,"[/size=1]", "</font>");
            message = replaceAll(message,"[red]", "<font style='color: red;'>");
            message = replaceAll(message,"[green]", "<font style='color: green;'>");
            message = replaceAll(message,"[blue]", "<font style='color: blue;'>");
            message = replaceAll(message,"[white]", "<font style='color: white;'>");
            message = replaceAll(message,"[purple]", "<font style='color: purple;'>");
            message = replaceAll(message,"[yellow]", "<font style='color: yellow;'>");
            message = replaceAll(message,"[violet]", "<font style='color: violet;'>");
            message = replaceAll(message,"[brown]", "<font style='color: brown;'>");
            message = replaceAll(message,"[black]", "<font style='color: black;'>");
            message = replaceAll(message,"[pink]", "<font style='color: pink;'>");
            message = replaceAll(message,"[orange]", "<font style='color: orange;'>");
            message = replaceAll(message,"[gold]", "<font style='color: gold;'>");
            message = replaceAll(message,"[maroon]", "<font style='color: maroon;'>");
            message = replaceAll(message,"[teal]", "<font style='color: teal;'>");
            message = replaceAll(message,"[navy]", "<font style='color: navy;'>");
            message = replaceAll(message,"[beige]", "<font style='color: beige;'>");
            message = replaceAll(message,"[limegreen]", "<font style='color: limegreen;'>");
            message = replaceAll(message,"[/red]", "</font>");
            message = replaceAll(message,"[/green]", "</font>");
            message = replaceAll(message,"[/blue]", "</font>");
            message = replaceAll(message,"[/white]", "</font>");
            message = replaceAll(message,"[/purple]", "</font>");
            message = replaceAll(message,"[/yellow]", "</font>");
            message = replaceAll(message,"[/violet]", "</font>");
            message = replaceAll(message,"[/brown]", "</font>");
            message = replaceAll(message,"[/black]", "</font>");
            message = replaceAll(message,"[/pink]", "</font>");
            message = replaceAll(message,"[/orange]", "</font>");
            message = replaceAll(message,"[/gold]", "</font>");
            message = replaceAll(message,"[/maroon]", "</font>");
            message = replaceAll(message,"[/teal]", "</font>");
            message = replaceAll(message,"[/navy]", "</font>");
            message = replaceAll(message,"[/beige]", "</font>");
            message = replaceAll(message,"[/limegreen]", "</font>");
           }
        return message;
       }
   
function trypro()
{
if(typeof PP != "undefined") {
PP['is_pro'] = true;
PP['turbo'] = true;
PP['turbo_exempt'] = false;
PP['active_channel_subscriber'] = true;
PP.pro_account_activated = true;
}
if(typeof iab_rma_video_complete == "function") {
iab_rma_video_complete();
}
}
function cstroke(color, size)
{
return ''
+size+'px '+size+'px 0 '+color
+', -'+size+'px '+size+'px 0 '+color
+', '+size+'px -'+size+'px 0 '+color
+', -'+size+'px -'+size+'px 0 '+color;
}

    function brand()
       {var logo = document.getElementById("jtv_frontpage_link");
        if ( ! logo)
           {return;
           }
        var watermark = document.createElement("div");
        watermark.style.marginTop = "-5px";
        watermark.style.marginLeft = "-59px";
        watermark.innerHTML = 
          "<a href='http://m-net.arbornet.org/~lotw/' target='_blank'><img src='http://m-net.arbornet.org/~lotw/logo.png'></a>";
        logo.appendChild(watermark);
        CurrentChat.admin_message("Thank you for using <a href='http://m-net.arbornet.org/~lotw/' target='_blank'>ExtremeJTV+ 2.0</a> by <a href='http://www.justin.tv/message/compose?to=tro0p' target='_blank'>Dezz</a> and <a href='http://www.justin.tv/message/compose?to=sethee' target='_blank'>Seth</a>.  If you just installed ExtremeJTV+ and the chat isn't working.  Then you have betterjtv, dohirty, or an old version of Extreme still installed.  You must disable them extensions for ExtremeJTV+ to work!");
       }
   
    function brandchat()
       {var chatlogo = document.getElementById("jtv_chat");
        if ( ! chatlogo)
           {return;
           }
        if ( ! popout_chat)
           {return;
           }
        var watermark = document.createElement("div");
        watermark.style.marginTop = "0px";
        watermark.style.marginLeft = "3px";
        watermark.innerHTML = 
          "<a href='http://m-net.arbornet.org/~lotw' target='_blank'><img src='http://m-net.arbornet.org/~lotw/chatlogo.png'></a>";
        chatlogo.appendChild(watermark);
       }
   
    function ejtvchatlogo()
       {var chatlogo2 = document.getElementById("chat_lines");
        if ( ! chatlogo2)
           {return;
           }
        var watermark = document.createElement("div");
        watermark.style.marginTop = "-0px";
        watermark.style.marginLeft = "-0px";
        watermark.innerHTML = 
          "<font style='cursor:pointer; font-weight: bold; text-decoration: none; font-size:18px; color:#0000FF;' onclick='javascript:InsertText(\"[b],Bold,[/b]\",true);'><b>B</b></font> <font style='cursor:pointer; font-style: italic; text-decoration: none; font-size:18px; color:#0000FF;' onclick='javascript:InsertText(\"[i],Italic,[/i]\",true);'><i>I</i></font> <font style='cursor:pointer; font-size:18px; color:#0000FF;' onclick='javascript:InsertText(\"[u],Underline,[/u]\",true);'><u>U</u></font> <font style='cursor:pointer;  text-decoration: none; font-size:18px; color:#0000FF;' onclick='javascript:InsertText(\"[s],Strikethrough,[/s]\",true);'><s>S</s></font> <img style='cursor:pointer;' src='http://m-net.arbornet.org/~lotw/img.jpg' onClick='javascript:InsertText(\"[img],paste_link_to_image_here,[/img]\",true);'> <img style='cursor:pointer;' src='http://m-net.arbornet.org/~lotw/vid.jpg' onClick='javascript:InsertText(\"[vid],paste_link_to_video_here_in_.mp4_.ogg_.ogv_.webm_file_format,[/vid]\",true);'>";
        chatlogo2.appendChild(watermark);
       }
   
    function echat()
       {var echat = document.getElementById("right_col");//var echat = document.getElementById("chat_container");
        if ( ! echat)
           {return;
           }
        var watermark = document.createElement("div");
        watermark.style.marginTop = "-11px";
        watermark.style.marginLeft = "-0px";
        watermark.innerHTML = 
          "<iframe frameborder='0' scrolling='yes' id='ExtremeJtvChat' src='http://m-net.arbornet.org/~lotw/ejtvchat.php' height='500' width='460'></iframe>";
        echat.appendChild(watermark);
       }
   
    function shoutbox()
       {var ejtvchat = document.getElementById("actions");
        if ( ! ejtvchat)
           {return;
           }
        if ( ! popout_chat)
           {return;
           }
        var watermark2 = document.createElement("div");
        watermark2.style.marginTop = "0px";
        watermark2.innerHTML = 
          '<iframe src="http://static.novelgames.com/multiplayerflashgames/game_e.41.swf?id=11" width="480" height="320" FlashVars="id=12" allowScriptAccess="always" allowFullScreen="true"></iframe>';//watermark2.innerHTML = '<iframe src="http://JtvDev.freeshoutbox.net/" height="270" width="625" frameborder="0"></iframe>';
        ejtvchat.appendChild(watermark2);
       }
   
    function meeboAdvert()
       {var results = $$('m');
        results.each(function(element)
           {if (element.offsetLeft === 0 && element.style.cursor == "pointer")
               {element.remove();
                throw $break;
               }
           });
       }
   
    function icon()
       {var loc = document.URL;
        if (loc.indexOf( "/chat/embed?channel=extremejtv") != - 1)
           {return;
           }
        ddebug.log("CALL for emotes below chat.");
        var chat_col;
        chat_col = document.getElementById("jtv_chat");
        if ( ! chat_col) return;
        ddebug.log("PROCESSING ICON");
        var hkgicon = document.createElement("div");
        hkgicon.style.marginTop = "0px";
        hkgicon.style.marginLeft = "-5px";
        hkgicon.style.marginRight = "-5px";
        hkgicon.id = "iconset";
        hkgicon.className = "right_col_rnd";
        hkgicon.innerHTML = 
          "<table>        <tr><a href='http://m-net.arbornet.org/~lotw' target='_blank'><img src='http://m-net.arbornet.org/~lotw/button.png'>&nbsp;</a>           <font style='cursor:pointer; font-weight: bold; text-decoration: none; font-size:18px; color:#0000FF;' onclick='javascript:InsertText(\"[b],Bold,[/b]\",true);'><span title='Bold Text'><b>B</b></span></font>&nbsp;           <font style='cursor:pointer; font-style: italic; text-decoration: none; font-size:18px; color:#0000FF;' onclick='javascript:InsertText(\"[i],Italic,[/i]\",true);'><span title='Italic Text'><i>I</i></span></font>&nbsp;           <font style='cursor:pointer; font-size:18px; color:#0000FF;' onclick='javascript:InsertText(\"[u],Underline,[/u]\",true);'><span title='Underline Text'><u>U</u></span></font>&nbsp;           <font style='cursor:pointer;  text-decoration: none; font-size:18px; color:#0000FF;' onclick='javascript:InsertText(\"[s],Strikethrough,[/s]\",true);'><span title='Strikethrough Text'><s>S</s></span></font>&nbsp;           <img style='cursor:pointer;' src='http://m-net.arbornet.org/~lotw/img.jpg' alt='Showpicture' title='Post a picture or animated picture in chat for everyone to see.' onClick='javascript:InsertText(\"[img],paste_image_link_here_ending_in_.jpg_.bmp_.gif_.png,[/img]\",true);'>&nbsp;           <img style='cursor:pointer;' src='http://m-net.arbornet.org/~lotw/vid.jpg' alt='Showvideo' title='Post a video in chat for everyone to watch.' onClick='javascript:InsertText(\"[vid],paste_link_to_video_here_in_.mp4_.ogg_.ogv_.mov_.webm_file_format,[/vid]\",true);'>&nbsp;           <select id='fs' size='1' name='fontsize' onchange='return InsertText(this.value,true);' class='pretty_button' style='width:80px'>                      <option value=',,' selected='selected'>Size</option>                      <option value='[size=7],7,[/size=7]'>7</option>                      <option value='[size=6],6,[/size=6]'>6</option>                      <option value='[size=5],5,[/size=5]'>5</option>                      <option value='[size=4],4,[/size=4]'>4</option>                      <option value='[size=3],3,[/size=3]'>3</option>                      <option value='[size=2],2,[/size=2]'>2</option>                      <option value='[size=1],1,[/size=1]'>1</option>          </select>&nbsp;          <select id='fc' size='1' name='fontcolor' onchange='return InsertText(this.value,true);' class='pretty_button' style='width:86px'>                    <option value=',,' selected='selected' style='background-color: #F1F2F3;'>Color</option>                    <option value='[red],Red,[/red]' style='color: red; background-color: #F1F2F3;'>Red</option>                    <option value='[green],Green,[/green]' style='color: green; background-color: #F1F2F3;'>Green</option>                    <option value='[blue],Blue,[/blue]' style='color: blue; background-color: #F1F2F3;'>Blue</option>                    <option value='[white],White,[/white]' style='color: white; background-color: #F1F2F3;'>White</option>                    <option value='[purple],Purple,[/purple]' style='color: purple; background-color: #F1F2F3;'>Purple</option>                    <option value='[yellow],Yellow,[/yellow]' style='color: yellow; background-color: #F1F2F3;'>Yellow</option>                    <option value='[violet],Violet,[/violet]' style='color: violet; background-color: #F1F2F3;'>Violet</option>                    <option value='[brown],Brown,[/brown]' style='color: brown; background-color: #F1F2F3;'>Brown</option>                    <option value='[black],Black,[/black]' style='color: black; background-color: #F1F2F3;'>Black</option>                    <option value='[pink],Pink,[/pink]' style='color: pink; background-color: #F1F2F3;'>Pink</option>                    <option value='[orange],Orange,[/orange]' style='color: orange; background-color: #F1F2F3;'>Orange</option>                    <option value='[gold],Gold,[/gold]' style='color: gold; background-color: #F1F2F3;'>Gold</option>                    <option value='[maroon],Maroon,[/maroon]' style='color: maroon; background-color: #F1F2F3;'>Maroon</option>                    <option value='[teal],Teal,[/teal]' style='color: teal; background-color: #F1F2F3;'>Teal</option>                    <option value='[navy],Navy,[/navy]' style='color: navy; background-color: #F1F2F3;'>Navy</option>                    <option value='[beige],Beige,[/beige]' style='color: beige; background-color: #F1F2F3;'>Beige</option>                    <option value='[limegreen],Limegreen,[/limegreen]' style='color: limegreen; background-color: #F1F2F3;'>Limegreen</option>          </select>&nbsp;<button class='pretty_button spacer small' onclick='toggle_chat();'><span class='main'>Hide Chat</span></button>          </tr></table>          <table><tr>          <td id='myTab0' class='selected' onclick='changeTab(0);'><a class='pretty_button'></a></td>          <td id='myTab1' class='selected' onclick='changeTab(1);'><a class='pretty_button'>0</a></td>          <td id='myTab2' class='selected' onclick='changeTab(2);'><a class='pretty_button'>1</a></td>          <td id='myTab3' class='selected' onclick='changeTab(3);'><a class='pretty_button'>2</a></td>          <td id='myTab4' class='selected' onclick='changeTab(4);'><a class='pretty_button'>3</a></td>          <td id='myTab5' class='selected' onclick='changeTab(5);'><a class='pretty_button'>4</a></td>          <td id='myTab6' class='selected' onclick='changeTab(6);'><a class='pretty_button'>5</a></td>          <td id='myTab7' class='selected' onclick='changeTab(7);'><a class='pretty_button'>6</a></td>          <td id='myTab8' class='selected' onclick='changeTab(8);'><a class='pretty_button'>7</a></td>          <td id='myTab9' class='selected' onclick='changeTab(9);'><a class='pretty_button'>8</a></td>          <td id='myTab10' class='normal' onclick='changeTab(10);'><a class='pretty_button'>Hide</a></td>          <td id='myTab11' class='selected' onclick='changeTab(11);'><a class='pretty_button'></a></td>          </tr>          </table></div>          <div style='clear:both'></div>          <div id='ac' style='margin-top:5px; margin-left: 0px;'>          <div id='myTab_Content0'>          <table><tr><td colspan='2'>        </td></tr></table></div>   <div id='myTab_Content1' style='display:none;'>          <table><tr><td></div><img class='clickicon' onclick='javascript:InsertText(\"[angelx]\",false)' src='http://m.hkgolden.com/faces/xmas/angel.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"[xx (x]\",false)' src='http://m.hkgolden.com/faces/xmas/dead.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"[)x]\",false)' src='http://m.hkgolden.com/faces/xmas/smile.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"[o )x]\",false)' src='http://m.hkgolden.com/faces/xmas/clown.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"[o )jx]\",false)' src='http://m.hkgolden.com/faces/xmas/clown_jesus.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"[(x]\",false)' src='http://m.hkgolden.com/faces/xmas/frown.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"[~(x]\",false)' src='http://m.hkgolden.com/faces/xmas/cry.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"[;x]\",false)' src='http://m.hkgolden.com/faces/xmas/wink.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"[:[x]\",false)' src='http://m.hkgolden.com/faces/xmas/angry.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"[:.]x]\",false)' src='http://m.hkgolden.com/faces/xmas/devil.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"[:dx]\",false)' src='http://m.hkgolden.com/faces/xmas/biggrin.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"[Ox]\",false)' src='http://m.hkgolden.com/faces/xmas/oh.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"[Px]\",false)' src='http://m.hkgolden.com/faces/xmas/tongue.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"[^x^]\",false)' src='http://m.hkgolden.com/faces/xmas/kiss.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"[??x]\",false)' src='http://m.hkgolden.com/faces/xmas/wonder.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"#yupx#\",false)' src='http://m.hkgolden.com/faces/xmas/agree.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"#ngx#\",false)' src='http://m.hkgolden.com/faces/xmas/donno.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"#hehex#\",false)' src='http://m.hkgolden.com/faces/xmas/hehe.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"#lovex#\",false)' src='http://m.hkgolden.com/faces/xmas/love.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"#ohx#\",false)' src='http://m.hkgolden.com/faces/xmas/surprise.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"#a ssx#\",false)' src='http://m.hkgolden.com/faces/xmas/ass.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"[sosadx]\",false)' src='http://m.hkgolden.com/faces/xmas/sosad.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"#goodx#\",false)' src='http://m.hkgolden.com/faces/xmas/good.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"#hohox#\",false)' src='http://m.hkgolden.com/faces/xmas/hoho.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"#killx#\",false)' src='http://m.hkgolden.com/faces/xmas/kill.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"#byex#\",false)' src='http://m.hkgolden.com/faces/xmas/bye.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"[ZZx]\",false)' src='http://m.hkgolden.com/faces/xmas/z.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"[@@x]\",false)' src='http://m.hkgolden.com/faces/xmas/@.gif'>                  <img class='clickicon' onclick='javascrifont style=pt:InsertText(\"#adorex#\",false)' src='http://m.hkgolden.com/faces/xmas/adore.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"#adore2x#\",false)' src='http://m.hkgolden.com/faces/xmas/adore2.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"[?x]\",false)' src='http://m.hkgolden.com/faces/xmas/wonder2.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"[bangheadx]\",false)' src='http://m.hkgolden.com/faces/xmas/banghead.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"[bouncerx]\",false)' src='http://m.hkgolden.com/faces/xmas/bouncer.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"[offtopicx]\",false)' src='http://m.hkgolden.com/faces/xmas/offtopic.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"[censoredx]\",false)' src='http://m.hkgolden.com/faces/xmas/censored.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"[flowerfacex]\",false)' src='http://m.hkgolden.com/faces/xmas/flowerface.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"[shockingx]\",false)' src='http://m.hkgolden.com/faces/xmas/shocking.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"[photox]\",false)' src='http://m.hkgolden.com/faces/xmas/photo.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"[yipesx]\",false)' src='http://m.hkgolden.com/faces/xmas/yipes.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"[yipes2x]\",false)' src='http://m.hkgolden.com/faces/xmas/yipes2.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"[yipes3x]\",false)' src='http://m.hkgolden.com/faces/xmas/yipes3.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"[yipes4x]\",false)' src='http://m.hkgolden.com/faces/xmas/yipes4.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"[369x]\",false)' src='http://m.hkgolden.com/faces/xmas/369.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"[bombx]\",false)' src='http://m.hkgolden.com/faces/xmas/bomb.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"[slickx]\",false)' src='http://m.hkgolden.com/faces/xmas/slick.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"[fuckx]\",false)' src='http://m.hkgolden.com/faces/xmas/diu.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"#nox#\",false)' src='http://m.hkgolden.com/faces/xmas/no.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"#kill2x#\",false)' src='http://m.hkgolden.com/faces/xmas/kill2.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"#kill3x#\",false)' src='http://m.hkgolden.com/faces/xmas/kill3.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"#cnx#\",false)' src='http://m.hkgolden.com/faces/xmas/chicken.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"#cn2x#\",false)' src='http://m.hkgolden.com/faces/xmas/chicken2.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"[bouncyx]\",false)' src='http://m.hkgolden.com/faces/xmas/bouncy.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"[bouncy2x]\",false)' src='http://m.hkgolden.com/faces/xmas/bouncy2.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"#firex#\",false)' src='http://m.hkgolden.com/faces/xmas/fire.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"[)gx]\",false)' src='http://m.hkgolden.com/faces/xmas/green/smile.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"[o )gx]\",false)' src='http://m.hkgolden.com/faces/xmas/green/clown.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"[(gx]\",false)' src='http://m.hkgolden.com/faces/xmas/green/frown.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"[~(gx]\",false)' src='http://m.hkgolden.com/faces/xmas/green/cry.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"#yupgx#\",false)' src='http://m.hkgolden.com/faces/xmas/green/agree.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"[sosadgx]\",false)' src='http://m.hkgolden.com/faces/xmas/green/sosad.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"#goodgx#\",false)' src='http://m.hkgolden.com/faces/xmas/green/good.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"#byegx#\",false)' src='http://m.hkgolden.com/faces/xmas/green/bye.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"[369gx]\",false)' src='http://m.hkgolden.com/faces/xmas/green/369.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"[fuc kgx]\",false)' src='http://m.hkgolden.com/faces/xmas/green/diu.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"[o )n]\",false)' src='http://m.hkgolden.com/faces/newyear/clown.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"[o )2n]\",false)' src='http://m.hkgolden.com/faces/newyear/clown2.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"[sosadn]\",false)' src='http://m.hkgolden.com/faces/newyear/sosad.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"[sosad2n]\",false)' src='http://m.hkgolden.com/faces/newyear/sosad2.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"[sosad3n]\",false)' src='http://m.hkgolden.com/faces/newyear/sosad3.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"[bangheadn]\",false)' src='http://m.hkgolden.com/faces/newyear/banghead.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"[banghead2n]\",false)' src='http://m.hkgolden.com/faces/newyear/banghead2.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"[yipesn]\",false)' src='http://m.hkgolden.com/faces/newyear/yipes.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"[369n]\",false)' src='http://m.hkgolden.com/faces/newyear/369.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"[3692n]\",false)' src='http://m.hkgolden.com/faces/newyear/3692.gif'>                  <img class='clickicon' onclick='javascript:InsertText(\"[bouncern]\",false)' src='http://m.hkgolden.com/faces/newyear/bouncer.gif'>          </td></tr></table></div>          <div id='myTab_Content2' style='display:none;'>          <table><tr><td>          <img class='clickicon' src='http://images1.wikia.nocookie.net/__cb20080713124802/evchk/images/4/47/Offtopic.gif' onclick='javascript:InsertText(\"[offtopic]\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/spam.gif' onclick='javascript:InsertText(\"spammer\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/stupid.gif' onclick='javascript:InsertText(\":stupidd:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/feedtroll.gif' onclick='javascript:InsertText(\":feedtroll:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/ustupid.gif' onclick='javascript:InsertText(\":ustupid:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/givemebeer.gif' onclick='javascript:InsertText(\":givemedrink:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/perv.gif' onclick='javascript:InsertText(\":iperv:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/2342.gif' onclick='javascript:InsertText(\":lovely:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/nyancat.gif' onclick='javascript:InsertText(\":nc:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/bj.gif' onclick='javascript:InsertText(\":bj:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/dick-head.gif' onclick='javascript:InsertText(\":dh:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/homoswitch.gif' onclick='javascript:InsertText(\":hm:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/smash.gif' onclick='javascript:InsertText(\":smash:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/nerd.gif' onclick='javascript:InsertText(\":nerd:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/c.png' onclick='javascript:InsertText(\":cn:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/c493.gif' onclick='javascript:InsertText(\":ils:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/fd4r.gif' onclick='javascript:InsertText(\":dtd:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/dg.gif' onclick='javascript:InsertText(\":dg:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/run.gif' onclick='javascript:InsertText(\":run:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/Snorlax.png' onclick='javascript:InsertText(\":snorlax:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/jackoff.gif' onclick='javascript:InsertText(\":jo:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/movies.gif' onclick='javascript:InsertText(\":movies:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/smoke.gif' onclick='javascript:InsertText(\":smoke:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/sillyfool.gif' onclick='javascript:InsertText(\":sillyfool:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/simba.gif' onclick='javascript:InsertText(\":simba:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/smurf.gif' onclick='javascript:InsertText(\":smurf:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/taz.gif' onclick='javascript:InsertText(\":taz:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/yay.gif' onclick='javascript:InsertText(\":yay:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/typehere.gif' onclick='javascript:InsertText(\":typehere:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/jackoff.gif' onclick='javascript:InsertText(\":jo:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/thewave.gif' onclick='javascript:InsertText(\":thewave:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/faceplant.gif' onclick='javascript:InsertText(\":faceplant:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/bananaman.gif' onclick='javascript:InsertText(\":bananaman:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/killatroll.gif' onclick='javascript:InsertText(\":trollkill:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/afro.gif' onclick='javascript:InsertText(\":afro:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/fu.gif' onclick='javascript:InsertText(\":fu:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/usexy.gif' onclick='javascript:InsertText(\":usexy:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/birthday.gif' onclick='javascript:InsertText(\":hb:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/dogrun.gif' onclick='javascript:InsertText(\":dogrun:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/rant.gif' onclick='javascript:InsertText(\":rant:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/love.gif' onclick='javascript:InsertText(\":love:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/banned.gif' onclick='javascript:InsertText(\":banned:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/chillpill.gif' onclick='javascript:InsertText(\":chillpill:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/aghost.gif' onclick='javascript:InsertText(\":ghost:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/blahblah.gif' onclick='javascript:InsertText(\":blahblah:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/nanaboo.gif' onclick='javascript:InsertText(\":nanabooboo:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/killpuppy.gif' onclick='javascript:InsertText(\":killpuppy:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/doit.gif' onclick='javascript:InsertText(\":doit:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/finger2.gif' onclick='javascript:InsertText(\":finger:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/awwmonkey.gif' onclick='javascript:InsertText(\":awwmonkey:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/babysmoke.gif' onclick='javascript:InsertText(\":babysmoke:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/bananacock.gif' onclick='javascript:InsertText(\":bananacock:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/bearweed.gif' onclick='javascript:InsertText(\":bearweed:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/bitchslap.gif' onclick='javascript:InsertText(\":bitchslap:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/chattergoat.gif' onclick='javascript:InsertText(\":chattergoat:\",false);' height='20' />          </td></tr></table></div>          <div id='myTab_Content3' style='display:none;'>          <table><tr><td>          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/foreveralone.png' onclick='javascript:InsertText(\"[foreveralone]\",false);' height=32 />           <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/trollface.png' onclick='javascript:InsertText(\":tf:\",false);' height='32' />           <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/bitchplease.png' height='32' onclick='javascript:InsertText(\"[bitchplease]\",false);'>           <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/yuno.png' onclick='javascript:InsertText(\"[yuno]\",false);' height=32>           <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/megusta.png' onclick='javascript:InsertText(\"[megusta]\",false);' height=32>           <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/fuckyea.png' onclick='javascript:InsertText(\"[fuc kyea]\",false);' height=32>           <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/lol.png' onclick='javascript:InsertText(\"[lol]\",false);' height=32'>           <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/fap.png' onclick='javascript:InsertText(\"[fap]\",false);' height=32>           <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/soon.png' onclick='javascript:InsertText(\"[soon]\",false);' height=32>           <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/seriously.png' onclick='javascript:InsertText(\"[seriously?]\",false);' height=32>           <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/truestory.png' onclick='javascript:InsertText(\"[truestory]\",false);' height=32>          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/jackiechan.png' onclick='javascript:InsertText(\"[jackiechan]\",false);' height=32>           <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/fullpanel.png' onclick='javascript:InsertText(\"[fullpanel]\",false);' height=32>           <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/youdontsay.png' onclick='javascript:InsertText(\"[youdontsay?]\",false);' height=32>           <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/ragepose.png' onclick='javascript:InsertText(\"[ragepose]\",false);' height=32>           <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/soclose.png' onclick='javascript:InsertText(\"[soclose]\",false);' height=32>           <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/feellikeasir.png' onclick='javascript:InsertText(\"[feellikeasir]\",false);' height=32>           <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/ymscare.png' onclick='javascript:InsertText(\"[ymscare]\",false);' height=32>           <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/yesucan.png' onclick='javascript:InsertText(\"[yesucan]\",false);' height=32>           <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/rufkingkiddingme.png' onclick='javascript:InsertText(\"[rufkingkiddingme?]\",false);' height=32>           <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/deskflip.png' onclick='javascript:InsertText(\"[deskflip]\",false);' height=32>          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/okay.png' onclick='javascript:InsertText(\"[okay]\",false);' height=32>          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/gay.png' onclick='javascript:InsertText(\"[gaaaaaayyy]\",false);' height=32>          </td></tr></table></div>          <div id='myTab_Content4' style='display:none;'>          <table><tr><td>          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/byecry.gif' onClick='javascript:InsertText(\"[byecry]\",false);' height='20'>          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/byesad.gif' onClick='javascript:InsertText(\"[byesad]\",false);' height='20'>          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/grapeb.gif' onClick='javascript:InsertText(\"[grapebird]\",false);' height='20'>          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/small.gif' onClick='javascript:InsertText(\"[small]\",false);' height='20'>          <img class='clickicon' src='http://images2.wikia.nocookie.net/__cb20080713124039/evchk/images/2/21/Angel.gif' onclick='javascript:InsertText(\"[angel]\",false);' height='20'>          <img class='clickicon' src='http://images4.wikia.nocookie.net/__cb20080713124334/evchk/images/8/80/Dead.gif' onClick='javascript:InsertText(\"xx(\",false);' height='20'>          <img class='clickicon' src='http://images1.wikia.nocookie.net/__cb20080713124909/evchk/images/f/fb/Smile.gif' onClick='javascript:InsertText(\":.)\",false);' height='20'>          <img class='clickicon' src='http://images2.wikia.nocookie.net/__cb20060324164344/evchk/images/0/0f/Clown.gif' onClick='javascript:InsertText(\"o.)\",false);' height='20'>          <img class='clickicon' src='http://images3.wikia.nocookie.net/__cb20080713124510/evchk/images/1/1c/Frown.gif' onClick='javascript:InsertText(\":.(\",false);' height='20'>          <img class='clickicon' src='http://images3.wikia.nocookie.net/__cb20080713124321/evchk/images/c/c6/Cry1.gif' onClick='javascript:InsertText(\":~(\",false);' height='20'>          <img class='clickicon' src='http://images3.wikia.nocookie.net/__cb20080713124947/evchk/images/e/e0/Wink.gif' onClick='javascript:InsertText(\";.)\",false);' height='20'>          <img class='clickicon' src='http://images3.wikia.nocookie.net/__cb20080713124051/evchk/images/0/08/Angry.gif' onClick='javascript:InsertText(\":-[\",false);' height='20'>          <img class='clickicon' src='http://images.wikia.com/evchk/images/a/aa/Devil.gif' onClick='javascript:InsertText(\":-]\",false);' height='20'>          <img class='clickicon' src='http://images4.wikia.nocookie.net/__cb20080713124132/evchk/images/8/8c/Biggrin.gif' onClick='javascript:InsertText(\":.d\",false);' height='20'>          <img class='clickicon' src='http://images2.wikia.nocookie.net/__cb20080713124814/evchk/images/5/5c/Oh.gif' onClick='javascript:InsertText(\":.o\",false);' height='20'>          <img class='clickicon' src='http://images2.wikia.nocookie.net/__cb20080713124935/evchk/images/8/88/Tongue.gif' onClick='javascript:InsertText(\":.p\",false);' height='20'>          <img class='clickicon' src='http://images1.wikia.nocookie.net/__cb20080713124726/evchk/images/1/18/Kiss.gif' onClick='javascript:InsertText(\"^3^\",false);' height='20'>          <img class='clickicon' src='http://images3.wikia.nocookie.net/__cb20080713124956/evchk/images/7/7d/Wonder.gif' onClick='javascript:InsertText(\"?_?\",false);' height='20'>          <img class='clickicon' src='http://images3.wikia.nocookie.net/__cb20080713124004/evchk/images/f/fa/Agree1.gif' onclick='javascript:InsertText(\"#yup#\",false);' height='20'>          <img class='clickicon' src='http://images1.wikia.nocookie.net/__cb20080713124411/evchk/images/c/cd/Donno.gif' onClick='javascript:InsertText(\"#ng#\",false);' height='20'>          <img class='clickicon' src='http://images3.wikia.nocookie.net/__cb20080713124553/evchk/images/9/94/Hehe.gif' onClick='javascript:InsertText(\"#hehe#\",false);' height='20'>          <img class='clickicon' src='http://images4.wikia.nocookie.net/__cb20080713124740/evchk/images/5/51/Love.gif' onClick='javascript:InsertText(\"#love#\",false);' height='20'>          <img class='clickicon' src='http://images2.wikia.nocookie.net/__cb20080713124919/evchk/images/7/7b/Surprise.gif' onClick='javascript:InsertText(\"#oh#\",false);' height='20'>          <img class='clickicon' src='http://images1.wikia.nocookie.net/__cb20080713131042/evchk/images/a/a0/Chicken.gif' onClick='javascript:InsertText(\"#cn#\",false);' height='20'>          <img class='clickicon' src='http://images1.wikia.nocookie.net/__cb20080713124105/evchk/images/f/fd/Ass.gif' onclick='javascript:InsertText(\"#a ss#\",false);' height='20' />          <img class='clickicon' src='http://images2.wikia.nocookie.net/__cb20060324170818/evchk/images/b/b2/Sosad.gif' onclick='javascript:InsertText(\"[sosad]\",false);' height='20' />          <img class='clickicon' src='http://images3.wikia.nocookie.net/__cb20080713124537/evchk/images/5/5d/Good.gif' onclick='javascript:InsertText(\"#good#\",false);' height='20' />          <img class='clickicon' src='http://forum6.hkgolden.com/faces/ThumbUp.gif' onclick='javascript:InsertText(\"#good2#\",false);' height='20' />          <img class='clickicon' src='http://forum6.hkgolden.com/faces/ThumbDown.gif' onClick='javascript:InsertText(\"#bad#\",false);' height='20'>          <img class='clickicon' src='http://images1.wikia.nocookie.net/__cb20080713124605/evchk/images/c/c3/Hoho.gif' onClick='javascript:InsertText(\"#hoho#\",false);' height='20'>          <img class='clickicon' src='http://images3.wikia.nocookie.net/__cb20080713124619/evchk/images/9/9f/Kill.gif' onClick='javascript:InsertText(\"#kill#\",false);' height='20'>          <img class='clickicon' src='http://images2.wikia.nocookie.net/__cb20080713124231/evchk/images/e/e2/Bye.gif' onClick='javascript:InsertText(\"#bye#\",false);' height='20'>          <img class='clickicon' src='http://images2.wikia.nocookie.net/__cb20080713125036/evchk/images/2/2c/Z.gif' onClick='javascript:InsertText(\"z_z\",false);' height='20'>          <img class='clickicon' src='http://images4.wikia.nocookie.net/__cb20080713123825/evchk/images/8/8c/@.gif' onClick='javascript:InsertText(\"@_@\",false);' height='20'>          <img class='clickicon' src='http://images4.wikia.nocookie.net/__cb20080713123917/evchk/images/9/92/Adore.gif' onClick='javascript:InsertText(\"#adore#\",false);' height='20'>          <img class='clickicon' src='http://images3.wikia.nocookie.net/__cb20080713125011/evchk/images/e/e3/Wonder2.gif' onClick='javascript:InsertText(\"???\",false);' height='20'>          <img class='clickicon' src='http://images2.wikia.nocookie.net/__cb20060327092722/evchk/images/6/65/Banghead.gif' onClick='javascript:InsertText(\"[banghead]\",false);' height='20'>          <img class='clickicon' src='http://images4.wikia.nocookie.net/__cb20080713124217/evchk/images/c/cf/Bouncy.gif' onclick='javascript:InsertText(\"[bouncy]\",false);' height='20'>          <img class='clickicon' src='http://images1.wikia.nocookie.net/__cb20080713124245/evchk/images/c/cc/Censored.gif' onclick='javascript:InsertText(\"[censored]\",false);' height='20'>          <img class='clickicon' src='http://images2.wikia.nocookie.net/__cb20080713124455/evchk/images/5/52/Flowerface.gif' onclick='javascript:InsertText(\"[flowerface]\",false);' height='20'>          <img class='clickicon' src='http://images3.wikia.nocookie.net/__cb20080713124841/evchk/images/3/38/Shocking.gif' onclick='javascript:InsertText(\"[shocking]\",false);' height='20' />          <img class='clickicon' src='http://images1.wikia.nocookie.net/__cb20080713124827/evchk/images/8/8e/Photo.gif' onclick='javascript:InsertText(\"[photo]\",false);' height='20' />          <img class='clickicon' src='http://images1.wikia.nocookie.net/__cb20080713124439/evchk/images/7/78/Fire1.gif' onClick='javascript:InsertText(\"#fire#\",false);' height='20'>          <img class='clickicon' src='http://images2.wikia.nocookie.net/__cb20080713125021/evchk/images/d/da/Yipes.gif' onclick='javascript:InsertText(\"[yipes]\",false);' height='20' />          <img class='clickicon' src='http://images2.wikia.nocookie.net/__cb20061215004441/evchk/images/e/ed/369.gif' onClick='javascript:InsertText(\"[369]\",false);' height='20'>          <img class='clickicon' src='http://images4.wikia.nocookie.net/__cb20080713124146/evchk/images/e/ed/Bomb.gif' onClick='javascript:InsertText(\"[bomb]\",false);' height='20'>          <img class='clickicon' src='http://images2.wikia.nocookie.net/__cb20080713124855/evchk/images/c/c6/Slick.gif' onClick='javascript:InsertText(\"[slick]\",false);' height='20'>          <img class='clickicon' src='http://images4.wikia.nocookie.net/__cb20080713124520/evchk/images/f/fb/Fuck.gif' onClick='javascript:InsertText(\"[fuc k]\",false);' height='20'>          <img class='clickicon' src='http://images4.wikia.nocookie.net/__cb20080713124751/evchk/images/b/bd/No.gif' onClick='javascript:InsertText(\"#no#\",false);' height='20'>          <img class='clickicon' src='http://images2.wikia.nocookie.net/__cb20080713124203/evchk/images/2/2e/Bouncer.gif' onclick='javascript:InsertText(\"[bouncer]\",false);' height='20' />          <img class='clickicon' src='http://images2.wikia.nocookie.net/__cb20080713124648/evchk/images/a/ab/Kill2.gif' onclick='javascript:InsertText(\"#kill2#\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/tags/zedo.png' onclick='javascript:InsertText(\":U\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/m.gif' onclick='javascript:InsertText(\":B\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/xd.jpg' onclick='javascript:InsertText(\"xD\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/sad.gif' onclick='javascript:InsertText(\"D:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/kiss.gif' onclick='javascript:InsertText(\":*\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/above.gif' onclick='javascript:InsertText(\"^^\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/sethface.gif' onclick='javascript:InsertText(\"=[\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/dogrun.gif' onClick='javascript:InsertText(\"[dogrun]\",false);' height='20'>          <img class='clickicon' onclick='javascript:InsertText(\":$\",false)' src='http://forum.mess.be/style_emoticons/mess.be/msn_embarrassed.gif'>          <img class='clickicon' onclick='javascript:InsertText(\"(awkward)\",false)' src='http://m-net.arbornet.org/~lotw/emotes/8.gif'>          <img class='clickicon' onclick='javascript:InsertText(\"(drooling)\",false)' src='http://m-net.arbornet.org/~lotw/emotes/17.gif'>          <img class='clickicon' onclick='javascript:InsertText(\"(hush)\",false)' src='http://m-net.arbornet.org/~lotw/emotes/20.gif'>          <img class='clickicon' onclick='javascript:InsertText(\"(lusty)\",false)' src='http://m-net.arbornet.org/~lotw/emotes/22.gif'>          <img class='clickicon' onclick='javascript:InsertText(\"(disregard)\",false)' src='http://m-net.arbornet.org/~lotw/emotes/30.gif'>          <img class='clickicon' onclick='javascript:InsertText(\"(flighty)\",false)' src='http://m-net.arbornet.org/~lotw/emotes/31.gif'>          <img class='clickicon' onclick='javascript:InsertText(\"(shy)\",false)' src='http://m-net.arbornet.org/~lotw/emotes/33.gif'>          <img class='clickicon' onclick='javascript:InsertText(\"(beat)\",false)' src='http://m-net.arbornet.org/~lotw/emotes/34.gif'>          <img class='clickicon' onclick='javascript:InsertText(\"(brilliant)\",false)' src='http://m-net.arbornet.org/~lotw/emotes/46.gif'><img class='clickicon' src='' onclick='javascript:InsertText(\"()\",false);' height='20' />          <img class='clickicon' src='' onclick='javascript:InsertText(\"()\",false);' height='20' />          <img class='clickicon' src='' onclick='javascript:InsertText(\"()\",false);' height='20' />          <img class='clickicon' src='' onclick='javascript:InsertText(\"()\",false);' height='20' />          <img class='clickicon' src='' onclick='javascript:InsertText(\"()\",false);' height='20' />          <img class='clickicon' src='' onclick='javascript:InsertText(\"()\",false);' height='20' />          <img class='clickicon' src='' onclick='javascript:InsertText(\"()\",false);' height='20' />          </td></tr></table></div>          <div id='myTab_Content5' style='display:none;'>          <table><tr><td>          <img class='clickicon' src='http://images3.wikia.nocookie.net/__cb20080713125011/evchk/images/e/e3/Wonder2.gif' onclick='javascript:InsertText(\"???\",false);' height='20' />          <img class='clickicon' src='http://images1.wikia.nocookie.net/__cb20080713124245/evchk/images/c/cc/Censored.gif' onclick='javascript:InsertText(\"[censored]\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/drunk.gif' onclick='javascript:InsertText(\"drunk\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/coffee.gif' onclick='javascript:InsertText(\"coffee\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/beer.gif' onclick='javascript:InsertText(\"beer\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/money.gif' onclick='javascript:InsertText(\"money\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/hello.gif' onclick='javascript:InsertText(\"HELLO\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/hello2.gif' onclick='javascript:InsertText(\"Hello\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/awesome.gif' onclick='javascript:InsertText(\"Awesome\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/ohshit.gif' onclick='javascript:InsertText(\"ohshit\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/good.gif' onclick='javascript:InsertText(\"GOOD\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/hey.gif' onclick='javascript:InsertText(\"Hey\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/missyou.gif' onclick='javascript:InsertText(\"miss you\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/smile.gif' onclick='javascript:InsertText(\"Smile\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/thanks.gif' onclick='javascript:InsertText(\"Thanks\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/l0l.gif' onclick='javascript:InsertText(\"LOL\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/lol2.gif' onclick='javascript:InsertText(\"LoL\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/lol3.gif' onclick='javascript:InsertText(\"lolo\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/kim.png' onclick='javascript:InsertText(\"DotCom\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/asl.gif' onclick='javascript:InsertText(\"Asl\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/yes.gif' onclick='javascript:InsertText(\"Yes!\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/no.gif' onclick='javascript:InsertText(\"No!\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/sorry.gif' onclick='javascript:InsertText(\"Sorry\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/oops.gif' onclick='javascript:InsertText(\"Oops\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/boobies.gif' onclick='javascript:InsertText(\"boobies\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/sleepyz.gif' onclick='javascript:InsertText(\"sleepyz\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/partytime.gif' onclick='javascript:InsertText(\"partytime\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/pills.gif' onclick='javascript:InsertText(\"pills\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/iloveyou.gif' onclick='javascript:InsertText(\"I love you\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/lmao.gif' onclick='javascript:InsertText(\"Lmao\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/brb.gif' onclick='javascript:InsertText(\"Brb\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/fo.gif' onclick='javascript:InsertText(\"fokoff\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/hehe.gif' onclick='javascript:InsertText(\"HeHe\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/bye.gif' onclick='javascript:InsertText(\"Bye\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/haha.gif' onclick='javascript:InsertText(\"HaHaHa\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/thankyou.gif' onclick='javascript:InsertText(\"Thank You\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/sex_porn.gif' onclick='javascript:InsertText(\"watchp0rn\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/cool.gif' onclick='javascript:InsertText(\"COOL\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/hellokitty.gif' onclick='javascript:InsertText(\"ellokitty\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/yeskitty.gif' onclick='javascript:InsertText(\"yeskitty\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/nokitty.gif' onclick='javascript:InsertText(\"nokitty\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/rockingkitty.gif' onclick='javascript:InsertText(\"rockingkitty\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/dirtysanchez.gif' onclick='javascript:InsertText(\"dirtysanchez\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/goldenshower.gif' onclick='javascript:InsertText(\"goldenshower\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/teabag.gif' onclick='javascript:InsertText(\"teabag\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/hotkarl.gif' onclick='javascript:InsertText(\"hotkarl\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/america.gif' onclick='javascript:InsertText(\"america\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/ninja.gif' onclick='javascript:InsertText(\"ninja\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/noob.gif' onclick='javascript:InsertText(\"noob\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/powerpuffs.gif' onclick='javascript:InsertText(\"powerpuffs\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/foxx.jpg' onclick='javascript:InsertText(\"Foxx_\",false);' height='20' />          </td></tr></table></div>   <div id='myTab_Content6' style='display:none;'>          <table><tr><td>          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/cheers.gif' onclick='javascript:InsertText(\":cheers:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/damntrolls.gif' onclick='javascript:InsertText(\":damntrolls:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/dumbfuck.gif' onclick='javascript:InsertText(\":dumbfuck:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/eatabanana.gif' onclick='javascript:InsertText(\":eatabanana:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/evildevil.gif' onclick='javascript:InsertText(\":evildevil:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/evilit.gif' onclick='javascript:InsertText(\":evilit:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/atroll.gif' onclick='javascript:InsertText(\":atroll:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/grr.gif' onclick='javascript:InsertText(\":grr:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/hereisyourgirlfriend.gif' onclick='javascript:InsertText(\":hereisyourgirlfriend:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/iamnaked.gif' onclick='javascript:InsertText(\":iamnaked:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/kittygun.gif' onclick='javascript:InsertText(\":kittygun:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/kittyplay.gif' onclick='javascript:InsertText(\":kittyplay:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/kittyshock.gif' onclick='javascript:InsertText(\":kittyshock:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/lolmonkey.gif' onclick='javascript:InsertText(\":lolmonkey:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/pissy.gif' onclick='javascript:InsertText(\":grrpissy:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/poorbaby.gif' onclick='javascript:InsertText(\":awwpoorbaby:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/smokeit.gif' onclick='javascript:InsertText(\":smokeit:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/speakenglish.gif' onclick='javascript:InsertText(\":speakenglish:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/trollkill2.gif' onclick='javascript:InsertText(\":trollkill2:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/wiseman.gif' onclick='javascript:InsertText(\":wiseman:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/wtfelmo.gif' onclick='javascript:InsertText(\":wtfelmo:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/bong.gif' onclick='javascript:InsertText(\":bong:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/fart.gif' onclick='javascript:InsertText(\":fart:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/joint.gif' onclick='javascript:InsertText(\":joint:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/jointroll.gif' onclick='javascript:InsertText(\":jointroll:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/pissonyou.gif' onclick='javascript:InsertText(\":weewee:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/puffpuffpass.gif' onclick='javascript:InsertText(\":smokepuffpass:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/troll.png' onclick='javascript:InsertText(\":troll:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/trollcat.png' onclick='javascript:InsertText(\":trollcat:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/banhammer.png' onclick='javascript:InsertText(\":banhammer:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/bopatroll.gif' onclick='javascript:InsertText(\":bopatroll:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/bouncewitme.gif' onclick='javascript:InsertText(\":bouncewitme:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/brokenheart.gif' onclick='javascript:InsertText(\":brokenheart:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/burnbabyburn.gif' onclick='javascript:InsertText(\":burnbabyburn:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/butterfly.gif' onclick='javascript:InsertText(\":butterfly:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/dapimp.gif' onclick='javascript:InsertText(\":dapimp:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/gangbanger.gif' onclick='javascript:InsertText(\":gangbanger:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/huh.gif' onclick='javascript:InsertText(\":huh:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/ikillyou.gif' onclick='javascript:InsertText(\":ikillyou:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/kittykitty.gif' onclick='javascript:InsertText(\":kittykitty:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/lilpuppy.gif' onclick='javascript:InsertText(\":lilpuppy:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/teddy.gif' onclick='javascript:InsertText(\":teddy:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/alienlove.gif' onclick='javascript:InsertText(\":alienlove:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/babykiss.gif' onclick='javascript:InsertText(\":babykiss:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/bunny.gif' onclick='javascript:InsertText(\":bunny:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/byekitty.gif' onclick='javascript:InsertText(\":kittywave:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/cuddles.gif' onclick='javascript:InsertText(\":cuddles:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/dance.gif' onclick='javascript:InsertText(\":dance:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/elmo.gif' onclick='javascript:InsertText(\":elmo:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/fence.gif' onclick='javascript:InsertText(\":fence:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/froggy.gif' onclick='javascript:InsertText(\":froggy:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/funny.gif' onclick='javascript:InsertText(\":funny:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/geek.gif' onclick='javascript:InsertText(\":geek:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/helpwanted.gif' onclick='javascript:InsertText(\":helpwanted:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/kittybox.gif' onclick='javascript:InsertText(\":kittybox:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/mj.gif' onclick='javascript:InsertText(\":mj:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/lilly.gif' onclick='javascript:InsertText(\":lilly:\",false);' height='20' />          </td></tr></table></div>          <div id='myTab_Content7' style='display:none;'>          <table><tr><td>          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/tur.gif' onclick='javascript:InsertText(\":ntur:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/suicide.gif' onclick='javascript:InsertText(\":urboring:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/poo.gif' onclick='javascript:InsertText(\":doo:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/tatas.gif' onclick='javascript:InsertText(\":tatas:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/mrpenis.gif' onclick='javascript:InsertText(\":mrpenis:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/asperm.gif' onclick='javascript:InsertText(\":asperm:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/slappy.gif' onclick='javascript:InsertText(\":slappy:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/shakeit.gif' onclick='javascript:InsertText(\":shakeit:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/puppylicks.gif' onclick='javascript:InsertText(\":apuppylicks:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/ghostkisses.gif' onclick='javascript:InsertText(\":ghostkisses:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/andshewaslike.gif' onclick='javascript:InsertText(\":andshewaslike:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/bubblegum.gif' onclick='javascript:InsertText(\":bubblegum:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/muah.gif' onclick='javascript:InsertText(\":muah:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/happyfeet.gif' onclick='javascript:InsertText(\":happyfeet:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/flower.gif' onclick='javascript:InsertText(\":flower:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/batman.gif' onclick='javascript:InsertText(\":batman:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/rosey.gif' onclick='javascript:InsertText(\":rosey:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/wuv.gif' onclick='javascript:InsertText(\":wuv:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/!.gif' onclick='javascript:InsertText(\":!:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/sleepfok.gif' onclick='javascript:InsertText(\":sheepfok:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/wanker.gif' onclick='javascript:InsertText(\":fap:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/erect.gif' onclick='javascript:InsertText(\":erect:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/blowme.gif' onclick='javascript:InsertText(\":blowme:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/ghostiemeenie.gif' onclick='javascript:InsertText(\":ghostiemeenie:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/iloveghostie.gif' onclick='javascript:InsertText(\":iloveghostie:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/ilovemeenie.gif' onclick='javascript:InsertText(\":ilovemeenie:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/bish.gif' onclick='javascript:InsertText(\":bish:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/superhero.jpg' onclick='javascript:InsertText(\":superhippy:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/iamsorry.gif' onclick='javascript:InsertText(\":iamsorry:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/luvyou.gif' onclick='javascript:InsertText(\":luvyou:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/missu.gif' onclick='javascript:InsertText(\":missu:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/working.gif' onclick='javascript:InsertText(\":working:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/failtroll.gif' onclick='javascript:InsertText(\":failtroll:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/fatfail.gif' onclick='javascript:InsertText(\":fatfail:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/flyvideo.gif' onclick='javascript:InsertText(\":flyvideo:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/foreplay.gif' onclick='javascript:InsertText(\":foreplay:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/life.gif' onclick='javascript:InsertText(\":life:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/ragequit.gif' onclick='javascript:InsertText(\":ragequit:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/supbish.gif' onclick='javascript:InsertText(\":supbish:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/spreadlove.gif' onclick='javascript:InsertText(\":spreadlove:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/neo.gif' onclick='javascript:InsertText(\":neo:\",false);' height='20' />          </td></tr></table></div>          <div id='myTab_Content8' style='display:none;'>          <table><tr><td>          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/goodkitty.gif' onclick='javascript:InsertText(\":goodkitty:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/ignore.gif' onclick='javascript:InsertText(\":ignore:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/jelly.gif' onclick='javascript:InsertText(\":jelly:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/kissme.gif' onclick='javascript:InsertText(\":kissme:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/lollol.gif' onclick='javascript:InsertText(\":1lollol:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/old.gif' onclick='javascript:InsertText(\":1old:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/omg2.gif' onclick='javascript:InsertText(\":2omg:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/pourbeer.gif' onclick='javascript:InsertText(\":1pourdrink:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/smack.gif' onclick='javascript:InsertText(\":smack:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/spank.gif' onclick='javascript:InsertText(\":spank:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/splat.gif' onclick='javascript:InsertText(\":splat:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/swallow.gif' onclick='javascript:InsertText(\":swallow:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/teasekitty.gif' onclick='javascript:InsertText(\":teasekitty:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/yeasure.gif' onclick='javascript:InsertText(\":yeasure:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/blush.gif' onclick='javascript:InsertText(\":blush:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/brokenheart2.gif' onclick='javascript:InsertText(\":bh2:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/brokenhearted.gif' onclick='javascript:InsertText(\":bh3:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/failwhale.png' onclick='javascript:InsertText(\":failwhale:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/frenchkiss.gif' onclick='javascript:InsertText(\":frenchkiss:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/girl.gif' onclick='javascript:InsertText(\":girly:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/n00.gif' onclick='javascript:InsertText(\"(penguin)\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/mooning.png' onclick='javascript:InsertText(\"(mooning)\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/sick.gif' onclick='javascript:InsertText(\"(puke)\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/r.gif' onclick='javascript:InsertText(\"(r)\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/dmca.gif' onclick='javascript:InsertText(\":dmca:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/awesomeseth.gif' onclick='javascript:InsertText(\":awesomes:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/lovehippy.gif' onclick='javascript:InsertText(\":lovehippy:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/tro0p.gif' onclick='javascript:InsertText(\":tro0phere:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/wtfbishes.gif' onclick='javascript:InsertText(\":wtfbishes:\",false);' height='20' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/lotuslove.gif' onclick='javascript:InsertText(\":lotuslove:\",false);' height='20' />          </td></tr></table></div>   <div id='myTab_Content9' style='display:none;'>          <table><tr><td></div>          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/drunkmonkey.gif' onclick='javascript:InsertText(\"o_0\",false);' height='22' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/jtv/bored.gif' onclick='javascript:InsertText(\"=Z\",false);' height='22' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/jtv/cool.gif' onclick='javascript:InsertText(\"B]\",false);' height='22' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/jtv/horny.gif' onclick='javascript:InsertText(\"<3\",false);' height='22' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/jtv/pirate.gif' onclick='javascript:InsertText(\"R]\",false);' height='22' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/jtv/raspberry.gif'  onclick='javascript:InsertText(\":P\",false);' height='22' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/jtv/sk.gif' onclick='javascript:InsertText(\"=/\",false);' height='22' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/jtv/happy.gif' onclick='javascript:InsertText(\":]\",false);' height='22' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/jtv/surprised.gif' onclick='javascript:InsertText(\":O\",false);' height='22' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/jtv/wink.gif' onclick='javascript:InsertText(\";]\",false);' height='22' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/angry.gif' onclick='javascript:InsertText(\":@\",false);' height='22' />          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-c2b7132654a19e02-24x18.png' onclick='javascript:InsertText(\"Rl)\",false);'>          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-13d54d9e49b593b3-24x18.png' onclick='javascript:InsertText(\":l)\",false);'>          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-1a3f5d14a3190ef1-24x18.png' onclick='javascript:InsertText(\":lp\",false);'>          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-912125d7459226cc-24x18.png' onclick='javascript:InsertText(\";lP\",false);'>          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-e073a3348e028b40-24x18.png' onclick='javascript:InsertText(\"Bl)\",false);'>          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-aa3dd5587f06bb7b-24x18.png' onclick='javascript:InsertText(\";l)\",false);'>          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-67cde8d0b7916e57-24x18.png' onclick='javascript:InsertText(\"<l3\",false);'>          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-e9218a512e65b0de-24x18.png' onclick='javascript:InsertText(\"Olo\",false);'>          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-3a624954918104fe-19x27.png' onclick='javascript:InsertText(\"Kreygasm\",false);'>          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-ddc6e3a8732cb50f-25x28.png' onclick='javascript:InsertText(\"Kappa\",false);'>          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-6b8d1be08f244e92-19x27.png' onclick='javascript:InsertText(\"RedCoat\",false);'>          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-8b5aaae6e2409deb-20x27.png' onclick='javascript:InsertText(\"StoneLightning\",false);'>          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-1903cc415afc404c-20x27.png' onclick='javascript:InsertText(\"TheRinger\",false);'>          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-3a7ee1bc0e5c9af0-21x27.png' onclick='javascript:InsertText(\"JKanStyle\",false);'>          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-41f8a86c4b15b5d8-22x27.png' onclick='javascript:InsertText(\"OptimizePrime\",false);'>          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-551cd64fc3d4590a-21x27.png' onclick='javascript:InsertText(\"CougarHunt\",false);'>          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-95eb8045e7ae63b8-18x27.png' onclick='javascript:InsertText(\"EagleEye\",false);'>          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-35ae4e0e8dd045e1-22x27.png' onclick='javascript:InsertText(\"BrokeBack\",false);'>          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-740242272832a108-30x30.png' onclick='javascript:InsertText(\"BionicBunion\",false);'>          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-521420789e1e93ef-18x27.png' onclick='javascript:InsertText(\"PazPazowitz\",false);'>          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-680b6b3887ef0d17-21x28.png' onclick='javascript:InsertText(\"SwiftRage\",false);'>          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-39f055e707725b5d-18x27.png' onclick='javascript:InsertText(\"BrainSlug\",false);'>          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-ce52b18fccf73b29-25x32.png' onclick='javascript:InsertText(\"DansGame\",false);'>          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-18be1a297459453f-36x30.png' onclick='javascript:InsertText(\"PJSalt\",false);'>          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-1a1a8bb5cdf6efb9-24x32.png' onclick='javascript:InsertText(\"MVGame\",false);'>          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-1e3ccd969459f889-29x27.png' onclick='javascript:InsertText(\"BCWarrior\",false);'>          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-ac61a7aeb52a49d3-39x27.png' onclick='javascript:InsertText(\"MrDestructoid\",false);'>          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-ce027387c35fb601-22x27.png' onclick='javascript:InsertText(\"PicoMause\",false);'>          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-6aaca644ea5374c6-20x27.png' onclick='javascript:InsertText(\"JonCarnage\",false);'>          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-3dac9659e838fab2-20x27.png' onclick='javascript:InsertText(\"StrawBeary\",false);'>          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-2febb829eae08b0a-21x27.png' onclick='javascript:InsertText(\"GingerPower\",false);'>          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-92a1b848540e9347-23x27.png' onclick='javascript:InsertText(\"SuperVinlin\",false);'>          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-9f276ed33053ec70-32x32.png' onclick='javascript:InsertText(\"SMOrc\",false);'>          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-d14278fea8fad146-19x27.png' onclick='javascript:InsertText(\"FreakinStinkin\",false);'>          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-a5293e92212cadd9-21x27.png' onclick='javascript:InsertText(\"BlargNaut\",false);'>          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-d530ef454aa17093-21x27.png' onclick='javascript:InsertText(\"KevinTurtle\",false);'>          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-179f310b0746584d-23x27.png' onclick='javascript:InsertText(\"NoNoSpot\",false);'>          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-58f4782b85d0069f-17x27.png' onclick='javascript:InsertText(\"SoBayed\",false);'>          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-5d019b356bd38360-24x24.png' onclick='javascript:InsertText(\"SSSsss\",false);'>          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-b85003ffba04e03e-24x24.png' onclick='javascript:InsertText(\"PunchTrees\",false);'>          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-5342e829290d1af0-17x27.png' onclick='javascript:InsertText(\"UleetBackup\",false);'>          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-e13a8382e40b19c7-18x27.png' onclick='javascript:InsertText(\"ArsonNoSexy\",false);'>          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-a204e65775b969c5-27x27.png' onclick='javascript:InsertText(\"TehFunrun\",false);'>          <img class='clickicon' src='http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-89e474822a976928-19x27.png' onclick='javascript:InsertText(\"NinjaTroll\",false);'>          <img class='clickicon' src='http://www.justin.tv/images/emoticons/spacemarine/sm-skull.png?1ba4e7041c12' onclick='javascript:InsertText(\"SMSkull\",false);'>          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/staff.jpg' onclick='javascript:InsertText(\":staff:\",false);' height='15' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/admin.jpg' onclick='javascript:InsertText(\":admin:\",false);' height='15' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/host.jpg' onclick='javascript:InsertText(\":host:\",false);' height='15' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/mod.jpg' onclick='javascript:InsertText(\":mod:\",false);' height='15' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/pro.jpg' onclick='javascript:InsertText(\":apro:\",false);' height='15' />          <img class='clickicon' src='http://m-net.arbornet.org/~lotw/emotes/bot.jpg' onclick='javascript:InsertText(\":bot:\",false);' height='15' />          </td></tr></table></div>   <div id='myTab_Content10' style='display:none;'>          <table><tr><td></div>          </td></tr></table></div>   <div id='myTab_Content11' style='display:none;'>          <table><tr><td></div>          </td></tr></table></div>";
        chat_col.appendChild(hkgicon);
       }
   
    function ejtvover18bypass()
       {var results = document.getElementsByTagName('input');
        for (var j = 0;j < results.length;j++)
           {if (results[j].value == "I am 18 or older")
               {results[j].click();
                break;
               }
           }
       }
   
    function ejtvseecontentbypass()
       {var results = document.getElementsByTagName('input');
        for (var j = 0;j < results.length;j++)
           {if (results[j].value == "I wish to see this content anyway")
               {results[j].click();
                break;
               }
           }
       }
   
    function removeLogs()
       {
       gaTrackEvent = function(){};
       
        log_stat = function(){};
       }
   
    function init()
       {var loc = document.URL;
        if (loc.indexOf("meebo.html") != - 1)
           {return;
           }
        if (typeof ($) === 'undefined')
           {ddebug.log("Ignoring init call - prototype isn't setup");
            return;
           }
        if (typeof (Array.prototype.each) === 'undefined')
           {ddebug.log("Ignoring init call - prototype each isn't setup");
            return;
           }
        if (document.getElementById("chat_lines"))
           {has_chat = true;
            ddebug.log("Detected chat");
           }
        if (loc.indexOf( "/chat/embed?channel=extremejtv") != - 1)
           {//embedclearout();
           ejtvchatlogo();
            CurrentChat.admin_message("Extreme JTV Chat.");
           }
        ddebug.log("CALL Extremejtv init and enhance website and chat at " + loc);
        var js1 = document.createElement('script');
        js1.type = 'text/javascript';
        js1.src = "http://m-net.arbornet.org/~lotw/FancyZoom.js";
        js1head = document.getElementsByTagName('head')[0];
        if (js1head) js1head.appendChild(js1);
        var js2 = document.createElement('script');
        js2.type = 'text/javascript';
        js2.src = "http://m-net.arbornet.org/~lotw/FancyZoomHTML.js";
        js2head = document.getElementsByTagName('head')[0];
        if (js2head) js2head.appendChild(js2);
        var css1 = document.createElement('style');
        css1.type = 'text/css';
        css1.innerHTML =
          ".clickicon{                                                cursor:pointer;                                                vertical-align:bottom;                                                a{text-decoration:none}                                                a:hover{text-decoration:none}";
        css1head = document.getElementsByTagName('head')[0];
        if (css1head) css1head.appendChild(css1);
        setTimeout(delayed, 1000);//setTimeout(clearbackground, 1000);
          //setTimeout(clearbackground, 2000);
        ejtvclearout();
        if (typeof iab_rma_video_complete == "function") iab_rma_video_complete();
        ejtvover18bypass();
        brand();
        meeboAdvert();
        trypro();
        echat();
        if (has_chat)
           {ejtvchat_resize();
            ejtvchat_moderator();
            brandchat();
            icon();
           }
       }
   
    function delayed()
       {ddebug.log("CALL ExtremeJTV function delayed processed and loading.");
        ejtvover18bypass();
        ejtvseecontentbypass();
        ejtvclearout();
        ExtremeJtvbox();
       }
    init();
   }();

function extremejtv_action(action)
   {if (action == "adark")
       {$$('body').each(function(element)
           {element.style.background = '#000';
           });
        $$('.col_bg').each(function(element)
           {element.style.background = '#000';
           });
        $$('#chat_container').each(function(element)
           {element.style.background = '#000';
           });
        $$('#chat_lines').each(function(element)
           {element.style.background = '#FFF';
            element.style.color = '#B40404';
            element.style.border = 'none';
           });
        $$('#action_contents').each(function(element)
           {element.remove();
           });
        $$('.left_col_bottom').each(function(element)
           {element.remove();
           });
        $$('#chat_text_input').each(function(element)
           {element.style.background = '#333';
            element.style.color = '#FFF';
            element.style.border = 'solid 1px #666';
           });
        $$('#iconset').each(function(element)
           {element.style.background = '#000';
            element.style.color = '#FFF';
           });
        $$('#footer').each(function(element)
           {element.remove();
           });
        $$('#status').each(function(element)
           {element.style.border = 'nona';
           });
       }
    if (action == "light")
       {$$('body').each(function(element)
           {element.style.background = '#FFFFFF';
           });
        $$('.col_bg').each(function(element)
           {element.style.background = '#FFFFFF';
           });
        $$('#chat_container').each(function(element)
           {element.style.background = '#FFFFFF';
           });
        $$('#chat_lines').each(function(element)
           {element.style.background = '#FFFFFF';
            element.style.color = '#1EA2A2';
            element.style.border = 'none';
           });
        $$('#action_contents').each(function(element)
           {element.remove();
           });
        $$('.left_col_bottom').each(function(element)
           {element.remove();
           });
        $$('#chat_text_input').each(function(element)
           {element.style.background = '#FFFFFF';
            element.style.color = '#000';
            element.style.border = 'solid 1px #000000';
           });
        $$('#iconset').each(function(element)
           {element.style.background = '#FFFFFF';
            element.style.color = '#000';
           });
        $$('#footer').each(function(element)
           {element.remove();
           });
        $$('#status').each(function(element)
           {element.style.border = 'none';
           });
       }
    if (action == "clear")
       {$('chat_line_list').innerHTML = "";
        CurrentChat.admin_message("You cleared your own chat (<a href='http://m-net.arbornet.org/~lotw' target='_blank'>ExtremeJtv</a>)");
       }
    if (action == "refresh")
       {$('chat_line_list').innerHTML = "";
        CurrentChat.admin_message("You refreshed chat (<a href='http://m-net.arbornet.org/~lotw' target='_blank'>ExtremeJtv</a>)");
       }
    if (action == "version")
       {alert("You're currently using ExtremeJtv V0.2.0.0");
        CurrentChat.admin_message("You're currently using (<a href='http://m-net.arbornet.org/~lotw' target='_blank'>ExtremeJtv</a>) Addon Plugin V0.2.0.4 Script V2.2.5  Updates are automatic and will be done on refresh of JTV if a new version is available.");
       }
   }

function bjtv_action(action)
   {if (action == "dark")
       {$$('body').each(function(element)
           {element.style.background = '#000';
           });
        $$('.col_bg').each(function(element)
           {element.style.background = '#000';
           });
        $$('.left_col').each(function(element)
           {element.style.color = '#FFF';
           });
        $$('.left_col a').each(function(element)
           {element.style.color = '#666';
           });
        $$('#chat_container').each(function(element)
           {element.style.background = '#000';
           });
        $$('#chat_lines').each(function(element)
           {element.style.background = '#000';
            element.style.color = '#FFF';
           });
        $$('#iconset').each(function(element)
           {element.style.background = '#000';
            element.style.color = '#FFF';
           });
        $$('#related').each(function(element)
           {element.style.background = '#000';
            element.style.color = '#FFF';
           });
        $$('#chat_text_input').each(function(element)
           {element.style.background = '#333';
            element.style.color = '#FFF';
            element.style.border = 'solid 1px #666';
           });
        $$('#footer').each(function(element)
           {element.remove();
           });/*$$('#status').each(function(element) {
                element.style.border = 'none';
        });*/
        var status = document.getElementById("status_tab");
        if (status)
           {           status.setAttribute("style", "background:transparent;");
           }
        var description = document.getElementById("description_tab");
        if (description)
           {           description.setAttribute("style", "background:transparent;");
           }
        var badges = document.getElementById("badges_tab");
        if (badges)
           {badges.setAttribute("style", "background:transparent;");
           }
        var darkbutton = document.getElementById("darken");
        darkbutton.innerHTML = '<span class="main">Back to normal</span>';
        darkbutton.removeAttribute("onclick");
        darkbutton.setAttribute("onclick", "bjtv_action('nodark');");
       }
    if (action == "nodark")
       {if (location.href.split( "/")[3] != "chat")
           {document.getElementsByTagName("body")[0].removeAttribute("style");
            document.getElementById("left_col").removeAttribute("style");
            document.getElementById("status_tab").removeAttribute("style");
            var description = document.getElementById("description_tab");
            if (description)
               {description.removeAttribute("style");
               }
            var badges = document.getElementById("badges_tab");
            if (badges)
               {badges.removeAttribute("style");
               }
            document.getElementById("chat_lines").removeAttribute("style");
            document.getElementById("chat_lines").style.height = "375px";
            document.getElementById("chat_container").removeAttribute("style");
            document.getElementById("chat_container").style.marginBottom = "200px";
            document.getElementById("related").removeAttribute("style");
            document.getElementById("iconset").removeAttribute("style");
            document.getElementById("iconset").style.marginLeft = "-5px";
            document.getElementById("iconset").style.width = "100%";
            document.getElementById("iconset").style.height = "200px";
            document.getElementById("chat_text_input").removeAttribute("style");
            document.getElementById("report_arrow").removeAttribute("style");
            document.getElementById("share_arrow").removeAttribute("style");
            $$('.left_col a').each(function(element)
               {element.removeAttribute("style");
               });
            $$('.col_bg').each(function(element)
               {element.removeAttribute("style");
               });
            var darkbutton = document.getElementById("darken");
            darkbutton.innerHTML = '<span class="main">Darken Chat Window</span>';
            darkbutton.removeAttribute("onclick");
            darkbutton.setAttribute("onclick", "bjtv_action('dark'); bjtv_action('notrans');");
           }
        else 
           {document.getElementsByTagName("body")[0].removeAttribute("style");
            document.getElementById("chat_lines").removeAttribute("style");
            document.getElementById("chat_lines").style.height = "328px";
            document.getElementById("iconset").removeAttribute("style");
            document.getElementById("iconset").style.marginLeft = "-5px";
            document.getElementById("chat_text_input").removeAttribute("style");
            var darkbutton = document.getElementById("darken");
            darkbutton.innerHTML = '<span class="main">Darken Chat Window</span>';
            darkbutton.removeAttribute("onclick");
            darkbutton.setAttribute("onclick", "bjtv_action('dark');");
           }
       }
    if (action == "notrans")
       {$$('.right_col_rnd').each(function(element)
           {element.style.opacity = '1';
           });
        var transbutton = document.getElementById("trans");
        if (transbutton)
           {transbutton.innerHTML = '<spac class="main">Enable Translucent Chat</span>';
            transbutton.removeAttribute("onclick");
            transbutton.setAttribute("onclick", "bjtv_action('trans');");
           }
       }
    if (action == "trans")
       {$$('.right_col_rnd').each(function(element)
           {element.style.opacity = '0.85';
           });
        document.getElementById("iconset").style.opacity = "1";
        var transbutton = document.getElementById("trans");
        if (transbutton)
           {transbutton.innerHTML = '<spac class="main">Disable Translucent Chat</span>';
            transbutton.removeAttribute("onclick");
            transbutton.setAttribute("onclick", "bjtv_action('notrans');");
           }
       }
   }

function changeTab(index)
   {for (var i = 1;i <= 9;i++)
       {document.getElementById("myTab" + i).className = "normal";
        document.getElementById("myTab" + index).className = "selected";
        document.getElementById("myTab_Content" + i).style.display = "none";
       }
    document.getElementById("myTab_Content" + index).style.display = "block";
    document.getElementById('hkg3').selectedIndex = 0;
   }

function InsertText(text, splittable)
   {var TextArea = document.getElementById("chat_text_input");
    var l;
    if (TextArea)
       {TextArea.focus();
        if (splittable) l = text.split(/,/);
        else l = text;
        if ((typeof TextArea.selectionStart) != 'undefined')
           {var ti = TextArea.selectionEnd, ts = TextArea.selectionStart;
            if (l instanceof Array)
               {if (ti != ts)
                   {TextArea.value = TextArea.value.substring(0, ts) + l[0] + TextArea.value.substring(ts, ti) + l[2] + 
                      TextArea.value.substr(ti);
                    TextArea.selectionStart = ts + l[0].length;
                    TextArea.selectionEnd = ti + l[2].length - 1;
                   }
                else 
                   {TextArea.value = TextArea.value.substring(0, ts) + l[0] + l[1] + l[2] + TextArea.value.substr(ti);
                    TextArea.selectionStart = ti + l[0].length;
                    TextArea.selectionEnd = TextArea.selectionStart + l[1].length;
                   }
               }
            else 
               {TextArea.value = TextArea.value.substring(0, ts) + " " + l + TextArea.value.substr(ti);
                TextArea.selectionStart = TextArea.selectionEnd = ti + l.length + 1;
               }
           }
        else if (document.selection)
           {var r = document.selection.createRange();
            if (l instanceof Array)
               {if (r.text !== "") r.text = l[0] + r.text + l[2];
                else r.text = l[0] + l[1] + l[2];
               }
            else r.text = l + " ";
           }
        else 
           {TextArea.value += text + " ";
           }
        TextArea.focus();
       }
    document.getElementById('fc').selectedIndex = 0;
    document.getElementById('fs').selectedIndex = 0;
   }

function timer()
   {if (location.href.split( "/")[3] != "chat")
       {setInterval("setupZoom()", 100);
       }
   }

//seth new

//Custom mod & nickname
function custommod(){
custommod = document.createElement('style');
custommod.type = 'text/css';
custommod.innerHTML = ".line .siuming000{background-color: blue;}\
.line .test{background-color: #000000;}\
.line .sethee{background-color: #29088A;}\
.line .the_invisible_ghost{background-color: #133BDA;}\
.line .only94yo{background-color: #A5A5A5;}\
.line .snubwit{background-color: #B3B3FF;}\
.line .nothingformeok{background-color: red;}\
.line .fayefayefaye{background-color: red;}\
.customnickname {\
text-indent: 21px;\
text-indent: -9999px;\
display: inline-block;\
vertical-align: bottom;\
background-position: 0 center;\
background-repeat: no-repeat;\
height: 17px;}"
thecustommodhead = document.getElementsByTagName('head')[0];
if(thecustommodhead) thecustommodhead.appendChild(custommod);
}custommod();

//Move the banner back to the top on JTV
function fixjtvlayout(){
var banner = document.getElementById("action_contents");
if(banner){
banner.style.background = "transparent";
var player = document.getElementById("standard_holder");
var leftcolhead = player.parentNode;
leftcolhead.insertBefore(banner,player);

var banner_custom = document.getElementById("banner_custom");
if(banner_custom){
var about_contents = document.getElementById("about_contents");
var info = document.getElementById("info");
about_contents.insertBefore(banner_custom,info);
}
}
}//fixjtvlayout();