<?php

//	include "getPlugInfo.php";

	class pluginfo {
		var $mac;
		var $macc;
		var $name;
		var $location;
        	var $fksensor;
		var $status = "";
		var $current  = 0.0;
		var $instantpower  = 0.0;
		var $energyday = 0.0;
		var $energyweek = 0.0;
		var $energymonth = 0.0;
		var $bookingsday = 0;
		var $bookingsweek = 0;
		var $bookingsmonth = 0;
		var $pcday = 0;
		var $pcweek = 0;
		var $pcmonth = 0;
		var $infofromplug;
	};

	$plugs = array(
				   array('74DA3822C793','0987','37','POLIMI Shelter'),
				   array('74DA3822C797','0987','38','POLIMI Shelter'),
				   array('74DA3822D1C1','0987','39','POLIMI Shelter'),
				   array('74DA3822D1BF','0987','40','POLIMI Shelter'),
				   array('801F02FA6A99','1234','10','POLIMI office 126'),
				   array('801F02FA7E15','1234','41','POLIMI office 126')
			);
	$CLOUDLINK = "http://131.175.56.243:8080";	//Link to the cloud
	$FOLDERPLUG = "/plug/";

function getPlugInformation($ip, $pass)
{
        $strcmd = '/var/www/shelter/edimanager ' . $ip .' power -p ' . $pass .' | grep \'Info\|Alias\|State\|Power\|Current\|Energy\'';
        //echo $strcmd;
        //$output = shell_exec($strcmd);
        //echo "$ip: " . $output . "<br/>";
        if (strpos($output,'broken') !== false)
                return '';
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
        return $output;
}

/*
Info received from device 801F02FA7E15:
    Alias     : SSP1
    State           : ON
    Current        : 0.0054 [A]
    Power          : 0.07 [W]
    EnergyDay      : 0.046 [Wh]
    EnergyWeek     : 0.116 [Wh]
    EnergyMonth    : 0.884 [Wh]
*/
	$num = sizeof($plugs);
	//$log = "";
	for($i = 0, $oknum = 0; $i < $num; $i++){
                $n = new pluginfo();
                $n->mac = $plugs[$i][0];
                $n->fksensor = $plugs[$i][2];
		$n->location = $plugs[$i][3];
		$res = getPlugInformation($plugs[$i][0],$plugs[$i][1]);
		//$log = $log . $i . "~" . $res ."<hr/>";
		if($res !== ''){
			$pinfo = explode(PHP_EOL, $res);
			$ninfo = sizeof($pinfo);
			for($j = 0; $j < $ninfo; $j++){
				$pinfo[$j] = trim(preg_replace('/\s\s+/', ' ', $pinfo[$j]));
				$parts = explode(":",$pinfo[$j]);
				if(strpos($pinfo[$j],"Alias") !== false){
					$n->name = $parts[1];
				} else if (strpos($pinfo[$j],"State") !== false){
                                        $n->status = $parts[1];
                                } else if (strpos($pinfo[$j],"Current") !== false){
                                        $n->current = strchr($parts[1],"[A]",true);
                                } else if (strpos($pinfo[$j],"Power") !== false){
                                        $n->instantpower = strchr($parts[1],"[W]",true);
                                } else if (strpos($pinfo[$j],"EnergyDay") !== false){
                                        $n->energyday = strchr($parts[1],"[Wh]",true);
                                } else if (strpos($pinfo[$j],"EnergyWeek") !== false){
                                        $n->energyweek = strchr($parts[1],"[Wh]",true);
                                } else if (strpos($pinfo[$j],"EnergyMonth")!== false){
                                        $n->energymonth = strchr($parts[1],"[Wh]",true);
                                } else if (strpos($pinfo[$j],"device")!== false){
					$n->macc = substr($parts[0],-12,12);
				}
			}
			$n->infofromplug=$res[1];	
			$oknum++;
		} else
			$n->status = "unknown";
		$info[$i] = $n;
	}	
?>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
        <link href="assets/plugins/jquery-circliful/css/jquery.circliful.css" rel="stylesheet" type="text/css" />

        <link href="assets/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
        <link href="assets/css/core.css" rel="stylesheet" type="text/css" />
        <link href="assets/css/components.css" rel="stylesheet" type="text/css" />
        <link href="assets/css/icons.css" rel="stylesheet" type="text/css" />
        <link href="assets/css/pages.css" rel="stylesheet" type="text/css" />
        <link href="assets/css/menu.css" rel="stylesheet" type="text/css" />
        <link href="assets/css/responsive.css" rel="stylesheet" type="text/css" />
        <link href="assets/css/bootstrap-switch.css" rel="stylesheet" type="text/css" />
        <!-- HTML5 Shiv and Respond.js IE8 support of HTML5 elements and media queries -->
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
        <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
        <![endif]-->
	<title>POLIMI SHELTER</title>
<style>
.aright{text-align:right;}
@media (min-width:769px){.mobile{display:none}}
@media (max-width:960px){.nomobile{display:none}}
</style>

    <script type='text/javascript' src='//code.jquery.com/jquery-2.1.1.min.js'></script>
</head>
<body>
        <header id="topnav">
            <div class="topbar-main">
                <div class="container">

                    <!-- Logo container-->
                    <div class="logo">
                        <a href="index.html" class="logo"><i class="md md-equalizer"></i> <span>s m a r t   p l u g</span> </a>
                    </div>
                    <!-- End Logo container-->

                    <div class="menu-extras">
                        <div class="menu-item">
                            <!-- Mobile menu toggle-->
                            <a class="navbar-toggle">
                                <div class="lines">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </a>
                            <!-- End mobile menu toggle-->
                        </div>
                    </div>

                </div>
            </div>
            <div class="navbar-custom">
                <div class="container">
                <div id="navigation">

                </div>
            </div>
         </div>
        </header>
        <div class="wrapper">
            <div class="container">

            	<div class="row">
            		<div class="col-sm-12">
	    	        	Dashboard for POLIMI smart plugs <span class='mobile'><br/></span>(<span id="plugnum"></span> registered smart plugs, <?php echo sizeof($info); ?> reachable)
    	        	</div>
            	</div>

                <div class="row">
                	<?php 
                		for($ip = 0; $ip < $num; $ip++){
                			?>
		                    <div class="col-lg-4 col-sm-12">
		                        <div class="card-box">
		                            <h4 class="text-dark text-center header-title m-t-0 m-b-30"><?php echo $info[$ip]->name; ?> @ <?php echo $info[$ip]->location; ?></h4>
		                            <div class="widget-chart text-center">
		                            <?php
		                            if(strpos($info[$ip]->status,"ON") !== false) { ?>
		                            	<div class="chart circliful-chart m-b-30" data-startdegree="180" data-dimension="110" data-text="" data-width="20" data-fontsize="18" data-percent="100" data-fill="#5cb85c" data-fgcolor="#5cb85c" data-bgcolor="#ebeff2"></div>
		                            <? 
		                        	} else if(strpos($info[$ip]->status,"OFF") !== false) { ?>
		                            	<div class="chart circliful-chart m-b-30" data-startdegree="180" data-dimension="110" data-text="" data-info="" data-width="20" data-fontsize="18" data-percent="100" data-fill="#d9534f" data-fgcolor="#d9534f" data-bgcolor="#ebeff2"></div>
		                            <?php
		                            } else { //unknown
		                            ?>
		                            	<div class= "circliful-chart m-b-30 chart" data-startdegree="180" data-dimension="110" data-text="" data-info="" data-width="20" data-fontsize="18" data-percent="100" data-fill="#c3c6c5" data-fgcolor="#c3c6c5" data-bgcolor="#c3c6c5"></div>
		                            <?php	
		                            }
		                            ?>
                                    	   </div>

                                    <div class="table-responsive">
                                		<table class="table font-13">
    	                                <tbody>
                                            <tr>
                                                <td>Toggle state</td>
                                                <td>                                    
                                                <input data-style='btn-group-xs' class='form-control' name='togglestate' id='toggle:<?php echo $info[$ip]->mac; ?>' type='checkbox' data-off-title='OFF' data-on-title='ON' data-on-class='#5cb85c' data-off-class='#d9534f' <?php if(strpos($info[$ip]->status,"ON") !== false) echo "checked"; ?> />
                                                </td>                                               
                                            </tr>
        	                                <tr>
        	                                	<td>MAC address</td>
        	                                	<td><?php echo $info[$ip]->mac; ?></td>        	                                	
        	                                </tr>
        	                                <tr>
        	                                	<td></td>
        	                                	<td></td>        	                                	
        	                                </tr>
        	                                <tr>
        	                                	<td>Instant power [W]</td>
        	                                	<td><?php echo $info[$ip]->instantpower; ?></td>        	                                	
        	                                </tr>
        	                                <tr>
        	                                	<td>Current [A]</td>
        	                                	<td><?php echo $info[$ip]->current; ?></td>        	                                	
        	                                </tr>
        	                            </tbody>
        	                            </table>
        	                        </div>

                                    

                                    <div class="table-responsive">
                                		<table class="table font-13" >
                                    	<thead>
                                    		<tr>
                                        		<th class="font-13"></th>
                                        		<th class="font-13"></th>
			                                    <th class="font-13 aright">Today</th>
			                                    <th class="font-13 aright">This<br/> week</th>
			                                    <th class="font-13 aright">This<br/> month</th>
		                                    </tr>
	                                    </thead>
    	                                <tbody>
        	                                <tr>
        	                                	<td>Energy [Wh]</td>
        	                                	<td><i class="fa fa-flash text-success"></i></td>
        	                                	<td class='aright'><?php echo $info[$ip]->energyday; ?></td>
        	                                	<td class='aright'><?php echo $info[$ip]->energyweek; ?></td>
        	                                	<td class='aright'><?php echo $info[$ip]->energymonth; ?></td>        	                                	
        	                                </tr>
        	                                <tr>
        	                                	<td>Chargings</td>
        	                                	<td><i class="fa fa-plug"></i></td>
        	                                	<td class='aright'><span id="recday:<?php echo $info[$ip]->macc; ?>"></span></td>
        	                                	<td class='aright'><span id="recweek:<?php echo $info[$ip]->macc; ?>"></span></td>
        	                                	<td class='aright'><span id="recmonth:<?php echo $info[$ip]->macc; ?>"></span></td>                               </tr>
       	                                	<tr>
        	                                	<td>People</td>
        	                                	<td><i class="fa fa-users"></i></td>
        	                                	<td class='aright'><span id="upcday:<?php echo $info[$ip]->macc; ?>"></span></td>
        	                                	<td class='aright'><span id="upcweek:<?php echo $info[$ip]->macc; ?>"></span></td>
        	                                	<td class='aright'><span id="upcmonth:<?php echo $info[$ip]->macc; ?>"></span></td>        	                                	
        	                                </tr>
       	                                	<tr>
        	                                	<td>Total time [min]</td>
        	                                	<td><i class="fa fa-clock-o"></i></td>
        	                                	<td class='aright'><span id="timeday:<?php echo $info[$ip]->macc; ?>"></span></td>
        	                                	<td class='aright'><span id="timeweek:<?php echo $info[$ip]->macc; ?>"></span></td>
        	                                	<td class='aright'><span id="timemonth:<?php echo $info[$ip]->macc; ?>"></span></td>        	                                	
        	                                </tr>
        	                            </tbody>
        	                            </table>
        	                        </div>
		                        </div>
		                    </div>			                			
                			<?php
					
                		}
				//echo $log;
                	?>


                </div>
                <!-- end row -->


                <!-- end row -->




                <!-- Footer -->
                <footer class="footer text-right">
                    <div class="container">
                        <div class="row">
                            <div class="col-xs-12">
                                CBolk
                            </div>
                        </div>
                    </div>
                </footer>
                <!-- End Footer -->

            </div> <!-- end container -->
        </div>
        <!-- End wrapper -->



        <!-- jQuery  -->
        <script src="assets/js/jquery.min.js"></script>
        <script src="assets/js/bootstrap.min.js"></script>
        <script src="assets/js/detect.js"></script>
        <script src="assets/js/fastclick.js"></script>
        <script src="assets/js/jquery.blockUI.js"></script>
        <script src="assets/js/waves.js"></script>
        <script src="assets/js/wow.min.js"></script>
        <script src="assets/js/jquery.nicescroll.js"></script>
        <script src="assets/js/jquery.scrollTo.min.js"></script>
        <script src="assets/js/bootstrap-checkbox.js"></script>

        <!-- Counter Up  -->
        <script src="assets/plugins/waypoints/lib/jquery.waypoints.js"></script>
        <script src="assets/plugins/counterup/jquery.counterup.min.js"></script>

        <!-- circliful Chart -->
        <script src="assets/plugins/jquery-circliful/js/jquery.circliful.min.js"></script>
        <script src="assets/plugins/jquery-sparkline/jquery.sparkline.min.js"></script>

        <!-- skycons -->
        <script src="assets/plugins/skyicons/skycons.min.js" type="text/javascript"></script>

        <!-- Page js  -->
        <script src="assets/pages/jquery.dashboard.js"></script>

        <!-- Custom main Js -->
        <script src="assets/js/jquery.core.js"></script>
        <script src="assets/js/jquery.app.js"></script>

        <script src="assets/js/plugs.js"></script>

        <script type="text/javascript">
             jQuery(document).ready(function($) {
                var plugs = [["74DA3822C793","37"],["74DA3822C797","38"],["74DA3822D1C1","39"],["74DA3822D1BF","40"],["801F02FA6A99","10"],["801F02FA7E15","41"]];
                document.getElementById('plugnum').innerHTML = plugs.length;
                call(plugs);
		        $('.circliful-chart').circliful();
            });
        $(function(){
            $(':checkbox').checkboxpicker();
            $(':checkbox').checkboxpicker().change(function() {
                //toggle:74DA3822C793
                var plugid = $(this).attr("id");
                var plug = plugid.slice(7,19); 
                var value = $(this).prop('checked');
                var OnOff = "turnOff"; //default
                if(value)
                    OnOff = "turnOn";

                $.ajax({
                    type: 'post',
                    url: './api.php',
                    data: 'method=' + OnOff + '&plug=' + plugid + '&format=json',
                    beforeSend: function() {
                        alert("vado ");
                      },
                    success: function(response) {
                        alert(response);
                    }
                });             
            });
        });

        </script>

    </body>

</html>
