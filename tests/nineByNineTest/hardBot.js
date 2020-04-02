class hardBot {
  constructor(XO, board, page){
    this.XO = XO;
    this.board = board;
    this.page = page;
    this.typeOfMove;
  }
  runBot(){
    let botMove = this.nextMove();
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
    return botMove;
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
    for(let i = 0; i < 81; i++){
      if(!this.XO[i].classList.contains("selected") && !this.XO[i].classList.contains("grayed")){
        validMoves.push(i);
      }
    }
    let multiple = Math.floor(validMoves[0]/9);
    for(let i = (0+multiple*9); i < (9+multiple*9); i++){
      if((this.board.tiles[i] != undefined) && (this.board.tiles[i] == "O")){
        OTiles.push(i);
      }
    }
    for(let i = 0; i < 9; i++){
      for(let j = 0; j < OTiles.length; j++){
        if((i+multiple*9) == OTiles[j]){
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
            if(subBoard[temp[j]] == " " && validMoves[z] == (temp[j] + multiple*9)){
              return (temp[j] + multiple*9);
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
    let subBoard = [];
    let tempXO = this.XO;
    let counter = 0;
    let temp = [];
    for(let i = 0; i < 9; i++){
      subBoard.push("");
    }
    for(let i = 0; i < 81; i++){
      if(!this.XO[i].classList.contains("selected") && !this.XO[i].classList.contains("grayed")){
        validMoves.push(i);
      }
    }
    let multiple = Math.floor(validMoves[0]/9);
    for(let i = (0+multiple*9); i < (9+multiple*9); i++){
      if((this.board.tiles[i] != undefined) && (this.board.tiles[i] == "X")){
        XTiles.push(i);
      }
    }
    for(let i = 0; i < 9; i++){
      for(let j = 0; j < XTiles.length; j++){
        if((i+multiple*9) == XTiles[j]){
          subBoard[i] = "X";
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
            if((subBoard[temp[j]] != "O" || subBoard[temp[j]] != "X") && validMoves[z] == (temp[j] + multiple*9)){
              return (temp[j] + multiple*9);
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
    for(let i = 0; i < 81; i++){
      if(!this.XO[i].classList.contains("selected") && !this.XO[i].classList.contains("grayed")){
        validMoves.push(i);
      }
    }
    let multiple = Math.floor(validMoves[0]/9);
    for(let i = (0+multiple*9); i < (9+multiple*9); i++){
      if((this.board.tiles[i] != undefined) && (this.board.tiles[i] == "O")){
        OTiles.push(i);
      }
    }
    for(let i = 0; i < 9; i++){
      for(let j = 0; j < OTiles.length; j++){
        if((i+multiple*9) == OTiles[j]){
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
            if(subBoard[temp[j]] == " " && validMoves[z] == (temp[j] + multiple*9)){
              return (temp[j] + multiple*9);
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
