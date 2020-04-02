<?php
/**
  ** @brief Displays the traditional 3x3 tic tac toe board
	** @pre none
	** @post 3x3 board is displayed
	** @return None
  */
  include_once 'header.php';
?>
        <h1><u>TRADITIONAL Tic-Tac-Toe!</u></h1>
          <div class="tableContainer">
            <table cellspacing="0">

      <?php
        for($i = 0; $i<3; $i++) {    //Build table rows and cells
          echo "<tr>";
          for($j = 0; $j<3; $j++) {
            echo "<td class=\"board\"></td>";
          }
          echo "</tr>";
        }
      ?>
            </table>
          </div>
        <br>
        <a href="../"><button type="button" class="btn btn-default btn-lg">Return Home</button></a>
      </div>
    </body>
  <script type="text/javascript" src="../js/ThreesClass.js"></script>
  <script type="text/javascript" src="../js/rules.js"></script>
  <script type="text/javascript" src="../js/pageState.js"></script>
</html>
