import { vec3 } from "./mth/vec3.js";
import { mat4 } from "./mth/mat4.js";
import { shader } from "./src/anim/rnd/shader_class_pattern.js";
import { camera } from "./mth/cam.js";
import { render, initGL } from "./src/anim/rnd/render.js";
import { setCube } from "./src/figure/figures.js";
import { prim } from "./src/anim/rnd/rndprim.js";
import { vertex } from "./src/anim/rnd/rndprim.js";

function main() {
  const canvas = document.querySelector("#myCan");
  const gl = canvas.getContext("webgl2");

  if (window.gl == undefined) {
    window.gl = gl;
  }

  if (gl === null) {
    alert("WebGL2 not supported");
    return;
  }

  //initGL();
  //loadSh
  gl.enable(gl.DEPTH_TEST);
  
  gl.clearColor(0.30, 0.47, 0.8, 1.0);
  let shd  = shader("default");

  const cam = camera();
  
  cam.frameW = canvas.clientWidth;
  cam.frameH = canvas.clientHeight;
  cam.projDist = 0.1;
  cam.projSize = 0.1;
  cam.projFarClip = 300;

  cam.camSet(vec3(0, 0, 4), vec3(0), vec3(0, 1, 0));
  cam.camSetProj(0.1, 0.1, 300);

  // let ind = [
  //   0, 1, 2, 
  //   1, 2, 4, 
  //   1, 4, 7, 
  //   1, 7, 5, 
  //   7, 5, 3, 
  //   7, 3, 6,
  //   0, 1, 3,
  //   3, 1, 5,
  //   6, 3, 0,
  //   6, 0, 2,
  //   2, 6, 7,
  //   2, 7, 4
  // ];


  // let vert = setCube();

  // let verts = [];
  // for (let i of ind) {
  //   let vrtx = vertex(vert[i].pos);
  //   verts.push(vrtx);
  // }

  
  let prims = prim(shd, setCube());

  shd.apply();

  const anim = () => {
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.clear(gl.DEPTH_BUFFER_BIT);

    const date = new Date();
    let t = date.getMinutes() * 60 +
          date.getSeconds() +
          date.getMilliseconds() / 1000;

    prims.render(mat4().rotateY(30 * t).matrMulMatr(mat4().rotateX(30 * t)), cam);
    //prims.render(mat4(), cam);

    window.requestAnimationFrame(anim);
  };

  anim();
}

console.log("CGSG forever!!!");

window.addEventListener("load", () => {
  main();
});
