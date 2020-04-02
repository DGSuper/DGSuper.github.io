<?php
/**
  ** @brief Add html lines at the beginning of the php file to make it readable for browser
	** @pre none
	** @post none
	** @return None
  */

  require 'dirtracker.php';
  require_once 'config.php';
  include_once getDirectoryEscape().'helperFunctions.php';

  $sessionUsr = $_COOKIE["user"];
  $password   = $_COOKIE["pw"];
?>
<!DOCTYPE html>
<html>
  <head>
    <title>Tactics</title>
    <meta charset="utf-8">
    <link href=<?php echo getDirectoryEscape()."favicon.ico"; ?>  rel="icon" type="image/x-icon">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href= <?php echo getDirectoryEscape()."css/index.css"; ?> >

    <?php //Get the game rules and styling (JS and CSS) files based on the URI and HTML file.
      $loadRules = false;
      $file = basename($_SERVER['REQUEST_URI'],'.php'); //gets name of URI file (file the URI begins building site with)
      if($file == "simpleBoard" || $file == "ninerBoard" || $file == "botGame" || $file == "continueThrees" || $file == "continueNines") {
        $loadRules = true;
      }
    ?>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  </head>
  <body <?php if($loadRules) echo "onload=\"addEvents()\""; ?>>
    <nav class="navbar navbar-inverse">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href= <?php echo $diradder."../Tactics"; ?> >Tactics</a>
        </div>
        <ul class="nav navbar-nav">
          <li class="active"><a href=<?php echo getDirectoryEscape()."../Tactics"; ?> >Home</a></li>
        </ul>
        <ul class="nav navbar-nav">
          <li><a href=<?php echo getDirectoryEscape()."test.php" ?>>Database Test</a></li>
        </ul>
        <ul class="nav navbar-nav">
          <li><a href=<?php echo getDirectoryEscape()."simpleBoard.html"; ?> >3x3 Test</a></li>
        </ul>
        <ul class="nav navbar-nav">
          <li><a href=<?php echo getDirectoryEscape()."ninerBoard.html"; ?> >9x9 Test</a></li>
          <?php
            if($loadRules) {
              echo "<li class=\"active\">".addFacebook()."</li>
                    <li class=\"active\">".addTwitter()."</li>";
              addSocial();
            }
            ?>
        </ul>
<?php
  if(isset($_COOKIE['user'])) include_once 'loggedin.php';
  else include_once 'loggedout.php';
?>
