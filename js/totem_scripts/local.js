

  function show_year_variable () {
    var chart = $(CHART_VAR_MS_ID).highcharts();
    chart.showLoading();
    show_chart_variable_window(AGGREGATE_15, YEAR);
  }

  function show_month_variable () {
    var chart = $(CHART_VAR_MS_ID).highcharts();
    chart.showLoading();
  	show_chart_variable_window(AGGREGATE_15, MONTH);
  }

  function show_week_variable () {
    var chart = $(CHART_VAR_MS_ID).highcharts();
    chart.showLoading();
    show_chart_variable_window(AGGREGATE_15, WEEK);
  }

  function show_day_variable () {
    var chart = $(CHART_VAR_MS_ID).highcharts();
    chart.showLoading();
    show_chart_variable_window(AGGREGATE_15, DAY);
  }

  function create_variable_chart_multisource(measures, window, title)
  {
   
    var seriesOptions = [];
    var varSrc, varName;
    var ndata;
    ndata = measures[0][2].length;

    for(var i = 0; i < measures.length; i++){
        varSrc = measures[i][0];
        varName = measures[i][1];
        /* keep the minimum number of sampled data as reference */
        if(measures[i][2].length < ndata)
          ndata = measures[i][2].length;
        //console.log("pos " + i + "varid: " + varSrc + " label " + varName);
        seriesOptions[i] = {
          name: varName,
          data: measures[i][2],
          step: 'left',
          color : getColorOffice[varName],
          index: getIndexOffice[varName]
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

    var chid = CHART_VAR_MS_ID;
    $(chid).highcharts({
      title: {
          text: title
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

//    var chart = $('#variable_chart_ms').highcharts();
    var chart = $(CHART_VAR_MS_ID).highcharts();
    chart.xAxis[0].setExtremes(inf.getTime(),sup.getTime());
    chart.setTitle({ text: ctitle });
    chart.xAxis[0].tickInterval = cint;
    
  }

  function show_chart_variable_window(aggregate, window, varlist, charttitle) {
    var measures = [];
    get_all_measures_from_variablelist(room.id, varlist, aggregate, window).done(function (measures){
          //console.log(measures.length); 
          create_variable_chart_multisource(measures, window,charttitle);           
    });

  }


  function get_all_measures_from_variablelist(roomid, variablelist, aggregate, window)
  {

      var def = $.Deferred();
      var measures = [], defers = [], defer;
      var nvars = variablelist.length;
      var link, lheader;
      if(aggregate == AGGREGATE_15)
        lheader = LINK_HEADER_MEASUREMENTS_15;
      else if(aggregate == AGGREGATE_30)
        lheader = LINK_HEADER_MEASUREMENTS_30;
      else
        lheader = LINK_HEADER_MEASUREMENTS_60;

      for(var i = 0; i < nvars; i++ ){
        link = prepare_link_variable_measures(lheader, variablelist[i].variableid, date, window);
        //console.log(variablelist[i].variableid + " @ " + link);
        defer = get_variable_measures_promise(link, variablelist[i].variableid, variablelist[i].label, variablelist[i].measure).done(function(vardata){
            //console.log(pmdata[0][0] + " provided " + pmdata[0][2].length);
            measures = measures.concat(vardata);
        });
        defers.push(defer);
      }
      /* when ALL data from different JSON has been collected -- create the chart*/
      $.when.apply(window, defers).done(function () {
         //console.log("finished loading data!");
         def.resolve(measures);
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

/* returns varid after header (e.g. http://131.175.56.243:8080/measurements/15min/sensor/variable/) 
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

var getColorOffice = {
    'Temperatura' : '#ffbe00',
    'Trasmittanza termica' : '#1aa130'
};

var getIndexOffice = {
    'Temperatura' : 1,
    'Trasmittanza termica' : 0
};


