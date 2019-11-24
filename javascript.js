width = 5;
height = 4;

var playerWon = false;
window.rollDice = () => {
  if (playerWon) {
    return;
  }

let player_current = players[currentTurn];

roll = Math.floor(Math.random() * 6 + 1);
alert (player_current.name +", You rolled "+ roll);
  if(player_current.position == 0 && roll == 1){
    player_current.position += roll;
  }
  else{
  player_current.position += roll;
  ladders.forEach(ladder => {
    if (ladder.start == player_current.position) {
      alert("You found a ladder.");
      player_current.position = ladder.end;
    }
  });

  if (player_current.position > 24) {
    alert(player_current.name + " has won!");
    playerWon = true;
  }


  if (player_current.position == position) {
 diff = player_current.position - position;
    currentPosition = position - diff;
  }
}
  currentTurn++;
  if (currentTurn >= players.length) {
    currentTurn = 0;
  }

board_draw();
};


players = [{name: "Player 1 (Yellow)",position: 0,color: "yellow"},{name: "Player 2 (Blue)",position: 0,color: "blue"}];

let currentTurn = 0;

board = [];
let position = 0;
let darkerbox = false;
ladders = [{start: 14,end: 4},{start: 22,end: 15},{start: 7,end: 14},{start: 18,end: 23}];

for (var y = height; y >= 0; y--) {
  let row = [];

  board.push(row);
  for (var x = 0; x < width; x++) {
    row.push({x,y,occupied: null,position,color: darkerbox ? "#575656" : "#ffffff"});
    darkerbox = !darkerbox;
    position++;
  }
}

sizeBoard = 55;
board_draw = () => {
  let screenboard = ``;
  board.forEach(row => {
    row.forEach(square => {
      screenboard += `<div class=square style="top:${square.y *
        sizeBoard}px; left:${square.x *
        sizeBoard}px; background-color:${square.color}"></div>`;
    });
  });

  players.forEach(player => {
    let square = null;
    board.forEach(row => {
      row.forEach(square => {
        if (square.position == player.position) {
          screenboard += `<div class=player style="top:${square.y *
            sizeBoard +
            5}px; left:${square.x * sizeBoard +
            5}px;background-color:${player.color}"></div>`;
        }
      });
    });
  });

  ladders.forEach(ladder => {
    let start_pos = { x: 0, y: 0 };
    let end_pos = { x: 0, y: 0 };

    board.forEach(row => {
      row.forEach(square => {
        if (square.position == ladder.start) {
          start_pos.x = square.x * sizeBoard;
          start_pos.y = square.y * sizeBoard;
        }

        if (square.position == ladder.end) {
          end_pos.x = square.x * sizeBoard;
          end_pos.y = square.y * sizeBoard;
        }
      });
    });

    isLadder = ladder.end > ladder.start;

    drawLine({ color: isLadder ? "green" : "red", start_pos, end_pos });
  });

  document.getElementById("board").innerHTML = screenboard;
};

function drawLine({ color, start_pos, end_pos }) {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.moveTo(start_pos.x + 35, start_pos.y + 20);
  ctx.lineTo(end_pos.x + 25, end_pos.y + 25);
  ctx.lineWidth = 15;
  ctx.strokeStyle = color;
  ctx.stroke();

}
board_draw();
