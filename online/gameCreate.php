<?php
/**
  ** @brief Allows the user to create a new online game
	** @pre Must make a first move and must enter a valid username for the opponent in text box
	** @post Game gets created if all pre-conditions are met
	** @return None
  */
  if($_SERVER["REQUEST_METHOD"] == "POST" && isset($_COOKIE['user'])){

    include_once '../php/header.php';
    $sessionUsr = $_COOKIE["user"];
    $inviteUsr  = $_POST["user2"];
    $plyrMove3   = $_POST["move3"];
    $plyrMove9   = $_POST["move9"];

    if(strtolower($sessionUsr) == strtolower($inviteUsr)) {
      echo "<h1>Don't play with yourself..</h1>";
    }
    else {
      $check = mysqli_query($link, "SELECT * FROM GameUsers WHERE username='$inviteUsr'");
      $found = mysqli_num_rows($check);
      if($found > 0) { //Check database for existing user with the same name
        //At this point, all inputs valid.
        //Make that game!
        while($row = $check->fetch_assoc()) {
          $inviteUsr = $row["username"];
        }
        $check->close();

        if($plyrMove3 == "") {
          $boardTable = "NinesBoards";
          $moveTable = "NinesMoves";
          $plyrMove = $plyrMove9;
        }
        else {
          $boardTable = "ThreesBoards";
          $moveTable = "ThreesMoves";
          $plyrMove = $plyrMove3;
        }

        if($boardTable == "ThreesBoards") $moveTable = "ThreesMoves";
        else $moveTable = "NinesMoves";

        $nextID = mysqli_num_rows(mysqli_query($link, "SELECT * FROM $boardTable")) + 1;

        //Create row in game board table
        $queryTable = "INSERT IGNORE INTO ".$boardTable."(user1, user2) VALUES('$sessionUsr', '$inviteUsr')";
        if ($result = $link->query($queryTable)) {
          echo "<h1>New game created!</h1>";
        }

        //Create row in game move table
        $queryMove = "INSERT IGNORE INTO ".$moveTable."(gameID, isX, moveNumber, movePosition) VALUES('$nextID', '1', '1', '$plyrMove')";
        if ($result = $link->query($queryMove)) {
          echo "<h4>User ".htmlspecialchars($inviteUsr)." has received your challenge!</h4>";
        }
        //$result->close(); // free result set
        $link->close(); /*close connection */
      }
      else { //Invited user does not exist
        echo "<h1>User ".$inviteUsr." does not exist...</h1>
              <h3>Please reference the rankings in Tactics Home for active users.</h3>";
      }
    }
    echo "<a href=\"../\"><button type=\"button\" class=\"btn btn-default btn-lg\">Home</button></a>";
    echo "<a href=\"continue.php\"><button type=\"button\" class=\"btn btn-default btn-lg\">View Games</button></a>";
    include_once '../php/footer.php';
  }
  else {
    header('Location: ../');
  }
?>
