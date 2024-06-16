import { vertex } from "../anim/rnd/rndprim.js";

export function setCube() {
  return [vertex(0), vertex(1, 0, 0), vertex(0, 1, 0), vertex(0, 0, 1), vertex(1, 1, 0), vertex(1, 0, 1), vertex(0, 1, 1), vertex(1)];
}
