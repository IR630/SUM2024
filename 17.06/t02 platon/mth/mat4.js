import { vec3 } from "./vec3.js";

class _mat4 {
  constructor(m = null) {
    if (m == null) {
      this.m = [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1],
      ];
    } else if (typeof m == "object" && m.length == 4) {
      this.m = m;
    } else {
      this.m = m.m;
    }
  } // End of 'constructor' function

    toArray() {
      return [].concat(...this.m);
    }

  matrSet(a00, a01, a02, a03, 
          a10, a11, a12, a13,
          a20, a21, a22, a23,
          a30, a31, a32, a33,) {
    let m = mat4();

    m.m = [
      [a00, a01, a02, a03],
      [a10, a11, a12, a13],
      [a20, a21, a22, a23],
      [a30, a31, a32, a33],
    ];

    return m;
  } // End of 'matrSet' function

  determ3x3(a11, a12, a13, a21, a22, a23, a31, a32, a33) {
    return (
      a11 * a22 * a33 +
      a12 * a23 * a31 +
      a13 * a21 * a32 -
      a11 * a23 * a32 -
      a12 * a21 * a33 -
      a13 * a22 * a31
    );
  } // End of 'determ3x3' function

  determ() {
    return (
      +this.m[0][0] *
        this.determ3x3(
          this.m[1][1],
          this.m[1][2],
          this.m[1][3],
          this.m[2][1],
          this.m[2][2],
          this.m[2][3],
          this.m[3][1],
          this.m[3][2],
          this.m[3][3],
        ) +
      -this.m[0][1] *
        this.determ3x3(
          this.m[1][0],
          this.m[1][2],
          this.m[1][3],
          this.m[2][0],
          this.m[2][2],
          this.m[2][3],
          this.m[3][0],
          this.m[3][2],
          this.m[3][3],
        ) +
      +this.m[0][2] *
        this.determ3x3(
          this.m[1][0],
          this.m[1][1],
          this.m[1][3],
          this.m[2][0],
          this.m[2][1],
          this.m[2][3],
          this.m[3][0],
          this.m[3][1],
          this.m[3][3],
        ) +
      -this.m[0][3] *
        this.determ3x3(
          this.m[1][0],
          this.m[1][1],
          this.m[1][2],
          this.m[2][0],
          this.m[2][1],
          this.m[2][2],
          this.m[3][0],
          this.m[3][1],
          this.m[3][2],
        )
    );
  } // End of 'determ' function

  matrTranslate(v) {
    this.m[3][0] = v.x;
    this.m[3][1] = v.y;
    this.m[3][2] = v.z;
    return this.m;
  } // End of 'matrTranslate' function

  matrMulMatr(m1) {
    let r = mat4();

    r.m[0][0] = this.m[0][0] * m1.m[0][0] + this.m[0][1] * m1.m[1][0] + this.m[0][2] * m1.m[2][0] +
    this.m[0][3] * m1.m[3][0];

    r.m[0][1] = this.m[0][0] * m1.m[0][1] + this.m[0][1] * m1.m[1][1] + this.m[0][2] * m1.m[2][1] +
      this.m[0][3] * m1.m[3][1];

    r.m[0][2] = this.m[0][0] * m1.m[0][2] + this.m[0][1] * m1.m[1][2] + this.m[0][2] * m1.m[2][2] +
      this.m[0][3] * m1.m[3][2];

    r.m[0][3] = this.m[0][0] * m1.m[0][3] + this.m[0][1] * m1.m[1][3] + this.m[0][2] * m1.m[2][3] +
      this.m[0][3] * m1.m[3][3];


    r.m[1][0] = this.m[1][0] * m1.m[0][0] + this.m[1][1] * m1.m[1][0] + this.m[1][2] * m1.m[2][0] +
      this.m[1][3] * m1.m[3][0];

    r.m[1][1] = this.m[1][0] * m1.m[0][1] + this.m[1][1] * m1.m[1][1] + this.m[1][2] * m1.m[2][1] +
      this.m[1][3] * m1.m[3][1];

    r.m[1][2] = this.m[1][0] * m1.m[0][2] + this.m[1][1] * m1.m[1][2] + this.m[1][2] * m1.m[2][2] +
      this.m[1][3] * m1.m[3][2];

    r.m[1][3] = this.m[1][0] * m1.m[0][3] + this.m[1][1] * m1.m[1][3] + this.m[1][2] * m1.m[2][3] +
      this.m[1][3] * m1.m[3][3];


    r.m[2][0] = this.m[2][0] * m1.m[0][0] + this.m[2][1] * m1.m[1][0] + this.m[2][2] * m1.m[2][0] +
      this.m[2][3] * m1.m[3][0];

    r.m[2][1] = this.m[2][0] * m1.m[0][1] + this.m[2][1] * m1.m[1][1] + this.m[2][2] * m1.m[2][1] +
      this.m[2][3] * m1.m[3][1];

      
    r.m[2][2] = this.m[2][0] * m1.m[0][2] + this.m[2][1] * m1.m[1][2] + this.m[2][2] * m1.m[2][2] +
      this.m[2][3] * m1.m[3][2];

    r.m[2][3] = this.m[2][0] * m1.m[0][3] + this.m[2][1] * m1.m[1][3] + this.m[2][2] * m1.m[2][3] +
      this.m[2][3] * m1.m[3][3];


    r.m[3][0] = this.m[3][0] * m1.m[0][0] + this.m[3][1] * m1.m[1][0] + this.m[3][2] * m1.m[2][0] +
      this.m[3][3] * m1.m[3][0];

    r.m[3][1] = this.m[3][0] * m1.m[0][1] + this.m[3][1] * m1.m[1][1] + this.m[3][2] * m1.m[2][1] +
      this.m[3][3] * m1.m[3][1];

    r.m[3][2] = this.m[3][0] * m1.m[0][2] + this.m[3][1] * m1.m[1][2] + this.m[3][2] * m1.m[2][2] +
      this.m[3][3] * m1.m[3][2];

    r.m[3][3] = this.m[3][0] * m1.m[0][3] + this.m[3][1] * m1.m[1][3] + this.m[3][2] * m1.m[2][3] +
      this.m[3][3] * m1.m[3][3];

    return r;
  } // End of 'MatrMulMatr' function

  inverse() {
    let r = mat4();
    let det = this.determ();

    if (det == 0) return r;

    r.m[0][0] =
      +this.determ3x3(
        this.m[1][1],
        this.m[1][2],
        this.m[1][3],
        this.m[2][1],
        this.m[2][2],
        this.m[2][3],
        this.m[3][1],
        this.m[3][2],
        this.m[3][3],
      ) / det;

    r.m[1][0] =
      -this.determ3x3(
        this.m[1][0],
        this.m[1][2],
        this.m[1][3],
        this.m[2][0],
        this.m[2][2],
        this.m[2][3],
        this.m[3][0],
        this.m[3][2],
        this.m[3][3],
      ) / det;

    r.m[2][0] =
      +this.determ3x3(
        this.m[1][0],
        this.m[1][1],
        this.m[1][3],
        this.m[2][0],
        this.m[2][1],
        this.m[2][3],
        this.m[3][0],
        this.m[3][1],
        this.m[3][3],
      ) / det;

    r.m[3][0] =
      -this.determ3x3(
        this.m[1][0],
        this.m[1][1],
        this.m[1][2],
        this.m[2][0],
        this.m[2][1],
        this.m[2][2],
        this.m[3][0],
        this.m[3][1],
        this.m[3][2],
      ) / det;

    r.m[0][1] =
      -this.determ3x3(
        this.m[0][1],
        this.m[0][2],
        this.m[0][3],
        this.m[2][1],
        this.m[2][2],
        this.m[2][3],
        this.m[3][1],
        this.m[3][2],
        this.m[3][3],
      ) / det;

    r.m[1][1] =
      +this.determ3x3(
        this.m[0][0],
        this.m[0][2],
        this.m[0][3],
        this.m[2][0],
        this.m[2][2],
        this.m[2][3],
        this.m[3][0],
        this.m[3][2],
        this.m[3][3],
      ) / det;

    r.m[2][1] =
      -this.determ3x3(
        this.m[0][0],
        this.m[0][1],
        this.m[0][3],
        this.m[2][0],
        this.m[2][1],
        this.m[2][3],
        this.m[3][0],
        this.m[3][1],
        this.m[3][3],
      ) / det;

    r.m[3][1] =
      +this.determ3x3(
        this.m[0][0],
        this.m[0][1],
        this.m[0][2],
        this.m[2][0],
        this.m[2][1],
        this.m[2][2],
        this.m[3][0],
        this.m[3][1],
        this.m[3][2],
      ) / det;

    r.m[0][2] =
      +this.determ3x3(
        this.m[0][1],
        this.m[0][2],
        this.m[0][3],
        this.m[1][1],
        this.m[1][2],
        this.m[1][3],
        this.m[3][1],
        this.m[3][2],
        this.m[3][3],
      ) / det;

    r.m[1][2] =
      -this.determ3x3(
        this.m[0][0],
        this.m[0][2],
        this.m[0][3],
        this.m[1][0],
        this.m[1][2],
        this.m[1][3],
        this.m[3][0],
        this.m[3][2],
        this.m[3][3],
      ) / det;

    r.m[2][2] =
      +this.determ3x3(
        this.m[0][0],
        this.m[0][1],
        this.m[0][3],
        this.m[1][0],
        this.m[1][1],
        this.m[1][3],
        this.m[3][0],
        this.m[3][1],
        this.m[3][3],
      ) / det;

    r.m[3][2] =
      -this.determ3x3(
        this.m[0][0],
        this.m[0][1],
        this.m[0][2],
        this.m[1][0],
        this.m[1][1],
        this.m[1][2],
        this.m[3][0],
        this.m[3][1],
        this.m[3][2],
      ) / det;

    r.m[0][3] =
      -this.determ3x3(
        this.m[0][1],
        this.m[0][2],
        this.m[0][3],
        this.m[1][1],
        this.m[1][2],
        this.m[1][3],
        this.m[2][1],
        this.m[2][2],
        this.m[2][3],
      ) / det;

    r.m[1][3] =
      +this.determ3x3(
        this.m[0][0],
        this.m[0][2],
        this.m[0][3],
        this.m[1][0],
        this.m[1][2],
        this.m[1][3],
        this.m[2][0],
        this.m[2][2],
        this.m[2][3],
      ) / det;

    r.m[2][3] =
      -this.determ3x3(
        this.m[0][0],
        this.m[0][1],
        this.m[0][3],
        this.m[1][0],
        this.m[1][1],
        this.m[1][3],
        this.m[2][0],
        this.m[2][1],
        this.m[2][3],
      ) / det;

    r.m[3][3] =
      +this.determ3x3(
        this.m[0][0],
        this.m[0][1],
        this.m[0][2],
        this.m[1][0],
        this.m[1][1],
        this.m[1][2],
        this.m[2][0],
        this.m[2][1],
        this.m[2][2],
      ) / det;

    return r;
  } // End of 'inverse' function

  rotate(Angle, v) {
    let a = (Angle * Math.PI) / 180,
      s = Math.sin(a),
      c = Math.cos(a);

    return this.matrSet(
      c + v.x * v.x * (1 - c),
      v.y * v.x * (1 - c) - v.z * s,
      v.z * v.x * (1 - c) + v.y * s,
      0,
      v.x * v.y * (1 - c) + v.z * s,
      c + v.y * v.y * (1 - c),
      v.z * v.y * (1 - c) - v.x * s,
      0,
      v.x * v.z * (1 - c) - v.y * s,
      v.y * v.z * (1 - c) + v.x * s,
      c + v.z * v.z * (1 - c),
      0,
      0,
      0,
      0,
      1,
    );
  } // End of 'rotate' function

  view(loc, at, up1) {
    let 
      dir = at.sub(loc).normalize(),
      right = dir.cross(up1).normalize(),
      up = right.cross(dir).normalize();
    let m = mat4();

    m.m = 
      [
        [right.x, up.x, -dir.x, 0],
        [right.y, up.y, -dir.y, 0],
        [right.z, up.z, -dir.z, 0],
        [-loc.dot(right), -loc.dot(up), loc.dot(dir), 1],
      ];

    return m;
  } // End of 'view' function

  frustum(l, r, b, t, n, f) {
    return this.matrSet(
      (2 * n) / (r - l),
      0,
      0,
      0,
      0,
      (2 * n) / (t - b),
      0,
      0,
      (r + l) / (r - l),
      (t + b) / (t - b),
      -((f + n) / (f - n)),
      -1,
      0,
      0,
      -((2 * n * f) / (f - n)),
      0,
    );
  } // End of 'frustum' function

  transpose() {
    return this.matrSet(
      this.m[0][0],
      this.m[1][0],
      this.m[2][0],
      this.m[3][0],
      this.m[0][1],
      this.m[1][1],
      this.m[2][1],
      this.m[3][1],
      this.m[0][2],
      this.m[1][2],
      this.m[2][2],
      this.m[3][2],
      this.m[0][3],
      this.m[1][3],
      this.m[2][3],
      this.m[3][3],
    );
  } // End of 'transpose' function

  rotateX(Angle) {
    let a = (Angle * Math.PI) / 180,
      si = Math.sin(a),
      co = Math.cos(a);

    return this.matrSet(1, 0, 0, 0, 0, co, si, 0, 0, -si, co, 0, 0, 0, 0, 1);
  } // End of 'rotateX' function

  rotateY(Angle) {
    let a = (Angle * Math.PI) / 180,
      si = Math.sin(a),
      co = Math.cos(a);

    return this.matrSet(co, 0, -si, 0, 0, 1, 0, 0, si, 0, co, 0, 0, 0, 0, 1);
  } // End of 'rotateY

  rotateZ(Angle) {
    let a = (Angle * Math.PI) / 180,
      si = Math.sin(a),
      co = Math.cos(a);

    return this.matrSet(co, si, 0, 0, -si, co, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  } // End of 'rotateZ

  scale(v) {
    return this.matrSet(v.x, 0, 0, 0, 0, v.y, 0, 0, 0, 0, v.z, 0, 0, 0, 0, 1);
  } // End of 'scale'

  ortho(l, r, b, t, n, f) {
    return this.matrSet(
      2 / (r - l),
      0,
      0,
      0,
      0,
      2 / (t - b),
      0,
      0,
      0,
      0,
      -2 / (f - n),
      0,
      -(r + l) / (r - l),
      -(t + b) / (t - b),
      -(f + n) / (f - n),
      1,
    );
  } // End of 'ortho' function

} // End of '_mat4' function

export function mat4(...args) {
  return new _mat4(...args);
} // End of 'mat4' function
