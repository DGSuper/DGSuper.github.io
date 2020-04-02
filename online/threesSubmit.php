<?php

/**
  ** @brief Validates and submits move to the database
	** @pre none
	** @post database is updated with the new move's information
	** @return None
  */
if($_SERVER["REQUEST_METHOD"] == "POST" && isset($_COOKIE['user'])){
  include_once '../php/header.php';

  $gameID = $_POST['gameID'];
  $gameState = $_POST['gameState'];
  $moveNum = $_POST['move3'];

  $moves = mysqli_query($link, "SELECT * FROM ThreesMoves WHERE gameID = '$gameID'");
  $numMoves = mysqli_num_rows($moves);
  $thisMove = $numMoves+1;

  //Determine turn
  if($thisMove%2 == 0) $isX = 0;
  else $isX = 1;

  //determine game standing of each user
  $currGame = mysqli_query($link, "SELECT * FROM ThreesBoards WHERE gameID = '$gameID'");
  while($row = $currGame->fetch_assoc()) {
    $userX = $row["user1"];
    $userO = $row["user2"];
  }
  if(strtolower($userX) == strtolower($sessionUsr)) $opponent = $userO;
  else $opponent = $userX;

  if($gameState == $numMoves || $gameState == 'X' || $gameState == 'O' || $gameState == 'A') { //Check if a user tried to make another move
    //Place move//////////////////
    $queryMove = "INSERT IGNORE INTO ThreesMoves(gameID, isX, moveNumber, movePosition) VALUES('$gameID', '$isX', '$thisMove', '$moveNum')";
    if ($link->query($queryMove) === TRUE) {
      echo "<h3>Your move has been placed!</h3>";
    }
    else {
      echo "Error updating record: ".$link->error;
    }
    //Finish place move//////////////////

    if($gameState == 'X' || $gameState == 'O') {
      //Session user won!
      if(($gameState == 'X' && strtolower($userX) == strtolower($sessionUsr)) || ($gameState == 'O' && strtolower($userO) == strtolower($sessionUsr))) {
        //Case where current user won the game
        echo "<h1>CONGRATULATIONS! You Won!</h1>
              <h3>You have been awarded 3 points!</h3>";
      }
      else {
        //Current user somehow ... lost the game...
        echo "<h1>CONGRATULATIONS! You ... LOST???</h1>
              <h3>You have STILL been awarded 3 points! A for effort!</h3>";
      }

      //Give wins and losses to players
      $winner = "UPDATE Profiles SET wins = wins + 1 WHERE username = '$sessionUsr'";
      $loser  = "UPDATE Profiles SET losses = losses + 1 WHERE username = '$opponent'";
      $board  = "UPDATE ThreesBoards SET winner = '$sessionUsr' WHERE gameID = '$gameID'";

      if ($link->query($winner) === TRUE  && $link->query($loser) === TRUE && $link->query($board) === TRUE) {
        echo "<a href=\"../\"><button type=\"button\" class=\"btn btn-default btn-lg\">Home</button></a>";
      }
      else {
        echo "Error updating record: " . $link->error;
      }
    }
    elseif ($gameState == "A") {
      //Catscratch game!
      echo "<h1>Game tie!</h1>
            <h3>You and user ".$opponent." will receive 1 point!</h3>";

      //change each players profile to reflect tie
      $player = "UPDATE Profiles SET draws = draws + 1 WHERE username = '$sessionUsr'";
      $other  = "UPDATE Profiles SET draws = draws + 1 WHERE username = '$opponent'";
      $board  = "UPDATE ThreesBoards SET winner = 'TIE' WHERE gameID = '$gameID'";

      if ($link->query($player) === TRUE  && $link->query($other) === TRUE && $link->query($board) === TRUE) {
        echo "<a href=\"continue.php\"><button type=\"button\" class=\"btn btn-default btn-lg\">View Games</button></a>";
        echo "<a href=\"../\"><button type=\"button\" class=\"btn btn-default btn-lg\">Home</button></a>";
      }
      else {
        echo "Error updating record: " . $link->error;
      }
    }
    else {
      //Game continues
      echo "<a href=\"../\"><button type=\"button\" class=\"btn btn-default btn-lg\">Home</button></a>";
      echo "<a href=\"continue.php\"><button type=\"button\" class=\"btn btn-default btn-lg\">View Games</button></a>";
    }
  }
  else {
    echo  "<h6>Think you're slick, huh...?</h6>".
          "<h6>Well... I appreciate your commitment to security...</h6>".
          "<h6>Now get outta here, I've got half a mind to log your account for misconduct...</h6>".
          "<a href=\"../\"><button type=\"button\" class=\"btn btn-default btn-lg\">Home</button></a>";
  }
  include_once '../php/footer.php';

  $moves->close(); /* close connection */
}
else {
  header('Location: ../');
}
?>
