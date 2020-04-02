<?php
/**
  ** @brief Validates and submits the move made on a 9x9 board
	** @pre none
	** @post Move is added to the database
	** @return None
  */
if($_SERVER["REQUEST_METHOD"] == "POST" && isset($_COOKIE['user'])){
  include_once '../php/header.php';

  $gameID = $_POST['gameID'];
  $moveNum = $_POST['move9'];
  $winner = $_POST['submit'];
  $pastMoves = $_POST['past'];

  $miscreantMessage = "<h6>By golly, I sure hope you ain't fixin'uh loose my goose here, pardah...</h6><a href=\"../\"><button type=\"button\" class=\"btn btn-default btn-lg\">Home</button></a>";

  //Check Input//////////////////
  $moves = mysqli_query($link, "SELECT * FROM NinesMoves WHERE gameID = '$gameID' ORDER BY movePosition");
  $numMoves = mysqli_num_rows($moves);

  $count = 0;
  $problemo = false;

  if($moveNum < 0 || $moveNum > 80) $problemo = true;

  while($row = $moves->fetch_assoc()) {
    if($pastMoves[$count] != $row["moveNumber"]) $problemo = true;
    elseif ($moveNum == $row["movePosition"]) $problemo = true;
    $count++;
  }

  if($problemo) echo  $miscreantMessage;
  else { //Input is valid

    $thisMove = $numMoves+1;
    if($thisMove%2 == 0) $isX = 0;
    else $isX = 1;

    $checkSides = mysqli_query($link, "SELECT * FROM NinesBoards WHERE gameID = '$gameID'");
    while($row = $checkSides->fetch_assoc()) {
      $userX = $row["user1"];
      $userO = $row["user2"];
    }

    if(strtolower($userX) == strtolower($sessionUsr)) $opponent = $userO;
    else $opponent = $userX;

    if(($numMoves%2 == 0 && strtolower($sessionUsr) == strtolower($userX)) || ($numMoves%2 == 1 && strtolower($sessionUsr) == strtolower($userO))) {

      $queryMove = "INSERT IGNORE INTO NinesMoves(gameID, isX, moveNumber, movePosition) VALUES('$gameID', '$isX', '$thisMove', '$moveNum')";
      if ($link->query($queryMove) === TRUE) {
        echo  "<h1>Your move has been placed!</h1>";
      }
      else {
        echo "Error updating record: " . $link->error;
      }
      //Finish place move//////////////////

      if($winner == 'X' || $winner == 'O' ) {
        if(($winner == 'X' && strtolower($userX) == strtolower($sessionUsr)) || ($winner == 'O' && strtolower($userO) == strtolower($sessionUsr))) {
          //Case where current user won the game
          echo "<h1>CONGRATULATIONS! You Won!</h1>
                <h3>You have been awarded 30 points!</h3>";

          $winner = "UPDATE Profiles SET nineWins = nineWins + 1 WHERE username = '$sessionUsr'";
          $loser  = "UPDATE Profiles SET nineLosses = nineLosses + 1 WHERE username = '$opponent'";
          $board  = "UPDATE NinesBoards SET winner = '$sessionUsr' WHERE gameID = '$gameID'";
        }
        else {
          //Current user somehow ... lost the game...
          echo "<h1>CONGRATULATIONS! You ... LOST??? Man how'd you miss that one pal?</h1>
                <h3>Your opponent has been awarded 30 points! A+ for effort!</h3>";

          $winner = "UPDATE Profiles SET nineWins = nineWins + 1 WHERE username = '$opponent'";
          $loser  = "UPDATE Profiles SET nineLosses = nineLosses + 1 WHERE username = '$sessionUsr'";
          $board  = "UPDATE NinesBoards SET winner = '$opponent' WHERE gameID = '$gameID'";
        }

        //Give wins and losses to players
        if ($link->query($winner) === TRUE  && $link->query($loser) === TRUE && $link->query($board) === TRUE) {
          echo "<a href=\"../\"><button type=\"button\" class=\"btn btn-default btn-lg\">Home</button></a>";
        }
        else {
          echo "Error updating record: " . $link->error;
        }
      }
      elseif ($winner == "A") {
        //Catscratch game!
        echo "<h1>Game tie!</h1>
              <h3>Both players get 10 points!</h3>";

        //change each players profile to reflect tie
        $player = "UPDATE Profiles SET nineDraws = nineDraws + 1 WHERE username = '$userO'";
        $other  = "UPDATE Profiles SET nineDraws = nineDraws + 1 WHERE username = '$userX'";
        $board  = "UPDATE NinesBoards SET winner = 'TIE' WHERE gameID = '$gameID'";

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
    else echo $miscreantMessage;
  }

  include_once '../php/footer.php';

  $moves->close(); /*close connection */
}
else {
  header('Location: ../');
}
?>
