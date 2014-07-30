var width = window.innerWidth;

var currentState = "landing";
var sideBarState;
var state;


console.log(currentState);



$(window).load(function () {

    sideBarState = new topRestBar();
    state = new signUpPage();

    //History.pushState("", "choose your settings", "");

    History.pushState({
        state: "landing"
    }, "Welcome to Fusche", "?state=landing");

    if (name == "") {
        History.pushState({
            state: "landing"
        }, "Welcome to Fusche", "?state=landing");
    } else {


        History.pushState({
            state: "search"
        }, "Search - Fusche", "?state=search");
    }





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



function checkState(data) {

    state.destroy();

    if (currentState == "landing") {

        state = new signUpPage();

        if (sideBarState.view != "topRest") {
            sideBarState = new topRestBar();
        }

    } else if (currentState == "afterRegistration") {
        switchToRegister(data);

    } else if (currentState == "search") {
        switchToSearch();
    }

}



function switchState() {


    if (currentState == "landing") {

        state = new signUpPage();
        if (sideBarState.view != "topRest") {
            sideBarState = new topRestBar();
        }

    } else if (currentState == "afterRegistration") {

        state = new afterRegistration();

        if (sideBarState.view != "topRest") {
            sideBarState = new topRestBar();
        }

    } else if (currentState == "search") {

        state = new searchPage();

        if (sideBarState.view != "topRest") {
            sideBarState = new topRestBar();
        }
    }


}

History.Adapter.bind(window, 'statechange', function (data) { // Note: We are using statechange instead of popstate
    var State = History.getState(); // Note: We are using History.getState() instead of event.state
    console.log("state: " + State.data.state);
    currentState = State.data.state;
    checkState(data);
});









$(window).resize(function () {

    state.resizer();
    sideBarState.resizer();

});



function searchPage() {



    var secondary = document.createElement('div');
    secondary.id = "secondaryNav";
    secondary.innerHTML = "<span>Search</span> <span>Newest Dishes</span><span>Popular Dishes</span> <span class='yellow'>Following</span>";

    var searcher = document.createElement('span');
    var newDish = document.createElement('span');
    var popularDish = document.createElement('span');
    var following = document.createElement('span');

    following.className = "yellow";



    var searchBar = document.createElement('div');
    searchBar.id = "search";

    var searchInput = document.createElement('input');
    searchInput.setAttribute('type', 'text');
    searchInput.setAttribute('id', 'searchBox');
    searchInput.setAttribute('placeholder', 'Search for a restaurant or dish...');


    var searchSub = document.createElement('input');
    searchSub.id = "searchSubmit";
    searchSub.setAttribute("type", "image");
    searchSub.setAttribute("src", "images/purpArrow.svg");
    searchSub.setAttribute("alt", "Searcg");


    searchBar.appendChild(searchInput);
    searchBar.appendChild(searchSub);


    $(".toTheRight").append(secondary);
    $(".toTheRight").append(searchBar);


    var resultContainer = document.createElement('div');
    resultContainer.id = "resultContainer";
    $(".toTheRight").append(resultContainer);


    for (var i = 0; i < 20; i++) {
        restResultMarkUp("La Villa Cafe", "501 Dekalb Ave", 4, "http://www.envision-creative.com/wp-content/uploads/Tiagos01.jpg", "999-999-999", "laVilla.com", ".2 mi Away", "$$", true);
        console.log("fillingUpResults  " + i);
    }




    $("#cameraUpload").show();
    jQuery(".addText").fitText(.45);
    this.resizer = function () {

    };

    this.destroy = function () {


    };


}



//start of top restaurant sidebar object
function topRestBar() {

    this.view = "topRest";

    this.addResults = function () {
        $("#sidebar").empty();
        $("#sidebar").html(sideBarMarkUp);
        for (var i = 0; i <= 10; i++) {
            $("#sidebar").append(topRestMarkUp(i));

        }
        this.resizeTopRestaraunts();
        console.log("shit");
    };



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

    this.addResults();

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

    History.pushState({
        state: "landing"
    }, "Welcome To Fusche", "?state=landing");

    this.switchToReg = function () {
        $("#loginForm").hide();
        $("#registrationForm").addClass("displayIt");
        $("#loginBox h6").remove();

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

                    console.log(data);
                    History.pushState({
                        state: "search"
                    }, "Search - Fusche", "?state=search");
                } else {
                    $(".the-return").html(
                        data["response"]
                    );
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
                    History.pushState({
                        state: "afterRegistration"
                    }, "choose your settings", "?state=settings");
                } else {
                    $(".the-return").html(
                        data["response"]
                    );
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


function switchToSearch() {

    var newCont = document.createElement('div');
    newCont.className = "content toTheRight";


    $("#mainArea").append(newCont);






    $(".content").each(function () {
        if ($(this).hasClass("toTheRight")) {

        } else {
            $(this).addClass("toTheLeft");
        }
    });


    setTimeout(function () {
        currentState = "search";

        switchState();
    }, 300);

    setTimeout(function () {
        $(".toTheLeft").remove();
        $(".toTheRight").removeClass("toTheRight");
    }, 2200);

}

function switchToRegister(data) {
    //alert(data["response"]);
    //console.log(data);
    var newCont = document.createElement('div');
    newCont.className = "content toTheRight";


    $("#mainArea").append(newCont);

    $(".toTheRight").html(afterRegistrationMarkUp);


    $(".twoThirds h2").empty();
    $(".twoThirds h2").append("Welcome, " + name + "!");


    $(".content").each(function () {
        if ($(this).hasClass("toTheRight")) {

        } else {
            $(this).addClass("toTheLeft");
        }
    });


    setTimeout(function () {
        currentState = "afterRegistration";

        switchState();
    }, 300);

    setTimeout(function () {
        $(".toTheLeft").remove();
        $(".toTheRight").removeClass("toTheRight");
    }, 1500);


}


//start of choosing settings page

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
                    console.log(data + "success");
                    History.pushState({
                        state: "search"
                    }, "Search - Fusche", "?state=search");

                } else {
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









var afterRegistrationMarkUp = '<div id="welcome"> <div class="third">  <img id="welcomeImg" src="images/profilePic-01.png"> <img id="profileMask" src="images/profileMask.svg"> <div id="profileChange">Change your profile picture.</div>  </div> <div class="twoThirds"><h2>Welcome, Anoop!</h2> <form> <textarea id="textarea" class="bio deepPurp" placeholder="Tell us a little something about yourself!!! (in 200 characters or less)"></textarea>   </form>   </div>   </div>   <div id="settingSelector">  <h3>Set some preferences</h3>  <div class="setter">  <div class="options"><div class="third health" number="0">A</div>    <div class="third middleOption health" number="1">B</div>  <div class="third lastOption health" number="2">C</div>   </div>  <div id="healthSlider"></div>    <h4>Minimum Health Rating</h4>      </div>        <div class="setter">   <div class="options"> <div class="third price" number="0">$</div> <div class="third middleOption price" number="1">$$</div> <div class="third lastOption price" number="2">$$$</div>      </div> <div id="priceSlider"></div>    <h4>Price Range</h4>  </div>   <div class="setter">   <div class="options">  <div class="third distance" id="distOne">5 mi</div> <div class="third lastOption distance" id="distTwo" style="margin-left: 33%">50 mi</div></div> <div id="distanceSlider"></div> <h4>Maximum Distance</h4>   </div> <form id="signUpForm" method="post" action="response.php" accept-charset="utf-8">  <input type="text" name="bio" id="bio"> <input type="text" name="health" id="health"> <input type="text" name="price" id="price">  <input type="text" name="distance" id="distance"><button name="save-preference" type="submit" class="next yellow">These are the settings I want! Let \'s go!!</div> ';


var logInMarkUp = '    ';




function restResultMarkUp(restName, restAddress, starRating, restImgUrl, phoneNum, restUrl, restDist, price, hasMenu) {
    var fragment = document.createDocumentFragment();
    //the whole container
    var resultCont = document.createElement('div');
    resultCont.className = "result darkYellow";
    //container
    //overflow
    var overflow = document.createElement('div');
    overflow.className = "resultsOverflow";

    resultCont.appendChild(overflow);
    //container
    //overflow 
    //swipe indicator

    var swipeInd = document.createElement('div');
    swipeInd.className = "swipeIndicator";
    var swipeImg = document.createElement('img');
    swipeImg.setAttribute('src', "images/arrowRight.svg");

    swipeInd.appendChild(swipeImg);

    overflow.appendChild(swipeInd);



    var leftDiv = document.createElement('div');
    leftDiv.className = "leftResult yellow";


    var resultTitle = document.createElement('div');
    resultTitle.className = "resultTitle";
    resultTitle.innerHTML = restName; //get the rest name



    var resultAddress = document.createElement('div');
    resultAddress.className = "resultAddress";
    resultAddress.innerHTML = restAddress; //get the rest name



    var resultRating = document.createElement('div');
    resultRating.className = "resultRating";



    var star = document.createElement('img');
    var nostar = document.createElement('img');
    star.setAttribute('src', 'images/star.svg');
    nostar.setAttribute('src', 'images/noStar.svg');
    var rating = [];
    for (var i = 0; i < 5; i++) {
        if (i <= starRating) {
            rating[i] = star.cloneNode();
            resultRating.appendChild(rating[i]);
        } else {
            rating[i] = nostar.cloneNode();
            resultRating.appendChild(rating[i]);
        }

    }


    var resultImage = document.createElement('div');
    resultImage.className = "resultImage";
    var resultImageImg = document.createElement('img');
    resultImageImg.setAttribute('src', restImgUrl); //the image url
    resultImage.appendChild(resultImageImg);



    var sucks = document.createElement('div');
    var addToList = document.createElement('div');
    var good = document.createElement('div');
    sucks.className = "rating";
    sucks.setAttribute('rating', 'sucks');
    good.className = "rating";
    good.setAttribute('rating', 'good');
    addToList.className = "addToList";
    sucks.innerHTML = "It Sucks";
    good.innerHTML = "Gotta Have It!";


    var addToImg = document.createElement('img');
    addToImg.setAttribute('src', 'images/saveToList.svg');
    var addToText = document.createElement('div');
    addToText.className = "addText";
    addToText.innerHTML = "add to list";
    addToList.appendChild(addToImg);
    addToList.appendChild(addToText);


    leftDiv.appendChild(resultTitle);
    leftDiv.appendChild(resultAddress);
    leftDiv.appendChild(resultRating);
    leftDiv.appendChild(resultImage);
    leftDiv.appendChild(sucks);
    leftDiv.appendChild(addToList);
    leftDiv.appendChild(good);

    var rightDiv = document.createElement('div');
    rightDiv.className = "rightResult darkYellow";

    var clusterOne = document.createElement('p');
    clusterOne.className = "clusterOne";
    clusterOne.innerHTML = phoneNum + "<br>" + restUrl + "<br>" + restDist + "<br>" + price;

    var hoursOfOpTitle = document.createElement('h3');
    hoursOfOpTitle.innerHTML = "Hours of Operation";

    var hoursOfOp = document.createElement('p');
    hoursOfOp.innerHTML = "figure out how we are going to format hours that we operate";

    var theMenu = document.createElement('div');
    theMenu.className = "menuButton yellow";
    theMenu.innerHTML = "See The Menu";



    rightDiv.appendChild(clusterOne);
    rightDiv.appendChild(hoursOfOpTitle);
    rightDiv.appendChild(hoursOfOp);
    if (hasMenu) {
        rightDiv.appendChild(theMenu);
    }


    var ratingBar = document.createElement('div');
    ratingBar.className = "ratingBar";

    var ratingBad = document.createElement('div');
    ratingBad.className = "ratingBad";

    var ratingGood = document.createElement('div');
    ratingGood.className = "ratingGood";

    ratingBar.appendChild(ratingBad);
    ratingBar.appendChild(ratingGood);

    overflow.appendChild(leftDiv);
    overflow.appendChild(rightDiv);
    overflow.appendChild(ratingBar);






    document.querySelector(".toTheRight #resultContainer").appendChild(resultCont);




}


function imageResultMarkUp(imgurl, comment, propic, starRating) {
    return ' <div class="result deepPurp"> <div class="resultsOverflow"> <div class="leftResult redPurp"> <div class="resultTitle">Shrimp</div> <div class="resultImage"> <img src="http://www.envision-creative.com/wp-content/uploads/Tiagos01.jpg"> </div> <div class="userCaption"> "Tasty as Fuck" </div> <div class="profPic"> <img src="images/profilePic-01.png"> </div> <div class="imageInfo"> <div class="userRating"> <img src="images/star.svg"> <img src="images/star.svg"> <img src="images/star.svg"> <img src="images/noStar.svg"> <img src="images/noStar.svg"> </div> <span class="userName">Jamison Ernest</span> <span class="timePosted">3 Hours Ago</span> </div> <div class="rating" rating="sucks">It Sucks</div> <div class="addToList"> <img src="images/saveToList.svg"> <div class="addText">add to list</div> </div> <div class="rating right" rating="good">Gotta Have It!</div> </div> <div class="rightResult deepPurp"> <div class="clusterTwo"> <h2>La Villa Cafe</h2> <div class="userRating"> <img src="images/star.svg"> <img src="images/star.svg"> <img src="images/star.svg"> <img src="images/noStar.svg"> <img src="images/noStar.svg"> </div> <span>read all reviews</span> </div> <p class="clusterOne"> 917-555-5151 <br/>lavillacafe.com <br/>.2 miles away <br/>$$ </p> <h3>Hours of Operation</h3> <p>S - 6am - 10pm <br/>M - 6am - 10pm <br/>T - 6am - 10pm <br/>W - 6am - 10pm <br/>Th - 6am - 10pm <br/>F - 6am - 10pm <br/>Sa - 6am - 10pm</p> <div class="menuButton redPurp">See the Menu</div> </div> <div class="ratingBar"> <div class="ratingBad"></div> <div class="ratingGood"></div> </div> </div> </div>';
}

var sideBarMarkUp = '<div id="topTitle" class="yellow"> Top Restaurants </div> <div id="topBuffer"></div>';

function topRestMarkUp(i) {

    return '<div class="topCell" number="' + i + '"> <img class="topRestImg" src="http://www.envision-creative.com/wp-content/uploads/Tiagos01.jpg"> <div class="sideHealth redPurpT"> <span class="text">Health Rating</span> <span class="rating">A</span> </div> <div class="sideName redPurpT"> <span class="sideBarName"> La Villa Cafe</span> <span class="Address"> 505 Dekalb Ave </span> <img src="images/star.svg"> <img src="images/star.svg"> <img src="images/star.svg"> <img src="images/star.svg"> <img src="images/noStar.svg"> <div class="arrowRight"> <img class="arrowImg" src="images/arrowRight.svg"> </div> </div> </div>';

}