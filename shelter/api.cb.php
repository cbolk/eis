<?php
	include("./functions.php");
	$ip = getPlugInfo($_GET['plug']);
/*
    Polimi API
 
    This script provides a RESTful API interface 
 
    Input:
 
        $_GET['format'] = [ json | html | xml ]
        $_GET['method'] = []
 
    Output: A formatted HTTP response

*/
 
// --- Step 1: Initialize variables and functions
 
/**
 * Deliver HTTP Response
 * @param string $format The desired HTTP response content type: [json, html, xml]
 * @param string $api_response The desired HTTP response data
 * @return void
 **/


function deliver_response($format, $api_response){
 
    // Define HTTP responses
    $http_response_code = array(
        200 => 'OK',
        400 => 'Bad Request',
        401 => 'Unauthorized',
        403 => 'Forbidden',
        404 => 'Not Found',

    );
 
    
    // Set HTTP Response
    header('HTTP/1.1 '.$api_response['status'].$api_response['data'] );
    
    //CORS FILTERS
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Method: *");
    // Process different content types
    if( strcasecmp($format,'json') == 0 ){
 
        // Set HTTP Response Content Type
        header('Content-Type: application/json; charset=utf-8');
 
        // Format data into a JSON response
        $json_response = json_encode($api_response);
 
        // Deliver formatted data
        echo $json_response;
 
    }elseif( strcasecmp($format,'xml') == 0 ){
 
        // Set HTTP Response Content Type
        header('Content-Type: application/xml; charset=utf-8');
 
        // Format data into an XML response (This is only good at handling string data, not arrays)
        $xml_response = '<?xml version="1.0" encoding="UTF-8"?>'."\n".
            '<response>'."\n".
            "\t".'<code>'.$api_response['code'].'</code>'."\n".
            "\t".'<data>'.$api_response['data'].'</data>'."\n".
            '</response>';
 
        // Deliver formatted data
        echo $xml_response;
 
    }else{
 
        // Set HTTP Response Content Type (This is only good at handling string data, not arrays)
        header('Content-Type: text/html; charset=utf-8');
 
        // Deliver formatted data
        echo $api_response['data'];
 
    }
 
    // End script process
    exit;
 
}
 
// Define whether an HTTPS connection is required
$HTTPS_required = FALSE;
 
// Define whether user authentication is required
$authentication_required = FALSE;
 
// Define API response codes and their related HTTP response
$api_response_code = array(
    0 => array('HTTP Response' => 400, 'Message' => 'Error'),
    1 => array('HTTP Response' => 200, 'Message' => 'Success'),
    2 => array('HTTP Response' => 403, 'Message' => 'HTTPS Required'),
    3 => array('HTTP Response' => 401, 'Message' => 'Authentication Required'),
    4 => array('HTTP Response' => 401, 'Message' => 'Authentication Failed'),
    5 => array('HTTP Response' => 404, 'Message' => 'Invalid Request'),
    6 => array('HTTP Response' => 400, 'Message' => 'Invalid Response Format'),
);

// Set default HTTP response of 'ok'
$response['code'] = 0;
$response['status'] = 404;
$response['description'] = "";
$response['data'] = NULL;
 
// --- Step 2: Authorization
 
// Optionally require connections to be made via HTTPS
if( $HTTPS_required && $_SERVER['HTTPS'] != 'on' ){
    $response['code'] = 2;
    $response['status'] = $api_response_code[ $response['code'] ]['HTTP Response'];
    $response['data'] = $api_response_code[ $response['code'] ]['Message'];
 
    // Return Response to browser. This will exit the script.
    deliver_response($_GET['format'], $response);
}
 
// Optionally require user authentication
if( $authentication_required ){
 
    if( empty($_POST['username']) || empty($_POST['password']) ){
        $response['code'] = 3;
        $response['status'] = $api_response_code[ $response['code'] ]['HTTP Response'];
        $response['data'] = $api_response_code[ $response['code'] ]['Message'];
 
        // Return Response to browser
        deliver_response($_GET['format'], $response);
 
    }
 
    // Return an error response if user fails authentication. This is a very simplistic example
    // that should be modified for security in a production environment
    elseif( $_POST['username'] != 'foo' && $_POST['password'] != 'bar' ){
        $response['code'] = 4;
        $response['status'] = $api_response_code[ $response['code'] ]['HTTP Response'];
        $response['data'] = $api_response_code[ $response['code'] ]['Message'];
 
        // Return Response to browser
        deliver_response($_GET['format'], $response);
 
    }
 
}
 
// --- Step 3: Process Request


//------------TURN ON METHOD ----------
if($_GET['method']=='turnOn'){
    $response['code'] = turnOn($_GET['plug']);
    $response['status'] =  $api_response_code[ $response['code'] ]['HTTP Response']; //['HTTP Response'] to get the code
    $response['data'] = $api_response_code[ $response['code'] ]['Message'];
}

//------------TURN OFF METHOD ----------
if($_GET['method'] =='turnOff'){
    $response['code'] = turnOn($_GET['plug']);
    $response['status'] = $api_response_code[ $response['code'] ]['HTTP Response']; //['HTTP Response'] to get the code
    $response['data'] = $api_response_code[ $response['code'] ]['Message'];
    
}

//------------GET POWER METHOD ----------
if($_GET['method'] =='getPower'){
    list($code, $data) =getPowerValue($_GET['plug']);
    $response['description'] = "Instant Power";
    $response['code'] = $code;
    $response['status'] =  $api_response_code[ $response['code'] ]['HTTP Response']; //['HTTP Response'] to get the code
    $response['data'] = $data;
}

//------------GET ENERGY METHOD ----------
if($_GET['method'] =='getEnergy'){
    list($code, $data) =getEnergyValue($_GET['plug']);
    $response['code'] = $code;
     $response['description'] = "Energy";
    $response['status'] =  $api_response_code[ $response['code'] ]['HTTP Response']; //['HTTP Response'] to get the code
    $response['data'] = $data;
}


// Return Response to browser
//deliver_response($_GET['format'], $response);
 
?>
     
