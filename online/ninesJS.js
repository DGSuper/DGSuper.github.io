function addEvents() {
  let XO = document.getElementsByClassName("board"); // array of DOM tiles with indicies [0..80]
  let tables = document.getElementsByClassName("subtable");
  let pastmoves = document.getElementsByClassName("movebox");
  let options = document.getElementsByClassName("radio");

  let board = new ninerBoard();
  let page = new ninePageState(XO, tables, board);

  let available = UpdateState(pastmoves, board, page, -1);

  var nextMove = board.XTurn ? "X" : "O"; //get variable that tracks turn from object

  //Add events for selecting a game move
  for(let i = 0; i < 81; i++) { //81-segment loop - adds click event to each tile
    if(!XO[i].classList.contains("grayed") && !XO[i].classList.contains("selected")) {
      XO[i].addEventListener("click", function() {
        //remove prior choice
        available.forEach(function(j) {
          if(XO[j].innerHTML != "") {
            XO[j].classList.remove("XSelect", "OSelect");
            XO[j].innerHTML = "";
            options[j].checked = false;
          }
        });
        //add new choice
        XO[i].innerText = nextMove;
        XO[i].classList.add(nextMove+"Select");
        options[i].checked = true;
      });
    }
  }

  let myForm = document.getElementById("gameForm");
  if(myForm.addEventListener) {
    myForm.addEventListener("submit", checkState, false);  //Modern browsers
  }
  else if(myForm.attachEvent) {
    myForm.attachEvent('onsubmit', checkState);            //Old IE
  }
}



function UpdateState(pastmoves, boardObject, pageState, newMove) {
  let oldMoves = []; //preallocate sequential array of taken tiles
  let available = []; //preallocate spatial array of available tiles
  for(let i = 0; i < 81; i++) {
    if(pastmoves[i].value > 0) {
      oldMoves[pastmoves[i].value-1] = i;
      pastmoves[i].checked = true;
    }
    else {
      available.push(i);
    }
  }

  if(newMove != -1) oldMoves.push(newMove);
  //Sync Game object and HTML page with current game
  oldMoves.forEach(function(i) {
    boardObject.move(i);
    pageState.updateBoard(false, i, boardObject.selClass);
    pageState.grayOthers(i);
    if(boardObject.checkBoardFull(i%9)){
      pageState.removeGrayedAll();
    }
    if(boardObject.checkGameWin()) {
      pageState.updateBoard(true, i, boardObject.selClass);
      pageState.finishGame(boardObject.winner);
      }
  });

  if(boardObject.winner != "") {
    document.getElementById("submit").value = boardObject.winner;
  }

  return available; //return the array of available moves
}


function checkState(myEvent) {
  let pastmoves = document.getElementsByClassName("movebox");
  let tables = document.getElementsByClassName("subtable");
  let XO = document.getElementsByTagName("td");
  let radios = document.getElementsByClassName("radio");

  let choice = 0;
  for(let i = 0; i < 81; i++) {
    if(radios[i].checked) {
      choice = Number(radios[i].value); //get new move value
      break;
    }
    else if(i == 80) return false; //prevents submit if a move isn't selected
  }

  let board = new ninerBoard();
  let page = new ninePageState(XO, tables, board);

  let available = UpdateState(pastmoves, board, page, choice); //get array of available spaces

  document.getElementById("submit").value = available.length; //Number of values at HTML construction

  let gameCheck = document.getElementById("submit");

  if(board.winner != "") {
    gameCheck.value = board.winner;
    return true;
  }
  return true;
}
