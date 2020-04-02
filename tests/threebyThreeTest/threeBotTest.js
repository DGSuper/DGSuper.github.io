function addEvents() {
  let XO = document.getElementsByClassName("board"); // array of DOM tiles with indicies [0..8]
  let board = new simpleBoard();
  let page = new pageState(XO);
  let bot = new easyBot(XO, board, page);
  let move;
	let counrter = 0;
  let XorO;
  let type;
	for(let i = 0; i < 9; i++) {//9-segment loop - adds click event to each tile
    XO[i].addEventListener("click", function() {
      if(!this.classList.contains("XSelect") && !this.classList.contains("OSelect")){
        move = bot.runBot();
        XorO = board.XTurn ? "X" : "O";
        type = bot.typeOfMove;
        counrter++;
        board.XTurn = !board.XTurn;
        page.updatePage(board);
        let testString = "<td class=\"testBox\">";
        testString += ""+counrter+": "+move+"("+XorO+")("+type+")</td>";
        document.getElementsByClassName("moveContainer")[0].innerHTML += testString;
        for(let i = 0; i < 9; i++){
          if(board.winner != ""){
            break;
          }
          move = bot.runBot();
          type = bot.typeOfMove;
          counrter++;
          testString = "<td class=\"testBox\">"+counrter+": "+move+"("+XorO+")("+type+")";
          XorO = board.XTurn ? "X" : "O";
          board.XTurn = !board.XTurn;
          page.updatePage(board);
          testString += " </td>";
          document.getElementsByClassName("moveContainer")[0].innerHTML += testString;
        }
      }
      // document.getElementsByClassName("moveContainer")[0].innerHTML += "</tr></table>";
    });
  }
}

function addEvents1() {
  let XO = document.getElementsByClassName("board1"); // array of DOM tiles with indicies [0..8]
  let board = new simpleBoard();
  let page = new pageState(XO);
  let bot = new mediumBot(XO, board, page);
  let move;
	let counrter = 0;
  let XorO;
  let type;
	for(let i = 0; i < 9; i++) {//9-segment loop - adds click event to each tile
    XO[i].addEventListener("click", function() {
      if(!this.classList.contains("XSelect") && !this.classList.contains("OSelect")){
        move = bot.runBot();
        type = bot.typeOfMove;
        XorO = board.XTurn ? "X" : "O";
        counrter++;
        board.XTurn = !board.XTurn;
        page.updatePage(board);
        let testString = "<td class=\"testBox\">";
        testString += ""+counrter+": "+move+"("+XorO+")("+type+")</td>";
        document.getElementsByClassName("moveContainer1")[0].innerHTML += testString;
        for(let i = 0; i < 9; i++){
          if(board.winner != ""){
            break;
          }
          move = bot.runBot();
          type = bot.typeOfMove;
          counrter++;
          testString = "<td class=\"testBox\">"+counrter+": "+move+"("+XorO+")("+type+")";
          XorO = board.XTurn ? "X" : "O";
          board.XTurn = !board.XTurn;
          page.updatePage(board);
          testString += " </td>";
          document.getElementsByClassName("moveContainer1")[0].innerHTML += testString;
        }
      }
      // document.getElementsByClassName("moveContainer")[0].innerHTML += "</tr></table>";
    });
  }
}

function addEvents2() {
  let XO = document.getElementsByClassName("board2"); // array of DOM tiles with indicies [0..8]
  let board = new simpleBoard();
  let page = new pageState(XO);
  let bot = new hardBot(XO, board, page);
  let move;
	let counrter = 0;
  let XorO;
  let type;
	for(let i = 0; i < 9; i++) {//9-segment loop - adds click event to each tile
    XO[i].addEventListener("click", function() {
      if(!this.classList.contains("XSelect") && !this.classList.contains("OSelect")){
        move = bot.runBot();
        type = bot.typeOfMove;
        XorO = board.XTurn ? "X" : "O";
        counrter++;
        board.XTurn = !board.XTurn;
        page.updatePage(board);
        let testString = "<td class=\"testBox\">";
        testString += ""+counrter+": "+move+"("+XorO+")("+type+")</td>";
        document.getElementsByClassName("moveContainer2")[0].innerHTML += testString;
        for(let i = 0; i < 9; i++){
          if(board.winner != ""){
            break;
          }
          move = bot.runBot();
          type = bot.typeOfMove;
          counrter++;
          testString = "<td class=\"testBox\">"+counrter+": "+move+"("+XorO+")("+type+")";
          XorO = board.XTurn ? "X" : "O";
          board.XTurn = !board.XTurn;
          page.updatePage(board);
          testString += " </td>";
          document.getElementsByClassName("moveContainer2")[0].innerHTML += testString;
        }
      }
      // document.getElementsByClassName("moveContainer")[0].innerHTML += "</tr></table>";
    });
  }
}
