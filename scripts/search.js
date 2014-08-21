//toDO  TAKE OUT ANY UNNECESSARY CONSOLE.LOGS
        //WHEN NEW RESULTS ARE ADDED IN GET THE TOUCH POINTS IN THE RESTAURANT ARRAY FOR SWIPPING
        //ADD IN LOADING AT THE BOTTOM OF THE PAGE WHEN YOU WANT TO SEE MORE RESULTS
        //ADD IN LOADING BAR AFTER SEARCH



//toREMEMBER WHEN MAKING THE RESTAURANT OBJECTS REMEMBER THAT WE NEED YSTART AND YEND AS WELL AS ALL THE INFORMATION BECAUSE THATS HOW TOUCH/SCROLLING WORKS ON MOBILE


var width = window.innerWidth; //saving width of the page

var search, sideBar; //opjects to control both the search functions and settings and the top restaraunt side bar

var iOS = (navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false); //check to see if we are on an apple mobile device

var latitude, longitude; //variables to store the users latitude and longitude

var geocoder = new google.maps.Geocoder(); //geocoder will give us latitude/longitude from address, also will make sure we have real addresses
var address = "49 murray st ny, new york"; //starting address

/*
 Working algorthm for generating the html for singlePlatform
//var hmacBytes = Crypto.HMAC(Crypto.SHA1, "/locations/island-prime/menus/?client=c7favxkago4jk4y15d9bhud9v", "tCaanYZnIIqtr-VBM5fqXU2n82Z8KKAT-Oinzj27Pdk", { asBytes: false });
var shaObj = new jsSHA("/locations/island-prime/menus/?client=c7favxkago4jk4y15d9bhud9v", "TEXT");
var hmac = shaObj.getHMAC("tCaanYZnIIqtr-VBM5fqXU2n82Z8KKAT-Oinzj27Pdk", "TEXT", "SHA-1", "B64");
console.log(hmac);
console.log(urlencode(hmac));

*/

var scroller; //variable for scrolling


/*
  var menuApi = new MenusApi("kgetu755ypash34s0hxcde7os");
    menuApi.setBaseFontSize("10pt");
    menuApi.setPrimaryFontFamily("Arial");
    menuApi.setPrimaryBackgroundColor("#eee");
    menuApi.setSecondaryBackgroundColor("#ccc");
    menuApi.setSectionTitleFontColor("blue");
    menuApi.loadMenusForLocation("haru-7", "container");

function menuLister(data) {
    console.log("this is the data" + data);
    
}
*/

var oldDist = 0; //old y value of a swipe
var addSwipe = 0; //how much swipe has happened




geocoder.geocode({ //testing the geocode API
    'address': address
}, function (results, status) {

    if (status == google.maps.GeocoderStatus.OK) {
        latitude = results[0].geometry.location.lat();
        longitude = results[0].geometry.location.lng();
        // alert(latitude);
    }
});

if (navigator.geolocation) { //try and get position from phone
    navigator.geolocation.getCurrentPosition(function (position) {
        longitude = position.coords.longitude;
        latitude = position.coords.latitude;

        $("#currentLocation").append("Where you are sitting right now!");

    });
}

var start = 0; //values from the search results to render
var end = 1;
var alreadyRequested = false; //whether or not it is time to add more


var restaurant = []; //empty array to contain restaurant objects

/*
 var restaurantid = [];
 var name = [];
 var street = [];
 var building = [];
 var city = [];
 var phone = [];
 var price = [];
 var cuisine = [];
 var grade = [];
*/


var currScroll = 0; //keeping track of the scroll

//alert(iOS);
$(window).load(function () {



    search = new searchPage(); //create new search object
    sideBar = new topRestBar(); //create new sidebar object



    $("#menuButton").click(function () { //if you click the mobile menu button run the function that displays the menu
        mobileMenu();
    });


    $(".swipeIndicator").click(function () { //click the swipe indicator CHECK TO SEE IF IT IS STILL THERE IN THE END AND REMOVE!!!
        console.log($(this).parent(".result"));
        $(this).parent(".result").scrollLeft(-100)
    });


    /*
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
*/



    $(".topCell").mouseenter(function () { //do the fading of top restaurants on mosue over

        var filterNumber = $(this).attr("number");
        dimItDown($(".topRestImg"), filterNumber, .35);
    });

    $(".topCell").mouseleave(function () {
        var filterNumber = $(this).attr("number");
        dimItDown($(".topRestImg"), filterNumber, .86);

    });




});









$(window).resize(function () { //on resize call all of the resize functions and make sure things stay in the correct place

    search.resizer();
    sideBar.resizer();



});






//start of top restaurant sidebar object
function topRestBar() {

    this.width = window.innerWidth; //width variable

    this.resizeTopRestaraunts = function () { //resize em
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
            html += '<div class="leftResult yellow"><div class="resultTitle">' + restaurant[i].restname+ '</div><div class="resultAddress">'+restaurant[i].building+' '+restaurant[i].street+'</div>';
            html += '<div class="resultRating"><img src="images/star.svg"><img src="images/star.svg"><img src="images/star.svg"><img src="images/noStar.svg">';
            html += '<img src="images/noStar.svg"></div><div class="resultImage"><img src="http://www.envision-creative.com/wp-content/uploads/Tiagos01.jpg"></div>';
            html += '<div class="rating" rating="sucks">It Sucks</div><div class="addToList"><img src="images/saveToList.svg"><div class="addText">add to list</div>';
            html += '</div><div class="rating right" rating="good">Gotta Have It!</div></div>';
 
            html += '<div class="rightResult darkYellow"><p class="clusterOne">'+restaurant[i].phone+'<br/>lavillacafe.com <br/>'+restaurant[i].distance+' miles away<br/>'+restaurant[i].price+'</p>';
            html += '<h3>Hours of Operation</h3><p>S - 6am - 10pm<br/>M - 6am - 10pm<br/>T - 6am - 10pm<br/>W - 6am - 10pm<br/>Th - 6am - 10pm<br/>F - 6am - 10pm';
            html += '<br/>Sa - 6am - 10pm</p><div class="menuButton yellow">See the Menu</div></div><div class="ratingBar"><div class="ratingBad"></div>';
            html += '<div class="ratingGood"></div></div></div></div>';
        }
        start = end + 1;
        end += 10;
        alreadyRequested = false;
        return html;
 }
 


var scrollYSmall = 0; //scrollYSmall


function searchPage() {


    $("#searchMenu").click(function () { //you want to the see the search bar, so you clicked the search icon


        var cont = false;
        if (window.innerWidth <= 1024) {
            var scrollAmount = $(".content").offset().top; //get the scroll amount
            if (scrollAmount < 0) { //check to see if the search bar isn't on the page, because if it is on the page we don't want to show it
                cont = true;
            }

        } else {
            var scrollAmount = $(".content").scrollTop(); //get the scroll amount    
            if (scrollAmount > 100) { //check to see if the search bar isn't on the page, because if it is on the page we don't want to show it
                cont = true;
            }
        }

        if (cont) {
            if ($("#search").hasClass("hideUp")) { //check if the user wants to hide it or show it
                $("#search").removeClass("hideUp");
                $("#secondaryNav").removeClass("hideUp");
                $(this).css("opacity", "1");
                
                
            } else {
                $("#search").addClass("hideUp");
                $("#secondaryNav").addClass("hideUp");
                $(this).removeAttr("style");
                
            }
        }
    });




    this.getTouchPositions = function () {
        var i = 0; //set up the .each to act as a for loop
        $(".result").each(function () {
            restaurant[i] = {};
            restaurant[i].element = $(this);
            restaurant[i].yStart = $(this).offset().top;

            restaurant[i].yEnd = restaurant[i].yStart + $(this).height();

            i++;
        });
    };

    this.getTouchPositions();


    var secondaryNav = $("#secondaryNav"); //set up touch events for everything
    var searchEl = $("#search");
    var resultEL = $("#resultContainer").not(".phoneNumber");
    secondaryNav.on("touchstart", touchStarted);
    searchEl.on("touchstart", touchStarted);
    resultEL.on("touchstart", touchStarted);
    $(".phoneNumber").on("tap", function () {
        alert("test");
    });;

    secondaryNav.on("touchmove", touchMoved);
    searchEl.on("touchmove", touchMoved);
    resultEL.on("touchmove", touchMoved);

    secondaryNav.on("touchend", touchEnded);
    searchEl.on("touchend", touchEnded);
    resultEL.on("touchend", touchEnded);



    this.speed = 0; //speed of touch
    this.oldY = 0; //lastYposition
    this.oldX = 0; //lastXposition
    this.lastScrollTime = 0; //how long ago last time was

    this.scrollCounter = 0; //see how long the event has been going on for
    this.scrollDelay = 0;

    this.isHorizontal = false; //is it a horizontal swipe?


    function touchStarted(event) {

        //event.preventDefault();
        // console.log(event);
        //if (!$("#search").hasClass("hideUp")) {
        //   $("#search").addClass("hideUp");
        //     $("#secondaryNav").addClass("hideUp");
        //   }

        this.oldY = event.originalEvent.changedTouches[0].clientY; //set this to the oldX
        this.oldX = event.originalEvent.changedTouches[0].clientX; //set this position to the oldY
        var d = new Date(); //get Date
        var t = d.getTime(); //get the time
        this.lastScrollTime = t; //set the last scrollTime to the time
        this.scrollDelay = 0; //reset the delay to 0

    }

    function touchMoved(event) {
        this.scrollDelay++; //add to the delay
        event.preventDefault(); //prevent the default, we will take care of everything below



        this.speed = this.oldY - event.originalEvent.changedTouches[0].clientY; //yspeed between now and the last swipe

        this.isHorizontal = false; //reset it to false

        if (Math.abs(this.oldX - event.originalEvent.changedTouches[0].clientX) > 10) {
            this.isHorizontal = true; //if they have swiped more than 10 pixels horizontally since the last frame
        }



        if (this.isHorizontal) { //if it is a horizontal swipe lets take care of it and not scroll

            for (i = 0; i < restaurant.length; i++) { //check to see if you are in a touch zone for a restauraunt

                if (restaurant[i].yStart < event.originalEvent.changedTouches[0].clientY < restaurant[i].yEnd) {
                    //now you are in the touch zone for a restaurant, lets scroll it so that you can see all the details
                    if (this.oldX - event.originalEvent.changedTouches[0].clientX > 0) {

                        restaurant[i].element.addClass("resultToTheLeft");
                    } else {

                        restaurant[i].element.removeClass("resultToTheLeft");
                    }



                }

            }
        } else { //ok, so you want to scroll do you? No vertical swipe for you

            var d = new Date(); //get the date and time
            var t = d.getTime();
            var time = t - this.lastScrollTime;

            var s = (this.speed / time) * 20 * 2; //get the scroll speed of this

            this.lastScrollTime = t;


            clearInterval(scroller); //still touching? stop the scroller interval from happening

            this.scrollCounter = 0; //set the scrollcounter to 0

            scroller = setInterval(function () { //set an interval that will scroll the page at the speed set above, and each time it gets run the speed slows to a halt

                scrollThisBitch(s); //scroll it all at that speed
                s = .96 * s; //set the speed to be a bit slower


                if ((s < 1) && (s > -1)) {

                    clearInterval(scroller); //if the speed is slower than 1 in absolute value lets stop the scrollevent from happening
                }
            }, 10);

            var currScroll = $("#container").scrollTop(); // lets scroll for when the scroller interval isn't running

            $("#container").scrollTop(currScroll + this.speed);



        }
        this.oldX = event.originalEvent.changedTouches[0].clientX; //lets bring the current touches coordinates into the oldX and Y variables
        this.oldY = event.originalEvent.changedTouches[0].clientY;
    }

    function touchEnded(event) {

        //so far nothing is happening on touchEnd, but it could happen so lets keep it for now

        //event.preventDefault();

    }






    function scrollThisBitch(s) { //function to scroll the page
        this.scrollCounter++;
        var currScroll = $("#container").scrollTop();

        $("#container").scrollTop(currScroll + s);


    }



    // $(".result").swipe( { swipeStatus:resultTouch } );
    //   $("#secondaryNav").swipe( { swipeStatus:resultTouch, allowPageScroll:"horizontal"} );
    //   $("#search").swipe( { swipeStatus:resultTouch, allowPageScroll:"horizontal"} );



    $(".phoneNumber").click(function () { //you clicked a phone number, lets call it
        window.open('tel:' + $(this).text());

    });
    $(".phoneNumber").on("tap", function () { //you taped a phone number, lets call it
        window.open('tel:' + $(this).text());

    });


    $("#locationChange").click(function () { //you want to change your location?
        var locChanger = $("#locationChanger"); //get a reference to the location Changer so we don't load it a million times
        if (locChanger.hasClass("hiddenLocation")) { //check if its hidden and show it or hide it
            locChanger.removeClass("hiddenLocation");
            $("#currentLocation").addClass("hiddenLocation");
            locChanger.focus(); //lets make it so the user can start typing right away
        } else {
            locChanger.addClass("hiddenLocation");

            $("#currentLocation").removeClass("hiddenLocation");
        }

    });



    $("#getLocation").click(function () { //lets get the users currentlocation
        if (navigator.geolocation) { //if there browser supports the geolocation API 
            navigator.geolocation.getCurrentPosition(function (position) {
                longitude = position.coords.longitude;
                latitude = position.coords.latitude;
                $("#currentLocation").empty();
                $("#currentLocation").append("Current Location: Where you are sitting right now!");

            });
        } else { //lets alert the user that they suck and need to update their browser
            alert("your browser does not support this feature, for the best experience please use Fusche on the latest version of Chrome, Firefox, Safari, or other modern browser.");
        }

    });

    $("#locationForm").submit(function () {
        var newLocation = $("#locationChanger").val();
        //alert(newLocation);


        //google maps geocoding api key  AIzaSyC1IskrKyUUHYHtQHcqa3vs_IbjubgATVA

        var theUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=";

        var addy = newLocation.split(" "); //lets get rid of the spaces in the address and format it for the geocode API

        for (var i = 0; i < addy.length; i++) {
            if (i < addy.length - 1) {
                theUrl += addy[i] + "+";
            } else {
                theUrl += addy[i] + "&region=ny&key=AIzaSyC1IskrKyUUHYHtQHcqa3vs_IbjubgATVA";
            }
        }



        $.ajax({ //send the request to the geocode API
            type: "POST",
            dataType: "json",
            url: theUrl,
            success: function (data) {
                $("#results").removeClass("hiddenLocation"); //show the results div for addresses

                $("#results").empty(); //empty the div

                var numberOfResults = 0;
                for (var i = 0; i < data.results.length; i++) {
                    var reg = new RegExp(", NY", "i");
                    //if (selection.indexOf(noHash[i]) == -1) {
                    if (reg.test(data.results[i].formatted_address)) { //check to see if the results have NY as the state

                        $("#results").append("<div>" + data.results[i].formatted_address + "</div");
                        numberOfResults++;


                    }
                }



                $("#results").css("top", $("#search").position().top + $("#search").height() + 62 + "px"); //set the results div to the correct position
                $("#results").css("left", "60px");

                if (numberOfResults == 0) { //if nothing was found lets tell the user
                    $("#results").append("<div class='nothing'>We found nothing... Try again?</div>");

                    $(".nothing").click(function () { //the link for the user to try again
                        $("#locationChanger").val("");
                        $("#locationChanger").focus();
                        $("#results").addClass("hiddenLocation");
                        $(".nothing").remove();

                    });

                } else { //we found results

                    $("#results div").click(function () { //click a result
                        var address = $(this).text(); //get the address
                        alert(address);

                        geocoder.geocode({ //get the latitude and longitude for the search
                            'address': address
                        }, function (results, status) {

                            if (status == google.maps.GeocoderStatus.OK) {
                                latitude = results[0].geometry.location.lat();
                                longitude = results[0].geometry.location.lng();
                                console.log(longitude + " " + latitude);
                                $("#currentLocation").empty();
                                $("#currentLocation").append("Current Location: " + address); //set the current location to their search


                                $("#locationChanger").addClass("hiddenLocation");

                                $("#currentLocation").removeClass("hiddenLocation");



                            }
                        }); //end of geocode

                        $("#results").addClass("hiddenAddy");
                    }); //end of results click

                }

                $("#results").removeClass("hiddenAddy"); //show the results on success



            } //end of success function
        }); //end of ajax function





        event.preventDefault(); //dont be submitting that form
    }); //end of form submit function


    autoCompleter(); // turn on the autompleter for #cuisines




    searchSubmitter();





    //set up menu scrolling/hiding

    this.menuDown = false; //is the menu in view?
    this.scrollY = 0;
    this.scrollCount = 0;
    this.scrollTimeout = setTimeout(function () {

    }, 200);


    this.clearCount = function () {
        this.scrollCount = 0;


    };









    //FIX IT SO THAT WHEN YOU GO BACK AND FORTH BETWEEN BIG AND SMALL SCREEN IT CLEARS THE STYLES AND DISPLAYS CORRECTLY
    //there are two of these because the small view uses a slightly different html structure
    $("#container").scroll($.proxy(function () {

        currScroll = $("#container").scrollTop(); //current scroll

        if (window.innerWidth <= 1024) { //if we are in the small view

            var searchTop = $("#search").position().top;
            var secondTop = $("#secondaryNav").position().top;
            //smallsize






            var sideBarPos = $("#sidebar").offset().top + 200;
            var scrollAmount = $(".content").offset().top;

            if (scrollAmount > scrollYSmall) { //scrollingUp 
                if (window.innerWidth <= 600) { //if mobile
                    var searchPos = scrollAmount + 70;
                    var secPos = scrollAmount + 10;
                } else { //if tablet
                    var searchPos = scrollAmount + 50;
                    var secPos = scrollAmount + 10;
                }


                if (secPos > 0) { //show the search bar

                    $("#search").css("top", searchPos + "px");
                    $("#secondaryNav").css("top", secPos + "px");
                    if ($("#search").hasClass("hideUp")) {
                        $("#search").removeClass("hideUp");
                        $("#secondaryNav").removeClass("hideUp");
                        $("#searchMenu").css("opacity",0);
                        console.log("damn");
                    }

                }

            }

            if (scrollAmount < scrollYSmall) { //scrolling down
                if (window.innerWidth <= 600) { //if mobile
                    var searchPos = scrollAmount + 70;
                    var secPos = scrollAmount + 10;
                } else { //if tablet
                    var searchPos = scrollAmount + 50;
                    var secPos = scrollAmount + 10;
                }
                if (secPos > 0) { //set the position of the search and secondary nav so that we can see it 

                    $("#search").css("top", searchPos + "px");
                    $("#secondaryNav").css("top", secPos + "px");

                } else {
                    if (window.innerWidth <= 600) { //is movile
                        $("#search").css("top", "117px");
                    } else { //is tablet
                        $("#search").css("top", "75px");

                    }
                    $("#secondaryNav").css("top", "55px");
                if (currScroll<350) {
                    if (!$("#search").hasClass("hideUp")) { //if it doesn't have the class add it!
                       console.log(currScroll);
                        $("#search").addClass("hideUp");
                        $("#secondaryNav").addClass("hideUp");
                        $("#searchMenu").removeAttr("style");
                        $("#searchMenu").removeAttr("style");

                    }
                }

                }


            }



            //now we are going to check to see if you are at the bottom and can add more results

            scrollYSmall = scrollAmount;


            var container = $("#container");
            var newScroll = container.scrollTop()
            if ((document.getElementById("container").scrollHeight - newScroll) <= container.height() + 150) {
                if (newScroll > oldScroll) {
                    if (loadingMore == false) {
                        console.log("aaaaaghhhh");
                        loadingMore = true;
                        var html = loadResult(start, end);
                        $("#resultContainer").append(html);
                        setTimeout(function () {

                            loadingMore = false;
                        }, 1000);
                    }
                    //This will run when you are 150px from the bottom
                }
            }
            oldScroll = newScroll;



        }

    }));


    /*
    var oldScroll = 0;
     $(".content").scroll(function () {
         if (window.innerWidth > 1024) {
             var container = $(".content");
             var newScroll = container.scrollTop()
             if ((document.querySelectorAll(".content")[0].scrollHeight - newScroll - 300) <= container.height()) {
                 if (newScroll > oldScroll) {
                     console.log("aaaaaghhhh");
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
                     //This will run when you are 150px from the bottom
                 }
             }
             oldScroll = newScroll;
         }
     });
     */

    var oldScroll = 0;
    var loadingMore = false;
    $(".content").scroll($.proxy(function () { //now lets do everything we did for the mobile/tablet views but for the desktop

        if (window.innerWidth > 1024) { //if we are indeed in the desktop view

            var scrollAmount = $("#resultContainer").position().top;
            console.log(scrollAmount);


            //console.log(this.scrollCount);

            if (scrollAmount < this.scrollY) {
                if (  -100 < scrollAmount) { // if you have scrolled down far enough hide the search bars
                   console.log("shit");
                    if (!$("#search").hasClass("hideUp")) {
                       $("#search").addClass("hideUp");
                        $("#secondaryNav").addClass("hideUp");
                        $("#searchMenu").removeAttr("style");


                    }
                }
            }

            if (scrollAmount > 20) { //bring back the search bar if you are scrolled to the top
                $("#search").removeClass("hideUp");
                $("#secondaryNav").removeClass("hideUp");
                $("#searchMenu").css("opacity","0");
            }




            this.scrollY = scrollAmount; //start checking to see if you are at the bottom and more results need to be loaded

            var container = $(".content");
            var newScroll = container.scrollTop()
            if ((document.querySelectorAll(".content")[0].scrollHeight - newScroll - 300) <= container.height()) {
                if (newScroll > oldScroll) {
                    if (loadingMore == false) {
                        console.log("aaaaaghhhh");
                        loadingMore = true;
                        //This will run when you are 150px from the bottom
                        var html = loadResult(start, end);
                        $("#resultContainer").append(html);

                        setTimeout(function () {

                            loadingMore = false;
                        }, 1000);

                    }
                }
            }
            oldScroll = newScroll;


        }

    }, this));

    /*  SHOW HEALTH RATING AND HEALTH WARNING NOT NEEDED RIGHT NOW
     $(".healthStamp").mouseenter(function () { 
         $(this).siblings(".healthWarning").css("visibility", "visible");
     });

     $(".healthStamp").mouseleave(function () {
         $(this).siblings(".healthWarning").removeAttr("style");
     });
*/


    $("#cameraUpload").show(); //show the camera upload because you are on movile
    jQuery(".addText").fitText(.45); //make sure that the "Add to List" text is the correct sizing

    jQuery("#secondaryNav span").fitText(.9); //make sure the navigation text is correct

    this.resizer = function () { //resize functions to keep the view, really just in use when you are switching between mobile and desktop views

        if (window.innerWidth >= 1024) {
            $("#search").removeAttr("style");
            $("#secondaryNav").removeAttr("style");


            setTimeout(function () { //fix to some bug from the movile view that broke the layout
                if ($("#mainArea").offset().top != 100) {
                    $("#mainArea").offset({
                        top: 100
                    });
                }
            }, 700);

        }
    };

    this.destroy = function () {


    };

    this.newOrder = []; //for javascript sorting probably REMOVE


    this.sortResults = function () { //sort the results, probably will change, gotta talk with anoop to see how we are sorting things

       
           //alert("search");
        start = 0;
        end = 1;
      var data = {
            "action": "search",
            "start": start,
            "end":end,
          "searchBox":  $(".fourth:first").text(),
            "lat": latitude.toFixed(6),
          "lng": longitude.toFixed(6),
          "price": search.priceSlider,
          "health": search.healthSlider,
          "distance": search.distanceSlider,
        };
        data = $(this).serialize() + "&" + $.param(data);
        console.log(data);
         
                addLoader();
         $("#loader").addClass("showLoad");
         
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "response.php", //Relative or absolute path to response.php file
            data: data,
            timeout: 90000,
            success: function (data) {
                console.log(data["response"]);
                // console.log(data["value"]);
                var response = data["response"];
                var userLat = data["lat"];
                var userLng = data["lng"];
                if(response == "success"){
                    //alert("success");
                    console.log(data);
                    if (data["value"].length>0) {
                    

               
                    restaurant = [];
                    for(var i=0; i < data["value"].length; i++){
                        restaurant[i] = [];
                        restaurant[i].restaurantid = data["value"][i]["restaurantid"];
                        restaurant[i].restname = data["value"][i]["name"];
                        restaurant[i].street = data["value"][i]["street"];
                        restaurant[i].building = data["value"][i]["building"];
                        restaurant[i].city = data["value"][i]["city"];
                        restaurant[i].phone = data["value"][i]["phone"];
                        restaurant[i].price = data["value"][i]["price"];
                        restaurant[i].cuisine = data["value"][i]["cuisine"];
                        restaurant[i].grade = data["value"][i]["grade"];
                        restaurant[i].lat = data["value"][i]["latitude"];
                        restaurant[i].lng = data["value"][i]["longitude"];
                        var dist = 0;
                        dist = calDistance(userLat, userLng, data["value"][i]["latitude"], data["value"][i]["longitude"]);
                        restaurant[i].distance = dist;
                    }
 
                    var html = loadResult(start,end);
                    document.getElementById("resultContainer").innerHTML = html;
                      $("#loader").removeClass("showLoad");
                     removeLoader();
                    
                    // if(start == 0){
                    //     document.getElementById("resultContainer").innerHTML = html;
                    // }else{
                    //     $('#resultContainer').append(html);
                    // }
 
                    } else {
                        
                     alert("We got nothing...");   
                        $("#loader").removeClass("showLoad");
                     removeLoader();  
                    }
 
                }else{
                    alert(data["response"]);
                }
 
            },
            error: function(x, t, m) {
                if(t==="timeout") {
                    alert("got timeout");
                } else {
                    alert("Error "+m);
                }
            }
        });





    };



    this.healthSlider = "A"; //set the values for the slider options GET THIS FROM THE SERVER!!!!! EDIT CHANGE FIX WORK ON TODO
    this.priceSlider = 0;
    this.distanceSlider = 25;




    this.activateSlider = function () { //get those sliders working hard
        var sortTimer;
 

        /*
    NO MORE SORTER, GOTTA FIND A DIFFERENT WAY TO DO ORDERING
        $(".sorter").click(function () {

             if ($(this).hasClass("off")) {
                 $(this).removeClass("off");
                 $(this).siblings(".sorter").addClass("off");

             } else {
                 $(this).addClass("off");
                 $(this).siblings(".sorter").removeClass("off");
             }


         });
*/

        $("#healthSlider").slider({
            range: "min",
            value: 0,
            min: 0,
            max: 2,
            slide: function (event, ui) {
                console.log(sortTimer);
                clearTimeout(sortTimer);
        
                $("#health").val(ui.value); //change the form value
        
                
                switch(ui.value) {
                
                        case 0:
                        
                        search.healthSlider = "A"; //change the object value
                        break;  
                        case 1:
                        
                        search.healthSlider = "B"; //change the object value
                        break;
                    
                        case 2:
                        
                        search.healthSlider = "C"; //change the object value
                        break;
                        
                        
                        
                }

                $(".health").each(function () {
                    if ($(this).attr("number") == ui.value) {
                        $(this).removeAttr("style");
                    } else {
                        $(this).css("opacity", ".5");
                    }


                });

                sortTimer = setTimeout(function () { //timer to send in changes to the server
                    search.sortResults();
                    alert("changing!");

                }, 1500);


            }


        });


        $("#distanceSlider").slider({
            range: "min",
            min: 5,
            max: 50,
            value: 5,
            slide: function (event, ui) {
                clearTimeout(sortTimer);
                this.distanceSetting = ui.value;

                $("#distance").val(ui.value);

                search.distanceSlider = ui.value;
                if (ui.value <= 22) { //lots of styling on this one, gotta animate the distance number

                    $("#distTwo").empty();
                    $("#distTwo").append(ui.value + " mi");
                    $("#distTwo").css("opacity", "1");
                    if (ui.value == 5) {
                        $("#distTwo").css("opacity", "0");
                    }

                } else {
                    var perc = $("#distanceSlider").width() - ((ui.value - 5) /
                        45 * $("#distanceSlider").width()) - 15;


                    $("#distOne").css("transform", "translate(0px)");
                    $("#distOne").css("-webkit-transform", "translate(0px)");
                    $("#distOne").empty();
                    $("#distOne").append("5 mi");

                    $("#distTwo").css("opacity", "1");
                    $("#distTwo").css("transform", "translate(-" + perc + "px)");
                    $("#distTwo").css("-webkit-transform", "translate(-" + perc + "px)");
                    $("#distTwo").empty();
                    $("#distTwo").append(ui.value + " mi");

                    //ADD IN WEBKIT TRANSFORMS SO THAT IT WILL WORK IN MORE BROWSERS AND FIGURE OUT FALL BACK MAYBE



                }
                sortTimer = setTimeout(function () { //timer to send in changes to the server

                    alert("changing!");
                    search.sortResults();
                }, 1500);

            }
        });

        $("#priceSlider").slider({
            range: "min",
            min: 0,
            max: 2,
            value: 0,
            slide: function (event, ui) {
                clearTimeout(sortTimer);
                this.costSetting = ui.value;

                $("#price").val(ui.value);
                search.priceSlider = ui.value;


                $(".price").each(function () {
                    if ($(this).attr("number") == ui.value) {
                        $(this).removeAttr("style");
                    } else {
                        $(this).css("opacity", ".5");
                    }

                });
                sortTimer = setTimeout(function () { //timer to send in changes to the server

                    alert("changing!");
                    search.sortResults();
                }, 1500);

            }
        });

        jQuery(".slideName").fitText(.8);

    };



}






function dimItDown(theClass, filterNumber, opac) { //get the correct opacity on the top restaurants
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


function mobileMenu() { //show the mobile menu or not
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


function autoCompleter() { //turn on watching for #s in the search box
    $("#searchBox").keypress(function (event) {
        if (event.keyCode == "35") {
            //alert("fun");
            var possibleCuisines = [
'#Afghan',
'#African',
'#American ',
'#Armenian',
'#Asian',
'#Australian',
'#Bagels/Pretzels',
'#Bakery',
'#Bangladeshi',
'#Barbecue',
'#Bottled beverages, including water, sodas, juices, etc.',
'#Brazilian',
'#Café/Coffee/Tea',
'#Cajun',
'#Californian',
'#Caribbean',
'#Chicken',
'#Chinese',
'#Chinese/Cuban',
'#Chinese/Japanese',
'#Continental',
'#Creole',
'#Creole/Cajun',
'#Czech',
'#Delicatessen',
'#Donuts',
'#Eastern European',
'#Egyptian',
'#English',
'#Ethiopian',
'#Filipino',
'#French',
'#Fruits/Vegetables',
'#German',
'#Greek',
'#Hamburgers',
'#Hawaiian',
'#Hotdogs',
'#Hotdogs/Pretzels',
'#Ice Cream, Gelato, Yogurt, Ices',
'#Indian',
'#Indonesian',
'#Iranian',
'#Irish',
'#Italian',
'#Japanese',
'#Jewish/Kosher',
'#Juice, Smoothies, Fruit Salads',
'#Korean',
'#Latin Cuban, Dominican, Puerto Rican, South & Central American',
'#Mediterranean',
'#Mexican',
'#Middle Eastern',
'#Moroccan',
'#Not Listed/Not Applicable',
'#Nuts/Confectionary',
'#Other',
'#Pakistani',
'#Pancakes/Waffles',
'#Peruvian',
'#Pizza',
'#Pizza/Italian',
'#Polish',
'#Portuguese',
'#Russian',
'#Salads',
'#Sandwiches',
'#Sandwiches/Salads/Mixed Buffet',
'#Scandinavian',
'#Seafood',
'#Soul Food',
'#Soups',
'#Soups & Sandwiches',
'#Southwestern',
'#Spanish',
'#Steak',
'#Tapas',
'#Tex-Mex',
'#Thai',
'#Turkish',
'#Vegetarian',
'#Vietnamese/Cambodian/Malaysia'
];

            $("#searchBox").autocomplete({



                multiple: true,
                source: possibleCuisines,
                select: function (event, ui) {
                    var selection, searchTerms, noHash, userSearch;

                    selection = ui.item.value;
                    searchTerms = $("#searchBox").val();

                    noHash = searchTerms.split("#");
                    userSearch = "";
                    for (var i = 0; i < noHash.length; i++) {
                        console.log(noHash[i]);
                        var reg = new RegExp(noHash[i], "i");
                        //if (selection.indexOf(noHash[i]) == -1) {
                        if (!reg.test(selection)) {
                            userSearch += noHash[i] + " ";
                            console.log(noHash[i] + "not in selection");

                        }


                    }


                    userSearch += selection;
                    var userSearch2 = "";
                    checkForMatches = userSearch.split(" ");
                    console.log(checkForMatches);
                    for (var i = 0; i < checkForMatches.length; i++) {
                        var reg = new RegExp(checkForMatches[i], "i");
                        for (var p = 0; p < possibleCuisines.length; p++) {
                            if (checkForMatches[i].indexOf("#") == -1) {
                                if (reg.test(possibleCuisines[p])) {
                                    if (checkForMatches[i].length > 1) {
                                        console.log(checkForMatches[i] + "we have a cuisine that isn't hashed");
                                        checkForMatches[i] = "#" + checkForMatches[i];
                                    }
                                }
                            }

                        }
                        userSearch2 += checkForMatches[i] + " ";
                    }


                    $("#searchBox").val(userSearch2);
                    event.preventDefault();

                },
                focus: function (event, ui) {

                    event.preventDefault();
                }
            });
        }
    });

}


function newSearchBox() {

    return '<div id="search"> <div id="searchOverflow"> <form id="searcher"> <input type="text" id="searchBox" placeholder="Search for a restaurant or dish..."></input> <input id="searchSubmit" type="image" src="images/purpArrow.svg" alt="Search" /> </form> <div id="getLocation">Get Current Location</div> <div id="locationChange">Change your location</div> <form id="locationForm"> <input id="locationChanger" class="hiddenLocation" type="text" placeholder="Where do you want to eat? ex. 49 Murray St NY, NY"> </form> <div id="currentLocation">Current Location: </div> </div> </div>';
}


function filters(searchTerm) {



    return '<div class="fourth">' + searchTerm + '</div><div class="fourth"><div class="options"><div class="third price" number="0">$</div><div class="third middleOption price" number="1">$$</div><div class="third lastOption price" number="2">$$$</div></div><div id="priceSlider"></div>                      <div class="slideName">Price</div></div><div class="fourth"><div class="options"><div class="third distance" id="distOne">5 mi</div><div class="third lastOption distance" id="distTwo" style="margin-left: 33%">50 mi</div></div><div id="distanceSlider"></div><div class="slideName">Distance</div>                       </div><div class="fourth"><div class="options"><div class="third health" number="0">A</div><div class="third middleOption health" number="1">B</div><div class="third lastOption health" number="2">C</div></div><div id="healthSlider"></div><div class="slideName">Health Rating</div> </div>'


}


function searchSubmitter() { //set up the handling of searches 

    
     $("#search").submit(function () {
        //alert("search");
        start = 0;
        end = 1;
      var data = {
            "action": "search",
            "start": start,
            "end":end,
          "searchBox": $("#searchBox").val(),
            "lat": latitude.toFixed(6),
          "lng": longitude.toFixed(6),
          "price": search.priceSlider,
          "health": search.healthSlider,
          "distance": search.distanceSlider
        };
        data = $(this).serialize() + "&" + $.param(data);
        console.log(data);
         
                addLoader();
         $("#loader").addClass("showLoad");
         
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "response.php", //Relative or absolute path to response.php file
            data: data,
            timeout: 90000,
            success: function (data) {
                console.log(data["response"]);
                // console.log(data["value"]);
                var response = data["response"];
                var userLat = data["lat"];
                var userLng = data["lng"];
                if(response == "success"){
                    //alert("success");
                    console.log(data);
                    if (data["value"].length>0) {
                     var newFilter = filters($("#searchBox").val()); //get what it was the person searched



                  
                    
                    $("#searcher").empty(); //clear the search form
                    $("#searcher").append(newFilter); //add the filters in
                    $("#search").addClass("filter"); //make sure we know they are filters now

                    $(".fourth:first").click(function () { //youve clicked the search and wanna make a new one


                        $("#search").remove(); //remove the filters
                        $("#secondaryNav").after(newSearchBox()); //put a new search box in there
                        searchSubmitter(); // run the funtctions to set it up, we need the events
                        autoCompleter();

                    });

                    search.activateSlider(); //activate the sliders after they are made
                    restaurant = [];
                    for(var i=0; i < data["value"].length; i++){
                        restaurant[i] = [];
                        restaurant[i].restaurantid = data["value"][i]["restaurantid"];
                        restaurant[i].restname = data["value"][i]["name"];
                        restaurant[i].street = data["value"][i]["street"];
                        restaurant[i].building = data["value"][i]["building"];
                        restaurant[i].city = data["value"][i]["city"];
                        restaurant[i].phone = data["value"][i]["phone"];
                        restaurant[i].price = data["value"][i]["price"];
                        restaurant[i].cuisine = data["value"][i]["cuisine"];
                        restaurant[i].grade = data["value"][i]["grade"];
                        restaurant[i].lat = data["value"][i]["latitude"];
                        restaurant[i].lng = data["value"][i]["longitude"];
                        var dist = 0;
                        dist = calDistance(userLat, userLng, data["value"][i]["latitude"], data["value"][i]["longitude"]);
                        restaurant[i].distance = dist;
                    }
 
                    var html = loadResult(start,end);
                    document.getElementById("resultContainer").innerHTML = html;
                      $("#loader").removeClass("showLoad");
                     removeLoader();
                    
                    // if(start == 0){
                    //     document.getElementById("resultContainer").innerHTML = html;
                    // }else{
                    //     $('#resultContainer').append(html);
                    // }
 
                    } else {
                        
                     alert("We got nothing...");   
                        $("#loader").removeClass("showLoad");
                     removeLoader();  
                    }
 
                }else{
                    alert(data["response"]);
                }
 
            },
            error: function(x, t, m) {
                if(t==="timeout") {
                    alert("got timeout");
                } else {
                    alert("Error "+m);
                }
            }
        });
 
        return false;
 
    });
 
    

}


function urlencode(str) { //lets encode some URLS!! WOOH YEAH!!!
    //       discuss at: http://phpjs.org/functions/urlencode/
    //      original by: Philip Peterson
    //      improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    //      improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    //      improved by: Brett Zamir (http://brett-zamir.me)
    //      improved by: Lars Fischer
    //         input by: AJ
    //         input by: travc
    //         input by: Brett Zamir (http://brett-zamir.me)
    //         input by: Ratheous
    //      bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    //      bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    //      bugfixed by: Joris
    // reimplemented by: Brett Zamir (http://brett-zamir.me)
    // reimplemented by: Brett Zamir (http://brett-zamir.me)
    //             note: This reflects PHP 5.3/6.0+ behavior
    //             note: Please be aware that this function expects to encode into UTF-8 encoded strings, as found on
    //             note: pages served as UTF-8
    //        example 1: urlencode('Kevin van Zonneveld!');
    //        returns 1: 'Kevin+van+Zonneveld%21'
    //        example 2: urlencode('http://kevin.vanzonneveld.net/');
    //        returns 2: 'http%3A%2F%2Fkevin.vanzonneveld.net%2F'
    //        example 3: urlencode('http://www.google.nl/search?q=php.js&ie=utf-8&oe=utf-8&aq=t&rls=com.ubuntu:en-US:unofficial&client=firefox-a');
    //        returns 3: 'http%3A%2F%2Fwww.google.nl%2Fsearch%3Fq%3Dphp.js%26ie%3Dutf-8%26oe%3Dutf-8%26aq%3Dt%26rls%3Dcom.ubuntu%3Aen-US%3Aunofficial%26client%3Dfirefox-a'

    str = (str + '')
        .toString();

    // Tilde should be allowed unescaped in future versions of PHP (as reflected below), but if you want to reflect current
    // PHP behavior, you would need to add ".replace(/~/g, '%7E');" to the following.
    return encodeURIComponent(str)
        .replace(/!/g, '%21')
        .replace(/'/g, '%27')
        .replace(/\(/g, '%28')
        .
    replace(/\)/g, '%29')
        .replace(/\*/g, '%2A')
        .replace(/%20/g, '+');
}



function removeLoader() {
 $("#loader").empty();   
}

function addLoader() {
    $("#loader").append(' <div class="spinner"> <div class="spinner-container container1"> <div class="circle1"></div> <div class="circle2"></div> <div class="circle3"></div> <div class="circle4"></div> </div> <div class="spinner-container container2"> <div class="circle1"></div> <div class="circle2"></div> <div class="circle3"></div> <div class="circle4"></div> </div> <div class="spinner-container container3"> <div class="circle1"></div> <div class="circle2"></div> <div class="circle3"></div> <div class="circle4"></div> </div>');
    
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