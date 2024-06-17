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

      if (len == 0 || len == 1)
        return this;
      
      len = Math.sqrt(len);
      return this.divNum(len);
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
      //gl_Position = vec4(InPosition, 1);
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
      vec3 col = vec3(0.1, 0.1, 0.30) * dot(N, L);
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
                      

      this.loc = vec3(loc);
      this.at = vec3(at);
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
      this.matrVP = this.matrView.matrMulMatr(this.matrProj);
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
    pos = vec3();
    norm = vec3();

    constructor(x, y, z) {
      if (typeof (x) == "object") {
        this.pos = vec3(x);
      } else {
        this.pos = vec3(x, y, z);
      }
      
      // if (pos == "number") {
      //   this.pos = vec3(pos, pos, pos);
      //   this.norm = vec3(norm, norm, norm);
      // } else {
      //   this.pos = pos;
      //   this.norm = norm;
      // }
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
      let vertexes = [], i = 0;

      this.shd = shd;
      autoNormal(vert, ind);

      for (let v of vert) {
        vertexes[i++] = v.pos.x;
        vertexes[i++] = v.pos.y;
        vertexes[i++] = v.pos.z;
        
        vertexes[i++] = v.norm.x;
        vertexes[i++] = v.norm.y;
        vertexes[i++] = v.norm.z;
      }
      this.numOfElem = vert.length;

      const posLoc = gl.getAttribLocation(shd.id, "InPosition");
      const normLoc = gl.getAttribLocation(shd.id, "InNormal");
      this.vertArray = gl.createVertexArray();
      gl.bindVertexArray(this.vertArray);
      this.vertBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this.vertBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexes), gl.STATIC_DRAW);

      if (posLoc != -1) {
        gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, 24, 0);
        gl.enableVertexAttribArray(posLoc);
      }
      if (normLoc != -1) {
        gl.vertexAttribPointer(normLoc, 3, gl.FLOAT, false, 24, 12);
        gl.enableVertexAttribArray(normLoc);
      }

      if (ind != undefined) {
        this.numOfElem = ind.length;
        
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
      if (this.shd.uniforms['MatrWInv'] != undefined)
        gl.uniformMatrix4fv(this.shd.uniforms['MatrWInv'].loc, false, new Float32Array(winv.toArray()));
      if (this.shd.uniforms['Time'] != undefined)
        gl.uniform1f(this.shd.uniforms['Time'], loc, t);
      
      if (this.shd.id != null) {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertBuffer);

        if (this.indBuffer == undefined)
          gl.drawArrays(gl.TRIANGLES, 0, this.numOfElem);
        else {
          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indBuffer);
          gl.drawElements(gl.TRIANGLES, this.numOfElem, gl.UNSIGNED_INT, 0);
        }
      }
    }
  }

  function autoNormal(vertexes, indexes) {
    if (indexes == undefined) {
      for (let i = 0; i < vertexes.length; i += 3) {
        let norm = (vertexes[i + 1].pos.sub(vertexes[i].pos)).cross(vertexes[i + 2].pos.sub(vertexes[i].pos)).normalize();

        vertexes[i].norm = vertexes[i].norm.add(norm);
        vertexes[i + 1].norm = vertexes[i + 1].norm.add(norm);
        vertexes[i + 2].norm = vertexes[i + 2].norm.add(norm);
      }
    } else {
      for (let i = 0; i < indexes.length; i += 3) {
        let
          n0 = indexes[i], n1 = indexes[i + 1], n2 = indexes[i + 2];
        let p0 = vec3(), p1 = vec3(), p2 = vec3(), norm = vec3();

        p0 = vertexes[n0].pos;
        p1 = vertexes[n1].pos;
        p2 = vertexes[n2].pos;
        
        norm = p1.sub(p0).cross(p2.sub(p0)).normalize();
    
        vertexes[n0].norm = vertexes[n0].norm.add(norm);
        vertexes[n1].norm = vertexes[n1].norm.add(norm);
        vertexes[n2].norm = vertexes[n2].norm.add(norm);
      }
      
      for (let i in vertexes) {
        vertexes[i].norm = vertexes[i].norm.normalize();
      }
    }

  } // End of 'autoNormal' function

  function prim(...args) {
    return new _prim(...args);
  } // End of 'prim' function

  function setCube() {
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

    let vert = [vertex(0), vertex(1, 0, 0), vertex(0, 1, 0), vertex(0, 0, 1), vertex(1, 1, 0), vertex(1, 0, 1), vertex(0, 1, 1), vertex(1)];

    let verts = [];
    for (let i of ind) {
      let vrtx = vertex(vert[i].pos);
      verts.push(vrtx);
    }

    return verts;
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

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsiLi4vbXRoL3ZlYzMuanMiLCIuLi9tdGgvbWF0NC5qcyIsIi4uL3NyYy9hbmltL3JuZC9zaGFkZXJfY2xhc3NfcGF0dGVybi5qcyIsIi4uL210aC9jYW0uanMiLCIuLi9zcmMvYW5pbS9ybmQvcm5kcHJpbS5qcyIsIi4uL3NyYy9maWd1cmUvZmlndXJlcy5qcyIsIi4uL21haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgX3ZlYzMge1xuICBjb25zdHJ1Y3Rvcih4LCB5LCB6KSB7XG4gICAgaWYgKHggPT0gdW5kZWZpbmVkKSAodGhpcy54ID0gMCksICh0aGlzLnkgPSAwKSwgKHRoaXMueiA9IDApO1xuICAgIGVsc2UgaWYgKHR5cGVvZiB4ID09IFwib2JqZWN0XCIpXG4gICAgICBpZiAoeC5sZW5naHQgPT0gMykgKHRoaXMueCA9IHhbMF0pLCAodGhpcy55ID0geFsxXSksICh0aGlzLnogPSB4WzJdKTtcbiAgICAgIGVsc2UgKHRoaXMueCA9IHgueCksICh0aGlzLnkgPSB4LnkpLCAodGhpcy56ID0geC56KTtcbiAgICBlbHNlIGlmICh5ID09IHVuZGVmaW5lZCB8fCB6ID09IHVuZGVmaW5lZClcbiAgICAgICh0aGlzLnggPSB4KSwgKHRoaXMueSA9IHgpLCAodGhpcy56ID0geCk7XG4gICAgZWxzZSAodGhpcy54ID0geCksICh0aGlzLnkgPSB5KSwgKHRoaXMueiA9IHopO1xuICB9IC8vIEVuZCBvZiAnY29uc3RydWN0b3InIGZ1bmN0aW9uXG5cbiAgYWRkKHYpIHtcbiAgICBpZiAodHlwZW9mIHYgPT0gXCJudW1iZXJcIikge1xuICAgICAgcmV0dXJuIHZlYzModGhpcy54ICsgdiwgdGhpcy55ICsgdiwgdGhpcy56ICsgdik7XG4gICAgfVxuICAgIHJldHVybiB2ZWMzKHRoaXMueCArIHYueCwgdGhpcy55ICsgdi55LCB0aGlzLnogKyB2LnopO1xuICB9IC8vIEVuZCBvZiAnYWRkJyBmdW5jdGlvblxuXG4gIHN1Yih2KSB7XG4gICAgaWYgKHR5cGVvZiB2ID09IFwibnVtYmVyXCIpIHtcbiAgICAgIHJldHVybiB2ZWMzKHRoaXMueCAtIHYsIHRoaXMueSAtIHYsIHRoaXMueiAtIHYpO1xuICAgIH1cbiAgICByZXR1cm4gdmVjMyh0aGlzLnggLSB2LngsIHRoaXMueSAtIHYueSwgdGhpcy56IC0gdi56KTtcbiAgfSAvLyBFbmQgb2YgJ3N1YicgZnVuY3Rpb25cblxuICBkb3Qodikge1xuICAgIGlmICh0eXBlb2YgdiA9PSBcIm51bWJlclwiKSB7XG4gICAgICByZXR1cm4gdmVjMyh0aGlzLnggKiB2LCB0aGlzLnkgKiB2LCB0aGlzLnogKiB2KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMueCAqIHYueCArIHRoaXMueSAqIHYueSArIHRoaXMueiAqIHYuejtcbiAgfSAvLyBFbmQgb2YgJ2RvdCcgZnVuY3Rpb25cblxuICBkaXZOdW0odikge1xuICAgIHJldHVybiB2ZWMzKHRoaXMueCAvIHYsIHRoaXMueSAvIHYsIHRoaXMueiAvIHYpO1xuICB9IC8vIEVuZCBvZiAnZGl2TnVtJyBmdW5jdGlvblxuXG4gIGxlbigpIHtcbiAgICBsZXQgdiA9IHZlYzModGhpcy54LCB0aGlzLnksIHRoaXMueik7XG4gICAgbGV0IGxlbiA9IHRoaXMuZG90KHYsIHYpOyBcblxuICAgIGlmIChsZW4gPT0gMSB8fCBsZW4gPT0gMCkge1xuICAgICAgcmV0dXJuIGxlbjtcbiAgICB9XG4gICAgcmV0dXJuIE1hdGguc3FydChsZW4pO1xuICB9IC8vIEVuZCBvZiAnbGVuJyBmdW5jdGlvblxuXG4gIGxlbjIoKSB7XG4gICAgbGV0IHYgPSB2ZWMzKHRoaXMueCwgdGhpcy55LCB0aGlzLnopO1xuXG4gICAgcmV0dXJuIHRoaXMuZG90KHYsIHYpO1xuICB9IC8vIEVuZCBvZiAnbGVuJyBmdW5jdGlvblxuXG4gIG5lZygpIHtcbiAgICByZXR1cm4gdmVjMygtdGhpcy54LCAtdGhpcy55LCAtdGhpcy56KTtcbiAgfSAvLyBFbmQgb2YgJ25lZycgZnVuY3Rpb25cblxuICBub3JtYWxpemUoKSB7XG4gICAgbGV0IGxlbiA9IHRoaXMuZG90KHRoaXMpO1xuXG4gICAgaWYgKGxlbiA9PSAwIHx8IGxlbiA9PSAxKVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgXG4gICAgbGVuID0gTWF0aC5zcXJ0KGxlbik7XG4gICAgcmV0dXJuIHRoaXMuZGl2TnVtKGxlbik7XG4gIH0gLy8gRW5kIG9mICdub3JtYWxpemUnIGZ1bmN0aW9uXG5cbiAgdHJhbnNmb3JtKG0pIHtcbiAgICByZXR1cm4gdmVjMyhcbiAgICAgIHRoaXMueCAqIG0ubVswXVswXSArIHRoaXMueSAqIG0ubVsxXVswXSArIHRoaXMueiAqIG0ubVsyXVswXSxcbiAgICAgIHRoaXMueCAqIG0ubVswXVsxXSArIHRoaXMueSAqIG0ubVsxXVsxXSArIHRoaXMueiAqIG0ubVsyXVsxXSxcbiAgICAgIHRoaXMueCAqIG0ubVswXVsyXSArIHRoaXMueSAqIG0ubVsxXVsyXSArIHRoaXMueiAqIG0ubVsyXVsyXVxuICAgICk7XG4gIH0gLy8gRW5kIG9mICd0cmFuc2Zvcm0nIGZ1bmN0aW9uXG5cbiAgTXVsTWF0cihtKSB7XG4gICAgbGV0IHcgPVxuICAgICAgdGhpcy54ICogbS5tWzBdWzNdICtcbiAgICAgIHRoaXMueSAqIG0ubVsxXVszXSArXG4gICAgICB0aGlzLnogKiBtLm1bMl1bM10gK1xuICAgICAgdGhpcy5tWzNdWzNdO1xuXG4gICAgcmV0dXJuIHZlYzMoXG4gICAgICAodGhpcy54ICogbS5tWzBdWzBdICtcbiAgICAgICAgdGhpcy55ICogbS5tWzFdWzBdICtcbiAgICAgICAgdGhpcy56ICogbS5tWzJdWzBdICtcbiAgICAgICAgbS5tWzNdWzBdKSAvXG4gICAgICAgIHcsXG4gICAgICAodGhpcy54ICogbS5tWzBdWzFdICtcbiAgICAgICAgdGhpcy55ICogbS5tWzFdWzFdICtcbiAgICAgICAgdGhpcy56ICogbS5tWzJdWzFdICtcbiAgICAgICAgbS5tWzNdWzFdKSAvXG4gICAgICAgIHcsXG4gICAgICAodGhpcy54ICogbS5tWzBdWzJdICtcbiAgICAgICAgdGhpcy55ICogbS5tWzFdWzJdICtcbiAgICAgICAgdGhpcy56ICogbS5tWzJdWzJdICtcbiAgICAgICAgbS5tWzNdWzJdKSAvXG4gICAgICAgIHdcbiAgICApO1xuICB9IC8vIEVuZCBvZiAndmVjTXVsTWF0cicgZnVuY3Rpb25cblxuICBjcm9zcyh2KSB7XG4gICAgcmV0dXJuIHZlYzModGhpcy55ICogdi56IC0gdGhpcy56ICogdi55LFxuICAgICAgdGhpcy56ICogdi54IC0gdGhpcy54ICogdi56LFxuICAgICAgdGhpcy54ICogdi55IC0gdGhpcy55ICogdi54KTtcbiAgfSAvLyBFbmQgb2YgJ3ZlY0Nyb3NzVmVjJyBmdW5jdGlvblxuXG4gIHBvaW50VHJhbnNmb3JtKG0pIHtcbiAgICB2ZWMzU2V0KFxuICAgICAgdGhpcy54ICogbS5tWzBdWzBdICsgdGhpcy55ICogbS5tWzFdWzBdICsgdGhpcy56ICogbS5tWzJdWzBdICsgbS5tWzNdWzBdLFxuICAgICAgdGhpcy54ICogbS5tWzBdWzFdICsgdGhpcy55ICogbS5tWzFdWzFdICsgdGhpcy56ICogbS5tWzJdWzFdICsgbS5tWzNdWzFdLFxuICAgICAgdGhpcy54ICogbS5tWzBdWzJdICsgdGhpcy55ICogbS5tWzFdWzJdICsgdGhpcy56ICogbS5tWzJdWzJdICsgbS5tWzNdWzJdXG4gICAgKTtcbiAgfSAvLyBFbmQgb2YgJ3BvaW50VHJhbnNmcm9tJyBmdW5jdGlvblxufSAvLyBFbmQgb2YgJ192ZWMzJyBjbGFzcyBmdW5jdGlvblxuXG5leHBvcnQgZnVuY3Rpb24gdmVjMyguLi5hcmdzKSB7XG4gIHJldHVybiBuZXcgX3ZlYzMoLi4uYXJncyk7XG59IC8vIEVuZCBvZiAndmVjMycgZnVuY3Rpb25cbiIsImltcG9ydCB7IHZlYzMgfSBmcm9tIFwiLi92ZWMzLmpzXCI7XG5cbmNsYXNzIF9tYXQ0IHtcbiAgY29uc3RydWN0b3IobSA9IG51bGwpIHtcbiAgICBpZiAobSA9PSBudWxsKSB7XG4gICAgICB0aGlzLm0gPSBbXG4gICAgICAgIFsxLCAwLCAwLCAwXSxcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMSwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAxXSxcbiAgICAgIF07XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgbSA9PSBcIm9iamVjdFwiICYmIG0ubGVuZ3RoID09IDQpIHtcbiAgICAgIHRoaXMubSA9IG07XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubSA9IG0ubTtcbiAgICB9XG4gIH0gLy8gRW5kIG9mICdjb25zdHJ1Y3RvcicgZnVuY3Rpb25cblxuICAgIHRvQXJyYXkoKSB7XG4gICAgICByZXR1cm4gW10uY29uY2F0KC4uLnRoaXMubSk7XG4gICAgfVxuXG4gIG1hdHJTZXQoYTAwLCBhMDEsIGEwMiwgYTAzLCBcbiAgICAgICAgICBhMTAsIGExMSwgYTEyLCBhMTMsXG4gICAgICAgICAgYTIwLCBhMjEsIGEyMiwgYTIzLFxuICAgICAgICAgIGEzMCwgYTMxLCBhMzIsIGEzMywpIHtcbiAgICBsZXQgbSA9IG1hdDQoKTtcblxuICAgIG0ubSA9IFtcbiAgICAgIFthMDAsIGEwMSwgYTAyLCBhMDNdLFxuICAgICAgW2ExMCwgYTExLCBhMTIsIGExM10sXG4gICAgICBbYTIwLCBhMjEsIGEyMiwgYTIzXSxcbiAgICAgIFthMzAsIGEzMSwgYTMyLCBhMzNdLFxuICAgIF07XG5cbiAgICByZXR1cm4gbTtcbiAgfSAvLyBFbmQgb2YgJ21hdHJTZXQnIGZ1bmN0aW9uXG5cbiAgZGV0ZXJtM3gzKGExMSwgYTEyLCBhMTMsIGEyMSwgYTIyLCBhMjMsIGEzMSwgYTMyLCBhMzMpIHtcbiAgICByZXR1cm4gKFxuICAgICAgYTExICogYTIyICogYTMzICtcbiAgICAgIGExMiAqIGEyMyAqIGEzMSArXG4gICAgICBhMTMgKiBhMjEgKiBhMzIgLVxuICAgICAgYTExICogYTIzICogYTMyIC1cbiAgICAgIGExMiAqIGEyMSAqIGEzMyAtXG4gICAgICBhMTMgKiBhMjIgKiBhMzFcbiAgICApO1xuICB9IC8vIEVuZCBvZiAnZGV0ZXJtM3gzJyBmdW5jdGlvblxuXG4gIGRldGVybSgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgK3RoaXMubVswXVswXSAqXG4gICAgICAgIHRoaXMuZGV0ZXJtM3gzKFxuICAgICAgICAgIHRoaXMubVsxXVsxXSxcbiAgICAgICAgICB0aGlzLm1bMV1bMl0sXG4gICAgICAgICAgdGhpcy5tWzFdWzNdLFxuICAgICAgICAgIHRoaXMubVsyXVsxXSxcbiAgICAgICAgICB0aGlzLm1bMl1bMl0sXG4gICAgICAgICAgdGhpcy5tWzJdWzNdLFxuICAgICAgICAgIHRoaXMubVszXVsxXSxcbiAgICAgICAgICB0aGlzLm1bM11bMl0sXG4gICAgICAgICAgdGhpcy5tWzNdWzNdLFxuICAgICAgICApICtcbiAgICAgIC10aGlzLm1bMF1bMV0gKlxuICAgICAgICB0aGlzLmRldGVybTN4MyhcbiAgICAgICAgICB0aGlzLm1bMV1bMF0sXG4gICAgICAgICAgdGhpcy5tWzFdWzJdLFxuICAgICAgICAgIHRoaXMubVsxXVszXSxcbiAgICAgICAgICB0aGlzLm1bMl1bMF0sXG4gICAgICAgICAgdGhpcy5tWzJdWzJdLFxuICAgICAgICAgIHRoaXMubVsyXVszXSxcbiAgICAgICAgICB0aGlzLm1bM11bMF0sXG4gICAgICAgICAgdGhpcy5tWzNdWzJdLFxuICAgICAgICAgIHRoaXMubVszXVszXSxcbiAgICAgICAgKSArXG4gICAgICArdGhpcy5tWzBdWzJdICpcbiAgICAgICAgdGhpcy5kZXRlcm0zeDMoXG4gICAgICAgICAgdGhpcy5tWzFdWzBdLFxuICAgICAgICAgIHRoaXMubVsxXVsxXSxcbiAgICAgICAgICB0aGlzLm1bMV1bM10sXG4gICAgICAgICAgdGhpcy5tWzJdWzBdLFxuICAgICAgICAgIHRoaXMubVsyXVsxXSxcbiAgICAgICAgICB0aGlzLm1bMl1bM10sXG4gICAgICAgICAgdGhpcy5tWzNdWzBdLFxuICAgICAgICAgIHRoaXMubVszXVsxXSxcbiAgICAgICAgICB0aGlzLm1bM11bM10sXG4gICAgICAgICkgK1xuICAgICAgLXRoaXMubVswXVszXSAqXG4gICAgICAgIHRoaXMuZGV0ZXJtM3gzKFxuICAgICAgICAgIHRoaXMubVsxXVswXSxcbiAgICAgICAgICB0aGlzLm1bMV1bMV0sXG4gICAgICAgICAgdGhpcy5tWzFdWzJdLFxuICAgICAgICAgIHRoaXMubVsyXVswXSxcbiAgICAgICAgICB0aGlzLm1bMl1bMV0sXG4gICAgICAgICAgdGhpcy5tWzJdWzJdLFxuICAgICAgICAgIHRoaXMubVszXVswXSxcbiAgICAgICAgICB0aGlzLm1bM11bMV0sXG4gICAgICAgICAgdGhpcy5tWzNdWzJdLFxuICAgICAgICApXG4gICAgKTtcbiAgfSAvLyBFbmQgb2YgJ2RldGVybScgZnVuY3Rpb25cblxuICBtYXRyVHJhbnNsYXRlKHYpIHtcbiAgICB0aGlzLm1bM11bMF0gPSB2Lng7XG4gICAgdGhpcy5tWzNdWzFdID0gdi55O1xuICAgIHRoaXMubVszXVsyXSA9IHYuejtcbiAgICByZXR1cm4gdGhpcy5tO1xuICB9IC8vIEVuZCBvZiAnbWF0clRyYW5zbGF0ZScgZnVuY3Rpb25cblxuICBtYXRyTXVsTWF0cihtMSkge1xuICAgIGxldCByID0gbWF0NCgpO1xuXG4gICAgci5tWzBdWzBdID0gdGhpcy5tWzBdWzBdICogbTEubVswXVswXSArIHRoaXMubVswXVsxXSAqIG0xLm1bMV1bMF0gKyB0aGlzLm1bMF1bMl0gKiBtMS5tWzJdWzBdICtcbiAgICB0aGlzLm1bMF1bM10gKiBtMS5tWzNdWzBdO1xuXG4gICAgci5tWzBdWzFdID0gdGhpcy5tWzBdWzBdICogbTEubVswXVsxXSArIHRoaXMubVswXVsxXSAqIG0xLm1bMV1bMV0gKyB0aGlzLm1bMF1bMl0gKiBtMS5tWzJdWzFdICtcbiAgICAgIHRoaXMubVswXVszXSAqIG0xLm1bM11bMV07XG5cbiAgICByLm1bMF1bMl0gPSB0aGlzLm1bMF1bMF0gKiBtMS5tWzBdWzJdICsgdGhpcy5tWzBdWzFdICogbTEubVsxXVsyXSArIHRoaXMubVswXVsyXSAqIG0xLm1bMl1bMl0gK1xuICAgICAgdGhpcy5tWzBdWzNdICogbTEubVszXVsyXTtcblxuICAgIHIubVswXVszXSA9IHRoaXMubVswXVswXSAqIG0xLm1bMF1bM10gKyB0aGlzLm1bMF1bMV0gKiBtMS5tWzFdWzNdICsgdGhpcy5tWzBdWzJdICogbTEubVsyXVszXSArXG4gICAgICB0aGlzLm1bMF1bM10gKiBtMS5tWzNdWzNdO1xuXG5cbiAgICByLm1bMV1bMF0gPSB0aGlzLm1bMV1bMF0gKiBtMS5tWzBdWzBdICsgdGhpcy5tWzFdWzFdICogbTEubVsxXVswXSArIHRoaXMubVsxXVsyXSAqIG0xLm1bMl1bMF0gK1xuICAgICAgdGhpcy5tWzFdWzNdICogbTEubVszXVswXTtcblxuICAgIHIubVsxXVsxXSA9IHRoaXMubVsxXVswXSAqIG0xLm1bMF1bMV0gKyB0aGlzLm1bMV1bMV0gKiBtMS5tWzFdWzFdICsgdGhpcy5tWzFdWzJdICogbTEubVsyXVsxXSArXG4gICAgICB0aGlzLm1bMV1bM10gKiBtMS5tWzNdWzFdO1xuXG4gICAgci5tWzFdWzJdID0gdGhpcy5tWzFdWzBdICogbTEubVswXVsyXSArIHRoaXMubVsxXVsxXSAqIG0xLm1bMV1bMl0gKyB0aGlzLm1bMV1bMl0gKiBtMS5tWzJdWzJdICtcbiAgICAgIHRoaXMubVsxXVszXSAqIG0xLm1bM11bMl07XG5cbiAgICByLm1bMV1bM10gPSB0aGlzLm1bMV1bMF0gKiBtMS5tWzBdWzNdICsgdGhpcy5tWzFdWzFdICogbTEubVsxXVszXSArIHRoaXMubVsxXVsyXSAqIG0xLm1bMl1bM10gK1xuICAgICAgdGhpcy5tWzFdWzNdICogbTEubVszXVszXTtcblxuXG4gICAgci5tWzJdWzBdID0gdGhpcy5tWzJdWzBdICogbTEubVswXVswXSArIHRoaXMubVsyXVsxXSAqIG0xLm1bMV1bMF0gKyB0aGlzLm1bMl1bMl0gKiBtMS5tWzJdWzBdICtcbiAgICAgIHRoaXMubVsyXVszXSAqIG0xLm1bM11bMF07XG5cbiAgICByLm1bMl1bMV0gPSB0aGlzLm1bMl1bMF0gKiBtMS5tWzBdWzFdICsgdGhpcy5tWzJdWzFdICogbTEubVsxXVsxXSArIHRoaXMubVsyXVsyXSAqIG0xLm1bMl1bMV0gK1xuICAgICAgdGhpcy5tWzJdWzNdICogbTEubVszXVsxXTtcblxuICAgICAgXG4gICAgci5tWzJdWzJdID0gdGhpcy5tWzJdWzBdICogbTEubVswXVsyXSArIHRoaXMubVsyXVsxXSAqIG0xLm1bMV1bMl0gKyB0aGlzLm1bMl1bMl0gKiBtMS5tWzJdWzJdICtcbiAgICAgIHRoaXMubVsyXVszXSAqIG0xLm1bM11bMl07XG5cbiAgICByLm1bMl1bM10gPSB0aGlzLm1bMl1bMF0gKiBtMS5tWzBdWzNdICsgdGhpcy5tWzJdWzFdICogbTEubVsxXVszXSArIHRoaXMubVsyXVsyXSAqIG0xLm1bMl1bM10gK1xuICAgICAgdGhpcy5tWzJdWzNdICogbTEubVszXVszXTtcblxuXG4gICAgci5tWzNdWzBdID0gdGhpcy5tWzNdWzBdICogbTEubVswXVswXSArIHRoaXMubVszXVsxXSAqIG0xLm1bMV1bMF0gKyB0aGlzLm1bM11bMl0gKiBtMS5tWzJdWzBdICtcbiAgICAgIHRoaXMubVszXVszXSAqIG0xLm1bM11bMF07XG5cbiAgICByLm1bM11bMV0gPSB0aGlzLm1bM11bMF0gKiBtMS5tWzBdWzFdICsgdGhpcy5tWzNdWzFdICogbTEubVsxXVsxXSArIHRoaXMubVszXVsyXSAqIG0xLm1bMl1bMV0gK1xuICAgICAgdGhpcy5tWzNdWzNdICogbTEubVszXVsxXTtcblxuICAgIHIubVszXVsyXSA9IHRoaXMubVszXVswXSAqIG0xLm1bMF1bMl0gKyB0aGlzLm1bM11bMV0gKiBtMS5tWzFdWzJdICsgdGhpcy5tWzNdWzJdICogbTEubVsyXVsyXSArXG4gICAgICB0aGlzLm1bM11bM10gKiBtMS5tWzNdWzJdO1xuXG4gICAgci5tWzNdWzNdID0gdGhpcy5tWzNdWzBdICogbTEubVswXVszXSArIHRoaXMubVszXVsxXSAqIG0xLm1bMV1bM10gKyB0aGlzLm1bM11bMl0gKiBtMS5tWzJdWzNdICtcbiAgICAgIHRoaXMubVszXVszXSAqIG0xLm1bM11bM107XG5cbiAgICByZXR1cm4gcjtcbiAgfSAvLyBFbmQgb2YgJ01hdHJNdWxNYXRyJyBmdW5jdGlvblxuXG4gIGludmVyc2UoKSB7XG4gICAgbGV0IHIgPSBtYXQ0KCk7XG4gICAgbGV0IGRldCA9IHRoaXMuZGV0ZXJtKCk7XG5cbiAgICBpZiAoZGV0ID09IDApIHJldHVybiByO1xuXG4gICAgci5tWzBdWzBdID1cbiAgICAgICt0aGlzLmRldGVybTN4MyhcbiAgICAgICAgdGhpcy5tWzFdWzFdLFxuICAgICAgICB0aGlzLm1bMV1bMl0sXG4gICAgICAgIHRoaXMubVsxXVszXSxcbiAgICAgICAgdGhpcy5tWzJdWzFdLFxuICAgICAgICB0aGlzLm1bMl1bMl0sXG4gICAgICAgIHRoaXMubVsyXVszXSxcbiAgICAgICAgdGhpcy5tWzNdWzFdLFxuICAgICAgICB0aGlzLm1bM11bMl0sXG4gICAgICAgIHRoaXMubVszXVszXSxcbiAgICAgICkgLyBkZXQ7XG5cbiAgICByLm1bMV1bMF0gPVxuICAgICAgLXRoaXMuZGV0ZXJtM3gzKFxuICAgICAgICB0aGlzLm1bMV1bMF0sXG4gICAgICAgIHRoaXMubVsxXVsyXSxcbiAgICAgICAgdGhpcy5tWzFdWzNdLFxuICAgICAgICB0aGlzLm1bMl1bMF0sXG4gICAgICAgIHRoaXMubVsyXVsyXSxcbiAgICAgICAgdGhpcy5tWzJdWzNdLFxuICAgICAgICB0aGlzLm1bM11bMF0sXG4gICAgICAgIHRoaXMubVszXVsyXSxcbiAgICAgICAgdGhpcy5tWzNdWzNdLFxuICAgICAgKSAvIGRldDtcblxuICAgIHIubVsyXVswXSA9XG4gICAgICArdGhpcy5kZXRlcm0zeDMoXG4gICAgICAgIHRoaXMubVsxXVswXSxcbiAgICAgICAgdGhpcy5tWzFdWzFdLFxuICAgICAgICB0aGlzLm1bMV1bM10sXG4gICAgICAgIHRoaXMubVsyXVswXSxcbiAgICAgICAgdGhpcy5tWzJdWzFdLFxuICAgICAgICB0aGlzLm1bMl1bM10sXG4gICAgICAgIHRoaXMubVszXVswXSxcbiAgICAgICAgdGhpcy5tWzNdWzFdLFxuICAgICAgICB0aGlzLm1bM11bM10sXG4gICAgICApIC8gZGV0O1xuXG4gICAgci5tWzNdWzBdID1cbiAgICAgIC10aGlzLmRldGVybTN4MyhcbiAgICAgICAgdGhpcy5tWzFdWzBdLFxuICAgICAgICB0aGlzLm1bMV1bMV0sXG4gICAgICAgIHRoaXMubVsxXVsyXSxcbiAgICAgICAgdGhpcy5tWzJdWzBdLFxuICAgICAgICB0aGlzLm1bMl1bMV0sXG4gICAgICAgIHRoaXMubVsyXVsyXSxcbiAgICAgICAgdGhpcy5tWzNdWzBdLFxuICAgICAgICB0aGlzLm1bM11bMV0sXG4gICAgICAgIHRoaXMubVszXVsyXSxcbiAgICAgICkgLyBkZXQ7XG5cbiAgICByLm1bMF1bMV0gPVxuICAgICAgLXRoaXMuZGV0ZXJtM3gzKFxuICAgICAgICB0aGlzLm1bMF1bMV0sXG4gICAgICAgIHRoaXMubVswXVsyXSxcbiAgICAgICAgdGhpcy5tWzBdWzNdLFxuICAgICAgICB0aGlzLm1bMl1bMV0sXG4gICAgICAgIHRoaXMubVsyXVsyXSxcbiAgICAgICAgdGhpcy5tWzJdWzNdLFxuICAgICAgICB0aGlzLm1bM11bMV0sXG4gICAgICAgIHRoaXMubVszXVsyXSxcbiAgICAgICAgdGhpcy5tWzNdWzNdLFxuICAgICAgKSAvIGRldDtcblxuICAgIHIubVsxXVsxXSA9XG4gICAgICArdGhpcy5kZXRlcm0zeDMoXG4gICAgICAgIHRoaXMubVswXVswXSxcbiAgICAgICAgdGhpcy5tWzBdWzJdLFxuICAgICAgICB0aGlzLm1bMF1bM10sXG4gICAgICAgIHRoaXMubVsyXVswXSxcbiAgICAgICAgdGhpcy5tWzJdWzJdLFxuICAgICAgICB0aGlzLm1bMl1bM10sXG4gICAgICAgIHRoaXMubVszXVswXSxcbiAgICAgICAgdGhpcy5tWzNdWzJdLFxuICAgICAgICB0aGlzLm1bM11bM10sXG4gICAgICApIC8gZGV0O1xuXG4gICAgci5tWzJdWzFdID1cbiAgICAgIC10aGlzLmRldGVybTN4MyhcbiAgICAgICAgdGhpcy5tWzBdWzBdLFxuICAgICAgICB0aGlzLm1bMF1bMV0sXG4gICAgICAgIHRoaXMubVswXVszXSxcbiAgICAgICAgdGhpcy5tWzJdWzBdLFxuICAgICAgICB0aGlzLm1bMl1bMV0sXG4gICAgICAgIHRoaXMubVsyXVszXSxcbiAgICAgICAgdGhpcy5tWzNdWzBdLFxuICAgICAgICB0aGlzLm1bM11bMV0sXG4gICAgICAgIHRoaXMubVszXVszXSxcbiAgICAgICkgLyBkZXQ7XG5cbiAgICByLm1bM11bMV0gPVxuICAgICAgK3RoaXMuZGV0ZXJtM3gzKFxuICAgICAgICB0aGlzLm1bMF1bMF0sXG4gICAgICAgIHRoaXMubVswXVsxXSxcbiAgICAgICAgdGhpcy5tWzBdWzJdLFxuICAgICAgICB0aGlzLm1bMl1bMF0sXG4gICAgICAgIHRoaXMubVsyXVsxXSxcbiAgICAgICAgdGhpcy5tWzJdWzJdLFxuICAgICAgICB0aGlzLm1bM11bMF0sXG4gICAgICAgIHRoaXMubVszXVsxXSxcbiAgICAgICAgdGhpcy5tWzNdWzJdLFxuICAgICAgKSAvIGRldDtcblxuICAgIHIubVswXVsyXSA9XG4gICAgICArdGhpcy5kZXRlcm0zeDMoXG4gICAgICAgIHRoaXMubVswXVsxXSxcbiAgICAgICAgdGhpcy5tWzBdWzJdLFxuICAgICAgICB0aGlzLm1bMF1bM10sXG4gICAgICAgIHRoaXMubVsxXVsxXSxcbiAgICAgICAgdGhpcy5tWzFdWzJdLFxuICAgICAgICB0aGlzLm1bMV1bM10sXG4gICAgICAgIHRoaXMubVszXVsxXSxcbiAgICAgICAgdGhpcy5tWzNdWzJdLFxuICAgICAgICB0aGlzLm1bM11bM10sXG4gICAgICApIC8gZGV0O1xuXG4gICAgci5tWzFdWzJdID1cbiAgICAgIC10aGlzLmRldGVybTN4MyhcbiAgICAgICAgdGhpcy5tWzBdWzBdLFxuICAgICAgICB0aGlzLm1bMF1bMl0sXG4gICAgICAgIHRoaXMubVswXVszXSxcbiAgICAgICAgdGhpcy5tWzFdWzBdLFxuICAgICAgICB0aGlzLm1bMV1bMl0sXG4gICAgICAgIHRoaXMubVsxXVszXSxcbiAgICAgICAgdGhpcy5tWzNdWzBdLFxuICAgICAgICB0aGlzLm1bM11bMl0sXG4gICAgICAgIHRoaXMubVszXVszXSxcbiAgICAgICkgLyBkZXQ7XG5cbiAgICByLm1bMl1bMl0gPVxuICAgICAgK3RoaXMuZGV0ZXJtM3gzKFxuICAgICAgICB0aGlzLm1bMF1bMF0sXG4gICAgICAgIHRoaXMubVswXVsxXSxcbiAgICAgICAgdGhpcy5tWzBdWzNdLFxuICAgICAgICB0aGlzLm1bMV1bMF0sXG4gICAgICAgIHRoaXMubVsxXVsxXSxcbiAgICAgICAgdGhpcy5tWzFdWzNdLFxuICAgICAgICB0aGlzLm1bM11bMF0sXG4gICAgICAgIHRoaXMubVszXVsxXSxcbiAgICAgICAgdGhpcy5tWzNdWzNdLFxuICAgICAgKSAvIGRldDtcblxuICAgIHIubVszXVsyXSA9XG4gICAgICAtdGhpcy5kZXRlcm0zeDMoXG4gICAgICAgIHRoaXMubVswXVswXSxcbiAgICAgICAgdGhpcy5tWzBdWzFdLFxuICAgICAgICB0aGlzLm1bMF1bMl0sXG4gICAgICAgIHRoaXMubVsxXVswXSxcbiAgICAgICAgdGhpcy5tWzFdWzFdLFxuICAgICAgICB0aGlzLm1bMV1bMl0sXG4gICAgICAgIHRoaXMubVszXVswXSxcbiAgICAgICAgdGhpcy5tWzNdWzFdLFxuICAgICAgICB0aGlzLm1bM11bMl0sXG4gICAgICApIC8gZGV0O1xuXG4gICAgci5tWzBdWzNdID1cbiAgICAgIC10aGlzLmRldGVybTN4MyhcbiAgICAgICAgdGhpcy5tWzBdWzFdLFxuICAgICAgICB0aGlzLm1bMF1bMl0sXG4gICAgICAgIHRoaXMubVswXVszXSxcbiAgICAgICAgdGhpcy5tWzFdWzFdLFxuICAgICAgICB0aGlzLm1bMV1bMl0sXG4gICAgICAgIHRoaXMubVsxXVszXSxcbiAgICAgICAgdGhpcy5tWzJdWzFdLFxuICAgICAgICB0aGlzLm1bMl1bMl0sXG4gICAgICAgIHRoaXMubVsyXVszXSxcbiAgICAgICkgLyBkZXQ7XG5cbiAgICByLm1bMV1bM10gPVxuICAgICAgK3RoaXMuZGV0ZXJtM3gzKFxuICAgICAgICB0aGlzLm1bMF1bMF0sXG4gICAgICAgIHRoaXMubVswXVsyXSxcbiAgICAgICAgdGhpcy5tWzBdWzNdLFxuICAgICAgICB0aGlzLm1bMV1bMF0sXG4gICAgICAgIHRoaXMubVsxXVsyXSxcbiAgICAgICAgdGhpcy5tWzFdWzNdLFxuICAgICAgICB0aGlzLm1bMl1bMF0sXG4gICAgICAgIHRoaXMubVsyXVsyXSxcbiAgICAgICAgdGhpcy5tWzJdWzNdLFxuICAgICAgKSAvIGRldDtcblxuICAgIHIubVsyXVszXSA9XG4gICAgICAtdGhpcy5kZXRlcm0zeDMoXG4gICAgICAgIHRoaXMubVswXVswXSxcbiAgICAgICAgdGhpcy5tWzBdWzFdLFxuICAgICAgICB0aGlzLm1bMF1bM10sXG4gICAgICAgIHRoaXMubVsxXVswXSxcbiAgICAgICAgdGhpcy5tWzFdWzFdLFxuICAgICAgICB0aGlzLm1bMV1bM10sXG4gICAgICAgIHRoaXMubVsyXVswXSxcbiAgICAgICAgdGhpcy5tWzJdWzFdLFxuICAgICAgICB0aGlzLm1bMl1bM10sXG4gICAgICApIC8gZGV0O1xuXG4gICAgci5tWzNdWzNdID1cbiAgICAgICt0aGlzLmRldGVybTN4MyhcbiAgICAgICAgdGhpcy5tWzBdWzBdLFxuICAgICAgICB0aGlzLm1bMF1bMV0sXG4gICAgICAgIHRoaXMubVswXVsyXSxcbiAgICAgICAgdGhpcy5tWzFdWzBdLFxuICAgICAgICB0aGlzLm1bMV1bMV0sXG4gICAgICAgIHRoaXMubVsxXVsyXSxcbiAgICAgICAgdGhpcy5tWzJdWzBdLFxuICAgICAgICB0aGlzLm1bMl1bMV0sXG4gICAgICAgIHRoaXMubVsyXVsyXSxcbiAgICAgICkgLyBkZXQ7XG5cbiAgICByZXR1cm4gcjtcbiAgfSAvLyBFbmQgb2YgJ2ludmVyc2UnIGZ1bmN0aW9uXG5cbiAgcm90YXRlKEFuZ2xlLCB2KSB7XG4gICAgbGV0IGEgPSAoQW5nbGUgKiBNYXRoLlBJKSAvIDE4MCxcbiAgICAgIHMgPSBNYXRoLnNpbihhKSxcbiAgICAgIGMgPSBNYXRoLmNvcyhhKTtcblxuICAgIHJldHVybiB0aGlzLm1hdHJTZXQoXG4gICAgICBjICsgdi54ICogdi54ICogKDEgLSBjKSxcbiAgICAgIHYueSAqIHYueCAqICgxIC0gYykgLSB2LnogKiBzLFxuICAgICAgdi56ICogdi54ICogKDEgLSBjKSArIHYueSAqIHMsXG4gICAgICAwLFxuICAgICAgdi54ICogdi55ICogKDEgLSBjKSArIHYueiAqIHMsXG4gICAgICBjICsgdi55ICogdi55ICogKDEgLSBjKSxcbiAgICAgIHYueiAqIHYueSAqICgxIC0gYykgLSB2LnggKiBzLFxuICAgICAgMCxcbiAgICAgIHYueCAqIHYueiAqICgxIC0gYykgLSB2LnkgKiBzLFxuICAgICAgdi55ICogdi56ICogKDEgLSBjKSArIHYueCAqIHMsXG4gICAgICBjICsgdi56ICogdi56ICogKDEgLSBjKSxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICAxLFxuICAgICk7XG4gIH0gLy8gRW5kIG9mICdyb3RhdGUnIGZ1bmN0aW9uXG5cbiAgdmlldyhsb2MsIGF0LCB1cDEpIHtcbiAgICBsZXQgXG4gICAgICBkaXIgPSBhdC5zdWIobG9jKS5ub3JtYWxpemUoKSxcbiAgICAgIHJpZ2h0ID0gZGlyLmNyb3NzKHVwMSkubm9ybWFsaXplKCksXG4gICAgICB1cCA9IHJpZ2h0LmNyb3NzKGRpcikubm9ybWFsaXplKCk7XG4gICAgbGV0IG0gPSBtYXQ0KCk7XG5cbiAgICBtLm0gPSBcbiAgICAgIFtcbiAgICAgICAgW3JpZ2h0LngsIHVwLngsIC1kaXIueCwgMF0sXG4gICAgICAgIFtyaWdodC55LCB1cC55LCAtZGlyLnksIDBdLFxuICAgICAgICBbcmlnaHQueiwgdXAueiwgLWRpci56LCAwXSxcbiAgICAgICAgWy1sb2MuZG90KHJpZ2h0KSwgLWxvYy5kb3QodXApLCBsb2MuZG90KGRpciksIDFdLFxuICAgICAgXTtcblxuICAgIHJldHVybiBtO1xuICB9IC8vIEVuZCBvZiAndmlldycgZnVuY3Rpb25cblxuICBmcnVzdHVtKGwsIHIsIGIsIHQsIG4sIGYpIHtcbiAgICByZXR1cm4gdGhpcy5tYXRyU2V0KFxuICAgICAgKDIgKiBuKSAvIChyIC0gbCksXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgKDIgKiBuKSAvICh0IC0gYiksXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIChyICsgbCkgLyAociAtIGwpLFxuICAgICAgKHQgKyBiKSAvICh0IC0gYiksXG4gICAgICAtKChmICsgbikgLyAoZiAtIG4pKSxcbiAgICAgIC0xLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICAtKCgyICogbiAqIGYpIC8gKGYgLSBuKSksXG4gICAgICAwLFxuICAgICk7XG4gIH0gLy8gRW5kIG9mICdmcnVzdHVtJyBmdW5jdGlvblxuXG4gIHRyYW5zcG9zZSgpIHtcbiAgICByZXR1cm4gdGhpcy5tYXRyU2V0KFxuICAgICAgdGhpcy5tWzBdWzBdLFxuICAgICAgdGhpcy5tWzFdWzBdLFxuICAgICAgdGhpcy5tWzJdWzBdLFxuICAgICAgdGhpcy5tWzNdWzBdLFxuICAgICAgdGhpcy5tWzBdWzFdLFxuICAgICAgdGhpcy5tWzFdWzFdLFxuICAgICAgdGhpcy5tWzJdWzFdLFxuICAgICAgdGhpcy5tWzNdWzFdLFxuICAgICAgdGhpcy5tWzBdWzJdLFxuICAgICAgdGhpcy5tWzFdWzJdLFxuICAgICAgdGhpcy5tWzJdWzJdLFxuICAgICAgdGhpcy5tWzNdWzJdLFxuICAgICAgdGhpcy5tWzBdWzNdLFxuICAgICAgdGhpcy5tWzFdWzNdLFxuICAgICAgdGhpcy5tWzJdWzNdLFxuICAgICAgdGhpcy5tWzNdWzNdLFxuICAgICk7XG4gIH0gLy8gRW5kIG9mICd0cmFuc3Bvc2UnIGZ1bmN0aW9uXG5cbiAgcm90YXRlWChBbmdsZSkge1xuICAgIGxldCBhID0gKEFuZ2xlICogTWF0aC5QSSkgLyAxODAsXG4gICAgICBzaSA9IE1hdGguc2luKGEpLFxuICAgICAgY28gPSBNYXRoLmNvcyhhKTtcblxuICAgIHJldHVybiB0aGlzLm1hdHJTZXQoMSwgMCwgMCwgMCwgMCwgY28sIHNpLCAwLCAwLCAtc2ksIGNvLCAwLCAwLCAwLCAwLCAxKTtcbiAgfSAvLyBFbmQgb2YgJ3JvdGF0ZVgnIGZ1bmN0aW9uXG5cbiAgcm90YXRlWShBbmdsZSkge1xuICAgIGxldCBhID0gKEFuZ2xlICogTWF0aC5QSSkgLyAxODAsXG4gICAgICBzaSA9IE1hdGguc2luKGEpLFxuICAgICAgY28gPSBNYXRoLmNvcyhhKTtcblxuICAgIHJldHVybiB0aGlzLm1hdHJTZXQoY28sIDAsIC1zaSwgMCwgMCwgMSwgMCwgMCwgc2ksIDAsIGNvLCAwLCAwLCAwLCAwLCAxKTtcbiAgfSAvLyBFbmQgb2YgJ3JvdGF0ZVlcblxuICByb3RhdGVaKEFuZ2xlKSB7XG4gICAgbGV0IGEgPSAoQW5nbGUgKiBNYXRoLlBJKSAvIDE4MCxcbiAgICAgIHNpID0gTWF0aC5zaW4oYSksXG4gICAgICBjbyA9IE1hdGguY29zKGEpO1xuXG4gICAgcmV0dXJuIHRoaXMubWF0clNldChjbywgc2ksIDAsIDAsIC1zaSwgY28sIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDEpO1xuICB9IC8vIEVuZCBvZiAncm90YXRlWlxuXG4gIHNjYWxlKHYpIHtcbiAgICByZXR1cm4gdGhpcy5tYXRyU2V0KHYueCwgMCwgMCwgMCwgMCwgdi55LCAwLCAwLCAwLCAwLCB2LnosIDAsIDAsIDAsIDAsIDEpO1xuICB9IC8vIEVuZCBvZiAnc2NhbGUnXG5cbiAgb3J0aG8obCwgciwgYiwgdCwgbiwgZikge1xuICAgIHJldHVybiB0aGlzLm1hdHJTZXQoXG4gICAgICAyIC8gKHIgLSBsKSxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICAyIC8gKHQgLSBiKSxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICAtMiAvIChmIC0gbiksXG4gICAgICAwLFxuICAgICAgLShyICsgbCkgLyAociAtIGwpLFxuICAgICAgLSh0ICsgYikgLyAodCAtIGIpLFxuICAgICAgLShmICsgbikgLyAoZiAtIG4pLFxuICAgICAgMSxcbiAgICApO1xuICB9IC8vIEVuZCBvZiAnb3J0aG8nIGZ1bmN0aW9uXG5cbn0gLy8gRW5kIG9mICdfbWF0NCcgZnVuY3Rpb25cblxuZXhwb3J0IGZ1bmN0aW9uIG1hdDQoLi4uYXJncykge1xuICByZXR1cm4gbmV3IF9tYXQ0KC4uLmFyZ3MpO1xufSAvLyBFbmQgb2YgJ21hdDQnIGZ1bmN0aW9uXG4iLCIvLyBTaGFkZXIgY2xhc3NcbmNsYXNzIF9zaGFkZXIge1xuICBhc3luYyBfaW5pdChuYW1lKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLmlkID0gbnVsbDtcbiAgICB0aGlzLnNoYWRlcnMgPVxuICAgIFtcbiAgICAgICB7XG4gICAgICAgICBpZDogbnVsbCxcbiAgICAgICAgIHR5cGU6IGdsLlZFUlRFWF9TSEFERVIsXG4gICAgICAgICBuYW1lOiBcInZlcnRcIixcbiAgICAgICAgIHNyYzogXCJcIixcbiAgICAgICB9LFxuICAgICAgIHtcbiAgICAgICAgaWQ6IG51bGwsXG4gICAgICAgIHR5cGU6IGdsLkZSQUdNRU5UX1NIQURFUixcbiAgICAgICAgbmFtZTogXCJmcmFnXCIsXG4gICAgICAgIHNyYzogXCJcIixcbiAgICAgIH1cbiAgICBdO1xuICAgIGZvciAoY29uc3QgcyBvZiB0aGlzLnNoYWRlcnMpIHtcbiAgICAgIGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBiaW4vc2hhZGVycy8ke25hbWV9LyR7cy5uYW1lfS5nbHNsYCk7XG4gICAgICBsZXQgc3JjID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpO1xuICAgICAgaWYgKHR5cGVvZiBzcmMgPT0gXCJzdHJpbmdcIiAmJiBzcmMgIT0gXCJcIilcbiAgICAgICAgcy5zcmMgPSBzcmM7XG4gICAgfVxuICAgIC8vIHJlY29tcGlsZSBzaGFkZXJzXG4gICAgdGhpcy51cGRhdGVTaGFkZXJzU291cmNlKCk7XG4gIH1cbiAgc3RhdGljSW5pdChuYW1lKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLmlkID0gbnVsbDtcbiAgICB0aGlzLnNoYWRlcnMgPVxuICAgIFtcbiAgICAgICB7XG4gICAgICAgICBpZDogbnVsbCxcbiAgICAgICAgIHR5cGU6IGdsLlZFUlRFWF9TSEFERVIsXG4gICAgICAgICBuYW1lOiBcInZlcnRcIixcbiAgICAgICAgIHNyYzogXCJcIixcbiAgICAgICB9LFxuICAgICAgIHtcbiAgICAgICAgaWQ6IG51bGwsXG4gICAgICAgIHR5cGU6IGdsLkZSQUdNRU5UX1NIQURFUixcbiAgICAgICAgbmFtZTogXCJmcmFnXCIsXG4gICAgICAgIHNyYzogXCJcIixcbiAgICAgIH1cbiAgICBdO1xuICAgIGxldCB2c190eHQgPVxuICAgIGAjdmVyc2lvbiAzMDAgZXNcbiAgICBwcmVjaXNpb24gaGlnaHAgZmxvYXQ7XG4gICAgaW4gdmVjMyBJblBvc2l0aW9uO1xuICAgIGluIHZlYzMgSW5Ob3JtYWw7XG5cbiAgICB1bmlmb3JtIG1hdDQgTWF0cldWUDtcbiAgICB1bmlmb3JtIG1hdDQgTWF0cldJbnY7XG5cbiAgICBvdXQgdmVjMyBEcmF3Tm9ybWFsO1xuICAgIFxuICAgIHZvaWQgbWFpbiggdm9pZCApXG4gICAge1xuICAgICAgZ2xfUG9zaXRpb24gPSBNYXRyV1ZQICogdmVjNChJblBvc2l0aW9uLCAxKTtcbiAgICAgIC8vZ2xfUG9zaXRpb24gPSB2ZWM0KEluUG9zaXRpb24sIDEpO1xuICAgICAgRHJhd05vcm1hbCA9IG5vcm1hbGl6ZShtYXQzKE1hdHJXSW52KSAqIEluTm9ybWFsKTtcbiAgICB9XG4gICAgYDtcbiAgICBsZXQgZnNfdHh0ID1cbiAgICBgI3ZlcnNpb24gMzAwIGVzXG4gICAgcHJlY2lzaW9uIGhpZ2hwIGZsb2F0O1xuICAgIGluIHZlYzMgRHJhd05vcm1hbDtcblxuICAgIHVuaWZvcm0gZmxvYXQgVGltZTtcbiAgICB1bmlmb3JtIG1hdDQgTWF0cldWUDtcblxuICAgIG91dCB2ZWM0IE91dENvbG9yO1xuICAgIFxuICAgIHZvaWQgbWFpbiggdm9pZCApXG4gICAge1xuICAgICAgdmVjMyBMID0gdmVjMygwLCAwLCAyKTtcbiAgICAgIHZlYzMgTiA9IG5vcm1hbGl6ZShmYWNlZm9yd2FyZChEcmF3Tm9ybWFsLCAtTCwgRHJhd05vcm1hbCkpO1xuICAgICAgdmVjMyBjb2wgPSB2ZWMzKDAuMSwgMC4xLCAwLjMwKSAqIGRvdChOLCBMKTtcbiAgICAgIE91dENvbG9yID0gdmVjNChjb2wsIDEuMCk7XG4gICAgfVxuICAgIGA7XG4gICAgdGhpcy5zaGFkZXJzWzBdLnNyYyA9IHZzX3R4dDtcbiAgICB0aGlzLnNoYWRlcnNbMV0uc3JjID0gZnNfdHh0O1xuICAgIC8vIHJlY29tcGlsZSBzaGFkZXJzXG4gICAgdGhpcy51cGRhdGVTaGFkZXJzU291cmNlKCk7XG4gIH0gICAgICAgICAgICAgICAgICAgICBcbiAgdXBkYXRlU2hhZGVyc1NvdXJjZSgpIHsgXG4gICAgdGhpcy5zaGFkZXJzWzBdLmlkID0gbnVsbDtcbiAgICB0aGlzLnNoYWRlcnNbMV0uaWQgPSBudWxsO1xuICAgIHRoaXMuaWQgPSBudWxsO1xuICAgIGlmICh0aGlzLnNoYWRlcnNbMF0uc3JjID09IFwiXCIgfHwgdGhpcy5zaGFkZXJzWzFdLnNyYyA9PSBcIlwiKVxuICAgICAgcmV0dXJuO1xuICAgIHRoaXMuc2hhZGVycy5mb3JFYWNoKHMgPT4ge1xuICAgICAgcy5pZCA9IGdsLmNyZWF0ZVNoYWRlcihzLnR5cGUpO1xuICAgICAgZ2wuc2hhZGVyU291cmNlKHMuaWQsIHMuc3JjKTtcbiAgICAgIGdsLmNvbXBpbGVTaGFkZXIocy5pZCk7XG4gICAgICBpZiAoIWdsLmdldFNoYWRlclBhcmFtZXRlcihzLmlkLCBnbC5DT01QSUxFX1NUQVRVUykpIHtcbiAgICAgICAgbGV0IGJ1ZiA9IGdsLmdldFNoYWRlckluZm9Mb2cocy5pZCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGBTaGFkZXIgJHt0aGlzLm5hbWV9LyR7cy5uYW1lfSBjb21waWxlIGZhaWw6ICR7YnVmfWApO1xuICAgICAgfSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgfSk7ICAgICAgICAgICAgIFxuICAgIHRoaXMuaWQgPSBnbC5jcmVhdGVQcm9ncmFtKCk7XG4gICAgdGhpcy5zaGFkZXJzLmZvckVhY2gocyA9PiB7XG4gICAgICBpZiAocy5pZCAhPSBudWxsKVxuICAgICAgICBnbC5hdHRhY2hTaGFkZXIodGhpcy5pZCwgcy5pZCk7XG4gICAgfSk7XG4gICAgZ2wubGlua1Byb2dyYW0odGhpcy5pZCk7XG4gICAgaWYgKCFnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHRoaXMuaWQsIGdsLkxJTktfU1RBVFVTKSkge1xuICAgICAgbGV0IGJ1ZiA9IGdsLmdldFByb2dyYW1JbmZvTG9nKHRoaXMuaWQpO1xuICAgICAgY29uc29sZS5sb2coYFNoYWRlciBwcm9ncmFtICR7dGhpcy5uYW1lfSBsaW5rIGZhaWw6ICR7YnVmfWApO1xuICAgIH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgIHRoaXMudXBkYXRlU2hhZGVyRGF0YSgpOyAgICBcbiAgfSBcbiAgdXBkYXRlU2hhZGVyRGF0YSgpIHtcbiAgICAvLyBTaGFkZXIgYXR0cmlidXRlc1xuICAgIHRoaXMuYXR0cnMgPSB7fTtcbiAgICBjb25zdCBjb3VudEF0dHJzID0gZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlcih0aGlzLmlkLCBnbC5BQ1RJVkVfQVRUUklCVVRFUyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudEF0dHJzOyBpKyspIHtcbiAgICAgIGNvbnN0IGluZm8gPSBnbC5nZXRBY3RpdmVBdHRyaWIodGhpcy5pZCwgaSk7XG4gICAgICB0aGlzLmF0dHJzW2luZm8ubmFtZV0gPSB7XG4gICAgICAgIG5hbWU6IGluZm8ubmFtZSxcbiAgICAgICAgdHlwZTogaW5mby50eXBlLFxuICAgICAgICBzaXplOiBpbmZvLnNpemUsXG4gICAgICAgIGxvYzogZ2wuZ2V0QXR0cmliTG9jYXRpb24odGhpcy5pZCwgaW5mby5uYW1lKSxcbiAgICAgIH07XG4gICAgfVxuIFxuICAgIC8vIFNoYWRlciB1bmlmb3Jtc1xuICAgIHRoaXMudW5pZm9ybXMgPSB7fTtcbiAgICBjb25zdCBjb3VudFVuaWZvcm1zID0gZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlcih0aGlzLmlkLCBnbC5BQ1RJVkVfVU5JRk9STVMpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnRVbmlmb3JtczsgaSsrKSB7XG4gICAgICBjb25zdCBpbmZvID0gZ2wuZ2V0QWN0aXZlVW5pZm9ybSh0aGlzLmlkLCBpKTtcbiAgICAgIHRoaXMudW5pZm9ybXNbaW5mby5uYW1lXSA9IHtcbiAgICAgICAgbmFtZTogaW5mby5uYW1lLFxuICAgICAgICB0eXBlOiBpbmZvLnR5cGUsXG4gICAgICAgIHNpemU6IGluZm8uc2l6ZSxcbiAgICAgICAgbG9jOiBnbC5nZXRVbmlmb3JtTG9jYXRpb24odGhpcy5pZCwgaW5mby5uYW1lKSxcbiAgICAgIH07XG4gICAgfVxuIFxuICAgIC8vIFNoYWRlciB1bmlmb3JtIGJsb2Nrc1xuICAgIHRoaXMudW5pZm9ybUJsb2NrcyA9IHt9O1xuICAgIGNvbnN0IGNvdW50VW5pZm9ybUJsb2NrcyA9IGdsLmdldFByb2dyYW1QYXJhbWV0ZXIodGhpcy5pZCwgZ2wuQUNUSVZFX1VOSUZPUk1fQkxPQ0tTKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50VW5pZm9ybUJsb2NrczsgaSsrKSB7XG4gICAgICBjb25zdCBibG9ja19uYW1lID0gZ2wuZ2V0QWN0aXZlVW5pZm9ybUJsb2NrTmFtZSh0aGlzLmlkLCBpKTtcbiAgICAgIGNvbnN0IGluZGV4ID0gZ2wuZ2V0QWN0aXZlVW5pZm9ybUJsb2NrSW5kZXgodGhpcy5pZCwgYmxvY2tfbmFtZSk7XG4gICAgICB0aGlzLnVuaWZvcm1CbG9ja3NbYmxvY2tfbmFtZV0gPSB7XG4gICAgICAgIG5hbWU6IGJsb2NrX25hbWUsXG4gICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgc2l6ZTogZ2wuZ2V0QWN0aXZlVW5pZm9ybUJsb2NrUGFyYW1ldGVyKHRoaXMuaWQsIGlkeCwgZ2wuVU5JRk9STV9CTE9DS19EQVRBX1NJWkUpLFxuICAgICAgICBiaW5kOiBnbC5nZXRBY3RpdmVVbmlmb3JtQmxvY2tQYXJhbWV0ZXIodGhpcy5pZCwgaWR4LCBnbC5VTklGT1JNX0JMT0NLX0JJTkRJTkcpLFxuICAgICAgfTtcbiAgICB9XG4gICAgXG4gIH1cbiAgY29uc3RydWN0b3IobmFtZSkge1xuICAgIC8vLyB0aGlzLl9pbml0KG5hbWUpO1xuICAgIHRoaXMuc3RhdGljSW5pdChuYW1lKTtcbiAgfVxuICBhcHBseSgpIHtcbiAgICBpZiAodGhpcy5pZCAhPSBudWxsKVxuICAgICAgZ2wudXNlUHJvZ3JhbSh0aGlzLmlkKTtcbiAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIHNoYWRlcihuYW1lKSB7XG4gIHJldHVybiBuZXcgX3NoYWRlcihuYW1lKTtcbn0iLCJpbXBvcnQgeyBtYXQ0IH0gZnJvbSBcIi4vbWF0NC5qc1wiO1xuaW1wb3J0IHsgdmVjMyB9IGZyb20gXCIuL3ZlYzMuanNcIjtcblxuY2xhc3MgX2NhbWVyYSB7XG4gIGxvYyA9IHZlYzMoKTtcbiAgYXQgPSB2ZWMzKCk7XG4gIGRpciA9IHZlYzMoKTtcbiAgcmlnaHQgPSB2ZWMzKCk7XG4gIHVwID0gdmVjMygpO1xuICBtYXRyVmlldyA9IG1hdDQoKTsgXG4gIG1hdHJQcm9qID0gbWF0NCgpOyBcbiAgbWF0clZQID0gbWF0NCgpO1xuICBmcmFtZVc7XG4gIGZyYW1lSDtcbiAgd3A7XG4gIGhwO1xuICBwcm9qU2l6ZTtcbiAgcHJvakRpc3Q7XG4gIHByb2pGYXJDbGlwO1xuXG4gIGNhbVNldChsb2MsIGF0LCB1cCkge1xuICAgIHRoaXMubWF0clZpZXcgPSBtYXQ0KCkudmlldyhsb2MsIGF0LCB1cCk7XG5cbiAgICB0aGlzLnJpZ2h0ID0gdmVjMyh0aGlzLm1hdHJWaWV3Lm1bMF1bMF0sXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXRyVmlldy5tWzFdWzBdLFxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWF0clZpZXcubVsyXVswXSk7XG5cbiAgICB0aGlzLnVwID0gdmVjMyh0aGlzLm1hdHJWaWV3Lm1bMF1bMV0sXG4gICAgICAgICAgICAgICAgICAgdGhpcy5tYXRyVmlldy5tWzFdWzFdLFxuICAgICAgICAgICAgICAgICAgIHRoaXMubWF0clZpZXcubVsyXVsxXSk7XG4gICAgICAgICAgICAgICAgICBcbiAgICB0aGlzLmRpciA9IHZlYzMoLXRoaXMubWF0clZpZXcubVswXVsyXSxcbiAgICAgICAgICAgICAgICAgICAgLXRoaXMubWF0clZpZXcubVsxXVsyXSxcbiAgICAgICAgICAgICAgICAgICAgLXRoaXMubWF0clZpZXcubVsyXVsyXSk7XG4gICAgICAgICAgICAgICAgICAgIFxuXG4gICAgdGhpcy5sb2MgPSB2ZWMzKGxvYyk7XG4gICAgdGhpcy5hdCA9IHZlYzMoYXQpO1xuICAgIHRoaXMubWF0clZQID0gdGhpcy5tYXRyVmlldy5tYXRyTXVsTWF0cih0aGlzLm1hdHJQcm9qKTtcbiAgfSAvLyBFbmQgb2YgJ2NhbVNldCcgZnVuY3Rpb25cblxuICBjYW1TZXRQcm9qKHByb2pTaXplLCBwcm9qRGlzdCwgcHJvakZhckNsaXApIHtcbiAgICBsZXQgcngsIHJ5O1xuXG4gICAgdGhpcy5wcm9qRGlzdCA9IHByb2pEaXN0O1xuICAgIHRoaXMucHJvakZhckNsaXAgPSBwcm9qRmFyQ2xpcDtcbiAgICByeCA9IHJ5ID0gdGhpcy5wcm9qU2l6ZSA9IHByb2pTaXplO1xuXG4gICAgLyogQ29ycmVjdCBhc3BlY3QgcmF0aW8gKi9cbiAgICBpZiAodGhpcy5mcmFtZVcgPj0gdGhpcy5mcmFtZUgpXG4gICAgICByeCAqPSB0aGlzLmZyYW1lVyAvIHRoaXMuZnJhbWVIO1xuICAgIGVsc2VcbiAgICAgIHJ5ICo9IHRoaXMuZnJhbWVIIC8gdGhpcy5mcmFtZVc7XG5cbiAgICB0aGlzLndwID0gcng7XG4gICAgdGhpcy5ocCA9IHJ5O1xuICAgIHRoaXMubWF0clByb2ogPVxuICAgICAgbWF0NCgpLmZydXN0dW0oLXJ4IC8gMiwgcnggLyAyLCAtcnkgLyAyLCByeSAvIDIsXG4gICAgICAgIHRoaXMucHJvakRpc3QsIHRoaXMucHJvakZhckNsaXApO1xuICAgIHRoaXMubWF0clZQID0gdGhpcy5tYXRyVmlldy5tYXRyTXVsTWF0cih0aGlzLm1hdHJQcm9qKTtcbiAgfSAvLyBFbmQgb2YgJ2NhbVNldFByb2onIGZ1bmN0aW9uXG4gIGNhbVNldFNpemUoZnJhbWVXLCBmcmFtZUgpIHtcbiAgICB0aGlzLmZyYW1lVyA9IGZyYW1lVztcbiAgICB0aGlzLmZyYW1lSCA9IGZyYW1lSDtcbiAgICB0aGlzLnNldFByb2oodGhpcy5wcm9qU2l6ZSwgdGhpcy5wcm9qRGlzdCwgdGhpcy5wcm9qRmFyQ2xpcCk7XG4gIH0gLy8gRW5kIG9mICdjYW1TZXRTaXplJyBmdW5jdGlvblxufSBcblxuZXhwb3J0IGZ1bmN0aW9uIGNhbWVyYSguLi5hcmdzKSB7XG4gIHJldHVybiBuZXcgX2NhbWVyYSguLi5hcmdzKTtcbn1cblxuIiwiaW1wb3J0IHsgdmVjMyB9IGZyb20gXCIuLi8uLi8uLi9tdGgvdmVjMy5qc1wiO1xuXG4vLyBvciBkaWZmZXJlbnQgd2F5XG5jbGFzcyBfdmVydGV4IHtcbiAgcG9zID0gdmVjMygpO1xuICBub3JtID0gdmVjMygpO1xuXG4gIGNvbnN0cnVjdG9yKHgsIHksIHopIHtcbiAgICBpZiAodHlwZW9mICh4KSA9PSBcIm9iamVjdFwiKSB7XG4gICAgICB0aGlzLnBvcyA9IHZlYzMoeCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucG9zID0gdmVjMyh4LCB5LCB6KTtcbiAgICB9XG4gICAgXG4gICAgLy8gaWYgKHBvcyA9PSBcIm51bWJlclwiKSB7XG4gICAgLy8gICB0aGlzLnBvcyA9IHZlYzMocG9zLCBwb3MsIHBvcyk7XG4gICAgLy8gICB0aGlzLm5vcm0gPSB2ZWMzKG5vcm0sIG5vcm0sIG5vcm0pO1xuICAgIC8vIH0gZWxzZSB7XG4gICAgLy8gICB0aGlzLnBvcyA9IHBvcztcbiAgICAvLyAgIHRoaXMubm9ybSA9IG5vcm07XG4gICAgLy8gfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB2ZXJ0ZXgoLi4uYXJncykge1xuICByZXR1cm4gbmV3IF92ZXJ0ZXgoLi4uYXJncyk7XG59IC8vIEVuZCBvZiAndmVydGV4JyBmdW5jdGlvbiBcblxuY2xhc3MgX3ByaW0ge1xuICBzaGQ7XG4gIHZlcnRBcnJheTtcbiAgdmVydEJ1ZmZlcjtcbiAgaW5kQnVmZmVyO1xuICBudW1PZkVsZW1lbnRzO1xuXG4gIGNvbnN0cnVjdG9yKHNoZCwgdmVydCwgaW5kKSB7XG4gICAgbGV0IHZlcnRleGVzID0gW10sIGkgPSAwO1xuXG4gICAgdGhpcy5zaGQgPSBzaGQ7XG4gICAgYXV0b05vcm1hbCh2ZXJ0LCBpbmQpO1xuXG4gICAgZm9yIChsZXQgdiBvZiB2ZXJ0KSB7XG4gICAgICB2ZXJ0ZXhlc1tpKytdID0gdi5wb3MueDtcbiAgICAgIHZlcnRleGVzW2krK10gPSB2LnBvcy55O1xuICAgICAgdmVydGV4ZXNbaSsrXSA9IHYucG9zLno7XG4gICAgICBcbiAgICAgIHZlcnRleGVzW2krK10gPSB2Lm5vcm0ueDtcbiAgICAgIHZlcnRleGVzW2krK10gPSB2Lm5vcm0ueTtcbiAgICAgIHZlcnRleGVzW2krK10gPSB2Lm5vcm0uejtcbiAgICB9XG4gICAgdGhpcy5udW1PZkVsZW0gPSB2ZXJ0Lmxlbmd0aDtcblxuICAgIGNvbnN0IHBvc0xvYyA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKHNoZC5pZCwgXCJJblBvc2l0aW9uXCIpO1xuICAgIGNvbnN0IG5vcm1Mb2MgPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihzaGQuaWQsIFwiSW5Ob3JtYWxcIik7XG4gICAgdGhpcy52ZXJ0QXJyYXkgPSBnbC5jcmVhdGVWZXJ0ZXhBcnJheSgpO1xuICAgIGdsLmJpbmRWZXJ0ZXhBcnJheSh0aGlzLnZlcnRBcnJheSk7XG4gICAgdGhpcy52ZXJ0QnVmZmVyID0gZ2wuY3JlYXRlQnVmZmVyKCk7XG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHRoaXMudmVydEJ1ZmZlcik7XG4gICAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIG5ldyBGbG9hdDMyQXJyYXkodmVydGV4ZXMpLCBnbC5TVEFUSUNfRFJBVyk7XG5cbiAgICBpZiAocG9zTG9jICE9IC0xKSB7XG4gICAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHBvc0xvYywgMywgZ2wuRkxPQVQsIGZhbHNlLCAyNCwgMCk7XG4gICAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShwb3NMb2MpO1xuICAgIH1cbiAgICBpZiAobm9ybUxvYyAhPSAtMSkge1xuICAgICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcihub3JtTG9jLCAzLCBnbC5GTE9BVCwgZmFsc2UsIDI0LCAxMik7XG4gICAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShub3JtTG9jKTtcbiAgICB9XG5cbiAgICBpZiAoaW5kICE9IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5udW1PZkVsZW0gPSBpbmQubGVuZ3RoO1xuICAgICAgXG4gICAgICB0aGlzLmluZEJ1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgICAgZ2wuYmluZEJ1ZmZlcihnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgdGhpcy5pbmRCdWZmZXIpO1xuICAgICAgZ2wuYnVmZmVyRGF0YShnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgbmV3IFVpbnQzMkFycmF5KGluZCksIGdsLlNUQVRJQ19EUkFXKTsgIFxuICAgIH0gXG4gIH1cblxuICByZW5kZXIod29ybGQsIGNhbSkge1xuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIGxldCB0ID0gZGF0ZS5nZXRNaW51dGVzKCkgKiA2MCArXG4gICAgICAgICAgZGF0ZS5nZXRTZWNvbmRzKCkgK1xuICAgICAgICAgIGRhdGUuZ2V0TWlsbGlzZWNvbmRzKCkgLyAxMDAwO1xuXG4gICAgbGV0IHd2cCA9IHdvcmxkLm1hdHJNdWxNYXRyKGNhbS5tYXRyVlApO1xuICAgIGxldCB3aW52ID0gd29ybGQuaW52ZXJzZSgpLnRyYW5zcG9zZSgpO1xuXG4gICAgaWYgKHRoaXMuc2hkLnVuaWZvcm1zWydNYXRyV1ZQJ10gIT0gdW5kZWZpbmVkKVxuICAgICAgZ2wudW5pZm9ybU1hdHJpeDRmdih0aGlzLnNoZC51bmlmb3Jtc1snTWF0cldWUCddLmxvYywgZmFsc2UsIG5ldyBGbG9hdDMyQXJyYXkod3ZwLnRvQXJyYXkoKSkpO1xuICAgIGlmICh0aGlzLnNoZC51bmlmb3Jtc1snTWF0cldJbnYnXSAhPSB1bmRlZmluZWQpXG4gICAgICBnbC51bmlmb3JtTWF0cml4NGZ2KHRoaXMuc2hkLnVuaWZvcm1zWydNYXRyV0ludiddLmxvYywgZmFsc2UsIG5ldyBGbG9hdDMyQXJyYXkod2ludi50b0FycmF5KCkpKTtcbiAgICBpZiAodGhpcy5zaGQudW5pZm9ybXNbJ1RpbWUnXSAhPSB1bmRlZmluZWQpXG4gICAgICBnbC51bmlmb3JtMWYodGhpcy5zaGQudW5pZm9ybXNbJ1RpbWUnXSwgbG9jLCB0KTtcbiAgICBcbiAgICBpZiAodGhpcy5zaGQuaWQgIT0gbnVsbCkge1xuICAgICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHRoaXMudmVydEJ1ZmZlcik7XG5cbiAgICAgIGlmICh0aGlzLmluZEJ1ZmZlciA9PSB1bmRlZmluZWQpXG4gICAgICAgIGdsLmRyYXdBcnJheXMoZ2wuVFJJQU5HTEVTLCAwLCB0aGlzLm51bU9mRWxlbSk7XG4gICAgICBlbHNlIHtcbiAgICAgICAgZ2wuYmluZEJ1ZmZlcihnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgdGhpcy5pbmRCdWZmZXIpO1xuICAgICAgICBnbC5kcmF3RWxlbWVudHMoZ2wuVFJJQU5HTEVTLCB0aGlzLm51bU9mRWxlbSwgZ2wuVU5TSUdORURfSU5ULCAwKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gYXV0b05vcm1hbCh2ZXJ0ZXhlcywgaW5kZXhlcykge1xuICBpZiAoaW5kZXhlcyA9PSB1bmRlZmluZWQpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZlcnRleGVzLmxlbmd0aDsgaSArPSAzKSB7XG4gICAgICBsZXQgbm9ybSA9ICh2ZXJ0ZXhlc1tpICsgMV0ucG9zLnN1Yih2ZXJ0ZXhlc1tpXS5wb3MpKS5jcm9zcyh2ZXJ0ZXhlc1tpICsgMl0ucG9zLnN1Yih2ZXJ0ZXhlc1tpXS5wb3MpKS5ub3JtYWxpemUoKTtcblxuICAgICAgdmVydGV4ZXNbaV0ubm9ybSA9IHZlcnRleGVzW2ldLm5vcm0uYWRkKG5vcm0pO1xuICAgICAgdmVydGV4ZXNbaSArIDFdLm5vcm0gPSB2ZXJ0ZXhlc1tpICsgMV0ubm9ybS5hZGQobm9ybSk7XG4gICAgICB2ZXJ0ZXhlc1tpICsgMl0ubm9ybSA9IHZlcnRleGVzW2kgKyAyXS5ub3JtLmFkZChub3JtKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbmRleGVzLmxlbmd0aDsgaSArPSAzKSB7XG4gICAgICBsZXRcbiAgICAgICAgbjAgPSBpbmRleGVzW2ldLCBuMSA9IGluZGV4ZXNbaSArIDFdLCBuMiA9IGluZGV4ZXNbaSArIDJdO1xuICAgICAgbGV0IHAwID0gdmVjMygpLCBwMSA9IHZlYzMoKSwgcDIgPSB2ZWMzKCksIG5vcm0gPSB2ZWMzKCk7XG5cbiAgICAgIHAwID0gdmVydGV4ZXNbbjBdLnBvcztcbiAgICAgIHAxID0gdmVydGV4ZXNbbjFdLnBvcztcbiAgICAgIHAyID0gdmVydGV4ZXNbbjJdLnBvcztcbiAgICAgIFxuICAgICAgbm9ybSA9IHAxLnN1YihwMCkuY3Jvc3MocDIuc3ViKHAwKSkubm9ybWFsaXplKCk7XG4gIFxuICAgICAgdmVydGV4ZXNbbjBdLm5vcm0gPSB2ZXJ0ZXhlc1tuMF0ubm9ybS5hZGQobm9ybSk7XG4gICAgICB2ZXJ0ZXhlc1tuMV0ubm9ybSA9IHZlcnRleGVzW24xXS5ub3JtLmFkZChub3JtKTtcbiAgICAgIHZlcnRleGVzW24yXS5ub3JtID0gdmVydGV4ZXNbbjJdLm5vcm0uYWRkKG5vcm0pO1xuICAgIH1cbiAgICBcbiAgICBmb3IgKGxldCBpIGluIHZlcnRleGVzKSB7XG4gICAgICB2ZXJ0ZXhlc1tpXS5ub3JtID0gdmVydGV4ZXNbaV0ubm9ybS5ub3JtYWxpemUoKTtcbiAgICB9XG4gIH1cblxufSAvLyBFbmQgb2YgJ2F1dG9Ob3JtYWwnIGZ1bmN0aW9uXG5cbmV4cG9ydCBmdW5jdGlvbiBwcmltKC4uLmFyZ3MpIHtcbiAgcmV0dXJuIG5ldyBfcHJpbSguLi5hcmdzKTtcbn0gLy8gRW5kIG9mICdwcmltJyBmdW5jdGlvbiIsImltcG9ydCB7IHZlcnRleCB9IGZyb20gXCIuLi9hbmltL3JuZC9ybmRwcmltLmpzXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0Q3ViZSgpIHtcclxuICBsZXQgaW5kID0gW1xyXG4gICAgMCwgMSwgMiwgXHJcbiAgICAxLCAyLCA0LCBcclxuICAgIDEsIDQsIDcsIFxyXG4gICAgMSwgNywgNSwgXHJcbiAgICA3LCA1LCAzLCBcclxuICAgIDcsIDMsIDYsXHJcbiAgICAwLCAxLCAzLFxyXG4gICAgMywgMSwgNSxcclxuICAgIDYsIDMsIDAsXHJcbiAgICA2LCAwLCAyLFxyXG4gICAgMiwgNiwgNyxcclxuICAgIDIsIDcsIDRcclxuICBdOyAgXHJcblxyXG4gIGxldCB2ZXJ0ID0gW3ZlcnRleCgwKSwgdmVydGV4KDEsIDAsIDApLCB2ZXJ0ZXgoMCwgMSwgMCksIHZlcnRleCgwLCAwLCAxKSwgdmVydGV4KDEsIDEsIDApLCB2ZXJ0ZXgoMSwgMCwgMSksIHZlcnRleCgwLCAxLCAxKSwgdmVydGV4KDEpXTtcclxuXHJcbiAgbGV0IHZlcnRzID0gW107XHJcbiAgZm9yIChsZXQgaSBvZiBpbmQpIHtcclxuICAgIGxldCB2cnR4ID0gdmVydGV4KHZlcnRbaV0ucG9zKTtcclxuICAgIHZlcnRzLnB1c2godnJ0eCk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdmVydHM7XHJcbn1cclxuIiwiaW1wb3J0IHsgdmVjMyB9IGZyb20gXCIuL210aC92ZWMzLmpzXCI7XG5pbXBvcnQgeyBtYXQ0IH0gZnJvbSBcIi4vbXRoL21hdDQuanNcIjtcbmltcG9ydCB7IHNoYWRlciB9IGZyb20gXCIuL3NyYy9hbmltL3JuZC9zaGFkZXJfY2xhc3NfcGF0dGVybi5qc1wiO1xuaW1wb3J0IHsgY2FtZXJhIH0gZnJvbSBcIi4vbXRoL2NhbS5qc1wiO1xuaW1wb3J0IHsgcmVuZGVyLCBpbml0R0wgfSBmcm9tIFwiLi9zcmMvYW5pbS9ybmQvcmVuZGVyLmpzXCI7XG5pbXBvcnQgeyBzZXRDdWJlIH0gZnJvbSBcIi4vc3JjL2ZpZ3VyZS9maWd1cmVzLmpzXCI7XG5pbXBvcnQgeyBwcmltIH0gZnJvbSBcIi4vc3JjL2FuaW0vcm5kL3JuZHByaW0uanNcIjtcbmltcG9ydCB7IHZlcnRleCB9IGZyb20gXCIuL3NyYy9hbmltL3JuZC9ybmRwcmltLmpzXCI7XG5cbmZ1bmN0aW9uIG1haW4oKSB7XG4gIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbXlDYW5cIik7XG4gIGNvbnN0IGdsID0gY2FudmFzLmdldENvbnRleHQoXCJ3ZWJnbDJcIik7XG5cbiAgaWYgKHdpbmRvdy5nbCA9PSB1bmRlZmluZWQpIHtcbiAgICB3aW5kb3cuZ2wgPSBnbDtcbiAgfVxuXG4gIGlmIChnbCA9PT0gbnVsbCkge1xuICAgIGFsZXJ0KFwiV2ViR0wyIG5vdCBzdXBwb3J0ZWRcIik7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy9pbml0R0woKTtcbiAgLy9sb2FkU2hcbiAgZ2wuZW5hYmxlKGdsLkRFUFRIX1RFU1QpO1xuICBcbiAgZ2wuY2xlYXJDb2xvcigwLjMwLCAwLjQ3LCAwLjgsIDEuMCk7XG4gIGxldCBzaGQgID0gc2hhZGVyKFwiZGVmYXVsdFwiKTtcblxuICBjb25zdCBjYW0gPSBjYW1lcmEoKTtcbiAgXG4gIGNhbS5mcmFtZVcgPSBjYW52YXMuY2xpZW50V2lkdGg7XG4gIGNhbS5mcmFtZUggPSBjYW52YXMuY2xpZW50SGVpZ2h0O1xuICBjYW0ucHJvakRpc3QgPSAwLjE7XG4gIGNhbS5wcm9qU2l6ZSA9IDAuMTtcbiAgY2FtLnByb2pGYXJDbGlwID0gMzAwO1xuXG4gIGNhbS5jYW1TZXQodmVjMygwLCAwLCA0KSwgdmVjMygwKSwgdmVjMygwLCAxLCAwKSk7XG4gIGNhbS5jYW1TZXRQcm9qKDAuMSwgMC4xLCAzMDApO1xuXG4gIC8vIGxldCBpbmQgPSBbXG4gIC8vICAgMCwgMSwgMiwgXG4gIC8vICAgMSwgMiwgNCwgXG4gIC8vICAgMSwgNCwgNywgXG4gIC8vICAgMSwgNywgNSwgXG4gIC8vICAgNywgNSwgMywgXG4gIC8vICAgNywgMywgNixcbiAgLy8gICAwLCAxLCAzLFxuICAvLyAgIDMsIDEsIDUsXG4gIC8vICAgNiwgMywgMCxcbiAgLy8gICA2LCAwLCAyLFxuICAvLyAgIDIsIDYsIDcsXG4gIC8vICAgMiwgNywgNFxuICAvLyBdO1xuXG5cbiAgLy8gbGV0IHZlcnQgPSBzZXRDdWJlKCk7XG5cbiAgLy8gbGV0IHZlcnRzID0gW107XG4gIC8vIGZvciAobGV0IGkgb2YgaW5kKSB7XG4gIC8vICAgbGV0IHZydHggPSB2ZXJ0ZXgodmVydFtpXS5wb3MpO1xuICAvLyAgIHZlcnRzLnB1c2godnJ0eCk7XG4gIC8vIH1cblxuICBcbiAgbGV0IHByaW1zID0gcHJpbShzaGQsIHNldEN1YmUoKSk7XG5cbiAgc2hkLmFwcGx5KCk7XG5cbiAgY29uc3QgYW5pbSA9ICgpID0+IHtcbiAgICBnbC5jbGVhcihnbC5DT0xPUl9CVUZGRVJfQklUKTtcbiAgICBnbC5jbGVhcihnbC5ERVBUSF9CVUZGRVJfQklUKTtcblxuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIGxldCB0ID0gZGF0ZS5nZXRNaW51dGVzKCkgKiA2MCArXG4gICAgICAgICAgZGF0ZS5nZXRTZWNvbmRzKCkgK1xuICAgICAgICAgIGRhdGUuZ2V0TWlsbGlzZWNvbmRzKCkgLyAxMDAwO1xuXG4gICAgcHJpbXMucmVuZGVyKG1hdDQoKS5yb3RhdGVZKDMwICogdCkubWF0ck11bE1hdHIobWF0NCgpLnJvdGF0ZVgoMzAgKiB0KSksIGNhbSk7XG4gICAgLy9wcmltcy5yZW5kZXIobWF0NCgpLCBjYW0pO1xuXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltKTtcbiAgfTtcblxuICBhbmltKCk7XG59XG5cbmNvbnNvbGUubG9nKFwiQ0dTRyBmb3JldmVyISEhXCIpO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKCkgPT4ge1xuICBtYWluKCk7XG59KTtcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7RUFBQSxNQUFNLEtBQUssQ0FBQztFQUNaLEVBQUUsV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0VBQ3ZCLElBQUksSUFBSSxDQUFDLElBQUksU0FBUyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztFQUNqRSxTQUFTLElBQUksT0FBTyxDQUFDLElBQUksUUFBUTtFQUNqQyxNQUFNLElBQUksQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzNFLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzFELFNBQVMsSUFBSSxDQUFDLElBQUksU0FBUyxJQUFJLENBQUMsSUFBSSxTQUFTO0VBQzdDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQy9DLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQ2xELEdBQUc7QUFDSDtFQUNBLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRTtFQUNULElBQUksSUFBSSxPQUFPLENBQUMsSUFBSSxRQUFRLEVBQUU7RUFDOUIsTUFBTSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQ3RELEtBQUs7RUFDTCxJQUFJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUQsR0FBRztBQUNIO0VBQ0EsRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFO0VBQ1QsSUFBSSxJQUFJLE9BQU8sQ0FBQyxJQUFJLFFBQVEsRUFBRTtFQUM5QixNQUFNLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7RUFDdEQsS0FBSztFQUNMLElBQUksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxRCxHQUFHO0FBQ0g7RUFDQSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUU7RUFDVCxJQUFJLElBQUksT0FBTyxDQUFDLElBQUksUUFBUSxFQUFFO0VBQzlCLE1BQU0sT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztFQUN0RCxLQUFLO0VBQ0wsSUFBSSxPQUFPLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RELEdBQUc7QUFDSDtFQUNBLEVBQUUsTUFBTSxDQUFDLENBQUMsRUFBRTtFQUNaLElBQUksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztFQUNwRCxHQUFHO0FBQ0g7RUFDQSxFQUFFLEdBQUcsR0FBRztFQUNSLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDekMsSUFBSSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUM3QjtFQUNBLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUU7RUFDOUIsTUFBTSxPQUFPLEdBQUcsQ0FBQztFQUNqQixLQUFLO0VBQ0wsSUFBSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDMUIsR0FBRztBQUNIO0VBQ0EsRUFBRSxJQUFJLEdBQUc7RUFDVCxJQUFJLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3pDO0VBQ0EsSUFBSSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0VBQzFCLEdBQUc7QUFDSDtFQUNBLEVBQUUsR0FBRyxHQUFHO0VBQ1IsSUFBSSxPQUFPLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzNDLEdBQUc7QUFDSDtFQUNBLEVBQUUsU0FBUyxHQUFHO0VBQ2QsSUFBSSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzdCO0VBQ0EsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7RUFDNUIsTUFBTSxPQUFPLElBQUksQ0FBQztFQUNsQjtFQUNBLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDekIsSUFBSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDNUIsR0FBRztBQUNIO0VBQ0EsRUFBRSxTQUFTLENBQUMsQ0FBQyxFQUFFO0VBQ2YsSUFBSSxPQUFPLElBQUk7RUFDZixNQUFNLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNsRSxNQUFNLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNsRSxNQUFNLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNsRSxLQUFLLENBQUM7RUFDTixHQUFHO0FBQ0g7RUFDQSxFQUFFLE9BQU8sQ0FBQyxDQUFDLEVBQUU7RUFDYixJQUFJLElBQUksQ0FBQztFQUNULE1BQU0sSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN4QixNQUFNLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDeEIsTUFBTSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3hCLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNuQjtFQUNBLElBQUksT0FBTyxJQUFJO0VBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDekIsUUFBUSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzFCLFFBQVEsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxQixRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2pCLFFBQVEsQ0FBQztFQUNULE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3pCLFFBQVEsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxQixRQUFRLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUIsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNqQixRQUFRLENBQUM7RUFDVCxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN6QixRQUFRLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUIsUUFBUSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzFCLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDakIsUUFBUSxDQUFDO0VBQ1QsS0FBSyxDQUFDO0VBQ04sR0FBRztBQUNIO0VBQ0EsRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFFO0VBQ1gsSUFBSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztFQUMzQyxNQUFNLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQ2pDLE1BQU0sSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ25DLEdBQUc7QUFDSDtFQUNBLEVBQUUsY0FBYyxDQUFDLENBQUMsRUFBRTtFQUNwQixJQUFJLE9BQU87RUFDWCxNQUFNLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlFLE1BQU0sSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDOUUsTUFBTSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM5RSxLQUFLLENBQUM7RUFDTixHQUFHO0VBQ0gsQ0FBQztBQUNEO0VBQ08sU0FBUyxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQUU7RUFDOUIsRUFBRSxPQUFPLElBQUksS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7RUFDNUIsQ0FBQzs7RUNuSEQsTUFBTSxLQUFLLENBQUM7RUFDWixFQUFFLFdBQVcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxFQUFFO0VBQ3hCLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxFQUFFO0VBQ25CLE1BQU0sSUFBSSxDQUFDLENBQUMsR0FBRztFQUNmLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDcEIsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUNwQixRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDcEIsT0FBTyxDQUFDO0VBQ1IsS0FBSyxNQUFNLElBQUksT0FBTyxDQUFDLElBQUksUUFBUSxJQUFJLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO0VBQ3RELE1BQU0sSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDakIsS0FBSyxNQUFNO0VBQ1gsTUFBTSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDbkIsS0FBSztFQUNMLEdBQUc7QUFDSDtFQUNBLElBQUksT0FBTyxHQUFHO0VBQ2QsTUFBTSxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDbEMsS0FBSztBQUNMO0VBQ0EsRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRztFQUM1QixVQUFVLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUc7RUFDNUIsVUFBVSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHO0VBQzVCLFVBQVUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxHQUFHO0VBQy9CLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUM7QUFDbkI7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUc7RUFDVixNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO0VBQzFCLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7RUFDMUIsTUFBTSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztFQUMxQixNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO0VBQzFCLEtBQUssQ0FBQztBQUNOO0VBQ0EsSUFBSSxPQUFPLENBQUMsQ0FBQztFQUNiLEdBQUc7QUFDSDtFQUNBLEVBQUUsU0FBUyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFO0VBQ3pELElBQUk7RUFDSixNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRztFQUNyQixNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRztFQUNyQixNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRztFQUNyQixNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRztFQUNyQixNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRztFQUNyQixNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRztFQUNyQixNQUFNO0VBQ04sR0FBRztBQUNIO0VBQ0EsRUFBRSxNQUFNLEdBQUc7RUFDWCxJQUFJO0VBQ0osTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ25CLFFBQVEsSUFBSSxDQUFDLFNBQVM7RUFDdEIsVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0QixVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdEIsVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0QixVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdEIsVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0QixVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdEIsU0FBUztFQUNULE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNuQixRQUFRLElBQUksQ0FBQyxTQUFTO0VBQ3RCLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdEIsVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0QixVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdEIsVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0QixVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdEIsVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0QixVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLFNBQVM7RUFDVCxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDbkIsUUFBUSxJQUFJLENBQUMsU0FBUztFQUN0QixVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdEIsVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0QixVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdEIsVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0QixVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdEIsVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0QixTQUFTO0VBQ1QsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ25CLFFBQVEsSUFBSSxDQUFDLFNBQVM7RUFDdEIsVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0QixVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdEIsVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0QixVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdEIsVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0QixVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdEIsU0FBUztFQUNULE1BQU07RUFDTixHQUFHO0FBQ0g7RUFDQSxFQUFFLGFBQWEsQ0FBQyxDQUFDLEVBQUU7RUFDbkIsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdkIsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdkIsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdkIsSUFBSSxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUM7RUFDbEIsR0FBRztBQUNIO0VBQ0EsRUFBRSxXQUFXLENBQUMsRUFBRSxFQUFFO0VBQ2xCLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUM7QUFDbkI7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2pHLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzlCO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNqRyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNoQztFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDakcsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDaEM7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2pHLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2hDO0FBQ0E7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2pHLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2hDO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNqRyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNoQztFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDakcsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDaEM7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2pHLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2hDO0FBQ0E7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2pHLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2hDO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNqRyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNoQztFQUNBO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNqRyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNoQztFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDakcsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDaEM7QUFDQTtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDakcsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDaEM7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2pHLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2hDO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNqRyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNoQztFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDakcsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDaEM7RUFDQSxJQUFJLE9BQU8sQ0FBQyxDQUFDO0VBQ2IsR0FBRztBQUNIO0VBQ0EsRUFBRSxPQUFPLEdBQUc7RUFDWixJQUFJLElBQUksQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDO0VBQ25CLElBQUksSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQzVCO0VBQ0EsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDM0I7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTO0VBQ3JCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLE9BQU8sR0FBRyxHQUFHLENBQUM7QUFDZDtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVM7RUFDckIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsT0FBTyxHQUFHLEdBQUcsQ0FBQztBQUNkO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUztFQUNyQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixPQUFPLEdBQUcsR0FBRyxDQUFDO0FBQ2Q7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTO0VBQ3JCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLE9BQU8sR0FBRyxHQUFHLENBQUM7QUFDZDtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVM7RUFDckIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsT0FBTyxHQUFHLEdBQUcsQ0FBQztBQUNkO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUztFQUNyQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixPQUFPLEdBQUcsR0FBRyxDQUFDO0FBQ2Q7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTO0VBQ3JCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLE9BQU8sR0FBRyxHQUFHLENBQUM7QUFDZDtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVM7RUFDckIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsT0FBTyxHQUFHLEdBQUcsQ0FBQztBQUNkO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUztFQUNyQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixPQUFPLEdBQUcsR0FBRyxDQUFDO0FBQ2Q7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTO0VBQ3JCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLE9BQU8sR0FBRyxHQUFHLENBQUM7QUFDZDtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVM7RUFDckIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsT0FBTyxHQUFHLEdBQUcsQ0FBQztBQUNkO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUztFQUNyQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixPQUFPLEdBQUcsR0FBRyxDQUFDO0FBQ2Q7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTO0VBQ3JCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLE9BQU8sR0FBRyxHQUFHLENBQUM7QUFDZDtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVM7RUFDckIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsT0FBTyxHQUFHLEdBQUcsQ0FBQztBQUNkO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUztFQUNyQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixPQUFPLEdBQUcsR0FBRyxDQUFDO0FBQ2Q7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTO0VBQ3JCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLE9BQU8sR0FBRyxHQUFHLENBQUM7QUFDZDtFQUNBLElBQUksT0FBTyxDQUFDLENBQUM7RUFDYixHQUFHO0FBQ0g7RUFDQSxFQUFFLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFO0VBQ25CLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsSUFBSSxHQUFHO0VBQ25DLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQ3JCLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdEI7RUFDQSxJQUFJLE9BQU8sSUFBSSxDQUFDLE9BQU87RUFDdkIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDN0IsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztFQUNuQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO0VBQ25DLE1BQU0sQ0FBQztFQUNQLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7RUFDbkMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDN0IsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztFQUNuQyxNQUFNLENBQUM7RUFDUCxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO0VBQ25DLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7RUFDbkMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDN0IsTUFBTSxDQUFDO0VBQ1AsTUFBTSxDQUFDO0VBQ1AsTUFBTSxDQUFDO0VBQ1AsTUFBTSxDQUFDO0VBQ1AsTUFBTSxDQUFDO0VBQ1AsS0FBSyxDQUFDO0VBQ04sR0FBRztBQUNIO0VBQ0EsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUU7RUFDckIsSUFBSTtFQUNKLE1BQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFO0VBQ25DLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFO0VBQ3hDLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7RUFDeEMsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQztBQUNuQjtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUM7RUFDUCxNQUFNO0VBQ04sUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQ2xDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUNsQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDbEMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDeEQsT0FBTyxDQUFDO0FBQ1I7RUFDQSxJQUFJLE9BQU8sQ0FBQyxDQUFDO0VBQ2IsR0FBRztBQUNIO0VBQ0EsRUFBRSxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7RUFDNUIsSUFBSSxPQUFPLElBQUksQ0FBQyxPQUFPO0VBQ3ZCLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDdkIsTUFBTSxDQUFDO0VBQ1AsTUFBTSxDQUFDO0VBQ1AsTUFBTSxDQUFDO0VBQ1AsTUFBTSxDQUFDO0VBQ1AsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUN2QixNQUFNLENBQUM7RUFDUCxNQUFNLENBQUM7RUFDUCxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQ3ZCLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDdkIsTUFBTSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7RUFDMUIsTUFBTSxDQUFDLENBQUM7RUFDUixNQUFNLENBQUM7RUFDUCxNQUFNLENBQUM7RUFDUCxNQUFNLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7RUFDOUIsTUFBTSxDQUFDO0VBQ1AsS0FBSyxDQUFDO0VBQ04sR0FBRztBQUNIO0VBQ0EsRUFBRSxTQUFTLEdBQUc7RUFDZCxJQUFJLE9BQU8sSUFBSSxDQUFDLE9BQU87RUFDdkIsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNsQixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2xCLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDbEIsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNsQixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2xCLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDbEIsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNsQixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2xCLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENB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Q0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUM7RUFDbkYsS0FBSztFQUNMLEdBQUc7QUFDSDtFQUNBLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUU7RUFDckIsSUFBSSxNQUFNLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO0VBQzVCLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxHQUFHLEVBQUU7RUFDbEMsVUFBVSxJQUFJLENBQUMsVUFBVSxFQUFFO0VBQzNCLFVBQVUsSUFBSSxDQUFDLGVBQWUsRUFBRSxHQUFHLElBQUksQ0FBQztBQUN4QztFQUNBLElBQUksSUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7RUFDNUMsSUFBSSxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUM7QUFDM0M7RUFDQSxJQUFJLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksU0FBUztFQUNqRCxNQUFNLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksWUFBWSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDcEcsSUFBSSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLFNBQVM7RUFDbEQsTUFBTSxFQUFFLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO0VBQ3RHLElBQUksSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxTQUFTO0VBQzlDLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDdEQ7RUFDQSxJQUFJLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksSUFBSSxFQUFFO0VBQzdCLE1BQU0sRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUN0RDtFQUNBLE1BQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLFNBQVM7RUFDckMsUUFBUSxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztFQUN2RCxXQUFXO0VBQ1gsUUFBUSxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7RUFDL0QsUUFBUSxFQUFFLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDO0VBQzFFLE9BQU87RUFDUCxLQUFLO0VBQ0wsR0FBRztFQUNILENBQUM7QUFDRDtFQUNBLFNBQVMsVUFBVSxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUU7RUFDdkMsRUFBRSxJQUFJLE9BQU8sSUFBSSxTQUFTLEVBQUU7RUFDNUIsSUFBSSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO0VBQ2pELE1BQU0sSUFBSSxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7QUFDeEg7RUFDQSxNQUFNLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7RUFDcEQsTUFBTSxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7RUFDNUQsTUFBTSxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7RUFDNUQsS0FBSztFQUNMLEdBQUcsTUFBTTtFQUNULElBQUksS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtFQUNoRCxNQUFNO0VBQ04sUUFBUSxFQUFFLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQ2xFLE1BQU0sSUFBSSxFQUFFLEdBQUcsSUFBSSxFQUFFLEVBQUUsRUFBRSxHQUFHLElBQUksRUFBRSxFQUFFLEVBQUUsR0FBRyxJQUFJLEVBQUUsRUFBRSxJQUFJLEdBQUcsSUFBSSxFQUFFLENBQUM7QUFDL0Q7RUFDQSxNQUFNLEVBQUUsR0FBRyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDO0VBQzVCLE1BQU0sRUFBRSxHQUFHLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUM7RUFDNUIsTUFBTSxFQUFFLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQztFQUM1QjtFQUNBLE1BQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztFQUN0RDtFQUNBLE1BQU0sUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztFQUN0RCxNQUFNLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7RUFDdEQsTUFBTSxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0VBQ3RELEtBQUs7RUFDTDtFQUNBLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSSxRQUFRLEVBQUU7RUFDNUIsTUFBTSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7RUFDdEQsS0FBSztFQUNMLEdBQUc7QUFDSDtFQUNBLENBQUM7QUFDRDtFQUNPLFNBQVMsSUFBSSxDQUFDLEdBQUcsSUFBSSxFQUFFO0VBQzlCLEVBQUUsT0FBTyxJQUFJLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO0VBQzVCLENBQUM7O0VDNUlNLFNBQVMsT0FBTyxHQUFHO0VBQzFCLEVBQUUsSUFBSSxHQUFHLEdBQUc7RUFDWixJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUNYLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0VBQ1gsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7RUFDWCxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUNYLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0VBQ1gsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7RUFDWCxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUNYLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0VBQ1gsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7RUFDWCxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUNYLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0VBQ1gsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7RUFDWCxHQUFHLENBQUM7QUFDSjtFQUNBLEVBQUUsSUFBSSxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDMUk7RUFDQSxFQUFFLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQztFQUNq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
