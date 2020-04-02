class pageState {
  constructor(XO) {
    this.XO = XO;
  }

  updatePage(board) {
    for(let i = 0; i < 9; i++) {
      if(board.tiles[i] != undefined) {
        this.XO[i].innerText = board.tiles[i];
        this.XO[i].classList.add(board.tiles[i]+"Select");
      }
    }

    if(board.winner != "") {
      for(let i = 0; i < 9; i++) {
        this.XO[i].classList.remove("OSelect", "XSelect");
        this.XO[i].classList.add(board.winner+"Select");
      }
    }
  }
}
