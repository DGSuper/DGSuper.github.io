<?php
/**
  ** @brief Displays the 9x9 tic tac toe board
	** @pre none
	** @post 9x9 board is displayed along with the social media options
	** @return None
  */
include_once '../php/header.php'; ?>

      <h1><u>EXTREME Tic-Tac-Toe!</u></h1>
        <div class="tableContainer ">
        	<table id="outter" class="outter" cellspacing="0">

            <?php
              for($i = 0; $i < 3; $i++) {
                echo "<tr class=\"snug\">";
                for($j = 0; $j < 3; $j++) {
                  $k = $i*3 + $j;
                  echo "<th><table class=\"subtable ".$k."\" cellspacing=\"0\"></table></th>";
                }
                echo "</tr>";
              }
            ?>

        	</div>
        </div>
      <br>
      <a href="../"><button type="button" class="btn btn-default btn-lg" id="surrenderButt">Return Home</button></a>
    </div>
  </body>
  <script type="text/javascript" src="../js/nineRules.js"></script>
	<script type="text/javascript" src="../js/nineByNine.js"></script>
	<script type="text/javascript" src="../js/9by9PageState.js"></script>
</html>
