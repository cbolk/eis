
//------------------------------------------------------------------------
//-------------------FEEDBACK CHART------------------------------------
//------------------------------------------------------------------------

function organize_FeedbackData(data){
 json = new Array();
 var empty =true;
 for (i =0; i<data.length; i++) {
  if(data[i][1] !=0){
    empty = false;
  }
  arr = new Array();
      //arr.push(parseFloat(data[i][1]));
      json.push(parseFloat(data[i][1]));


    }
    //----------NULL CONTROL -----------
    // if(empty == false){
    //   //alert("ritorno null");
    //   return null;
    // }else{
    // return json;
    // }
    return json;

  }
  var getColor = {
    'T_Normal': '#1abc9c',
    'T_Cold': '#2196f3',
    'T_Too_Cold': '#1a237E', 
    'T_Hot': '#ff3d00', 
    'T_Too_Hot': '#d50000', 
    'H_Normal': '#03A9F4', 
    'H_Dry': '#e67e22', 
    'H_Humid': '#34495e',  //wet asphalt
    'A_Stale': '#8e44ad', 
    'A_Clean': '#3498db', 
    };

//------------------------------------------------------------------------
//-------------------TEMPERATURE FEEDBACK CHART------------------------------------
//------------------------------------------------------------------------
//tempdata[0] = too cold, tempdata[1] = cold , tempdata[2] = normale, tempdata[3] =, hot tempdata[4]=too hot
function temp_feedback_chart(temp_data,count) {

  $('#temp_feedback').highcharts({
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      spacingBottom: 100,
    },
    exporting: {
     enabled: false
   },

   title: {
    text: 'Thermal comfort'
  },
  legend: {
    itemStyle: {
     font: '12pt Roboto Condensed, sans-serif',
   },

 },
 tooltip: {
              // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
              pointFormat: '<b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
              pie: {
                allowPointSelect: true,
                animation: true,
                cursor: 'pointer',
                size:'90%',
                dataLabels: {
                  enabled: true,
                  format: '{point.percentage:.1f} %',
                  style: {
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                  }
                },
                showInLegend: true
              },
              
            },
            credits: {
              enabled: false
            },

            series: [{
              type: 'pie',
              name: 'Feedback(%)',
              data: [
              {
                y : temp_data[0],
                name: 'Too cold',
                color : getColor['T_Too_Cold']
              },
              {
                name: 'Cold',
                y: temp_data[1],
                color : getColor['T_Cold']
              },
              {
                name: 'Normal',
                y: temp_data[2],
                color : getColor['T_Normal']
              },
              {
                name: 'Hot',
                y: temp_data[3],
                color : getColor['T_Hot']
              },
              {
                name: 'Too hot',
                y: temp_data[4],
                color : getColor['T_Too_Hot']
              }
              ]
            }]
          });

if(count == 0){

  $('#temp_feedback').highcharts().showLoading('No feedback data to display :(');
    $('#temp_feedback').highcharts().series[0].remove();

  }
}





//------------------------------------------------------------------------
//-------------------HUMID FEEDBACK CHART------------------------------------
//------------------------------------------------------------------------

//humid_data[0] = dry , humid_data[1]= normal, humid_data[2] = humid
function humid_feedback_chart(humid_data,count) {
  $('#humid_feedback').highcharts({
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      spacingBottom: 100,

    },
    title: {
      text: 'Humidity'
    },
    tooltip: {
      pointFormat: '<b>{point.percentage:.1f}%</b>'
    },
    exporting: {
     enabled: false
   },
   credits: {
    enabled: false
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      size:'80%',
      dataLabels: {
        enabled: true,
        format: '{point.percentage:.1f} %',
        style: {
          color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
        }
      },
      showInLegend: true
    }
  },
  credits: {
    enabled: false
  },
  legend: {
    itemStyle: {
     font: '12pt Roboto Condensed, sans-serif',
   },

 },
 series: [{
  type: 'pie',
  name: 'Feedback(%)',
  data: [
  {
    name: 'Normal',
    y: humid_data[1],
    color : getColor['H_Normal']
  },
  {
    name: 'Dry',
    y: humid_data[0],
    color : getColor['H_Dry']
  },
  {
    name: 'Humid',
    y: humid_data[2],
    color : getColor['H_Humid']
  }
  ]
}]
});
if(count == 0){

  $('#humid_feedback').highcharts().showLoading('No feedback data to display :(');
    $('#humid_feedback').highcharts().series[0].remove();

  }
}


//------------------------------------------------------------------------
//-------------------AIR FEEDBACK CHART------------------------------------
//------------------------------------------------------------------------
//air_data[0]= clean, air_data[1]=stale
function air_feedback_chart(air_data,count) {
  $('#air_feedback').highcharts({
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      spacingBottom: 100,
    },
    title: {
      text: 'Air quality'
    },
    exporting: {
     enabled: false
   },
   legend: {
    itemStyle: {
     font: '12pt Roboto Condensed, sans-serif',
     fontWeight: "bold",
   },

 },

 tooltip: {
  pointFormat: '<b>{point.percentage:.1f}%</b>'
},
plotOptions: {
  pie: {
    allowPointSelect: true,
    cursor: 'pointer',
    size:'80%',
    dataLabels: {
      enabled: true,
      format: '{point.percentage:.1f} %',
      style: {
        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
      }
    },
    showInLegend: true

  }
},
credits: {
  enabled: false
},
series: [{
  type: 'pie',
  name: 'Feedback(%)',
  data: [
  {
    name: 'Clean',
    y: air_data[0],
    color : getColor['A_Clean']
  },
  {
    name: 'Stale',
    y: air_data[1],
    color : getColor['A_Stale']
  }

  ]
}]
});
  if(count == 0){

    $('#air_feedback').highcharts().showLoading('No feedback data to display :(');
      $('#air_feedback').highcharts().series[0].remove();

    }
  }



//------------------------------------------------------------------------
//------------------- FEEDBACK ANALYTICS CHART------------------------------------
//------------------------------------------------------------------------
function feedback_analitic_chart_bar(n_temperature,n_humid,n_air){
  var monthNames = ["January", "February", "March", "April", "May","June","July", "August", "September", "October", "November", "December"];
  var d = new Date();
  current_month = monthNames[d.getMonth()];
  total = n_temperature+n_humid+n_air;
  $('#anal_feedback_bar').highcharts({

    title: {
      text: 'Total feedback recorded: </strong>'+total+'</strong>',
      useHTML:true
    },

    credits: {
      enabled: false
    },
    exporting: {
     enabled: false
   },
   legend: {
    itemStyle: {
     font: '12pt Roboto Condensed, sans-serif',
     fontWeight: "bold",
   },

 },
 xAxis: {
  name: '',
   labels: {
       enabled: false
   }
},
 plotOptions: {
                    series: {
                        borderWidth: 0,
                        dataLabels: {
                            enabled: true,
                            format: '{point.y}'
                        }
                    }
                },

                tooltip: {
                    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                   
                },
series: [{
  type: 'column',
  name: 'Thermal',
  data: [n_temperature],
  color : getColor['T_Too_Hot']
}, {
  type: 'column',
  name: 'Humidity',
  data: [n_humid],
  color: getColor['H_Humid']
}, {
  type: 'column',
  name: 'Air Quality',
  data: [n_air],
  color: getColor['A_Clean']
}]
});

}


function feedback_analitic_chart_pie(n_temperature,n_humid,n_air){
  total = n_temperature + n_air + n_humid;
  n_temperature = (n_temperature/total)*100;
  
  n_humid = (n_humid/total)*100;
  
  n_air = (n_air/total)*100;

  
  
  $('#anal_feedback_pie').highcharts({
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      spacingBottom: 100,
    },
    exporting: {
     enabled: false
   },

  title: {
            text: 'Feedback\'s categories distribution' ,
            //align: 'center',
            useHTML:true,
            //verticalAlign: 'middle',
            
        },
  legend: {
    itemStyle: {
     font: '12pt Roboto Condensed, sans-serif',
   },

 },
 tooltip: {
              // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
              pointFormat: '<b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
              pie: {
                allowPointSelect: true,
                animation: true,
                cursor: 'pointer',
                size:'70%',
                dataLabels: {
                  enabled: true,
                  format: '{point.percentage:.1f} %',
                  style: {
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                  }
                },
                showInLegend: true,
                startAngle: -180,
                endAngle: 180,
              // center: ['50%', '65%']
              },
              
            },
            credits: {
              enabled: false
            },

            series: [{
              type: 'pie',
              name: 'Feedback(%)',

            innerSize: '60%',
              data: [
              {
                y : n_temperature,
                name: 'Thermal',
                color : getColor['T_Too_Hot']
              },
              {
                name: 'Humidity',
                y: n_humid,
                color: getColor['H_Humid']
              },
              {
                name: 'Air Quality',
                y: n_air,
                color: getColor['A_Clean']
              },
              
              ]
            }]
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

  var getColorEnergy = {
    'Production': '#009688',
    'Consumption': '#F44336', 
  };



  function energy_chart(energy_consumption){

    energy = calculate_energy(energy_consumption,1);
    
    
    Highcharts.setOptions({
      global: {
        useUTC: false
      }
    });
    $('#energy_chart').highcharts({
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
            text: 'Daily power consumption'
          },
    
          xAxis: {
            type: 'datetime',       
            startOnTick: true,
            tickInterval: (60*1*1000),


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

          series: [{
            name: 'Power (kW)',
            step: 'left',
            marker: {
              enabled: false
            },
            data: energy
          }]

        });

var id = "#energy_chart";
var chart = $(id).highcharts();
var inf = new Date();
inf.setHours(0);
inf.setMinutes(0);

var sup= new Date();
sup.setHours(23);
sup.setMinutes(59);

chart.xAxis[0].setExtremes(inf.getTime(),sup.getTime());

      if(energy.length == 0){ //if no data display message
        $('#energy_chart').highcharts().showLoading("No data to display ):");
      }




    }


    function energy_chart_confrontation(energy) {
     var seriesOptions = [],
     seriesCounter = 0,
     names = ['MSFT', 'AAPL'],
          // Create the chart
          // create the chart when all data is loaded
          createChart = function () {

            $('#energy_chart').highcharts('StockChart', {

              rangeSelector: {
                selected: 4
              },
              chart :{
                pinchType : null,
                zoomType:null,
              },
              navigator : {
                enabled : false
              },
              exporting: {
               enabled: false
             },

             scrollbar: {
              enabled:false
            },

            credits: {
              enabled: false
            },
            rangeSelector : {
              enabled: false
            },

            xAxis:{
              startOnTick: true,
              tickInterval:(3600*1*1000)
            },
            yAxis: {
              labels: {
                formatter: function () {
                  return (this.value > 0 ? ' + ' : '') + this.value + 'GWh';
                }
              },
              plotLines: [{
                value: 0,
                width: 2,
                color: 'silver'
              }]
            },

            plotOptions: {
              series: {
                compare: 'value'
              }
            },

            tooltip: {
              pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
              valueDecimals: 2
            },

            series: seriesOptions,
          });
};

$.each(names, function (i, name) {
  var nameColor ='';
  if(i == 0){
    nameColor = 'Consumption';
  }else{
    nameColor = 'Production';


  }
  $.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename=' + name.toLowerCase() + '-c.json&callback=?',    function (data) {

    seriesOptions[i] = {
      name: nameColor,
      data: data,
      color : getColorEnergy[nameColor]
    };

              // As we're loading the data asynchronously, we don't know what order it will arrive. So
              // we keep a counter and create the chart when all the data is loaded.
              seriesCounter += 1;

              if (seriesCounter === names.length) {
                createChart();
              }
            });
});
}



//------------------------------------------------------------------------
//-------------------AMBIENT  CHARTS ROOMS AND BUILDINGS  ---------------------------------------
//------------------------------------------------------------------------

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
//-------------------LUMINANCE CHART------------------------------------
//------------------------------------------------------------------------


function luminance_chart(){
 // luminance_to_plot = organize_luminance_Data(luminance);
  Highcharts.setOptions({
    global: {
      useUTC: false
    }
  });
  $('#luminance_chart').highcharts({
    chart: {
      type: 'spline',
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
                  text: 'Daily Luminance level'
                },
                exporting: {
                 enabled: false
               },
               credits: {
                enabled: false
              },
              xAxis: {
                type:'datetime',
                startOnTick: true,
                tickInterval:(3600*1*1000)
              },
              
        plotOptions: {
            series: {
                connectNulls: true
            }
        },
              yAxis: {
                labels: {
              format: '{value} Lux',
              style: {
                color: Highcharts.getOptions().colors[1]
              }
            },
                title: {
                  text: 'Luminance Level'
                }
              },

              tooltip: {
                crosshairs: true,
                shared: true,
                valueSuffix: ' Lux'
              },

              legend: {
                enabled: false
              },


              series: [{
                name: 'Luminance level',
                data: [],
                color: '#FFc107',
              }

              ]

            });
// var id = "#luminance_chart";
// var chart = $(id).highcharts();
// var inf = new Date();
// inf.setHours(0);
// inf.setMinutes(0);

// var sup= new Date();
// sup.setHours(23);
// sup.setMinutes(59);

// chart.xAxis[0].setExtremes(inf.getTime(),sup.getTime());
//   if(luminance_to_plot.length == 0){ //if no data display message
//     $('#luminance_chart').highcharts().showLoading("No data to display ):");
//   }


}

//------------------------------------------------------------------------
//-------------------co2 CHART--------------------------------------------
//------------------------------------------------------------------------

function co2_chart(){
  Highcharts.setOptions({
    global: {
      useUTC: false
    }
  });
  //co2_to_plot = organize_co2_Data(co2);

  $('#co2_chart').highcharts({

    chart: {
      type: 'spline',
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
                  text: 'Daily CO<sub>2</sub> level',
                  useHTML : true
                },
                exporting: {
                 enabled: false
               },
               credits: {
                enabled: false
              },
              xAxis: {
                type:'datetime',
                startOnTick:true,
                tickInterval:(3600*1*1000)

              },
              plotOptions: {
            series: {
                connectNulls: true
            }
        },

              yAxis: {
                 min: 0,
                 max:1500,
                tickInterval:100,
 		gridLineWidth: 0,
                title: {
                  text: 'CO<sub>2</sub> Level',
                  useHTML : true
                },
                labels: {
              format: '{value} ppm',
              style: {
                color: Highcharts.getOptions().colors[1]
              }
            },
            plotBands: [{ // visualize the weekend
                from: 1000,
                to:2000,                
                color: '#ff9800',
                label: {
                  text: 'Dangerous indoor concentration',
		  align:'right',
                  y: -35,
                  x: -10,
                },
            },
            {
              from: 250,
                to:1000,                
                 color: '#4CAf50',
                label: {
                  text: 'Normal indoor concentration',
                  align:'right',
                  y: -60,
		  x: -10,
                },
              }

            ]
        },
              

              tooltip: {
                crosshairs: true,
                shared: true,
                valueSuffix: ' ppm'
              },

              legend: {
                enabled: false
              },


              series: [{
                name: 'Level ',
                
                data: [],
                color: "#4a148c"

              }

              ]

            });
// var id = "#co2_chart";
// var chart = $(id).highcharts();
// var inf = new Date();
// inf.setHours(0);
// inf.setMinutes(0);

// var sup= new Date();
// sup.setHours(23);
// sup.setMinutes(59);

// chart.xAxis[0].setExtremes(inf.getTime(),sup.getTime());
// //chart.yAxis[0].setExtremes(330,500);
//   if(co2_to_plot.length == 0){ //if no data display message
//     $('#co2_chart').highcharts().showLoading("No data to display ):");
//   }


}



//------------------------------------------------------------------------
//-------------------TEMPERATURE CHART------------------------------------
//------------------------------------------------------------------------




function temperature_confrontation_chart(){
  Highcharts.setOptions({
    global: {
      useUTC: false
    }
  });
  // temperature = organize_Data(temperature);
  // i_temperature = organize_Data(i_temperature);

  $('#temp_chart').highcharts({
    chart: {
              // zoomType: 'xy'
              type: 'spline',
              events:{

                load : function(){
                 this.hideLoading();
               },
               redraw: function(){
                 this.hideLoading();
               }
             }
           },
           plotOptions: {
            series: {
              marker: {
                enabled: false,
                
              },
              connectNulls:true,
            },
            
          },


          credits: {
            enabled: false
          },

          exporting: {
           enabled: false
         },

         title: {
          text: 'Daily Internal/External Temperature comparison'
        },

        xAxis: [{
              // categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
              //     'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
              crosshair: true,
              type:'datetime',
              startOnTick: true,
              tickInterval:(3600*1*1000),
              dateTimeLabelFormats: { // don't display the dummy year
              month: '%e. %b',
              year: '%b',
           
            },
            title: {
              text: 'Date'
            }
          }],


          yAxis: { // Primary yAxis
            labels: {
              format: '{value} °C',
              style: {
                color: Highcharts.getOptions().colors[1]
              }
            },
            title: {
              text: 'Temperature',
              style: {
                color: Highcharts.getOptions().colors[1]
              }
            },
              max : 50, //lo moltiplica per 2...
              min : -10
            },

            tooltip: {
              shared: true
            },
            legend: {
              layout: 'vertical',
              align: 'left',
              x: 100,
              verticalAlign: 'top',
              y: 50,
              floating: true,
              backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
            },
            series: [{
              name: 'Temperature (internal)',  
              color: "#b71c1c",
              data: [],
            }, {
              name: 'Temperature (external)',

              color: "#ff4436",
              data: [],
              dashStyle: 'longdash'
            }]
          });

// var id = "#confrontation_chart";
// var chart = $(id).highcharts();
// var inf = new Date();
// inf.setHours(0);
// inf.setMinutes(0);

// var sup= new Date();
// sup.setHours(23);
// sup.setMinutes(59);

// chart.xAxis[0].setExtremes(inf.getTime(),sup.getTime());
//  if(temperature.length == 0 && i_temperature.length==0){ //if no data display message
//   $('#airtemperature_chart').highcharts().showLoading("No data to display ):");
// }

}

function temperature_chart(){
  Highcharts.setOptions({
    global: {
      useUTC: false
    }
  });
  $('#chart').highcharts({

    chart: {
      type: 'spline',
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
                  text: 'Daily Temperature'
                },
                exporting: {
                 enabled: false
               },
               credits: {
                enabled: false
              },
              xAxis: {
                type:'datetime',
                startOnTick: true,
                tickInterval: (3600*1*1000)
              },
             
   

              yAxis: {
                title: {
                  text: 'Temperature'
                },
                labels: {
                  format: '{value} °C',
                  style: {
                    color: Highcharts.getOptions().colors[1]
                  }
                },
                  max : 50, //lo moltiplica per 2...
                  min : -10
                },

                tooltip: {
                  crosshairs: true,
                  shared: true,
                  valueSuffix: '°C'
                },

                legend: {
                  enabled: false
                },

          plotOptions: {
            series: {
                connectNulls: true
            }
        },
                series: [{
                  color: "#b71c1c",
                  name: 'Temperature',
                  data: []
                }]

              });
// var id = "#chart";
// var chart = $(id).highcharts();
// var inf = new Date();
// inf.setHours(0);
// inf.setMinutes(0);

// var sup= new Date();
// sup.setHours(23);
// sup.setMinutes(59);

// chart.xAxis[0].setExtremes(inf.getTime(),sup.getTime());
// if(data.length == 0){ //if no data display message
//   $('#chart').highcharts().showLoading("No data to display ):");
// }


}


//------------------------------------------------------------------------
//-------------------HUMIDITY CHART---------------------------------------
//------------------------------------------------------------------------
function humidity_confrontation_chart(){
  Highcharts.setOptions({
    global: {
      useUTC: false
    }
  });
  // humidity_series = organize_Data(humidity);
  // i_humidity_series = organize_Data(i_humidity);


  $('#humid_chart').highcharts({
    chart: {
              // zoomType: 'xy'
              events:{

                load : function(){
                 this.hideLoading();
               },
               redraw: function(){
                 this.hideLoading();
               }
             }
           },
           credits: {
            enabled: false
          },
          exporting: {
           enabled: false
         },
         plotOptions: {
            series: {
                connectNulls: true
            }
        },
         title: {
          text: 'Internal and External Humidity comparison'
        },
        xAxis: [{
              // categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
              //     'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
              crosshair: true,
              type:'datetime',
              startOnTick: true,
              tickInterval:(3600*1*1000)
            }],
          yAxis: [{ // Primary yAxis
            labels: {
              format: '{value}%',
              style: {
                color: Highcharts.getOptions().colors[1]
              }
            },
            title: {
              text: 'Humidity (internal)',
              style: {
                color: Highcharts.getOptions().colors[1]
              }
            },
            max :110,
            min :0
          }, { // Secondary yAxis
            title: {
              text: 'Humidity (external)',
              style: {
                color: Highcharts.getOptions().colors[0]
              }
            },
            labels: {
              format: '{value} %',
              style: {
                color: Highcharts.getOptions().colors[0]
              }
            },
            opposite: true,
            max :110,
            min :0
          }],
          tooltip: {
            shared: true
          },
          legend: {
            layout: 'vertical',
            align: 'left',
            x: 100,
            verticalAlign: 'top',
            y: 50,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
          },
          series: [{
            name: 'Humidity (internal)',
            type: 'spline',
            color: "#1a237E",
            yAxis: 1,
            data: [],
            tooltip: {
              valueSuffix: ' %'
            }

          }, {
            name: 'Humidity (external)',
            type: 'spline',
            color: "#2196f3",
            data: [],
            tooltip: {
              valueSuffix: '%'
            }
          }]
        });
// var id = "#confrontation_chart";
// var chart = $(id).highcharts();

// var inf = new Date();
// inf.setHours(0);
// inf.setMinutes(0);

// var sup= new Date();
// sup.setHours(23);
// sup.setMinutes(59);

// chart.xAxis[0].setExtremes(inf.getTime(),sup.getTime());
//  if(humidity_series.length == 0 && i_humidity_series.length==0){ //if no data display message
//   $('#confrontation_chart').highcharts().showLoading("No data to display ):");
// }

}

//INITIALIZE THE HUMIDITY RAIN CHART
function humidity_rain_chart(){
  Highcharts.setOptions({
    global: {
      useUTC: false
    }
  });

  $('#confrontation_chart').highcharts({
    chart: {
              // zoomType: 'xy'
              events:{

                load : function(){
                 this.hideLoading();
               },
               redraw: function(){
                 this.hideLoading();
               }
             }
           },
           credits: {
            enabled: false
          },
          plotOptions: {
            series: {
                connectNulls: true
            }
        },
          exporting: {
           enabled: false
         },
         title: {
          text: 'Daily Humidity and Rain rates'
        },
        xAxis: [{
              // categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
              //     'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
              crosshair: true,
              type:'datetime',
              startOnTick: true,
              tickInterval:(3600*1*1000)
            }],
          yAxis: [{ // Primary yAxis
            labels: {
              format: '{value}%',
              style: {
                color: Highcharts.getOptions().colors[1]
              }
            },
            title: {
              text: 'Humidity',
              style: {
                color: Highcharts.getOptions().colors[1]
              }
            }
          }, { // Secondary yAxis
            title: {
              text: 'Rainfall',
              style: {
                color: Highcharts.getOptions().colors[0]
              }
            },
            labels: {
              format: '{value} mm',
              style: {
                color: Highcharts.getOptions().colors[0]
              }
            },
            opposite: true
          }],
          tooltip: {
            shared: true
          },
          legend: {
            layout: 'vertical',
            align: 'left',
            x: 100,
            verticalAlign: 'top',
            y: 50,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
          },
          series: [{
            name: 'Rainfall',
            type: 'column',
            yAxis: 1,

            data: [],
            tooltip: {
              valueSuffix: ' mm'
            }

          }, {
            name: 'Humidity',
            type: 'spline',
            color:"#1a237e",
            data: [],
            tooltip: {
              valueSuffix: '%'
            }
          }]
        });
// var id = "#relativehumidity_chart";
// var chart = $(id).highcharts();
// var inf = new Date();
// inf.setHours(0);
// inf.setMinutes(0);

// var sup= new Date();
// sup.setHours(23);
// sup.setMinutes(59);

// chart.xAxis[0].setExtremes(inf.getTime(),sup.getTime());
//  if(humidity.length == 0 && rain.length==0){ //if no data display message
//   $('#relativehumidity_chart').highcharts().showLoading("No data to display ):");
// }
}





