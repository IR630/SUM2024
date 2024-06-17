import { mat4 } from "./mat4.js";
import { vec3 } from "./vec3.js";

class _camera {
  loc = vec3();
  at = vec3();
  dir = vec3();
  right = vec3();
  up = vec3();
  matrView = mat4(); 
  matrProj = mat4(); 
  matrVP = mat4();
  frameW;
  frameH;
  wp;
  hp;
  projSize;
  projDist;
  projFarClip;

  camSet(loc, at, up) {
    this.matrView = mat4().view(loc, at, up);

    this.right = vec3(this.matrView.m[0][0],
                      this.matrView.m[1][0],
                      this.matrView.m[2][0]);

    this.up = vec3(this.matrView.m[0][1],
                   this.matrView.m[1][1],
                   this.matrView.m[2][1]);
                  
    this.dir = vec3(-this.matrView.m[0][2],
                    -this.matrView.m[1][2],
                    -this.matrView.m[2][2]);
                    

    this.loc = loc;
    this.at = at;
    this.matrVP = this.matrView.matrMulMatr(this.matrProj);
  } // End of 'camSet' function

  camSetProj(projSize, projDist, projFarClip) {
    let rx, ry;

    this.projDist = projDist;
    this.projFarClip = projFarClip;
    rx = ry = this.projSize = projSize;

    /* Correct aspect ratio */
    if (this.frameW >= this.frameH)
      rx *= this.frameW / this.frameH;
    else
      ry *= this.frameH / this.frameW;

    this.wp = rx;
    this.hp = ry;
    this.matrProj =
      mat4().frustum(-rx / 2, rx / 2, -ry / 2, ry / 2,
        this.projDist, this.projFarClip);
    this.MatrVP = this.matrView.matrMulMatr(this.matrProj);
  } // End of 'camSetProj' function
  camSetSize(frameW, frameH) {
    this.frameW = frameW;
    this.frameH = frameH;
    this.setProj(this.projSize, this.projDist, this.projFarClip);
  } // End of 'camSetSize' function
} 

export function camera(...args) {
  return new _camera(...args);
}

