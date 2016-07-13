

  //------------------------------------------------------------------------------
  //------------------------------BACK BUTTON LISTENER----------------------------
  //------------------------------------------------------------------------------



  var parameters = location.search.substring(1).split("&");
  var temp = parameters[0].split("=");
  demonstrator_name = unescape(temp[1]);

  building_id = unescape( (location.search.substring(1).split("&")[1].split("="))[1].split("-")[0]);

  function go_back_building(){
    window.open("./building.html?d="+demonstrator_name+"&cid="+building_id+"#1","_self");
  }

  function go_back_demonstrator(){
    var parameters = location.search.substring(1).split("&");
    var temp = parameters[0].split("=");
    var demonstrator_name = unescape(temp[1]);

    if(demonstrator_name.indexOf("Polimi") > -1){
      window.open("./demonstrator.html?cid=1#1","_self");
    }else{
      window.open("./demonstrator.html?cid=2#1","_self");
    }
  }


  //------------------------------------------------------------------------------
  //------------------------------ROOMS DATA --------------------------------------
  //------------------------------------------------------------------------------

  /* internal parameters */
  var CO2_ID = 4;
  var SMART_PLUGS_ID = 6;
  var POWER_ID = 9;
  var ENERGY_ID = 10;
  var TEMPERATURE = 10;
  var LUMINANCE = 3;
  var HUMIDITY = 10;

  //-----------GLOBAL VARIABLES ------------------
  var date = new Date();

  var room = {
    id : unescape( (location.search.substring(1).split("&")[2].split("="))[1]),
  }


  /* retieves information about the room */
  /* {"roomid":1,"label":"ufficio 126","ipgateway":"131.175.120.25 ","roomcode":"0301001053"} */
  function get_data_room(){
    var link = 'http://131.175.21.162:8080/rooms/'+room.id+'/details';
    return $.ajax({
      type:'GET',
      url: link,
      crossDomain: true,  
      cache:true,
      success: function(data){
        set_room_info(data);
      },
      error: function(xhr,textStatus,err){
        ////alert("text status: " + textStatus+ " error: " + err+" status: " + xhr.status+" responseText: "+ xhr.responseText+" readyState: " + xhr.readyState);
        
      },   
    });
  }

  /* sets html text on the room.html page with the room data */
  function set_room_info(data){
    if(document.getElementById("brand_title"))
      document.getElementById("brand_title").innerHTML = modifyString(data.label);
    if(document.getElementById("room_title"))
      document.getElementById("room_title").innerHTML = modifyString(data.label);
  }

  /* retrieves the variables monitored in the room */
  /* [{"identifier":1,"name":"temperatura"},{"identifier":6,"name":"potenza attiva"},
      {"identifier":10,"name":"energia attiva meter"},{"identifier":3,"name":"luminositÃ "},
      {"identifier":7,"name":"sensori adb"},{"identifier":2,"name":"umiditÃ "},
      {"identifier":9,"name":"potenza attiva meter"},{"identifier":4,"name":"livello co2"}] */
  function get_variables_room(){
    var link = 'http://131.175.21.162:8080/variables/room/'+room.id+'/list';
    return $.ajax({
      type:'GET',
      url: link,
      crossDomain: true,  
      cache:true,
      error: function(xhr,textStatus,err){
            ////alert("text status: " + textStatus+ " error: " + err+" status: " + xhr.status+" responseText: "+ xhr.responseText+" readyState: " + xhr.readyState);
      },   
    });
  }


  function get_sensors_room(){
    var link = 'http://131.175.21.162:8080/sensors/room/all/'+room.id;
    return $.ajax({
      type:'GET',
      url: link,
      crossDomain: true,
      cache:true,
      error: function(xhr,textStatus,err){
      ////alert("text status: " + textStatus+ " error: " + err+" status: " + xhr.status+" responseText: "+ xhr.responseText+" readyState: " + xhr.readyState);    
      },   
    });
  }



  //-------------ROOM FEEDBACK INFO

  function get_feedback_room(type){
               //var url ='http://131.175.21.162:8080/comfortfeedbacks/app/building/1/2015/04/20?var='+type;
                var url = 'http://131.175.21.162:8080/comfortfeedbacks/app/room/'+room.id+'/'+date.getFullYear()+'/?var='+type;    
                  return $.ajax({
                  type:'GET',
                  url: url,
                  cache:true,
                  crossDomain: true,
                 error: function(xhr,textStatus,err)
                    {
                    ////alert("text status: " + textStatus+ " error: " + err+" status: " + xhr.status+" responseText: "+ xhr.responseText+" readyState: " + xhr.readyState);
                    
                    },   
                });
              }

  //------------------ROOM SENSORS DATA --------------------

  function get_variable_day(type){
    var url='';
    if(type==POWER_ID || type == CO2_ID){ /* power or co2 */
         /* no aggregation */
         /* http://131.175.21.162:8080/measurements/noaggr/sensor/variable/24/2015/12/03 
            url = 'http://131.175.21.162:8080/measurements/noaggr/sensor/variable/24/'+date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate();
         */
         /* aggregated */
         /* http://131.175.21.162:8080/measurements/noaggr/sensor/variable/24/2015/12/03 
            url = 'http://131.175.21.162:8080/measurements/summed/room/1/variableclass/6/'+date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate();  */
      url = 'http://131.175.21.162:8080/measurements/15min/room/'+room.id+'/variableclass/'+type+'/'+date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate();                 
    } else {
      url ='http://131.175.21.162:8080/measurements/60min/room/'+room.id+'/variableclass/'+type+'/'+date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate(); 
    }
     //var url = 'http://131.175.21.162:8080/measurements/15min/room/1/variableclass/1/2015/04/20';
                //return $.getJSON(url);
    return $.ajax({
      type:'GET',
      url: url,
      cache: true,
      crossDomain: true,
      error: function(xhr,textStatus,err){
        //alert("text status: " + textStatus+ " error: " + err+" status: " + xhr.status+" responseText: "+ xhr.responseText+" readyState: " + xhr.readyState);
      },   
    });
  }

  function get_variable_month(type){
    var url = 'http://131.175.21.162:8080/measurements/60min/room/'+room.id+'/variableclass/'+type+'/'+date.getFullYear()+'/'+(date.getMonth()+1);    
    //var url = 'http://131.175.21.162:8080/measurements/15min/room/1/variableclass/1/2015/04/20';
                //return $.getJSON(url);
    return $.ajax({
      type:'GET',
      url: url,
      cache: true,
      crossDomain: true,
      error: function(xhr,textStatus,err){
                    //alert("text status: " + textStatus+ " error: " + err+" status: " + xhr.status+" responseText: "+ xhr.responseText+" readyState: " + xhr.readyState);
      },   
    });
  }

  function get_variable_week(type){

                var url = 'http://131.175.21.162:8080/measurements/60min/room/'+room.id+'/variableclass/'+type+'/'+date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate()+"?weekly=true";    
    //var url = 'http://131.175.21.162:8080/measurements/15min/room/1/variableclass/1/2015/04/20';
                //return $.getJSON(url);
               return $.ajax({
                  type:'GET',
                  url: url,
                  cache: true,
                  crossDomain: true,
                 error: function(xhr,textStatus,err)
                    {
                    //alert("text status: " + textStatus+ " error: " + err+" status: " + xhr.status+" responseText: "+ xhr.responseText+" readyState: " + xhr.readyState);
                    
                    },   
                });

  }

  function get_variable_year(type){

                var url = 'http://131.175.21.162:8080/measurements/60min/room/'+room.id+'/variableclass/'+type+'/'+date.getFullYear();    
    //var url = 'http://131.175.21.162:8080/measurements/15min/room/1/variableclass/1/2015/04/20';
                //return $.getJSON(url);
               return $.ajax({
                  type:'GET',
                  url: url,
                  cache: true,
                  crossDomain: true,
                 error: function(xhr,textStatus,err)
                    {
                    //alert("text status: " + textStatus+ " error: " + err+" status: " + xhr.status+" responseText: "+ xhr.responseText+" readyState: " + xhr.readyState);
                    
                    },   
                });

  }


  function animate_counters_room(n_sensors,n_feedbacks){
    $('.anima').waypoint(function(){
      $.getScript("js/countUp.js", function(){
        var options = {
          useEasing : true,
          useGrouping : true,
          separator : ',',
          decimal : '.',
          prefix : '',
          suffix : ''
        };
        var feedback = new countUp("sensor_count", 0, n_sensors, 0, 2.5, options);
        var rooms = new countUp("room_count", 0, n_feedbacks, 0, 2.5, options);
        // var user = new countUp("user_count", 0, 60, 0, 1, options);
        feedback.start();
        rooms.start();
        // user.start();
      });
    });
  }


  //------------------------------------------------------------------------------
  //----------------------------UTILITY FUNCTION ---------------------------------
  //------------------------------------------------------------------------------
      function modifyString(string){
      
      if(string.toLowerCase().indexOf("edificio") >= 0){ //hard-translation in english
                   string = string.replace("edificio","building");
       }else
        if(string.toLowerCase().indexOf("ufficio") >= 0){ //hard-translation in english
                   string = string.replace("ufficio","office");
       }else if(string.toLowerCase().indexOf("aula") >= 0){ //hard-translation in english
                   string = string.replace("aule","classroom");
       }
       
      return string.charAt(0).toUpperCase() + string.slice(1);
    }



  function create_Loader(){
    var parameters = location.search.substring(1).split("&");
    var temp = parameters[0].split("=");
    id = unescape(temp[1]);
    var image ='<img src="img/'+id+'.png" class="animated fadeInDown" alt="">'
      $(image).appendTo("#load");
    var rest = ' <div class="spinner">'+
               '<div class="bounce1"></div>'+
               '<div class="bounce2"></div>'+
               '<div class="bounce3"></div>'+
               '</div>'
        $(rest).appendTo("#load");
  }

    //------------------------AMBIENT CHART BUTTONS LISTENER -----------------

    function isSmartSpace(variables){
      var nvars = variables[0].length; 
    	for(i = 0; i < nvars; i++)
    		if(variables[0][i].identifier == POWER_ID || variables[0][i].identifier == ENERGY_ID || variables[0][i].identifier == SMART_PLUGS_ID)
    			return true;
      return false;
  }


  function create_room_menu(isSmart){
      var column_class = " ";
      if(isSmart){    
          smart_room_menu();
      }else{
          normal_room_menu();
      }

  }

  function smart_room_menu(){
  	   			 $("#room_menu").html('');
  	   			  var energy = 
               '<div class="col-md-3">'+
               '<div class="main-item ">'+
               '<a id="click_power" onclick="window.scroll(0,900);">'+
               '<i class="fa fa-area-chart fa-2x hvr-bounce-in""></i></a><h3>Power</h3>'+
               '</div></div>';
              var ambient = 
               '<div class="col-md-3 ">'+
               '<div class="main-item ">'+
               '<a id="click_ambient" onclick="window.scroll(0,1848);">'+
               '<i class="fa fa-line-chart fa-2x hvr-bounce-in""></i></a><h3>Ambient</h3>'+
               '</div></div>';

               var comfort = 
               '<div class="col-md-3 ">'+
               '<div class="main-item ">'+
               '<a id="click_comfort" onclick="window.scroll(0,2804);">'+
               '<i class="fa fa-pie-chart fa-2x hvr-bounce-in""></i></a><h3>Comfort</h3>'+
               '</div></div>';

               var details = 
               '<div class="col-md-3 ">'+
               '<div class="main-item ">'+
               '<a id="click_details" onclick="window.scroll(0,3710);">'+
               '<i class="fa fa-tachometer fa-2x hvr-bounce-in""></i></a><h3>Details</h3>'+
               '</div></div>';
               
               
               $(energy).appendTo("#room_menu"); //adding element to the menu
               $(ambient).appendTo("#room_menu"); //adding element to the menu
               $(comfort).appendTo("#room_menu"); //adding element to the menu
               $(details).appendTo("#room_menu"); //adding element to the menu


  }

  function normal_room_menu(){
  	   			 $("#room_menu").html('');
              var ambient = 
               '<div class="col-lg-4 col-md-4">'+
               '<div class="main-item">'+
               '<a id="click_ambient" onclick="window.scroll(0,900);">'+
               '<i class="fa fa-line-chart fa-2x""></i></a><h3>Ambient</h3>'+
               '</div></div>';

               var comfort = 
               '<div class="col-lg-4 col-md-4">'+
               '<div class="main-item ">'+
               '<a id="click_comfort" onclick="window.scroll(0,1848);">'+
               '<i class="fa fa-pie-chart fa-2x""></i></a><h3>Comfort</h3>'+
               '</div></div>';

               var details = 
               '<div class="col-lg-4 col-md-4">'+
               '<div class="main-item ">'+
               '<a id="click_details" onclick="window.scroll(0,2804);">'+
               '<i class="fa fa-tachometer fa-2x""></i></a><h3>Details</h3>'+
               '</div></div>';
               
               
               $(ambient).appendTo("#room_menu"); //adding element to the menu
               $(comfort).appendTo("#room_menu"); //adding element to the menu
               $(details).appendTo("#room_menu"); //adding element to the menu

  }

  //------------------------------------------------------------------------
  // ---------------------------CHART BUTTONS ----------------
  //------------------------------------------------------------------------


  //------------------------------------------------------------------------
  //-------------------TIME  FILTERING------------------------------------
  //------------------------------------------------------------------------




  //CALL THE CORRECT FUNCTION DEPENDING ON THE PERIOD/VARIABLE SELECTED
  function draw_room_chart(period,variable){

    //DAILY
    if(period==1 && variable==1){
        show_day_temperature();
        
    }else if (period==1 && variable==2){
        show_day_humidity();

    }else if (period==1 && variable==3){
    	show_day_luminance();
    }else if (period==1 && variable==4){
    	show_day_co2();
    }

    //WEEK
    else if (period==2 && variable==1){
        show_week_temperature();

    }else if (period==2 && variable==2){
        show_week_humidity();
    }else if (period==2 && variable==3){
        show_week_luminance();
    }else if (period==2 && variable==4){
        show_week_co2();
    }

    //MONTH
    else if(period==3 && variable==1){
        show_month_temperature();

    }else if(period==3 && variable==2){
      show_month_humidity();
    }else if(period==3 && variable==3){
      show_month_luminance();
    }else if(period==3 && variable==4){
      show_month_co2();
    }

    //YEAR
    else if(period==4 && variable==1){
      show_year_temperature();

    }else if(period==4 && variable==2){
      show_year_humidity();
    }else if(period==4 && variable==3){
      show_year_luminance();
    }else if(period==4 && variable==4){
      show_year_co2();
    }
  }




  //LISTENER FOR "PERIOD BUTTONS CLICK"
  function show_today(){
    period=1;
    draw_room_chart(period,variable);
  }

  function show_week(){
    period=2;
    draw_room_chart(period,variable);
  }

  function show_month(){
    period=3;
    draw_room_chart(period,variable);
  }
  function show_year(){
    period=4;
    draw_room_chart(period,variable);
  }


  //CHANGE PERIOD FILTER CLASS 
  function active_filter(){
    if(period==1){
      document.getElementById("today_chart_button").className += " active";
    }else if(period==2){
      document.getElementById("week_chart_button").className += " active";
    }else if(period==3){
      document.getElementById("month_chart_button").className += " active";
    }else if(period ==4){
      document.getElementById("year_chart_button").className += " active";
    }

  }


  //LISTENER FOR "VARIABLE BUTTONS" CLICK
  function show_temp(){
    variable=1; //1=temperature
    $("#humid_chart").hide("slow");
    $("#luminance_chart").hide("slow");
    $("#co2_chart").hide("slow");
    
    $("#temp_chart").show("slow");
    
    document.getElementById("temp_filter").className = "button js-filter-all clicked";
    document.getElementById("humid_filter").className = "button js-filter-all not_clicked";
    document.getElementById("co2_filter").className = "button js-filter-all not_clicked";
    document.getElementById("luminance_filter").className = "button js-filter-all not_clicked";
    
    active_filter();
    draw_room_chart(period,variable);
  }


  //SET THE VARIABLE TO HUMIDITY AND CALL THE DRAW_BUILDING_CHART
  function show_humid(){
    variable=2; //2= humidity/rain
    $("#temp_chart").hide("slow");
    $("#luminance_chart").hide("slow");
    $("#co2_chart").hide("slow");
    $("#humid_chart").show("slow");
    
    document.getElementById("humid_filter").className = "button js-filter-all clicked";
    document.getElementById("temp_filter").className = "button js-filter-all not_clicked";
    document.getElementById("co2_filter").className = "button js-filter-all not_clicked";
    document.getElementById("luminance_filter").className = "button js-filter-all not_clicked";
    active_filter();
    draw_room_chart(period,variable);
  }

  //SET THE VARIABLE TO CO2 AND CALL THE DRAW_BUILDING_CHART
  function show_co2(){
    variable=4; //4= co2
    $("#temp_chart").hide("slow");
    $("#humid_chart").hide("slow");
    $("#luminance_chart").hide("slow");
    $("#co2_chart").show("slow");
    document.getElementById("co2_filter").className = "button js-filter-all clicked";
    document.getElementById("humid_filter").className = "button js-filter-all mot_clicked";
    document.getElementById("temp_filter").className = "button js-filter-all not_clicked";
    document.getElementById("luminance_filter").className = "button js-filter-all not_clicked";
    active_filter();
    draw_room_chart(period,variable);
  }

  //SET THE VARIABLE TO LUMINANCE AND CALL THE DRAW_BUILDING_CHART
  function show_luminance(){
    variable=3; //3= luminance
    $("#temp_chart").hide("slow");
    $("#humid_chart").hide("slow");
    $("#co2_chart").hide("slow");
    $("#luminance_chart").show("slow");
    document.getElementById("luminance_filter").className = "button js-filter-all clicked";
    document.getElementById("humid_filter").className = "button js-filter-all not_clicked";
    document.getElementById("temp_filter").className = "button js-filter-all not_clicked";
    document.getElementById("co2_filter").className = "button js-filter-all not_clicked";
    
    active_filter();
    draw_room_chart(period,variable);
  }






  function show_year_temperature () {
  	var id = "#temp_chart";
  	var chart = $(id).highcharts();
  	chart.showLoading();
  	$.when( get_weather_year('airtemperature',2),
  		get_variable_year('1')
  		).then(function(tempArgs,i_tempArgs){

  			chart.xAxis[0].options.tickInterval=(3600*24*30*1000);
  			chart.series[0].setData(organize_Data(i_tempArgs[0]));
  			chart.series[1].setData(organize_Data(tempArgs[0]));
  			chart.setTitle({text:"Annual Internal/External Temperature comparison"});

  			var inf = new Date();
  			inf.setMonth(0);
  			inf.setDate(1);

  			var sup= new Date();

  			sup.setMonth(11);
  			sup.setDate(31);


  			chart.xAxis[0].setExtremes(inf.getTime(),sup.getTime());

  			




         if(tempArgs[0].length == 0 && i_tempArgs[0].length==0){    //if no data display message
         	chart.showLoading("No data to display ):");
         }
       });
  	}

  	function show_month_temperature () {
  		var id = "#temp_chart";
  		var chart = $(id).highcharts();
  		chart.showLoading();
  		$.when( get_weather_month('airtemperature',2),
  			get_variable_month('1')
  			).then(function(tempArgs,i_tempArgs){
  				chart.xAxis[0].options.tickInterval=(3600*24*1*1000);
  				chart.series[0].setData(organize_Data(i_tempArgs[0]));
  				chart.series[1].setData(organize_Data(tempArgs[0]));
  				chart.setTitle({text:"Monthly Internal/External Temperature comparison"});


  				var inf = new Date();
  				inf.setDate(0);

  				var sup= new Date();
  				sup.setDate(31);


  				chart.xAxis[0].setExtremes(inf.getTime(),sup.getTime())        


         if(tempArgs[0].length == 0 && i_tempArgs[0].length==0){    //if no data display message
         	chart.showLoading("No data to display ):");
         }
       });
  		}

  		function show_week_temperature () {
  			var id = "#temp_chart";
  			var chart = $(id).highcharts();
  			chart.showLoading();
  			$.when( get_weather_week('airtemperature',2),get_variable_week('1')
  				).then(function(tempArgs,i_tempArgs){


  					chart.xAxis[0].options.tickInterval=(3600*24*1*1000);
  					chart.series[0].setData(organize_Data(i_tempArgs[0]));
  					chart.series[1].setData(organize_Data(tempArgs[0]));
  					chart.setTitle({text:"Weekly Internal/External Temperature comparison"});
  				var inf = new Date();
                                          day =7-(inf.getDay());
                                          inf.setDate(inf.getDate()-day);

                                          var sup= new Date();
                                          sup.setDate(sup.getDate()+1);





  					chart.xAxis[0].setExtremes(inf.getTime(),sup.getTime());

          if(tempArgs[0].length == 0 && i_tempArgs[0].length==0){ //if no data display message
          	chart.showLoading("No data to display ):");
          }
        });
  			}

  			function show_day_temperature() {
  				var id = "#temp_chart";
  				var chart = $(id).highcharts();
  				chart.showLoading();

  				$.when( get_weather_day('airtemperature',2),get_variable_day('1')
  					).then(function(tempArgs,i_tempArgs){
  						chart.xAxis[0].options.tickInterval=(3600*1*1000);
  						chart.series[0].setData(organize_Data(i_tempArgs[0]));
  						chart.series[1].setData(organize_Data(tempArgs[0]));
  						var inf = new Date();
  						inf.setHours(0);
  						inf.setMinutes(0);

  						var sup= new Date();
  						sup.setHours(23);
  						sup.setMinutes(59);

  						chart.xAxis[0].setExtremes(inf.getTime(),sup.getTime());
  						chart.setTitle({text:"Daily Internal/External Temperature comparison"});
        if(tempArgs[0].length == 0 && i_tempArgs[0].length==0){   //if no data display message
        	chart.showLoading("No data to display ):");
        }
      });
  				}




  //------------------------------------------------------------------------
  // ---------------------------HUMIDITY CHART BUTTONS -------------------
  //------------------------------------------------------------------------
  function show_year_humidity () {
  	var id = "#humid_chart";
  	var chart = $(id).highcharts();
  	chart.showLoading();
  	$.when( get_weather_year('relativehumidity',2),
  		get_variable_year('2')
  		).then(function(humidArgs,i_humidArgs){
  			
  			chart.xAxis[0].options.tickInterval=(3600*24*30*1000);
  			chart.series[0].setData(organize_Data(i_humidArgs[0]));
  			chart.series[1].setData(organize_Data(humidArgs[0]));
  			chart.setTitle({text:"Annual Internal/External Humidity comparison"});
  			var inf = new Date();
  			inf.setMonth(0);
  			inf.setDate(1);

  			var sup= new Date();

  			sup.setMonth(11);
  			sup.setDate(31);


  			chart.xAxis[0].setExtremes(inf.getTime(),sup.getTime());
           if(humidArgs[0].length == 0 && i_humidArgs[0].length==0){ //if no data display message
           	chart.showLoading("No data to display ):");
           }
         });
  	}


  	function show_month_humidity () {
  		var id = "#humid_chart";
  		var chart = $(id).highcharts();
  		chart.showLoading();
  		$.when( get_weather_month('relativehumidity',2),
  			get_variable_month('2')
  			).then(function(humidArgs,i_humidArgs){

  				chart.xAxis[0].options.tickInterval=(3600*24*1*1000);	
  				chart.series[0].setData(organize_Data(i_humidArgs[0]));
  				chart.series[1].setData(organize_Data(humidArgs[0]));
  				chart.setTitle({text:"Monthly Internal/External Humidity comparison"});

  				var inf = new Date();
  				inf.setDate(0);

  				var sup= new Date();
  				sup.setDate(31);


  				chart.xAxis[0].setExtremes(inf.getTime(),sup.getTime())  
           if(humidArgs[0].length == 0 && i_humidArgs[0].length==0){ //if no data display message
           	chart.showLoading("No data to display ):");
           }
         });
  		}


  		function show_week_humidity () {
  			var id = "#humid_chart";
  			var chart = $(id).highcharts();
  			chart.showLoading();
  			$.when( get_weather_week('relativehumidity',2),
  				get_variable_week('2')
  				).then(function(humidArgs,i_humidArgs){

  					chart.xAxis[0].options.tickInterval=(3600*24*1*1000);
  					chart.series[0].setData(organize_Data(i_humidArgs[0]));
  					chart.series[1].setData(organize_Data(humidArgs[0]));

  					chart.setTitle({text:"Weekly Internal/External Humidity comparison"});

  					var inf = new Date();
                                          day =7-(inf.getDay());
                                          inf.setDate(inf.getDate()-day);

                                          var sup= new Date();
                                          sup.setDate(sup.getDate()+1);





  					chart.xAxis[0].setExtremes(inf.getTime(),sup.getTime());
           if(humidArgs[0].length == 0 && i_humidArgs[0].length==0){ //if no data display message
           	chart.showLoading("No data to display ):");
           }
         });
  			}

  			function show_day_humidity() {
  				var id = "#humid_chart";
  				var chart = $(id).highcharts();
  				chart.showLoading();
  				$.when( get_weather_day('relativehumidity',2),
  					get_variable_day('2')
  					).then(function(humidArgs,i_humidArgs){

              chart.redraw();
  						chart.xAxis[0].options.tickInterval=(3600*1*1000);
  						chart.series[0].setData(organize_Data(i_humidArgs[0]));
  						chart.series[1].setData(organize_Data(humidArgs[0]));

  						chart.setTitle({text:"Daily Internal/External Humidity comparison"});
  						var inf = new Date();
  						inf.setHours(0);
  						inf.setMinutes(0);

  						var sup= new Date();
  						sup.setHours(23);
  						sup.setMinutes(59);

  						chart.xAxis[0].setExtremes(inf.getTime(),sup.getTime());

         if(humidArgs[0].length == 0 && i_humidArgs[0].length==0){ //if no data display message
         	chart.showLoading("No data to display ):");
         }
       });
  				}

  //------------------------------------------------------------------------
  // ---------------------------ENERGY CHART BUTTONS ----------------------
  //------------------------------------------------------------------------
  function show_year_energy () {
  	var id = "#energy_chart";
  	var chart = $(id).highcharts();
  	chart.showLoading();
  	$.when(get_variable_year('9')).then(function(energyArgs){

  		chart.xAxis[0].options.tickInterval=(3600*24*30*1000);
        chart.yAxis[0].axisTitle.attr({
        text: 'Power'
            });
  		chart.series[0].setData(compute_power(energyArgs));
//  		chart.series[0].setData(calculate_energy(energyArgs,1));

  		chart.setTitle({text:"Annual power usage"});

  		var inf = new Date();
  		inf.setMonth(0);
  		inf.setDate(1);

  		var sup= new Date();

  		sup.setMonth(11);
  		sup.setDate(31);


  		chart.xAxis[0].setExtremes(inf.getTime(),sup.getTime());

          if(energyArgs[0].length == 0){ //if no data display message
          	chart.showLoading("No data to display ):");
          }
        });
  }


  function show_month_energy () {
  	var id = "#energy_chart";
  	var chart = $(id).highcharts();
  	chart.showLoading();

  	$.when(get_variable_month('9')).then(function(energyArgs){
  		chart.xAxis[0].options.tickInterval=(3600*24*1*1000);
        chart.yAxis[0].axisTitle.attr({
        text: 'Power'
            });
  		chart.series[0].setData(compute_power(energyArgs));
//  		chart.series[0].setData(calculate_energy(energyArgs,1));
  		chart.setTitle({text:"Monthly power usage"});

  		var inf = new Date();
  		inf.setDate(0);

  		var sup= new Date();
  		sup.setDate(31);


  		chart.xAxis[0].setExtremes(inf.getTime(),sup.getTime());

          if(energyArgs[0].length == 0){ //if no data display message
          	chart.showLoading("No data to display ):");
          }
        });
  }

  function show_week_energy () {
  	var id = "#energy_chart";
  	var chart = $(id).highcharts();
  	chart.showLoading();

  	$.when(get_variable_week('9')).then(function(energyArgs){
  		chart.xAxis[0].options.tickInterval=(3600*24*1*1000);
        chart.yAxis[0].axisTitle.attr({
        text: 'Power'
            });
        chart.series[0].setData(compute_power(energyArgs));
//  		chart.series[0].setData(calculate_energy(energyArgs,1));  //calculate_energy(argouments, hour)
  		chart.setTitle({text:"Weekly power usage"});

  		var inf = new Date();
      	day = 7-(inf.getDay());
    	inf.setDate(inf.getDate()-day);

    	var sup= new Date();
      	//sup.setDate(sup.getDate()+day);
		sup.setDate(sup.getDate()+1);

		chart.xAxis[0].setExtremes(inf.getTime(),sup.getTime());


          if(energyArgs[0].length == 0){ //if no data display message
          	chart.showLoading("No data to display ):");
          }
        });
  }




  function show_day_energy() {
  	var id = "#energy_chart";
  	var chart = $(id).highcharts();
  	chart.showLoading();

  	$.when(get_variable_day('9')).then(function(energyArgs){
        /*
  		chart.xAxis[0].options.tickInterval=(3600*1*1000);
  		chart.series[0].setData(calculate_energy(energyArgs,0.25));
        */
  		chart.xAxis[0].options.tickInterval=(60*1*1000);
        //chart.yAxis[0].title.text="Power";
        chart.yAxis[0].axisTitle.attr({
        text: 'Power'
            });
  		chart.series[0].setData(compute_power(energyArgs));
  		//chart.series[0].setData(compute_power_window(energyArgs));
        
  		chart.setTitle({text:"Daily power usage"});

  		var inf = new Date();
  		inf.setHours(0);
  		inf.setMinutes(0);

  		var sup= new Date();
  		sup.setHours(23);
  		sup.setMinutes(59);

  		chart.xAxis[0].setExtremes(inf.getTime(),sup.getTime());

          if(energyArgs[0].length == 0){ //if no data display message
          	chart.showLoading("No data to display ):");
          }
        });
  }

  //return num in x.xyz form
  function round(num){
  	return Math.round(num * 1000) / 1000

  }


  function compute_power(data){
    values = new Array();
    ndati = data.length;
    for(i = 0; i < ndati; i++){
        arr = new Array();
        arr.push(data[i].timestamp);
        arr.push(round(data[i].value/1000));
        values.push(arr);
    }
    return values;
  }


  //t is the time interval value, could be either 15 min (0.25h) or 1h (1)
  function calculate_energy(data,t){

  	json = new Array();
  	for (i =0; i<data.length; i++) {

  		if(i==data.length-1){
  			break;
  		}
        x1 = (data[i].value)/1000;  // W---->kW
        x2= (data[i+1].value)/1000;

        // energy = ((x1+x2)/2)*t;  //average * time (15 min = 0.25 h or 1h)
	energy = ((x1+x2)/2)/t;

        arr = new Array();
        arr.push(data[i+1].timestamp);
        arr.push(round(energy));

        json.push(arr);


      }

      return json;

    }

    // ---------------UTILITY FUNCTION 

    function organize_Data(data){
    	json = new Array();
    	for (i =0; i<data.length; i++) {

    		arr = new Array();
    		arr.push(data[i].timestamp);
    		arr.push(data[i].value);

    		json.push(arr);


    	}
    	return json;


    }

  //------------------------------------------------------------------------
  // ---------------------------co2 CHART BUTTONS ----------------------
  //------------------------------------------------------------------------
  function organize_co2_Data(data){
  json = new Array();
     for (i =0; i<data.length; i++) {



      arr = new Array();
      arr.push(data[i].timestamp);
      arr.push(calculate_co2(data[i].value));

      json.push(arr);


    }

    return json;

  }

  function calculate_co2(co2_read){
    co2_val = (300 - ( (co2_read/7)*1000 ) ); // co2@350ppm = 0.2 mV
    exp = (co2_val+158.631)/62.87;
    return round(Math.pow(10,exp));


  }



  function show_year_co2 () {
  	var id = "#co2_chart";
  	var chart = $(id).highcharts();
  	chart.showLoading();
  	$.when(get_variable_year('4')
  		).then(function(co2Args){

  			chart.xAxis[0].options.tickInterval=(3600*24*30*1000);
  			chart.series[0].setData(organize_co2_Data(co2Args));
  			chart.setTitle({text:"Annual CO<sub>2</sub>  Level"});
  			var inf = new Date();
  			inf.setMonth(0);
  			inf.setDate(1);

  			var sup= new Date();

  			sup.setMonth(11);
  			sup.setDate(31);


  			chart.xAxis[0].setExtremes(inf.getTime(),sup.getTime());
         if(co2Args.length == 0){    //if no data display message
         	chart.showLoading("No data to display ):");
         }
       });
  	}



  	function show_month_co2 () {
  		var id = "#co2_chart";
  		var chart = $(id).highcharts();
  		chart.showLoading();
  		$.when(get_variable_month('4')
  			).then(function(co2Args){
  				chart.xAxis[0].options.tickInterval=(3600*24*1*1000);
  				chart.series[0].setData(organize_co2_Data(co2Args));
  				chart.setTitle({text:"Monthly CO<sub>2</sub> Level"});
  				var inf = new Date();
  				inf.setDate(0);

  				var sup= new Date();
  				sup.setDate(31);


  				chart.xAxis[0].setExtremes(inf.getTime(),sup.getTime())  
         if(co2Args.length == 0){    //if no data display message
         	chart.showLoading("No data to display ):");
         }
       });
  		}


  		function show_week_co2 () {
  			var id = "#co2_chart";
  			var chart = $(id).highcharts();
  			chart.showLoading();
  			$.when(get_variable_week('4')
  				).then(function(co2Args){
  					chart.xAxis[0].options.tickInterval=(3600*24*1*1000);
  					chart.series[0].setData(organize_co2_Data(co2Args));
  					chart.setTitle({text:"Weekly CO<sub>2</sub>  Level"});

  					var inf = new Date();
                                          day =7-(inf.getDay());
                                          inf.setDate(inf.getDate()-day);

                                          var sup= new Date();
                                          sup.setDate(sup.getDate()+1);





  					chart.xAxis[0].setExtremes(inf.getTime(),sup.getTime());
         if(co2Args.length == 0){    //if no data display message
         	chart.showLoading("No data to display ):");
         }
       });
  			}


  			function show_day_co2 () {
  				var id = "#co2_chart";
  				var chart = $(id).highcharts();
  				chart.showLoading();
  				$.when(get_variable_day('4')
  					).then(function(co2Args){
  						chart.xAxis[0].options.tickInterval=(3600*1000);
  						chart.series[0].setData(organize_co2_Data(co2Args));
  						chart.setTitle({text:"Daily CO<sub>2</sub> Level"});

  						var inf = new Date();
  						inf.setHours(0);
  						inf.setMinutes(0);

  						var sup= new Date();
  						sup.setHours(23);
  						sup.setMinutes(59);

  						chart.xAxis[0].setExtremes(inf.getTime(),sup.getTime());
         if(co2Args.length == 0){    //if no data display message
         	chart.showLoading("No data to display ):");
         }
       });
  				}
  //------------------------------------------------------------------------
  // ---------------------------LUMINANCE CHART BUTTONS ----------------------
  //------------------------------------------------------------------------
  function organize_luminance_Data(data){

  json = new Array();
     for (i =0; i<data.length; i++) {



      arr = new Array();
      arr.push(data[i].timestamp);
      arr.push(calculate_LUX(data[i].value));

      json.push(arr);


    }
    return json;

  }

  function calculate_LUX(light_read){
    if(light_read == 0){
      return 0;
    }
    //R= (10 * light_read)/(3.3 - light_read);


     R=  ((3.3/light_read) -1 )*10000;
     //lux = Math.pow(10, ( (Math.log10(R)-1.78)/ -(0.78) ) );
     lux = ( 500 / (10* ( (5-light_read)/light_read ))) *100;

  return (lux);


  }


  function show_year_luminance () {
  	var id = "#luminance_chart";
  	var chart = $(id).highcharts();
  	chart.showLoading();
  	$.when(get_variable_year('3')
  		).then(function(luminanceArgs){
  			chart.xAxis[0].options.tickInterval=(3600*24*30*1000);
  			chart.series[0].setData(organize_luminance_Data(luminanceArgs));
  			chart.setTitle({text:"Annual Luminance Level"});
  			var inf = new Date();
  			inf.setMonth(0);
  			inf.setDate(1);

  			var sup= new Date();

  			sup.setMonth(11);
  			sup.setDate(31);


  			chart.xAxis[0].setExtremes(inf.getTime(),sup.getTime());
         if(luminanceArgs.length == 0){    //if no data display message
         	chart.showLoading("No data to display ):");
         }
       });
  	}


  	function show_month_luminance () {
  		var id = "#luminance_chart";
  		var chart = $(id).highcharts();
  		chart.showLoading();
  		$.when(get_variable_month('3')
  			).then(function(luminanceArgs){
  				chart.xAxis[0].options.tickInterval=(3600*24*1*1000);
  				chart.series[0].setData(organize_luminance_Data(luminanceArgs));
  				chart.setTitle({text:"Monthly Luminance Level"});
  				var inf = new Date();
  				inf.setDate(0);

  				var sup= new Date();
  				sup.setDate(31);


  				chart.xAxis[0].setExtremes(inf.getTime(),sup.getTime())
         if(luminanceArgs.length == 0){    //if no data display message
         	chart.showLoading("No data to display ):");
         }
       });
  		}

  		function show_day_luminance () {
  			var id = "#luminance_chart";
  			var chart = $(id).highcharts();
  			chart.showLoading();
  			$.when(get_variable_day('3')
  				).then(function(luminanceArgs){
  					chart.xAxis[0].options.tickInterval=(3600*1000);
  					chart.series[0].setData(organize_luminance_Data(luminanceArgs));
  					chart.setTitle({text:"Daily Luminance Level"});
  					var inf = new Date();
  					inf.setHours(0);
  					inf.setMinutes(0);

  					var sup= new Date();
  					sup.setHours(23);
  					sup.setMinutes(59);

  					chart.xAxis[0].setExtremes(inf.getTime(),sup.getTime());
         if(luminanceArgs.length == 0){    //if no data display message
         	chart.showLoading("No data to display ):");
         }
       });
  			}

  			function show_week_luminance () {
  				var id = "#luminance_chart";
  				var chart = $(id).highcharts();
  				chart.showLoading();
  				$.when(get_variable_week('3')
  					).then(function(luminanceArgs){
  						chart.xAxis[0].options.tickInterval=(3600*24*1*1000);
  						chart.series[0].setData(organize_luminance_Data(luminanceArgs));
  						chart.setTitle({text:"Weekly Luminance Level"});

  						var inf = new Date();
                                          day =7-(inf.getDay());
                                          inf.setDate(inf.getDate()-day);

                                          var sup= new Date();
                                          sup.setDate(sup.getDate()+1);





  						chart.xAxis[0].setExtremes(inf.getTime(),sup.getTime());
         if(luminanceArgs.length == 0){    //if no data display message
         	chart.showLoading("No data to display ):");
         }
       });
  				}

