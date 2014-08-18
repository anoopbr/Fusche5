var width = window.innerWidth;

 var search, sideBar;

var start=0;
var end=10;
var alreadyRequested = false;

var restaurantid = [];
var restname = [] ;
var street = [] ;
var building = [] ;
var city = [] ;
var phone = [] ;
var price =[] ;
var cuisine =[] ;
var grade = [] ;
var lat = [] ;
var lng = [] ;
var distance = [];
var userLat = 0;
var userLng = 0;

 $(window).load(function () {



     search = new searchPage();
     sideBar = new topRestBar();


     $("#menuButton").click(function () {
         mobileMenu();
     });


     $(".leftResult, .swipeIndicator, .rightResult").click(function () {

         if ($(this).parent(".resultsOverflow").hasClass("resultSwiped")) {
             if ($(this).hasClass("rightResult")) {} else {
                 $(this).parent(".resultsOverflow").removeClass("resultSwiped");
             }
         } else {
             if ($(this).hasClass("leftResult")) {

             } else {
                 $(this).parent(".resultsOverflow").addClass("resultSwiped");
             }
         }

     });



     $(".resultsOverflow").swipe({
         //Generic swipe handler for all directions
         swipeStatus: function (event, direction, distance, duration, fingerCount) {
             console.log(distance);
             if (distance == "left") {
                 $(this).addClass("resultSwiped");

             } else if (distance == "right") {
                 $(this).removeClass("resultSwiped");

             }
         },
         //Default is 75px, set to 0 for demo so any distance triggers swipe
         threshold: 5,
         allowPageScroll: "vertical"
     });




     $(".topCell").mouseenter(function () {

         var filterNumber = $(this).attr("number");
         dimItDown($(".topRestImg"), filterNumber, .35);
     });

     $(".topCell").mouseleave(function () {
         var filterNumber = $(this).attr("number");
         dimItDown($(".topRestImg"), filterNumber, .86);

     });




 });









 $(window).resize(function () {

     search.resizer();
     sideBar.resizer();

 });






 //start of top restaurant sidebar object
 function topRestBar() {

     this.view = "topRest";




     this.width = window.innerWidth;
     this.resizeTopRestaraunts = function () {
         if (this.width > 1024) {

             $("img.topRestImg").each(function () {
                 $(this).parent(".topCell").removeAttr('style');
                 var h = $(this).height();
                 console.log($(this).height());
                 $(this).parent(".topCell").css("height", h);
                 $(this).parent(".topCell").css("left", "0px");
             });
         } else {
             var xPos = 0;
             $("img.topRestImg").each(function () {
                 $(this).parent(".topCell").removeAttr('style');
                 var w = $(this).width();
                 console.log($(this).width());
                 $(this).parent(".topCell").css("width", w);
                 $(this).parent(".topCell").css("left", xPos);
                 xPos += $(this).parent(".topCell").width() + 10;

             });

         }


     };



     this.resizer = function () {
         this.width = window.innerWidth;
         this.resizeTopRestaraunts();
     };

     this.resizer();

     this.destroy = function () {


     }

 }

 function loadResult(first, last){
        console.log("LOADING!!!!")
        var html = "";
        for(i=first; i<last; i++){
            html += '<div class="result darkYellow"><div class="resultsOverflow "><div class="swipeIndicator"><img src="images/arrowRight.svg"></div>';
            html += '<div class="leftResult yellow"><div class="resultTitle">' + restname[i]+ '</div><div class="resultAddress">'+building[i]+' '+street[i]+'</div>';
            html += '<div class="resultRating"><img src="images/star.svg"><img src="images/star.svg"><img src="images/star.svg"><img src="images/noStar.svg">';
            html += '<img src="images/noStar.svg"></div><div class="resultImage"><img src="http://www.envision-creative.com/wp-content/uploads/Tiagos01.jpg"></div>';
            html += '<div class="rating" rating="sucks">It Sucks</div><div class="addToList"><img src="images/saveToList.svg"><div class="addText">add to list</div>';
            html += '</div><div class="rating right" rating="good">Gotta Have It!</div></div>';

            html += '<div class="rightResult darkYellow"><p class="clusterOne">'+phone[i]+'<br/>lavillacafe.com <br/>'+distance[i]+' miles away<br/>'+price[i]+'</p>';
            html += '<h3>Hours of Operation</h3><p>S - 6am - 10pm<br/>M - 6am - 10pm<br/>T - 6am - 10pm<br/>W - 6am - 10pm<br/>Th - 6am - 10pm<br/>F - 6am - 10pm';
            html += '<br/>Sa - 6am - 10pm</p><div class="menuButton yellow">See the Menu</div></div><div class="ratingBar"><div class="ratingBad"></div>';
            html += '<div class="ratingGood"></div></div></div></div>';
        }
        start = end + 1;
        end += 10;
        alreadyRequested = false;
        return html;
 }

 function searchPage() {

    var oldScroll = 0;
     $(".content").scroll(function () {
         if (window.innerWidth > 1024) {

             var container = $(".content");
             var newScroll = container.scrollTop()


             if ((document.querySelectorAll(".content")[0].scrollHeight - newScroll - 300) <= container.height()) {

                 if (newScroll > oldScroll) {

                     console.log("aaaaaghhhh");
                  if (alreadyRequested==false) {

                    var html = loadResult(start,end);
                    $('#resultContainer').append(html);
                      // query();
                      alreadyRequested=true;
              }
                     //This will run when you are 150px from the bottom


                 }
             }
             oldScroll = newScroll;
         }


     });



     $("#container").scroll(function () {
         if (window.innerWidth <= 1024) {
             var container = $("#container");
             var newScroll = container.scrollTop()
             if ((document.getElementById("container").scrollHeight - newScroll) <= container.height() + 150) {


                 if (newScroll > oldScroll) {
                     console.log("aaaaaghhhh");
                    if (alreadyRequested==false) {
                     // query();
                     var html = loadResult(start,end);
                    $('#resultContainer').append(html);
                     alreadyRequested=true;
                 }
                     //This will run when you are 150px from the bottom

                 }

             }
             oldScroll = newScroll;
         }


     });

    $("#search").submit(function () {
        //alert("search");
        start = 0;
        end = 1;
      var data = {
            "action": "search",
            "start": start,
            "end":end
        };
        data = $(this).serialize() + "&" + $.param(data);
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "response.php", //Relative or absolute path to response.php file
            data: data,
            success: function (data) {
                console.log(data["response"]);
                // console.log(data["value"]);
                var response = data["response"];
                var userLat = data["lat"];
                var userLng = data["lng"];
                if(response == "success"){
                    //alert("success");
                    console.log(data["value"].length);

                    for(var i=0; i < data["value"].length; i++){
                        restaurantid[i] = data["value"][i]["restaurantid"];
                        restname[i] = data["value"][i]["name"];
                        street[i] = data["value"][i]["street"];
                        building[i] = data["value"][i]["building"];
                        city[i] = data["value"][i]["city"];
                        phone[i] = data["value"][i]["phone"];
                        price[i] = data["value"][i]["price"];
                        cuisine[i] = data["value"][i]["cuisine"];
                        grade[i] = data["value"][i]["grade"];
                        lat[i] = data["value"][i]["latitude"];
                        lng[i] = data["value"][i]["longitude"];
                        var dist = 0;
                        dist = calDistance(userLat, userLng, data["value"][i]["latitude"], data["value"][i]["longitude"]);
                        distance[i] = dist;
                    }

                    var html = loadResult(start,end);
                    document.getElementById("resultContainer").innerHTML = html;
                    // if(start == 0){
                    //     document.getElementById("resultContainer").innerHTML = html;
                    // }else{
                    //     $('#resultContainer').append(html);
                    // }

                    

                }else{
                    alert(data["response"]);
                }

            }
        });

        return false;

    });



     $("#cameraUpload").show();
     jQuery(".addText").fitText(.45);
     this.resizer = function () {

     };

     this.destroy = function () {


     };


 }


function calDistance(lat1, lon1, lat2, lon2) {

    var radlat1 = Math.PI * lat1/180

    var radlat2 = Math.PI * lat2/180

    var radlon1 = Math.PI * lon1/180

    var radlon2 = Math.PI * lon2/180

    var theta = lon1-lon2

    var radtheta = Math.PI * theta/180

    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

    dist = Math.acos(dist)

    dist = dist * 180/Math.PI

    dist = dist * 60 * 1.1515

    // if (unit=="K") { dist = dist * 1.609344 }

    // if (unit=="N") { dist = dist * 0.8684 }

    dist = Math.round(dist * 10) / 10

    // console.log(dist);

    return dist

}





 function dimItDown(theClass, filterNumber, opac) {
     if (width > 1024) {
         theClass.each(function () {
             if ($(this).parent().attr("number") == filterNumber) {
                 //do Nothing   
             } else {
                 $(this).css("opacity", opac);
             }

         });
     }

 }


 function mobileMenu() {
     if (width <= 1024) {
         var cont = $("#topNav");
         if (cont.hasClass("menuShown")) {
             cont.removeClass("menuShown");
             $("#container").removeAttr("style");
             $("#cameraUpload").removeClass("displayOn");
         } else {
             cont.addClass("menuShown");
             $("#container").css("opacity", ".6");
             $("#cameraUpload").addClass("displayOn");
         }

     }

 }