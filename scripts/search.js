 var width = window.innerWidth;

 var search, sideBar;

var start=0;
var end=1;
var alreadyRequested = false;
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

 function query(){
        console.log("SEARCHING!!!!")
  
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
                if(response == "success"){
                    //alert("success");
                    var name = [] ;
                    var street = [] ;
                    var building = [] ;
                    var city = [] ;
                    var phone = [] ;
                    var price =[] ;
                    var cuisine =[] ;
                    var grade = [] ;
                    for(var i=0; i < data["value"].length; i++){
                        name[i] = data["value"][i]["name"];
                        street[i] = data["value"][i]["street"];
                        building[i] = data["value"][i]["building"];
                        city[i] = data["value"][i]["city"];
                        phone[i] = data["value"][i]["phone"];
                        price[i] = data["value"][i]["price"];
                        cuisine[i] = data["value"][i]["cuisine"];
                        grade[i] = data["value"][i]["grade"];
                        // console.log(building);
                        // console.log(phone);
                    }
                    var html = "";
                    for(i=0; i<10; i++){
                        html += '<div class="result darkYellow"><div class="resultsOverflow "><div class="swipeIndicator"><img src="images/arrowRight.svg"></div>';
                        html += '<div class="leftResult yellow"><div class="resultTitle">' + name[i] + '</div><div class="resultAddress">'+building[i]+' '+street[i]+'</div>';
                        html += '<div class="resultRating"><img src="images/star.svg"><img src="images/star.svg"><img src="images/star.svg"><img src="images/noStar.svg">';
                        html += '<img src="images/noStar.svg"></div><div class="resultImage"><img src="http://www.envision-creative.com/wp-content/uploads/Tiagos01.jpg"></div>';
                        html += '<div class="rating" rating="sucks">It Sucks</div><div class="addToList"><img src="images/saveToList.svg"><div class="addText">add to list</div>';
                        html += '</div><div class="rating right" rating="good">Gotta Have It!</div></div>';

                        html += '<div class="rightResult darkYellow"><p class="clusterOne">'+phone[i]+'<br/>lavillacafe.com <br/>.2 miles away<br/>'+price[i]+'</p>';
                        html += '<h3>Hours of Operation</h3><p>S - 6am - 10pm<br/>M - 6am - 10pm<br/>T - 6am - 10pm<br/>W - 6am - 10pm<br/>Th - 6am - 10pm<br/>F - 6am - 10pm';
                        html += '<br/>Sa - 6am - 10pm</p><div class="menuButton yellow">See the Menu</div></div><div class="ratingBar"><div class="ratingBad"></div>';
                        html += '<div class="ratingGood"></div></div></div></div>';
                    }
                    if(start == 0){
                        document.getElementById("resultContainer").innerHTML = html;
                    }else{
                        $('#resultContainer').append(html);
                    }
                    start = end + 1;
                    end += 2;
                    alreadyRequested = false;
                    

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

