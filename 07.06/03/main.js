import { vec3 } from "./mth/vec3.js";
import { mat4 } from "./mth/mat4.js";
import { shader } from "./src/anim/rnd/shader_class_pattern.js";
import { render, initGL } from "./src/anim/rnd/render.js";

function main() {
  if (window.gl == undefined) {
    let canvas = document.getElementById("myCan");
    window.gl = canvas.getContext("webgl2");
  }

  if (gl === null) {
    alert("WebGL2 not supported");
    return;
  }

  initGL();
  gl.clearColor(1, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  //let shd = shader("default");

  const anim = () => {
    gl.clear(gl.COLOR_BUFFER_BIT);
    window.requestAnimationFrame(anim);
  };

  anim();
}

console.log("CGSG forever!!!");

window.addEventListener("load", () => {
  main();
});
