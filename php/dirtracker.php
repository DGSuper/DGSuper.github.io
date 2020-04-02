<?php
/**
  ** @brief Get the location of another file with respect to the home page. Allows for file accessibility.
	** @pre none
	** @post Provides a reference to the desired file
	** @return None
  */
$numdots = 0;
$diradder = "";
$whatIWant = substr(getcwd(), strpos(getcwd(), "/Tactics") + 1);
for($i = 0; $i < substr_count($whatIWant, "/"); $i++) {
  $numdots++;
  $diradder .= "../" ;
}

function getPWDDepth() {
  $numdots = 0;
  $whatIWant = substr(getcwd(), strpos(getcwd(), "/Tactics") + 1);
  for($i = 0; $i < substr_count($whatIWant, "/"); $i++) {
    $numdots++;
  }
  return $numdots;
}

function getDirectoryEscape() {
  $diradder = "";
  $whatIWant = substr(getcwd(), strpos(getcwd(), "/Tactics") + 1);
  for($i = 0; $i < substr_count($whatIWant, "/"); $i++) {
    $diradder .= "../" ;
  }
  return $diradder;
}

?>
