

 // set game board
const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])
//when the page is loaded
window.onload=function(){
  makeHtmlBoard();
  makeBoard();
}

function makeBoard(){
  for (let y=0; y < HEIGHT; y++){
    board.push([]);  //push empty arry to board
    for(let x=0;x < WIDTH; x++){
      board[y].push(null); // push null to board
    }
  }
  return board;
}

/** makeHtmlBoard: make HTML table and row of column tops. */
function makeHtmlBoard() {
  // get board from html
  const htmlBoard = document.getElementById('board');

  // create column buttons to drop the pieces
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top"); //give the 'column-top' id to the new 
  top.addEventListener("click", handleClick); // add listener for a click event on the top <tr> 


  //loop to create cells that can contain data <td>
  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td"); //create new <td> when headCell is implemented
    headCell.setAttribute("id", x); // set id of x to new <td>(headCell)
    top.append(headCell); //append headCell to the top
  }

  //append top to the board
  htmlBoard.append(top);

  // loop to create table rows and cells in the rows 
  for (let y = 0; y < HEIGHT; y++) {
    //create new tr 
    const row = document.createElement("tr");
    //loop to create cells
    for (let x = 0; x < WIDTH; x++) {
 
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`); // set id of idx y-x to each cell 
      row.append(cell); // append cell to rows
    }
    htmlBoard.append(row);
  }
}
/** findSpotForCol: given column x, return top empty y (null if filled) */
function findSpotForCol(x){
  for (let y = HEIGHT - 1; y >= 0; y--) {
    if (board[y][x] === null) {
      return y;
    }
  }
  return ;
}

/**placeInTable:update DOM to place piece into HTML table of board */
function placeInTable(y,x){
  //make a div and insert into correct table cell
 const piece=document.createElement('div');
 piece.classList.add('piece');
 piece.classList.add(`p${currPlayer}`);

 const spot=document.getElementById(`${y}-${x}`);
 spot.append(piece);
 
}

//endGame: annouce game end
function endGame(msg){
//  alert(msg);
  setTimeout(()=> alert(msg),400);

}
/** handleClick: handle click of column top to play piece */
function handleClick(evt) {
  // get x from ID of clicked cell
  var x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  var y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  //place piece in board and add to html table
  //todo: add line to update in-memory board
  placeInTable(y, x);
  board[y][x]=currPlayer;  //update the board with the current player

  //create oppisit player to fix the annouce of wrong player
  let oppositePlayer;
  currPlayer===1 ?oppositePlayer=1 :oppositePlayer=2;



// check for winner or tie
  if (checkForWin()){
      return endGame(`Player- ${currPlayer} wnis the game!!`);
  }
// check for tie
  if(board.every(row=>row.every(cell =>cell))){
    return endGame("it's a tie, no winner!!")
  }
  //switch player
  currPlayer===1? currPlayer=2: currPlayer=1;
}



function checkForWin(){
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }
//todo: read and understand this code. Add comments to help you.
for (var y = 0; y < HEIGHT; y++) {
  for (var x = 0; x < WIDTH; x++) {
    var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]]; //connect4 in horizontal
    var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]]; //connec4 index  in vertical
    var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]]; //connect4 index in anti diagnally
    var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];//connect4 index on dianolly

    if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
      return true;
    }
  }
}
}

