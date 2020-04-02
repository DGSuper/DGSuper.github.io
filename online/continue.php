<?php
/**
  ** @brief Continue game option for user to continue any games they have started on online mode
	** @pre user must be logged in for this feature
	** @post The games that are currently being played are displayed (both 9x9 and 3x3 games)
	** @return None
  */
if(!isset($_COOKIE['user'])) {
  header('Location: ../');
}
else {

  include_once '../php/header.php'; ?>

  <h1>Continue game:</h1>
  <h2>Your games:</h2>

  <div class="row">

  <div class="col-sm-6">
    <div class="panel-group">
      <div class="panel panel-default">
        <div class="panel-heading"><h2>Your 3x3 Matches</h2></div>
        <div class="panel-body">
          <form action="continueThrees.php" method="post">
          <?php
          $queryThrees = mysqli_query($link, "SELECT * FROM ThreesBoards WHERE (user1 = '$sessionUsr' OR user2 = '$sessionUsr') AND (winner = '')");
          $numrows = 0 + mysqli_num_rows($queryThrees);

          echo "<h3>You have ".$numrows." active 3x3 games!</h3>";
          if($numrows > 0) { //User has active games
            while($row = $queryThrees->fetch_assoc()) {
              $ID = $row["gameID"];
              $userX = $row["user1"];
              $userO = $row["user2"];

              $boardMoves = mysqli_query($link, "SELECT * FROM ThreesMoves WHERE gameID = '$ID'");

              if(strtolower($userX) == strtolower($sessionUsr)) $userX = "You"; //Just Styling stuff. Shows which player you are.
              else $userO = "you";

              echo "<div class=\"row\">
                      <div class=\"col-sm-6 challenge fll\">
                        <h4>".htmlspecialchars($userX)." (X)</h4><h5>challenged</h5><h4>".htmlspecialchars($userO)." (O)</h4>";

              $numMoves = 0 + mysqli_num_rows($boardMoves);
              $getTurn = $numMoves%2;
              if(($getTurn == 0 && $userX == "You") || ($getTurn == 1 && $userO == "you")){
                echo "<button type=\"submit\" name=\"selectGame\" value=".$ID.">Continue game</button><br>";
              }

              echo   "</div>
                      <div class=\"col-md-4 flr\">
                        <table>";

              $OMoves = array();
              $XMoves = array();
              while($move = $boardMoves->fetch_assoc()) {
                if($move["isX"] == 1) array_push($XMoves, $move["movePosition"]);
                else array_push($OMoves, $move["movePosition"]);
              }

              for($i = 0; $i < 3; $i++) {
                echo "<tr>";
                for($j = 0; $j < 3; $j++) {
                  $tile = ($i*3)+$j;

                  echo "<td class=\"board\">";
                  if (in_array($tile, $OMoves)) echo "O";
                  elseif (in_array($tile, $XMoves)) echo "X";
                  echo "</td>";
                }
                echo "</tr>";
              }

              echo     "</table>
                      </div>
                    </div><br>"; //<div class=\"continueContainer\"> </div>

              $boardMoves->close(); /*close connection */
            }
          }

          $queryThrees->close(); /*close connection */
          ?>
          </form>
        </div>
      </div>
    </div>
  </div>

  <div class="col-sm-6">
    <div class="panel-group">
      <div class="panel panel-default">
        <div class="panel-heading"><h2>Your 9x9 Matches</h2></div>
        <div class="panel-body">
          <form action="continueNines.php" method="post">

          <?php
          $queryNines = mysqli_query($link, "SELECT * FROM NinesBoards WHERE (user1 = '$sessionUsr' OR user2 = '$sessionUsr') AND (winner = '')");
          $numrows = 0 + mysqli_num_rows($queryNines);

          echo "<h3>You have ".$numrows." active 9x9 games!</h3>";

          if($numrows > 0) { //User has active games
            while($row = $queryNines->fetch_assoc()) {
              $ID = $row["gameID"];
              $userX = $row["user1"];
              $userO = $row["user2"];

              $boardMoves = mysqli_query($link, "SELECT * FROM NinesMoves WHERE gameID = '$ID'");

              if($userX == $sessionUsr) $userX = "You";
              else $userO = "you";

              echo "<div class=\"container\">
                      <div class=\"col-lg-6 challenge\">
                        <h4>".htmlspecialchars($userX)." (X)</h4><h5>challenged</h5><h4>".htmlspecialchars($userO)." (O)</h4>";

              $numMoves = 0 + mysqli_num_rows($boardMoves);
              $getTurn = $numMoves%2;
              if(($getTurn == 0 && $userX == "You") || ($getTurn == 1 && $userO == "you")){
                echo "<button type=\"submit\" name=\"selectGame\" value=".$ID.">Continue game</button>";
              }

              echo   "</div>
                      <div class=\"col-lg-6\">
                        <div id=\"outter\" class=\"outtie\">";

              $OMoves = array();
              $XMoves = array();
              while($move = $boardMoves->fetch_assoc()) {
                if($move["isX"] == 1) array_push($XMoves, $move["movePosition"]);
                else array_push($OMoves, $move["movePosition"]);
              }

              for($i = 0; $i < 3; $i++) {
                echo "<div class=\"minisnug\">";
                for($j = 0; $j<3; $j++) {
              		$k = $i*3+$j;
                  echo "<table class=\"subtable ".$k."\" cellspacing=\"0\">";

                  for($m = 0; $m < 3; $m++) {
                    echo "<tr>";
                    for($n = 0; $n < 3; $n++) {
                      $tile = ($k*9)+($m*3)+$n;

                      echo "<td class=\"miniboard\">";
                      if (in_array($tile, $OMoves)) echo "O";
                      elseif (in_array($tile, $XMoves)) echo "X";
                      echo "</td>";
                    }
                    echo "</tr>";
                  }
                  echo "</table>";
                }
                echo "</div>";
              }
              echo     "</div>
                      </div>
                    </div><br>";

              $boardMoves->close(); /*close connection */
            }
          }

          $queryNines->close(); /*close connection */
          ?>
          </form>
        </div>
      </div>
    </div>
  </div>

  </div>

<?php include_once '../php/footer.php'; } ?>
