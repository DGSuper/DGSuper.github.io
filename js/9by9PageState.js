/**
* ninePageState updates the HTML after any moves are performed for the 9x9 boards
*
* @class ninePageState
* @constructor initializes variables that will be changed
*/
class ninePageState {
  constructor(XO, tables, nineBoard){
    this.XO = XO;
    this.tables = tables;
    this.nineBoard = nineBoard;
  }

  /**
  * Updates the board
  *
  * @method updateBoard
  * @param {Boolean} board Determines if the game is over or not
  * @param {Number}  i used an index for the move that will be made (for the tile being used)
  * @param {String} selClass Determines the type of move, X or O, and displays it graphically using CSS
  * @return none
  */
  updateBoard(board, i, selClass) {
    if(!board)
    {
      this.XO[i].classList.add(selClass, "selected");
      this.XO[i].innerText = selClass.charAt(0);
    }
    for(let i = 0; i < 81; i++)
    {
      this.XO[i].classList.remove("grayed","OSelect","XSelect", "ASelect");
      if(i < 9)
      {
        this.tables[i].classList.remove("Owinner", "Xwinner", "Awinner");
      }
    }
    if(board)
    {
      this.removeGrayedAll();
    }
    else
    {
      for(let i = 0; i < 81; i++)
      {
        if(i < 9)
        {
          this.tables[i].classList.add(this.nineBoard.subBoards[i]+"winner");
        }
        if(this.nineBoard.subBoards[Math.floor(i/9)] != undefined && this.nineBoard.tiles[i] != undefined)
        {
          this.XO[i].classList.add(this.nineBoard.subBoards[Math.floor(i/9)]+"Select", "selected");
        }
        else if(this.nineBoard.tiles[i] != undefined)
        {
          this.XO[i].classList.add(this.nineBoard.tiles[i]+"Select", "selected");
        }
      }
    }
  }
  /**
  * grayOthers grays any tile not being used.
  *
  * @method grayOthers
  * @param {Number}  dontGray 0-8 of the subtable that does not get grayed.
  * @return none
  */
  grayOthers(dontGray)
  {
    let subBoardIndex = dontGray%9;
    this.removeGrayedAll();
    for(let i = 0; i < 81; i++)
    {
      if(!this.XO[i].classList.contains("selected") && Math.floor(i/9) != subBoardIndex)
      {
        this.XO[i].classList.add("grayed");
      }
    }
  }
  /**
  * Removed all the grayed tiles
  *
  * @method removeGrayedAll
  * @param none
  * @return none
  */
  removeGrayedAll()
  {
    for(let i = 0; i < 81; i++)
    {
      this.XO[i].classList.remove("grayed");
    }
  }

  /**
  * finishGame tells the user who is the winner by coloring the board the color of the winner and pushing an alert at the end.
  *
  * @method finishGame
  * @param {String} X/O/A depending on the winner or A if all the options are exhausted
  * @return none, an alert is made
  */
  finishGame(winner)
  {
    this.updateBoard(true);
    for(let i = 0; i < 81; i++)
    {
      this.XO[i].classList.add("selected", winner+"Select");
    }
    for(let i = 0; i < 9; i++)
    {
      this.tables[i].classList.add(winner+"winner");
    }
    document.getElementById("outter").classList.add(winner+"winner");
    if(winner == "A")
    {
      alert("All winning options exhausted... \nGame Tie!");
    }
    else
    {
      alert(winner + " is the winner!");
    }
  }
}
