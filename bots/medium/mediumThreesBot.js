/**
* This is the class for the medium bot for the 3x3 game.
*
* @class mediumBot
* @constructor Initializes all variables that will change later in the program.
*/
class mediumBot {
  constructor(XO, board, page){
    this.XO = XO;
    this.board = board;
    this.winner = "";
    this.page = page;
    this.randomSwitch = true;
  }
  /**
  * runBot decides what the bot's next move will be depending on the difficulty chosen by the user.
  *
  * @method runBot
  * @param none
  * @return none
  */
  runBot(){
    let botMove = this.nextMove();
    if(this.board.tiles[botMove] == undefined){
      this.board.tiles[botMove] = this.board.XTurn? "X":"O";
      this.board.checkWin(this.board.tiles, this.board.possibleWins);
    }
  }
  /**
  * randomMove looks for a random move in the board when called
  *
  * @method randomMove
  * @param none
  * @return {number} Returns an integer that corresponds to a move from the array of valid moves for a random move.
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
  * Based on the returns of the other bot methods, it will return what the next move is going to be.
  *
  * @method runBot
  * @param none
  * @return {winningMove} If the bot sees a move on the board that allows it to win the game, it will return the position of the winning move for the bot.
  * @return {blockMove} If the bot doesn't see a winning move but can block its opponent from winning, it will return the position of this block move.
  * @return {twoTiles} If the bot doesn't see a block move or a winning move, it will return a move that allows it to have two tiles next to one another.
  * @return {randomMove} If none of the above conditions are satisified, then the bot will perform a random move wherever it sees an opening position.
  */
  nextMove(){
    if(this.randomSwitch == false){
      this.randomSwitch = !this.randomSwitch;
      if(this.winningMove() != -1){
        console.log("winning");
        return (this.winningMove());
      }
      else if(this.blockMove() != -1){
        console.log("blocked");
        return (this.blockMove());
      }
      else if(this.twoTiles() != -1){
        console.log("twoTiles");
        return (this.twoTiles());
      }
      else{
        console.log("random");
        return (this.randomMove());
      }
    }
    else if(this.randomSwitch == true){
      this.randomSwitch = !this.randomSwitch;
      console.log("random");
      return (this.randomMove());
    }
  }
  /**
  * winningMove looks for a winning move in the board when called
  *
  * @method winningMove
  * @param none
  * @return {number} Returns an integer that corresponds to a move from the array of valid moves if there is a winning move. If there is no winning move, it will return -1.
  */
  winningMove(){
    let validMoves = [];
    let OTiles = [];
    let subBoard = [];
    let tempXO = this.XO;
    let counter = 0;
    let temp = [];
    for(let i = 0; i < 9; i++){
      subBoard.push(" ");
    }
    for(let i = 0; i < 9; i++){
      if(this.board.tiles[i] == undefined){
        validMoves.push(i);
      }
    }
    for(let i = 0; i < 9; i++){
      if((this.board.tiles[i] != undefined) && (this.board.tiles[i] == "O")){
        OTiles.push(i);
      }
    }
    for(let i = 0; i < 9; i++){
      for(let j = 0; j < OTiles.length; j++){
        if(i == OTiles[j]){
          subBoard[i] = "O";
        }
      }
    }
    for(let i = 0; i < this.board.possibleWins.length; i++){
      if(subBoard[this.board.possibleWins[i][0]] == "O"){
        counter++;
      }
      if(subBoard[this.board.possibleWins[i][1]] == "O"){
        counter++;
      }
      if(subBoard[this.board.possibleWins[i][2]] == "O"){
        counter++;
      }
      if(counter == 2){
        for(let j = 0; j < 3; j++){
          temp.push(this.board.possibleWins[i][j]);
        }
        for(let j = 0; j < 3; j++){
          for(let z = 0; z < validMoves.length; z++){
            if(subBoard[temp[j]] == " " && validMoves[z] == temp[j]){
              return temp[j];
            }
          }
        }
      }
      else{
        counter = 0;
      }
    }
    return -1;
  }
  /**
  * blockMove looks for a block move that blocks the user from winning when it is called
  *
  * @method blockMove
  * @param none
  * @return {number} Returns an integer that corresponds to a move from the array of valid moves if there is a block move to be made. Otherwise, it returns -1.
  */
  blockMove(){
    let validMoves = [];
    let XTiles = [];
    let OTiles = [];
    let subBoard = [];
    let tempXO = this.XO;
    let counter = 0;
    let temp = [];
    for(let i = 0; i < 9; i++){
      subBoard.push("");
    }
    for(let i = 0; i < 9; i++){
      if(this.board.tiles[i] == undefined){
        validMoves.push(i);
      }
    }
    for(let i = 0; i < 9; i++){
      if((this.board.tiles[i] != undefined) && (this.board.tiles[i] == "X")){
        XTiles.push(i);
      }
    }
    for(let i = 0; i < 9; i++){
      for(let j = 0; j < XTiles.length; j++){
        if(i == XTiles[j]){
          subBoard[i] = "X";
        }
      }
    }
    for(let i = 0; i < 9; i++){
      if((this.board.tiles[i] != undefined) && (this.board.tiles[i] == "O")){
        OTiles.push(i);
      }
    }
    for(let i = 0; i < 9; i++){
      for(let j = 0; j < OTiles.length; j++){
        if(i == OTiles[j]){
          subBoard[i] = "O";
        }
      }
    }
    for(let i = 0; i < this.board.possibleWins.length; i++){
      if(subBoard[this.board.possibleWins[i][0]] == "X" && subBoard[this.board.possibleWins[i][1]] != "O" && subBoard[this.board.possibleWins[i][2]] != "O"){
        counter++;
      }
      if(subBoard[this.board.possibleWins[i][1]] == "X" && subBoard[this.board.possibleWins[i][0]] != "O" && subBoard[this.board.possibleWins[i][2]] != "O"){
        counter++;
      }
      if(subBoard[this.board.possibleWins[i][2]] == "X" && subBoard[this.board.possibleWins[i][1]] != "O" && subBoard[this.board.possibleWins[i][0]] != "O"){
        counter++;
      }
      if(counter == 2){
        for(let j = 0; j < 3; j++){
          temp.push(this.board.possibleWins[i][j]);
        }
        for(let j = 0; j < 3; j++){
          for(let z = 0; z < validMoves.length; z++){
            if((subBoard[temp[j]] != "O" || subBoard[temp[j]] != "X") && validMoves[z] == temp[j]){
              return temp[j];
            }
          }
        }
      }
      else{
        counter = 0;
      }
    }
    return -1;
  }
  /**
  * twoTiles searches the board for a move that can be placed where there are two open tiles next to one another
  *
  * @method twoTiles
  * @param none
  * @return {number} Returns an integer that corresponds to a move from the array of valid moves. When there are no possible two tile moves, it returns -1
  */
  twoTiles(){
    let validMoves = [];
    let OTiles = [];
    let subBoard = [];
    let tempXO = this.XO;
    let counter = 0;
    let temp = [];
    for(let i = 0; i < 9; i++){
      subBoard.push(" ");
    }
    for(let i = 0; i < 9; i++){
      if(this.board.tiles[i] == undefined){
        validMoves.push(i);
      }
    }
    for(let i = 0; i < 9; i++){
      if((this.board.tiles[i] != undefined) && (this.board.tiles[i] == "O")){
        OTiles.push(i);
      }
    }
    for(let i = 0; i < 9; i++){
      for(let j = 0; j < OTiles.length; j++){
        if(i == OTiles[j]){
          subBoard[i] = "O";
        }
      }
    }
    for(let i = 0; i < this.board.possibleWins.length; i++){
      if(subBoard[this.board.possibleWins[i][0]] == "O"){
        counter++;
      }
      if(subBoard[this.board.possibleWins[i][1]] == "O"){
        counter++;
      }
      if(subBoard[this.board.possibleWins[i][2]] == "O"){
        counter++;
      }
      if(counter == 1){
        for(let j = 0; j < 3; j++){
          temp.push(this.board.possibleWins[i][j]);
        }
        for(let j = 0; j < 3; j++){
          for(let z = 0; z < validMoves.length; z++){
            if(subBoard[temp[j]] == " " && validMoves[z] == temp[j]){
              return temp[j];
            }
          }
        }
      }
      else{
        counter = 0;
      }
    }
    return -1;
  }
}
