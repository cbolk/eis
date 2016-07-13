<?php

// GLOBAL VARIABLES
// $plug_1 =  array( 'initial_power' => "4",'final_power' => "5", 'reservation' => "NULL");
// $plug_2 =  array('initial_power' => "4",'final_power' => "5",'reservation' => "NULL");
// $plug_3 =  array('initial_power' => "4",'final_power' => "5",'reservation' => "NULL");
// $plug_4 =  array('initial_power' => "4",'final_power' => "5",'reservation' => "NULL");



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
	$pid = $plug_client_id - 1; 
	return array($plugs[$pid][0],"NULL",$plugs[$pid][1]);	
}

function isPlugOn($ip, $pass){
	$output = shell_exec('/Users/bolchini/Sites/eis_totem/shelter/edimanager ' .$ip .' pluginfo -p ' .$pass.' | grep State | awk \'!/^#/ {print $3}\'');
	// ./edimanager 74DA3822D1BF power -p 0987 | grep State | awk '!/^#/ {print $3}'
	if (strpos($output,'ON') !== false)
    		return true;
	return false;
	
}

function setPlugOn($ip, $pass){
        //$output = shell_exec('python /var/www/shelter/smartplug.py -H 10.79.0.247 -P 10001 -l admin -p 1234 -s ON');
        $res = shell_exec('/var/www/shelter/edimanager ' .$ip .' -p ' .$pass.' on');
        $output = shell_exec('/var/www/shelter/edimanager ' .$ip .' power -p ' .$pass.' | grep \'State\|EnergyDay\' | awk \'!/^#/ {print $3}\'');
        $output = trim(preg_replace('/\s\s+/', ' ', $output));
        if (strpos($output,'ON') !== false)
                return array(1,$output); //[1,"ON\n0.35"]

        return array(0,'0.0');
}


function setPlugOff($ip, $pass){
	//$output = shell_exec('python /Users/bolchini/Sites/eis_totem/shelter/smartplug.py -H 10.79.0.247 -P 10001 -l admin -p 1234 -s OFF');
	$res = shell_exec('/Users/bolchini/Sites/eis_totem/shelter/edimanager ' .$ip .' -p ' .$pass.' off');
	$output = shell_exec('/Users/bolchini/Sites/eis_totem/shelter/edimanager ' .$ip .' pluginfo -p ' .$pass.' | grep State | awk \'!/^#/ {print $3}\'');
	
	if (strpos($output,'OFF') !== false)
		return 1;
	return 0;
}

//----------------------------------------------------------------------
//----------------------------------------------------------------------
//----------------------------------------------------------------------


//----------------------------------------------------------------------
//---------------------API FUNCTIONS --------------------------------
//----------------------------------------------------------------------

//Returning Code: 
// 0 => array('HTTP Response' => 400, 'Message' => 'Unknown Error'),
// 1 => array('HTTP Response' => 200, 'Message' => 'Success'),
function getPlugStatus($plug_client_id){
        list($ip, $port, $pass) = getPlugInfo($plug_client_id);
        // $output = shell_exec('python /Users/bolchini/Sites/eis_totem/shelter/smartplug.py -H 10.79.0.247 -P 10001 -l admin -p 1234 -e');
        $strcmd = '/Users/bolchini/Sites/eis_totem/shelter/edimanager ' .$ip .' pluginfo -p ' .$pass.' | grep State | awk \'!/^#/ {print $3}\'';
        $output = shell_exec($strcmd);
        if (strpos($output,'broken') !== false)
                return array(0, 'no connection to the cloud');
        //Multiple spaces and newlines are replaced with a single space.
		//$output = trim(preg_replace('/\s\s+/', ' ', $output));
        if (strpos($output,'ON') !== false || strpos($output,'OFF') !== false)
			return array(1, $output); //[1,"ON"]
	return array(1,"unknown state (" . $ip . "): " . $output . '[' . $strcmd . ']');
}

//Parameters : 
// $plug_client_id => client side plug id (1/2/3/4)
//Returning Code: 
// 0 => array('HTTP Response' => 400, 'Message' => 'Unknown Error'),
// 1 => array('HTTP Response' => 200, 'Message' => 'Success'),
function turnOn($plug_client_id){

	list($ip, $port, $pass) = getPlugInfo($plug_client_id);

	//IF TRUE AN ERROR OCCURRED DURING CLOUD REQUEST 
	if(strpos($ip,'NULL') !== false and strpos($pass,'NULL') !== false)
		return 0;
			
	if(!isPlugOn($ip, $pass)){
		list($status,$out) = setPlugOn($ip, $pass);
		//echo "status (" . $status . ") out (" . $out .")";
		//$out = [1,"ON\n0.35"];
		if($status == 1){
	 	//if(setPlugOn($ip, $pass)){//if true => plug successfully turned on
			$items = preg_split("/\r\n|\n|\r/", $out);	
			$energynow = $items[1];
			//shell_exec('php /Users/bolchini/Sites/eis_totem/shelter/utilization_count.php '.$ip.' '.$port.' '.$pass.' '.$user.' > /dev/null 2>/dev/null &'); 
			// LAUNCHING THREAD TO STOP AUTOMATICALLY PLUG AFTER 30 MINUTES
		 	return array($status, $energynow);
		}
		return array(0,0);
	}
	return array(5,0);
	
}

//Returning Code: 
// 0 => array('HTTP Response' => 400, 'Message' => 'Unknown Error'),
// 1 => array('HTTP Response' => 200, 'Message' => 'Success'),
function turnOff($plug_client_id){

	list($ip, $port, $pass) = getPlugInfo($plug_client_id);

	//IF TRUE AN ERROR OCCURRED DURING CLOUD REQUEST  ==> return Code 0 
	if(strpos($ip,'NULL') !== false and strpos($pass,'NULL') !== false)
		return 0;

	if(isPlugOn($ip, $pass))
		if(setPlugOff($ip,  $pass)) //if true => plug successfully turned off
		//shell_exec('php /Users/bolchini/Sites/eis_totem/shelter/utilization_count.php '.$ip.' '.$port.' '.$pass.' '.$user.' > /dev/null 2>/dev/null &'); // LAUNCHING THREAD TO STOP AUTOMATICALLY PLUG AFTER 30 MINUTES
			return 1;
		//if error occurred during plug off return code 0
		return 0;
	return 5;			
	
}

//Returning Code: 
// 0 => array('HTTP Response' => 400, 'Message' => 'Unknown Error'),
// 1 => array('HTTP Response' => 200, 'Message' => 'Success'),
	
function getPowerValue($plug_client_id){

	list($ip, $port, $pass) = getPlugInfo($plug_client_id);

	// $output = shell_exec('python /Users/bolchini/Sites/eis_totem/shelter/smartplug.py -H 10.79.0.247 -P 10001 -l admin -p 1234 -w');
	$strcmd = '/Users/bolchini/Sites/eis_totem/shelter/edimanager ' .$ip .' power -p ' .$pass.' | grep \'Power\|Current\' | awk \'!/^#/ {print $3}\'';
	$output = shell_exec($strcmd);
	if (strpos($output,'broken') !== false)
		return 0; 
	//Multiple spaces and newlines are replaced with a single space.
	$res = trim(preg_replace('/\s\s+/', ' ', $output));
	return array(1, $res);	
}

//Returning Code: 
// 0 => array('HTTP Response' => 400, 'Message' => 'Unknown Error'),
// 1 => array('HTTP Response' => 200, 'Message' => 'Success'),
	
function getEnergyValue($plug_client_id){
	list($ip, $port, $pass) = getPlugInfo($plug_client_id);
	// $output = shell_exec('python /Users/bolchini/Sites/eis_totem/shelter/smartplug.py -H 10.79.0.247 -P 10001 -l admin -p 1234 -e');
	$output = shell_exec('/Users/bolchini/Sites/eis_totem/shelter/edimanager ' .$ip .' power -p ' .$pass.' | grep Energy | awk \'!/^#/ {print $3}\'');
	if (strpos($output,'broken') !== false)
		return 0; 
	//Multiple spaces and newlines are replaced with a single space.
	$output = trim(preg_replace('/\s\s+/', ' ', $output)); 
	return array(1, $output);	
}



?>
