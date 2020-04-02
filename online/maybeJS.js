function addEvents() {
  let XO = document.getElementsByClassName("board"); // array of DOM tiles with indicies [0..8]
  let box = document.getElementsByClassName("radio");

  let add = [0, 0, 0, 0, 0, 0, 0, 0, 0]; //length == 9
  let available = [];

  for(let i = 0; i < 9; i++) {
    if(XO[i].innerText == "") //tile not taken
      available.push(i);
    else {
      XO[i].classList.add(XO[i].innerText+"Select");
      for(let j = i; j < 9; j++) {
        add[j] += 1;
      }
    }
  }

  let turn = ((available.length%2) == 1) ? "X" : "O";

	for(let i = 0; i < 9; i++) { //9-segment loop - adds click event to each tile
    XO[i].addEventListener("click", function() {
      let taken = true;

      available.forEach(function(j) {
        if(i == j) taken = false;
      });

      if (!taken) {
        available.forEach(function(j) {
          XO[j].classList.remove("XSelect", "OSelect");
          XO[j].innerText = "";
          box[j-add[j]].checked = false;
        });
        XO[i].innerText = turn;
        XO[i].classList.add(turn+"Select");
        box[i - add[i]].checked = true;
      }
    });
  }

  try {
    document.getElementById("ignoreMe").value = 9 - available.length;
  } catch(e) {
    //dindunuthin
  }

  //Add form submission event addEventListener
  let myForm = document.getElementById("gameForm");
  if(myForm.addEventListener){
    myForm.addEventListener("submit", checkState, false);  //Modern browsers
  }
  else if(myForm.attachEvent){
    myForm.attachEvent('onsubmit', checkState);            //Old IE
  }
}

function checkState() {
  let XO = document.getElementsByClassName("board");

  let possibleWins = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];

  let board = [];
  for(let i = 0; i<9; i++) {
    board.push(XO[i].innerText);
  }

  let wins = "";
  possibleWins.forEach(function(poss) { //check if someone has won the game.
		if(checkTriple(poss[0], poss[1], poss[2], board)) {
      wins = XO[poss[0]].innerText;
    }
  });

  if(wins != "") {
    document.getElementById("ignoreMe").value = wins; //Send winner
    return true;
  }
  else if(checkFull(XO)) {
    document.getElementById("ignoreMe").value = "A"; //Send game tie
    return true;
  }

}
//End checkState()

function checkTriple(x1, x2, x3, txt) {
	if((txt[x1] == txt[x2] && txt[x2] == txt[x3]) && txt[x1] != undefined && txt[x1] != "") {
    return true;
	}
}

function checkFull(XO) {
  var full = 0;
  for(let i = 0; i < 9; i++) {
    if(XO[i].innerText != "") full++
  }

  return (full === 9);
}
