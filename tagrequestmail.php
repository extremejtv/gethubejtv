<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> 

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> 
<title>Sendemail Script</title>
</head>
<body bgcolor="white">

<!-- Reminder: Add the link for the 'next page' (at the bottom) --> 
<!-- Reminder: Change 'YourEmail' to Your real email --> 

<?php

$ip = $_POST['ip']; 
$httpref = $_POST['httpref']; 
$httpagent = $_POST['httpagent']; 
$visitor = $_POST['visitor']; 
$visitormail = $_POST['visitormail']; 
$visitormail2 = $_POST['visitormail2']; 
$notes = $_POST['notes'];
$attn = $_POST['attn'];
$attn2 = $_POST['attn2'];

if(empty($visitor) || empty($visitormail) || empty($notes )) {
echo "<h2>You didn't fill in all the fields!</h2>\n";
echo "<br /><a href='http://m-net.arbornet.org/~lotw/blank.php'><button class='pretty_button spacer small'><span class='main'>Close</span></button></a>\n";
die ("Try Again!"); 
}

$todayis = date("l, F j, Y, g:i a") ;

$attn = $attn ; 
$subject = $attn; 

$notes = stripcslashes($notes); 

$message = " $todayis [EST] \n
Color: $attn Tag: $visitormail New Username: $visitormail2 Color: $attn2  JTV User: $visitor\n
Message: $notes \n 
Additional Info : IP = $ip \n
Browser Info: $httpagent \n
Referral : $httpref \n
";

$from = "From: $visitor Tag: $visitormail\r\n";


mail("putemailaddresshere", $subject, $message, $from);

?>

<p align="center">
Date: <?php echo $todayis ?> <br />
Please allow us a few days to process tags.
<br />
<br />
Thank You, <?php echo $visitor ?> <br />
This is how it'll look: <br />
<br />
(<?php echo $attn ?> Tag) <?php echo $visitormail ?> (<?php echo $attn2 ?> Username) <?php echo $visitormail2 ?>
<br />
<br />
Your message to the ExtremeJTV Admin:<br /> <br />
<?php $notesout = str_replace("\r", "<br/>", $notes); 
echo $notesout; ?> 
<br /><br />
To prevent abuse your ip address is: <?php echo $ip ?> <br />
Please only request once and if you don't have a tag within a week<br />
You may submit another request again at that time. 

<br /><br />
Please help support jtvdev by clicking <a href='http://donate.jtvdev.com/' target=_blank>here</a> to <a href='http://donate.jtvdev.com/' target=_blank>donate</a> or by using the chipin feature on the next page.<br /><br />
<a href='http://m-net.arbornet.org/~lotw/ejtvchat.php'><button class='pretty_button spacer small'><span class='main'>Close</span></button></a> 
<br />
<br />
<CENTER>
<embed allowScriptAccess="always" src="http://www.chipin.com/widget/id/a530147a89e51cf5" flashVars="chipin_server=www%2Echipin%2Ecom" type="application/x-shockwave-flash" wmode="transparent" width="280" height="350"></embed>
</CENTER>
</p> 

</body>
</html>
