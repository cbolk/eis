//------------------------------------------------------------------------------
//------------------------------BACK BUTTON LISTENER----------------------------
//------------------------------------------------------------------------------


//------------------------------GLOBAL VARIABLE ----------------------------
var date = new Date();

/* retieves information about the room */
/* {"roomid":1,"label":"ufficio 126","ipgateway":"131.175.120.25 ","roomcode":"0301001053"} */
function get_data_room(){
	var link = 'http://131.175.56.243:8080/rooms/'+room.id+'/details';
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
	var link = 'http://131.175.56.243:8080/variables/room/'+room.id+'/list';
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


