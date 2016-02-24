
//------------------------------------------------------------------------------
//---------------------------BACK BUTTON  ------------------------------------
//------------------------------------------------------------------------------
function go_back(){
  
  var parameters = location.search.substring(1).split("&");
  var temp = parameters[0].split("=");
  var demonstrator_name = unescape(temp[1]);
  if(demonstrator_name.indexOf("Polimi") > -1){
    window.location=("http://eis.deib.polimi.it/totem/demonstrator.html?cid=1#1");
  }else{
    window.open("http://eis.deib.polimi.it/totem/demonstrator.html?cid=2#1","_self");
  }


}




//------------------------------------------------------------------------------
//---------------------------BUILDING DATA ------------------------------------
//------------------------------------------------------------------------------
      
      //--------------GLOBAL VARIABLES ----------------

      var building = {

        building_id : unescape( (location.search.substring(1).split("&")[1].split("="))[1]),
        demonstrator_id: unescape( (location.search.substring(1).split("&")[0].split("="))[1]),
      }

      var date = new Date();

      // var parameters2 = location.search.substring(1).split("&");
      // var d = parameters2[0].split("=");
      // demonstrator_id = unescape(d[1]);

      // var parameter = location.search.substring(1).split("&");
      // var id = parameter[1].split("=");
      // building.building_id = unescape(id[1]);

      // var ciao  = unescape( (location.search.substring(1).split("&")[1].split("="))[1]);
      // alert(building.id);

      // var ciao2  = 
      // alert(ciao2);

  function get_data_building()
    {

     var link = 'http://131.175.56.243:8080/buildings/'+building.building_id;
     return  $.ajax({
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
function get_data_rooms_building(){

              

              var url = 'http://131.175.56.243:8080/rooms/building/'+building.building_id;    
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

function get_feedback_building(type){
  

             //var url ='http://131.175.56.243:8080/comfortfeedbacks/app/building/1/2015/04/20?var='+type;
             
             //MONTH
             // var url = 'http://131.175.56.243:8080/comfortfeedbacks/app/building/'+id+'/'+date.getFullYear()+'/'+(date.getMonth()+1)+'/?var='+type;    
              var url = 'http://131.175.56.243:8080/comfortfeedbacks/app/building/'+building.building_id+'/'+date.getFullYear()+'/?var='+type;    
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



function animate_counters_building(n_smart_spaces,n_feedbacks){
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

var feedback = new countUp("sensor_count", 0, n_smart_spaces, 0, 2.5, options);
var rooms = new countUp("feedback_count", 0, 20, 0, 2.5, options);
var user = new countUp("user_count", 0, 60, 0, 1, options);
feedback.start();
rooms.start();
user.start();
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

            var image ='<img src="img/'+building.building_id+'.png" class="animated fadeInDown" alt="">'
            $(image).appendTo("#load");
var rest = ' <div class="spinner">'+
              '<div class="bounce1"></div>'+
              '<div class="bounce2"></div>'+
              '<div class="bounce3"></div>'+
            '</div>'
            $(rest).appendTo("#load");


}




//-----------------------SMART SPACES MENU (STRUCTURE SECTION) ------------------
function build_rooms_menu(data2,b_name){  

  building_name = b_name.split(" ");
  data = clear_rooms_data(data2);
//data =data2;
var column_class = find_column_class(data.length);

var icon_source = "";
$("#menu_rooms").html('');

if(data.length ==0){
  //IF BUILDING HAS NO SMART ROOMS
  var icon = '<i class="fa fa-cog fa-spin fa-5x" style="color: #337ab7; margin-top:100px "></i>';
  var elm = '<h3 style="color: #337ab7;">We are sorry, there are no smart spaces in this building ( yet! )</h3>';
  $(icon).appendTo("#menu_rooms"); //adding element to the menu
  $(elm).appendTo("#menu_rooms");
  $("#menu_rooms").show("fast");
  document.getElementById("menu_rooms").style.display = "block";
  }else{

      for (i =0; i<data.length; i++) {         
        
        
        icon_source = "fa-cube";
        
          name = modifyString(data[i].label);
          if(name == "Modulo bs"){
            continue;
          }

        id = data[i].roomid;
                  //Dynamically Create the menu of buildings for the selected demonstrator
                  var elm = '<div class="'+column_class+'">'+
                  '<div id="'+name+'" class="room-item scrollpoint sp-effect5 active animated fadeInRight">'+
                  '<i class="fa '+icon_source+' fa-2x hvr-grow" style="width: 108px;"></i><h3 class="room_label">'+name+'</h3>'+
                  '</div></div>';
                  
                   $(elm).appendTo("#menu_rooms"); //adding element to the menu
                   //Add listener dynamically to the div in order to dynamically open the webpage 
                   $(document.getElementById(name)).click({building_name: building_name[1],id_room: id}, open_roomInfo_page);
                    //$(document.getElementById(name)).click({nome_edificio: name, id_edificio: id }, build_room_menu);
                    
                  }
                  
                  $("#menu_rooms").show("fast");             
                }

}

//Select only the "smart spaces"
function clear_rooms_data(data){
 var json_2 = new Array();
 for (i =0; i<data.length; i++) {
  if(data[i].ipgateway== null && building.demonstrator_id =="Polimi"){
    continue;
  }else if(data[i].identifier=="Atrio P1" || data[i].identifier=="Atrio PT"){
    continue;
  }else{
    json_2.push(data[i]);
  }
}

return json_2;
}

//CHECK THE GRID
function find_column_class(length){
  json = new Array();
  if(length == 1){
    json.push(" ");
  }if(length == 4){
    return " col-xs-6 col-sm-3 ";
  }else if (length==6){
    json.push(" col-xs-6 col-md-4  ");
    json.push("0");
    return json;
  }else if(length%2==0){
    json.push(" col-xs-6");
    json.push("0");
    return json;
  }else if(length%2==1 && data.length%3==0){
    json.push(" col-xs-6 col-md-4  ");
    json.push("0");
    return json;
  }else {
    json.push(" col-xs-6 col-md-4  ");
    json.push(String(data.length%3));
    return json;
  }


}


function open_roomInfo_page(caller_info){
      setToOne();
      window.open("http://eis.deib.polimi.it/totem/room.html?d="+building.demonstrator_id+"&cid="+building.building_id+"-"+caller_info.data.building_name+'&rid='+caller_info.data.id_room,"_self");
      
      //window.open("http://131.175.56.243/totem/room.html?d="+demonstrator_id+"&cid="+building.building_id+"-"+caller_info.data.building_name+'&rid='+caller_info.data.id_room,"_self");
}


function setToOne() {
    location.hash = "1";
    
}

function checkFirstTime(x){
  
  if(x==1){ 
  
   $('html, body').animate({scrollTop: ($('#structure').offset().top+400) },700);
  }
  
  location.hash='';
    }

//------------------------------------------------------------------------
//------------------------AMBIENT CHART BUTTONS LISTENER -----------------
//------------------------------------------------------------------------

    function show_feedback_anal(){
                $("#feedback_chart_button").toggle("fast");
                $("#feedback_anal_filter").toggle("fast");
                $("#feedback_row").toggle("slow");
                
                $("#feedback_anal_row").toggle("slow");

                
              }








//------------------------------------------------------------------------
// ---------------------------CHART BUTTONS FUNCTIONS ----------------
//------------------------------------------------------------------------



//CALL THE CORRECT FUNCTION DEPENDING ON THE PERIOD/VARIABLE SELECTED
function draw_building_chart(period,variable){

  //DAILY
  if(period==1 && variable==1){
      show_day_temperature();
      
  }else if (period==1 && variable==2){
      show_day_humidity();

  }

  //WEEK
  else if (period==2 && variable==1){
      show_week_temperature();

  }else if (period==2 && variable==2){
      show_week_humidity();

  }

  //MONTH
  else if(period==3 && variable==1){
      show_month_temperature();

  }else if(period==3 && variable==2){
    show_month_humidity();
  }

  //YEAR
  else if(period==4 && variable==1){
    show_year_temperature();

  }else if(period==4 && variable==2){
    show_year_humidity();
  }
}




//LISTENER FOR "PERIOD BUTTONS CLICK"
function show_today(){
  period=1;
  draw_building_chart(period,variable);
}

function show_week(){
  period=2;
  draw_building_chart(period,variable);
}

function show_month(){
  period=3;
  draw_building_chart(period,variable);
}
function show_year(){
  period=4;
  draw_building_chart(period,variable);
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
  $("#confrontation_chart").fadeOut("fast",function(){
    $("#chart").fadeIn("fast");
  });
  
  document.getElementById("temp_filter").className = "button js-filter-all clicked";
  document.getElementById("humid_filter").className = "button js-filter-all not_clicked";
  
  active_filter();
  draw_building_chart(period,variable);
}


//SET THE VARIABLE TO HUMIDITY AND CALL THE DRAW_BUILDING_CHART
function show_humid(){
  variable=2; //2= humidity/rain
  $("#chart").fadeOut("fast",function(){
    $("#confrontation_chart").fadeIn("fast");
  });
  
  document.getElementById("humid_filter").className = "button js-filter-all clicked";
  document.getElementById("temp_filter").className = "button js-filter-all not_clicked";
  active_filter();
  draw_building_chart(period,variable);
}


//------------------------------------------------------------------------
// ---------------------------TEMPERATURE CHART BUTTONS ----------------
//------------------------------------------------------------------------



function show_year_temperature () {
  var id = "#chart";
  var chart = $(id).highcharts();
  chart.showLoading();
  $.when( get_weather_year('airtemperature',1)
    ).then(function(tempArgs){
      chart.xAxis[0].options.tickInterval=(3600*24*30*1000);
      chart.series[0].setData(organize_Data(tempArgs));
      chart.setTitle({text:"Annual Temperature"});
      
      var inf = new Date();
      inf.setMonth(0);
      inf.setDate(1);

      var sup= new Date();

      sup.setMonth(11);
      sup.setDate(31);
      

      chart.xAxis[0].setExtremes(inf.getTime(),sup.getTime());


       if(tempArgs.length == 0){    //if no data display message
        chart.showLoading("No data to display ):");
      }
    });
  }




  function show_month_temperature () {
    var id = "#chart";
    var chart = $(id).highcharts();
    chart.showLoading();
    $.when( get_weather_month('airtemperature',1)
      ).then(function(tempArgs){
        chart.xAxis[0].options.tickInterval=(3600*24*1*1000);
        chart.series[0].setData(organize_Data(tempArgs));
        chart.setTitle({text:"Monthly Temperature"});
        
        var inf = new Date();
        inf.setDate(0);

        var sup= new Date();
        sup.setDate(31);
        

        chart.xAxis[0].setExtremes(inf.getTime(),sup.getTime());

       if(tempArgs.length == 0){    //if no data display message
        chart.showLoading("No data to display ):");
      }
    });
    }


    function show_week_temperature () {
      var id = "#chart";
      var chart = $(id).highcharts();
      chart.showLoading();
      $.when( get_weather_week('airtemperature',1)
        ).then(function(tempArgs){
          chart.xAxis[0].options.tickInterval=(3600*24*1*1000);
          chart.series[0].setData(organize_Data(tempArgs));
          chart.setTitle({text:"Weekly Temperature"});
          var inf = new Date();
          day =7-(inf.getDay());
          inf.setDate(inf.getDate()-day);

          var sup= new Date();
          sup.setDate(sup.getDate()+day);
          

          chart.xAxis[0].setExtremes(inf.getTime(),sup.getTime());
        if(tempArgs.length == 0){ //if no data display message
          chart.showLoading("No data to display ):");
        }
      });
      }


      function show_day_temperature() {
        var id = "#chart";
        var chart = $(id).highcharts();
        chart.showLoading();
        
        $.when( get_weather_day('airtemperature',1)
          ).then(function(tempArgs){
            chart.xAxis[0].options.tickInterval=(3600*1*1000);
            chart.series[0].setData(organize_Data(tempArgs));
            chart.setTitle({text:"Daily Temperature"});
            var inf = new Date();
            inf.setHours(0);
            inf.setMinutes(0);

            var sup= new Date();
            sup.setHours(23);
            sup.setMinutes(59);

            chart.xAxis[0].setExtremes(inf.getTime(),sup.getTime());
      if(tempArgs.length == 0){   //if no data display message
        chart.showLoading("No data to display ):");
      }
    });
        }
//------------------------------------------------------------------------
// ---------------------------HUMIDITY CHART BUTTONS -------------------
//------------------------------------------------------------------------
function show_year_humidity () {
  var id = "#confrontation_chart";
  var chart = $(id).highcharts();
  chart.showLoading();
  $.when( get_weather_year('relativehumidity',1),
    get_weather_year('rainrate',1)
    ).then(function(humidArgs,rainArgs){
      chart.xAxis[0].options.tickInterval=(3600*24*30*1000);
      chart.series[1].setData(organize_Data(humidArgs[0]));
      chart.series[0].setData(organize_Data(rainArgs[0]));
      chart.setTitle({text:"Annual Humidity and Rain rates"});
      var inf = new Date();
      inf.setMonth(0);
      inf.setDate(1);

      var sup= new Date();

      sup.setMonth(11);
      sup.setDate(31);
      

      chart.xAxis[0].setExtremes(inf.getTime(),sup.getTime());
         if(humidArgs[0].length == 0 && rainArgs[0].length==0){ //if no data display message
          chart.showLoading("No data to display ):");
        }
      });
  }


  function show_month_humidity () {
    var id = "#confrontation_chart";
    var chart = $(id).highcharts();
    chart.showLoading();
    $.when( get_weather_month('relativehumidity',1),
      get_weather_month('rainrate',1)
      ).then(function(humidArgs,rainArgs){
        chart.xAxis[0].options.tickInterval=(3600*24*1*1000);
        chart.series[1].setData(organize_Data(humidArgs[0]));
        chart.series[0].setData(organize_Data(rainArgs[0]));
        chart.setTitle({text:"Monthly Humidity and Rain rates"});
        
        var inf = new Date();
        inf.setDate(0);

        var sup= new Date();
        sup.setDate(31);
        

        chart.xAxis[0].setExtremes(inf.getTime(),sup.getTime());
         if(humidArgs[0].length == 0 && rainArgs[0].length==0){ //if no data display message
          chart.showLoading("No data to display ):");
        }
      });
    }

    function show_day_humidity() {
      var id = "#confrontation_chart";
      var chart = $(id).highcharts();
      chart.showLoading();
      $.when( get_weather_day('relativehumidity',1),
        get_weather_day('rainrate',1)
        ).then(function(humidArgs,rainArgs){
          chart.xAxis[0].options.tickInterval=(3600*1*1000);
          chart.series[1].setData(organize_Data(humidArgs[0]));
          chart.series[0].setData(organize_Data(rainArgs[0]));
          chart.setTitle({text:"Daily Humidity and Rain rates"});
          var inf = new Date();
          inf.setHours(0);
          inf.setMinutes(0);

          var sup= new Date();
          sup.setHours(23);
          sup.setMinutes(59);

          chart.xAxis[0].setExtremes(inf.getTime(),sup.getTime());
       if(humidArgs[0].length == 0 && rainArgs[0].length==0){ //if no data display message
        chart.showLoading("No data to display ):");
      }
    });
      }

      function show_week_humidity () {
        var id = "#confrontation_chart";
        var chart = $(id).highcharts();
        chart.showLoading();
        $.when( get_weather_week('relativehumidity',1),
          get_weather_week('rainrate',1)
          ).then(function(humidArgs,rainArgs){
            chart.xAxis[0].options.tickInterval=(3600*24*1*1000);
            chart.series[1].setData(organize_Data(humidArgs[0]));
            chart.series[0].setData(organize_Data(rainArgs[0]));
            chart.setTitle({text:"Weekly Humidity and Rain rates"});
            var inf = new Date();
            day =7-(inf.getDay());
            inf.setDate(inf.getDate()-day);

            var sup= new Date();
            sup.setDate(sup.getDate()+day);
            

            chart.xAxis[0].setExtremes(inf.getTime(),sup.getTime());
         if(humidArgs[0].length == 0 && rainArgs[0].length==0){ //if no data display message
          chart.showLoading("No data to display ):");
        }
      });
        }

//------------------------------------------------------------------------
// ---------------------------ENERGY CHART BUTTONS ----------------------
//------------------------------------------------------------------------

function show_month_energy () {
  var id = "#energy_chart";
  var chart = $(id).highcharts();
  chart.showLoading();
  //     $.when( get_weather_month('airtemperature')
  // ).then(function(tempArgs){
  //     chart.series[0].setData(organize_Data(tempArgs));
  // });
}

function show_day_energy() {
  var id = "#energy_chart";
  var chart = $(id).highcharts();
  chart.showLoading();
  
  //   $.when( get_weather_day('airtemperature')
  // ).then(function(tempArgs){
  //     chart.series[0].setData(organize_Data(tempArgs));
  // });
}

function show_week_energy () {
  var id = "#energy_chart";
  var chart = $(id).highcharts();
  chart.showLoading();
  //     $.when( get_weather_week('airtemperature')
  // ).then(function(tempArgs){
  //     chart.series[0].setData(organize_Data(tempArgs));
  
  // });
}




