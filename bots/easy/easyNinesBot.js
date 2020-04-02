/**
* This is the class for the easy bot for the 9x9 game.
*
* @class easyBot
* @constructor Initializes all the variables that will be changing throughout the program
*/
class easyBot {
  constructor(XO, board, page){
    this.XO = XO;
    this.board = board;
    this.page = page;
  }
  /**
  * runBot decides what the bot's next move will be depending on the difficulty chosen by the user.
  *
  * @method runBot
  * @param none
  * @return none
  */
  runBot(){
    let botMove = this.randomMove();
    if(!this.XO[botMove].classList.contains("selected") && !this.XO[botMove].classList.contains("grayed")){
      this.board.selClass = this.board.XTurn? "XSelect" : "OSelect";
      this.board.XTurn = !this.board.XTurn;
      if(this.board.selClass == "XSelect"){
        this.board.tiles[botMove] = "X";
      }
      else if(this.board.selClass == "OSelect"){
        this.board.tiles[botMove] = "O";
      }
      this.board.checkBoardStatus(botMove);
      this.board.checkGameWin();
      this.page.updateBoard(false, botMove, this.board.selClass);
      this.page.grayOthers(botMove);
      if(this.board.checkBoardFull(botMove%9)){
        this.page.removeGrayedAll();
      }
      if(this.board.checkGameWin() != false){
        this.page.updateBoard(true, botMove, this.board.selClass);
        this.page.finishGame(this.board.winner);
      }
    }
  }
  /**
  * randomMove generates a random move for the bot that gets returned to the game.
  *
  * @method randomMove
  * @param none
  * @return {number} Returns an integer that corresponds to a move from the array of valid moves
  */
  randomMove(){
    let validMoves = [];
    for(let i = 0; i < 81; i++){
      if(!this.XO[i].classList.contains("selected") && !this.XO[i].classList.contains("grayed")){
        validMoves.push(i);
      }
    }
    let random = Math.floor((Math.random() * validMoves.length));
    return validMoves[random];
  }
}
