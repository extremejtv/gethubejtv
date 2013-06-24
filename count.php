<?php
//Open images directory
$dir = dir("emotes");

//List files in images directory
while (($file = $dir->read()) !== false)
{
echo "Emote: " . $file . "<br />";
}

$dir->close();
?> 