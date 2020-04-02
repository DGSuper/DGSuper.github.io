<?php
/**
  ** @brief Echoes the buttons on the nav bar in the logged out state
	** @pre dirtracker function returns the depth
	** @post Nav bar options for logged out state is displayed
	** @return None
  */
  require_once 'dirtracker.php';
?>

<ul class="nav navbar-nav navbar-right">
  <li><a href="<?php echo getDirectoryEscape(); ?>php/createaccount.php"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>
  <li><a href="<?php echo getDirectoryEscape(); ?>php/login.php"><span class="glyphicon glyphicon-log-in"></span> Log in</a></li>
</ul>
</div>
</nav>
<div class="container">
