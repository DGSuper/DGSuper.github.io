/**
* Adds the tiles on the web page
*
* @method populateHTML
* @return No return; all tiles are displayed on the page
*/
function populateHTML() {
	let add = "<tr><td class=\"board\"></td><td class=\"board\"></td><td class=\"board\"></td></tr>";
	for(let i = 0; i < 9; i++) {
		for(let j = 0; j < 3; j++) document.getElementsByClassName("subtable "+ i)[0].innerHTML += add;
	}
}

/**
* addEvents adds the clicker events for all the positions on the 9x9 boards
*
* @method addEvents
* @return No return; all the events are added
*/
function addEvents() {
  populateHTML();
  let tables = document.getElementsByClassName("subtable");
  let XO = document.getElementsByTagName("td");
  let board = new ninerBoard();
  let page = new ninePageState(XO, tables, board);
	let bot = new easyBot(XO, board, page);

  for(let i = 0; i < 81; i++){
    XO[i].addEventListener("click", function(){
      if(!this.classList.contains("selected") && !this.classList.contains("grayed")){
        board.move(i);
        page.updateBoard(false, i, board.selClass);
        page.grayOthers(i);
        if(board.checkBoardFull(i%9)){
          page.removeGrayedAll();
        }
        if(board.checkGameWin() != false){
					page.updateBoard(true, i, board.selClass);
					page.finishGame(board.winner);
        }
				bot.runBot();
      }
    });
  }
}
