<?php
session_start();
//This script (PHP Login Without MySql v1.2)
//was designed by Aarmale.  If you like this
//script, comment at the SourceForge page!!
//-------------------------------------
require 'include.php';// change variables such as username and pass @ include.php!!!!!
//-------------------------------------
// if the submit button is pressed or the SESSION named login exists...
if (isset($_POST['submit']) || isset($_SESSION['login'])) {
// if the SESSION exists... (this is here if the submit button is pressed)
if (isset($_SESSION['login'])) {
// if the SESSION equls the MD5 hash...
if ($_SESSION['login'] == $hash) { 
//say your info!
echo "
<p align=center>
<font size=4>Logged In!</font>
</p><p align=left>
<a href=logout.php>Logout</a><BR><BR></p>";

} else {
//if the SESSION exists, but does not equal the hash say...
echo "Bad SESSION. Clear them out and try again.";
}
} else {
//info

// if the submit button is pressed, but the SESSION dose not exist, go through these steps...
if ($_POST['user'] == $user && $_POST['pass'] == $pass){
//user = your username & password = your password. acess granted. add SESSIONs and refresh.
$_SESSION["login"] = $hash;
header("Location: $_SERVER[PHP_SELF]");
} else {
echo "incorrect user/pass";
}
}
}
else {
//if none of the if/else statemants happen, show the login form...
print "<form action=";
echo "$self "; 
print "method=post>Login<fieldset><BR>Username: <input type=text name=user><BR>
Password: <input type=password name=pass><BR><input type=submit name=submit value=submit></fieldset></form>";

}
?>   <br/>   <br/><br/>




<?php
if ($ads == TRUE)  {   //if you set ads on (in includes.php) insert code below...
 ?>
  <!-- Start ads code-->
      <script type="text/javascript">
google_ad_client = "pub-<?php echo "$pub_code" ?>";
google_ad_width = 728;
google_ad_height = 90;
google_ad_format = "728x90_as";
google_ad_type = "text";
google_color_border = "FFFFFF";
google_color_bg = "FFFFCC";
google_color_link = "C3D9FF";
google_color_text = "000000";
google_color_url = "008000";
</script><script type="text/javascript" src="http://pagead2.googlesyndication.com/pagead/show_ads.js"></script>
    <?php
     } else {
     }
    
    ?>
