
  //------------------------------------------------------------------------------
  //------------------------------BACK BUTTON LISTENER----------------------------
  //------------------------------------------------------------------------------

  /* retrieves the variables monitored in the room */
  /* [{"identifier":1,"name":"temperatura"},{"identifier":6,"name":"potenza attiva"},
      {"identifier":10,"name":"energia attiva meter"},{"identifier":3,"name":"luminositÃ "},
      {"identifier":7,"name":"sensori adb"},{"identifier":2,"name":"umiditÃ "},
      {"identifier":9,"name":"potenza attiva meter"},{"identifier":4,"name":"livello co2"}] */
  function get_variables_info(varid){
    var link = LINK_HEADER_VARIABLES + varid+'';
    return $.ajax({
      type:'GET',
      url: link,
      crossDomain: true,  
      cache:true,
      success: function(response){
        alert(response);
      },
      error: function(xhr,textStatus,err){
            ////alert("text status: " + textStatus+ " error: " + err+" status: " + xhr.status+" responseText: "+ xhr.responseText+" readyState: " + xhr.readyState);
      },   
    });
  }

 /* retrieves the variables in a room */
  function get_variables_room(){
    var link = LINK_HEADER_VARIABLES_CLASS_ROOM + room.id;
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


 /* retrieves the variable classes in a room */
  function get_variableclasses_room(){
    var link = LINK_HEADER_VARIABLES_CLASS_ROOM + room.id + '/list/';
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

  /* given the set of variables in a room - variables - and the description of a class, retrieves the varclassid */
  function get_variableclass_room(variableclasses, description){
    var nvars = variableclasses.length;
    var found = false;
    var varclassid = null;
    for(i = 0; i < nvars && !found; i++)
      if(variableclasses[i].name == description){
         varclassid = variableclasses[i].identifier;
         found = true;
      }
    return varclassid;
  }

  /* retrieves the variables of a given class varclassid for a room */
  function get_variables_class_room(varclassid){
    var link = LINK_HEADER_VARIABLES_CLASS_ROOM + room.id + LINK_VARIABLE_CLASS + varclassid;
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


  function show_year_powerdetails () {
    var chart = $(CHART_POWER_MS_ID).highcharts();
    chart.showLoading();
    show_chart_powerdetails_window(AGGREGATE_15, YEAR, ACTIVE_POWER_LABEL);
  }

  function show_month_powerdetails () {
    var chart = $(CHART_POWER_MS_ID).highcharts();
    chart.showLoading();
  	show_chart_powerdetails_window(AGGREGATE_15, MONTH, ACTIVE_POWER_LABEL);
  }

  function show_week_powerdetails () {
    var chart = $(CHART_POWER_MS_ID).highcharts();
    chart.showLoading();
    show_chart_powerdetails_window(AGGREGATE_15, WEEK, ACTIVE_POWER_LABEL);
  }

  function show_day_powerdetails () {
    var chart = $(CHART_POWER_MS_ID).highcharts();
    chart.showLoading();
    show_chart_powerdetails_window(AGGREGATE_15, DAY, ACTIVE_POWER_LABEL);
  }
  
  function show_year_powerdetails_gen () {
    var chart = $(CHART_POWER_MS_ID).highcharts();
    chart.showLoading();
    show_chart_powerdetails_window(AGGREGATE_15, YEAR, ACTIVE_POWER_GEN_LABEL);
  }

  function show_month_powerdetails_gen () {
    var chart = $(CHART_POWER_MS_ID).highcharts();
    chart.showLoading();
    show_chart_powerdetails_window(AGGREGATE_15, MONTH, ACTIVE_POWER_GEN_LABEL);
  }

  function show_week_powerdetails_gen () {
    var chart = $(CHART_POWER_MS_ID).highcharts();
    chart.showLoading();
    show_chart_powerdetails_window(AGGREGATE_15, WEEK, ACTIVE_POWER_GEN_LABEL);
  }

  function show_day_powerdetails_gen () {
    var chart = $(CHART_POWER_MS_ID).highcharts();
    chart.showLoading();
    show_chart_powerdetails_window(AGGREGATE_15, DAY, ACTIVE_POWER_GEN_LABEL);
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

  function show_chart_powerdetails_window(aggregate, window, varlabel) {
    var measures = [];
    /*ACTIVE_POWER_LABEL*/
    get_all_measures_from_variableclass(room.id, varlabel, aggregate, window).done(function (measures){
          //console.log(measures.length); 
          create_power_chart_multisource(measures, window);           
    });

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

/* utilities */

/* returns varid after header (e.g. http://131.175.21.162:8080/measurements/15min/sensor/variable/) 
  and before next / */
/* not used at present */
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



