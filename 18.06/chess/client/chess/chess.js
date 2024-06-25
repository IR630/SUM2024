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
// Field of impossible moves
let dangerField = [];

// Size of square
let sizeSq = 100;

// Images
const wpImage = document.getElementById("white_pawn"),
  bpImage = document.getElementById("black_pawn"),
  wbImage = document.getElementById("white_bishop"),
  bbImage = document.getElementById("black_bishop"),
  wrImage = document.getElementById("white_rook"),
  brImage = document.getElementById("black_rook"),
  wqImage = document.getElementById("white_queen"),
  bqImage = document.getElementById("black_queen"),
  whImage = document.getElementById("white_knight"),
  bhImage = document.getElementById("black_knight"),
  wkImage = document.getElementById("white_king"),
  bkImage = document.getElementById("black_king");

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
  let colB = [],
    colW = [];
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
      if ((j % 2 == 0 && i % 2 != 0) || (i % 2 == 0 && j % 2 != 0)) {
        field[i][j] = "black";
        ctx.beginPath();
        ctx.fillStyle = "purple";
        ctx.rect(i * sizeSq, j * sizeSq, sizeSq, sizeSq);
        ctx.fill();
        colB.push(field[i][j]);
      } else {
        field[i][j] = "white";
        ctx.beginPath();
        ctx.fillStyle = "white";
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
  let r = event.clientX - rect.left;
  let rs = event.clientY - rect.top;
  let x = Math.trunc(r / sizeSq);
  let y = Math.trunc(rs / sizeSq);

  if (x > 7 || y > 7 || x < 0 || y < 0) return;
  console.log(`${x} ${y}`);

  if (move.turn == undefined) move.turn = true;

  if (move.isRedact == undefined) {
    move.isRedact = false;
    move.count = 0;
  } else {
    if (move.isRedact) move.count++;
  }

  if (!move.isRedact && move.count == 0) {
    move.oldArr = fieldFig[x][y];
    move.pos = { x, y };
  }
  if (move.count == 1) move.count = 0;

  if (fieldFig[x][y].color == "w") move.flag = true;
  if (fieldFig[x][y].type != "none" && premoveField[x][y] != "p") {
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
    } else {
      if (move.isRedact) {
        move.isRedact = false;
        closePredict();
        return;
      }
    }

    move.isRedact = true;
  } else {
    let flag = "none";

    if (move.isRedact) {
      flag = moveChess(x, y, move.oldArr.type);
      if (flag == true) {
        fieldFig[move.pos.x][move.pos.y].type = "none";
        fieldFig[move.pos.x][move.pos.y].color = "none";
      } else {
        move.isRedact = false;
        closePredict();
      }
    }
    if (flag == "none" || flag == true) {
      Go(move.oldArr, event);
      move.isRedact = false;
    }
  }

  if (move.isRedact)
    predictMove(move.pos.x, move.pos.y, fieldFig[move.pos.x][move.pos.y], 1);

  let a = { con: fieldFig };
  socket.send(JSON.stringify(a));
}

function predictMove(x, y, type, predict) {
  switch (type.type) {
    case "wp":
    case "bp":
      pawnMove(x, y, type, predict);
      break;
    case "wb":
    case "bb":
      bishopMove(x, y, type, predict);
      break;
    case "wr":
    case "br":
      rookMove(x, y, type, predict);
      break;
    case "wq":
    case "bq":
      queenMove(x, y, type, predict);
      break;
    case "wh":
    case "bh":
      knightMove(x, y, type, predict);
      break;
    case "wk":
    case "bk":
      kingMove(x, y, type, predict);
      break;
  }
}

function dangerSq(x, y, type) {
  if (dangerSq == undefined) dangerSq = 1;

  if (dangerSq) {
    //dangerSq = 0;
    if (type.type == "wk") {
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          if (
            fieldFig[i][j].type != "none" &&
            fieldFig[i][j].color != type.color &&
            fieldFig[i][j].type != "bk"
          )
            predictMove(i, j, fieldFig[i][j], 0);
        }
      }
    } else {
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          console.log(`i: ${i}, j:${j}`);
          if (
            fieldFig[i][j].type != "none" &&
            fieldFig[i][j].color != type.color &&
            fieldFig[i][j].type != "wk"
          )
            predictMove(i, j, fieldFig[i][j], 0);
        }
      }
    }
  }
}

function knightMove(x, y, type, predict) {
  const i = 2,
    j = 1;

  if (x + i < 8 && j + y < 8) {
    if (fieldFig[x + i][y + j].color != type.color) {
      if (predict) premoveField[x + i][y + j] = "p";
      else premoveField[x + i][y + j] = "i";
    }
  }
  if (x + j < 8 && y + i < 8) {
    if (fieldFig[x + j][y + i].color != type.color) {
      if (predict) premoveField[x + j][y + i] = "p";
      else premoveField[x + j][y + i] = "i";
    }
  }
  if (x - i >= 0 && y + j < 8) {
    if (fieldFig[x - i][y + j].color != type.color) {
      if (predict) premoveField[x - i][y + j] = "p";
      else premoveField[x - i][y + j] = "i";
    }
  }
  if (x - j >= 0 && y + i < 8) {
    if (fieldFig[x - j][y + i].color != type.color) {
      if (predict) premoveField[x - j][y + i] = "p";
      else premoveField[x - j][y + i] = "i";
    }
  }
  if (x + i < 8 && y - j >= 0) {
    if (fieldFig[x + i][y - j].color != type.color) {
      if (predict) premoveField[x + i][y - j] = "p";
      else premoveField[x + i][y - j] = "i";
    }
  }
  if (x + j < 8 && y - i >= 0) {
    if (fieldFig[x + j][y - i].color != type.color) {
      if (predict) premoveField[x + j][y - i] = "p";
      else premoveField[x + j][y - i] = "i";
    }
  }
  if (x - i >= 0 && y - j >= 0) {
    if (fieldFig[x - i][y - j].color != type.color) {
      if (predict) premoveField[x - i][y - j] = "p";
      else premoveField[x - i][y - j] = "i";
    }
  }
  if (x - j >= 0 && y - i >= 0) {
    if (fieldFig[x - j][y - i].color != type.color) {
      if (predict) premoveField[x - j][y - i] = "p";
      else premoveField[x - j][y - i] = "i";
    }
  }
}

function kingMove(x, y, type, predict) {
  rookMove(x, y, type, predict);
  bishopMove(x, y, type, predict);
  dangerSq(x, y, type);

  let bool = true;
  for (let i = 0; i < 8; i++)
    for (let j = 0; j < 8; j++) if (premoveField[i][j] == "p") bool = false;
  //if (bool) alert("You cant move");
  if (bool) alert("u lost sorry");
}

function queenMove(x, y, type, predict) {
  rookMove(x, y, type, predict);
  bishopMove(x, y, type, predict);
}

function antiColor(type) {
  if (type == "w") return "b";
  else return "w";
}

function rookMove(x, y, type, predict) {
  let i = 1;

  while (x + i < 8) {
    if ((type.type == "wk" || type.type == "bk") && i != 1) break;
    if (fieldFig[x + i][y].type == "none") {
      premoveField[x + i][y] = "p";
    } else if (fieldFig[x + i][y].color == antiColor(type.color) && predict) {
      premoveField[x + i][y] = "p";
      break;
    } else break;
    if (!predict) premoveField[x + i][y] = "i";
    i++;
  }

  i = 1;
  while (x - i >= 0) {
    if ((type.type == "wk" || type.type == "bk") && i != 1) break;
    if (fieldFig[x - i][y].type == "none") premoveField[x - i][y] = "p";
    else if (fieldFig[x - i][y].color == antiColor(type.color) && predict) {
      premoveField[x - i][y] = "p";
      break;
    } else break;
    if (!predict) premoveField[x - i][y] = "i";
    i++;
  }

  i = 1;
  while (y + i < 8) {
    if ((type.type == "wk" || type.type == "bk") && i != 1) break;
    if (fieldFig[x][y + i].type == "none") premoveField[x][y + i] = "p";
    else if (fieldFig[x][y + i].color == antiColor(type.color) && predict) {
      premoveField[x][y + i] = "p";
      break;
    } else break;
    if (!predict) premoveField[x][y + i] = "i";
    i++;
  }

  i = 1;
  while (y - i >= 0) {
    if ((type.type == "wk" || type.type == "bk") && i != 1) break;
    if (fieldFig[x][y - i].type == "none") premoveField[x][y - i] = "p";
    else if (fieldFig[x][y - i].color == antiColor(type.color) && predict) {
      premoveField[x][y - i] = "p";
      break;
    } else break;
    if (!predict) premoveField[x][y - i] = "i";
    i++;
  }
}

function bishopMove(x, y, type, predict) {
  let i = 1;

  while (x + i < 8 && y + i < 8) {
    if ((type.type == "wk" || type.type == "bk") && i != 1) break;
    if (fieldFig[x + i][y + i].type == "none") premoveField[x + i][y + i] = "p";
    else if (fieldFig[x + i][y + i].color == antiColor(type.color) && predict) {
      premoveField[x + i][y + i] = "p";
      break;
    } else break;
    if (!predict) premoveField[x + i][y + i] = "i";
    i++;
  }

  i = 1;
  while (x - i >= 0 && y - i >= 0) {
    if ((type.type == "wk" || type.type == "bk") && i != 1) break;
    if (fieldFig[x - i][y - i].type == "none") premoveField[x - i][y - i] = "p";
    else if (fieldFig[x - i][y - i].color == antiColor(type.color) && predict) {
      premoveField[x - i][y - i] = "p";
      break;
    } else break;
    if (!predict) premoveField[x - i][y - i] = "i";
    i++;
  }

  i = 1;
  while (x - i >= 0 && y + i < 8) {
    if ((type.type == "wk" || type.type == "bk") && i != 1) break;
    if (fieldFig[x - i][y + i].type == "none") premoveField[x - i][y + i] = "p";
    else if (fieldFig[x - i][y + i].color == antiColor(type.color) && predict) {
      premoveField[x - i][y + i] = "p";
      break;
    } else break;
    if (!predict) premoveField[x - i][y + i] = "i";
    i++;
  }

  i = 1;
  while (x + i < 8 && y - i >= 0) {
    if ((type.type == "wk" || type.type == "bk") && i != 1) break;
    if (fieldFig[x + i][y - i].type == "none") premoveField[x + i][y - i] = "p";
    else if (fieldFig[x + i][y - i].color == antiColor(type.color) && predict) {
      premoveField[x + i][y - i] = "p";
      break;
    } else break;
    if (!predict) premoveField[x + i][y - i] = "i";
    i++;
  }
}

function pawnMove(x, y, type, predict) {
  if (type.color == "w") {
    if (predict) {
      // Default move
      if (y - 1 >= 0) {
        if (fieldFig[x][y - 1].type == "none") {
          premoveField[x][y - 1] = "p";
        }
      }
      if (y - 2 >= 0) {
        if (
          fieldFig[x][y - 2].type == "none" &&
          y == 6 &&
          fieldFig[x][y - 1].type == "none"
        ) {
          premoveField[x][y - 2] = "p";
        }
      }
    }
    // Eating
    if (x - 1 >= 0 && y - 1 >= 0)
      if (fieldFig[x - 1][y - 1].color == "b" && predict)
        premoveField[x - 1][y - 1] = "p";
      else if (fieldFig[x - 1][y - 1].type == "none" && !predict)
        premoveField[x - 1][y - 1] = "i";
    if (x + 1 < 8 && y - 1 >= 0)
      if (fieldFig[x + 1][y - 1].color == "b" && predict)
        premoveField[x + 1][y - 1] = "p";
      else if (fieldFig[x + 1][y - 1].type == "none" && !predict)
        premoveField[x + 1][y - 1] = "i";
  } else {
    if (predict) {
      // Black pawn
      if (y + 1 < 8) {
        if (fieldFig[x][y + 1].type == "none") premoveField[x][y + 1] = "p";
      }
      if (
        fieldFig[x][y + 2].type == "none" &&
        y == 1 &&
        fieldFig[x][y + 1].type == "none"
      )
        premoveField[x][y + 2] = "p";
    }
    // Eating
    if (x + 1 < 8 && y + 1 < 8) {
      if (fieldFig[x + 1][y + 1].color == "w" && predict)
        premoveField[x + 1][y + 1] = "p";
      else if (fieldFig[x + 1][y + 1].type == "none" && !predict)
        premoveField[x + 1][y + 1] = "i";
    }
    if (x - 1 >= 0 && y + 1 < 8) {
      if (fieldFig[x - 1][y + 1].color == "w" && predict)
        premoveField[x - 1][y + 1] = "p";
      else if (fieldFig[x - 1][y + 1].type == "none" && !predict)
        premoveField[x - 1][y + 1] = "i";
    }
  }
}

function closePredict() {
  for (let i = 0; i < 8; i++)
    for (let j = 0; j < 8; j++) {
      premoveField[i][j] = "";
    }
}

function moveChess(x, y, type) {
  if (premoveField[x][y] == "p") {
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
  let r = event.clientX - rect.left;
  let rs = event.clientY - rect.top;
  let x = Math.trunc(r / sizeSq);
  let y = Math.trunc(rs / sizeSq);

  if (x > 7 || y > 7 || x < 0 || y < 0) return;

  let ans = { x, y };
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

  let a = {
    type: "none",
    color: "none",
  };
  for (let i = 0; i < 8; i++) {
    premoveField[i] = [];
    fieldFig[i] = [];
    dangerField[i] = [];
    for (let j = 0; j < 8; j++) {
      premoveField[i][j] = "";
      fieldFig[i][j] = a;
      dangerField[i][j] = a;
    }
  }

  // Black pawn
  let bp = {
    color: "b",
    type: "bp",
  };
  for (let i = 0; i < 8; i++) {
    fieldFig[i][1] = bp;
  }

  // White pawn
  let wp = {
    color: "w",
    type: "wp",
  };
  for (let i = 0; i < 8; i++) {
    fieldFig[i][6] = wp;
  }

  // Black bishop
  let bb = {
    color: "b",
    type: "bb",
  };
  fieldFig[2][0] = bb;
  fieldFig[5][0] = bb;

  // White bishop
  let wb = {
    color: "w",
    type: "wb",
  };
  fieldFig[2][7] = wb;
  fieldFig[5][7] = wb;

  // White rook
  let wr = {
    color: "w",
    type: "wr",
  };
  fieldFig[0][7] = wr;
  fieldFig[7][7] = wr;

  // Black rook
  let br = {
    color: "b",
    type: "br",
  };
  fieldFig[0][0] = br;
  fieldFig[7][0] = br;

  // White queen
  let wq = {
    color: "w",
    type: "wq",
  };
  fieldFig[3][7] = wq;

  // Black queen
  let bq = {
    color: "b",
    type: "bq",
  };
  fieldFig[3][0] = bq;

  // White knight
  let wh = {
    color: "w",
    type: "wh",
  };
  fieldFig[1][7] = wh;
  fieldFig[6][7] = wh;

  // Black knight
  let bh = {
    color: "b",
    type: "bh",
  };
  fieldFig[1][0] = bh;
  fieldFig[6][0] = bh;

  // White king
  let wk = {
    color: "w",
    type: "wk",
  };
  fieldFig[4][7] = wk;

  // Black king
  let bk = {
    color: "b",
    type: "bk",
  };
  fieldFig[4][0] = bk;
}

function render() {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (fieldFig[i][j].type != "none" && fieldFig[i][j] != null) {
        switch (fieldFig[i][j].type) {
          case "bp":
            drawFig(i, j, bpImage);
            break;
          case "wp":
            drawFig(i, j, wpImage);
            break;
          case "bb":
            drawFig(i, j, bbImage);
            break;
          case "wb":
            drawFig(i, j, wbImage);
            break;
          case "wr":
            drawFig(i, j, wrImage);
            break;
          case "br":
            drawFig(i, j, brImage);
            break;
          case "wq":
            drawFig(i, j, wqImage);
            break;
          case "bq":
            drawFig(i, j, bqImage);
            break;
          case "wh":
            drawFig(i, j, whImage);
            break;
          case "bh":
            drawFig(i, j, bhImage);
            break;
          case "wk":
            drawFig(i, j, wkImage);
            break;
          case "bk":
            drawFig(i, j, bkImage);
            break;
        }
        if (premoveField[i][j] == "p") {
          if (fieldFig[i][j].type == "wk" || fieldFig[i][j].type == "bk") {
            ctx.beginPath();
            ctx.fillStyle = "blue";
            ctx.arc(
              i * sizeSq + sizeSq / 2,
              j * sizeSq + sizeSq / 2,
              sizeSq / 10,
              0,
              2 * Math.PI
            );
            ctx.fill();
          } else {
            ctx.beginPath();
            ctx.fillStyle = "red";
            ctx.arc(
              i * sizeSq + sizeSq / 2,
              j * sizeSq + sizeSq / 2,
              sizeSq / 10,
              0,
              2 * Math.PI
            );
            ctx.fill();
          }
        }
      } else {
        if (premoveField[i][j] == "p") {
          ctx.beginPath();
          ctx.fillStyle = "green";
          ctx.arc(
            i * sizeSq + sizeSq / 2,
            j * sizeSq + sizeSq / 2,
            sizeSq / 10,
            0,
            2 * Math.PI
          );
          ctx.fill();
        }
        // else if (premoveField[i][j] == "i") {
        //   ctx.beginPath();
        //   ctx.fillStyle = "orange";
        //   ctx.arc(
        //     i * sizeSq + sizeSq / 2,
        //     j * sizeSq + sizeSq / 2,
        //     sizeSq / 10,
        //     0,
        //     2 * Math.PI
        //   );
        //   ctx.fill();
        // }
      }
    }
  }
}

function drawFig(x, y, name) {
  ctx.drawImage(name, x * sizeSq, y * sizeSq, sizeSq, sizeSq);
}

//
// Server
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
  fieldFig = a;
};

// RESIZE WINDOW
// let r = document.getElementById("MyBody");
// r.addEventListener("resize", f)
// function f() {
//   console.log("ds;dsopfsdijp");
// }

// window.onresize = f;
