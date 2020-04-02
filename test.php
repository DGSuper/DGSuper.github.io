<?php
/**
  ** @brief Checks the database to make sure X moves are odd numbered moves and O moves are even moves
	** @pre none
	** @post Echoes errors if needed
	** @return None
  */
include_once 'php/config.php';
include_once 'php/header.php';

//Initial test to check for faulty moves in the database
  $checkOdd = mysqli_query($link, "SELECT * FROM ThreesMoves WHERE isX = '1'");
  $checkEvn = mysqli_query($link, "SELECT * FROM ThreesMoves WHERE isX = '0'");

  echo "<h1>Database Validation: Errors will be marked with \"ERROR - 'Descrition'\"</h1>";
  echo "<h3>Running check for errors in all odd-valued 3x3 moves <br>...</h3>";
  while($row = $checkOdd->fetch_assoc()) {
    $value = (int)$row["moveNumber"];
    $ID = $row['gameID'];
    if($value%2 != 1) {
      echo "<p>ERROR - Poorly placed move in three's board ".$ID." in move number ".$row['moveNumber']." at position ".$row['movePosition']."</p>";
    }
  }
  echo "<h4>Done</h4>";
  $checkOdd->close();

  echo "<h3>Running check for errors in even-valued 3x3 moves <br>...</h3>";
  while($row2 = $checkEvn->fetch_assoc()) {
    if($row2["moveNumber"]%2 != 0) {
      echo "ERROR - Poorly placed move in three's board ".$row2['gameID']." in move number ".$row2['moveNumber']." at position ".$row2['movePosition'];
    }
  }
  echo "<h4>Done</h4>";
  $checkEvn->close();

  $checkOdd = mysqli_query($link, "SELECT * FROM NinesMoves WHERE isX = '1'");
  $checkEvn = mysqli_query($link, "SELECT * FROM NinesMoves WHERE isX = '0'");

  echo "<h3>Running check for errors in odd-valued 9x9 moves <br>...</h3>";
  while($row = $checkOdd->fetch_assoc()) {
    if($row['moveNumber']%2 != 1) {
      echo "<p>ERROR - Poorly placed move in nine's board ".$row['gameID']." in move number ".$row['moveNumber']." at position ".$row['movePosition']."</p>";
    }
  }
  echo "<h4>Done</h4>";
  $checkOdd->close();

  echo "<h3>Running check for errors in even-valued 9x9 moves <br>...</h3>";
  while($row2 = $checkEvn->fetch_assoc()) {
    if($row2['moveNumber']%2 != 0) {
      echo "ERROR - Poorly placed move in nine's board ".$row2['gameID']." in move number ".$row2['moveNumber']." at position ".$row2['movePosition'];
    }
  }
  echo "<h4>Done</h4>";
  $checkEvn->close();

echo "<h1>DB Check complete. For errors, please reference Database.</h1>";

include_once 'php/footer.php';
?>
