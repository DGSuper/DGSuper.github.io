/**
* This is the class for the easy bot of the 3x3 game.
*
* @class easyBot
* @constructor Initializes all the variables that will be changing throughout the program
*/
class easyBot {
  constructor(XO, board, page){
    this.XO = XO;
    this.board = board;
    this.winner = "";
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
    if(this.board.tiles[botMove] == undefined){
      this.board.tiles[botMove] = this.board.XTurn? "X":"O";
      this.board.checkWin(this.board.tiles, this.board.possibleWins);
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
    for(let i = 0; i < 9; i++){
      if(this.board.tiles[i] == undefined){
        validMoves.push(i);
      }
    }
    let random = Math.floor((Math.random() * validMoves.length));
    return validMoves[random];
  }
  /**
  * checkWinBot checks to see if the move that the bot will make will win the game
  *
  * @method checkWinBot
  * @param {tiles} an array of all the tiles
  * @param {winComb} a function that goes through an array of all the winning combinations
  * @return none
  */
  checkWinBot(tiles, winComb){
    let winner = "";
    winComb.forEach(function(x){
      if((tiles[x[0]] == tiles[x[1]] && tiles[x[0]] == tiles[x[2]]) && tiles[x[0]] != undefined) {
        winner = tiles[x[0]];;
      }
    });
    this.winner = winner;
  }
}
