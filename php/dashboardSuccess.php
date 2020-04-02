<?php
/**
  ** @brief Goes to a user specific dashboard if login is successful
	** @pre Valid login
	** @post Takes user to the dashboard
	** @return None
  */

require_once "dirtracker.php";
function displayDashboard() {
  ?>
  <div class="row">
    <div class="col-sm-4">
      <div class="panel-group">
        <div class="panel panel-default">
          <div class="panel-heading"><h2>Local Play</h2></div>
          <div class="panel-body">
            <p>
              <h4>Play with a friend at the same computer!</h4>
            </p>
            <a href="<?php echo getDirectoryEscape(); ?>php/simpleBoard.php"><button type="button" class="btn btn-default btn-lg" id="3x3Butt">3 x 3 Board</button></a>
            <a href="<?php echo getDirectoryEscape(); ?>php/ninerBoard.php"><button type="button" class="btn btn-default btn-lg" id="9x9butt">9 x 9 Board</button></a>
          </div>
        </div>
      </div>
    </div>
    <div class="col-sm-4">
      <div class="panel-group">
        <div class="panel panel-default">
          <div class="panel-heading"><h2>Player Vs. Bot</h2></div>
          <div class="panel-body">
            <p>
              <h4>Play against a bot of your choice!</h4>
            </p>
            <form action="bots/botGame.php" method="post">
              <button name="type" value = "3e" class="btn btn-default btn-lg">3 x 3 Easy</button>
              <button name="type" value = "9e" class="btn btn-default btn-lg">9 x 9 Easy</button>
              <br>
              <button name="type" value = "3m" class="btn btn-default btn-lg">3 x 3 Medium</button>
              <button name="type" value = "9m" class="btn btn-default btn-lg">9 x 9 Medium</button>
              <br>
              <button name="type" value = "3h" class="btn btn-default btn-lg">3 x 3 Hard</button>
              <button name="type" value = "9h" class="btn btn-default btn-lg">9 x 9 Hard</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="col-sm-4">
      <div class="panel-group">
        <div class="panel panel-default">
          <div class="panel-heading"><h2>Player Vs. Player</h2></div>
          <div class="panel-body">
            <?php
            if($_COOKIE["user"] != ""){
              echo "<p>
                      <h4>Play against a friend online!</h4>
                    </p>
                    <a href=\"".getDirectoryEscape()."online/simpleBoard.php\"><button type=\"button\" class=\"btn btn-default btn-lg\">Create 3x3 Game</button></a>
                    <a href=\"".getDirectoryEscape()."online/ninerBoard.php\"><button type=\"button\" class=\"btn btn-default btn-lg\">Create 9x9 Game</button></a>
                    <br>
                    <a href=\"".getDirectoryEscape()."online/continue.php\"><button type=\"button\" class=\"btn btn-default btn-lg\">Continue Game</button></a>";
            }
            else {
              echo "<p>
                      <h4>Play against a friend online!<br>(Must be logged in)</h4>
                    </p>
                    <a href=\"".getDirectoryEscape()."php/login.php\"><button type=\"button\" class=\"btn btn-default btn-lg\">Click here to log in</button></a>";
            }
            ?>
          </div>
        </div>
      </div>
    </div>
  </div>
  <br>

<?php
  }
?>
