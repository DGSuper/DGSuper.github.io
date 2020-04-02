<?php
/**
  ** @brief Allows the user to logout by unsetting cookies
	** @pre successful connection to database
	** @post user is logged out and directed to
	** @return success message
  */
  setcookie("user", "", time()-1, "/"); //Unset cookie
  setcookie("pw", "", time()-1, "/");  //Unset cookie

  header('Location: ../');
?>
