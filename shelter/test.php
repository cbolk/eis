<?php

//        include("./functions.php");
//        $ip = getPlugInfo($_GET['plug']);

function getInfo($ip){
	$strcmd = '/var/www/shelter/edimanager ' .$ip .' pluginfo  -p 0987 | grep State | awk \'!/^#/ {print $3}\'';
	$output = shell_exec($strcmd);
	//return $strcmd;
	if (strpos($output,'ON') !== false)
    		return true;
	return false;

}

function getPlugInfo($plug_client_id){
	$plugs = array(array('74DA3822C793','0987'),
				   array('74DA3822C797','0987'),
				   array('74DA3822D1C1','0987'),
				   array('74DA3822D1BF','0987'),
				   array('801F02FA6A99','1234'),
				   array('801F02FA7E15','1234'));
	if($plug_client_id > sizeof($plugs))
		return array("NULL","NULL","NULL");	
	$pid = $plug_client_id - 1; 
	return array($plugs[$pid][0],"NULL",$plugs[$pid][1]);	
}


	$pid = $_GET['plug'];
    $ip = getPlugInfo($pid);


?>
<html>
	<head>
		<title>test <?php echo $pid . " (" . $ip[0] . ")";  ?></title>
	</head>
	<body>
	<?php
	//$res = getInfo($ip);	
	?>
		<?php echo $ip[0] . " / " . $ip[2]; ?>
	</body>
</html>
