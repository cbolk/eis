<?php

	class pluginfo {
		var $mac;
		var $name;
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
				   array('74DA3822C793','0987','37'),
				   array('74DA3822C797','0987','38'),
				   array('74DA3822D1C1','0987','39'),
				   array('74DA3822D1BF','0987','40'),
				   array('801F02FA6A99','1234','10'),
				   array('801F02FA7E15','1234','41')
			);
	$CLOUDLINK = "http://131.175.56.243:8080";	//Link to the cloud
	$FOLDERPLUG = "/plug/";


	$num = sizeof($plugs);
	$info = [];
	for($i = 0; $i < $num; $i++){
		$n = new pluginfo();
		$n->mac = $plugs[$i][0];
		$n->fksensor = $plugs[$i][2];
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

        <!-- HTML5 Shiv and Respond.js IE8 support of HTML5 elements and media queries -->
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
        <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
        <![endif]-->
	<title>POLIMI SHELTER</title>
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
	    	        	Dashboard for POLIMI smart plugs (<span id="plugnum"></span> registered smart plugs)
    	        	</div>
            	</div>

                <div class="row">
                	<?php 
                		for($ip = 0; $ip < $num; $ip++){
                			?>
		                    <div class="col-lg-4 col-sm-12">
		                        <div class="card-box">
		                            <h4 class="text-dark text-center header-title m-t-0 m-b-30"><?php echo $info[$ip]->name; ?></h4>
		                            <div class="widget-chart text-center">
		                            <?php
		                            if($info[$ip]->status == "ON") { ?>
		                            	<div class="chart circliful-chart m-b-30" data-startdegree="180" data-dimension="110" data-text="<?php echo $info[$ip]->status; ?>" data-info="" data-width="20" data-fontsize="24" data-percent="100" data-fill="#5cb85c" data-fgcolor="#5cb85c" data-bgcolor="#5cb85c"></div>
		                            <? 
		                        	} else  if($info[$ip]->status == "ON") { ?>
		                        	<?php 
		                        	?>
		                            	<div class="chart circliful-chart m-b-30" data-startdegree="180" data-dimension="110" data-text="<?php echo $info[$ip]->status; ?>" data-info="" data-width="20" data-fontsize="24" data-percent="100" data-fill="#d9534f" data-fgcolor="#d9534f" data-bgcolor="#d9534f"></div>
		                            ?>
		                            <?php
		                            } else { //unknown
		                            ?>
		                            	<div class= "circliful-chart m-b-30 chart" data-startdegree="180" data-dimension="110" data-text="<?php echo $info[$ip]->status; ?>" data-info="" data-width="20" data-fontsize="24" data-percent="100" data-fill="#c3c6c5" data-fgcolor="#c3c6c5" data-bgcolor="#c3c6c5"></div>
		                            <?php	
		                            }
		                            ?>
                                    </div>

                                    <div class="table-responsive">
                                		<table class="table font-13">
    	                                <tbody>
        	                                <tr>
        	                                	<td>MAC address</td>
        	                                	<td><?php $info[$ip]->mac ?></td>        	                                	
        	                                </tr>
        	                                <tr>
        	                                	<td></td>
        	                                	<td></td>        	                                	
        	                                </tr>
        	                                <tr>
        	                                	<td>Instant power [Wh]</td>
        	                                	<td><?php $info[$ip]->power ?></td>        	                                	
        	                                </tr>
        	                                <tr>
        	                                	<td>Current [A]</td>
        	                                	<td><?php $info[$ip]->current ?></td>        	                                	
        	                                </tr>
        	                            </tbody>
        	                            </table>
        	                        </div>

                                    

                                    <div class="table-responsive">
                                		<table class="table font-13">
                                    	<thead>
                                    		<tr>
                                        		<th class="font-13"></th>
                                        		<th class="font-13"></th>
			                                    <th class="font-13">Today</th>
			                                    <th class="font-13">This week</th>
			                                    <th class="font-13">This month</th>
		                                    </tr>
	                                    </thead>
    	                                <tbody>
        	                                <tr>
        	                                	<td>Energy [Wh]</td>
        	                                	<td><i class="fa fa-flash text-success"></i></td>
        	                                	<td><?php echo $info[$ip]->energyday; ?></td>
        	                                	<td><?php echo $info[$ip]->energyweek; ?></td>
        	                                	<td><?php echo $info[$ip]->energymonth; ?></td>        	                                	
        	                                </tr>
        	                                <tr>
        	                                	<td>Chargings</td>
        	                                	<td><i class="fa fa-plug"></i></td>
        	                                	<td><span id="recday:<?php echo $info[$ip]->fksensor; ?>"></span></td>
        	                                	<td><span id="recweek:<?php echo $info[$ip]->fksensor; ?>"></span></td>
        	                                	<td><span id="recmonth:<?php echo $info[$ip]->fksensor; ?>"></span></td>                               </tr>
       	                                	<tr>
        	                                	<td>People</td>
        	                                	<td><i class="fa fa-users"></i></td>
        	                                	<td><span id="upcday:<?php echo $info[$ip]->fksensor; ?>"></span></td>
        	                                	<td><span id="upcweek:<?php echo $info[$ip]->fksensor; ?>"></span></td>
        	                                	<td><span id="upcmonth:<?php echo $info[$ip]->fksensor; ?>"></span></td>        	                                	
        	                                </tr>
       	                                	<tr>
        	                                	<td>Total time [min]</td>
        	                                	<td><i class="fa fa-users"></i></td>
        	                                	<td><span id="timeday:<?php echo $info[$ip]->fksensor; ?>"></span></td>
        	                                	<td><span id="timeweek:<?php echo $info[$ip]->fksensor; ?>"></span></td>
        	                                	<td><span id="timemonth:<?php echo $info[$ip]->fksensor; ?>"></span></td>        	                                	
        	                                </tr>
        	                            </tbody>
        	                            </table>
        	                        </div>
		                        </div>
		                    </div>			                			
                			<?php
                		}
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
                var plugs = ["37","38","39","40","10","41"];
                document.getElementById('plugnum').innerHTML = plugs.length;
                call(plugs);
            });

        </script>

    </body>

</html>
