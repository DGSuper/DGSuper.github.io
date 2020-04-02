<?php
/**
  ** @brief Allows the user to continue a 3x3 game
	** @pre An online 3x3 game between two users has to exist
	** @post Displays the page after "Continue game" to make their next move on a 3x3 online game with another user
	** @return None
  */
  if($_SERVER["REQUEST_METHOD"] == "POST" && isset($_COOKIE['user'])){
    include_once '../php/header.php';
    $gameID = $_POST['selectGame'];

    $currGame = mysqli_query($link, "SELECT * FROM ThreesBoards WHERE gameID = '$gameID'");
    while($row = $currGame->fetch_assoc()) {
      $userX = $row["user1"];
      $userO = $row["user2"];
    }

    $opponent = ($userX == $sessionUsr ? $userO : $userX);

    echo "<h1>Continue game:</h1>
          <h2>Your 3x3 game with ".htmlspecialchars($opponent)."</h2>";

    $currGame->close();

?>

  <form action="threesSubmit.php" id="gameForm" method="post">
    <h3>Choose your next move below:</h3>
    <div class="tableContainer">
      <table cellspacing="0">

<?php
          $OMoves = array();
          $XMoves = array();

          $moves = mysqli_query($link, "SELECT * FROM ThreesMoves WHERE gameID = '$gameID'");
          while($move = $moves->fetch_assoc()) {
            if($move["isX"] == 1) array_push($XMoves, $move["movePosition"]);
            else array_push($OMoves, $move["movePosition"]);
          }

          //Create and populate table with Xs and Os already made
          for($i = 0; $i < 3; $i++) {
            echo "<tr>";
            for($j = 0; $j < 3; $j++) {
              $k = ($i*3)+$j;
              if (in_array($k, $OMoves)) echo "<td class=\"board\">O</td>";
              elseif (in_array($k, $XMoves)) echo "<td class=\"board\">X</td>";
              else {
                echo "<input type=\"radio\" name=\"move3\" value=\"".$k."\" class=\"radio online\" required>
            					 <td class=\"board\"></td>";
              }
            }
            echo "</tr>";
          }

?>

            </table>
            <input type="hidden" name="gameID" value="<?php echo $gameID; ?>">
            <input id="ignoreMe" type="hidden" name="gameState">
						<br>
					</div>
					<div>
						<a href="../"><button type="button" class="btn btn-default btn-lg">Return Home</button></a>
						<input type="submit" class="btn btn-default btn-lg" name="submit" value="Place move!">
					</div>
        </form>
      <br>
    </div>
  </body>
	<script type="text/javascript" src="maybeJS.js"></script>
</html>

<?php
}
else {
    header('Location: ../');
}
?>
