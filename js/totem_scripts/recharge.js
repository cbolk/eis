
  //------------------------------------------------------------------------------
  //------------------------------BACK BUTTON LISTENER----------------------------
  //------------------------------------------------------------------------------

  /* retrieves the variables monitored in the room */
  /* [{"identifier":1,"name":"temperatura"},{"identifier":6,"name":"potenza attiva"},
      {"identifier":10,"name":"energia attiva meter"},{"identifier":3,"name":"luminositÃ "},
      {"identifier":7,"name":"sensori adb"},{"identifier":2,"name":"umiditÃ "},
      {"identifier":9,"name":"potenza attiva meter"},{"identifier":4,"name":"livello co2"}] */
  function get_rechargestationids_list(did){
    var link = LINK_CLOUD + 'districts/' + did + '/rechargestations';
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

  function get_recharges_day(did, thedate){
    ///recharges/district/{id}/{year}/{month}/{day}
    var dayparsed = thedate.replace(new RegExp("-", 'g'), "/");
    var link = LINK_CLOUD + 'recharges/district/' + did + '/' + dayparsed;
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

 /* retrieves the variables in a room */
  function get_recharges_list(did){
    var link = LINK_CLOUD + 'recharges/log/details/district/' + did;
    //alert("link: " + link);
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

 /* retrieves the variables in a room */
  function get_recharges_list_day(did, thedate){
    var dayparsed = thedate.replace(new RegExp("-", 'g'), "/");
    var link = LINK_CLOUD + 'recharges/log/details/district/' + did + '/' + dayparsed;
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

 /* retrieves EMS allowed power */
  function get_ems_profile_day_promise(sid, thedate){
    var dayparsed = thedate.replace(new RegExp("-", 'g'), "/");
    var dfd = $.Deferred();
    //http://131.175.21.162:8080/profiles/rechargestation/MI001-0056-0100/2016/06/24
    var link = LINK_CLOUD + 'profiles/rechargestation/' + sid + '/' + dayparsed;
    $.ajax({
      type:'GET',
      url: link,
      crossDomain: true,  
      cache:true
    }).done(function(response){ 
      var emsdata = [], past = [], future = [];
      var d = new Date();
      var now = d.getTime(); 
      $.each(response, function(key, read){
          var entryP = [];
          entryP.push(read.timestamp);
          entryP.push(read.value / 1000);
          
          if(read.timestamp <= now)
            past.push(entryP);
          else
            future.push(entryP);
      });
      emsdata.push(past, future);
      dfd.resolve(emsdata);
    });
    return dfd.promise();    
  }


  function show_list_recharge_stations(did){
    get_rechargestationids_list(did).done(function (list){
        var nvars = list.length;
        var row = "";
        for(var i = 0; i < nvars; i++ ){
            row += "<tr><td>" + list[i]['rechargestationid'] + "</td><td>" + list[i]['name']+  "</td><td>" + list[i]['pod']+  "</td></tr>";
        }         
        row +=  "";
        document.getElementById("rechargestationlist").innerHTML = row;
        return;
    });
  }

  function get_last_recharge_promise(did){
    var link = LINK_CLOUD + 'recharges/log/district/' + did;
    var dfd = $.Deferred();
    $.ajax({
        url: link,
    }).done(function(response){ 
       var n = response.length; 
       var result = [response[n-1].begindate, response[n-1].rechargestationid];
       dfd.resolve(result);
    });
    return dfd.promise();
  }


  function show_list_recharges(did) {
    get_recharges_list(did).done(function (list){
        var nvars = list.length;
        var elapsed, m, h ;
        if(list.length > MAX_RECHARGE_LIST) 
          nvars = MAX_RECHARGE_LIST;
        else
          nvars = list.length;
        var row = "";
        var thisdate;
        for(var i = list.length-1; nvars >= 0; nvars--, i-- ){
            thisdate = formatDate(list[i]['begindate']);
            h = Math.floor(list[i]['timeelapsedrecharge'] / (60*60));
            m = Math.floor((list[i]['timeelapsedrecharge'] % (60*60)) / 60);
            if(m < 10) m = "0" + m;
            elapsed = "" + h  + ":" + m + "";
            //row += "<tr><td>" + thisdate + "</td><td>" + list[i]['rechargestationid']+  "</td><td>" + list[i]['rechargeoutletid'].substr(16,2) + "</td><td class='text-right'>" + list[i]['vehicleid'] + "</td><td class='text-right'>" + list[i]['activeenergy'] / 1000 + "</td><td>details</td></tr>";
            row += "<tr><td>" + thisdate + "</td><td>" + list[i]['rechargeoutletid'].substr(16,2) + "</td><td class='text-right'>**" + list[i]['vehicleid'].substr(5) + "</td><td class='text-right'>" + (list[i]['activeenergy'] / (1000*1000)) + "</td><td class='text-right'>" + elapsed  + "</td></tr>";
        }         
        row +=  "";
        document.getElementById("rechargelist").innerHTML = row;
        return;
    });
  }

  function get_rechargesid_at_station_day(did, day){    
    var dfd = $.Deferred();
    var dayparsed = day.replace(new RegExp("-", 'g'), "/");
    var link = LINK_CLOUD + "/recharges/log/details/district/" + did + "/" + dayparsed;
    $.ajax({
      type:'GET',
      url: link, 
    }).done(function(response){
      var sids = [];
      $.each(response, function(key, read){
        if(read.begindate == day){
          var entry = [];
          entry.push(read.sessionid, read.activeenergy, read.timeelapsedrecharge, read.vehicleid);//tobefixed
          sids.push(entry);
        }
      });
      dfd.resolve(sids);
    }); 
    return dfd.promise();   
  }


  function get_last_recharge_details_today(oid, day){
    var dfd = $.Deferred();
    var dayparsed = day.replace(new RegExp("-", 'g'), "/");
    var link =  LINK_CLOUD + "rechargelogs/log/rechargestation/" + oid + "/" + dayparsed;
    $.ajax({
      type:'GET',
      url: link, 
    }).done(function(response){
      var n = response.length;
      dfd.resolve(n);
    }); 
    return dfd.promise();   
  }



 /* OK */
  function get_all_recharges_details_day_promise(did, oid, day){
    //http://131.175.21.162:8080/rechargelogs/rechargestation/MI001-0056-0100/2016/06/09
    //var link = LINK_CLOUD + 'rechargelogs/sessionid/' + sid;
    //14-06-2016
    var dfd = $.Deferred();
    var dayparsed = day.replace(new RegExp("-", 'g'), "/");
    var link = LINK_CLOUD + "rechargelogs/log/rechargestation/" + oid + "/" + dayparsed;
    get_rechargesid_at_station_day(did, day).done(function(sessions){
      var fulldata = [];
      var nses = sessions.length;
      for (var i = 0; i < nses; i++){
//        var s = [sessions[i][0], sessions[i][1], []];
        var s = [sessions[i][0], sessions[i][1], sessions[i][2], sessions[i][3], []];
        fulldata.push(s);
      }
      $.ajax({
          url: link,
      }).done(function(response){ 
         $.each(response, function(key, read){
            var entryP = [];
            entryP.push(read.timestamp );
            entryP.push(read.power / 1000);
            for(var j = 0 ; j < nses; j++){
              if(read.sessionid == fulldata[j][0]){
                fulldata[j][4].push(entryP);
                break;
              }
            }
         });

         var notEmpty = [];
         for(var i = 0; i < nses; i++)
            if(fulldata[i][1] > 0)
              notEmpty.push(fulldata[i]);
/**/
         dfd.resolve(notEmpty);


         //dfd.resolve(fulldata);
      });
    });
    return dfd.promise();
  }

 /* OK */
  function get_all_recharges_details_ongoing_promise(did, oid, day){
    //http://131.175.21.162:8080/rechargelogs/rechargestation/MI001-0056-0100/2016/06/09
    //var link = LINK_CLOUD + 'rechargelogs/sessionid/' + sid;
    //14-06-2016
    //http://131.175.21.162:8080/rechargelogs/log/rechargestation/MI001-0056-0100/2016/06/24
    var dfd = $.Deferred();
    var dayparsed = day.replace(new RegExp("-", 'g'), "/");
    var link = LINK_CLOUD + "rechargelogs/log/rechargestation/" + oid + "/" + dayparsed;
    /* retrieve information completed recharges */
    get_rechargesid_at_station_day(did, day).done(function(sessions){
      var fulldata = [];
      var nses = sessions.length;
      for (var i = 0; i < nses; i++){
        var s = [sessions[i][0], sessions[i][1], sessions[i][2], sessions[i][3], []];
        fulldata.push(s);
      }
      $.ajax({
          url: link,
      }).done(function(response){ 
         var tot = 0;
         $.each(response, function(key, read){
            var entryP = [];
            var found;
            entryP.push(read.timestamp );
            entryP.push(read.power / 1000);
            for(var j = 0, found = false; j < nses && found == false; j++){
              if(read.sessionid == fulldata[j][0]){
                fulldata[j][4].push(entryP);
                found=true;
              }
              if(fulldata[j][3] === 0)
                tot = tot + read.power ;
            }
            if(found === false){
              tot = tot + read.power ;
              var s = [read.sessionid, 0, 0, read.serialnumber, []];
              fulldata.push(s);
              fulldata[nses][4].push(entryP);
              nses = nses + 1;
            }
         });
         fulldata[nses-1][1] = parseFloat(tot * 1000 / 60).toFixed(2);
/*
         var notEmpty = [];
         for(var i = 0; i < nses; i++)
            if(fulldata[i][1] > 0)
              notEmpty.push(fulldata[i]);
*/

         dfd.resolve(notEmpty);
      });
    });
    return dfd.promise();
  }


  function show_chart_last_recharge_station(did, oid){
      var measures = [], lastr = [];
      var today = new Date();
      var m = today.getMonth() + 1;
      if(m < 10)
        m = "0" + m;
      var todayShort = today.getFullYear() + "-" + m + "-" + today.getDate();
      get_last_recharge_details_today(oid, todayShort).done(function (num){
        if(num != 0){

          get_all_recharges_details_ongoing_promise(did, oid, todayShort).done(function (measures){
              create_recharge_chart_multisessions(oid, todayShort, measures);
              document.getElementById("rechargesday").innerHTML = " on " + formatDate(todayShort);
          });
        } else {
          get_last_recharge_promise(did).done(function (lastr){
            get_all_recharges_details_day_promise(did, oid, lastr[0]).done(function (measures){
                create_recharge_chart_multisessions(oid, lastr[0], measures);
                document.getElementById("rechargesday").innerHTML = " on " + formatDate(lastr[0]);
            });
          });
        }
      });
  }

  function show_chart_last_recharge_station_ems(did, oid){
      var measures = [], lastr = [], emsinfo = [];
      var today = new Date();
      var m = today.getMonth() + 1;
      if(m < 10)
        m = "0" + m;
      var todayShort = today.getFullYear() + "-" + m + "-" + today.getDate();
      get_last_recharge_details_today(oid, todayShort).done(function (num){
        if(num != 0){
          get_ems_profile_day_promise(oid, todayShort).done(function (emsinfo) {
            get_all_recharges_details_ongoing_promise(did, oid, todayShort).done(function (measures){
                create_recharge_chart_multisessions_ems(oid, todayShort, measures, emsinfo[0], emsinfo[1]);
                document.getElementById("rechargesday").innerHTML = " on " + formatDate(todayShort);
            });
          });
        } else {
          get_last_recharge_promise(did).done(function (lastr){
            get_ems_profile_day_promise(oid, lastr[0]).done(function (emsinfo) {
              get_all_recharges_details_day_promise(did, oid, lastr[0]).done(function (measures){
                  create_recharge_chart_multisessions_ems(oid, lastr[0], measures, emsinfo[0], null);
                  document.getElementById("rechargesday").innerHTML = " on " + formatDate(lastr[0]);
              });
            });
          });
        }
      });
  }

  function show_chart_recharge_station_day(did, oid, day){
      var measures = [];
      get_all_recharges_details_day_promise(oid, day).done(function (measures){
          create_recharge_chart_multisessions(oid, day, measures);
      });
  }


  /* OK */
  function show_chart_recharge_day(oid, sid, day){
    var entries = [];
    get_recharge_details_promise(oid, sid, day).done(function (entries){
//          console.log(entries.length); 
          create_recharge_chart(oid, day, entries);           
    });   
  }

  /* OK */
  function get_recharge_details_promise(oid, sid, day){
    //http://131.175.21.162:8080/rechargelogs/rechargestation/MI001-0056-0100/2016/06/09
    //var link = LINK_CLOUD + 'rechargelogs/sessionid/' + sid;
    //14-06-2016
    var dfd = $.Deferred();
    var dayparsed = day.replace(new RegExp("-", 'g'), "/");
    var link = LINK_CLOUD + "rechargelogs/log/rechargestation/" + oid + "/" + dayparsed;
    $.ajax({
        url: link,
    }).done(function(response){ 
       var logentriesP = [];
       $.each(response, function(key, read){
        if(read.sessionid == sid){
          var entryP = [];
          //var entryPL = [];
          //var entryPM = [];
          //entry.push(datetime2unixts(read.date,read.time));
          entryP.push(read.timestamp );
          entryP.push(read.power / 1000);
          //entryPL.push(read.timestamp );
          //entryP.push(read.powerlimit / 1000);
          //entryPM.push(read.timestamp );
          //entryPM.push(read.maxpower / 1000);
          //entry.push(read.powerlimit / 1000);
          //entry.push(read.maxpower / 1000);
          logentriesP.push(entryP);
        }
       });
       var vardata = [0, sid, logentriesP];
       var result = [];
       result.push(vardata);
       dfd.resolve(result);
    });
    return dfd.promise();
  }

  function get_recharge_station_details_promise(oid, day){
    //http://131.175.21.162:8080/rechargelogs/rechargestation/MI001-0056-0100/2016/06/09
    //var link = LINK_CLOUD + 'rechargelogs/sessionid/' + sid;
    //14-06-2016
    var dfd = $.Deferred();
    var dayparsed = day.replace(new RegExp("-", 'g'), "/");
    var link = LINK_CLOUD + "rechargelogs/log/rechargestation/" + oid + "/" + dayparsed;
    $.ajax({
        url: link,
    }).done(function(response){ 
       var logentriesP = [];
       $.each(response, function(key, read){
          var entryP = [];
          var entryPL = [];
          var entryPM = [];
          //entry.push(datetime2unixts(read.date,read.time));
          entryP.push(read.timestamp );
          entryP.push(read.power / 1000);
          entryPL.push(read.timestamp );
          entryPL.push(read.powerlimit / 1000);
          entryPM.push(read.timestamp );
          entryPM.push(read.maxpower / 1000);
          //entry.push(read.powerlimit / 1000);
          //entry.push(read.maxpower / 1000);
          logentriesP.push(entryP);
       });
       var vardata = [0, "Power", logentriesP];
       var result = [];
       result.push(vardata);
       dfd.resolve(result);
    });
    return dfd.promise();
  }


  function create_recharge_chart(oid, day, measures)
  {

    var seriesOptions = [];
    var powerSrc, powerName;
    var ndata = measures[0][2].length;

    for(var i = 0; i < measures.length; i++){
        powerSrc = measures[i][0];
        powerName = "" + (measures[i][0] + 1);
        /* keep the minimum number of sampled data as reference */
        if(measures[i][2].length < ndata)
          ndata = measures[i][2].length;
        //console.log("pos " + i + "varid: " + powerSrc + " label " + powerName);
        seriesOptions[i] = {
          name: powerName,
          data: measures[i][2],
          step: 'left',
          color : getColorRechargeSession[i],
          index: measures[i][0]
        };
     }



    var inf = new Date(day + " " + "06:00:01");
    var sup = new Date(day + " " + "20:59:59");
    var ctitle = "Recharge station "  + oid , cint = DAY_CHART.chart_tickinterval;;

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

    var chid = '#recharge_chart_ms';
    $(chid).highcharts({
      title: {
          text: "Recharge information"
      },
      subtitle: {
          text: '(' + day + ')'
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


  function create_recharge_chart_multisessions(oid, day, measures)
  {

    var seriesOptions = [];
    var powerSrc, powerName;
    var ndata = measures[0][2].length;

    for(var i = 0; i < measures.length; i++){
        powerSrc = measures[i][0];
        powerName = "" + (measures[i][0]);
        /* keep the minimum number of sampled data as reference */
        if(measures[i][2].length < ndata)
          ndata = measures[i][2].length;
        //console.log("pos " + i + "varid: " + powerSrc + " label " + powerName);
        seriesOptions[i] = {
          name: powerName + " (Total Active Energy: " + measures[i][1] /(1000*1000) + " kWh)",
          data: measures[i][4],
          step: 'left',
          color : getColorRechargeSession[i],
          index: i
        };
     }



    var inf = new Date(day + " " + "06:00:01");
    var sup = new Date(day + " " + "20:59:59");
    var ctitle = ""; //"Recharges on " + formatDate(day);
    var cint = DAY_CHART.chart_tickinterval;

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

    var chid = '#recharge_chart_ms';
    $(chid).highcharts({
      title: {
          text: "Recharge information"
      },
      //subtitle: {
      //    text: '(' + day + ')'
      //},
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
        verticalAlign: 'bottom',
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


  function create_recharge_chart_multisessions_ems(oid, day, measures, emspast, emsfuture)
  {

    var seriesOptions = [];
    var powerSrc, powerName;
    var ndata = measures[0][4].length;
    var d = new Date();
    var now = d.getTime(); 

//    
    for(var i = 0; i < measures.length; i++){
        powerSrc = measures[i][3];
        powerName = "" + (measures[i][3]);
        /* keep the minimum number of sampled data as reference */
        if(measures[i][4].length < ndata)
          ndata = measures[i][4].length;
        //console.log("pos " + i + "varid: " + powerSrc + " label " + powerName);
        seriesOptions[i] = {
          name: powerName + " (Total Active Energy: " + parseFloat(measures[i][1] /(1000*1000)).toFixed(3) + " kWh)",
          data: measures[i][4],
          type: 'area',
          step: 'left',
          color : getColorRechargeSession[i],
          index: i
        };
     }
     seriesOptions[i] = {
        name: "EMS applied power limit",
        data: emspast,
        type: 'spline',
        color : "#b20000",
        connectNulls: true,
        index: i
     };
     i++;
     seriesOptions[i] = {
        name: "EMS planned power limit",
        data: emsfuture,
        type: 'spline',
        color : "#ff3232",
        dashStyle: 'Dash',
        pointStart: now,
        connectNulls: true,
        index: i
     };



    var inf = new Date(day + " " + "06:00:01");
    var sup = new Date(day + " " + "20:59:59");
    var ctitle = ""; //"Recharges on " + formatDate(day);
    var cint = DAY_CHART.chart_tickinterval;

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

    var chid = '#recharge_chart_ms';
    $(chid).highcharts({
      title: {
          text: "Recharge information"
      },
      //subtitle: {
      //    text: '(' + day + ')'
      //},
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
          },
          spline: {
            marker: {
                  // radius: 3
                enabled:false
            }            
          }
      },
      series: seriesOptions
    });

    var chart = $(chid).highcharts();
    chart.xAxis[0].setExtremes(inf.getTime(),sup.getTime());
    chart.setTitle({ text: ctitle });
    chart.xAxis[0].tickInterval = cint;
    
  }
