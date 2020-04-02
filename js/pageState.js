/**
* Updates HTML page for the 3x3 boards
*
* @class pageState
* @constructor initializes variables that will be changed
*/
class pageState {
  constructor(XO) {
    this.XO = XO;
  }
  /**
  * Updates the HTML based on the changes made in the board object
  *
  * @method updatePage
  * @param {Object} board Simple board object
  * @return none; HTML is updated
  */
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
