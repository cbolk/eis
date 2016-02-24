

  //------------------------------------------------------------------------------
  //------------------------------BACK BUTTON LISTENER----------------------------
  //------------------------------------------------------------------------------




  function go_back_home(){
   
    window.open("http://eis.deib.polimi.it/totem/demonstrator.html?cid=1","_self");

  }


  //------------------------------------------------------------------------------
  //------------------------------RESIDENTIAL DATA --------------------------------------
  //------------------------------------------------------------------------------


  //-------------ROOM INFO
        
        //-----------GLOBAL VARIABLES ------------------
        var date = new Date();

        var room = {
          id : "41",
        }


  function get_data_room()
      {

        
        var link = 'http://131.175.56.243:8080/rooms/'+room.id+'/details';
       return $.ajax({
          type:'GET',
          url: link,
          crossDomain: true,  
          cache:true,
          success: function(data){
            set_room_info(data);
          },
         error: function(xhr,textStatus,err)
            {
            ////alert("text status: " + textStatus+ " error: " + err+" status: " + xhr.status+" responseText: "+ xhr.responseText+" readyState: " + xhr.readyState);
            
            },   
          });

        
      }

  function set_room_info(data){
  document.getElementById("brand_title").innerHTML = modifyString(data.label);
  document.getElementById("room_title").innerHTML = modifyString(data.label);


  }


  function get_variables_room(){

  var link = 'http://131.175.56.243:8080/variables/room/40';

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


  function get_sensors_room(){
    var link = 'http://131.175.56.243:8080/sensors/room/all/'+room.id;
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


               var url = 'http://131.175.56.243:8080/measurements/60min/sensor/variable/'+variable_id+'/'+date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate(); 
    //var url = 'http://131.175.56.243:8080/measurements/15min/room/1/variableclass/1/2015/04/20';
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

                var url = 'http://131.175.56.243:8080/measurements/60min/sensor/variable/'+variable_id+'/'+date.getFullYear()+'/'+(date.getMonth()+1);    
    //var url = 'http://131.175.56.243:8080/measurements/15min/room/1/variableclass/1/2015/04/20';
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

                var url = 'http://131.175.56.243:8080/measurements/60min/sensor/variable/'+variable_id+'/'+date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate()+"?weekly=true";    
    //var url = 'http://131.175.56.243:8080/measurements/15min/room/1/variableclass/1/2015/04/20';
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

                var url = 'http://131.175.56.243:8080/measurements/60min/sensor/variable/'+variable_id+'/'+date.getFullYear();    
    //var url = 'http://131.175.56.243:8080/measurements/15min/room/1/variableclass/1/2015/04/20';
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
       }else
        if(string.toLowerCase().indexOf("ufficio") >= 0){ //hard-translation in english
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
              var image ='<img src="img/'+id+'.png" class="animated fadeInDown" alt="">'
              $(image).appendTo("#load");
  var rest = ' <div class="spinner">'+
                '<div class="bounce1"></div>'+
                '<div class="bounce2"></div>'+
                '<div class="bounce3"></div>'+
              '</div>'
              $(rest).appendTo("#load");


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
  	var id = '#energy_chart_'+variable_id;
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

  //return num in x.xyz form
  function round(num){
  	return Math.round(num * 1000) / 1000

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