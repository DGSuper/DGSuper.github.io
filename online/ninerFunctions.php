<?php
/**
  ** @brief Interacts with all the 9x9 javascript functions
  ** @pre none
  ** @post Nav bar for logged in state is displayed
  ** @return arrays specific to each function
  */
  function buildBoardArray($gameState) {
    //$boardState is between 0 and 333,333,333
    //Each digit represent the state of each of the 9 sub-tables
    //0 means not won, 1 means X won, 2 means O won, 3 means neutral board

    //convert input to string and ensure it is of length 9
    $stringOfStates = (string)$gameState;

    //Create and build return variable
    $returnArray = array();
    for($j = 0; $j < 9; $j++)
    {
      $currentState = substr($stringOfStates, $j, 1);

      if($currentState == 'N')
      {
        $returnArray[$j] = "";
      }
      elseif($currentState == 'X')
      {
        $returnArray[$j] = "Xwinner";
      }
      elseif($currentState == 'O')
      {
        $returnArray[$j] = "Owinner";
      }
      elseif($currentState == 'A')
      {
        $returnArray[$j] = "Awinner";
      }
    }

    return $returnArray;
  }


  function makeGrayArray($grayNum)
  {
    $grayArray = array();

    if($grayNum == -1)
    {
      for($i = 0; $i < 9; $i++)
      {
        array_push($grayArray, true);
      }
    }
    else
    {
      for($i = 0; $i < 9; $i++)
      {
        if($i == $grayNum)
        {
          $grayArray[$i] = false;
        }
        else
        {
          $grayArray[$i] = true;
        }
      }
    }

    return $grayArray;
  }
?>
