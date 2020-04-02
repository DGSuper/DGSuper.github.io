<?php
/**
  ** @brief Allows the user to continue a 9x9 game
	** @pre An online 9x9 game between two users has to exist
	** @post Displays the page after "Continue game" to make their next move on a 9x9 online game with another user
	** @return None
  */
  if($_SERVER["REQUEST_METHOD"] == "POST" && isset($_COOKIE['user'])){
    include_once '../php/header.php';
    require_once 'ninerFunctions.php';
    require_once 'nineClass.php';
    $gameID = $_POST['selectGame'];

    $currGame = mysqli_query($link, "SELECT * FROM NinesBoards WHERE gameID = '$gameID'");
    $moves = mysqli_query($link, "SELECT * FROM NinesMoves WHERE gameID = '$gameID' ORDER BY moveNumber");

    while($row = $currGame->fetch_assoc()) {
      $userX = $row["user1"];
      $userO = $row["user2"];
    }
    $currGame->close();

    $opponent = (strtolower($userX) == strtolower($sessionUsr) ? $userO : $userX);

    echo "<h1>Continue game:</h1>
          <h2>Your 9x9 game with ".htmlspecialchars($opponent)."</h2>";

    echo "<form action=\"ninesSubmit.php\" id=\"gameForm\"  method=\"post\">".
            "<h3>Choose your next move below:</h3>".
            "<div class=\"tableContainer\">".
              "<div id=\"outter\" class=\"outter\">";

    $AllMoves = array();
    while($move = $moves->fetch_assoc())
    {
      array_push($AllMoves, $move["movePosition"]);
    }
    $moves->close();

    $GAME = new ninerBoard($userX, $userO, $AllMoves, $gameID);

    //Create Table
    for($i = 0; $i < 3; $i++)
    {
      echo "<div class=\"snug\">";
      for($j = 0; $j<3; $j++)
      {
        //Begin BOARD build
        $k = ($i*3)+$j;
        echo "<table class=\"subtable ".$k." \" cellspacing=\"0\">";

        for($m = 0; $m < 3; $m++)
        {
          echo "<tr>";
          for($n = 0; $n < 3; $n++)
          {
            $tile = ($k*9)+($m*3)+$n;
            echo "<input type=\"radio\" name=\"move9\" class=\"radio\" value=\"".$tile."\" required>";
            echo "<input type=\"checkbox\" name=\"past[]\" class=\"movebox\" value=".$GAME->getTileHistory($tile)." checked>";
            echo "<td class=\"board\">".$GAME->getTileValue($tile)."</td>"; //Tile build
          }
          echo "</tr>";
        }
        echo "</table>";
      }
      echo "</div>";
    }
    echo "</div>";
?>
            <input type="hidden" name="gameID" value="<?php echo $gameID; ?>">
						<br>
					</div>
					<div>
						<a href="../"><button type="button" class="btn btn-default btn-lg">Return Home</button></a>
						<button type="submit" class="btn btn-default btn-lg" id="submit" name="submit">Place move!</button>
					</div>
        </form>
      <br>
    </div>
  </body>
	<script type="text/javascript" src="ninesJS.js"></script>
  <script type="text/javascript" src="../js/9by9PageState.js"></script>
  <script type="text/javascript" src="../js/nineByNine.js"></script>
</html>

<?php
}
else {
    header('Location: ../');
}
?>
