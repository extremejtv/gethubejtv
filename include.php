<?php
//all the variables are here....
$user = 'myaccount'; //change 'myaccount' to your username
$pass = 'mypass'; //change 'mypass'to your password
$random1 = 'neehoyfantrakikitinoleileimootikananana';  //random word 1. No need to change
$random2 = 'vennistdaasnurnstuckgitunslotermyeryabierhunddaasoderdieflipperwaldgershput';  //random word 2. No need to change
$hash = md5($random1.$pass.$random2);
$self = $_SERVER['REQUEST_URI'];
$ads = FALSE;     //toggle ads
$pub_code = 'XXXXXXXXXXXXXXXX';   //16 digit code (given to you by AdSense), and is found after "pub-", e.g. "pub-1234567890123456"
?>
