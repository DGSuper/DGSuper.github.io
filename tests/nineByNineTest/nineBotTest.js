function populateHTML() {
	let add = "<tr><td class=\"board\"></td><td class=\"board\"></td><td class=\"board\"></td></tr>";
	for(let i = 0; i < 9; i++) {
		for(let j = 0; j < 3; j++) document.getElementsByClassName("subtable "+ i)[0].innerHTML += add
	}
	addEvents();
}
function addEvents() {
  let tables = document.getElementsByClassName("subtable");
  let XO = document.getElementsByClassName("board");
  let board = new ninerBoard();
	let move;
	let counrter = 0;
	let XorO;
	let type;
  let page = new ninePageState(XO, tables, board);
	let bot = new easyBot(XO, board, page);
  for(let i = 0; i < 81; i++){
    XO[i].addEventListener("click", function(){
      if(!this.classList.contains("selected") && !this.classList.contains("grayed")){
				XorO = board.XTurn ? "X" : "O";
				move = bot.runBot();
				type = bot.typeOfMove;
				counrter++;
				let testString = "<td class=\"testBox\">    ";
				testString += ""+counrter+": "+move+"("+XorO+")("+type+")</td>";
				document.getElementsByClassName("moveContainer")[0].innerHTML += testString;
				while(!board.checkGameWin()){
						XorO = board.XTurn ? "X" : "O";
						move =bot.runBot();
						type = bot.typeOfMove;
						counrter++;
						testString = "<td class=\"testBox\">"+counrter+": "+move+"("+XorO+")("+type+")";
						testString += " </td>";
						document.getElementsByClassName("moveContainer")[0].innerHTML += testString;
				}

      }
    });
  }
}

function populateHTMLM() {
	let add = "<tr><td class=\"board1\"></td><td class=\"board1\"></td><td class=\"board1\"></td></tr>";
	for(let i = 0; i < 9; i++) {
		for(let j = 0; j < 3; j++) document.getElementsByClassName("subtable1 "+ i)[0].innerHTML += add
	}
	addEventsM();
}
function addEventsM() {
  let tables = document.getElementsByClassName("subtable1");
	let XO = document.getElementsByClassName("board1");
  let board = new ninerBoard();
	let move;
	let counrter = 0;
	let XorO;
	let type;
  let page = new ninePageState(XO, tables, board);
	let bot = new mediumBot(XO, board, page);
  for(let i = 0; i < 81; i++){
    XO[i].addEventListener("click", function(){
			if(!this.classList.contains("selected") && !this.classList.contains("grayed")){
				XorO = board.XTurn ? "X" : "O";
				move = bot.runBot();
				type = bot.typeOfMove;
				counrter++;
				let testString = "<td class=\"testBox\">    ";
				testString += ""+counrter+": "+move+"("+XorO+")("+type+")</td>";
				document.getElementsByClassName("moveContainer1")[0].innerHTML += testString;
				while(!board.checkGameWin()){
						XorO = board.XTurn ? "X" : "O";
						move =bot.runBot();
						type = bot.typeOfMove;
						counrter++;
						testString = "<td class=\"testBox\">"+counrter+": "+move+"("+XorO+")("+type+")";
						testString += " </td>";
						document.getElementsByClassName("moveContainer1")[0].innerHTML += testString;
				}

      }
    });
  }
}

function populateHTMLH() {
	let add = "<tr><td class=\"board2\"></td><td class=\"board2\"></td><td class=\"board2\"></td></tr>";
	for(let i = 0; i < 9; i++) {
		for(let j = 0; j < 3; j++) document.getElementsByClassName("subtable2 "+ i)[0].innerHTML += add
	}
	addEventsH();
}
function addEventsH() {
  let tables = document.getElementsByClassName("subtable2");
	let XO = document.getElementsByClassName("board2");
  let board = new ninerBoard();
	let move;
	let counrter = 0;
	let XorO;
	let type;
  let page = new ninePageState(XO, tables, board);
	let bot = new hardBot(XO, board, page);
  for(let i = 0; i < 81; i++){
    XO[i].addEventListener("click", function(){
			if(!this.classList.contains("selected") && !this.classList.contains("grayed")){
				XorO = board.XTurn ? "X" : "O";
				move = bot.runBot();
				type = bot.typeOfMove;
				counrter++;
				let testString = "<td class=\"testBox\">    ";
				testString += ""+counrter+": "+move+"("+XorO+")("+type+")</td>";
				document.getElementsByClassName("moveContainer2")[0].innerHTML += testString;
				while(!board.checkGameWin()){
						XorO = board.XTurn ? "X" : "O";
						move =bot.runBot();
						type = bot.typeOfMove;
						counrter++;
						testString = "<td class=\"testBox\">"+counrter+": "+move+"("+XorO+")("+type+")";
						testString += " </td>";
						document.getElementsByClassName("moveContainer2")[0].innerHTML += testString;
				}

      }
    });
  }
}
