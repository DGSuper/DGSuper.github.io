/**
* Board object
*
* @class simpleBoard
* @constructor initializes variables that will be changed
*/
class simpleBoard {
  constructor() {
    this.tiles = [];
    this.XTurn = true;
    this.winner = "";
    this.possibleWins = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
  }

  /**
  * Updates all the variables based on the move selected by the player
  *
  * @method move
  * @param {Number}  i used an index for the move that will be made (for the tile being used)
  * @return none
  */
  move(i) {
    if(this.winner == "") {
      if(this.tiles[i] == undefined) {
        this.tiles[i] = this.XTurn ? "X" : "O";
        this.XTurn = !this.XTurn;
        this.checkWin(this.tiles, this.possibleWins);
      }
    }
  }

  /**
  * Checks the whole board and sees if someone (or bot) has won
  *
  * @method checkWin
  * @param {array} tiles array of all the tiles
  * @param {array}  myWins array of all the possible wins
  * @return none
  */
  checkWin(tiles, myWins) {
    let winner = "";
    myWins.forEach(function(x) { //check if someone has won the game.
      if((tiles[x[0]] == tiles[x[1]] && tiles[x[0]] == tiles[x[2]]) && tiles[x[0]] != undefined) {
        winner = tiles[x[0]];;
      }
    });
    this.winner = winner;
  }
}
