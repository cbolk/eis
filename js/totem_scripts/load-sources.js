      //------------------------------------------------------------------------------
  //------------------------------LOADS/SOURCES DATA -----------------------------
  //------------------------------------------------------------------------------

  var load_sources={
    district_id : unescape( (location.search.substring(1).split("&")[1].split("="))[1]),

  }


  function get_data_load_sources()
      {

        
        var link = 'http://131.175.56.243:8080/districts/'+load_sources.district_id;

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

/* CB not used and copied in residential.js */
 function get_data_recharges(did)
      {
        
        var link = 'http://131.175.56.243:8080/recharges/district/'+did;
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



  //------------------------------------------------------------------------------
  //----------------------------SOLAR PANEL API ---------------------------------
  //------------------------------------------------------------------------------
  date =new Date();
  function get_variable_day(type){

    url = 'http://131.175.56.243:8080/measurements/60min/room/1/variableclass/'+type+'/'+date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate()+'?from=07:00&to=23:59';             
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

  function get_variable_month(type){

                var url = 'http://131.175.56.243:8080/measurements/60min/room/1/variableclass/'+type+'/'+date.getFullYear()+'/'+(date.getMonth()+1);    
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

  function get_variable_week(type){

                var url = 'http://131.175.56.243:8080/measurements/60min/room/1/variableclass/'+type+'/'+date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate()+"?weekly=true";    
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

  function get_variable_year(type){

                var url = 'http://131.175.56.243:8080/measurements/60min/room/1/variableclass/'+type+'/'+date.getFullYear();    
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


function create_sections(unibs){
      if(unibs==1){

        //MENU
              var trigen = 
               '<div class="col-md-3 ">'+
                '<div  class="main-item-invert">'+
                 '<a href="#trigenerator">'+
                  '<i class="fa fa-recycle fa-2x hvr-bounce-in "></i>'+
                   '</a>'+
                    '<h3 class="h3-loads">Tri-generation</h3>'+
                     '</div>'+
                  '</div>';
             var solar = 
               '<div class="col-md-3 ">'+
                '<div  class="main-item-invert">'+
                 '<a href="#panels">'+
                  '<i class="fa fa-sun-o fa-2x hvr-bounce-in "></i>'+
                   '</a>'+
                    '<h3 class="h3-loads">Solar Panels</h3>'+
                     '</div></div>';

               var station = 
               '<div class="col-md-3 ">'+
                '<div  class="main-item-invert">'+
                 '<a href="#station">'+
                  '<i class="fa fa-plug fa-2x hvr-bounce-in "></i>'+
                   '</a>'+
                    '<h3 class="h3-loads">Charging Stations</h3>'+
                     '</div></div>';

               var video = 
               '<div class="col-md-3 ">'+
                '<div  class="main-item-invert">'+
                 '<a href="#video">'+
                  '<i class="fa fa-video-camera fa-2x hvr-bounce-in "></i>'+
                   '</a>'+
                    '<h3 class="h3-loads">Details</h3>'+
                     '</div></div>';
                              
               $(trigen).appendTo("#load_menu"); //adding element to the menu
               $(solar).appendTo("#load_menu"); //adding element to the menu
               $(station).appendTo("#load_menu"); //adding element to the menu
               $(video).appendTo("#load_menu"); //adding element to the menu

        //NAV BAR 
       
        var video_bar='<li><a href="#video"><i class="fa fa-video-camera" ></i><span style="padding-left: 5px; padding-bottom: 5px;"> Details</span></a></li>';
        $(video_bar).appendTo("#navigation-bar");
        $('#video').toggle();


        }else{
          $("#load_menu").html('');
              var trigen = 
               '<div class="col-md-4 ">'+
                '<div  class="main-item-invert ">'+
                 '<a href="#trigenerator">'+
                  '<i class="fa fa-recycle fa-2x hvr-bounce-in "></i>'+
                   '</a>'+
                    '<h3 class="h3-loads">Tri-generation</h3>'+
                     '</div>'+
                  '</div>';
             var solar = 
               '<div class="col-md-4 ">'+
                '<div  class="main-item-invert ">'+
                 '<a href="#panels">'+
                  '<i class="fa fa-sun-o fa-2x hvr-bounce-in "></i>'+
                   '</a>'+
                    '<h3 class="h3-loads">Solar Panels</h3>'+
                     '</div></div>';

               var station = 
               '<div class="col-md-4 ">'+
                '<div  class="main-item-invert">'+
                 '<a href="#station">'+
                  '<i class="fa fa-plug fa-2x hvr-bounce-in "></i>'+
                   '</a>'+
                    '<h3 class="h3-loads">Charging Stations</h3>'+
                     '</div></div>';

               
               
               $(trigen).appendTo("#load_menu"); //adding element to the menu
               $(solar).appendTo("#load_menu"); //adding element to the menu
               $(station).appendTo("#load_menu"); //adding element to the menu


        }

}
   //-----------CREATE THE TITLE AND THE BRAND --------------

    function animate_counters_loads_sources(n_users,n_cars,n_energy,n_days){
  $('.anima').waypoint(function(direction){
    if(direction=='down'){
              $.getScript("js/countUp.js", function(){
            


     var options = {
    useEasing : true,
    useGrouping : true,
    separator : ',',
    decimal : '.',
    prefix : '',
    suffix : ''
  };

  var users = new countUp("user_count", 0, n_users, 0, 2.5, options);
  var cars = new countUp("cars_count", 0, n_cars, 0, 2.5, options);
  var energy = new countUp("energy_counter", 0, n_energy, 0, 1, options);
  var days = new countUp("days_count", 0, n_days, 0, 1, options);

  users.start();
  cars.start();
  energy.start();
  days.start();

     // Use anything defined in the loaded script...
   });
  }
  },{
    offset: '10%'
  });
       

  }

  

  //------------------------------------------------------------------------
  //-------------------ENERGY CHART------------------------------------
  //------------------------------------------------------------------------


  function round(num){
    return Math.round(num * 1000) / 1000

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

        energy = ((x1+x2)/2)*t;  //average * time (15 min = 0.25 h)

        arr = new Array();
        arr.push(data[i+1].timestamp);
        arr.push(round(energy));

        json.push(arr);


      }

      return json;

    }



  function panel_energy_chart(energy_consumption){

    energy = calculate_energy(energy_consumption,0.25);
    
    Highcharts.setOptions({
        global: {
          useUTC: false
        }
      });
    $('#energy_chart').highcharts({
          chart: {
              type: 'column'
          },
          title: {
              text:''
          },
          events:{
            load : function(){
           this.hideLoading();
         },
         redraw: function(){
           this.hideLoading();
         }

         },
          
          xAxis: {
              type: 'datetime',       
              startOnTick: true,
              tickInterval: (3600*1*1000),

            },
          yAxis: {
              min: 0,
              title: {
                  text: 'Energy production (kWh)'
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
                  borderWidth: 0
              }
              
          },
          credits: {
              enabled: false
            },
          series: [{
              name: 'Total Yield [kWh]',
              // data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
              data: energy,
              color :"#337ab7"

          }]
      });


  }


  function panel_year_chart(energy_consumption){
    $(function () {
      $('#energy_chart').highcharts({
          chart: {
              type: 'column'
          },
          title: {
              text: 'Annual Average Energy Production'
          },
           credits: {
              enabled: false
            },
          xAxis: {
              categories: [
                  'Jan',
                  'Feb',
                  'Mar',
                  'Apr',
                  'May',
                  'Jun',
                  'Jul',
                  'Aug',
                  'Sep',
                  'Oct',
                  'Nov',
                  'Dec'
              ],
              crosshair: true
          },
          yAxis: {
              min: 0,
              title: {
                  text: 'Energy consumption (kWh)'
              }
          },
          legend: {
              enabled: false
            },
          tooltip: {
              headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
              pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                  '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
              footerFormat: '</table>',
              shared: true,
              useHTML: true
          },
          plotOptions: {
              column: {
                  pointPadding: 0.2,
                  borderWidth: 0
              }
              
          },
          series: [{
              name: 'Total Yield [kWh]',
              data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
               color :"#337ab7"
          }]
      });
  });
  }
  

    function panel_daily_chart(energy_consumption){

      energy = calculate_energy(energy_consumption,0.25);
      
      Highcharts.setOptions({
        global: {
          useUTC: false
        }
      });

      $('#energy_chart').highcharts({
          chart: {
              type: 'column'
          },
          title: {
              text: 'Daily Average Energy Production and Forecasting' 
          },
                    credits: {
              enabled: false
            },
          xAxis: {
              type: 'datetime',       
              startOnTick: true,
              tickInterval: (3600*1*1000),

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
              data: energy,
              color:'#00796b'

          }, {
              name: 'Predicted',
              data: energy,
              color: '#4db6ac'

          }]
      });


  var id = "#energy_chart";
  var chart = $(id).highcharts();
  var inf = new Date();
  inf.setHours(7);
  inf.setMinutes(0);

  var sup= new Date();
  sup.setHours(23);
  sup.setMinutes(59);

  chart.xAxis[0].setExtremes(inf.getTime(),sup.getTime());

        if(energy.length == 0){ //if no data display message
          $('#energy_chart').highcharts().showLoading("No data to display ):");
        }







    }   
      function panel_weekly_chart(energy_consumption){

      energy = calculate_energy(energy_consumption,0.25);
      
      Highcharts.setOptions({
        global: {
          useUTC: false
        }
      });
      $('#energy_chart').highcharts({
        chart: {

              type: 'column',

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
              text: 'Weekly Energy Production'
            },

            xAxis: {
              type: 'datetime',       
              startOnTick: true,
              tickInterval: (3600*24*1*1000),

            },

            yAxis: {
              title: {
                text: 'Energy'
              },
              labels: {
                format: '{value} kWh',
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
                marker: {
                 enabled:false
                },

                lineWidth: 1,
                states: {
                  hover: {
                    lineWidth: 1
                  }
                },
                threshold: null
              
            },

            series: [{

              name: 'Energy (kWh)',
              data: energy,
              color:"#337ab7"
            }],


          });

  var id = "#energy_chart";
  var chart = $(id).highcharts();
  var inf = new Date();
                                          day =7-(inf.getDay());
                                          inf.setDate(inf.getDate()-day);

                                          var sup= new Date();
                                          sup.setDate(sup.getDate()+day);



  chart.xAxis[0].setExtremes(inf.getTime(),sup.getTime());
  chart.hideLoading();

          if(energy[0].length == 0){ //if no data display message
            chart.showLoading("No data to display ):");
          }




      }

      function panel_monthly_chart(energy_consumption){

      energy = calculate_energy(energy_consumption,0.25);
      
      Highcharts.setOptions({
        global: {
          useUTC: false
        }
      });
      $('#energy_chart').highcharts({
        chart: {

              type: 'column',

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
              text: 'Weekly Energy Production'
            },

            xAxis: {
              type: 'datetime',       
              startOnTick: true,
              tickInterval: (3600*24*1*1000),


            },

            yAxis: {
              title: {
                text: 'Energy'
              },
              labels: {
                format: '{value} kWh',
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
                marker: {
                 enabled:false
                },

                lineWidth: 1,
                states: {
                  hover: {
                    lineWidth: 1
                  }
                },
                threshold: null
              
            },

            series: [{

              name: 'Energy (kWh)',
              data: energy,
              color:"#337ab7"
            }],


          });

  var id = "#energy_chart";
  var chart = $(id).highcharts();
  var inf = new Date();
  inf.setDate(0);

  var sup= new Date();
  sup.setDate(31);

  chart.xAxis[0].setExtremes(inf.getTime(),sup.getTime());
  chart.hideLoading();

          if(energy[0].length == 0){ //if no data display message
            chart.showLoading("No data to display ):");
          }




      }

  //------------------------------------------------------------------------
  // ---------------------------ENERGY CHART BUTTONS ----------------------
  //------------------------------------------------------------------------
  //------------------------------------------------------------------------
  // ---------------------------ENERGY CHART BUTTONS ----------------------
  //------------------------------------------------------------------------
  function show_year_panel_energy () {
    var id = "#energy_chart";
    var chart = $(id).highcharts();
    chart.showLoading();
    $.when(get_variable_year('1')).then(function(energyArgs){

      
      panel_year_chart(energyArgs);
      
      if(energyArgs.length == 0){    //if no data display message
          chart.showLoading("No data to display ):");
         }
      

  
      
         
        });
  }


  function show_month_panel_energy () {
    var id = "#energy_chart";
    var chart = $(id).highcharts();
    chart.showLoading();

    $.when(get_variable_month('1')).then(function(energyArgs){
      
      panel_monthly_chart(energyArgs);
        if(energyArgs.length == 0){    //if no data display message
          chart.showLoading("No data to display ):");
         }
        });
  }

  function show_week_panel_energy () {
    var id = "#energy_chart";
    var chart = $(id).highcharts();
    chart.showLoading();

    $.when(get_variable_week('1')).then(function(energyArgs){
      panel_weekly_chart(energyArgs);
      if(energyArgs.length == 0){    //if no data display message
          chart.showLoading("No data to display ):");
         }
        });
  }




  function show_day_panel_energy() {
    var id = "#energy_chart";
    var chart = $(id).highcharts();
    chart.showLoading();

    $.when(get_variable_day('1')).then(function(energyArgs){
      draw_daily_panel_chart(calculate_energy(energyArgs,1));
      if(energyArgs.length == 0){    //if no data display message
          chart.showLoading("No data to display ):");
         }
      
        });
  }


