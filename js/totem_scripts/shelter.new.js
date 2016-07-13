//------------------------------------------------------------------------------
//------------------------------BACK BUTTON LISTENER----------------------------
//------------------------------------------------------------------------------
function go_back_home(){
    window.open("http://eis.deib.polimi.it/totem/demonstrator.html?cid=1","_self");
}

  //------------------------------------------------------------------------------
  //------------------------------SHELTER DATA --------------------------------------
  //------------------------------------------------------------------------------

  //-----------GLOBAL VARIABLES ------------------
  //-----------GLOBAL VARIABLES ------------------
  var date = new Date();

  var room = {
    id : "40",
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

         error: function(xhr,textStatus,err)
            {
            ////alert("text status: " + textStatus+ " error: " + err+" status: " + xhr.status+" responseText: "+ xhr.responseText+" readyState: " + xhr.readyState);
            
            },   
          });
  }




  //------------------ROOM SENSORS DATA --------------------

  function get_variable_day(variable_id){


               var url = 'http://131.175.21.162:8080/measurements/60min/sensor/variable/'+variable_id+'/'+date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate(); 
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


  function get_variable_month(variable_id){

                var url = 'http://131.175.21.162:8080/measurements/60min/sensor/variable/'+variable_id+'/'+date.getFullYear()+'/'+(date.getMonth()+1);    
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

  function get_variable_week(variable_id){

                var url = 'http://131.175.21.162:8080/measurements/60min/sensor/variable/'+variable_id+'/'+date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate()+"?weekly=true";    
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

  function get_variable_year(variable_id){

                var url = 'http://131.175.21.162:8080/measurements/60min/sensor/variable/'+variable_id+'/'+date.getFullYear();    
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




  function animate_counters_room(n_sensors){
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
        var sensors = new countUp("sensor_count", 0, n_sensors, 0, 2.5, options);
        //var rooms = new countUp("room_count", 0, n_feedbacks, 0, 2.5, options);
        // var user = new countUp("user_count", 0, 60, 0, 1, options);
        // feedback.start();
        sensors.start();
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
  } else if(string.toLowerCase().indexOf("ufficio") >= 0){ //hard-translation in english
             string = string.replace("ufficio","office");
  }else if(string.toLowerCase().indexOf("aula") >= 0){ //hard-translation in english
             string = string.replace("aule","Classroom");
  }

  return string.charAt(0).toUpperCase() + string.slice(1);
}



function create_Loader(){
  var parameters = location.search.substring(1).split("&");
  var temp = parameters[0].split("=");
  id = unescape(temp[1]);
  var image ='<img src="img/'+id+'.png" class="animated fadeInDown" alt="">' $(image).appendTo("#load");
  var rest = ' <div class="spinner">'+
    '<div class="bounce1"></div>'+
    '<div class="bounce2"></div>'+
    '<div class="bounce3"></div>'+
    '</div>'
  $(rest).appendTo("#load");
}

//return num in x.xyz form
function round(num){
    return Math.round(num * 1000) / 1000
}

function append_chart(variable_id){
  var chart= '<div id="energy_chart_'+variable_id+'" style="min-width: 300px; height: 400px; margin: 0 auto;"></div>'
    $(chart).appendTo("#energy_chart_container");
}


  //------------------------------------------------------------------------
  // ---------------------------ENERGY CHART BUTTONS ----------------------
  //------------------------------------------------------------------------

    function energy_chart(energy_consumption,variable_id,description){

    energy = calculate_energy(energy_consumption,1);
    
    
    Highcharts.setOptions({
      global: {
        useUTC: false
      }
    });
    $('#energy_chart_'+variable_id).highcharts({
      chart: {
        events:{

          load : function(){
           this.hideLoading();
         },
         redraw: function(){
           this.hideLoading();
         }
       }
            //zoomType: 'x'
          },
          title: {
            text: description+' daily power usage'
          },

          xAxis: {
            type: 'datetime',       
            startOnTick: true,
            tickInterval: (3600*1*1000),


          },

          yAxis: {
            title: {
              text: 'Power'
            },
            labels: {
              format: '{value} kW',
              style: {
                color: Highcharts.getOptions().colors[1]
              }
            }
          },
          credits: {
            enabled: false
          },
          legend: {
            enabled: false
          },
          plotOptions: {
            area: { 
              fillColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
                stops: [
                [0, Highcharts.getOptions().colors[0]],
                [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                ]
              },
              marker: {
                // radius: 3
                enabled:false,
              },
              lineWidth: 1,
              states: {
                hover: {
                  lineWidth: 1
                }
              },
              threshold: null
            }
          },

          series: [{
            type: 'area',
            name: 'Power (kW)',
            step: 'left',
            marker: {
                enabled: false
            },
            data: energy
          }]

        });

var id = '#energy_chart_'+variable_id;
var chart = $(id).highcharts();
var inf = new Date();
inf.setHours(0);
inf.setMinutes(0);

var sup= new Date();
sup.setHours(23);
sup.setMinutes(59);

chart.xAxis[0].setExtremes(inf.getTime(),sup.getTime());

      if(energy.length == 0){ //if no data display message
        $('#energy_chart_'+variable_id).highcharts().showLoading("No data to display ):");
      }




    }



function show_year_energy(){
variableid_list=[89,90,91,92,24];
variablename_list=["Smart Plug 1","Smart Plug 2","Smart Plug 3","Smart Plug 4","Smart Plug 5"];
  for(i=0; i<variableid_list.length; i++){
      draw_year_energy(variableid_list[i],variablename_list[i]);
  }
}


function draw_year_energy (variable_id,variable_name) {
  	var id = '#energy_chart_'+ variable_id;
  	var chart = $(id).highcharts();
  	chart.showLoading();
  	$.when(get_variable_year(variable_id)).then(function(energyArgs){

  		chart.xAxis[0].options.tickInterval=(3600*24*30*1000);
//  		chart.series[0].setData(calculate_energy(energyArgs,1));
      chart.series[0].setData(compute_power(energyArgs));

  		chart.setTitle({text:variable_name+" annual energy consumption"});

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

function show_month_energy(){
variableid_list=[89,90,91,92,24];
variablename_list=["Smart Plug 1","Smart Plug 2","Smart Plug 3","Smart Plug 4","Smart Plug 5"];
  for(i=0; i<variableid_list.length; i++){
      draw_month_energy(variableid_list[i],variablename_list[i]);
  }
}
  function draw_month_energy (variable_id,variable_name) {
  	var id = '#energy_chart_'+variable_id;
  	var chart = $(id).highcharts();
  	chart.showLoading();

  	$.when(get_variable_month(variable_id)).then(function(energyArgs){
  		chart.xAxis[0].options.tickInterval=(3600*24*1*1000);
//  		chart.series[0].setData(calculate_energy(energyArgs,1));
      chart.series[0].setData(compute_power(energyArgs));
  		chart.setTitle({text:variable_name+" monthly power usage"});

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
function show_week_energy(){
variableid_list=[89,90,91,92,24];
variablename_list=["Smart Plug 1","Smart Plug 2","Smart Plug 3","Smart Plug 4","Smart Plug 5"];
  for(i=0; i<variableid_list.length; i++){
      draw_week_energy(variableid_list[i],variablename_list[i]);
  }
}

  function draw_week_energy (variable_id,variable_name) {
  	var id = '#energy_chart_'+variable_id;
  	var chart = $(id).highcharts();
  	chart.showLoading();

  	$.when(get_variable_week(variable_id)).then(function(energyArgs){
  		chart.xAxis[0].options.tickInterval=(3600*24*1*1000);
//  		chart.series[0].setData(calculate_energy(energyArgs,1));  //calculate_energy(argouments, hour)
      chart.series[0].setData(compute_power(energyArgs));
  		chart.setTitle({text:variable_name+" weekly power usage"});

  		var inf = new Date();
      day =7-(inf.getDay());
    inf.setDate(inf.getDate()-day);

     var sup= new Date();
      sup.setDate(sup.getDate()+1);





  		chart.xAxis[0].setExtremes(inf.getTime(),sup.getTime());


          if(energyArgs[0].length == 0){ //if no data display message
          	chart.showLoading("No data to display ):");
          }
        });
  }


  function show_day_power () {
    var variableid_list = [89,90,91,92];
    var variablename_list=["Smart Plug 1","Smart Plug 2","Smart Plug 3","Smart Plug 4"];
    var nplugs = variableid_list.length;
    for(i = 0; i < nplugs; i++)
      draw_day_powerdetails(variableid_list[i],variablename_list[i]);
  }

  function draw_day_powerdetails(variable_id,variable_name) {
    var id = '#energy_chart_'+variable_id;
    var chart = $(id).highcharts();
    chart.showLoading();
    show_chart_powerdetails_window(AGGREGATE_15, DAY, ACTIVE_POWER_LABEL);

  }

  function show_chart_powerdetails_window(aggregate, window, varlabel) {
    var measures = [];
    /*ACTIVE_POWER_LABEL*/
    get_all_measures_from_variableclass(room.id, varlabel, aggregate, window).done(function (measures){
          //console.log(measures.length); 
          create_power_chart_multisource(measures, window);           
    });

  }

  function create_power_chart_multisource(measures, window)
  {
   
    var seriesOptions = [];
    var powerSrc, powerName;
    var ndata;
    ndata = measures[0][2].length;

    for(var i = 0; i < measures.length; i++){
        powerSrc = measures[i][0];
        powerName = measures[i][1].substr("Potenza attiva".length+1);
        /* keep the minimum number of sampled data as reference */
        if(measures[i][2].length < ndata)
          ndata = measures[i][2].length;
        //console.log("pos " + i + "varid: " + powerSrc + " label " + powerName);
        seriesOptions[i] = {
          name: powerName,
          data: measures[i][2],
          step: 'left',
          color : getColorPowerOffice[powerName],
          index: getIndexPowerOffice[powerName]
        };
     }

    var inf = new Date();
    var sup = new Date();
    var ctitle, cint;

    switch(window){
      case YEAR:
        inf.setMonth(0);
        inf.setDate(1);
        sup.setMonth(11);
        sup.setDate(31);
        ctitle = YEAR_CHART.chart_title;
        cint = YEAR_CHART.chart_tickinterval;
        break;
      case MONTH:
        int_d = new Date(inf.getFullYear(), inf.getMonth()+1,1);
        d = new Date(int_d - 1);
        inf.setDate(0);
        sup.setDate(d.getDate());
        ctitle = MONTH_CHART.chart_title;
        cint = MONTH_CHART.chart_tickinterval;
        break;
      case WEEK:
        //not this week
        //var day = 7-(inf.getDay());
        //inf.setDate(inf.getDate()-7);
        inf.setDate(sup.getDate()-5);
        sup.setDate(sup.getDate()+1);
        ctitle = WEEK_CHART.chart_title;
        cint = WEEK_CHART.chart_tickinterval;
        break;
  //      case DAY:
      default:
        inf.setHours(0);
        inf.setMinutes(0);
        sup.setHours(23);
        sup.setMinutes(59);
        ctitle = DAY_CHART.chart_title;
        cint = DAY_CHART.chart_tickinterval;
    }


    if(ndata == 0) //if no data display message
      strmessage = "No data to display ):";
    
    /*
    chart.showLoading(strmessage);
  */
    Highcharts.setOptions({
      global: {
        useUTC: false
      }
    });

    var chid = '#powermeter_chart_ms';
    $(chid).highcharts({
      title: {
          text: "Power usage information"
      },
      subtitle: {
          text: '(' + ndata + ' samples)'
      },
      xAxis: {
        type: 'datetime',
        tickInterval: cint,
        tickWidth: 0,
        gridLineWidth: 1,
      },
      yAxis: {
        floor: 0,
        title: {
        text: 'Power'
        },
        labels: {
            format: '{value} kW',
            style: {
              color: Highcharts.getOptions().colors[1]
            }
          }
      },
      legend: {
        align: 'left',
        verticalAlign: 'top',
        reversed: true,
        y: 20,
        floating: true,
        borderWidth: 0
      },
      tooltip: {
        shared: true,
        crosshairs: true
      },
      plotOptions: {
          area: {
            stacking: 'normal',
            lineColor: '#666666',
            marker: {
                  // radius: 3
                enabled:false
            },
            lineWidth: 1,
            states: {
                hover: {
                  lineWidth: 1
                }
            },
            threshold: null
          }
      },
      chart: {
          type: 'area'
      },
      series: seriesOptions
    });

    var chart = $(chid).highcharts();
    chart.xAxis[0].setExtremes(inf.getTime(),sup.getTime());
    chart.setTitle({ text: ctitle });
    chart.xAxis[0].tickInterval = cint;
    
  }


  function get_all_measures_from_variableclass(roomid, variableclassdescription, aggregate, window)
  {
      var def = $.Deferred();
      get_variableclasses_room().done(function(roomvars){
          /* retrieve the variable class for the room given the labels we are looking for */
          var varclassid = get_variableclass_room(roomvars, variableclassdescription);
//          get_variables_class_room(varclassid).done(function(selroomvars){
          get_variables_class_room(varclassid).done(function(selroomvars){
            var measures = [], defers = [], defer;
            var nvars = selroomvars.length;
            var link, lheader;
            if(aggregate == AGGREGATE_15)
              lheader = LINK_HEADER_MEASUREMENTS_15;
            else if(aggregate == AGGREGATE_30)
              lheader = LINK_HEADER_MEASUREMENTS_30;
            else
              lheader = LINK_HEADER_MEASUREMENTS_60;

            for(var i = 0; i < nvars; i++ ){
              link = prepare_link_variable_measures(lheader, selroomvars[i].variableid, date, window);
              //console.log(selroomvars[i].variableid + " @ " + link);
              defer = get_variable_measures_promise(link, selroomvars[i].variableid, selroomvars[i].label, selroomvars[i].measure).done(function(pmdata){
                  //console.log(pmdata[0][0] + " provided " + pmdata[0][2].length);
                  measures = measures.concat(pmdata);
              });
              defers.push(defer);
            }
            /* when ALL data from different JSON has been collected -- create the chart*/
            $.when.apply(window, defers).done(function () {
               //console.log("finished loading data!");
               def.resolve(measures);
            });
          }); 
      });     
    return def.promise();
  }

/* retrieves JSON at link, for variable varid, hqving label lab and unit measure unit */
function get_variable_measures_promise(link, varid, lab, unit){
  var dfd = $.Deferred();
  $.ajax({
        url: link,
    }).done(function(response){ 
       var readings = [];
       var idl = varid;
       $.each(response, function(key, read){
          var entry = [];
          entry.push(read.timestamp);
          if (unit.indexOf("k") >= 0)
            entry.push(read.value);
          else
            entry.push(read.value / 1000);
          readings.push(entry);
       });
       var vardata = [varid, lab, readings];
       var result = [];
       result.push(vardata);
       dfd.resolve(result);
    });
    return dfd.promise();
  }

  function prepare_link_variable_measures(lheader, varid, refdate, window){
    var link = lheader + varid + '/' + refdate.getFullYear();
    switch(window) {
      case 365: 
        break; /* ok like this */
      case 30:  /* monthly - this month */
        link = link +'/'+(refdate.getMonth()+1);
        break;
      case 7: /* weekly - last seven days */
        link = link +'/'+(refdate.getMonth()+1);
        link = link +'/'+refdate.getDate();
        link = link +"?weekly=true";
        break;
      case 1:
      default:
        link = link +'/'+(refdate.getMonth()+1);
        link = link +'/'+refdate.getDate();      
    }
    return link;
  }



function show_day_energy(){
variableid_list=[89,90,91,92,24];
variablename_list=["Smart Plug 1","Smart Plug 2","Smart Plug 3","Smart Plug 4","Smart Plug 5"];
  for(i=0; i<variableid_list.length; i++){

      draw_day_energy(variableid_list[i],variablename_list[i]);
  }
}

  function draw_day_energy(variable_id,variable_name) {

  	var id = '#energy_chart_'+variable_id;
  	var chart = $(id).highcharts();
  	chart.showLoading();

  	$.when(get_variable_day(variable_id)).then(function(energyArgs){
  		chart.xAxis[0].options.tickInterval=(3600*1*1000);
  		//chart.series[0].setData(calculate_energy(energyArgs,1));
      chart.series[0].setData(compute_power(energyArgs));
  		chart.setTitle({text:variable_name+" daily power usage"});

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




 function show_year_energy_confrontation () {

  
          var id = "#energy_chart_confrontation";
      var chart = $(id).highcharts();
      chart.showLoading();
    $.when(get_variable_year(389),get_variable_year(387)).then(function(production,consumption){
      panel_chart(production,consumption,3); 
          
        });
  }


  function show_month_energy_confrontation () {
          var id = "#energy_chart_confrontation";
      var chart = $(id).highcharts();
      chart.showLoading();
    $.when(get_variable_month(389),get_variable_month(387)).then(function(production,consumption){
       panel_chart(production,consumption,2);      
       });
  }

  function show_week_energy_confrontation () {
      var id = "#energy_chart_confrontation";
      var chart = $(id).highcharts();
      chart.showLoading();
     $.when(get_variable_week(389),get_variable_week(387)).then(function(production,consumption){
      panel_chart(production,consumption,1);      
        });
  }




  function show_day_energy_confrontation() {
   $.when(get_variable_day(389),get_variable_day(387)).then(function(production,consumption){

    draw_daily_confrontation_chart(organize_Data(consumption[0]),organize_Data(production[0]));
      
});
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

        energy = ((x1+x2)/2)*t;  //average * time (15 min = 0.25 h or 1h)

        arr = new Array();
        arr.push(data[i+1].timestamp);
        arr.push(round(energy));

        json.push(arr);


      }

      return json;

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

      function panel_chart(energy_production,energy_consumption,period){
      
      var inf = new Date();
      var sup= new Date();
      Title =' ';
      tick = 0;

        if(period ==1){
          Title ='Week';
          day =7-(inf.getDay());
          inf.setDate(inf.getDate()-day);
          sup.setDate(sup.getDate()+1);
          tick = 3600*24*1*1000;
        }else if(period==2){
          Title='Month';        
          inf.setDate(0);
          sup.setDate(31);
          tick = 3600*24*1*1000;
        }else if(period==3){
          Title ='Year';
           inf.setMonth(0);
           inf.setDate(1);
          sup.setMonth(11);
          sup.setDate(31);
          tick =3600*24*30*1000;
          
        }

      energy_production=organize_Data(energy_production[0]);
      energy_consumption=organize_Data(energy_consumption[0]);
      Highcharts.setOptions({
        global: {
          useUTC: false
        }
      });

      $('#energy_chart_confrontation').highcharts({
          chart: {
              type: 'areaspline'
          },
          title: {
              text: Title+' Average Energy Production and Consumption' 
          },
                    credits: {
              enabled: false
            },
          xAxis: {
              type: 'datetime',       
              startOnTick: true,

            },
          yAxis: {
              min: 0,
              title: {
                  text: 'Energy (kWh)'
              }
          },

          tooltip: {
              headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
              pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                  '<td style="padding:0"><b>{point.y} kWh</b></td></tr>',
              footerFormat: '</table>',
              shared: true,
              useHTML: true
          },
          plotOptions: {
              column: {
                  pointPadding: 0.2,
                  borderWidth: 1,
                  pointWidth:20
              }
          },
          series: [{
              name: 'Production',
              data: energy_production,
              color:'#2196f3'

          }, {
              name: 'Consumption',
              data: energy_consumption,
              color: '#0d47a1'

          }]
      });


  var id = "#energy_chart_confrontation";
  var chart = $(id).highcharts();

  chart.xAxis[0].setExtremes(inf.getTime(),sup.getTime());
  chart.xAxis[0].options.tickInterval=(tick);

        if(energy_consumption.length == 0 && energy_production.length==0){ //if no data display message
          $('#energy_chart_confrontation').highcharts().showLoading("No data to display ):");
        }

    }  


function get_varid_from_link(link, header)
{
    var startpos = header.length;
    var nextslash = link.indexOf('/',startpos);
    var varid = link.substr(startpos, nextslash-startpos);
    return varid;
}

  /* returns text after hide */
  function get_variable_label_from_id(varid, varinfo, hide){
    for(var i = 0; i < varinfo.length; i++)
      if(varinfo[i].id == varid)
        return (varinfo[i].label.substr(hide.length));
      return "unknown";
  }
