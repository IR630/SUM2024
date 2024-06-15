// Setting camera function.
export function camSet(cam, loc, at, up) {
  cam.matrView = mat4().matrView(loc, at, up);

  cam.right = vec3(cam.matrView.m[0][0],
                   cam.matrView.m[1][0]),
                   cam.matrView.m[2][0];

  cam.up = vec3(cam.matrView.m[0][1],
                cam.matrView.m[1][1]),
                cam.matrView.m[2][1];
                
  cam.dir = vec3(-cam.matrView.m[0][2],
                 -cam.matrView.m[1][2],
                 -cam.matrView.m[2][2]);
                  

  cam.loc = loc;
  cam.at = at;
  cam.matrVP = cam.matrView.matrMulMatr(cam.matrProj);
} // End of 'camSet' function

// Setting camera frame size function
export function camSetProj(cam, projSize, projDist, projFarClip) {
  let rx, ry;

  cam.projDist = projDist;
  cam.projFarClip = projFarClip;
  rx = ry = cam.projSize = projSize;

  /* Correct aspect ratio */
  if (cam.frameW >= cam.frameH)
    rx *= cam.frameW / cam.frameH;
  else
    ry *= cam.frameH / cam.frameW;

  cam.Wp = rx;
  cam.Hp = ry;
  cam.MatrProj =
    frustum(-rx / 2, rx / 2, -ry / 2, ry / 2,
      cam.ProjDist, cam.ProjFarClip);
  cam.MatrVP = MatrMulMatr(cam.MatrView, cam.MatrProj);
} // End of 'camSetProj' function

// Setting projection data function
export function camSetSize(cam, frameW, frameH) {
  cam.frameW = frameW;
  cam.frameH = frameH;
  camSetProj(cam, cam.projSize, cam.projDist, cam.projFarClip);
} // End of 'camSetSize' function
