<?php
//if the cookie named "login" exists...
if (isset($_COOKIE['login'])) {
//set cookie expiration time backwards, esentially deleting the cookie.
setcookie("login","",time()-3600);
//redirect beck to login.php...
header('Location: login.php');
}
else {  //if the cookie dosn't exist..
//redirect back to login.php...
header('Location: login.php');
}
?>
