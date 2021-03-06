
  //-------------------------------GET WEATHER INFO FROM CLOUD--------------------------

  var get_weather_week = function (type,caller_id_position){
    var date = new Date();
    var parameters = location.search.substring(1).split("&");
    var temp = parameters[1].split("=");
    id = unescape(temp[1].split("-")[0]);
    var url = 'http://131.175.21.162:8080/weatherreports/60min/building/'+id+'/'+date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate()+'/?var='+type+'&weekly=true';    
    return $.ajax({
      type:'GET',
      url: url,
      cache:true,
      crossDomain: true,
      error: function(xhr,textStatus,err)
      {
                  //alert("text status: " + textStatus+ " error: " + err+" status: " + xhr.status+" responseText: "+ xhr.responseText+" readyState: " + xhr.readyState);
                  
                },   
              });

  }
  var get_weather_month = function (type,caller_id_position){
    var date = new Date();
    
    var parameters = location.search.substring(1).split("&");
    var temp = parameters[1].split("=");
    id = unescape(temp[1].split("-")[0]);

    var url = 'http://131.175.21.162:8080/weatherreports/60min/building/'+id+'/'+date.getFullYear()+'/'+(date.getMonth()+1)+'?var='+type;    

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
  var get_weather_year = function (type,caller_id_position){
    var date = new Date();
    
    var parameters = location.search.substring(1).split("&");
    var temp = parameters[1].split("=");
    id = unescape(temp[1].split("-")[0]);
    var url = 'http://131.175.21.162:8080/weatherreports/60min/building/'+id+'/'+date.getFullYear()+'?var='+type;    

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
  
  var get_weather_day = function (type,caller_id_position){
    var date = new Date();
    var parameters = location.search.substring(1).split("&");
    var temp = parameters[1].split("=");
    id = unescape(temp[1].split("-")[0]);

    var url = 'http://131.175.21.162:8080/weatherreports/60min/building/'+id+'/'+date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate()+'/?var='+type;    
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





