(function () {
  'use strict';

  class _vec3 {
    constructor(x, y, z) {
      if (x == undefined) (this.x = 0), (this.y = 0), (this.z = 0);
      else if (typeof x == "object")
        if (x.lenght == 3) (this.x = x[0]), (this.y = x[1]), (this.z = x[2]);
        else (this.x = x.x), (this.y = x.y), (this.z = x.z);
      else if (y == undefined || z == undefined)
        (this.x = x), (this.y = x), (this.z = x);
      else (this.x = x), (this.y = y), (this.z = z);
    } // End of 'constructor' function

    add(v) {
      if (typeof v == "number") {
        return vec3(this.x + v, this.y + v, this.z + v);
      }
      return vec3(this.x + v.x, this.y + v.y, this.z + v.z);
    } // End of 'add' function

    sub(v) {
      if (typeof v == "number") {
        return vec3(this.x - v, this.y - v, this.z - v);
      }
      return vec3(this.x - v.x, this.y - v.y, this.z - v.z);
    } // End of 'sub' function

    dot(v) {
      if (typeof v == "number") {
        return vec3(this.x * v, this.y * v, this.z * v);
      }
      return this.x * v.x + this.y * v.y + this.z * v.z;
    } // End of 'dot' function

    divNum(v) {
      return vec3(this.x / v, this.y / v, this.z / v);
    } // End of 'divNum' function

    len() {
      let v = vec3(this.x, this.y, this.z);
      let len = this.dot(v, v); 

      if (len == 1 || len == 0) {
        return len;
      }
      return Math.sqrt(len);
    } // End of 'len' function

    len2() {
      let v = vec3(this.x, this.y, this.z);

      return this.dot(v, v);
    } // End of 'len' function

    neg() {
      return vec3(-this.x, -this.y, -this.z);
    } // End of 'neg' function

    normalize() {
      let len = this.dot(this);

      if (len != 0 && len != 1) {
        len = Math.sqrt(len);
        return this.divNum(len);
      }
      return this;
    } // End of 'normalize' function

    transform(m) {
      return vec3(
        this.x * m.m[0][0] + this.y * m.m[1][0] + this.z * m.m[2][0],
        this.x * m.m[0][1] + this.y * m.m[1][1] + this.z * m.m[2][1],
        this.x * m.m[0][2] + this.y * m.m[1][2] + this.z * m.m[2][2]
      );
    } // End of 'transform' function

    MulMatr(m) {
      let w =
        this.x * m.m[0][3] +
        this.y * m.m[1][3] +
        this.z * m.m[2][3] +
        this.m[3][3];

      return vec3(
        (this.x * m.m[0][0] +
          this.y * m.m[1][0] +
          this.z * m.m[2][0] +
          m.m[3][0]) /
          w,
        (this.x * m.m[0][1] +
          this.y * m.m[1][1] +
          this.z * m.m[2][1] +
          m.m[3][1]) /
          w,
        (this.x * m.m[0][2] +
          this.y * m.m[1][2] +
          this.z * m.m[2][2] +
          m.m[3][2]) /
          w
      );
    } // End of 'vecMulMatr' function

    cross(v) {
      return vec3(this.y * v.z - this.z * v.y,
        this.z * v.x - this.x * v.z,
        this.x * v.y - this.y * v.x);
    } // End of 'vecCrossVec' function

    pointTransform(m) {
      vec3Set(
        this.x * m.m[0][0] + this.y * m.m[1][0] + this.z * m.m[2][0] + m.m[3][0],
        this.x * m.m[0][1] + this.y * m.m[1][1] + this.z * m.m[2][1] + m.m[3][1],
        this.x * m.m[0][2] + this.y * m.m[1][2] + this.z * m.m[2][2] + m.m[3][2]
      );
    } // End of 'pointTransfrom' function
  } // End of '_vec3' class function

  function vec3(...args) {
    return new _vec3(...args);
  } // End of 'vec3' function

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

      r.m[0][0] =
        this.m[0][0] * m1.m[0][0] +
        this.m[0][1] * m1.m[1][0] +
        this.m[0][2] * m1.m[2][0] +
        this.m[0][3] * m1.m[3][0];
      r.m[0][1] =
        this.m[0][0] * m1.m[0][1] +
        this.m[0][1] * m1.m[1][1] +
        this.m[0][2] * m1.m[2][1] +
        this.m[0][3] * m1.m[3][1];
      r.m[0][2] =
        this.m[0][0] * m1.m[0][2] +
        this.m[0][1] * m1.m[1][2] +
        this.m[0][2] * m1.m[2][2] +
        this.m[0][3] * m1.m[3][2];
      r.m[0][3] =
        this.m[0][0] * m1.m[0][3] +
        this.m[0][1] * m1.m[1][3] +
        this.m[0][2] * m1.m[2][3] +
        this.m[0][3] * m1.m[3][3];
      r.m[1][0] =
        this.m[1][0] * m1.m[0][0] +
        this.m[1][1] * m1.m[1][0] +
        this.m[1][2] * m1.m[2][0] +
        this.m[1][3] * m1.m[3][0];
      r.m[1][1] =
        this.m[1][0] * m1.m[0][1] +
        this.m[1][1] * m1.m[1][1] +
        this.m[1][2] * m1.m[2][1] +
        this.m[1][3] * m1.m[3][1];
      r.m[1][2] =
        this.m[1][0] * m1.m[0][2] +
        this.m[1][1] * m1.m[1][2] +
        this.m[1][2] * m1.m[2][2] +
        this.m[1][3] * m1.m[3][2];
      r.m[1][3] =
        this.m[1][0] * m1.m[0][3] +
        this.m[1][1] * m1.m[1][3] +
        this.m[1][2] * m1.m[2][3] +
        this.m[1][3] * m1.m[3][3];
      r.m[2][0] =
        this.m[2][0] * m1.m[0][0] +
        this.m[2][1] * m1.m[1][0] +
        this.m[2][2] * m1.m[2][0] +
        this.m[2][3] * m1.m[3][0];
      r.m[2][1] =
        this.m[2][0] * m1.m[0][1] +
        this.m[2][1] * m1.m[1][1] +
        this.m[2][2] * m1.m[2][1] +
        this.m[2][3] * m1.m[3][1];
      r.m[2][2] =
        this.m[2][0] * m1.m[0][2] +
        this.m[2][1] * m1.m[1][2] +
        this.m[2][2] * m1.m[2][2] +
        this.m[2][3] * m1.m[3][2];
      r.m[2][3] =
        this.m[2][0] * m1.m[0][3] +
        this.m[2][1] * m1.m[1][3] +
        this.m[2][2] * m1.m[2][3] +
        this.m[2][3] * m1.m[3][3];
      r.m[3][0] =
        this.m[3][0] * m1.m[0][0] +
        this.m[3][1] * m1.m[1][0] +
        this.m[3][2] * m1.m[2][0] +
        this.m[3][3] * m1.m[3][0];
      r.m[3][1] =
        this.m[3][0] * m1.m[0][1] +
        this.m[3][1] * m1.m[1][1] +
        this.m[3][2] * m1.m[2][1] +
        this.m[3][3] * m1.m[3][1];
      r.m[3][2] =
        this.m[3][0] * m1.m[0][2] +
        this.m[3][1] * m1.m[1][2] +
        this.m[3][2] * m1.m[2][2] +
        this.m[3][3] * m1.m[3][2];
      r.m[3][3] =
        this.m[3][0] * m1.m[0][3] +
        this.m[3][1] * m1.m[1][3] +
        this.m[3][2] * m1.m[2][3] +
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
          [-loc.dot(right), -loc.dot(loc), loc.dot(dir), 1],
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

  function mat4(...args) {
    return new _mat4(...args);
  } // End of 'mat4' function

  // Shader class
  class _shader {
    async _init(name) {
      this.name = name;
      this.id = null;
      this.shaders =
      [
         {
           id: null,
           type: gl.VERTEX_SHADER,
           name: "vert",
           src: "",
         },
         {
          id: null,
          type: gl.FRAGMENT_SHADER,
          name: "frag",
          src: "",
        }
      ];
      for (const s of this.shaders) {
        let response = await fetch(`bin/shaders/${name}/${s.name}.glsl`);
        let src = await response.text();
        if (typeof src == "string" && src != "")
          s.src = src;
      }
      // recompile shaders
      this.updateShadersSource();
    }
    staticInit(name) {
      this.name = name;
      this.id = null;
      this.shaders =
      [
         {
           id: null,
           type: gl.VERTEX_SHADER,
           name: "vert",
           src: "",
         },
         {
          id: null,
          type: gl.FRAGMENT_SHADER,
          name: "frag",
          src: "",
        }
      ];
      let vs_txt =
      `#version 300 es
    precision highp float;
    in vec3 InPosition;
    in vec3 InNormal;

    uniform mat4 MatrWVP;
    uniform mat4 MatrWInv;

    out vec3 DrawNormal;
    
    void main( void )
    {
      gl_Position = MatrWVP * vec4(InPosition, 1);
      DrawNormal = normalize(mat3(MatrWInv) * InNormal);
    }
    `;
      let fs_txt =
      `#version 300 es
    precision highp float;
    in vec3 DrawNormal;

    uniform float Time;
    uniform mat4 MatrWVP;

    out vec4 OutColor;
    
    void main( void )
    {
      vec3 L = vec3(0, 0, 2);
      vec3 N = normalize(faceforward(DrawNormal, -L, DrawNormal));
      vec3 col = vec3(0.8, 0.47, 0.30) * dot(N, L);
      OutColor = vec4(col, 1.0);
    }
    `;
      this.shaders[0].src = vs_txt;
      this.shaders[1].src = fs_txt;
      // recompile shaders
      this.updateShadersSource();
    }                     
    updateShadersSource() { 
      this.shaders[0].id = null;
      this.shaders[1].id = null;
      this.id = null;
      if (this.shaders[0].src == "" || this.shaders[1].src == "")
        return;
      this.shaders.forEach(s => {
        s.id = gl.createShader(s.type);
        gl.shaderSource(s.id, s.src);
        gl.compileShader(s.id);
        if (!gl.getShaderParameter(s.id, gl.COMPILE_STATUS)) {
          let buf = gl.getShaderInfoLog(s.id);
          console.log(`Shader ${this.name}/${s.name} compile fail: ${buf}`);
        }                                            
      });             
      this.id = gl.createProgram();
      this.shaders.forEach(s => {
        if (s.id != null)
          gl.attachShader(this.id, s.id);
      });
      gl.linkProgram(this.id);
      if (!gl.getProgramParameter(this.id, gl.LINK_STATUS)) {
        let buf = gl.getProgramInfoLog(this.id);
        console.log(`Shader program ${this.name} link fail: ${buf}`);
      }                                            
      this.updateShaderData();    
    } 
    updateShaderData() {
      // Shader attributes
      this.attrs = {};
      const countAttrs = gl.getProgramParameter(this.id, gl.ACTIVE_ATTRIBUTES);
      for (let i = 0; i < countAttrs; i++) {
        const info = gl.getActiveAttrib(this.id, i);
        this.attrs[info.name] = {
          name: info.name,
          type: info.type,
          size: info.size,
          loc: gl.getAttribLocation(this.id, info.name),
        };
      }
   
      // Shader uniforms
      this.uniforms = {};
      const countUniforms = gl.getProgramParameter(this.id, gl.ACTIVE_UNIFORMS);
      for (let i = 0; i < countUniforms; i++) {
        const info = gl.getActiveUniform(this.id, i);
        this.uniforms[info.name] = {
          name: info.name,
          type: info.type,
          size: info.size,
          loc: gl.getUniformLocation(this.id, info.name),
        };
      }
   
      // Shader uniform blocks
      this.uniformBlocks = {};
      const countUniformBlocks = gl.getProgramParameter(this.id, gl.ACTIVE_UNIFORM_BLOCKS);
      for (let i = 0; i < countUniformBlocks; i++) {
        const block_name = gl.getActiveUniformBlockName(this.id, i);
        const index = gl.getActiveUniformBlockIndex(this.id, block_name);
        this.uniformBlocks[block_name] = {
          name: block_name,
          index: index,
          size: gl.getActiveUniformBlockParameter(this.id, idx, gl.UNIFORM_BLOCK_DATA_SIZE),
          bind: gl.getActiveUniformBlockParameter(this.id, idx, gl.UNIFORM_BLOCK_BINDING),
        };
      }
      
    }
    constructor(name) {
      /// this._init(name);
      this.staticInit(name);
    }
    apply() {
      if (this.id != null)
        gl.useProgram(this.id);
    }
  }
  function shader(name) {
    return new _shader(name);
  }

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

  function camera(...args) {
    return new _camera(...args);
  }

  // or different way
  class _vertex {
    constructor(pos, norm) {
      this.pos = pos;
      this.norm = norm;
    }
  }

  function vertex(...args) {
    return new _vertex(...args);
  } // End of 'vertex' function 

  class _prim {
    shd;
    vertArray;
    vertBuffer;
    indBuffer;
    numOfElements;

    constructor(shd, vert, ind) {
      let arr = [], i = 0;

      this.shd = shd;
      //autoNormal(vert, ind);

      for (let v of vert) {
        v[i++] = v.pos.x;
        v[i++] = v.pos.y;
        v[i++] = v.pos.z;
        
        // v[i++] = v.norm.x;
        // v[i++] = v.norm.y;
        // v[i++] = v.norm.z;
      }

      this.numofElem = vert.length;

      const posLoc = gl.getAtrribLocation(shd.id, "InPosition");
      const normLoc = gl.getAtrribLocation(shd.id, "InNormal");
      this.vertArray = gl.createVertexArray();
      gl.bindVertexArray(this.vertArray);
      this.vertBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this.vertBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(arr), gl.STATIC_DRAW);

      if (posLoc != -1) {
        gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, 24, 0);
        gl.enableVertexAttribArray(posLoc);
      }
      if (normLoc != -1) {
        gl.vertexAttribPointer(normLoc, 3, gl.FLOAT, false, 24, 12);
        gl.enableVertexAttribArray(normLoc);
      }

      if (ind != undefined) {
        this.numOfElem = indexes.length;
        
        this.indBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(ind), gl.STATIC_DRAW);  
      } 
    }

    render(world, cam) {
      const date = new Date();
      let t = date.getMinutes() * 60 +
            date.getSeconds() +
            date.getMilliseconds() / 1000;

      let wvp = world.matrMulMatr(cam.matrVP);
      let winv = world.inverse().transpose();
            
      if (this.shd.uniforms['MatrWVP'] != undefined)
        gl.uniformMatrix4fv(this.shd.uniforms['MatrWVP'].loc, false, new Float32Array(wvp.toArray()));
      if (this.shd.uniforms['MatrWInv'])
        gl.uniformMatrix4fv(this.shd.uniforms['MatrWInv'].loc, false, new Float32Array(winv.toArray()));
      if (this.shd.uniforms['Time'])       
        gl.uniform1f(this.shd.uniforms['Time'],loc, t);
      
      if (this.shd.id != null) {
        if (this.indBuffer == undefined)
          gl.drawArrays(gl.TRIANGLES, 0, this.numOfElem);
        else {
          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indBuffer);
          gl.drawElements(gl.TRIANGLES, this.numOfElem, gl.UNSIGNED_INT, 0);
        }
      }
    }
  }

  function prim(...args) {
    return new _prim(...args);
  } // End of 'prim' function

  function setCube() {
    return [vertex(0), vertex(1, 0, 0), vertex(0, 1, 0), vertex(0, 0, 1), vertex(1, 1, 0), vertex(1, 0, 1), vertex(0, 1, 1), vertex(1)];
  }

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

    let ind = [
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

    let prims = prim(shd, setCube(), ind);

    shd.apply();

    const anim = () => {
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.clear(gl.DEPTH_BUFFER_BIT);

      const date = new Date();
      let t = date.getMinutes() * 60 +
            date.getSeconds() +
            date.getMilliseconds() / 1000;

      prims.render(mat4().rotateY(30 * t).matrMulMatr(mat4().rotateX(30 * t)), cam);

      window.requestAnimationFrame(anim);
    };

    anim();
  }

  console.log("CGSG forever!!!");

  window.addEventListener("load", () => {
    main();
  });

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsiLi4vbXRoL3ZlYzMuanMiLCIuLi9tdGgvbWF0NC5qcyIsIi4uL3NyYy9hbmltL3JuZC9zaGFkZXJfY2xhc3NfcGF0dGVybi5qcyIsIi4uL210aC9jYW0uanMiLCIuLi9zcmMvYW5pbS9ybmQvcm5kcHJpbS5qcyIsIi4uL3NyYy9maWd1cmUvZmlndXJlcy5qcyIsIi4uL21haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgX3ZlYzMge1xuICBjb25zdHJ1Y3Rvcih4LCB5LCB6KSB7XG4gICAgaWYgKHggPT0gdW5kZWZpbmVkKSAodGhpcy54ID0gMCksICh0aGlzLnkgPSAwKSwgKHRoaXMueiA9IDApO1xuICAgIGVsc2UgaWYgKHR5cGVvZiB4ID09IFwib2JqZWN0XCIpXG4gICAgICBpZiAoeC5sZW5naHQgPT0gMykgKHRoaXMueCA9IHhbMF0pLCAodGhpcy55ID0geFsxXSksICh0aGlzLnogPSB4WzJdKTtcbiAgICAgIGVsc2UgKHRoaXMueCA9IHgueCksICh0aGlzLnkgPSB4LnkpLCAodGhpcy56ID0geC56KTtcbiAgICBlbHNlIGlmICh5ID09IHVuZGVmaW5lZCB8fCB6ID09IHVuZGVmaW5lZClcbiAgICAgICh0aGlzLnggPSB4KSwgKHRoaXMueSA9IHgpLCAodGhpcy56ID0geCk7XG4gICAgZWxzZSAodGhpcy54ID0geCksICh0aGlzLnkgPSB5KSwgKHRoaXMueiA9IHopO1xuICB9IC8vIEVuZCBvZiAnY29uc3RydWN0b3InIGZ1bmN0aW9uXG5cbiAgYWRkKHYpIHtcbiAgICBpZiAodHlwZW9mIHYgPT0gXCJudW1iZXJcIikge1xuICAgICAgcmV0dXJuIHZlYzModGhpcy54ICsgdiwgdGhpcy55ICsgdiwgdGhpcy56ICsgdik7XG4gICAgfVxuICAgIHJldHVybiB2ZWMzKHRoaXMueCArIHYueCwgdGhpcy55ICsgdi55LCB0aGlzLnogKyB2LnopO1xuICB9IC8vIEVuZCBvZiAnYWRkJyBmdW5jdGlvblxuXG4gIHN1Yih2KSB7XG4gICAgaWYgKHR5cGVvZiB2ID09IFwibnVtYmVyXCIpIHtcbiAgICAgIHJldHVybiB2ZWMzKHRoaXMueCAtIHYsIHRoaXMueSAtIHYsIHRoaXMueiAtIHYpO1xuICAgIH1cbiAgICByZXR1cm4gdmVjMyh0aGlzLnggLSB2LngsIHRoaXMueSAtIHYueSwgdGhpcy56IC0gdi56KTtcbiAgfSAvLyBFbmQgb2YgJ3N1YicgZnVuY3Rpb25cblxuICBkb3Qodikge1xuICAgIGlmICh0eXBlb2YgdiA9PSBcIm51bWJlclwiKSB7XG4gICAgICByZXR1cm4gdmVjMyh0aGlzLnggKiB2LCB0aGlzLnkgKiB2LCB0aGlzLnogKiB2KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMueCAqIHYueCArIHRoaXMueSAqIHYueSArIHRoaXMueiAqIHYuejtcbiAgfSAvLyBFbmQgb2YgJ2RvdCcgZnVuY3Rpb25cblxuICBkaXZOdW0odikge1xuICAgIHJldHVybiB2ZWMzKHRoaXMueCAvIHYsIHRoaXMueSAvIHYsIHRoaXMueiAvIHYpO1xuICB9IC8vIEVuZCBvZiAnZGl2TnVtJyBmdW5jdGlvblxuXG4gIGxlbigpIHtcbiAgICBsZXQgdiA9IHZlYzModGhpcy54LCB0aGlzLnksIHRoaXMueik7XG4gICAgbGV0IGxlbiA9IHRoaXMuZG90KHYsIHYpOyBcblxuICAgIGlmIChsZW4gPT0gMSB8fCBsZW4gPT0gMCkge1xuICAgICAgcmV0dXJuIGxlbjtcbiAgICB9XG4gICAgcmV0dXJuIE1hdGguc3FydChsZW4pO1xuICB9IC8vIEVuZCBvZiAnbGVuJyBmdW5jdGlvblxuXG4gIGxlbjIoKSB7XG4gICAgbGV0IHYgPSB2ZWMzKHRoaXMueCwgdGhpcy55LCB0aGlzLnopO1xuXG4gICAgcmV0dXJuIHRoaXMuZG90KHYsIHYpO1xuICB9IC8vIEVuZCBvZiAnbGVuJyBmdW5jdGlvblxuXG4gIG5lZygpIHtcbiAgICByZXR1cm4gdmVjMygtdGhpcy54LCAtdGhpcy55LCAtdGhpcy56KTtcbiAgfSAvLyBFbmQgb2YgJ25lZycgZnVuY3Rpb25cblxuICBub3JtYWxpemUoKSB7XG4gICAgbGV0IGxlbiA9IHRoaXMuZG90KHRoaXMpO1xuXG4gICAgaWYgKGxlbiAhPSAwICYmIGxlbiAhPSAxKSB7XG4gICAgICBsZW4gPSBNYXRoLnNxcnQobGVuKTtcbiAgICAgIHJldHVybiB0aGlzLmRpdk51bShsZW4pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfSAvLyBFbmQgb2YgJ25vcm1hbGl6ZScgZnVuY3Rpb25cblxuICB0cmFuc2Zvcm0obSkge1xuICAgIHJldHVybiB2ZWMzKFxuICAgICAgdGhpcy54ICogbS5tWzBdWzBdICsgdGhpcy55ICogbS5tWzFdWzBdICsgdGhpcy56ICogbS5tWzJdWzBdLFxuICAgICAgdGhpcy54ICogbS5tWzBdWzFdICsgdGhpcy55ICogbS5tWzFdWzFdICsgdGhpcy56ICogbS5tWzJdWzFdLFxuICAgICAgdGhpcy54ICogbS5tWzBdWzJdICsgdGhpcy55ICogbS5tWzFdWzJdICsgdGhpcy56ICogbS5tWzJdWzJdXG4gICAgKTtcbiAgfSAvLyBFbmQgb2YgJ3RyYW5zZm9ybScgZnVuY3Rpb25cblxuICBNdWxNYXRyKG0pIHtcbiAgICBsZXQgdyA9XG4gICAgICB0aGlzLnggKiBtLm1bMF1bM10gK1xuICAgICAgdGhpcy55ICogbS5tWzFdWzNdICtcbiAgICAgIHRoaXMueiAqIG0ubVsyXVszXSArXG4gICAgICB0aGlzLm1bM11bM107XG5cbiAgICByZXR1cm4gdmVjMyhcbiAgICAgICh0aGlzLnggKiBtLm1bMF1bMF0gK1xuICAgICAgICB0aGlzLnkgKiBtLm1bMV1bMF0gK1xuICAgICAgICB0aGlzLnogKiBtLm1bMl1bMF0gK1xuICAgICAgICBtLm1bM11bMF0pIC9cbiAgICAgICAgdyxcbiAgICAgICh0aGlzLnggKiBtLm1bMF1bMV0gK1xuICAgICAgICB0aGlzLnkgKiBtLm1bMV1bMV0gK1xuICAgICAgICB0aGlzLnogKiBtLm1bMl1bMV0gK1xuICAgICAgICBtLm1bM11bMV0pIC9cbiAgICAgICAgdyxcbiAgICAgICh0aGlzLnggKiBtLm1bMF1bMl0gK1xuICAgICAgICB0aGlzLnkgKiBtLm1bMV1bMl0gK1xuICAgICAgICB0aGlzLnogKiBtLm1bMl1bMl0gK1xuICAgICAgICBtLm1bM11bMl0pIC9cbiAgICAgICAgd1xuICAgICk7XG4gIH0gLy8gRW5kIG9mICd2ZWNNdWxNYXRyJyBmdW5jdGlvblxuXG4gIGNyb3NzKHYpIHtcbiAgICByZXR1cm4gdmVjMyh0aGlzLnkgKiB2LnogLSB0aGlzLnogKiB2LnksXG4gICAgICB0aGlzLnogKiB2LnggLSB0aGlzLnggKiB2LnosXG4gICAgICB0aGlzLnggKiB2LnkgLSB0aGlzLnkgKiB2LngpO1xuICB9IC8vIEVuZCBvZiAndmVjQ3Jvc3NWZWMnIGZ1bmN0aW9uXG5cbiAgcG9pbnRUcmFuc2Zvcm0obSkge1xuICAgIHZlYzNTZXQoXG4gICAgICB0aGlzLnggKiBtLm1bMF1bMF0gKyB0aGlzLnkgKiBtLm1bMV1bMF0gKyB0aGlzLnogKiBtLm1bMl1bMF0gKyBtLm1bM11bMF0sXG4gICAgICB0aGlzLnggKiBtLm1bMF1bMV0gKyB0aGlzLnkgKiBtLm1bMV1bMV0gKyB0aGlzLnogKiBtLm1bMl1bMV0gKyBtLm1bM11bMV0sXG4gICAgICB0aGlzLnggKiBtLm1bMF1bMl0gKyB0aGlzLnkgKiBtLm1bMV1bMl0gKyB0aGlzLnogKiBtLm1bMl1bMl0gKyBtLm1bM11bMl1cbiAgICApO1xuICB9IC8vIEVuZCBvZiAncG9pbnRUcmFuc2Zyb20nIGZ1bmN0aW9uXG59IC8vIEVuZCBvZiAnX3ZlYzMnIGNsYXNzIGZ1bmN0aW9uXG5cbmV4cG9ydCBmdW5jdGlvbiB2ZWMzKC4uLmFyZ3MpIHtcbiAgcmV0dXJuIG5ldyBfdmVjMyguLi5hcmdzKTtcbn0gLy8gRW5kIG9mICd2ZWMzJyBmdW5jdGlvblxuIiwiaW1wb3J0IHsgdmVjMyB9IGZyb20gXCIuL3ZlYzMuanNcIjtcblxuY2xhc3MgX21hdDQge1xuICBjb25zdHJ1Y3RvcihtID0gbnVsbCkge1xuICAgIGlmIChtID09IG51bGwpIHtcbiAgICAgIHRoaXMubSA9IFtcbiAgICAgICAgWzEsIDAsIDAsIDBdLFxuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAxLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDFdLFxuICAgICAgXTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBtID09IFwib2JqZWN0XCIgJiYgbS5sZW5ndGggPT0gNCkge1xuICAgICAgdGhpcy5tID0gbTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tID0gbS5tO1xuICAgIH1cbiAgfSAvLyBFbmQgb2YgJ2NvbnN0cnVjdG9yJyBmdW5jdGlvblxuXG4gICAgdG9BcnJheSgpIHtcbiAgICAgIHJldHVybiBbXS5jb25jYXQoLi4udGhpcy5tKTtcbiAgICB9XG5cbiAgbWF0clNldChhMDAsIGEwMSwgYTAyLCBhMDMsIFxuICAgICAgICAgIGExMCwgYTExLCBhMTIsIGExMyxcbiAgICAgICAgICBhMjAsIGEyMSwgYTIyLCBhMjMsXG4gICAgICAgICAgYTMwLCBhMzEsIGEzMiwgYTMzLCkge1xuICAgIGxldCBtID0gbWF0NCgpO1xuXG4gICAgbS5tID0gW1xuICAgICAgW2EwMCwgYTAxLCBhMDIsIGEwM10sXG4gICAgICBbYTEwLCBhMTEsIGExMiwgYTEzXSxcbiAgICAgIFthMjAsIGEyMSwgYTIyLCBhMjNdLFxuICAgICAgW2EzMCwgYTMxLCBhMzIsIGEzM10sXG4gICAgXTtcblxuICAgIHJldHVybiBtO1xuICB9IC8vIEVuZCBvZiAnbWF0clNldCcgZnVuY3Rpb25cblxuICBkZXRlcm0zeDMoYTExLCBhMTIsIGExMywgYTIxLCBhMjIsIGEyMywgYTMxLCBhMzIsIGEzMykge1xuICAgIHJldHVybiAoXG4gICAgICBhMTEgKiBhMjIgKiBhMzMgK1xuICAgICAgYTEyICogYTIzICogYTMxICtcbiAgICAgIGExMyAqIGEyMSAqIGEzMiAtXG4gICAgICBhMTEgKiBhMjMgKiBhMzIgLVxuICAgICAgYTEyICogYTIxICogYTMzIC1cbiAgICAgIGExMyAqIGEyMiAqIGEzMVxuICAgICk7XG4gIH0gLy8gRW5kIG9mICdkZXRlcm0zeDMnIGZ1bmN0aW9uXG5cbiAgZGV0ZXJtKCkge1xuICAgIHJldHVybiAoXG4gICAgICArdGhpcy5tWzBdWzBdICpcbiAgICAgICAgdGhpcy5kZXRlcm0zeDMoXG4gICAgICAgICAgdGhpcy5tWzFdWzFdLFxuICAgICAgICAgIHRoaXMubVsxXVsyXSxcbiAgICAgICAgICB0aGlzLm1bMV1bM10sXG4gICAgICAgICAgdGhpcy5tWzJdWzFdLFxuICAgICAgICAgIHRoaXMubVsyXVsyXSxcbiAgICAgICAgICB0aGlzLm1bMl1bM10sXG4gICAgICAgICAgdGhpcy5tWzNdWzFdLFxuICAgICAgICAgIHRoaXMubVszXVsyXSxcbiAgICAgICAgICB0aGlzLm1bM11bM10sXG4gICAgICAgICkgK1xuICAgICAgLXRoaXMubVswXVsxXSAqXG4gICAgICAgIHRoaXMuZGV0ZXJtM3gzKFxuICAgICAgICAgIHRoaXMubVsxXVswXSxcbiAgICAgICAgICB0aGlzLm1bMV1bMl0sXG4gICAgICAgICAgdGhpcy5tWzFdWzNdLFxuICAgICAgICAgIHRoaXMubVsyXVswXSxcbiAgICAgICAgICB0aGlzLm1bMl1bMl0sXG4gICAgICAgICAgdGhpcy5tWzJdWzNdLFxuICAgICAgICAgIHRoaXMubVszXVswXSxcbiAgICAgICAgICB0aGlzLm1bM11bMl0sXG4gICAgICAgICAgdGhpcy5tWzNdWzNdLFxuICAgICAgICApICtcbiAgICAgICt0aGlzLm1bMF1bMl0gKlxuICAgICAgICB0aGlzLmRldGVybTN4MyhcbiAgICAgICAgICB0aGlzLm1bMV1bMF0sXG4gICAgICAgICAgdGhpcy5tWzFdWzFdLFxuICAgICAgICAgIHRoaXMubVsxXVszXSxcbiAgICAgICAgICB0aGlzLm1bMl1bMF0sXG4gICAgICAgICAgdGhpcy5tWzJdWzFdLFxuICAgICAgICAgIHRoaXMubVsyXVszXSxcbiAgICAgICAgICB0aGlzLm1bM11bMF0sXG4gICAgICAgICAgdGhpcy5tWzNdWzFdLFxuICAgICAgICAgIHRoaXMubVszXVszXSxcbiAgICAgICAgKSArXG4gICAgICAtdGhpcy5tWzBdWzNdICpcbiAgICAgICAgdGhpcy5kZXRlcm0zeDMoXG4gICAgICAgICAgdGhpcy5tWzFdWzBdLFxuICAgICAgICAgIHRoaXMubVsxXVsxXSxcbiAgICAgICAgICB0aGlzLm1bMV1bMl0sXG4gICAgICAgICAgdGhpcy5tWzJdWzBdLFxuICAgICAgICAgIHRoaXMubVsyXVsxXSxcbiAgICAgICAgICB0aGlzLm1bMl1bMl0sXG4gICAgICAgICAgdGhpcy5tWzNdWzBdLFxuICAgICAgICAgIHRoaXMubVszXVsxXSxcbiAgICAgICAgICB0aGlzLm1bM11bMl0sXG4gICAgICAgIClcbiAgICApO1xuICB9IC8vIEVuZCBvZiAnZGV0ZXJtJyBmdW5jdGlvblxuXG4gIG1hdHJUcmFuc2xhdGUodikge1xuICAgIHRoaXMubVszXVswXSA9IHYueDtcbiAgICB0aGlzLm1bM11bMV0gPSB2Lnk7XG4gICAgdGhpcy5tWzNdWzJdID0gdi56O1xuICAgIHJldHVybiB0aGlzLm07XG4gIH0gLy8gRW5kIG9mICdtYXRyVHJhbnNsYXRlJyBmdW5jdGlvblxuXG4gIG1hdHJNdWxNYXRyKG0xKSB7XG4gICAgbGV0IHIgPSBtYXQ0KCk7XG5cbiAgICByLm1bMF1bMF0gPVxuICAgICAgdGhpcy5tWzBdWzBdICogbTEubVswXVswXSArXG4gICAgICB0aGlzLm1bMF1bMV0gKiBtMS5tWzFdWzBdICtcbiAgICAgIHRoaXMubVswXVsyXSAqIG0xLm1bMl1bMF0gK1xuICAgICAgdGhpcy5tWzBdWzNdICogbTEubVszXVswXTtcbiAgICByLm1bMF1bMV0gPVxuICAgICAgdGhpcy5tWzBdWzBdICogbTEubVswXVsxXSArXG4gICAgICB0aGlzLm1bMF1bMV0gKiBtMS5tWzFdWzFdICtcbiAgICAgIHRoaXMubVswXVsyXSAqIG0xLm1bMl1bMV0gK1xuICAgICAgdGhpcy5tWzBdWzNdICogbTEubVszXVsxXTtcbiAgICByLm1bMF1bMl0gPVxuICAgICAgdGhpcy5tWzBdWzBdICogbTEubVswXVsyXSArXG4gICAgICB0aGlzLm1bMF1bMV0gKiBtMS5tWzFdWzJdICtcbiAgICAgIHRoaXMubVswXVsyXSAqIG0xLm1bMl1bMl0gK1xuICAgICAgdGhpcy5tWzBdWzNdICogbTEubVszXVsyXTtcbiAgICByLm1bMF1bM10gPVxuICAgICAgdGhpcy5tWzBdWzBdICogbTEubVswXVszXSArXG4gICAgICB0aGlzLm1bMF1bMV0gKiBtMS5tWzFdWzNdICtcbiAgICAgIHRoaXMubVswXVsyXSAqIG0xLm1bMl1bM10gK1xuICAgICAgdGhpcy5tWzBdWzNdICogbTEubVszXVszXTtcbiAgICByLm1bMV1bMF0gPVxuICAgICAgdGhpcy5tWzFdWzBdICogbTEubVswXVswXSArXG4gICAgICB0aGlzLm1bMV1bMV0gKiBtMS5tWzFdWzBdICtcbiAgICAgIHRoaXMubVsxXVsyXSAqIG0xLm1bMl1bMF0gK1xuICAgICAgdGhpcy5tWzFdWzNdICogbTEubVszXVswXTtcbiAgICByLm1bMV1bMV0gPVxuICAgICAgdGhpcy5tWzFdWzBdICogbTEubVswXVsxXSArXG4gICAgICB0aGlzLm1bMV1bMV0gKiBtMS5tWzFdWzFdICtcbiAgICAgIHRoaXMubVsxXVsyXSAqIG0xLm1bMl1bMV0gK1xuICAgICAgdGhpcy5tWzFdWzNdICogbTEubVszXVsxXTtcbiAgICByLm1bMV1bMl0gPVxuICAgICAgdGhpcy5tWzFdWzBdICogbTEubVswXVsyXSArXG4gICAgICB0aGlzLm1bMV1bMV0gKiBtMS5tWzFdWzJdICtcbiAgICAgIHRoaXMubVsxXVsyXSAqIG0xLm1bMl1bMl0gK1xuICAgICAgdGhpcy5tWzFdWzNdICogbTEubVszXVsyXTtcbiAgICByLm1bMV1bM10gPVxuICAgICAgdGhpcy5tWzFdWzBdICogbTEubVswXVszXSArXG4gICAgICB0aGlzLm1bMV1bMV0gKiBtMS5tWzFdWzNdICtcbiAgICAgIHRoaXMubVsxXVsyXSAqIG0xLm1bMl1bM10gK1xuICAgICAgdGhpcy5tWzFdWzNdICogbTEubVszXVszXTtcbiAgICByLm1bMl1bMF0gPVxuICAgICAgdGhpcy5tWzJdWzBdICogbTEubVswXVswXSArXG4gICAgICB0aGlzLm1bMl1bMV0gKiBtMS5tWzFdWzBdICtcbiAgICAgIHRoaXMubVsyXVsyXSAqIG0xLm1bMl1bMF0gK1xuICAgICAgdGhpcy5tWzJdWzNdICogbTEubVszXVswXTtcbiAgICByLm1bMl1bMV0gPVxuICAgICAgdGhpcy5tWzJdWzBdICogbTEubVswXVsxXSArXG4gICAgICB0aGlzLm1bMl1bMV0gKiBtMS5tWzFdWzFdICtcbiAgICAgIHRoaXMubVsyXVsyXSAqIG0xLm1bMl1bMV0gK1xuICAgICAgdGhpcy5tWzJdWzNdICogbTEubVszXVsxXTtcbiAgICByLm1bMl1bMl0gPVxuICAgICAgdGhpcy5tWzJdWzBdICogbTEubVswXVsyXSArXG4gICAgICB0aGlzLm1bMl1bMV0gKiBtMS5tWzFdWzJdICtcbiAgICAgIHRoaXMubVsyXVsyXSAqIG0xLm1bMl1bMl0gK1xuICAgICAgdGhpcy5tWzJdWzNdICogbTEubVszXVsyXTtcbiAgICByLm1bMl1bM10gPVxuICAgICAgdGhpcy5tWzJdWzBdICogbTEubVswXVszXSArXG4gICAgICB0aGlzLm1bMl1bMV0gKiBtMS5tWzFdWzNdICtcbiAgICAgIHRoaXMubVsyXVsyXSAqIG0xLm1bMl1bM10gK1xuICAgICAgdGhpcy5tWzJdWzNdICogbTEubVszXVszXTtcbiAgICByLm1bM11bMF0gPVxuICAgICAgdGhpcy5tWzNdWzBdICogbTEubVswXVswXSArXG4gICAgICB0aGlzLm1bM11bMV0gKiBtMS5tWzFdWzBdICtcbiAgICAgIHRoaXMubVszXVsyXSAqIG0xLm1bMl1bMF0gK1xuICAgICAgdGhpcy5tWzNdWzNdICogbTEubVszXVswXTtcbiAgICByLm1bM11bMV0gPVxuICAgICAgdGhpcy5tWzNdWzBdICogbTEubVswXVsxXSArXG4gICAgICB0aGlzLm1bM11bMV0gKiBtMS5tWzFdWzFdICtcbiAgICAgIHRoaXMubVszXVsyXSAqIG0xLm1bMl1bMV0gK1xuICAgICAgdGhpcy5tWzNdWzNdICogbTEubVszXVsxXTtcbiAgICByLm1bM11bMl0gPVxuICAgICAgdGhpcy5tWzNdWzBdICogbTEubVswXVsyXSArXG4gICAgICB0aGlzLm1bM11bMV0gKiBtMS5tWzFdWzJdICtcbiAgICAgIHRoaXMubVszXVsyXSAqIG0xLm1bMl1bMl0gK1xuICAgICAgdGhpcy5tWzNdWzNdICogbTEubVszXVsyXTtcbiAgICByLm1bM11bM10gPVxuICAgICAgdGhpcy5tWzNdWzBdICogbTEubVswXVszXSArXG4gICAgICB0aGlzLm1bM11bMV0gKiBtMS5tWzFdWzNdICtcbiAgICAgIHRoaXMubVszXVsyXSAqIG0xLm1bMl1bM10gK1xuICAgICAgdGhpcy5tWzNdWzNdICogbTEubVszXVszXTtcblxuICAgIHJldHVybiByO1xuICB9IC8vIEVuZCBvZiAnTWF0ck11bE1hdHInIGZ1bmN0aW9uXG5cbiAgaW52ZXJzZSgpIHtcbiAgICBsZXQgciA9IG1hdDQoKTtcbiAgICBsZXQgZGV0ID0gdGhpcy5kZXRlcm0oKTtcblxuICAgIGlmIChkZXQgPT0gMCkgcmV0dXJuIHI7XG5cbiAgICByLm1bMF1bMF0gPVxuICAgICAgK3RoaXMuZGV0ZXJtM3gzKFxuICAgICAgICB0aGlzLm1bMV1bMV0sXG4gICAgICAgIHRoaXMubVsxXVsyXSxcbiAgICAgICAgdGhpcy5tWzFdWzNdLFxuICAgICAgICB0aGlzLm1bMl1bMV0sXG4gICAgICAgIHRoaXMubVsyXVsyXSxcbiAgICAgICAgdGhpcy5tWzJdWzNdLFxuICAgICAgICB0aGlzLm1bM11bMV0sXG4gICAgICAgIHRoaXMubVszXVsyXSxcbiAgICAgICAgdGhpcy5tWzNdWzNdLFxuICAgICAgKSAvIGRldDtcblxuICAgIHIubVsxXVswXSA9XG4gICAgICAtdGhpcy5kZXRlcm0zeDMoXG4gICAgICAgIHRoaXMubVsxXVswXSxcbiAgICAgICAgdGhpcy5tWzFdWzJdLFxuICAgICAgICB0aGlzLm1bMV1bM10sXG4gICAgICAgIHRoaXMubVsyXVswXSxcbiAgICAgICAgdGhpcy5tWzJdWzJdLFxuICAgICAgICB0aGlzLm1bMl1bM10sXG4gICAgICAgIHRoaXMubVszXVswXSxcbiAgICAgICAgdGhpcy5tWzNdWzJdLFxuICAgICAgICB0aGlzLm1bM11bM10sXG4gICAgICApIC8gZGV0O1xuXG4gICAgci5tWzJdWzBdID1cbiAgICAgICt0aGlzLmRldGVybTN4MyhcbiAgICAgICAgdGhpcy5tWzFdWzBdLFxuICAgICAgICB0aGlzLm1bMV1bMV0sXG4gICAgICAgIHRoaXMubVsxXVszXSxcbiAgICAgICAgdGhpcy5tWzJdWzBdLFxuICAgICAgICB0aGlzLm1bMl1bMV0sXG4gICAgICAgIHRoaXMubVsyXVszXSxcbiAgICAgICAgdGhpcy5tWzNdWzBdLFxuICAgICAgICB0aGlzLm1bM11bMV0sXG4gICAgICAgIHRoaXMubVszXVszXSxcbiAgICAgICkgLyBkZXQ7XG5cbiAgICByLm1bM11bMF0gPVxuICAgICAgLXRoaXMuZGV0ZXJtM3gzKFxuICAgICAgICB0aGlzLm1bMV1bMF0sXG4gICAgICAgIHRoaXMubVsxXVsxXSxcbiAgICAgICAgdGhpcy5tWzFdWzJdLFxuICAgICAgICB0aGlzLm1bMl1bMF0sXG4gICAgICAgIHRoaXMubVsyXVsxXSxcbiAgICAgICAgdGhpcy5tWzJdWzJdLFxuICAgICAgICB0aGlzLm1bM11bMF0sXG4gICAgICAgIHRoaXMubVszXVsxXSxcbiAgICAgICAgdGhpcy5tWzNdWzJdLFxuICAgICAgKSAvIGRldDtcblxuICAgIHIubVswXVsxXSA9XG4gICAgICAtdGhpcy5kZXRlcm0zeDMoXG4gICAgICAgIHRoaXMubVswXVsxXSxcbiAgICAgICAgdGhpcy5tWzBdWzJdLFxuICAgICAgICB0aGlzLm1bMF1bM10sXG4gICAgICAgIHRoaXMubVsyXVsxXSxcbiAgICAgICAgdGhpcy5tWzJdWzJdLFxuICAgICAgICB0aGlzLm1bMl1bM10sXG4gICAgICAgIHRoaXMubVszXVsxXSxcbiAgICAgICAgdGhpcy5tWzNdWzJdLFxuICAgICAgICB0aGlzLm1bM11bM10sXG4gICAgICApIC8gZGV0O1xuXG4gICAgci5tWzFdWzFdID1cbiAgICAgICt0aGlzLmRldGVybTN4MyhcbiAgICAgICAgdGhpcy5tWzBdWzBdLFxuICAgICAgICB0aGlzLm1bMF1bMl0sXG4gICAgICAgIHRoaXMubVswXVszXSxcbiAgICAgICAgdGhpcy5tWzJdWzBdLFxuICAgICAgICB0aGlzLm1bMl1bMl0sXG4gICAgICAgIHRoaXMubVsyXVszXSxcbiAgICAgICAgdGhpcy5tWzNdWzBdLFxuICAgICAgICB0aGlzLm1bM11bMl0sXG4gICAgICAgIHRoaXMubVszXVszXSxcbiAgICAgICkgLyBkZXQ7XG5cbiAgICByLm1bMl1bMV0gPVxuICAgICAgLXRoaXMuZGV0ZXJtM3gzKFxuICAgICAgICB0aGlzLm1bMF1bMF0sXG4gICAgICAgIHRoaXMubVswXVsxXSxcbiAgICAgICAgdGhpcy5tWzBdWzNdLFxuICAgICAgICB0aGlzLm1bMl1bMF0sXG4gICAgICAgIHRoaXMubVsyXVsxXSxcbiAgICAgICAgdGhpcy5tWzJdWzNdLFxuICAgICAgICB0aGlzLm1bM11bMF0sXG4gICAgICAgIHRoaXMubVszXVsxXSxcbiAgICAgICAgdGhpcy5tWzNdWzNdLFxuICAgICAgKSAvIGRldDtcblxuICAgIHIubVszXVsxXSA9XG4gICAgICArdGhpcy5kZXRlcm0zeDMoXG4gICAgICAgIHRoaXMubVswXVswXSxcbiAgICAgICAgdGhpcy5tWzBdWzFdLFxuICAgICAgICB0aGlzLm1bMF1bMl0sXG4gICAgICAgIHRoaXMubVsyXVswXSxcbiAgICAgICAgdGhpcy5tWzJdWzFdLFxuICAgICAgICB0aGlzLm1bMl1bMl0sXG4gICAgICAgIHRoaXMubVszXVswXSxcbiAgICAgICAgdGhpcy5tWzNdWzFdLFxuICAgICAgICB0aGlzLm1bM11bMl0sXG4gICAgICApIC8gZGV0O1xuXG4gICAgci5tWzBdWzJdID1cbiAgICAgICt0aGlzLmRldGVybTN4MyhcbiAgICAgICAgdGhpcy5tWzBdWzFdLFxuICAgICAgICB0aGlzLm1bMF1bMl0sXG4gICAgICAgIHRoaXMubVswXVszXSxcbiAgICAgICAgdGhpcy5tWzFdWzFdLFxuICAgICAgICB0aGlzLm1bMV1bMl0sXG4gICAgICAgIHRoaXMubVsxXVszXSxcbiAgICAgICAgdGhpcy5tWzNdWzFdLFxuICAgICAgICB0aGlzLm1bM11bMl0sXG4gICAgICAgIHRoaXMubVszXVszXSxcbiAgICAgICkgLyBkZXQ7XG5cbiAgICByLm1bMV1bMl0gPVxuICAgICAgLXRoaXMuZGV0ZXJtM3gzKFxuICAgICAgICB0aGlzLm1bMF1bMF0sXG4gICAgICAgIHRoaXMubVswXVsyXSxcbiAgICAgICAgdGhpcy5tWzBdWzNdLFxuICAgICAgICB0aGlzLm1bMV1bMF0sXG4gICAgICAgIHRoaXMubVsxXVsyXSxcbiAgICAgICAgdGhpcy5tWzFdWzNdLFxuICAgICAgICB0aGlzLm1bM11bMF0sXG4gICAgICAgIHRoaXMubVszXVsyXSxcbiAgICAgICAgdGhpcy5tWzNdWzNdLFxuICAgICAgKSAvIGRldDtcblxuICAgIHIubVsyXVsyXSA9XG4gICAgICArdGhpcy5kZXRlcm0zeDMoXG4gICAgICAgIHRoaXMubVswXVswXSxcbiAgICAgICAgdGhpcy5tWzBdWzFdLFxuICAgICAgICB0aGlzLm1bMF1bM10sXG4gICAgICAgIHRoaXMubVsxXVswXSxcbiAgICAgICAgdGhpcy5tWzFdWzFdLFxuICAgICAgICB0aGlzLm1bMV1bM10sXG4gICAgICAgIHRoaXMubVszXVswXSxcbiAgICAgICAgdGhpcy5tWzNdWzFdLFxuICAgICAgICB0aGlzLm1bM11bM10sXG4gICAgICApIC8gZGV0O1xuXG4gICAgci5tWzNdWzJdID1cbiAgICAgIC10aGlzLmRldGVybTN4MyhcbiAgICAgICAgdGhpcy5tWzBdWzBdLFxuICAgICAgICB0aGlzLm1bMF1bMV0sXG4gICAgICAgIHRoaXMubVswXVsyXSxcbiAgICAgICAgdGhpcy5tWzFdWzBdLFxuICAgICAgICB0aGlzLm1bMV1bMV0sXG4gICAgICAgIHRoaXMubVsxXVsyXSxcbiAgICAgICAgdGhpcy5tWzNdWzBdLFxuICAgICAgICB0aGlzLm1bM11bMV0sXG4gICAgICAgIHRoaXMubVszXVsyXSxcbiAgICAgICkgLyBkZXQ7XG5cbiAgICByLm1bMF1bM10gPVxuICAgICAgLXRoaXMuZGV0ZXJtM3gzKFxuICAgICAgICB0aGlzLm1bMF1bMV0sXG4gICAgICAgIHRoaXMubVswXVsyXSxcbiAgICAgICAgdGhpcy5tWzBdWzNdLFxuICAgICAgICB0aGlzLm1bMV1bMV0sXG4gICAgICAgIHRoaXMubVsxXVsyXSxcbiAgICAgICAgdGhpcy5tWzFdWzNdLFxuICAgICAgICB0aGlzLm1bMl1bMV0sXG4gICAgICAgIHRoaXMubVsyXVsyXSxcbiAgICAgICAgdGhpcy5tWzJdWzNdLFxuICAgICAgKSAvIGRldDtcblxuICAgIHIubVsxXVszXSA9XG4gICAgICArdGhpcy5kZXRlcm0zeDMoXG4gICAgICAgIHRoaXMubVswXVswXSxcbiAgICAgICAgdGhpcy5tWzBdWzJdLFxuICAgICAgICB0aGlzLm1bMF1bM10sXG4gICAgICAgIHRoaXMubVsxXVswXSxcbiAgICAgICAgdGhpcy5tWzFdWzJdLFxuICAgICAgICB0aGlzLm1bMV1bM10sXG4gICAgICAgIHRoaXMubVsyXVswXSxcbiAgICAgICAgdGhpcy5tWzJdWzJdLFxuICAgICAgICB0aGlzLm1bMl1bM10sXG4gICAgICApIC8gZGV0O1xuXG4gICAgci5tWzJdWzNdID1cbiAgICAgIC10aGlzLmRldGVybTN4MyhcbiAgICAgICAgdGhpcy5tWzBdWzBdLFxuICAgICAgICB0aGlzLm1bMF1bMV0sXG4gICAgICAgIHRoaXMubVswXVszXSxcbiAgICAgICAgdGhpcy5tWzFdWzBdLFxuICAgICAgICB0aGlzLm1bMV1bMV0sXG4gICAgICAgIHRoaXMubVsxXVszXSxcbiAgICAgICAgdGhpcy5tWzJdWzBdLFxuICAgICAgICB0aGlzLm1bMl1bMV0sXG4gICAgICAgIHRoaXMubVsyXVszXSxcbiAgICAgICkgLyBkZXQ7XG5cbiAgICByLm1bM11bM10gPVxuICAgICAgK3RoaXMuZGV0ZXJtM3gzKFxuICAgICAgICB0aGlzLm1bMF1bMF0sXG4gICAgICAgIHRoaXMubVswXVsxXSxcbiAgICAgICAgdGhpcy5tWzBdWzJdLFxuICAgICAgICB0aGlzLm1bMV1bMF0sXG4gICAgICAgIHRoaXMubVsxXVsxXSxcbiAgICAgICAgdGhpcy5tWzFdWzJdLFxuICAgICAgICB0aGlzLm1bMl1bMF0sXG4gICAgICAgIHRoaXMubVsyXVsxXSxcbiAgICAgICAgdGhpcy5tWzJdWzJdLFxuICAgICAgKSAvIGRldDtcblxuICAgIHJldHVybiByO1xuICB9IC8vIEVuZCBvZiAnaW52ZXJzZScgZnVuY3Rpb25cblxuICByb3RhdGUoQW5nbGUsIHYpIHtcbiAgICBsZXQgYSA9IChBbmdsZSAqIE1hdGguUEkpIC8gMTgwLFxuICAgICAgcyA9IE1hdGguc2luKGEpLFxuICAgICAgYyA9IE1hdGguY29zKGEpO1xuXG4gICAgcmV0dXJuIHRoaXMubWF0clNldChcbiAgICAgIGMgKyB2LnggKiB2LnggKiAoMSAtIGMpLFxuICAgICAgdi55ICogdi54ICogKDEgLSBjKSAtIHYueiAqIHMsXG4gICAgICB2LnogKiB2LnggKiAoMSAtIGMpICsgdi55ICogcyxcbiAgICAgIDAsXG4gICAgICB2LnggKiB2LnkgKiAoMSAtIGMpICsgdi56ICogcyxcbiAgICAgIGMgKyB2LnkgKiB2LnkgKiAoMSAtIGMpLFxuICAgICAgdi56ICogdi55ICogKDEgLSBjKSAtIHYueCAqIHMsXG4gICAgICAwLFxuICAgICAgdi54ICogdi56ICogKDEgLSBjKSAtIHYueSAqIHMsXG4gICAgICB2LnkgKiB2LnogKiAoMSAtIGMpICsgdi54ICogcyxcbiAgICAgIGMgKyB2LnogKiB2LnogKiAoMSAtIGMpLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIDEsXG4gICAgKTtcbiAgfSAvLyBFbmQgb2YgJ3JvdGF0ZScgZnVuY3Rpb25cblxuICB2aWV3KGxvYywgYXQsIHVwMSkge1xuICAgIGxldCBcbiAgICAgIGRpciA9IGF0LnN1Yihsb2MpLm5vcm1hbGl6ZSgpLFxuICAgICAgcmlnaHQgPSBkaXIuY3Jvc3ModXAxKS5ub3JtYWxpemUoKSxcbiAgICAgIHVwID0gcmlnaHQuY3Jvc3MoZGlyKS5ub3JtYWxpemUoKTtcbiAgICBsZXQgbSA9IG1hdDQoKTtcblxuICAgIG0ubSA9IFxuICAgICAgW1xuICAgICAgICBbcmlnaHQueCwgdXAueCwgLWRpci54LCAwXSxcbiAgICAgICAgW3JpZ2h0LnksIHVwLnksIC1kaXIueSwgMF0sXG4gICAgICAgIFtyaWdodC56LCB1cC56LCAtZGlyLnosIDBdLFxuICAgICAgICBbLWxvYy5kb3QocmlnaHQpLCAtbG9jLmRvdChsb2MpLCBsb2MuZG90KGRpciksIDFdLFxuICAgICAgXTtcblxuICAgIHJldHVybiBtO1xuICB9IC8vIEVuZCBvZiAndmlldycgZnVuY3Rpb25cblxuICBmcnVzdHVtKGwsIHIsIGIsIHQsIG4sIGYpIHtcbiAgICByZXR1cm4gdGhpcy5tYXRyU2V0KFxuICAgICAgKDIgKiBuKSAvIChyIC0gbCksXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgKDIgKiBuKSAvICh0IC0gYiksXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIChyICsgbCkgLyAociAtIGwpLFxuICAgICAgKHQgKyBiKSAvICh0IC0gYiksXG4gICAgICAtKChmICsgbikgLyAoZiAtIG4pKSxcbiAgICAgIC0xLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICAtKCgyICogbiAqIGYpIC8gKGYgLSBuKSksXG4gICAgICAwLFxuICAgICk7XG4gIH0gLy8gRW5kIG9mICdmcnVzdHVtJyBmdW5jdGlvblxuXG4gIHRyYW5zcG9zZSgpIHtcbiAgICByZXR1cm4gdGhpcy5tYXRyU2V0KFxuICAgICAgdGhpcy5tWzBdWzBdLFxuICAgICAgdGhpcy5tWzFdWzBdLFxuICAgICAgdGhpcy5tWzJdWzBdLFxuICAgICAgdGhpcy5tWzNdWzBdLFxuICAgICAgdGhpcy5tWzBdWzFdLFxuICAgICAgdGhpcy5tWzFdWzFdLFxuICAgICAgdGhpcy5tWzJdWzFdLFxuICAgICAgdGhpcy5tWzNdWzFdLFxuICAgICAgdGhpcy5tWzBdWzJdLFxuICAgICAgdGhpcy5tWzFdWzJdLFxuICAgICAgdGhpcy5tWzJdWzJdLFxuICAgICAgdGhpcy5tWzNdWzJdLFxuICAgICAgdGhpcy5tWzBdWzNdLFxuICAgICAgdGhpcy5tWzFdWzNdLFxuICAgICAgdGhpcy5tWzJdWzNdLFxuICAgICAgdGhpcy5tWzNdWzNdLFxuICAgICk7XG4gIH0gLy8gRW5kIG9mICd0cmFuc3Bvc2UnIGZ1bmN0aW9uXG5cbiAgcm90YXRlWChBbmdsZSkge1xuICAgIGxldCBhID0gKEFuZ2xlICogTWF0aC5QSSkgLyAxODAsXG4gICAgICBzaSA9IE1hdGguc2luKGEpLFxuICAgICAgY28gPSBNYXRoLmNvcyhhKTtcblxuICAgIHJldHVybiB0aGlzLm1hdHJTZXQoMSwgMCwgMCwgMCwgMCwgY28sIHNpLCAwLCAwLCAtc2ksIGNvLCAwLCAwLCAwLCAwLCAxKTtcbiAgfSAvLyBFbmQgb2YgJ3JvdGF0ZVgnIGZ1bmN0aW9uXG5cbiAgcm90YXRlWShBbmdsZSkge1xuICAgIGxldCBhID0gKEFuZ2xlICogTWF0aC5QSSkgLyAxODAsXG4gICAgICBzaSA9IE1hdGguc2luKGEpLFxuICAgICAgY28gPSBNYXRoLmNvcyhhKTtcblxuICAgIHJldHVybiB0aGlzLm1hdHJTZXQoY28sIDAsIC1zaSwgMCwgMCwgMSwgMCwgMCwgc2ksIDAsIGNvLCAwLCAwLCAwLCAwLCAxKTtcbiAgfSAvLyBFbmQgb2YgJ3JvdGF0ZVlcblxuICByb3RhdGVaKEFuZ2xlKSB7XG4gICAgbGV0IGEgPSAoQW5nbGUgKiBNYXRoLlBJKSAvIDE4MCxcbiAgICAgIHNpID0gTWF0aC5zaW4oYSksXG4gICAgICBjbyA9IE1hdGguY29zKGEpO1xuXG4gICAgcmV0dXJuIHRoaXMubWF0clNldChjbywgc2ksIDAsIDAsIC1zaSwgY28sIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDEpO1xuICB9IC8vIEVuZCBvZiAncm90YXRlWlxuXG4gIHNjYWxlKHYpIHtcbiAgICByZXR1cm4gdGhpcy5tYXRyU2V0KHYueCwgMCwgMCwgMCwgMCwgdi55LCAwLCAwLCAwLCAwLCB2LnosIDAsIDAsIDAsIDAsIDEpO1xuICB9IC8vIEVuZCBvZiAnc2NhbGUnXG5cbiAgb3J0aG8obCwgciwgYiwgdCwgbiwgZikge1xuICAgIHJldHVybiB0aGlzLm1hdHJTZXQoXG4gICAgICAyIC8gKHIgLSBsKSxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICAyIC8gKHQgLSBiKSxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICAtMiAvIChmIC0gbiksXG4gICAgICAwLFxuICAgICAgLShyICsgbCkgLyAociAtIGwpLFxuICAgICAgLSh0ICsgYikgLyAodCAtIGIpLFxuICAgICAgLShmICsgbikgLyAoZiAtIG4pLFxuICAgICAgMSxcbiAgICApO1xuICB9IC8vIEVuZCBvZiAnb3J0aG8nIGZ1bmN0aW9uXG5cbn0gLy8gRW5kIG9mICdfbWF0NCcgZnVuY3Rpb25cblxuZXhwb3J0IGZ1bmN0aW9uIG1hdDQoLi4uYXJncykge1xuICByZXR1cm4gbmV3IF9tYXQ0KC4uLmFyZ3MpO1xufSAvLyBFbmQgb2YgJ21hdDQnIGZ1bmN0aW9uXG4iLCIvLyBTaGFkZXIgY2xhc3NcbmNsYXNzIF9zaGFkZXIge1xuICBhc3luYyBfaW5pdChuYW1lKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLmlkID0gbnVsbDtcbiAgICB0aGlzLnNoYWRlcnMgPVxuICAgIFtcbiAgICAgICB7XG4gICAgICAgICBpZDogbnVsbCxcbiAgICAgICAgIHR5cGU6IGdsLlZFUlRFWF9TSEFERVIsXG4gICAgICAgICBuYW1lOiBcInZlcnRcIixcbiAgICAgICAgIHNyYzogXCJcIixcbiAgICAgICB9LFxuICAgICAgIHtcbiAgICAgICAgaWQ6IG51bGwsXG4gICAgICAgIHR5cGU6IGdsLkZSQUdNRU5UX1NIQURFUixcbiAgICAgICAgbmFtZTogXCJmcmFnXCIsXG4gICAgICAgIHNyYzogXCJcIixcbiAgICAgIH1cbiAgICBdO1xuICAgIGZvciAoY29uc3QgcyBvZiB0aGlzLnNoYWRlcnMpIHtcbiAgICAgIGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBiaW4vc2hhZGVycy8ke25hbWV9LyR7cy5uYW1lfS5nbHNsYCk7XG4gICAgICBsZXQgc3JjID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpO1xuICAgICAgaWYgKHR5cGVvZiBzcmMgPT0gXCJzdHJpbmdcIiAmJiBzcmMgIT0gXCJcIilcbiAgICAgICAgcy5zcmMgPSBzcmM7XG4gICAgfVxuICAgIC8vIHJlY29tcGlsZSBzaGFkZXJzXG4gICAgdGhpcy51cGRhdGVTaGFkZXJzU291cmNlKCk7XG4gIH1cbiAgc3RhdGljSW5pdChuYW1lKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLmlkID0gbnVsbDtcbiAgICB0aGlzLnNoYWRlcnMgPVxuICAgIFtcbiAgICAgICB7XG4gICAgICAgICBpZDogbnVsbCxcbiAgICAgICAgIHR5cGU6IGdsLlZFUlRFWF9TSEFERVIsXG4gICAgICAgICBuYW1lOiBcInZlcnRcIixcbiAgICAgICAgIHNyYzogXCJcIixcbiAgICAgICB9LFxuICAgICAgIHtcbiAgICAgICAgaWQ6IG51bGwsXG4gICAgICAgIHR5cGU6IGdsLkZSQUdNRU5UX1NIQURFUixcbiAgICAgICAgbmFtZTogXCJmcmFnXCIsXG4gICAgICAgIHNyYzogXCJcIixcbiAgICAgIH1cbiAgICBdO1xuICAgIGxldCB2c190eHQgPVxuICAgIGAjdmVyc2lvbiAzMDAgZXNcbiAgICBwcmVjaXNpb24gaGlnaHAgZmxvYXQ7XG4gICAgaW4gdmVjMyBJblBvc2l0aW9uO1xuICAgIGluIHZlYzMgSW5Ob3JtYWw7XG5cbiAgICB1bmlmb3JtIG1hdDQgTWF0cldWUDtcbiAgICB1bmlmb3JtIG1hdDQgTWF0cldJbnY7XG5cbiAgICBvdXQgdmVjMyBEcmF3Tm9ybWFsO1xuICAgIFxuICAgIHZvaWQgbWFpbiggdm9pZCApXG4gICAge1xuICAgICAgZ2xfUG9zaXRpb24gPSBNYXRyV1ZQICogdmVjNChJblBvc2l0aW9uLCAxKTtcbiAgICAgIERyYXdOb3JtYWwgPSBub3JtYWxpemUobWF0MyhNYXRyV0ludikgKiBJbk5vcm1hbCk7XG4gICAgfVxuICAgIGA7XG4gICAgbGV0IGZzX3R4dCA9XG4gICAgYCN2ZXJzaW9uIDMwMCBlc1xuICAgIHByZWNpc2lvbiBoaWdocCBmbG9hdDtcbiAgICBpbiB2ZWMzIERyYXdOb3JtYWw7XG5cbiAgICB1bmlmb3JtIGZsb2F0IFRpbWU7XG4gICAgdW5pZm9ybSBtYXQ0IE1hdHJXVlA7XG5cbiAgICBvdXQgdmVjNCBPdXRDb2xvcjtcbiAgICBcbiAgICB2b2lkIG1haW4oIHZvaWQgKVxuICAgIHtcbiAgICAgIHZlYzMgTCA9IHZlYzMoMCwgMCwgMik7XG4gICAgICB2ZWMzIE4gPSBub3JtYWxpemUoZmFjZWZvcndhcmQoRHJhd05vcm1hbCwgLUwsIERyYXdOb3JtYWwpKTtcbiAgICAgIHZlYzMgY29sID0gdmVjMygwLjgsIDAuNDcsIDAuMzApICogZG90KE4sIEwpO1xuICAgICAgT3V0Q29sb3IgPSB2ZWM0KGNvbCwgMS4wKTtcbiAgICB9XG4gICAgYDtcbiAgICB0aGlzLnNoYWRlcnNbMF0uc3JjID0gdnNfdHh0O1xuICAgIHRoaXMuc2hhZGVyc1sxXS5zcmMgPSBmc190eHQ7XG4gICAgLy8gcmVjb21waWxlIHNoYWRlcnNcbiAgICB0aGlzLnVwZGF0ZVNoYWRlcnNTb3VyY2UoKTtcbiAgfSAgICAgICAgICAgICAgICAgICAgIFxuICB1cGRhdGVTaGFkZXJzU291cmNlKCkgeyBcbiAgICB0aGlzLnNoYWRlcnNbMF0uaWQgPSBudWxsO1xuICAgIHRoaXMuc2hhZGVyc1sxXS5pZCA9IG51bGw7XG4gICAgdGhpcy5pZCA9IG51bGw7XG4gICAgaWYgKHRoaXMuc2hhZGVyc1swXS5zcmMgPT0gXCJcIiB8fCB0aGlzLnNoYWRlcnNbMV0uc3JjID09IFwiXCIpXG4gICAgICByZXR1cm47XG4gICAgdGhpcy5zaGFkZXJzLmZvckVhY2gocyA9PiB7XG4gICAgICBzLmlkID0gZ2wuY3JlYXRlU2hhZGVyKHMudHlwZSk7XG4gICAgICBnbC5zaGFkZXJTb3VyY2Uocy5pZCwgcy5zcmMpO1xuICAgICAgZ2wuY29tcGlsZVNoYWRlcihzLmlkKTtcbiAgICAgIGlmICghZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKHMuaWQsIGdsLkNPTVBJTEVfU1RBVFVTKSkge1xuICAgICAgICBsZXQgYnVmID0gZ2wuZ2V0U2hhZGVySW5mb0xvZyhzLmlkKTtcbiAgICAgICAgY29uc29sZS5sb2coYFNoYWRlciAke3RoaXMubmFtZX0vJHtzLm5hbWV9IGNvbXBpbGUgZmFpbDogJHtidWZ9YCk7XG4gICAgICB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICB9KTsgICAgICAgICAgICAgXG4gICAgdGhpcy5pZCA9IGdsLmNyZWF0ZVByb2dyYW0oKTtcbiAgICB0aGlzLnNoYWRlcnMuZm9yRWFjaChzID0+IHtcbiAgICAgIGlmIChzLmlkICE9IG51bGwpXG4gICAgICAgIGdsLmF0dGFjaFNoYWRlcih0aGlzLmlkLCBzLmlkKTtcbiAgICB9KTtcbiAgICBnbC5saW5rUHJvZ3JhbSh0aGlzLmlkKTtcbiAgICBpZiAoIWdsLmdldFByb2dyYW1QYXJhbWV0ZXIodGhpcy5pZCwgZ2wuTElOS19TVEFUVVMpKSB7XG4gICAgICBsZXQgYnVmID0gZ2wuZ2V0UHJvZ3JhbUluZm9Mb2codGhpcy5pZCk7XG4gICAgICBjb25zb2xlLmxvZyhgU2hhZGVyIHByb2dyYW0gJHt0aGlzLm5hbWV9IGxpbmsgZmFpbDogJHtidWZ9YCk7XG4gICAgfSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgdGhpcy51cGRhdGVTaGFkZXJEYXRhKCk7ICAgIFxuICB9IFxuICB1cGRhdGVTaGFkZXJEYXRhKCkge1xuICAgIC8vIFNoYWRlciBhdHRyaWJ1dGVzXG4gICAgdGhpcy5hdHRycyA9IHt9O1xuICAgIGNvbnN0IGNvdW50QXR0cnMgPSBnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHRoaXMuaWQsIGdsLkFDVElWRV9BVFRSSUJVVEVTKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50QXR0cnM7IGkrKykge1xuICAgICAgY29uc3QgaW5mbyA9IGdsLmdldEFjdGl2ZUF0dHJpYih0aGlzLmlkLCBpKTtcbiAgICAgIHRoaXMuYXR0cnNbaW5mby5uYW1lXSA9IHtcbiAgICAgICAgbmFtZTogaW5mby5uYW1lLFxuICAgICAgICB0eXBlOiBpbmZvLnR5cGUsXG4gICAgICAgIHNpemU6IGluZm8uc2l6ZSxcbiAgICAgICAgbG9jOiBnbC5nZXRBdHRyaWJMb2NhdGlvbih0aGlzLmlkLCBpbmZvLm5hbWUpLFxuICAgICAgfTtcbiAgICB9XG4gXG4gICAgLy8gU2hhZGVyIHVuaWZvcm1zXG4gICAgdGhpcy51bmlmb3JtcyA9IHt9O1xuICAgIGNvbnN0IGNvdW50VW5pZm9ybXMgPSBnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHRoaXMuaWQsIGdsLkFDVElWRV9VTklGT1JNUyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudFVuaWZvcm1zOyBpKyspIHtcbiAgICAgIGNvbnN0IGluZm8gPSBnbC5nZXRBY3RpdmVVbmlmb3JtKHRoaXMuaWQsIGkpO1xuICAgICAgdGhpcy51bmlmb3Jtc1tpbmZvLm5hbWVdID0ge1xuICAgICAgICBuYW1lOiBpbmZvLm5hbWUsXG4gICAgICAgIHR5cGU6IGluZm8udHlwZSxcbiAgICAgICAgc2l6ZTogaW5mby5zaXplLFxuICAgICAgICBsb2M6IGdsLmdldFVuaWZvcm1Mb2NhdGlvbih0aGlzLmlkLCBpbmZvLm5hbWUpLFxuICAgICAgfTtcbiAgICB9XG4gXG4gICAgLy8gU2hhZGVyIHVuaWZvcm0gYmxvY2tzXG4gICAgdGhpcy51bmlmb3JtQmxvY2tzID0ge307XG4gICAgY29uc3QgY291bnRVbmlmb3JtQmxvY2tzID0gZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlcih0aGlzLmlkLCBnbC5BQ1RJVkVfVU5JRk9STV9CTE9DS1MpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnRVbmlmb3JtQmxvY2tzOyBpKyspIHtcbiAgICAgIGNvbnN0IGJsb2NrX25hbWUgPSBnbC5nZXRBY3RpdmVVbmlmb3JtQmxvY2tOYW1lKHRoaXMuaWQsIGkpO1xuICAgICAgY29uc3QgaW5kZXggPSBnbC5nZXRBY3RpdmVVbmlmb3JtQmxvY2tJbmRleCh0aGlzLmlkLCBibG9ja19uYW1lKTtcbiAgICAgIHRoaXMudW5pZm9ybUJsb2Nrc1tibG9ja19uYW1lXSA9IHtcbiAgICAgICAgbmFtZTogYmxvY2tfbmFtZSxcbiAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICBzaXplOiBnbC5nZXRBY3RpdmVVbmlmb3JtQmxvY2tQYXJhbWV0ZXIodGhpcy5pZCwgaWR4LCBnbC5VTklGT1JNX0JMT0NLX0RBVEFfU0laRSksXG4gICAgICAgIGJpbmQ6IGdsLmdldEFjdGl2ZVVuaWZvcm1CbG9ja1BhcmFtZXRlcih0aGlzLmlkLCBpZHgsIGdsLlVOSUZPUk1fQkxPQ0tfQklORElORyksXG4gICAgICB9O1xuICAgIH1cbiAgICBcbiAgfVxuICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgLy8vIHRoaXMuX2luaXQobmFtZSk7XG4gICAgdGhpcy5zdGF0aWNJbml0KG5hbWUpO1xuICB9XG4gIGFwcGx5KCkge1xuICAgIGlmICh0aGlzLmlkICE9IG51bGwpXG4gICAgICBnbC51c2VQcm9ncmFtKHRoaXMuaWQpO1xuICB9XG59XG5leHBvcnQgZnVuY3Rpb24gc2hhZGVyKG5hbWUpIHtcbiAgcmV0dXJuIG5ldyBfc2hhZGVyKG5hbWUpO1xufSIsImltcG9ydCB7IG1hdDQgfSBmcm9tIFwiLi9tYXQ0LmpzXCI7XG5pbXBvcnQgeyB2ZWMzIH0gZnJvbSBcIi4vdmVjMy5qc1wiO1xuXG5jbGFzcyBfY2FtZXJhIHtcbiAgbG9jID0gdmVjMygpO1xuICBhdCA9IHZlYzMoKTtcbiAgZGlyID0gdmVjMygpO1xuICByaWdodCA9IHZlYzMoKTtcbiAgdXAgPSB2ZWMzKCk7XG4gIG1hdHJWaWV3ID0gbWF0NCgpOyBcbiAgbWF0clByb2ogPSBtYXQ0KCk7IFxuICBtYXRyVlAgPSBtYXQ0KCk7XG4gIGZyYW1lVztcbiAgZnJhbWVIO1xuICB3cDtcbiAgaHA7XG4gIHByb2pTaXplO1xuICBwcm9qRGlzdDtcbiAgcHJvakZhckNsaXA7XG5cbiAgY2FtU2V0KGxvYywgYXQsIHVwKSB7XG4gICAgdGhpcy5tYXRyVmlldyA9IG1hdDQoKS52aWV3KGxvYywgYXQsIHVwKTtcblxuICAgIHRoaXMucmlnaHQgPSB2ZWMzKHRoaXMubWF0clZpZXcubVswXVswXSxcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hdHJWaWV3Lm1bMV1bMF0sXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXRyVmlldy5tWzJdWzBdKTtcblxuICAgIHRoaXMudXAgPSB2ZWMzKHRoaXMubWF0clZpZXcubVswXVsxXSxcbiAgICAgICAgICAgICAgICAgICB0aGlzLm1hdHJWaWV3Lm1bMV1bMV0sXG4gICAgICAgICAgICAgICAgICAgdGhpcy5tYXRyVmlldy5tWzJdWzFdKTtcbiAgICAgICAgICAgICAgICAgIFxuICAgIHRoaXMuZGlyID0gdmVjMygtdGhpcy5tYXRyVmlldy5tWzBdWzJdLFxuICAgICAgICAgICAgICAgICAgICAtdGhpcy5tYXRyVmlldy5tWzFdWzJdLFxuICAgICAgICAgICAgICAgICAgICAtdGhpcy5tYXRyVmlldy5tWzJdWzJdKTtcbiAgICAgICAgICAgICAgICAgICAgXG5cbiAgICB0aGlzLmxvYyA9IGxvYztcbiAgICB0aGlzLmF0ID0gYXQ7XG4gICAgdGhpcy5tYXRyVlAgPSB0aGlzLm1hdHJWaWV3Lm1hdHJNdWxNYXRyKHRoaXMubWF0clByb2opO1xuICB9IC8vIEVuZCBvZiAnY2FtU2V0JyBmdW5jdGlvblxuXG4gIGNhbVNldFByb2oocHJvalNpemUsIHByb2pEaXN0LCBwcm9qRmFyQ2xpcCkge1xuICAgIGxldCByeCwgcnk7XG5cbiAgICB0aGlzLnByb2pEaXN0ID0gcHJvakRpc3Q7XG4gICAgdGhpcy5wcm9qRmFyQ2xpcCA9IHByb2pGYXJDbGlwO1xuICAgIHJ4ID0gcnkgPSB0aGlzLnByb2pTaXplID0gcHJvalNpemU7XG5cbiAgICAvKiBDb3JyZWN0IGFzcGVjdCByYXRpbyAqL1xuICAgIGlmICh0aGlzLmZyYW1lVyA+PSB0aGlzLmZyYW1lSClcbiAgICAgIHJ4ICo9IHRoaXMuZnJhbWVXIC8gdGhpcy5mcmFtZUg7XG4gICAgZWxzZVxuICAgICAgcnkgKj0gdGhpcy5mcmFtZUggLyB0aGlzLmZyYW1lVztcblxuICAgIHRoaXMud3AgPSByeDtcbiAgICB0aGlzLmhwID0gcnk7XG4gICAgdGhpcy5tYXRyUHJvaiA9XG4gICAgICBtYXQ0KCkuZnJ1c3R1bSgtcnggLyAyLCByeCAvIDIsIC1yeSAvIDIsIHJ5IC8gMixcbiAgICAgICAgdGhpcy5wcm9qRGlzdCwgdGhpcy5wcm9qRmFyQ2xpcCk7XG4gICAgdGhpcy5NYXRyVlAgPSB0aGlzLm1hdHJWaWV3Lm1hdHJNdWxNYXRyKHRoaXMubWF0clByb2opO1xuICB9IC8vIEVuZCBvZiAnY2FtU2V0UHJvaicgZnVuY3Rpb25cbiAgY2FtU2V0U2l6ZShmcmFtZVcsIGZyYW1lSCkge1xuICAgIHRoaXMuZnJhbWVXID0gZnJhbWVXO1xuICAgIHRoaXMuZnJhbWVIID0gZnJhbWVIO1xuICAgIHRoaXMuc2V0UHJvaih0aGlzLnByb2pTaXplLCB0aGlzLnByb2pEaXN0LCB0aGlzLnByb2pGYXJDbGlwKTtcbiAgfSAvLyBFbmQgb2YgJ2NhbVNldFNpemUnIGZ1bmN0aW9uXG59IFxuXG5leHBvcnQgZnVuY3Rpb24gY2FtZXJhKC4uLmFyZ3MpIHtcbiAgcmV0dXJuIG5ldyBfY2FtZXJhKC4uLmFyZ3MpO1xufVxuXG4iLCJpbXBvcnQgeyB2ZWMzIH0gZnJvbSBcIi4uLy4uLy4uL210aC92ZWMzLmpzXCI7XG5cbi8vIG9yIGRpZmZlcmVudCB3YXlcbmNsYXNzIF92ZXJ0ZXgge1xuICBjb25zdHJ1Y3Rvcihwb3MsIG5vcm0pIHtcbiAgICB0aGlzLnBvcyA9IHBvcztcbiAgICB0aGlzLm5vcm0gPSBub3JtO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB2ZXJ0ZXgoLi4uYXJncykge1xuICByZXR1cm4gbmV3IF92ZXJ0ZXgoLi4uYXJncyk7XG59IC8vIEVuZCBvZiAndmVydGV4JyBmdW5jdGlvbiBcblxuY2xhc3MgX3ByaW0ge1xuICBzaGQ7XG4gIHZlcnRBcnJheTtcbiAgdmVydEJ1ZmZlcjtcbiAgaW5kQnVmZmVyO1xuICBudW1PZkVsZW1lbnRzO1xuXG4gIGNvbnN0cnVjdG9yKHNoZCwgdmVydCwgaW5kKSB7XG4gICAgbGV0IGFyciA9IFtdLCBpID0gMDtcblxuICAgIHRoaXMuc2hkID0gc2hkO1xuICAgIC8vYXV0b05vcm1hbCh2ZXJ0LCBpbmQpO1xuXG4gICAgZm9yIChsZXQgdiBvZiB2ZXJ0KSB7XG4gICAgICB2W2krK10gPSB2LnBvcy54O1xuICAgICAgdltpKytdID0gdi5wb3MueTtcbiAgICAgIHZbaSsrXSA9IHYucG9zLno7XG4gICAgICBcbiAgICAgIC8vIHZbaSsrXSA9IHYubm9ybS54O1xuICAgICAgLy8gdltpKytdID0gdi5ub3JtLnk7XG4gICAgICAvLyB2W2krK10gPSB2Lm5vcm0uejtcbiAgICB9XG5cbiAgICB0aGlzLm51bW9mRWxlbSA9IHZlcnQubGVuZ3RoO1xuXG4gICAgY29uc3QgcG9zTG9jID0gZ2wuZ2V0QXRycmliTG9jYXRpb24oc2hkLmlkLCBcIkluUG9zaXRpb25cIik7XG4gICAgY29uc3Qgbm9ybUxvYyA9IGdsLmdldEF0cnJpYkxvY2F0aW9uKHNoZC5pZCwgXCJJbk5vcm1hbFwiKTtcbiAgICB0aGlzLnZlcnRBcnJheSA9IGdsLmNyZWF0ZVZlcnRleEFycmF5KCk7XG4gICAgZ2wuYmluZFZlcnRleEFycmF5KHRoaXMudmVydEFycmF5KTtcbiAgICB0aGlzLnZlcnRCdWZmZXIgPSBnbC5jcmVhdGVCdWZmZXIoKTtcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdGhpcy52ZXJ0QnVmZmVyKTtcbiAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgbmV3IEZsb2F0MzJBcnJheShhcnIpLCBnbC5TVEFUSUNfRFJBVyk7XG5cbiAgICBpZiAocG9zTG9jICE9IC0xKSB7XG4gICAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHBvc0xvYywgMywgZ2wuRkxPQVQsIGZhbHNlLCAyNCwgMCk7XG4gICAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShwb3NMb2MpO1xuICAgIH1cbiAgICBpZiAobm9ybUxvYyAhPSAtMSkge1xuICAgICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcihub3JtTG9jLCAzLCBnbC5GTE9BVCwgZmFsc2UsIDI0LCAxMik7XG4gICAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShub3JtTG9jKTtcbiAgICB9XG5cbiAgICBpZiAoaW5kICE9IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5udW1PZkVsZW0gPSBpbmRleGVzLmxlbmd0aDtcbiAgICAgIFxuICAgICAgdGhpcy5pbmRCdWZmZXIgPSBnbC5jcmVhdGVCdWZmZXIoKTtcbiAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHRoaXMuaW5kQnVmZmVyKTtcbiAgICAgIGdsLmJ1ZmZlckRhdGEoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIG5ldyBVaW50MzJBcnJheShpbmQpLCBnbC5TVEFUSUNfRFJBVyk7ICBcbiAgICB9IFxuICB9XG5cbiAgcmVuZGVyKHdvcmxkLCBjYW0pIHtcbiAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoKTtcbiAgICBsZXQgdCA9IGRhdGUuZ2V0TWludXRlcygpICogNjAgK1xuICAgICAgICAgIGRhdGUuZ2V0U2Vjb25kcygpICtcbiAgICAgICAgICBkYXRlLmdldE1pbGxpc2Vjb25kcygpIC8gMTAwMDtcblxuICAgIGxldCB3dnAgPSB3b3JsZC5tYXRyTXVsTWF0cihjYW0ubWF0clZQKTtcbiAgICBsZXQgd2ludiA9IHdvcmxkLmludmVyc2UoKS50cmFuc3Bvc2UoKTtcbiAgICAgICAgICBcbiAgICBpZiAodGhpcy5zaGQudW5pZm9ybXNbJ01hdHJXVlAnXSAhPSB1bmRlZmluZWQpXG4gICAgICBnbC51bmlmb3JtTWF0cml4NGZ2KHRoaXMuc2hkLnVuaWZvcm1zWydNYXRyV1ZQJ10ubG9jLCBmYWxzZSwgbmV3IEZsb2F0MzJBcnJheSh3dnAudG9BcnJheSgpKSk7XG4gICAgaWYgKHRoaXMuc2hkLnVuaWZvcm1zWydNYXRyV0ludiddKVxuICAgICAgZ2wudW5pZm9ybU1hdHJpeDRmdih0aGlzLnNoZC51bmlmb3Jtc1snTWF0cldJbnYnXS5sb2MsIGZhbHNlLCBuZXcgRmxvYXQzMkFycmF5KHdpbnYudG9BcnJheSgpKSk7XG4gICAgaWYgKHRoaXMuc2hkLnVuaWZvcm1zWydUaW1lJ10pICAgICAgIFxuICAgICAgZ2wudW5pZm9ybTFmKHRoaXMuc2hkLnVuaWZvcm1zWydUaW1lJ10sbG9jLCB0KTtcbiAgICBcbiAgICBpZiAodGhpcy5zaGQuaWQgIT0gbnVsbCkge1xuICAgICAgaWYgKHRoaXMuaW5kQnVmZmVyID09IHVuZGVmaW5lZClcbiAgICAgICAgZ2wuZHJhd0FycmF5cyhnbC5UUklBTkdMRVMsIDAsIHRoaXMubnVtT2ZFbGVtKTtcbiAgICAgIGVsc2Uge1xuICAgICAgICBnbC5iaW5kQnVmZmVyKGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCB0aGlzLmluZEJ1ZmZlcik7XG4gICAgICAgIGdsLmRyYXdFbGVtZW50cyhnbC5UUklBTkdMRVMsIHRoaXMubnVtT2ZFbGVtLCBnbC5VTlNJR05FRF9JTlQsIDApO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBhdXRvTm9ybWFsKHZlcnRleGVzLCBpbmRleGVzKSB7XG4gIGlmIChpbmRleGVzID09IHVuZGVmaW5lZCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmVydGV4ZXMubGVuZ3RoOyBpICs9IDMpIHtcbiAgICAgIGxldCBub3JtID0gKHZlcnRleGVzW2kgKyAxXS5wb2ludC5zdWIodmVydGV4ZXNbaV0ucG9pbnQpKS5jcm9zcyh2ZXJ0ZXhlc1tpICsgMl0ucG9pbnQuc3ViKHZlcnRleGVzW2ldLnBvaW50KSkubm9ybSgpO1xuXG4gICAgICB2ZXJ0ZXhlc1tpXS5ub3JtYWwgPSB2ZXJ0ZXhlc1tpXS5ub3JtYWwuYWRkKG5vcm0pO1xuICAgICAgdmVydGV4ZXNbaSArIDFdLm5vcm1hbCA9IHZlcnRleGVzW2kgKyAxXS5ub3JtYWwuYWRkKG5vcm0pO1xuICAgICAgdmVydGV4ZXNbaSArIDJdLm5vcm1hbCA9IHZlcnRleGVzW2kgKyAyXS5ub3JtYWwuYWRkKG5vcm0pO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGluZGV4ZXMubGVuZ3RoOyBpICs9IDMpIHtcbiAgICAgIGxldCBcbiAgICAgICAgbjAgPSBpbmRleGVzW2ldLCBuMSA9IGluZGV4ZXNbaSArIDFdLCBuMiA9IGluZGV4ZXNbaSArIDJdO1xuICAgICAgbGV0XG4gICAgICAgIHAwID0gdmVydGV4ZXNbbjBdLnBvaW50LFxuICAgICAgICBwMSA9IHZlcnRleGVzW24xXS5wb2ludCxcbiAgICAgICAgcDIgPSB2ZXJ0ZXhlc1tuMl0ucG9pbnQsXG4gICAgICAgIG5vcm0gPSBwMS5zdWIocDApLmNyb3NzKHAyLnN1YihwMCkpLm5vcm1hbGl6ZSgpO1xuICBcbiAgICAgICAgdmVydGV4ZXNbbjBdLm5vcm1hbCA9IHZlcnRleGVzW24wXS5ub3JtYWwuYWRkKG5vcm0pO1xuICAgICAgICB2ZXJ0ZXhlc1tuMV0ubm9ybWFsID0gdmVydGV4ZXNbbjFdLm5vcm1hbC5hZGQobm9ybSk7XG4gICAgICAgIHZlcnRleGVzW24yXS5ub3JtYWwgPSB2ZXJ0ZXhlc1tuMl0ubm9ybWFsLmFkZChub3JtKTtcbiAgICB9XG4gICAgXG4gICAgZm9yIChsZXQgaSBpbiB2ZXJ0ZXhlcykge1xuICAgICAgdmVydGV4ZXNbaV0ubm9ybWFsID0gdmVydGV4ZXNbaV0ubm9ybWFsLm5vcm0oKTtcbiAgICB9XG4gIH1cblxufSAvLyBFbmQgb2YgJ2F1dG9Ob3JtYWwnIGZ1bmN0aW9uXG5cbmV4cG9ydCBmdW5jdGlvbiBwcmltKC4uLmFyZ3MpIHtcbiAgcmV0dXJuIG5ldyBfcHJpbSguLi5hcmdzKTtcbn0gLy8gRW5kIG9mICdwcmltJyBmdW5jdGlvbiIsImltcG9ydCB7IHZlcnRleCB9IGZyb20gXCIuLi9hbmltL3JuZC9ybmRwcmltLmpzXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0Q3ViZSgpIHtcclxuICByZXR1cm4gW3ZlcnRleCgwKSwgdmVydGV4KDEsIDAsIDApLCB2ZXJ0ZXgoMCwgMSwgMCksIHZlcnRleCgwLCAwLCAxKSwgdmVydGV4KDEsIDEsIDApLCB2ZXJ0ZXgoMSwgMCwgMSksIHZlcnRleCgwLCAxLCAxKSwgdmVydGV4KDEpXTtcclxufVxyXG4iLCJpbXBvcnQgeyB2ZWMzIH0gZnJvbSBcIi4vbXRoL3ZlYzMuanNcIjtcbmltcG9ydCB7IG1hdDQgfSBmcm9tIFwiLi9tdGgvbWF0NC5qc1wiO1xuaW1wb3J0IHsgc2hhZGVyIH0gZnJvbSBcIi4vc3JjL2FuaW0vcm5kL3NoYWRlcl9jbGFzc19wYXR0ZXJuLmpzXCI7XG5pbXBvcnQgeyBjYW1lcmEgfSBmcm9tIFwiLi9tdGgvY2FtLmpzXCI7XG5pbXBvcnQgeyByZW5kZXIsIGluaXRHTCB9IGZyb20gXCIuL3NyYy9hbmltL3JuZC9yZW5kZXIuanNcIjtcbmltcG9ydCB7IHNldEN1YmUgfSBmcm9tIFwiLi9zcmMvZmlndXJlL2ZpZ3VyZXMuanNcIjtcbmltcG9ydCB7IHByaW0gfSBmcm9tIFwiLi9zcmMvYW5pbS9ybmQvcm5kcHJpbS5qc1wiO1xuXG5mdW5jdGlvbiBtYWluKCkge1xuICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI215Q2FuXCIpO1xuICBjb25zdCBnbCA9IGNhbnZhcy5nZXRDb250ZXh0KFwid2ViZ2wyXCIpO1xuXG4gIGlmICh3aW5kb3cuZ2wgPT0gdW5kZWZpbmVkKSB7XG4gICAgd2luZG93LmdsID0gZ2w7XG4gIH1cblxuICBpZiAoZ2wgPT09IG51bGwpIHtcbiAgICBhbGVydChcIldlYkdMMiBub3Qgc3VwcG9ydGVkXCIpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vaW5pdEdMKCk7XG4gIC8vbG9hZFNoXG4gIGdsLmVuYWJsZShnbC5ERVBUSF9URVNUKTtcbiAgXG4gIGdsLmNsZWFyQ29sb3IoMC4zMCwgMC40NywgMC44LCAxLjApO1xuICBsZXQgc2hkICA9IHNoYWRlcihcImRlZmF1bHRcIik7XG5cbiAgY29uc3QgY2FtID0gY2FtZXJhKCk7XG4gIFxuICBjYW0uZnJhbWVXID0gY2FudmFzLmNsaWVudFdpZHRoO1xuICBjYW0uZnJhbWVIID0gY2FudmFzLmNsaWVudEhlaWdodDtcbiAgY2FtLnByb2pEaXN0ID0gMC4xO1xuICBjYW0ucHJvalNpemUgPSAwLjE7XG4gIGNhbS5wcm9qRmFyQ2xpcCA9IDMwMDtcblxuICBjYW0uY2FtU2V0KHZlYzMoMCwgMCwgNCksIHZlYzMoMCksIHZlYzMoMCwgMSwgMCkpO1xuICBjYW0uY2FtU2V0UHJvaigwLjEsIDAuMSwgMzAwKTtcblxuICBsZXQgaW5kID0gW1xuICAgIDAsIDEsIDIsIFxuICAgIDEsIDIsIDQsIFxuICAgIDEsIDQsIDcsIFxuICAgIDEsIDcsIDUsIFxuICAgIDcsIDUsIDMsIFxuICAgIDcsIDMsIDYsXG4gICAgMCwgMSwgMyxcbiAgICAzLCAxLCA1LFxuICAgIDYsIDMsIDAsXG4gICAgNiwgMCwgMixcbiAgICAyLCA2LCA3LFxuICAgIDIsIDcsIDRcbiAgXTtcblxuICBsZXQgcHJpbXMgPSBwcmltKHNoZCwgc2V0Q3ViZSgpLCBpbmQpO1xuXG4gIHNoZC5hcHBseSgpO1xuXG4gIGNvbnN0IGFuaW0gPSAoKSA9PiB7XG4gICAgZ2wuY2xlYXIoZ2wuQ09MT1JfQlVGRkVSX0JJVCk7XG4gICAgZ2wuY2xlYXIoZ2wuREVQVEhfQlVGRkVSX0JJVCk7XG5cbiAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoKTtcbiAgICBsZXQgdCA9IGRhdGUuZ2V0TWludXRlcygpICogNjAgK1xuICAgICAgICAgIGRhdGUuZ2V0U2Vjb25kcygpICtcbiAgICAgICAgICBkYXRlLmdldE1pbGxpc2Vjb25kcygpIC8gMTAwMDtcblxuICAgIHByaW1zLnJlbmRlcihtYXQ0KCkucm90YXRlWSgzMCAqIHQpLm1hdHJNdWxNYXRyKG1hdDQoKS5yb3RhdGVYKDMwICogdCkpLCBjYW0pO1xuXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltKTtcbiAgfTtcblxuICBhbmltKCk7XG59XG5cbmNvbnNvbGUubG9nKFwiQ0dTRyBmb3JldmVyISEhXCIpO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKCkgPT4ge1xuICBtYWluKCk7XG59KTtcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7RUFBQSxNQUFNLEtBQUssQ0FBQztFQUNaLEVBQUUsV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0VBQ3ZCLElBQUksSUFBSSxDQUFDLElBQUksU0FBUyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztFQUNqRSxTQUFTLElBQUksT0FBTyxDQUFDLElBQUksUUFBUTtFQUNqQyxNQUFNLElBQUksQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzNFLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzFELFNBQVMsSUFBSSxDQUFDLElBQUksU0FBUyxJQUFJLENBQUMsSUFBSSxTQUFTO0VBQzdDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQy9DLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQ2xELEdBQUc7QUFDSDtFQUNBLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRTtFQUNULElBQUksSUFBSSxPQUFPLENBQUMsSUFBSSxRQUFRLEVBQUU7RUFDOUIsTUFBTSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQ3RELEtBQUs7RUFDTCxJQUFJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUQsR0FBRztBQUNIO0VBQ0EsRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFO0VBQ1QsSUFBSSxJQUFJLE9BQU8sQ0FBQyxJQUFJLFFBQVEsRUFBRTtFQUM5QixNQUFNLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7RUFDdEQsS0FBSztFQUNMLElBQUksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxRCxHQUFHO0FBQ0g7RUFDQSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUU7RUFDVCxJQUFJLElBQUksT0FBTyxDQUFDLElBQUksUUFBUSxFQUFFO0VBQzlCLE1BQU0sT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztFQUN0RCxLQUFLO0VBQ0wsSUFBSSxPQUFPLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RELEdBQUc7QUFDSDtFQUNBLEVBQUUsTUFBTSxDQUFDLENBQUMsRUFBRTtFQUNaLElBQUksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztFQUNwRCxHQUFHO0FBQ0g7RUFDQSxFQUFFLEdBQUcsR0FBRztFQUNSLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDekMsSUFBSSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUM3QjtFQUNBLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUU7RUFDOUIsTUFBTSxPQUFPLEdBQUcsQ0FBQztFQUNqQixLQUFLO0VBQ0wsSUFBSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDMUIsR0FBRztBQUNIO0VBQ0EsRUFBRSxJQUFJLEdBQUc7RUFDVCxJQUFJLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3pDO0VBQ0EsSUFBSSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0VBQzFCLEdBQUc7QUFDSDtFQUNBLEVBQUUsR0FBRyxHQUFHO0VBQ1IsSUFBSSxPQUFPLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzNDLEdBQUc7QUFDSDtFQUNBLEVBQUUsU0FBUyxHQUFHO0VBQ2QsSUFBSSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzdCO0VBQ0EsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRTtFQUM5QixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQzNCLE1BQU0sT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQzlCLEtBQUs7RUFDTCxJQUFJLE9BQU8sSUFBSSxDQUFDO0VBQ2hCLEdBQUc7QUFDSDtFQUNBLEVBQUUsU0FBUyxDQUFDLENBQUMsRUFBRTtFQUNmLElBQUksT0FBTyxJQUFJO0VBQ2YsTUFBTSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDbEUsTUFBTSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDbEUsTUFBTSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDbEUsS0FBSyxDQUFDO0VBQ04sR0FBRztBQUNIO0VBQ0EsRUFBRSxPQUFPLENBQUMsQ0FBQyxFQUFFO0VBQ2IsSUFBSSxJQUFJLENBQUM7RUFDVCxNQUFNLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDeEIs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QUM7RUFDMUIsTUFBTSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztFQUMxQixLQUFLLENBQUM7QUFDTjtFQUNBLElBQUksT0FBTyxDQUFDLENBQUM7RUFDYixHQUFHO0FBQ0g7RUFDQSxFQUFFLFNBQVMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRTtFQUN6RCxJQUFJO0VBQ0osTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUc7RUFDckIsTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUc7RUFDckIsTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUc7RUFDckIsTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUc7RUFDckIsTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUc7RUFDckIsTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUc7RUFDckIsTUFBTTtFQUNOLEdBQUc7QUFDSDtFQUNBLEVBQUUsTUFBTSxHQUFHO0VBQ1gsSUFBSTtFQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNuQixRQUFRLElBQUksQ0FBQyxTQUFTO0VBQ3RCLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdEIsVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0QixVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdEIsVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0QixVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdEIsVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0QixVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLFNBQVM7RUFDVCxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDbkIsUUFBUSxJQUFJLENBQUMsU0FBUztFQUN0QixVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdEIsVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0QixVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdEIsVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0QixVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdEIsVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0QixTQUFTO0VBQ1QsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ25CLFFBQVEsSUFBSSxDQUFDLFNBQVM7RUFDdEIsVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0QixVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdEIsVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0QixVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdEIsVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0QixVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdEIsU0FBUztFQUNULE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNuQixRQUFRLElBQUksQ0FBQyxTQUFTO0VBQ3RCLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdEIsVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0QixVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdEIsVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0QixVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdEIsVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0QixVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLFNBQVM7RUFDVCxNQUFNO0VBQ04sR0FBRztBQUNIO0VBQ0EsRUFBRSxhQUFhLENBQUMsQ0FBQyxFQUFFO0VBQ25CLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3ZCLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3ZCLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3ZCLElBQUksT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDO0VBQ2xCLEdBQUc7QUFDSDtFQUNBLEVBQUUsV0FBVyxDQUFDLEVBQUUsRUFBRTtFQUNsQixJQUFJLElBQUksQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDO0FBQ25CO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMvQixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDL0IsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQy9CLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2hDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDL0IsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQy9CLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMvQixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNoQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQy9CLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMvQixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDL0IsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDaEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMvQixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDL0IsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQy9CLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2hDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDL0IsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQy9CLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMvQixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNoQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQy9CLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMvQixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDL0IsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDaEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMvQixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDL0IsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQy9CLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2hDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDL0IsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQy9CLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMvQixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNoQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQy9CLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMvQixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDL0IsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDaEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMvQixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDL0IsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQy9CLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2hDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDL0IsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQy9CLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMvQixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNoQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQy9CLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMvQixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDL0IsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDaEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMvQixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDL0IsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQy9CLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2hDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDL0IsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQy9CLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMvQixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNoQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQy9CLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMvQixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDL0IsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDaEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMvQixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDL0IsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQy9CLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2hDO0VBQ0EsSUFBSSxPQUFPLENBQUMsQ0FBQztFQUNiLEdBQUc7QUFDSDtFQUNBLEVBQUUsT0FBTyxHQUFHO0VBQ1osSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQztFQUNuQixJQUFJLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUM1QjtFQUNBLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQzNCO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUztFQUNyQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixPQUFPLEdBQUcsR0FBRyxDQUFDO0FBQ2Q7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTO0VBQ3JCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLE9BQU8sR0FBRyxHQUFHLENBQUM7QUFDZDtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVM7RUFDckIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsT0FBTyxHQUFHLEdBQUcsQ0FBQztBQUNkO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUztFQUNyQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixPQUFPLEdBQUcsR0FBRyxDQUFDO0FBQ2Q7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTO0VBQ3JCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLE9BQU8sR0FBRyxHQUFHLENBQUM7QUFDZDtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVM7RUFDckIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsT0FBTyxHQUFHLEdBQUcsQ0FBQztBQUNkO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUztFQUNyQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixPQUFPLEdBQUcsR0FBRyxDQUFDO0FBQ2Q7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTO0VBQ3JCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLE9BQU8sR0FBRyxHQUFHLENBQUM7QUFDZDtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVM7RUFDckIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsT0FBTyxHQUFHLEdBQUcsQ0FBQztBQUNkO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUztFQUNyQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixPQUFPLEdBQUcsR0FBRyxDQUFDO0FBQ2Q7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTO0VBQ3JCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLE9BQU8sR0FBRyxHQUFHLENBQUM7QUFDZDtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVM7RUFDckIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsT0FBTyxHQUFHLEdBQUcsQ0FBQztBQUNkO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUztFQUNyQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixPQUFPLEdBQUcsR0FBRyxDQUFDO0FBQ2Q7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTO0VBQ3JCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLE9BQU8sR0FBRyxHQUFHLENBQUM7QUFDZDtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVM7RUFDckIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsT0FBTyxHQUFHLEdBQUcsQ0FBQztBQUNkO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUztFQUNyQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixPQUFPLEdBQUcsR0FBRyxDQUFDO0FBQ2Q7RUFDQSxJQUFJLE9BQU8sQ0FBQyxDQUFDO0VBQ2IsR0FBRztBQUNIO0VBQ0EsRUFBRSxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRTtFQUNuQixJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLElBQUksR0FBRztFQUNuQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztFQUNyQixNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3RCO0VBQ0EsSUFBSSxPQUFPLElBQUksQ0FBQyxPQUFPO0VBQ3ZCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQzdCLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7RUFDbkMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztFQUNuQyxNQUFNLENBQUM7RUFDUCxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO0VBQ25DLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQzdCLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7RUFDbkMsTUFBTSxDQUFDO0VBQ1AsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztFQUNuQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO0VBQ25DLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQzdCLE1BQU0sQ0FBQztFQUNQLE1BQU0sQ0FBQztFQUNQLE1BQU0sQ0FBQztFQUNQLE1BQU0sQ0FBQztFQUNQLE1BQU0sQ0FBQztFQUNQLEtBQUssQ0FBQztFQUNOLEdBQUc7QUFDSDtFQUNBLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFO0VBQ3JCLElBQUk7RUFDSixNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRTtFQUNuQyxNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRTtFQUN4QyxNQUFNLEVBQUUsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO0VBQ3hDLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUM7QUFDbkI7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDO0VBQ1AsTUFBTTtFQUNOLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUNsQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDbEMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQ2xDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQ3pELE9BQU8sQ0FBQztBQUNSO0VBQ0EsSUFBSSxPQUFPLENBQUMsQ0FBQztFQUNiLEdBQUc7QUFDSDtFQUNBLEVBQUUsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0VBQzVCLElBQUksT0FBTyxJQUFJLENBQUMsT0FBTztFQUN2QixNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQ3ZCLE1BQU0sQ0FBQztFQUNQLE1BQU0sQ0FBQztFQUNQLE1BQU0sQ0FBQztFQUNQLE1BQU0sQ0FBQztFQUNQLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDdkIsTUFBTSxDQUFDO0VBQ1AsTUFBTSxDQUFDO0VBQ1AsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUN2QixNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQ3ZCLE1BQU0sRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQzFCLE1BQU0sQ0FBQyxDQUFDO0VBQ1IsTUFBTSxDQUFDO0VBQ1AsTUFBTSxDQUFDO0VBQ1AsTUFBTSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQzlCLE1BQU0sQ0FBQztFQUNQLEtBQUssQ0FBQztFQUNOLEdBQUc7QUFDSDtFQUNBLEVBQUUsU0FBUyxHQUFHO0VBQ2QsSUFBSSxPQUFPLElBQUksQ0FBQyxPQUFPO0VBQ3ZCLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDbEIsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNsQixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2xCLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDbEIsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFD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LENBQUM7QUFDeEM7RUFDQSxJQUFJLElBQUksR0FBRyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0VBQzVDLElBQUksSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDO0VBQzNDO0VBQ0EsSUFBSSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLFNBQVM7RUFDakQsTUFBTSxFQUFFLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxJQUFJLFlBQVksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO0VBQ3BHLElBQUksSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUM7RUFDckMsTUFBTSxFQUFFLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO0VBQ3RHLElBQUksSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7RUFDakMsTUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztFQUNyRDtFQUNBLElBQUksSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxJQUFJLEVBQUU7RUFDN0IsTUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksU0FBUztFQUNyQyxRQUFRLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFD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
