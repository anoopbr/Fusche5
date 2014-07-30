var width = window.innerWidth;
var animations = new Animation();









$(window).load(function () {




    $("#menuButton").click(function () {
        animations.mobileMenu();
    });


    //add to the results object and the landing object
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


    //add to the results object and the landing object
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
        animations.dimItDown($(".topRestImg"), filterNumber, .35);
    });

    $(".topCell").mouseleave(function () {
        var filterNumber = $(this).attr("number");
        animations.dimItDown($(".topRestImg"), filterNumber, .86);

    });




});



function Animation() {

    this.dimItDown = function (theClass, filterNumber, opac) {
        if (width > 1024) {
            theClass.each(function () {
                if ($(this).parent().attr("number") == filterNumber) {
                    //do Nothing   
                } else {
                    $(this).css("opacity", opac);
                }

            });
        }

    };


    this.mobileMenu = function () {
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

    };
}