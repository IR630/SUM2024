import { vec3 } from "./mth/vec3.js";
import { mat4 } from "./mth/mat4.js";
import { render } from "./src/anim/rnd/render.js";
import { prim, vertex } from "./src/anim/rnd/rndprim.js";
import { figure } from "./src/figures.js";
import { camera } from "./mth/cam.js";

let rnd;

function main() {
  const canvas = document.getElementById("myCan");
  const gl = canvas.getContext("webgl2");

  if (window.gl == undefined) {
    window.gl = gl
  }
  
  if (gl === null) {
    alert("WebGL2 not supported");
    return;
  }
  
  rnd = new render(canvas);

  let vert = [
    vertex(vec3(-1, -1, 0), vec3(0, 0, 1)),
    vertex(vec3(1, -1, 0), vec3(0, 0, 1)),
    vertex(vec3(1, 1, 0), vec3(0, 0, 1)),
    vertex(vec3(1, -1, 0), vec3(0, 0, 1))
  ]

  //let ind = [0, 1, 2, 2, 3, 0];
  const ind = [
    0, 1, 2, 
    1, 2, 4, 
    1, 4, 7, 
    1, 7, 5, 
    7, 5, 3, 
    7, 3, 6,
    0, 1, 3,
    3, 1, 5,
    6, 3, 0,
    6, 0, 2,
    2, 6, 7,
    2, 7, 4
  ];
  

  //prim = prim(rnd, vert, ind);
  let fig = new figure();

  fig.setTetrahedron();
  let prim = fig.makePrim(rnd);
  
  //let shd = shader("default");
  

  const anim = () => {
    const date = new Date();
    let t =
      date.getMinutes() * 60 +
      date.getSeconds() +
      date.getMilliseconds() / 1000;

    rnd.initGL();
    //prim.render(rnd, m.rotate(t, vec3(0, 1, 0)).mul(m.matrMulMatr(m.matrTranslate(vec3(0, 0, -3)))));
    prim.render(rnd, mat4().rotateY(30 * t).matrMulMatr(mat4().rotateX(30 * t)));

   //console.log("well done");

    window.requestAnimationFrame(anim);
  };

  anim();
}

console.log("CGSG forever!!!");

window.addEventListener("load", () => {
  main();
});
