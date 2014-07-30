var width = window.innerWidth;

var login, sideBar;


$(window).load(function () {



    login = new signUpPage();
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
function signUpPage() {
    var newThis = this;
    $("#cameraUpload").hide();


    this.switchToReg = function () {
        if ($("#registrationForm").hasClass("displayIt")) {
            $("#loginForm").show();
            $("#registrationForm").removeClass("displayIt");
            $("#loginBox h6").empty();
            $("#loginBox h6").html("Register");

        } else {
            $("#loginForm").hide();
            $("#registrationForm").addClass("displayIt");
            $("#loginBox h6").empty();
            $("#loginBox h6").html("Login");

        }
    };

    this.validateEmail = function (email) { //makes sure the email address is a real email
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };



    this.formValidation = function () {

        var validator = $("#registrationForm").validate({ //sets up rules for email address
            rules: {
                email: {
                    required: true,
                    email: true
                }
            }
        });

        var validator2 = $("#registrationForm").validate({ //sets up rules for passwords
            rules: {
                password: {
                    required: true,
                    equaltTo: "passwordTwo"
                },
                passwordTwo: {
                    required: true,
                    equalTo: "password"
                }
            }


        });




        $("#registrationForm").change(function () { //calls below on change of form

            if ($("#registrationForm #email").val() !== "") { //if something is in the email field


                if (newThis.validateEmail($("#registrationForm #email").val()) == false) { //if the email isn't valid

                    validator.showErrors({ //show those errors!
                        "user_email": "Come on, use a real email address!!!"
                    });
                }

            }

            if (($("#registrationForm #passwordTwo").val() !== "") && ($("#registrationForm #password").val() !== "")) { //if both passwords fields have something inside of it


                validator2.showErrors({ //check and show those errors
                    "user_pwd2": "The passwords have got to match"
                });
            }
        });

    };

    this.resizer = function () {
        //doNothing   
    }



    $("#loginBox h6").click(function () { //set up event handler for switching to registration
        newThis.switchToReg();
        newThis.formValidation();
    });





    $(".login-form").submit(function () {
        //alert("loginForm");
        var data = {
            "action": "login"
        };
        data = $(this).serialize() + "&" + $.param(data);
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "response.php", //Relative or absolute path to response.php file
            data: data,
            success: function (data) {
                // $(".the-return").html(
                //   "user_name: " + data["user_name"] + "<br />user_email: " + data["user_email"] + "<br />user_pwd: " + data["user_pwd"] + "<br />JSON: " + data["json"] + "<br />auth: " + data["auth"]
                // );

                // alert("Form submitted successfully.\nReturned json: " + data["response"]);
                if (data["response"] == "Authenticated") {
                    window.location.replace("search.php");
                }else if (data["response"] == "Registered") {
                    window.location.replace("settings.php");
                } else {
                    $(".the-return").html(data["response"]);
                }
            }
        });
        return false;
    });
    $(".register-form").submit(function () {
        var data = {
            "action": "register"
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

                if (data["response"] == "Authenticated") {
                    name = data['user_name'];

                } else {
                    $(".the-return").html(data["response"]);
                    console.log(data["response"]);


                }
            }
        });
        return false;
    });

    jQuery(".addText").fitText(.45);
    this.destroy = function () {


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