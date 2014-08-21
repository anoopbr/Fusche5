var width = window.innerWidth;

var profileView, sideBar;


$(window).load(function () {



    profileView = new profile();
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

    profileView.resizer();
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


//start of the signup page object

function profile() {

/*

    !!!!!!!!!put this in the return for an AJAX call retrieving user information!!!!!
    
    this.dishes = [];
    
    for (var i =0; i < length of user's dishes;i++) {
    
    this.dishes[i] = [];
    this.dishes[i].name
    this.dishes[i].restaurant=[]
    
    this.dishes[i].restaurant.rating
    this.dishes[i].restaurant.healthGrade
    this.dishes[i].restaurant.singlePlatformStuff
    
    this.dishes[i].rating
    this.dishes[i].caption
    this.dishes[i].user
    this.dishes[i].comments[]
    this.dishes[i].likes[]
    this.dishes[i].timeStamp
    
    this.dishes[i].elem = $("#jquerySelector")
    }
    

_____________________________________________

    this.followersList = [];
    
     for (var i =0; i < length of user's followers;i++) {
     
     this.followersList[i]=[];
     this.followersList[i].name
     this.followersList[i].email
     this.followersList[i].bio
     this.followersList[i].elem = $("#jquerySelector")
     
     
    
    
    }
    
    
    
_____________________________________________

    this.followedList = [];
    
      for (var i =0; i < length of followed users;i++) {
      
      this.followedList[i]=[];
     this.followedList[i].name
     this.followedList[i].email
     this.followedList[i].bio
     this.followedList[i].elem = $("#jquerySelector")
      
      
      }
      

_____________________________________________

      this.savedDishes = [];
      
      for (var i =0; i < length of savedDishes;i++) {
      
     this.savedDishes[i] = [];
    this.savedDishes[i].name
    this.savedDishes[i].restaurant=[]
    
    this.savedDishes[i].restaurant.rating
    this.savedDishes[i].restaurant.healthGrade
    this.savedDishes[i].restaurant.singlePlatformStuff
    
    this.savedDishes[i].rating
    this.savedDishes[i].caption
    this.savedDishes[i].user
    this.savedDishes[i].comments[]
    this.savedDishes[i].likes[]
    this.savedDishes[i].timeStamp
      
      
      }
    
*/


    this.resizer = function () {

    };

    this.destroy = function () {
        clearInterval(this.checkBio);
    }

  

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