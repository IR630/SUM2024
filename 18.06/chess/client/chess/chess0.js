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
    // if (UserName == "vano") drawBoard();
    // else drawBoardBlack();
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

function drawBoardBlack() {
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
        ctx.fillStyle = "white";
        ctx.rect(i * sizeSq, j * sizeSq, sizeSq, sizeSq);
        ctx.fill();
        colB.push(field[i][j]);
      } else {
        field[i][j] = "white";
        ctx.beginPath();
        ctx.fillStyle = "purple";
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
        //dangerSq(x, y, fieldFig[x][y]);
        //if (premoveField[x][y] == "o") alert("Shah");
        //closePredict();
        fieldFig[move.pos.x][move.pos.y].color = "none";
        fieldFig[move.pos.x][move.pos.y].type = "none";
        move.isRedact = false;
        let a = { con: fieldFig };
        socket.send(JSON.stringify(a));
      }
      move.turn = !move.turn;
      return;
    } else {
      if (move.isRedact) {
        move.isRedact = false;
        closePredict();
        return;
      }
    }

    if (
      (move.turn && fieldFig[x][y].color == "w") ||
      (!move.turn && fieldFig[x][y].color == "b")
    )
      move.isRedact = true;
    else return;
  } else if (fieldFig[x][y].type == "none" && premoveField[x][y] != "p") {
    return;
  } else {
    let flag = "none";

    if (move.isRedact) {
      let oldColor, oldType;
      oldColor = fieldFig[move.pos.x][move.pos.y].color;
      oldType = fieldFig[move.pos.x][move.pos.y].type;

      flag = moveChess(x, y, move.oldArr.type);
      fieldFig[move.pos.x][move.pos.y].color = "none";
      fieldFig[move.pos.x][move.pos.y].type = "none";
      if (flag == true) {
        let flagMove;
        let col;
        if (move.turn) col = "bk";
        else col = "wk";

        let qu = kingDangerForMe(x, y, fieldFig[x][y]);
        if (qu == false) {
          fieldFig[move.pos.x][move.pos.y].color = oldColor;
          fieldFig[move.pos.x][move.pos.y].type = oldType;
          fieldFig[x][y].type = "none";
          fieldFig[x][y].color = "none";

          alert("qu return");
          return;
        }
        // let ququ = kingDangerForOther(x, y, fieldFig[x][y]);
        // if (ququ == false) {
        //   alert("ququ return");
        //   return;
        // }
        flagMove = canMove(fieldFig[x][y].color);
        if (!flagMove) return;
        //premoveField[x - j][y - i] = "o";
        //checkKing(col);
        closePredict(); ///

        fieldFig[move.pos.x][move.pos.y].type = "none";
        fieldFig[move.pos.x][move.pos.y].color = "none";
        move.turn = !move.turn;
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

  if (move.isRedact) {
    predictMove(move.pos.x, move.pos.y, fieldFig[move.pos.x][move.pos.y], 1);
    // !!! for not predict if u cant
    // let oldType = fieldFig[x][y].type;
    //let oldColor = fieldFig[x][y].color;
    //predictMove(move.pos.x, move.pos.y, fieldFig[move.pos.x][move.pos.y], 1);
    //moveChess(x, y, fieldFig[x][y]);
    // uslovnoMove(x, y, fieldFig[x][y]);
    // let qu = kingDangerForMe(x, y, fieldFig[x][y]);
    // if (qu == false) {
    //   closePredict();
    //   return;
    // } else {
    //   fieldFig[x][y].type = oldType;
    //   fieldFig[x][y].color = oldColor;
    // }
    // return;
  }

  let a = { con: fieldFig };
  socket.send(JSON.stringify(a));
}

function uslovnoMove(x, y, type) {
  fieldFig[x][y].type = "none";
  fieldFig[x][y].color = "none";
}

function canMove(color) {
  let fig;

  if ((color = "w")) fig = "bk";
  else fig = "wk";

  let a = true;

  for (let i = 0; i < 8; i++)
    for (let j = 0; j < 8; j++) {
      if (premoveField[i][j] == "o" && fieldFig[i][j] == fig) a = false;
    }

  if (a) return true;
  else return false;
}

function kingDangerForMe(x, y, type) {
  let r, c;
  let color = colorFromType(type.type);

  if (color == "w") color = "wk";
  else color = "bk";

  predictMove(x, y, type, 0);

  // Find king
  for (let i = 0; i < 8; i++)
    for (let j = 0; j < 8; j++) {
      if (fieldFig[i][j].type == color) {
        r = i;
        c = j;
      }
    }

  dangerSq(r, c, fieldFig[r][c]);

  if (premoveField[r][c] == "o") {
    alert("U cant");
    return false;
  } else return true;
}

function kingDangerForOther(x, y, type) {
  let r, c;
  let color = colorFromType(type.type);

  // anti type !!
  if (color == "w") color = "bk";
  else color = "wk";

  predictMove(x, y, type, 0);

  for (let i = 0; i < 8; i++)
    for (let j = 0; j < 8; j++) {
      if (fieldFig[i][j].type == color) {
        r = i;
        c = j;
      }
    }

  dangerSq(r, c, fieldFig[r][c]);

  if (premoveField[r][c] == "o") {
    alert("SHAh");
    return false;
  } else return true;
}

function checkKing(type) {
  let x, y;
  let flag = true;

  for (let i = 0; i < 8; i++)
    for (let j = 0; j < 8; j++) {
      if (fieldFig[i][j].type == type) {
        x = i;
        y = j;
      }
    }
  if (premoveField[x][y] == "o") alert("SHAh");
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
      else {
        if (
          fieldFig[x + i][y + j].type == "wk" ||
          fieldFig[x + i][y + j].type == "bk"
        )
          premoveField[x + i][y + j] = "o";
        else dangerField[x + i][y + j] = "i";
      }
    }
  }
  if (x + j < 8 && y + i < 8) {
    if (fieldFig[x + j][y + i].color != type.color) {
      if (predict) premoveField[x + j][y + i] = "p";
      else {
        if (
          fieldFig[x + j][y + i].type == "wk" ||
          fieldFig[x + j][y + i].type == "bk"
        )
          premoveField[x + j][y + i] = "o";
        else dangerField[x + j][y + i] = "i";
      }
    }
  }
  if (x - i >= 0 && y + j < 8) {
    if (fieldFig[x - i][y + j].color != type.color) {
      if (predict) premoveField[x - i][y + j] = "p";
      else {
        if (
          fieldFig[x - i][y + j].type == "wk" ||
          fieldFig[x - i][y + j].type == "bk"
        )
          premoveField[x - i][y + j] = "o";
        else dangerField[x - i][y + j] = "i";
      }
    }
  }
  if (x - j >= 0 && y + i < 8) {
    if (fieldFig[x - j][y + i].color != type.color) {
      if (predict) premoveField[x - j][y + i] = "p";
      else {
        if (
          fieldFig[x - j][y + i].type == "wk" ||
          fieldFig[x - j][y + i].type == "bk"
        )
          premoveField[x - j][y + i] = "o";
        else dangerField[x - j][y + i] = "i";
      }
    }
  }
  if (x + i < 8 && y - j >= 0) {
    if (fieldFig[x + i][y - j].color != type.color) {
      if (predict) premoveField[x + i][y - j] = "p";
      else {
        if (
          fieldFig[x + i][y - j].type == "wk" ||
          fieldFig[x + i][y - j].type == "bk"
        )
          premoveField[x + i][y - j] = "o";
        else dangerField[x + i][y - j] = "i";
      }
    }
  }
  if (x + j < 8 && y - i >= 0) {
    if (fieldFig[x + j][y - i].color != type.color) {
      if (predict) premoveField[x + j][y - i] = "p";
      else {
        if (
          fieldFig[x + j][y - i].type == "wk" ||
          fieldFig[x + j][y - i].type == "bk"
        )
          premoveField[x + j][y - i] = "o";
        else dangerField[x + j][y - i] = "i";
      }
    }
  }
  if (x - i >= 0 && y - j >= 0) {
    if (fieldFig[x - i][y - j].color != type.color) {
      if (predict) premoveField[x - i][y - j] = "p";
      else {
        if (
          fieldFig[x - i][y - j].type == "wk" ||
          fieldFig[x - i][y - j].type == "bk"
        )
          premoveField[x - i][y - j] = "o";
        else dangerField[x - i][y - j] = "i";
      }
    }
  }
  if (x - j >= 0 && y - i >= 0) {
    if (fieldFig[x - j][y - i].color != type.color) {
      if (predict) premoveField[x - j][y - i] = "p";
      else {
        if (
          fieldFig[x - j][y - i].type == "wk" ||
          fieldFig[x - j][y - i].type == "bk"
        )
          premoveField[x - j][y - i] = "o";
        else dangerField[x - j][y - i] = "i";
      }
    }
  }
}

function kingMove(x, y, type, predict) {
  rookMove(x, y, type, predict);
  bishopMove(x, y, type, predict);
  dangerSq(x, y, type);

  // let arr = [];
  // let bool = true;
  for (let i = 0; i < 8; i++)
    for (let j = 0; j < 8; j++)
      if (premoveField[i][j] == "p" && dangerField[i][j] == "i") {
        if (premoveField[x][y] == "o") alert("Shah from king");
        premoveField[i][j] = "";
      }

  // if (premoveField[x][y] == "o") alert("SHAH");

  // if (arr.length == 0) alert("u lost sorry");
  // else {
  //   for (let i = 0; i < arr.length; i++) {}
  // }
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
  let crown;
  if (fieldFig[x][y].color == "w") crown = "bk";
  else crown = "wk";

  while (x + i < 8) {
    if (predict) {
      if ((type.type == "wk" || type.type == "bk") && i != 1) break;
      if (fieldFig[x + i][y].type == "none") {
        premoveField[x + i][y] = "p";
      } else if (
        fieldFig[x + i][y].color == antiColor(type.color) &&
        fieldFig[x + i][y].type != crown
      ) {
        premoveField[x + i][y] = "p";
        break;
      } else if (fieldFig[x + i][y].type == crown) premoveField[x + i][y] = "o";
      else break;
      i++;
    } else {
      // King move

      if (fieldFig[x + i][y].type == "none") dangerField[x + i][y] = "i";
      else if (fieldFig[x + i][y].type == crown) premoveField[x + i][y] = "o";
      else if (fieldFig[x + i][y].color == type.color) break;
      i++;
    }
  }

  i = 1;
  while (x - i >= 0) {
    if (predict) {
      if ((type.type == "wk" || type.type == "bk") && i != 1) break;
      if (fieldFig[x - i][y].type == "none") premoveField[x - i][y] = "p";
      else if (fieldFig[x - i][y].color == antiColor(type.color)) {
        premoveField[x - i][y] = "p";
        break;
      } else break;
      i++;
    } else {
      // King move

      if (fieldFig[x - i][y].type == "none") dangerField[x - i][y] = "i";
      else if (fieldFig[x - i][y] == crown) premoveField[x - i][y] = "o";
      else if (fieldFig[x - i][y].color == type.color) break;
      else break;
      i++;
    }
  }

  i = 1;
  while (y + i < 8) {
    if (predict) {
      if ((type.type == "wk" || type.type == "bk") && i != 1) break;
      if (fieldFig[x][y + i].type == "none") premoveField[x][y + i] = "p";
      else if (fieldFig[x][y + i].color == antiColor(type.color)) {
        premoveField[x][y + i] = "p";
        break;
      } else break;
      i++;
    } else {
      // King move

      if (fieldFig[x][y + i].type == "none") dangerField[x][y + i] = "i";
      else if (fieldFig[x][y + i].type == crown) premoveField[x][y + i] = "o";
      else if (fieldFig[x][y + i].color == type.color) break;
      else break;
      i++;
    }
  }

  i = 1;
  while (y - i >= 0) {
    if (predict) {
      if ((type.type == "wk" || type.type == "bk") && i != 1) break;
      if (fieldFig[x][y - i].type == "none") premoveField[x][y - i] = "p";
      else if (fieldFig[x][y - i].color == antiColor(type.color)) {
        premoveField[x][y - i] = "p";
        break;
      } else break;
      i++;
    } else {
      // King move

      if (fieldFig[x][y - i].type == "none") dangerField[x][y - i] = "i";
      else if (fieldFig[x][y - i].type == crown) premoveField[x][y - i] = "o";
      else if (fieldFig[x][y - i].color == type.color) break;
      else break;
      i++;
    }
  }
}

function bishopMove(x, y, type, predict) {
  let i = 1;
  let crown;
  if (fieldFig[x][y].color == "w") crown = "bk";
  else crown = "wk";

  while (x + i < 8 && y + i < 8) {
    if (predict) {
      if ((type.type == "wk" || type.type == "bk") && i != 1) break;
      if (fieldFig[x + i][y + i].type == "none")
        premoveField[x + i][y + i] = "p";
      else if (fieldFig[x + i][y + i].color == antiColor(type.color)) {
        premoveField[x + i][y + i] = "p";
        break;
      } else break;
      i++;
    } else {
      if (fieldFig[x + i][y + i].type == "none")
        dangerField[x + i][y + i] = "i";
      else if (fieldFig[x + i][y + i].type == crown)
        premoveField[x + i][y + i] = "o";
      else if (fieldFig[x + i][y + i].color == type.color) break;
      else break;
      i++;
    }
  }

  i = 1;
  while (x - i >= 0 && y - i >= 0) {
    if (predict) {
      if ((type.type == "wk" || type.type == "bk") && i != 1) break;
      if (fieldFig[x - i][y - i].type == "none")
        premoveField[x - i][y - i] = "p";
      else if (fieldFig[x - i][y - i].color == antiColor(type.color)) {
        premoveField[x - i][y - i] = "p";
        break;
      } else break;
      i++;
    } else {
      if (fieldFig[x - i][y - i].type == "none")
        dangerField[x - i][y - i] = "i";
      else if (fieldFig[x - i][y - i].type == crown)
        premoveField[x - i][y - i] = "o";
      else if (fieldFig[x - i][y - i].color == type.color) break;
      else break;
      i++;
    }
  }

  i = 1;
  while (x - i >= 0 && y + i < 8) {
    if (predict) {
      if ((type.type == "wk" || type.type == "bk") && i != 1) break;
      if (fieldFig[x - i][y + i].type == "none")
        premoveField[x - i][y + i] = "p";
      else if (fieldFig[x - i][y + i].color == antiColor(type.color)) {
        premoveField[x - i][y + i] = "p";
        break;
      } else break;
      i++;
    } else {
      if (fieldFig[x - i][y + i].type == "none")
        dangerField[x - i][y + i] = "i";
      else if (fieldFig[x - i][y + i].type == crown)
        premoveField[x - i][y + i] = "o";
      else if (fieldFig[x - i][y + i].color == type.color) break;
      else break;
      i++;
    }
  }

  i = 1;
  while (x + i < 8 && y - i >= 0) {
    if (predict) {
      if ((type.type == "wk" || type.type == "bk") && i != 1) break;
      if (fieldFig[x + i][y - i].type == "none")
        premoveField[x + i][y - i] = "p";
      else if (fieldFig[x + i][y - i].color == antiColor(type.color)) {
        premoveField[x + i][y - i] = "p";
        break;
      } else break;
      i++;
    } else {
      if (fieldFig[x + i][y - i].type == "none")
        dangerField[x + i][y - i] = "i";
      else if (fieldFig[x + i][y - i].type == crown)
        premoveField[x + i][y - i] = "o";
      else if (fieldFig[x + i][y - i].color == type.color) break;
      else break;
      i++;
    }
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
        dangerField[x - 1][y - 1] = "i";
    if (x + 1 < 8 && y - 1 >= 0)
      if (fieldFig[x + 1][y - 1].color == "b" && predict)
        premoveField[x + 1][y - 1] = "p";
      else if (fieldFig[x + 1][y - 1].type == "none" && !predict)
        dangerField[x + 1][y - 1] = "i";
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
      else if (fieldFig[x + 1][y + 1].type == "wk")
        premoveField[x + 1][y + 1] = "o";
    }
    if (x - 1 >= 0 && y + 1 < 8) {
      if (fieldFig[x - 1][y + 1].color == "w" && predict)
        premoveField[x - 1][y + 1] = "p";
      else if (fieldFig[x - 1][y + 1].type == "none" && !predict)
        premoveField[x - 1][y + 1] = "i";
      else if (fieldFig[x - 1][y + 1].type == "wk")
        premoveField[x - 1][y + 1] = "o";
    }
  }
}

function closePredict() {
  for (let i = 0; i < 8; i++)
    for (let j = 0; j < 8; j++) {
      premoveField[i][j] = "";
      dangerField[i][j] = "";
    }
}

function moveChess(x, y, type) {
  if (premoveField[x][y] == "p") {
    fieldFig[x][y].type = type;
    fieldFig[x][y].color = colorFromType(type);
  } else {
    return false;
  }
  //closePredict();
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
      dangerField[i][j] = "";
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

function colorFromType(type) {
  switch (type) {
    case "wp":
    case "wb":
    case "wh":
    case "wr":
    case "wk":
    case "wq":
      return "w";
    default:
      return "b";
  }
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
