<?php
/**
  ** @brief Help for the bots to populate the HTML
	** @pre none
	** @post HTML gets populated
	** @return None
  */
function echoThrees($difficulty) {
  echo "<h1>TRADITIONAL Tic-Tac-Toe: <u>".$difficulty."</u> difficulty!</h1>
        <div class=\"tableContainer\">
          <table cellspacing=\"0\">";

  for($i = 0; $i<3; $i++) {
    echo "<tr>";
    for($j = 0; $j<3; $j++) {
      echo "<td class=\"board\"></td>";
    }
    echo    "</tr>";
  }
  echo     "</table>
          </div>
          <br>";

  addSocial();

  echo    "<a href=\"../\"><button type=\"button\" class=\"btn btn-default btn-lg\">Return Home</button></a>";
  addNewGameMenu();
   echo  "</div>
      </body>".
      "<script type=\"text/javascript\" src=\"../js/pageState.js\"></script>".
      "<script type=\"text/javascript\" src=\"../js/ThreesClass.js\"></script>";
}

function echoNines($difficulty) {
  echo "<h1>EXTREME Tic-Tac-Toe: ".$difficulty." difficulty!</h1>
        <div class=\"tableContainer\">
          <table id=\"outter\" class=\"outter\" cellspacing=\"0\">";

  for($i = 0; $i < 3; $i++) {
    echo "<tr class=\"snug\">";
    for($j = 0; $j < 3; $j++) {
      $k = $i*3 + $j;
      echo "<th><table class=\"subtable ".$k."\" cellspacing=\"0\"></table></th>";
    }
    echo "</tr>";
  }

  echo      "</table>
          </div>
          <br>";

  //addSocial();

  echo    "<a href=\"../\"><button type=\"button\" class=\"btn btn-default btn-lg\">Return Home</button></a>";
  addNewGameMenu();
  echo  "</div>
      </body>".
      "<script type=\"text/javascript\" src=\"../js/9by9PageState.js\"></script>".
      "<script type=\"text/javascript\" src=\"../js/nineByNine.js\"></script>";
}

function addNewGameMenu() {
  ?>
  <div class="container">
    <div class="col-xl-2">
      <br>
      <div class="panel-group">
        <div class="panel panel-default">
          <div class="panel-heading"><h2>Play Another Bot Game!</h2></div>
          <div class="panel-body">
            <form action="botGame.php" method="post">
              <button name="type" value = "3e" class="btn btn-default btn-lg">3 x 3 Easy</button>
              <button name="type" value = "9e" class="btn btn-default btn-lg">9 x 9 Easy</button>
              <br>
              <button name="type" value = "3m" class="btn btn-default btn-lg">3 x 3 Medium</button>
              <button name="type" value = "9m" class="btn btn-default btn-lg">9 x 9 Medium</button>
              <br>
              <button name="type" value = "3h" class="btn btn-default btn-lg">3 x 3 Hard</button>
              <button name="type" value = "9h" class="btn btn-default btn-lg">9 x 9 Hard</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

  <?php
}

function addSocial() {
  echo   "<div id=\"fb-root\"></div>
          <script>(function(d, s, id) {

            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = \"//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.3\";
            fjs.parentNode.insertBefore(js, fjs);
          }(document, 'script', 'facebook-jssdk'));</script>";
}

  function addTwitter() {
    echo  "<iframe
              src=\"https://platform.twitter.com/widgets/tweet_button.html?size=l&url=https%3A%2F%2F&via=twitterdev&related=twitterapi%2Ctwitter&text=Playing%20Tactics!%20&hashtags=TwitterAPI%2Ctactics%2C\"
              height=\"50\"
              title=\"Twitter Tweet Button\"
              style=\"border: 0; overflow: hidden;\"
              id=\"myTwitter\">
            </iframe>";

  }

  function addFacebook() {
    echo "<iframe id=\"myFacebook\" src=\"https://www.facebook.com/plugins/share_button.php?href=https%3A%2F%2Fpeople.eecs.ku.edu%2F~k742b154%2FTactics%2F&layout=button&size=small&mobile_iframe=true&width=59&height=20&appId\" width=\"65\" height=\"20\" style=\"border:none;overflow:hidden\" scrolling=\"no\" frameborder=\"0\" allowTransparency=\"true\" allow=\"encrypted-media\"
            style=\"padding: 0;\"></iframe>";
  }

 ?>
