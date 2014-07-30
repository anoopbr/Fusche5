<?php  
ob_start();  

include_once("check_session.php") ;
if($user_is_logged == true){
    if($_SESSION['preference'] == "Authenticated"){
        $redirect_page = "search.php";
    }else{
        $redirect_page = "settings.php";
    }
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
    <link href="styleSheets/jquery-ui.min.css" rel="stylesheet" type="text/css">
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script src="scripts/fitText.js"></script>
    <script src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.13.0/jquery.validate.min.js"></script>
    <script src="scripts/touchSwipe.js"></script>
    <script src="scripts/login.js"></script>

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

<div class="topCell" number="2">
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

<div class="topCell" number="3">
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
                    </div></div>

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






            </div>
            <div class="content">





                <div id="loginBox" class="yellow">
                    <h2>Login To Fusche</h2> 
                    <h6>Register</h6>
                    <form id="loginForm" method="post" action="response.php" class="login-form" accept-charset="utf-8">
                        <p class="the-return"></p>
                        <p>
                            <input type="text" id="email" name="user_email" value="" placeholder="Email">
                        </p>
                        <p>
                            <input class="password" id="password" type="password" name="user_pwd" value="" placeholder="Password">

                        </p>
                        <p class="submit">
                            <label>
                                <input type="submit" name="commit" value="Login">
                                <img src="images/arrowRight.svg">
                            </label>
                        </p>
                    </form>


                    <form id="registrationForm" method="post" action="response.php" class="register-form" accept-charset="utf-8">
                        <p class="the-return"></p>
                        <p>
                            <input type="text" id="name" name="user_name" value="" placeholder="Name">
                        </p>
                        <p>
                            <input type="text" id="email" name="user_email" value="" placeholder="Email">
                        </p>

                        <p>
                            <input type="password" id="passwordTwo" name="user_pwd2" value="" placeholder="Password">
                        </p>
                        <p>
                            <input class="password" id="password" type="password" name="user_pwd" value="" placeholder="Password">

                        </p>

                        <p class="submit">
                            <label>
                                <input type="submit" name="commit" value="Login">
                                <img src="images/arrowRight.svg">
                            </label>
                        </p>
                    </form>
                    <div class="fb-login-button" data-size="large" data-show-faces="false" data-auto-logout-link="false"></div>

                    <span id="signinButton">
                      <span
                        class="g-signin"
                        data-callback="signinCallback"
                        data-clientid="230127452579-duehgclgma2pmt59ae1c59vtr9odh8ep.apps.googleusercontent.com"
                        data-cookiepolicy="single_host_origin"
                        data-requestvisibleactions="http://schema.org/AddAction"
                        data-scope="https://www.googleapis.com/auth/plus.login">
                      </span>
                    </span>

                </div>


                <div id="slider">

                    <div class="slide visibleSlide deepPurp">
                        <p>This is where a slider will go that will explain what Fusche is and how it works. Maybe There will be a video???? Who Knows</p>

                        <ul>
                            <li>Order Some Food</li>
                            <li>Share some dishes</li>
                            <li>Connect With friends</li>
                            <li>Have Some Fun</li>
                        </ul>

                    </div>


                    <div class="slide"></div>
                    <div class="slide"></div>
                    <div class="slide"></div>


                    <div id="slideSelector">
                        <div class="circle deepPurp"></div>
                        <div class="circle redPurp"></div>
                        <div class="circle orange"></div>
                        <div class="circle red"></div>
                        <div class="circle yellow"></div>
                        <div class="circle deepPurp"></div>
                    </div>



                </div>







                <div id="resultContainer">

                    <div class="result darkYellow">
                        <div class="resultsOverflow ">
                            <div class="swipeIndicator">
                                <img src="images/arrowRight.svg">

                            </div>
                            <div class="leftResult yellow">
                                <div class="resultTitle">La Villa Cafe</div>
                                <div class="resultAddress">501 Dekalb Ave</div>

                                <div class="resultRating">
                                    <img src="images/star.svg">
                                    <img src="images/star.svg">
                                    <img src="images/star.svg">
                                    <img src="images/noStar.svg">
                                    <img src="images/noStar.svg">
                                </div>
                                <div class="resultImage">
                                    <img src="http://www.envision-creative.com/wp-content/uploads/Tiagos01.jpg">
                                </div>

                                <div class="rating" rating="sucks">It Sucks</div>
                                <div class="addToList">
                                    <img src="images/saveToList.svg">
                                </div>
                                <div class="rating" rating="good">Gotta Have It!</div>



                            </div>

                            <div class="rightResult darkYellow">
                                <p class="clusterOne">
                                    917-555-5151
                                    <br/>lavillacafe.com
                                    <br/>.2 miles away
                                    <br/>$$
                                </p>
                                <h3>Hours of Operation</h3>
                                <p>S - 6am - 10pm
                                    <br/>M - 6am - 10pm
                                    <br/>T - 6am - 10pm
                                    <br/>W - 6am - 10pm
                                    <br/>Th - 6am - 10pm
                                    <br/>F - 6am - 10pm
                                    <br/>Sa - 6am - 10pm</p>
                                <div class="menuButton yellow">See the Menu</div>

                            </div>
                            <div class="ratingBar">
                                <div class="ratingBad"></div>
                                <div class="ratingGood"></div>
                            </div>

                        </div>
                    </div>



                    <div class="result deepPurp">
                        <div class="resultsOverflow">
                            <div class="leftResult redPurp">
                                <div class="resultTitle">Shrimp</div>

                                <div class="resultImage">
                                    <img src="http://www.envision-creative.com/wp-content/uploads/Tiagos01.jpg">
                                </div>
                                <div class="userCaption">
                                    "Tasty as Fuck"
                                </div>
                                <div class="profPic">
                                    <img src="images/profilePic-01.png">
                                </div>
                                <div class="imageInfo">
                                    <div class="userRating">
                                        <img src="images/star.svg">
                                        <img src="images/star.svg">
                                        <img src="images/star.svg">
                                        <img src="images/noStar.svg">
                                        <img src="images/noStar.svg">
                                    </div>
                                    <span class="userName">Jamison Ernest</span>
                                    <span class="timePosted">3 Hours Ago</span>

                                </div>

                                <div class="rating" rating="sucks">It Sucks</div>
                                <div class="addToList">
                                    <img src="images/saveToList.svg">
                                </div>
                                <div class="rating" rating="good">Gotta Have It!</div>



                            </div>

                            <div class="rightResult deepPurp">
                                <div class="clusterTwo">
                                    <h2>La Villa Cafe</h2>
                                    <div class="userRating">
                                        <img src="images/star.svg">
                                        <img src="images/star.svg">
                                        <img src="images/star.svg">
                                        <img src="images/noStar.svg">
                                        <img src="images/noStar.svg">
                                    </div>
                                    <span>read all reviews</span>
                                </div>
                                <p class="clusterOne">
                                    917-555-5151
                                    <br/>lavillacafe.com
                                    <br/>.2 miles away
                                    <br/>$$
                                </p>
                                <h3>Hours of Operation</h3>
                                <p>S - 6am - 10pm
                                    <br/>M - 6am - 10pm
                                    <br/>T - 6am - 10pm
                                    <br/>W - 6am - 10pm
                                    <br/>Th - 6am - 10pm
                                    <br/>F - 6am - 10pm
                                    <br/>Sa - 6am - 10pm</p>
                                <div class="menuButton redPurp">See the Menu</div>

                            </div>
                            <div class="ratingBar">
                                <div class="ratingBad"></div>
                                <div class="ratingGood"></div>
                            </div>

                        </div>
                    </div>









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

