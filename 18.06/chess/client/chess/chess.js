// import { shader } from "./src/shd/shd.js";
// import { camera } from "./src/mth/cam.js";
// import { prim } from "./src/rnd/prim.js";
// import { setCube } from "./src/figures/figures.js";
// import { render } from "./src/rnd/render.js";
// import { vec3 } from "./src/mth/vec3.js";
// import { mat4 } from "./src/mth/mat4.js";

// function play() {
//   const canvas = document.querySelector("#MyCan");
//   const gl = canvas.getContext("webgl2");

//   if (gl == null) {
//     alert("WebGL2 not supported");
//     return;
//   }

//   if (window.gl == undefined)
//     window.gl = gl;

//   gl.enable(gl.DEPTH_TEST);
//   gl.clearColor(0, 0, 0, 1.0);
  
//   let shd = shader("default");

//   const cam = camera();
//   cam.frameW = canvas.clientWidth;
//   cam.frameH = canvas.clientHeight;
//   cam.projDist = 0.1;
//   cam.projSize = 0.1;
//   cam.projFarClip = 300;

//   cam.camSet(vec3(0, 0, 4), vec3(0), vec3(0, 1, 0));
//   cam.camSetProj(0.1, 0.1, 300);
  
//   let Prim = prim(shd, setCube());

//   shd.apply();
  
//   const anim = () => {
//     gl.clear(gl.COLOR_BUFFER_BIT);
//     gl.clear(gl.DEPTH_BUFFER_BIT);

//     const date = new Date();
//     let t = date.getMinutes() * 60 +
//           date.getSeconds() +
//           date.getMilliseconds() / 1000;

//     Prim.render(mat4().matrMulMatr(mat4().rotateX(30 * t)), cam);
//     // Prim.render(mat4(), cam);

//     window.requestAnimationFrame(anim);
//   };

//   anim();
// }

// window.addEventListener("load", () => {
//   play();
// });


//--------------------------------------------------------------------

// Canvas and context
const canvas = document.getElementById("MyCan");
const ctx = canvas.getContext("2d");

// Field of all figures
let fieldFig = [];
// Field of possible moves
let premoveField = [];

// Size of square
let sizeSq = 100;

// Images
const
  wpImage = document.getElementById("white_pawn"),
  bpImage = document.getElementById("black_pawn"),
  wbImage = document.getElementById("white_bishop"),
  bbImage = document.getElementById("black_bishop"),
  wrImage = document.getElementById("white_rook"),
  brImage = document.getElementById("black_rook"),
  wqImage = document.getElementById("white_queen"),
  whImage = document.getElementById("white_knight");

function draw() {  
  window.addEventListener("mousedown", (event) => {
    move(event);
  });

  InitPosition();
  
  const anim = () => {
    drawBoard();
    render();

    window.requestAnimationFrame(anim);
  };

  anim();
}

draw();

function drawBoard() {
  let field = [];

  // Class of figures
  let colB = [], colW = [];
  colB.className = "black";
  colW.className = "white";

  for (let i = 0; i < 8; i++) {
    field[i] = [];
    for (let j = 0; j < 8; j++) {

      //Lines (vert)
      // ctx.beginPath();
      // ctx.moveTo(i * sizeSq, 0);
      // ctx.lineTo(i * sizeSq, canvas.clientHeight);
      // ctx.lineWidth = 0.3;
      // ctx.stroke();
      // //horiz
      // ctx.beginPath();
      // ctx.moveTo(0, j * sizeSq);
      // ctx.lineTo(canvas.clientWidth, j * sizeSq);
      // ctx.lineWidth = 0.3; 
      // ctx.stroke();

      // fields
      if (j % 2 == 0 && i % 2 != 0 || i % 2 == 0 && j % 2 != 0) {
        field[i][j] = 'black';
        ctx.beginPath();
        ctx.fillStyle = "purple";
        ctx.rect(i * sizeSq, j * sizeSq, sizeSq, sizeSq);
        ctx.fill();
        colB.push(field[i][j]);
      }
      else {
        field[i][j] = 'white';
        ctx.beginPath();
        ctx.fillStyle = "white"
        ctx.rect(i * sizeSq, j * sizeSq, sizeSq, sizeSq);
        ctx.fill();
        colB.push(field[i][j]);
      }
    }
  }
  ctx.beginPath();
  ctx.moveTo(8 * sizeSq, 0);
  ctx.lineTo(8 * sizeSq, canvas.clientHeight);
  ctx.lineWidth = 0.5;
  ctx.stroke();
  //horiz
  ctx.beginPath();
  ctx.moveTo(0, 8 * sizeSq);
  ctx.lineTo(canvas.clientWidth, 8 * sizeSq);
  ctx.lineWidth = 0.5; 
  ctx.stroke();
}

function move(event) {
  let rect = canvas.getBoundingClientRect();
  let r = event.clientX -  rect.left;
  let rs = event.clientY - rect.top;
  let x = Math.trunc(r / sizeSq);
  let y = Math.trunc(rs / sizeSq);

  if (x > 7 || y > 7 || x < 0 || y < 0)
    return;
  console.log(`${x} ${y}`);

  if (move.isRedact == undefined) {
    move.isRedact = false;
    move.count = 0;
  } else {
    if (move.isRedact)
      move.count++;
  }

  if (!move.isRedact && move.count == 0) {
    move.oldArr = fieldFig[x][y];
    move.pos = { x, y };
  }
  if (move.count == 1)
    move.count = 0;

  if (fieldFig[x][y].type != 'none' && premoveField[x][y] != 'predict') {
    if (move.pos.x != x && move.pos.y != y) {
      // one color
      if (fieldFig[x][y].color == fieldFig[move.pos.x][move.pos.y].color) {
        return;
      }

      let flag;
      // eating
      flag = moveChess(x, y, fieldFig[x][y]);
      if (flag) {
        fieldFig[move.pos.x][move.pos.y] = undefined;
        move.isRedact = false;
        let a = { con: fieldFig };
        socket.send(JSON.stringify(a));
      }
      return;
    }
    else {
      if (move.isRedact) {
        move.isRedact = false;
        closePredict();
        return;
      }
    }
    
    move.isRedact = true;
  }
  else {
    let flag = 'none';

    if (move.isRedact) {
      flag = moveChess(x, y, move.oldArr.type);
      if (flag == true) {
        fieldFig[move.pos.x][move.pos.y].type = 'none';
        fieldFig[move.pos.x][move.pos.y].color = 'none';
      } else {
        move.isRedact = false;
        closePredict();
      }
        //ctx.clearRect(pos.x * sizeSq, pos.y * sizeSq, sizeSq, sizeSq);  maybe it should be oncomment
    }
    // ctx.clearRect(pos.x * sizeSq, pos.y * sizeSq, sizeSq, sizeSq);
    if (flag == 'none' || flag == true) {
      Go(move.oldArr, event);
      move.isRedact = false;
    }
  }

  if (move.isRedact)
    predictMove(move.pos.x, move.pos.y, fieldFig[move.pos.x][move.pos.y].type);

  let a = { con: fieldFig };
  socket.send(JSON.stringify(a));
}

function predictMove(x, y, type) {
  switch (type) {
    case 'wp':
    case 'bp':
      pawnMove(x, y, type);
      break;
    case 'wb':
    case 'bb':
      bishopMove(x, y, type);
      break;
    case 'wr':
    case 'br':
      rookMove(x, y, type);
      break;
    case 'wq':
    case 'bq':
      queenMove(x, y, type);
    // case 'wh':
    // case 'bh':
    //   knightMove(x, y, type);
  }
}

function knightMove(x, y, type) {
  // for (let i = 1; i < 2; i++)
  //   for (let j = 1; j < 2; j++) {
  //     let k, s;
  //     if (i * i + j * j == 5) k = i * i, s = j * j;
  //     if (fieldFig[x + k][y + j] == 'none')
  //   }
}

function queenMove(x, y, type) {
    rookMove(x, y, type);
    bishopMove(x, y, type);
}

function rookMove(x, y, type) {
  if (type == 'wr' || type == 'wq') {
    let
      flag1 = true,
      flag2 = true,
      flag3 = true,
      flag4 = true;
    for (let i = 1; i < 8; i++) {
      if (x + i < 8) {
        if ((fieldFig[x + i][y].type == 'none') && flag1)
          premoveField[x + i][y] = 'predict';
        else if (fieldFig[x + i][y].color == 'b' && flag1) {
          premoveField[x + i][y] = 'predict';
          flag1 = false;
        }
        else
          flag1 = false;
      }
      if (y + i < 8) {
        if ((fieldFig[x][y + i].type == 'none') && flag2)
          premoveField[x][y + i] = 'predict';
        else if (fieldFig[x][y + i].color == 'b' && flag2) {
          premoveField[x][y + i] = 'predict';
          flag2 = false;
        }
        else
          flag2 = false;
      }
      if (x - i >= 0) {
        if ((fieldFig[x - i][y].type == 'none') && flag3)
          premoveField[x - i][y] = 'predict';
        else if ((fieldFig[x - i][y].color == 'b') && flag3) {
          premoveField[x - i][y] = 'predict';
          flag3 = false;
        }
        else
          flag3 = false;
      }
      if (y - i >= 0) {
        if ((fieldFig[x][y - i].type == 'none') && flag4)
          premoveField[x][y - i] = 'predict';
        else if (fieldFig[x][y - i].color == 'b' && flag4) {
          premoveField[x][y - i] = 'predict';
          flag4 = false;
        }
        else
          flag4 = false;
      }
    }
  } else {
    // Black rook
    let
      flag1 = true,
      flag2 = true,
      flag3 = true,
      flag4 = true;
    for (let i = 1; i < 8; i++) {
      if (x + i < 8) {
        if ((fieldFig[x + i][y].type == 'none') && flag1)
          premoveField[x + i][y] = 'predict';
        else if (fieldFig[x + i][y].color == 'w' && flag1) {
          premoveField[x + i][y] = 'predict';
          flag1 = false;
        }
        else
          flag1 = false;
      }
      if (y + i < 8) {
        if ((fieldFig[x][y + i].type == 'none') && flag2)
          premoveField[x][y + i] = 'predict';
        else if (fieldFig[x][y + i].color == 'w' && flag2) {
          premoveField[x][y + i] = 'predict';
          flag2 = false;
        }
        else
          flag2 = false;
      }
      if (x - i >= 0) {
        if ((fieldFig[x - i][y].type == 'none') && flag3)
          premoveField[x - i][y] = 'predict';
        else if ((fieldFig[x - i][y].color == 'w') && flag3) {
          premoveField[x - i][y] = 'predict';
          flag3 = false;
        }
        else
          flag3 = false;
      }
      if (y - i >= 0) {
        if ((fieldFig[x][y - i].type == 'none') && flag4)
          premoveField[x][y - i] = 'predict';
        else if (fieldFig[x][y - i].color == 'w ' && flag4) {
          premoveField[x][y - i] = 'predict';
          flag4 = false;
        }
        else
          flag4 = false;
      }
    }
  }
}

function bishopMove(x, y, type) {
  if (type == 'bb' || type == 'bq') {
    let
      flag1 = true,
      flag2 = true,
      flag3 = true,
      flag4 = true;
    for (let i = 1; i < 8; i++) {
      if (!flag1 && !flag2 && !flag3 && !flag4)
        return;
      if (x + i < 8 && y + i < 8) {
        if ((fieldFig[x + i][y + i].type == 'none') && flag1)
          premoveField[x + i][y + i] = 'predict';
        else if (fieldFig[x + i][y + i].color == 'w' && flag1) {
          premoveField[x + i][y + i] = 'predict';
          flag1 = false;
        }
        else
          flag1 = false;
      }
      if (x - i >= 0 && y - i >= 0) {
        if ((fieldFig[x - i][y - i].type == 'none') && flag2)
          premoveField[x - i][y - i] = 'predict';
        else if (fieldFig[x - i][y - i].color == 'w' && flag2) {
          premoveField[x - i][y - i] = 'predict';
          flag2 = false;
        }
        else
          flag2 = false;
      }
      if (x + i < 8 && y - i >= 0) {
        if ((fieldFig[x + i][y - i].type == 'none') && flag3)
          premoveField[x + i][y - i] = 'predict';
        else if (fieldFig[x + i][y - i].color == 'w' && flag3) {
          premoveField[x + i][y - i] = 'predict';
          flag3 = false;
        }
        else
          flag3 = false;
      }
      if (x - i >= 0 && y + i < 8) {
        if ((fieldFig[x - i][y + i].type == 'none') && flag4)
          premoveField[x - i][y + i] = 'predict';
        else if (fieldFig[x - i][y + i].color == 'w' && flag4) {
          premoveField[x - i][y + i] = 'predict';
          flag4 = false;
        }
        else
          flag4 = false;
      }
    }
  } else {
    let
      flag1 = true,
      flag2 = true,
      flag3 = true,
      flag4 = true;
    for (let i = 1; i < 8; i++) {
      if (x + i < 8 && y + i < 8) {
        if ((fieldFig[x + i][y + i].type == 'none') && flag1) //  || fieldFig[x + i][y + i].type == 'was'
          premoveField[x + i][y + i] = 'predict';
        else if (fieldFig[x + i][y + i].color == 'b' && flag1) {
          premoveField[x + i][y + i] = 'predict';
          flag1 = false;
        }
        else
          flag1 = false;
      }
      if (x - i >= 0 && y - i >= 0) {
        if ((fieldFig[x - i][y - i].type == 'none') && flag2)
          premoveField[x - i][y - i] = 'predict';
        else if (fieldFig[x - i][y - i].color == 'b' && flag2) {
          premoveField[x - i][y - i] = 'predict';
          flag2 = false;
        }
        else
          flag2 = false;
      }
      if (x + i < 8 && y - i >= 0) {
        if ((fieldFig[x + i][y - i].type == 'none') && flag3)
          premoveField[x + i][y - i] = 'predict';
        else if (fieldFig[x + i][y - i].color == 'b' && flag3) {
          premoveField[x + i][y - i] = 'predict';
          flag3 = false;
        }
        else
          flag3 = false;
      }
      if (x - i >= 0 && y + i < 8) {
        if ((fieldFig[x - i][y + i].type == 'none') && flag4)
          premoveField[x - i][y + i] = 'predict';
        else if (fieldFig[x - i][y + i].color == 'b' && flag4) {
          premoveField[x - i][y + i] = 'predict';
          flag4 = false;
        }
        else
          flag4 = false;
      }
    }
  }
}

function pawnMove(x, y, type) {
  if (type == 'wp') {
    // Default move
    if (y - 1 >= 0) {
      if (fieldFig[x][y - 1].type == 'none') {
        premoveField[x][y - 1] = 'predict';
      }
    }
    if (y - 2 >= 0) {
      if (fieldFig[x][y - 2].type == 'none' && y == 6 && fieldFig[x][y - 1].type == 'none') {
        premoveField[x][y - 2] = 'predict';
      }
    }
    // Eating
    if (x - 1 >= 0 && y - 1 >= 0) {
      if (fieldFig[x - 1][y - 1].color == 'b')
        premoveField[x - 1][y - 1] = 'predict';
    }
    if (x + 1 < 8 && y - 1 >= 0) {
      if (fieldFig[x + 1][y - 1].color == 'b')
        premoveField[x + 1][y - 1] = 'predict';
    }
  } else {
    // Black pawn
    if (y + 1 < 8) {
      if (fieldFig[x][y + 1].type == 'none')
        premoveField[x][y + 1] = 'predict';
    }
    if (fieldFig[x][y + 2].type == 'none' && y == 1 && fieldFig[x][y + 1].type == 'none')
      premoveField[x][y + 2] = 'predict';

    // Eating
    if (x + 1 < 8 && y + 1 < 8) {
      if (fieldFig[x + 1][y + 1].color == 'w')
        premoveField[x + 1][y + 1] = 'predict';
    }
    if (x - 1 >= 0 && y + 1 < 8) {
      if (fieldFig[x - 1][y + 1].color == 'w')
        premoveField[x - 1][y + 1] = 'predict';
    }
  }
}

function closePredict() {
  for (let i = 0; i < 8; i++)
    for (let j = 0; j < 8; j++) {
      premoveField[i][j] = 'space';
    }
}

function moveChess(x, y, type) {
  if (premoveField[x][y] == 'predict') {
    fieldFig[x][y].type = type;
  } else {
    return false;
  }
  closePredict();

  // True if we do move
  return true;
} 

function moveCount(event) {
  const canvas = document.getElementById("MyCan");

  let rect = canvas.getBoundingClientRect();
  let r = event.clientX -  rect.left;
  let rs = event.clientY - rect.top;
  let x = Math.trunc(r / sizeSq);
  let y = Math.trunc(rs / sizeSq);

  if (x > 7 || y > 7 || x < 0 || y < 0)
    return;

  let ans = {x, y};
  return ans;
}

function Go(arr, event) {
  let add = moveCount(event);
    
  fieldFig[add.x][add.y].type = arr.type;
  fieldFig[add.x][add.y].color = arr.color;
}

function InitPosition() {
  const canvas = document.getElementById("MyCan");
  const ctx = canvas.getContext("2d");

  // Dowmload all images
  bpImage.addEventListener("load", (e) => {
    console.log("bp loaded");
  });
  
  wpImage.addEventListener("load", (e) => {
    console.log("wp loaded");
  });

  bbImage.addEventListener("load", (e) => {
    console.log("bb loaded");
  });

  wbImage.addEventListener("load", (e) => {
    console.log("wb loaded");
  });

  wrImage.addEventListener("load", (e) => {
    console.log("wr loaded");
  });

  // var myGif = new GIF();
  // myGif.load("./chess/images/New Piskel (1).gif");

  let a = {
    'type': 'none',
    'color': 'none',
  }
  for (let i = 0; i < 8; i++) {
    premoveField[i] = [];
    fieldFig[i] = [];
    for (let j = 0; j < 8; j++) {
      premoveField[i][j] = 'space';
      fieldFig[i][j] = a;
    }
  }

  // Black pawn
  let bp = {
    'color': 'b',
    'type': 'bp',
  }
  for (let i = 0; i < 8; i++) {
    fieldFig[i][1] = bp;
  }

  // White pawn
  let wp = {
    'color': 'w',
    'type': 'wp',
  }
  for (let i = 0; i < 8; i++) {
    fieldFig[i][6] = wp;
  }
  
  // Black bishop
  let bb = {
    'color': 'b',
    'type': 'bb',
  }
  fieldFig[2][0] = bb;
  fieldFig[5][0] = bb;

  // White bishop
  let wb = {
    'color': 'w',
    'type': 'wb',
  }
  fieldFig[2][7] = wb;
  fieldFig[5][7] = wb;  

  // White rook
  let wr = {
    'color': 'w',
    'type': 'wr',
  }
  fieldFig[0][7] = wr;
  fieldFig[7][7] = wr;

  // Black rook
  let br = {
    'color': 'b',
    'type': 'br',
  }
  fieldFig[0][0] = br;
  fieldFig[7][0] = br;

  // White queen
  let wq = {
    'color': 'w',
    'type': 'wq',
  }
  fieldFig[3][7] = wq;

  // White knight
  let wh = {
    'color': 'w',
    'type': 'wh',
  }
  fieldFig[1][7] = wh;
  fieldFig[6][7] = wh;
}

function render() {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (fieldFig[i][j].type != 'none' && fieldFig[i][j] != null) {
        switch (fieldFig[i][j].type) {
          case 'bp':
            drawFig(i, j, bpImage);
            break;
          case 'wp':
            drawFig(i, j, wpImage);
            break;
          case 'bb':
            drawFig(i, j, bbImage);
            break;
          case 'wb':
            drawFig(i, j, wbImage);
            break;
          case 'wr':
            drawFig(i, j, wrImage);
            break;
          case 'br':
            drawFig(i, j, brImage);
            break;
          case 'wq':
            drawFig(i, j, wqImage);
            break;
          case 'wh':
            drawFig(i, j, whImage);
            break;
        }
        if (premoveField[i][j] == 'predict') { 
          ctx.beginPath();
          ctx.fillStyle = "red"
          ctx.arc(i * sizeSq + sizeSq / 2, j * sizeSq + sizeSq / 2, sizeSq / 10, 0, 2 * Math.PI);
          ctx.fill();      
        }
      } else {
        if (premoveField[i][j] == 'predict') {
          ctx.beginPath();
          ctx.fillStyle = "green"
          ctx.arc(i * sizeSq + sizeSq / 2, j * sizeSq + sizeSq / 2, sizeSq / 10, 0, 2 * Math.PI);
          ctx.fill();      
        }
      }
    }
  }
}

function drawFig(x, y, name) {
  ctx.drawImage(name, x * sizeSq, y * sizeSq, sizeSq, sizeSq);
}

//
//  Server
//


const socket = new WebSocket("ws://localhost:3030");

function initCommunication() {
  socket.onopen = (event) => {
    console.log("Socket open");
  };

  // socket.onmessage = (event) => {
  //   console.log(`Message received ${event.data}`);
  //   socket.send(JSON.stringify(fieldFig));
  // }
}
initCommunication();

// let but = document.getElementById("hod");
// but.addEventListener("click", () => {
//   let a = { con: fieldFig };
//   socket.send(JSON.stringify(a));
// });

socket.onmessage = (event) => {
  let a = JSON.parse(event.data).con;
    // for (let i = 0; i < 8; i++)
    //   for (let j = 0; j < 8; j++) {
    //     if (fieldFig[i][j] != a[i][j]) {
    //       if (a[i][j] == undefined)
    //         a[i][j].type = 'was  ';
    //     }
    //   }
  fieldFig = a;
};


// RESIZE WINDOW
// let r = document.getElementById("MyBody");
// r.addEventListener("resize", f)
// function f() {
//   console.log("ds;dsopfsdijp");
// }

// window.onresize = f;