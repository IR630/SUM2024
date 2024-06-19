import { vertex } from "../rnd/prim.js";

export function setCube() {
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

  let vert = [
    vertex(0), vertex(1, 0, 0), vertex(0, 1, 0), vertex(0, 0, 1), vertex(1, 1, 0), vertex(1, 0, 1), vertex(0, 1, 1), vertex(1)
  ];

  const verts = [];
  for (let i of ind) {
    let vrtx = vertex(vert[i].pos);
    verts.push(vrtx);
  }

  return verts;
}

export function setTetrahedron() {
  const vert = [
    vertex(0, 0, 1), vertex(1, 0, 0), vertex(0, 1, 0), vertex(1)
  ];
  const ind = [
    0, 1, 2,
    0, 1, 3,
    0, 2, 3,
    1, 2, 3
  ];

  const verts = [];

  for (let i of ind) {
    let vrtx = vertex(vert[i].pos);
    verts.push(vrtx);
  }

  return verts;
}
