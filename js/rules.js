/**
* addEvents adds the clicker events for all the positions on the 9x9 boards
*
* @method addEvents
* @return No return; all the events are added
*/
function addEvents() {
  let XO = document.getElementsByClassName("board"); // array of DOM tiles with indicies [0..8]
  let board = new simpleBoard();
  let page = new pageState(XO);

	for(let i = 0; i < 9; i++) {//9-segment loop - adds click event to each tile
    XO[i].addEventListener("click", function() {
      board.move(i);
      page.updatePage(board);
    });
  }
}
