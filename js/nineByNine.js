/**
* ninerBoard is the 9x9 tic tac toe object
*
* @class ninerBoard
* @constructor
*/

class ninerBoard {
  constructor(){
    this.subBoards = [];
    this.tiles = [];
    this.XTurn = true;
    this.winner = "";
    this.XBoards = [];
    this.OBoards = [];
    this.selClass = "";
    this.possibleWins = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
    for(let i = 0; i < 9; i++){
      this.OBoards.push(" ");
      this.XBoards.push(" ");
    }
  }
  /**
  * Checks if the player's move is valid or not
  *
  * @method move
  * @param {String}  i the player's move X or O
  * @return none
  */
  move(i){
    if(this.winner == ""){
      if(this.tiles[i] == undefined ){
        this.selClass = this.XTurn? "XSelect" : "OSelect";
        this.XTurn = !this.XTurn;
        if(this.selClass == "XSelect"){
          this.tiles[i] = "X";
        }
        else if(this.selClass == "OSelect"){
          this.tiles[i] = "O";
        }
        this.checkBoardStatus(i);
        this.checkGameWin();
      }
    }
  }
  /**
  * Checks the status of the 3x3 sub board.
  *
  * @method checkBoardStatus
  * @param {Number}  tile the number of the tile selected
  * @return none
  */
  checkBoardStatus(tile){
    let subBoardIndex = Math.floor(tile/9);
    if(this.subBoards[subBoardIndex] == undefined){
      if(this.checkSubBoardWin(subBoardIndex, this.tiles, this.possibleWins, this.selClass.charAt(0))){
        this.subBoards[subBoardIndex] = this.selClass.charAt(0);
      }
    }
    if(this.checkBoardFull(subBoardIndex)){
      if(this.subBoards[subBoardIndex] != "O" && this.subBoards[subBoardIndex] != "X"){
        this.subBoards[subBoardIndex] = "A";
      }
    }
  }

  /**
  * Checking if a move wins the game
  *
  * @method checkGameWin
  * @param none
  * @return {Boolean} True if the game has been won, false otherwise
  */
  checkGameWin(){
    this.updateSubArrays();
    let Owin = false;
    let Xwin = false;
    if(this.checkEntireBoard(this.OBoards, this.possibleWins, "O")){
      this.winner = "O";
      Owin = true;
    }
    if(this.checkEntireBoard(this.XBoards, this.possibleWins, "X")){
      this.winner = "X";
      Xwin = true;
    }
    if((Owin && Xwin) || this.specialCases()) {
      this.winner = "A";
      return true;
    }
    if(Owin || Xwin) {
      return true;
    }
    return false;
  }
  /**
  * updateSubArrays updates whichever sub table has been won by X or O.
  *
  * @method updateSubArrays
  * @param none
  * @return none; updates the corresponding array depending on the outcome
  */
  updateSubArrays(){

    for(let i = 0; i < 9; i++){
      if(this.subBoards[i] == "A"){
        this.OBoards[i] = "O";
        this.XBoards[i] = "X";
      }
      else if(this.subBoards[i] == "O"){
        this.OBoards[i] = "O";
      }
      else if(this.subBoards[i] == "X"){
        this.XBoards[i] = "X";
      }
    }
  }
  /**
  * Checks for different methods for no more possible ways to win the game
  *
  * @method specialCases
  * @param none
  * @return {Boolean} True if there is a special case; false otherwise
  */
  specialCases(){
    for(let i = 0; i < 9; i++){
      if(this.subBoards[i] != "A"){
        break;
      }
      else if(i == 8){
        return true;
      }
    }
    for(let i = 0; i < 9; i++){
      if(this.subBoards[i] == undefined){
        break;
      }
      else if(i == 8){
        return true;
      }
    }
    return false;
  }
  /**
  * Checks if there are no more moves left in the 9x9 board
  *
  * @method checkBoardFull
  * @param {Object} board object that has the properties of the board
  * @return {Boolean} True if the board is full; false otherwise
  */
  checkBoardFull(board){
    for(let i = 0; i < 9; i++){
      if(this.tiles[i+9*board] == undefined){
        return false;
      }
      else if(i == 8){
        return true;
      }
    }
  }

  /**
  * Checks if the 3x3 sub board has been won.
  *
  * @method checkSubBoardWin
  * @param {Number} subBoardIndex index of the specific sub board
  * @param {array} tiles all the tiles in the sub board
  * @param {array} possWin array of possible wins
  * @param {string} XorO string of the whose turn it is, X or O
  * @return {Boolean} True if the board has been won; false otherwise
  */
  checkSubBoardWin(subBoardIndex, tiles, possWin, XorO){
    let board = false;
    possWin.forEach(function(x){
        if(tiles[x[0]+9*subBoardIndex] == XorO && tiles[x[1]+9*subBoardIndex] == XorO && tiles[x[2]+9*subBoardIndex] == XorO){
          board = true;
        }
    });
    return board;
  }

  /**
  * Checks if someone has won the game
  *
  * @method checkEntireBoard
  * @param {array} boards array of sub boards
  * @param {array} possWin array of possible wins
  * @param {string} XorO string of the whose turn it is, X or O
  * @return {Boolean} True if the board has been won; false otherwise
  */
  checkEntireBoard(boards, possWin, XorO){
    let board = false;
    possWin.forEach(function(x) { //check if someone has won the game.
      if((boards[x[0]] == XorO && boards[x[1]] == XorO && boards[x[2]] == XorO)) {
        board = true;
      }
    });
    return board;
  }
}
