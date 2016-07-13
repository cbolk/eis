<?php

//----------------------------------------------------------------------
//---------------------LOCAL FUNCTIONS --------------------------------
//----------------------------------------------------------------------

function getPlugInfo($plug_client_id){
	$plugs = array(array('74DA3822C793','0987'),
			   array('74DA3822C797','0987'),
			   array('74DA3822D1C1','0987'),
			   array('74DA3822D1BF','0987'),
			   array('801F02FA6A99','1234'),
			   array('801F02FA7E15','1234'));
	if($plug_client_id > sizeof($plugs))
		return array("NULL","NULL","NULL");	
	//echo "getPlugInfo\n";
	$pid = $plug_client_id - 1; 
	return array($plugs[$pid][0],"NULL",$plugs[$pid][1]);	
}

function getPlugCompleteStatus($plug_client_id)
{
        list($ip, $port, $pass) = getPlugInfo($plug_client_id);
	$strcmd = '/var/www/shelter/edimanager ' . $ip .' power -p ' . $pass .' | grep \'Alias\|State\|Power\|Current\|Energy\'';
	//echo $strcmd;
	$output = shell_exec($strcmd);
	//echo "$ip: " . $output . "<br/>";
        if (strpos($output,'broken') !== false)
                return array(0, 'no connection to the cloud');
	/*
	    Alias     : SP1
	    State           : OFF
	    Current        : 0 [A]
	    Power          : 0 [W]
	    EnergyDay      : 0 [Wh]
	    EnergyWeek     : 2.27 [Wh]
	    EnergyMonth    : 10.679 [Wh]
	*/
	//$output = trim(preg_replace('/\s+/', '', $output));
	//echo $output;
	return array(1,$output);
}


?>
