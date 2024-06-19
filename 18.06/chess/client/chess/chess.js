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


let FieldFig = [];

function draw() {
  const canvas = document.getElementById("MyCan");
  const ctx = canvas.getContext("2d");

  drawBoard(ctx, canvas);
  
  window.addEventListener("mousedown", (event) => {
    move(event);
  });

  InitPosition();
  const anim = () => {
    render(ctx);

    window.requestAnimationFrame(anim);
  };

  anim();
}

draw();

function drawBoard(ctx, canvas) {
  let field = [];

  // Class of figures
  let colB = [], colW = [];
  colB.className = "black";
  colW.className = "white";

  let n = 50;

  for (let i = 0; i < 8; i++) {
    field[i] = [];
    for (let j = 0; j < 8; j++) {
      // Lines (vert)
      ctx.beginPath();
      ctx.moveTo(i * n, 0);
      ctx.lineTo(i * n, canvas.clientHeight);
      ctx.lineWidth = 1;
      ctx.stroke();
      //horiz
      ctx.beginPath();
      ctx.moveTo(0, j * n);
      ctx.lineTo(canvas.clientWidth, j * n);
      ctx.lineWidth = 1; 
      ctx.stroke();

      // fields
      if (j % 2 == 0 && i % 2 != 0 || i % 2 == 0 && j % 2 != 0) {
        ctx.beginPath();
        ctx.rect(i * n, j * n, n, n);
        ctx.fill();
        field[i][j] = 'black';
        colB.push(field[i][j]);
        // black[b].className += field[i][j];
        // b++;
      }
      else {
        field[i][j] = 'white';
        colB.push(field[i][j]);
      }
    }
  }
  ctx.beginPath();
  ctx.moveTo(8 * n, 0);
  ctx.lineTo(8 * n, canvas.clientHeight);
  ctx.lineWidth = 1;
  ctx.stroke();
  //horiz
  ctx.beginPath();
  ctx.moveTo(0, 8 * n);
  ctx.lineTo(canvas.clientWidth, 8 * n);
  ctx.lineWidth = 1; 
  ctx.stroke();
}

function move(event) {
  const canvas = document.getElementById("MyCan");

  let rect = canvas.getBoundingClientRect();
  let r = event.clientX -  rect.left;
  let rs = event.clientY - rect.top;
  let x = Math.trunc(r / 50);
  let y = Math.trunc(rs / 50);

  if (x > 7 || y > 7 || x < 0 || y < 0)
    return;
  console.log(`${x} ${y}`);

  if (FieldFig[x][y] != undefined)
    Go(FieldFig[x][y]);
}

function moveCount(event) {
  const canvas = document.getElementById("MyCan");

  let rect = canvas.getBoundingClientRect();
  let r = event.clientX -  rect.left;
  let rs = event.clientY - rect.top;
  let x = Math.trunc(r / 50);
  let y = Math.trunc(rs / 50);

  if (x > 7 || y > 7 || x < 0 || y < 0)
    return;

  let ans = {x, y};
  return ans;
}

function Go(type) {
  window.addEventListener("mousedown", (event) => {
    let add = moveCount(event);
    
    FieldFig[add.x][add.y] = type;
  });
}

function drawFig() {
  // const canvas = document.getElementById("MyCan");
  // const ctx = canvas.getContext("2d");
  // const image = document.getElementById("source");

  // for (let i = 0; i < 8; i++) {
  //   image.addEventListener("load", (e) => {
  //     ctx.drawImage(image, i * 50, 50, 50, 50);
  //   });  
  // }

  // for (let i = 0; i < 8; i++)
  //   for (let j = 0; j < 8; j++) { 
  //     if (FieldFig[i][j])
  //   }
}

// let Figure = [];
// function InitPosition() {
//   for (let i = 0; i < 8; i++) {
//     Figure[];
//   }
// }

function InitPosition() {
  const canvas = document.getElementById("MyCan");
  const ctx = canvas.getContext("2d");

  for (let i = 0; i < 8; i++) {
    FieldFig[i] = [];
    for (let j = 0; j < 8; j++)
      FieldFig[i][j] = 'space';
  }
  
  // Black pawn
  const image0 = document.getElementById("black_pawn");
  for (let i = 0; i < 8; i++) {
    FieldFig[i] = [];
    // image0.addEventListener("load", (e) => {
    //   ctx.drawImage(image0, i * 50, 50, 50, 50);
    // });
    FieldFig[i][1] = 'bp';
  }

  // White pawn
  const image1 = document.getElementById("white_pawn");
  for (let i = 0; i < 8; i++) {
    // image1.addEventListener("load", (e) => {
    //   ctx.drawImage(image1, i * 50, 50 * 6, 50, 50);
    // });
    FieldFig[i][6] = 'wp';
  }
  // Smth else
}

function render(ctx) {
  for (let i = 0; i < 8; i++)
    for (let j = 0; j < 8; j++) {
      if (FieldFig[i][j] != undefined) {
        if (FieldFig[i][j] == 'wp') {
          const image = document.getElementById("white_pawn");

          image.addEventListener("load", (e) => {
            ctx.drawImage(image, i * 50, j * 50, 50, 50);
          });
        }
      }
    }
}