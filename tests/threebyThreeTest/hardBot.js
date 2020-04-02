class hardBot {
  constructor(XO, board, page){
    this.XO = XO;
    this.board = board;
    this.winner = "";
    this.page = page;
    this.randomSwitch = false;
  }
  runBot(){
    let botMove = this.nextMove();
    if(this.board.tiles[botMove] == undefined){
      this.board.tiles[botMove] = this.board.XTurn? "X":"O";
      this.board.checkWin(this.board.tiles, this.board.possibleWins);
    }
    return botMove;
  }
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
  nextMove(){
    if(this.winningMove() != -1){
      console.log("winning");
      this.typeOfMove = "Winning";
      return (this.winningMove());
    }
    else if(this.blockMove() != -1){
      console.log("blocked");
      this.typeOfMove = "Blocking";
      return (this.blockMove());
    }
    else if(this.twoTiles() != -1){
      console.log("twoTiles");
      this.typeOfMove = "TwoTiles";
      return (this.twoTiles());
    }
    else{
      console.log("random");
      this.typeOfMove = "Random";
      return (this.randomMove());
    }
  }
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
