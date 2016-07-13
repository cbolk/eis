
//------------------------------------------------------------------------------
//------------------------------DEMONSTRATOR DATA -----------------------------
//------------------------------------------------------------------------------

var demonstrator = {
  id : unescape( (location.search.substring(1).split("&")[0].split("="))[1]),
}

function get_data_demonstrator()
    {

      
      var link = 'http://131.175.21.162:8080/districts/'+demonstrator.id;

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


function get_buildings(){
  var link = 'http://131.175.21.162:8080/districts/'+demonstrator.id+'/buildings';
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

function get_all_feedback_demonstrator(type){
              var url = 'http://131.175.21.162:8080/comfortfeedbacks';    
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





// ------------------------Build SMART BUILDING SECTION --------------------
function create_building_section(data,demonstrator_name){

  

  var column_class = " ";
    var icon_source = "fa-building";
    if(data.length%2==0){
        column_class = "col-xs-6"; //tweo equal columns
    }else  if (data.length%3==0){
        column_class="col-xs-6 col-md-4"; //three equal columns
    }
          
    //sideMenu4 = false;
    $("#menu_buildings").html('');
    for (i =0; i<data.length; i++) {

            name = modifyString(data[i].label);
            id = data[i].identifier;
            //Dynamically Create the menu of buildings for the selected demonstrator
            elm= '<div class="'+column_class+'">'+'<div class="service-item" id="'+name+'">'+
                                '<span id="prova" class="fa-stack fa-4x hvr-grow ">'+
                                '<i class="fa fa-circle fa-stack-2x"></i>'+
                                '<i class="fa fa-building fa-stack-1x text-primary" style="padding-left: 4px;"></i>'+
                            '</span>'+
                                '<h4>'+
                                    '<strong>'+name+'</strong>'+
                                '</h4>'+
                            '</div>'+

                        '</div>'
                  
             $(elm).appendTo("#menu_buildings"); //adding element to the menu
             if(name== "Poli shelter"){
                $(document.getElementById(name)).click(open_shelter);
             }else{
             //Add listener dynamically to the div in order to dynamically open the webpage 
                $(document.getElementById(name)).click({nome_dimostratore: demonstrator_name, id_edificio: id }, open_building_page);
             }
                       }

    //ADD DESCRIPTIO 
    var paragraph = document.getElementById("smart_building_description");
    paragraph.appendChild(document.createElement("br"));
    text = "In the context of the SCUOLA Project, the "+demonstrator_name+" demonstrator presents "+data.length+" Smart Buildings";
    paragraph.appendChild(document.createTextNode(text));

  

}

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

function open_building_page(caller_info){
  setToOne();
 window.open("./building.html?d="+caller_info.data.nome_dimostratore+"&cid="+caller_info.data.id_edificio,"_self");
 //window.open("http://131.175.21.162/totem/building.html?d="+caller_info.data.nome_dimostratore+"&cid="+caller_info.data.id_edificio,"_self");

}
function open_shelter(){
  setToOne();
 window.open("./shelter.html","_self");
 //window.open("http://131.175.21.162/totem/building.html?d="+caller_info.data.nome_dimostratore+"&cid="+caller_info.data.id_edificio,"_self");

}


//-----------------LOAD SOURCES SECTION -----------------------
function create_load_sources_section(demonstrator_name){
  $("#show_load_sources").click(function(e) {
    setToTwo();
        var parameters = location.search.substring(1).split("&");
            var temp = parameters[0].split("=");
            id = unescape(temp[1]);
            window.open("./loads_sources.html?d="+demonstrator_name+"&did="+id ,"_self");
    


});
}















//--------------------PAGE ANALISYS AND SECTIONS -----------------------

function setToOne() {
    location.hash = "1";
    
}

function setToTwo(){
  location.hash = "2";
}



// x==1 user has come back from a "building" page --> show smart building section and set button text = Show less
// x==2 user has come back from any page ---> scroll to "the demonstrator" section
// else is the first time the user open the page ---> hide smart building section and set buttton text = Show more
function checkFirstTime(x){
  
  if(x==1){ 

    $(document.getElementById("smart_building")).css("display","block");
     
    $('html, body').animate({scrollTop: ($('#smart_section_title').offset().top-514) },700);

     location.hash='';

    // $("#show_smart_building")[0].textContent = "Show Less";
document.getElementById('smart_div').innerHTML = "<a id ='show_smart_building' href='javascript:toggle_smart_menu(1);'class='btn btn-light hvr-grow'>Show Less<i class='fa fa-chevron-up' style='margin-left:5px;'></i></a>";

    return

  }else if(x==2){
    
    $('html, body').animate({scrollTop: $('#services').offset().top-200}, 700);
  location.hash='';   
  }


  else{

    $(document.getElementById("smart_building")).css("display","none");
  }

  // $("#show_smart_building")[0].textContent = "Show More";
  document.getElementById('smart_div').innerHTML ="<a id ='show_smart_building' href='javascript:toggle_smart_menu(0);'class='btn  btn-light hvr-grow'>Show More <i class='fa fa-chevron-down' style='margin-left:5px;'></i></a>";
}



function toggle_smart_menu(par){
        if (par==0) {
            document.getElementById('smart_div').innerHTML=' ';
            document.getElementById('smart_div').innerHTML = "<a id ='show_smart_building' href='javascript:toggle_smart_menu(1);'class='btn btn-light hvr-grow'>Show Less <i class='fa fa-chevron-up' style='margin-left:5px;'></i></a>";

        }else {
            document.getElementById('smart_div').innerHTML ="<a id ='show_smart_building' href='javascript:toggle_smart_menu(0);'class='btn  btn-light hvr-grow'>Show More <i class='fa fa-chevron-down' style='margin-left:5px;'></i></a>";

        }

        $("#smart_building").toggle("slow");    
        $('html, body').animate({scrollTop: ($('#smart_section_title').offset().top-490) },500);



}
