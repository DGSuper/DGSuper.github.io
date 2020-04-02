<?php
/**
  ** @brief populates HTML for the 9x9 board
	** @pre none
	** @post none
	** @return None
  */
  if(!isset($_COOKIE['user'])) {
    header('Location: ../');
  }
  else {
    include_once '../php/header.php'; ?>

  <h1>ADVANCED Tic-Tac-Toe!</h1>
    <form action="gameCreate.php" id="gameForm" method="post">
      <h3>Choose your opponent</h3>
      <input type="text" name="user2" class="form-control" placeholder="Choose another player by their username..." required>
  		<h3>Choose your first move below:</h3>
  		<div class="tableContainer">
        <div id="outter" class="outter">
  <?php
  for($i = 0; $i < 3; $i++) {
    echo "<div class=\"snug\">";
    for($j = 0; $j<3; $j++) {
      $k = $i*3+$j;
      echo "<table class=\"subtable ".$k."\" cellspacing=\"0\">";

      for($m = 0; $m < 3; $m++) {
        echo "<tr>";
        for($n = 0; $n < 3; $n++) {
          $tile = ($k*9)+($m*3)+$n;

          echo "<input type=\"radio\" name=\"move9\" value=\"".$tile."\" class=\"radio\" required>";
          echo "<input type=\"checkbox\" class=\"movebox\" name=\"tile\"value=\"0\">"; // input
          echo "<td class=\"board\"></td>"; //Tile build
        }
        echo "</tr>";
      }
      echo "</table>";
    }
    echo "</div>";
  }
  ?>
  						</div>
              <br>
  						<div>
  							<a href="../"><button type="button" class="btn btn-default btn-lg">Return Home</button></a>
  							<input type="submit" class="btn btn-default btn-lg" name="submit" value="Create Game!">
  						</div>
            </form>
          <br>
        </div>
      </body>
  		<script type="text/javascript" src="ninesJS.js"></script>
      <script type="text/javascript" src="../js/9by9PageState.js"></script>
      <script type="text/javascript" src="../js/nineByNine.js"></script>
  </html>

<?php } ?>
