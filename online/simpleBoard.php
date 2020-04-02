<?php
/**
  ** @brief Displays the options for creating a new online 3x3 game
	** @pre none
	** @post Options are displayed
	** @return None
  */
if(!isset($_COOKIE['user'])) {
  header('Location: ../');
}
else {

  include_once '../php/header.php'; ?>

<h1>Traditional Tic-Tac-Toe!</h1>
  <form action="gameCreate.php" id="gameForm" method="post">
    <h3>Choose your opponent</h3>
    <input type="text" name="user2" class="form-control online" placeholder="Choose another player by their username..." required>
		<h3>Choose your first move below:</h3>
		<div class="tableContainer">
      <table cellspacing="0">

<?php
for($i = 0; $i<3; $i++) {
  echo "<tr>";
  for($j = 0; $j<3; $j++) {
		$k = ($i*3)+$j;
    echo "<input type=\"radio\" name=\"move3\" value=\"".$k."\" class=\"radio online\" required>
					 <td class=\"board\"></td>";
  }
  echo "</tr>";
}
?>
              </table>
							<br>
						</div>
						<div>
							<a href="../"><button type="button" class="btn btn-default btn-lg">Return Home</button></a>
							<input type="submit" class="btn btn-default btn-lg" name="submit" value="Create Game!">
						</div>
          </form>
        <br>
      </div>
    </body>
		<script type="text/javascript" src="maybeJS.js"></script>
</html>

<?php
}

?>
