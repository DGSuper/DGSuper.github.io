<?php
/**
  ** @brief PHP class for the ninerBoard, which is an HTML populator
	** @pre none
	** @post HTML gets populated
	** @return None
  */
  class ninerBoard {

    private $user1 = "";
    private $user2 = "";
    private $gameID;
    public $tiles = array(); // $tiles is the 81 X/Os in order of index
    public $tileHistory = array(); //index relative to position, tracks what move number a tile was changed on
    private $size;
    private $lastMove;

    public function __construct($user1, $user2, $sequencedMoves, $gameID) //$sequencedMoves is list of moves (value 0-80) in order of placement
    {
      $this->lastMove = end($sequencedMoves);
      $this->size = count($sequencedMoves);

      $this->tileHistory = array_fill(0, 81, "");
      
      $this->buildBoard($sequencedMoves);
    }

    private function buildBoard($moves) //$this->$trackTiles = array_fill(0, 81, "");
    {
      for($i = 0; $i < $this->size; $i++)
      {
        if($i%2 == 0) //if move is X
        {
          $this->tiles[$moves[$i]] = "X";
        }
        else
        {
          $this->tiles[$moves[$i]] = "O";
        }

        $this->tileHistory[$moves[$i]] = $i+1;
      }
    }

    public function getGrayStatus()
    {
      $targetBoard = $this->lastMove%9;

      if($this->checkBoardFull($targetBoard))
      {
        return -1;
      }
      return $targetBoard;
    }

    public function getNumMoves()
    {
      return $this->size;
    }

    public function checkBoardFull($board)
    {
      for($i = 0; $i < 9; $i++)
      {
        if(!array_key_exists($board+$i, $this->tiles))
        {
          return false;
        }
      }
      return true;
    }

    public function getTileValue($position)
    {
      if(array_key_exists($position, $this->tiles))
      {
        return $this->tiles[$position];
      }
      else return "";
    }

    public function getTileHistory($position)
    {
      // if(array_key_exists($position, $this->tileHistory))
      // {
        return $this->tileHistory[$position]; //plus 1 because SQL indexing starts at 1
      // }
      // else return 0;
    }

  }

?>
