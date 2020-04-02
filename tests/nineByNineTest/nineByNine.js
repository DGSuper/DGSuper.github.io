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

  checkGameWin(){
    this.updateSubArrays();
    let Owin = false;
    let Xwin = false;
    if(this.checkEntireBoard(this.OBoards, this.possibleWins, "O")){
      this.winner = "O";
      Owin = true;
      return Owin;
    }
    if(this.checkEntireBoard(this.XBoards, this.possibleWins, "X")){
      this.winner = "X";
      Xwin = true;
      return Xwin;
    }
    if(Owin && Xwin){
      this.winner = "A";
      return true;
    }
    return false;
  }

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

  checkBoardFull(board){
    for(let i = 0; i < 9; i++){
      if(this.tiles[i+9*board] == undefined){
        return false;a
      }
      else if(i == 8){
        return true;
      }
    }
  }

  checkSubBoardWin(subBoardIndex, tiles, possWin, XorO){
    let board = false;
    possWin.forEach(function(x){
        if(tiles[x[0]+9*subBoardIndex] == XorO && tiles[x[1]+9*subBoardIndex] == XorO && tiles[x[2]+9*subBoardIndex] == XorO){
          board = true;
        }
    });
    return board;
  }

  checkEntireBoard(boards, possWin, XorO){
    let board = false;
    possWin.forEach(function(x) { //check if someone has won the game.
      if((boards[x[0]] == XorO && boards[x[1]] == XorO && boards[x[2]] == XorO)) {
        if(boards[x[0]] != "A" || boards[x[1]] != "A" || boards[x[2]] != "A"){
          board = true;
        }
      }
    });
    return board;
  }
}
