// /* Utility functions and listener for divs in the main page*/


// function modifyString(string){
//   return string.charAt(0).toUpperCase() + string.slice(1);
// }




// // ------------------------CALL BACK FUNCTION --------------------
// function districtbuilding(data){
//   var column_class = " ";
//     var icon_source = "fa-building";
//     if(data.length%2==0){
//         column_class = "col-xs-6"; //tweo equal columns
//     }else  if (data.length%3==0){
//         column_class="col-xs-6 col-md-4"; //three equal columns
//     }
          
//     //sideMenu4 = false;
//     $("#menu_buildings").html('');
//     for (i =0; i<data.length; i++) {

//            if(data[i].label.toLowerCase().indexOf("shelter") >= 0){
//                 icon_source = "fa-plug";

//             }

//             name = modifyString(data[i].label);
//             id = data[i].identifier;
//             //Dynamically Create the menu of buildings for the selected demonstrator
//              var elm = '<div class="'+column_class+'">'+
//              '<div id="'+name+'" class="building-item scrollpoint sp-effect5 active animated fadeInRight">'+
//              '<i class="fa '+icon_source+' fa-2x" style="width: 108px;"></i><h3>'+name+'</h3>'+
//              '</div></div>';
                  
//              $(elm).appendTo("#menu_buildings"); //adding element to the menu

//              //Add listener dynamically to the div in order to dynamically open the webpage 
//             $(document.getElementById(name)).click({nome_edificio: name, id_edificio: id }, open_building_page);
//               //$(document.getElementById(name)).click({nome_edificio: name, id_edificio: id }, open_buildingRoom_Menu);
//                        }

// }

// //get data of buildings for a specific district
// function get_building_data(id){

// var link = 'http://131.175.56.243:8080/districts/'+id+'/buildings/';
// //return $.getJSON(link, null,null, 'json');  //get(url,data to send (eventually),callback,dataType);
// //GET METHOD --> API CALL

// return $.ajax({
//   type:'GET',
//   url: link,
//   dataType: "json",
//   //cache: true,
//   crossDomain: true,
//   //jsonp: "scuola",
//   //jsonpCallback: "districtbuilding",
//   // success: function(data){
//   //       districtbuilding(data);
//  error: function(xhr,textStatus,err)
//     {
//     alert("text status: " + textStatus+ " error: " + err+" status: " + xhr.status+" responseText: "+ xhr.responseText+" readyState: " + xhr.readyState);
    
//     },   
//   });
// }





// //Depending on the caller get the correct json, build and display the buildings menu
// function get_building_menu(caller) {


//                 //(get_data(caller.data.id_dimostratore); //get data from API and create de divs inside the menu
//                 //ANIMATE THE MENU

//         $.when( get_building_data(caller.data.id_dimostratore)
//       ).done(function(building_data){ //the abcAgs contains the data from the callback function
//         //puo fare i grafici
//         districtbuilding(building_data);

      
        
//       });




//                 if (!sideMenu4) {
//                 $("#head").hide("slow");
//                 $("#first_row").toggle("slow");
//                 $(caller.data.id_menu_dim).hide("slow");
//                 $(caller.data.id_source).hide("slow");
                
//                 $(caller.data.id_build).animate({ marginLeft: '+=' + 390/*+ $(window).width() / 2*/},500,
//                     function() {
//                          sideMenu4 = true;
//                      $("#menu_buildings").toggle("slow");
//                 // Animation complete.

//                 });
               
//                 }
//                 else {
//                 $("#menu_rooms").hide("fast");
//                 $("#menu_buildings").toggle("fast");
//                 $("#head").toggle("fast");
//                 $("#first_row").toggle("slow");
                
//                 $(caller.data.id_build).animate({ marginLeft: '-=' + 390 /*+ $(document).width() / 2*/},500,
//                     function() {
                    
//                 $(caller.data.id_menu_dim).show("slow");
//                 $(caller.data.id_source).show("slow");
//                    // $("#future").show("fast");

//                     sideMenu4 = false;
//                 // Animation complete.
//                 });
  
//                 }
// }

// //--------------------------------------------------ROOMS
// function build_rooms(data,caller_id){
//   var column_class = " ";
//     var icon_source = "";
//     if(data.length%2==0){
//         column_class = "col-xs-6"; //tweo equal columns
//     }else  if (data.length%3==0){
//         column_class="col-xs-6 col-md-4"; //three equal columns
//     }
          
//     //sideMenu4 = false;
//     $("#menu_rooms").html('');
//     for (i =0; i<data.length; i++) {
          
//            if(data[i].indexOf("Info") >= 0){
//                 icon_source = "fa-info";
//             }else{
//                 icon_source = "fa-sellsy";
//             }

//             name = data[i];
            
//             id = data[i].room_id;
            

//             //Dynamically Create the menu of buildings for the selected demonstrator
//              var elm = '<div class="'+column_class+'">'+
//              '<div id="'+name+'" class="building-item scrollpoint sp-effect5 active animated fadeInRight">'+
//              '<i class="fa '+icon_source+' fa-2x" style="width: 108px;"></i><h3>'+name+'</h3>'+
//              '</div></div>';
                  
//              $(elm).appendTo("#menu_rooms"); //adding element to the menu

//              //Add listener dynamically to the div in order to dynamically open the webpage 
//             $(document.getElementById(name)).click({nome: name, id_edificio: caller_id.data.id_edificio,
//               id_room: data[i].room_id}, open_roomInfo_page);
//               //$(document.getElementById(name)).click({nome_edificio: name, id_edificio: id }, build_room_menu);
//                        }



//               if(!sideMenu5){
//               $("#menu_rooms").show("fast");
//             }else{
//               $("#menu_rooms").hide("fast");
//               sideMenu5=true;
//             }

// }





// function open_demonstrator_page(caller_info){
// window.open("http://eis.deib.polimi.it/totem/demonstrator.html?cid="+caller_info.data.id_dimostratore,"_self");
// // window.open("http://131.175.56.243/totem/demonstrator.html?cid="+caller_info.data.id_dimostratore,"_self");
// }


// function open_building_page(caller_info){
//  window.open("http://eis.deib.polimi.it/totem/building.html?cid="+caller_info.data.id_edificio,"_self");
//  //window.open("http://131.175.56.243/totem/building.html?cid="+caller_info.data.id_edificio,"_self");

// }


// function open_load_sources_page(caller_info){
// window.open("http://eis.deib.polimi.it/totem/loads_sources.html?cid="+caller_info.data.id_dimostratore,"_self");
// // window.open("http://131.175.56.243/totem/loads_sources.html?cid="+caller_info.data.id_dimostratore,"_self");
// }



// var sideMenu = false;
// var sideMenu2 = false;
// var sideMenu3 = false;
// var sideMenu4 = false;
// var sideMenu5 = false;

// function open_buildingRoom_Menu(building){

//   //CAMBIAA
// //window.open("http://131.175.56.243/totem/building/?cid="+building.data.id_edificio,"_self");


// build_rooms(['Info','Take a look..'],building);



// }


function polimi_clicked(){
   var link = 'http://131.175.56.243:8080/districts';
  $.ajax({
    type:'GET',
    url: link,
    dataType: "json",
    timeout:1000,
    crossDomain: true,
    //jsonp: "scuola",
    //jsonpCallback: "districtbuilding",
  success: function(data){
          window.open("http://eis.deib.polimi.it/totem/demonstrator.html?cid=1","_self");
        },
   error: function(xhr,textStatus,err)
      {
        $('#myModal').modal('toggle');
      },   
    });
 }
function unibs_clicked(){
   var link = 'http://131.175.56.243:8080/districts';
  $.ajax({
    type:'GET',
    url: link,
    dataType: "json",
    timeout:1000,
    crossDomain: true,
    //jsonp: "scuola",
    //jsonpCallback: "districtbuilding",
  success: function(data){
        window.open("http://eis.deib.polimi.it/totem/demonstrator.html?cid=2","_self");
        },
   error: function(xhr,textStatus,err)
      {
        $('#myModal').modal('toggle');
      },   
    });
  
           
    }

function residential_clicked() {
    var link = 'http://131.175.56.243:8080/districts';
  $.ajax({
    type:'GET',
    url: link,
    dataType: "json",
    timeout:1000,
    crossDomain: true,
    //jsonp: "scuola",
    //jsonpCallback: "districtbuilding",
  success: function(data){
        window.open("http://eis.deib.polimi.it/totem/residential.html","_self");
        },
   error: function(xhr,textStatus,err)
      {
        $('#myModal').modal('toggle');
      },   
    });
 
            
  
                }
    

