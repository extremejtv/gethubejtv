<?php
$deny = array("xxx.xxx.xxx.xxx");
if (in_array ($_SERVER['REMOTE_ADDR'], $deny)) {
   header("location: http://s3.jtvdev.com/ipban.php");
   exit();
} ?>
<body bgcolor="white">
<a href='http://m-net.arbornet.org/~lotw/blank.php'><button class='pretty_button spacer small'><span class='main'>Hide</span></button></a> <a href='http://m-net.arbornet.org/~lotw/ejtvchat.php'><button class='pretty_button spacer small'><span class='main'>Refresh</span></button></a> <a href='http://www.justin.tv/chat/embed?channel=extremejtv' target='_blank'><button class='pretty_button spacer small'><span class='main'>Popout</span></button></a> <a href='http://m-net.arbornet.org/~lotw/tagrequest.php'><button class='pretty_button spacer small'><span class='main'>Tags</span></button></a> <a href='http://m-net.arbornet.org/~lotw/emotes.php'><button class='pretty_button spacer small'><span class='main'>Emotes</span></button></a> <a href='http://m-net.arbornet.org/~lotw/imdb.php'><button class='pretty_button spacer small'><span class='main'>IMDB</span></button></a> <a href='http://m-net.arbornet.org/~lotw/changelog.php'><button class='pretty_button spacer small'><span class='main'>?</span></button></a>
<br />
<iframe frameborder="0" scrolling="no" id="ExtremeJtvChat" src="http://www.justin.tv/chat/embed?channel=extremejtv" height="400" width="450"></iframe>
<br />Support ejtv and the hard work we put in to it to keep it alive!<br />
<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank">
<input type="hidden" name="cmd" value="_s-xclick">
<input type="hidden" name="hosted_button_id" value="PA7GEVP4X5WQJ">
<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
<img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">
</form>
</body>