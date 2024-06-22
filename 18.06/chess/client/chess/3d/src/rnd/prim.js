import { vec3 } from "../mth/vec3.js";

class _vertex {
  pos = vec3();
  norm = vec3();

  constructor(x, y, z) {
    if (typeof (x) == "object") {
      this.pos = vec3(x);
    } else {
      this.pos = vec3(x, y, z);
    }    
  }
}

export function vertex(...args) {
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
      gl.uniform1f(this.shd.uniforms['Time'].loc, t);
    
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

export function prim(...args) {
  return new _prim(...args);
} // End of 'prim' function