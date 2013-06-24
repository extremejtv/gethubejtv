<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Tag Request Form </title>
</head>
<body bgcolor="white">

<form method="post" action="tagrequestmail.php">

<!-- DO NOT change ANY of the php sections -->
<?php
$ipi = getenv("REMOTE_ADDR");
$httprefi = getenv ("HTTP_REFERER");
$httpagenti = getenv ("HTTP_USER_AGENT");
?>

<input type="hidden" name="ip" value="<?php echo $ipi ?>" />
<input type="hidden" name="httpref" value="<?php echo $httprefi ?>" />
<input type="hidden" name="httpagent" value="<?php echo $httpagenti ?>" />
<a href="http://m-net.arbornet.org/~lotw/ejtvchat.php">Close</a>
<br />
<br />
Your JTV Username: <br />
<input type="text" name="visitor" size="35" />
<br />
Tag Color:<br />
<select name="attn" size="1">
<option value=" Blue ">Blue </option> 
<option value=" Red ">Red </option> 
<option value=" Black ">Black </option> 
<option value=" Green ">Green </option> 
<option value=" Orange ">Orange </option> 
<option value=" Grey ">Grey </option> 
</select><img src='http://s3.jtvdev.com/emotes/staff.jpg'><img src='http://s3.jtvdev.com/emotes/admin.jpg'><img src='http://s3.jtvdev.com/emotes/host.jpg'><img src='http://s3.jtvdev.com/emotes/mod.jpg'><img src='http://s3.jtvdev.com/emotes/pro.jpg'><img src='http://s3.jtvdev.com/emotes/bot.jpg'>
<br />
Requested Tag:<img src='tagexample.png'> <br />
<input type="text" name="visitormail" size="35" />
<br />
New Username to display in chat:<br />
<input type="text" name="visitormail2" size="35" /><br />
New Username Color:<br />
<select name="attn2" size="1">
<option value=" <font style='color: red;'>Red</font> "><font style='color: red;'>Red</font> </option> 
<option value=" <font style='color: green;'>Green</font> "><font style='color: green;'>Green</font> </option> 
<option value=" <font style='color: blue;'>Blue</font> "><font style='color: blue;'>Blue</font> </option> 
<option value=" <font style='color: purple;'>Purple</font> "><font style='color: purple;'>Purple</font> </option> 
<option value=" <font style='color: yellow;'>Yellow</font> "><font style='color: yellow;'>Yellow</font> </option> 
<option value=" <font style='color: violet;'>Violet</font> "><font style='color: violet;'>Violet</font> </option> 
<option value=" <font style='color: brown;'>Brown</font> "><font style='color: brown;'>Brown</font> </option> 
<option value=" <font style='color: black;'>Black</font> "><font style='color: black;'>Black</font> </option> 
<option value=" <font style='color: pink;'>Pink</font> "><font style='color: pink;'>Pink</font> </option> 
<option value=" <font style='color: orange;'>Orange</font> "><font style='color: orange;'>Orange</font> </option> 
<option value=" <font style='color: gold;'>Gold</font> "><font style='color: gold;'>Gold</font> </option> 
<option value=" <font style='color: maroon;'>Maroon</font> "><font style='color: maroon;'>Maroon</font> </option> 
<option value=" <font style='color: teal;'>Teal</font> "><font style='color: teal;'>Teal</font> </option> 
<option value=" <font style='color: navy;'>Navy</font> "><font style='color: navy;'>Navy</font> </option> 
<option value=" <font style='color: limegreen;'>Limegreen</font> "><font style='color: limegreen;'>Limegreen</font> </option> 
</select>
<br />
(Note: This form is to request a word tag and username change/color only!) <br />
<br />
Message:  
<br />
<textarea name="notes" rows="4" cols="40"></textarea>
<br />
<a href='http://donate.jtvdev.com/' target=_blank>Request an image tag/badge by donating now!</a><br />
<!--<input type="submit" value="Submit Tag Request" />-->
<b>Tag request form is offline at the moment!  Check back soon!</b>
<br />
<br />
</form>

</body>
</html>