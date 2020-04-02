<?php
/**
  ** @brief Echos the bot game for the bot that was chosen (for both 9x9 and 3x3)
	** @pre User must select the type of bot it wants to play
	** @post the bot game for the chosen bot is displayed
	** @return None
  */
  if($_SERVER["REQUEST_METHOD"] != "POST"){
    header('Location: ../');
  }
  else {
    include_once '../helperFunctions.php';
    include_once '../php/header.php';
    $gameType = $_POST['type'];

    //All Board building comes from functions in 'helperFunctions.php'.
    //Functions build game and menu once game type is declared.
    //Following construction, JS files respective to game type are run.


    if($gameType == "3e") {
      echoThrees("Easy");
      echo  "<script type=\"text/javascript\" src=\"easy/easyThreesBot.js\"></script>".
            "<script type=\"text/javascript\" src=\"easy/easyThreesBotRules.js\"></script>".
        "</html>";
    }
    elseif($gameType == "3m") {
      echoThrees("Medium");
      echo  "<script type=\"text/javascript\" src=\"medium/mediumThreesBot.js\"></script>".
            "<script type=\"text/javascript\" src=\"medium/mediumThreesBotRules.js\"></script>".
        "</html>";
    }
    elseif($gameType == "3h") {
      echoThrees("Hard");
      echo  "<script type=\"text/javascript\" src=\"hard/hardThreesBot.js\"></script>".
            "<script type=\"text/javascript\" src=\"hard/hardThreesBotRules.js\"></script>".
        "</html>";
    }


    elseif($gameType == "9e") {
      echoNines("Easy");
      echo  "<script type=\"text/javascript\" src=\"easy/nineRulesEasy.js\"></script>".
            "<script type=\"text/javascript\" src=\"easy/easyNinesBot.js\"></script>".
        "</html>";
    }
    elseif($gameType == "9m") {
      echoNines("Medium");
      echo  "<script type=\"text/javascript\" src=\"medium/nineRulesMedium.js\"></script>".
            "<script type=\"text/javascript\" src=\"medium/mediumNinesBot.js\"></script>".
        "</html>";
    }
    elseif($gameType == "9h") {
      echoNines("Hard");
      echo  "<script type=\"text/javascript\" src=\"hard/nineRulesHard.js\"></script>".
            "<script type=\"text/javascript\" src=\"hard/hardNinesBot.js\"></script>".
        "</html>";
    }
  }
?>
