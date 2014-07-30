<?php  
ob_start();  

include_once("check_session.php") ;
if($user_is_logged != true){
    $redirect_page = "index.php";
    //echo "<script>alert('session exist');</script>";
    header('Location: '.$redirect_page);
    exit();
}
ob_end_flush();
?>
<html>

<head>

    <meta name="viewport" content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, width=device-width">
    <link href='http://fonts.googleapis.com/css?family=Comfortaa:400,700|Crimson+Text:400,700,600' rel='stylesheet' type='text/css'>
    <link href="styleSheets/style.css" rel="stylesheet" type="text/css">
    <link href="styleSheets/settings.css" rel="stylesheet" type="text/css">
    <link href="styleSheets/jquery-ui.min.css" rel="stylesheet" type="text/css">
    <link href="styleSheets/settings.css" rel="stylesheet" type="text/css">
    <link href="styleSheets/search.css" rel="stylesheet" type="text/css">

    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>

    <script src="scripts/touchSwipe.js"></script>
    <script src="scripts/jquery-ui.min.js"></script>
    <script src="scripts/touchPunch.js"></script>
    <script src="scripts/settings.js"></script>



    <title>FUSCHE: Fun Shit</title>
</head>


<body>
    <div id="fb-root"></div>
    <script>
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&appId=270162006502647&version=v2.0";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    </script>
    <div id="cameraUpload">
        <a href="#loginBox">
            <img src="images/cameraUpload.svg">
        </a>
    </div>
    <div id="topNav">
        <div id="logo">
            <div id="logoimg">
                <img src="images/logo.svg">
            </div>
            <span>Fusche</span>

        </div>
        <div id="nav" class="deepPurp">
            <div class="navIcons redPurp selected">
                <img src="images/images_foodIcon.svg">
                <p class="navTitles yellow">Food</p>
            </div>
            <div class="navIcons red">
                <img src="images/images_drinkIcon.svg">
                <p class="navTitles yellow">Drink</p>
            </div>
            <div class="navIcons orange">
                <img src="images/images_entertainmentIcon.svg">
                <p class="navTitles yellow text100">Entertainment</p>
            </div>
            <div class="navIcons yellow">
                <img src="images/images_shoppingIcon.svg">
                <p class="navTitles yellow">Shopping</p>
            </div>
        </div>

        <div id="mobileMenu">
            <img id="menuButton" src="images/mobileMenu-01.svg">
        </div>
    </div>

    <div id="container">




        <div id="mainArea">
            <div id="sidebar">
                <div id="topTitle" class="yellow">
                    Top Restaurants
                </div>
                <div id="topBuffer"></div>
                <div class="topCell" number="0">
                    <img class="topRestImg" src="http://www.envision-creative.com/wp-content/uploads/Tiagos01.jpg">
                    <div class="sideHealth redPurpT">
                        <span class="text">Health Rating</span>
                        <span class="rating">A</span>
                    </div>
                    <div class="sideName redPurpT">
                        <span class="sideBarName">
                    La Villa Cafe</span>
                        <span class="Address">
                    505 Dekalb Ave
                </span>
                        <img src="images/star.svg">
                        <img src="images/star.svg">
                        <img src="images/star.svg">
                        <img src="images/star.svg">
                        <img src="images/noStar.svg">
                        <div class="arrowRight">
                            <img class="arrowImg" src="images/arrowRight.svg">

                        </div>
                    </div>
                </div>

                <div class="topCell" number="1">
                    <img class="topRestImg" src="http://www.envision-creative.com/wp-content/uploads/Tiagos01.jpg">
                    <div class="sideHealth redPurpT">
                        <span class="text">Health Rating</span>
                        <span class="rating">A</span>
                    </div>
                    <div class="sideName redPurpT">
                        <span class="sideBarName">
                    Luigi's Pizza
                        </span>
                        <span class="Address">
                    1045 Dekalb Ave
                </span>
                        <img src="images/star.svg">
                        <img src="images/star.svg">
                        <img src="images/star.svg">
                        <img src="images/noStar.svg">
                        <img src="images/noStar.svg">
                        <div class="arrowRight">
                            <img class="arrowImg" src="images/arrowRight.svg">

                        </div>
                    </div>
                </div>

                <div class="topCell" number="2">
                    <img class="topRestImg" src="http://www.cityofdarienga.com/visitorguide/ShrimpDish494.jpg">
                    <div class="sideHealth redPurpT">
                        <span class="text">Health Rating</span>
                        <span class="rating">D</span>
                    </div>
                    <div class="sideName redPurpT">
                        <span class="sideBarName">
                    Crown Fried Chicken</span>
                        <span class="Address">
                    703 Dekalb Ave
                </span>
                        <img src="images/star.svg">
                        <img src="images/star.svg">
                        <img src="images/star.svg">
                        <img src="images/star.svg">
                        <img src="images/star.svg">

                        <div class="arrowRight">
                            <img class="arrowImg" src="images/arrowRight.svg">

                        </div>
                    </div>
                </div>

                <div class="topCell" number="3">
                    <img class="topRestImg" src="http://www.envision-creative.com/wp-content/uploads/Tiagos01.jpg">
                    <div class="sideHealth redPurpT">
                        <span class="text">Health Rating</span>
                        <span class="rating">B</span>
                    </div>
                    <div class="sideName redPurpT">
                        <span class="sideBarName">
                    Punta Cana</span>
                        <span class="Address">
                    507 Dekalb Ave
                </span>
                        <img src="images/star.svg">
                        <img src="images/star.svg">
                        <img src="images/noStar.svg">
                        <img src="images/noStar.svg">
                        <img src="images/noStar.svg">
                        <div class="arrowRight">
                            <img class="arrowImg" src="images/arrowRight.svg">

                        </div>
                    </div>
                </div>

                <div class="topCell" number="4">
                    <img class="topRestImg" src="http://www.envision-creative.com/wp-content/uploads/Tiagos01.jpg">
                    <div class="sideHealth redPurpT">
                        <span class="text">Health Rating</span>
                        <span class="rating">A</span>
                    </div>
                    <div class="sideName redPurpT">
                        <span class="sideBarName">
                    La Villa Cafe</span>
                        <span class="Address">
                    505 Dekalb Ave
                </span>
                        <img src="images/star.svg">
                        <img src="images/star.svg">
                        <img src="images/star.svg">
                        <img src="images/star.svg">
                        <img src="images/noStar.svg">
                        <div class="arrowRight">
                            <img class="arrowImg" src="images/arrowRight.svg">

                        </div>
                    </div>
                </div>

                <div class="topCell" number="5">
                    <img class="topRestImg" src="http://www.kremslehnerhotels.at/files/cms/sized/files/restaurants-vienna/roth/menu-food/food-restaurant-roth-vienna-03-1500x755.jpg">
                    <div class="sideHealth redPurpT">
                        <span class="text">Health Rating</span>
                        <span class="rating">A</span>
                    </div>
                    <div class="sideName redPurpT">
                        <span class="sideBarName">
                    Luigi's Pizza
                        </span>
                        <span class="Address">
                    1045 Dekalb Ave
                </span>
                        <img src="images/star.svg">
                        <img src="images/star.svg">
                        <img src="images/star.svg">
                        <img src="images/noStar.svg">
                        <img src="images/noStar.svg">
                        <div class="arrowRight">
                            <img class="arrowImg" src="images/arrowRight.svg">

                        </div>
                    </div>
                </div>

                <div class="topCell" number="6">
                    <img class="topRestImg" src="http://www.cityofdarienga.com/visitorguide/ShrimpDish494.jpg">
                    <div class="sideHealth redPurpT">
                        <span class="text">Health Rating</span>
                        <span class="rating">D</span>
                    </div>
                    <div class="sideName redPurpT">
                        <span class="sideBarName">
                    Crown Fried Chicken</span>
                        <span class="Address">
                    703 Dekalb Ave
                </span>
                        <img src="images/star.svg">
                        <img src="images/star.svg">
                        <img src="images/star.svg">
                        <img src="images/star.svg">
                        <img src="images/star.svg">

                        <div class="arrowRight">
                            <img class="arrowImg" src="images/arrowRight.svg">

                        </div>
                    </div>
                </div>








            </div>
            <div class="content">

                <div id="welcome">
                    <div class="third">
                        <img id="welcomeImg" src="images/profilePic-01.png">
                        <img id="profileMask" src="images/profileMask.svg">
                        <div id="profileChange">Change your profile picture.</div>

                    </div>
                    <div class="twoThirds">
                        <h2>Welcome, Anoop!</h2>
                        <form>
                            <textarea id="textarea" class="bio deepPurp" placeholder="Tell us a little something about yourself!!! (in 200 characters or less)"></textarea>

                        </form>

                    </div>

                </div>

                <div id="settingSelector">
                    <h3>Set some preferences</h3>

                    <div class="setter">

                        <div class="options">
                            <div class="third health" number="0">A</div>
                            <div class="third middleOption health" number="1">B</div>
                            <div class="third lastOption health" number="2">C</div>
                        </div>

                        <div id="healthSlider"></div>
                        <h4>Minimum Health Rating</h4> 
                    </div>


                    <div class="setter">

                        <div class="options">
                            <div class="third price" number="0">$</div>
                            <div class="third middleOption price" number="1">$$</div>
                            <div class="third lastOption price" number="2">$$$</div>
                        </div>
                        <div id="priceSlider"></div>
                        <h4>Price Range</h4>
                    </div>

                    <div class="setter">

                        <div class="options">
                            <div class="third distance" id="distOne">5 mi</div>

                            <div class="third lastOption distance" id="distTwo" style="margin-left: 33%">50 mi</div>
                        </div>
                        <div id="distanceSlider"></div>
                        <h4>Maximum Distance</h4>
                    </div>


                    <form id="signUpForm" action="FILL THIS IN ANOOP!!!!!" method="post">

                        <input type="text" name="bio" id="bio">
                        <input type="text" name="health" id="health">
                        <input type="text" name="price" id="price">
                        <input type="text" name="distance" id="distance">

                        <button name="submit" type="submit" class="next yellow">These are the settings I want! Let's go!!</div>
                </form>

            </div>

        </div>

    </div>

    <div id="footer" class="darkText">
        <span>Help</span>
        <span>Contact</span>
        <span>About</span>
        <span>Learn More</span>
    </div>

    </div>


    <!-- Place this asynchronous JavaScript just before your </body> tag -->
    <script type="text/javascript">
        (function () {
            var po = document.createElement('script');
            po.type = 'text/javascript';
            po.async = true;
            po.src = 'https://apis.google.com/js/client:plusone.js';
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(po, s);
        })();
    </script>


</body>


</html>

