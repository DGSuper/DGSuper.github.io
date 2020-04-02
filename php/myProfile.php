<?php
/**
  ** @brief Shows a particular users profile
	** @pre successful connection to database
	** @post none
	** @return none
  */
  if(isset($_COOKIE['user'])) {
    include_once 'header.php';

    $query = mysqli_query($link, "SELECT * FROM Profiles WHERE username='$sessionUsr'");
    $profile = $link->query($query);

    if(mysqli_num_rows($query) == 1) { //User exists
      $row = $query->fetch_assoc();
      $username = "".$row["username"];

      $winsThree = 0+$row["wins"];
      $drawsThree = 0+$row["draws"];
      $lossesThree = $row["losses"];

      $winsNine = 0+$row["nineWins"];
      $drawsNine = 0+$row["nineDraws"];
      $lossesNine = 0+$row["nineLosses"];

      $points = 30*$winsNine + 10*$drawsNine + 3*$winsThree + $drawsThree;
    ?>

      <h1>Profile for <?php echo htmlspecialchars($sessionUsr); ?></h1>
        <div class="row">
          <div class="col-sm-6">
            <div class="panel-group">
              <div class="panel panel-default">
                <div class="panel-heading">
                  <h2>Your 3x3 Board Stats:</h2>
                </div>
                <div class="panel-body">
                  <h3>Wins: <?php echo $winsThree; ?></h3>
                  <h3>Draws: <?php echo $drawsThree; ?></h3>
                  <h3>Losses: <?php echo $lossesThree; ?></h3>
                </div>
              </div>
            </div>
          </div>

          <div class="col-sm-6">
            <div class="panel-group">
              <div class="panel panel-default">
                <div class="panel-heading">
                  <h2>Your 9x9 Board Stats:</h2>
                </div>
                <div class="panel-body">
                  <h3>Wins: <?php echo $winsNine; ?></h3>
                  <h3>Draws: <?php echo $drawsNine; ?></h3>
                  <h3>Losses: <?php echo $lossesNine; ?></h3>
                </div>
              </div>
            </div>
          </div>
        </div>

    <?php

      $link->close();
    }
    else {
      echo "<h3>Internal database error: cannot locate user $sessionUsr....</h3>";
    }
    echo "<a href=\"../\"><button type=\"button\" class=\"btn btn-default btn-lg\">Return Home</button></a>";

    include_once 'footer.php';
  }
  else {
    header('Location: ../');
  }
?>
