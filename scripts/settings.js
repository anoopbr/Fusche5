var width = window.innerWidth;

var login, sideBar;


$(window).load(function () {



    login = new afterRegistration();
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

    login.resizer();
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

function afterRegistration() {
    this.healthSetting = 0;
    this.distanceSetting = 25;
    this.costSetting = 0;



    $("#cameraUpload").hide();




    this.setUpSliders = function () {


        var textarea = $("#textarea");

        this.checkBio = setInterval(function () {

            $("#bio").val($("textarea").val());

            console.log($("#bio").val());
        }, 500);

        $("#healthSlider").slider({
            range: "min",
            value: 0,
            min: 0,
            max: 2,
            slide: function (event, ui) {
                this.healthSetting = ui.value;

                $("#health").val(ui.value);

                $(".health").each(function () {
                    if ($(this).attr("number") == ui.value) {
                        $(this).removeAttr("style");
                    } else {
                        $(this).css("opacity", ".5");
                    }

                });




            }


        });


        $("#distanceSlider").slider({
            range: "min",
            min: 5,
            max: 50,
            value: 25,
            slide: function (event, ui) {
                this.distanceSetting = ui.value;

                $("#distance").val(ui.value);

                if (ui.value <= 22) {

                    $("#distTwo").empty();
                    $("#distTwo").append(ui.value + " mi");
                    $("#distTwo").css("opacity", "1");
                    if (ui.value == 5) {
                        $("#distTwo").css("opacity", "0");
                    }

                } else {
                    var perc = $("#distanceSlider").width() - ((ui.value - 5) / 45 * $("#distanceSlider").width()) - 15;


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


            }
        });
        $("#priceSlider").slider({
            range: "min",
            min: 0,
            max: 2,
            value: 0,
            slide: function (event, ui) {
                this.costSetting = ui.value;

                $("#price").val(ui.value);

                console.log(this.costSetting);
                $(".price").each(function () {
                    if ($(this).attr("number") == ui.value) {
                        $(this).removeAttr("style");
                    } else {
                        $(this).css("opacity", ".5");
                    }

                });


            }
        });

    };


    $("#price").val(this.costSetting);
    $("#distance").val(this.distanceSetting);
    $("#health").val(this.healthSetting);



    $("#signUpForm").submit(function () {
        var data = {
            "action": "save-preferences"
        };
        data = $(this).serialize() + "&" + $.param(data);
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "response.php", //Relative or absolute path to response.php file
            data: data,
            success: function (data) {
                // $(".the-return").html(
                //   "user_name: " + data["user_name"] + "<br />user_email: " + data["user_email"] + "<br />user_pwd: " + data["user_pwd"] + "<br />verbatim: " + data["verbatim"]
                // );

                if (data["response"] == "Success") {
                    //alert(data["response"]);
                    window.location.replace("search.php");
                    console.log(data + "success");
                    // History.pushState({
                    //     state: "search"
                    // }, "Search - Fusche", "?state=search");

                } else {
                    alert(data["response"]);
                    console.log(data + "failure");


                }
            }
        });
        return false;
    });




    this.resizer = function () {

    };

    this.destroy = function () {
        clearInterval(this.checkBio);
    }

    this.setUpSliders();

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