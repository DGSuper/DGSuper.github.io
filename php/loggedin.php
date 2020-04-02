<?php
/**
  ** @brief Echoes the buttons on the nav bar once the user is logged in
	** @pre dirtracker function returns the depth
	** @post Nav bar for logged in state is displayed
	** @return None
  */
  require_once 'dirtracker.php';
?>

<ul class="nav navbar-nav navbar-right">
  <li><a href="<?php echo getDirectoryEscape(); ?>php/myProfile.php"><span class="glyphicon glyphicon-user"></span> My profile</a></li>
  <li><a href="<?php echo getDirectoryEscape(); ?>php/logout.php"><span class="glyphicon glyphicon-log-out"></span> Log out</a></li>
</ul>
</div>
</nav>
<div class="container">
