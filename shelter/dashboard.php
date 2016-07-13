<?php

	class pluginfo {
		var $mac;
		var $name;
		var $status;
		var $current;
		var $instantpower;
		var $energyday;
		var $energyweek;
		var $energymonth;
		var $allinfo;
	};

	$plugs = array(array('74DA3822C793','0987'),
				   array('74DA3822C797','0987'),
				   array('74DA3822D1C1','0987'),
				   array('74DA3822D1BF','0987'),
				   array('801F02FA6A99','1234'),
				   array('801F02FA7E15','1234'));

	$num = sizeof($plugs);
	$info = [];
	for($i = 0, $j = 0; $i < $num; $i++){
		$output = shell_exec('/Users/bolchini/Sites/eis_totem/shelter/edimanager ' .$plugs[$i][0] .' power -p ' .$$plugs[$i][1].' | grep grep \'Alias\|State\|Power\|Current\|Energy\'');
		/*
		    Alias     : SP1
		    State           : OFF
		    Current        : 0 [A]
		    Power          : 0 [W]
		    EnergyDay      : 0 [Wh]
		    EnergyWeek     : 2.27 [Wh]
		    EnergyMonth    : 10.679 [Wh]
		*/
		echo $output;
		if($output != ""){
			$plug = new pluginfo();
			$plug->mac = $plugs[$i][0];

			$plug->allinfo = $data;
/*			$ninfo = sizeof($data);
			for($k = 0; $k < $ninfo; $k++){
				$chunks = split(":", $data[$k]);
				if(strpos($data[$k], "Alias") > 0){
					$plug->name = rtrim($chunks[1]);
				}
			}
			*/
			$info[$j] = $plug;
			$j++;
		} else {
			;
		}
	}
?>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <title><?php echo $j; ?></title>
</head>
<body>
	<div id="wrapper">
	<?php 
		for($i = 0; $i < $j; $i++)
			echo "$i " . $info[$i]->allinfo . "<br/>";
	?>
	</div>
</body>
</html>
