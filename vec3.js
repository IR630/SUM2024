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

export function vec3(...args) {
  return new _vec3(...args);
} // End of 'vec3' function
