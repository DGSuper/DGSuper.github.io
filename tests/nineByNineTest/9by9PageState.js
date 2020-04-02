class ninePageState {
  constructor(XO, tables, nineBoard){
    this.XO = XO;
    this.tables = tables;
    this.nineBoard = nineBoard;
  }
  updateBoard(board, i, selClass){
    if(!board){
      this.XO[i].classList.add(selClass, "selected");
      this.XO[i].innerText = selClass.charAt(0);
    }
    for(let i = 0; i < 81; i++){
      this.XO[i].classList.remove("grayed","OSelect","XSelect", "ASelect");
      if(i < 9){
        this.tables[i].classList.remove("Owinner", "Xwinner", "Awinner");
      }
    }
    if(board){
      this.removeGrayedAll();
    }
    else{
      for(let i = 0; i < 81; i++){
        if(i < 9){
          this.tables[i].classList.add(this.nineBoard.subBoards[i]+"winner");
        }
        if(this.nineBoard.subBoards[Math.floor(i/9)] != undefined && this.nineBoard.tiles[i] != undefined){
          this.XO[i].classList.add(this.nineBoard.subBoards[Math.floor(i/9)]+"Select", "selected");
        }
        else if(this.nineBoard.tiles[i] != undefined){
          this.XO[i].classList.add(this.nineBoard.tiles[i]+"Select", "selected");
        }
      }
    }
  }

  grayOthers(dontGray){
    let subBoardIndex = dontGray%9;
    this.removeGrayedAll();
    for(let i = 0; i < 81; i++){
      if(!this.XO[i].classList.contains("selected") && Math.floor(i/9) != subBoardIndex){
        this.XO[i].classList.add("grayed");
      }
    }
  }
  removeGrayedAll(){
    for(let i = 0; i < 81; i++){
      this.XO[i].classList.remove("grayed");
    }
  }
  finishGame(winner){
    this.updateBoard(true);
    for(let i = 0; i < 81; i++){
      this.XO[i].classList.add("selected", winner+"Select");
    }
    for(let i = 0; i < 9; i++){
      this.tables[i].classList.add(winner+"winner");
    }
    document.getElementById("outter").classList.add(winner+"winner");
    if(winner == "A"){
      alert("All winning options exhausted... \nGame Tie!");
    }
    else{
      alert(winner + " is the winner!");
    }
  }
}
