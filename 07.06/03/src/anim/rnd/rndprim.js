function primCreate(pr, v, type, numOfV, ind, numOfI) {
  gl.GenVertexArrays(1, pr.VA);

  if (v != null && numOfV != 0) {
        glBindVertexArray(Pr.va);
    
    glGenBuffers(1, pr.vBuf);
    glBindBuffer(GL_ARRAY_BUFFER, pr.vBuf);
    glBufferData(GL_ARRAY_BUFFER, sizeof(v) * NumOfV, V, GL_STATIC_DRAW);
     
    gl.VertexAttribPointer(0, 3, GL_FLOAT, FALSE, sizeof(v), 0); /* Position */
    gl.VertexAttribPointer(1, 2, GL_FLOAT, FALSE, sizeof(v), 12); /* texture coordinates */
    gl.VertexAttribPointer(2, 3, GL_FLOAT, FALSE, sizeof(v), 20); /* Normals */
    gl.VertexAttribPointer(3, 4, GL_FLOAT, FALSE, sizeof(v), 30); /* Color */
     
    /* On attributes (layout) */
    gl.EnableVertexAttribArray(0);
    gl.EnableVertexAttribArray(1);
    gl.EnableVertexAttribArray(2);
    gl.EnableVertexAttribArray(3);
     
    /* Off massive of vertex */
    gl.BindVertexArray(0);
  }

  if (ind != null && numOfI != 0) {
    gl.GenBuffers(1, pr.iBuf);
    gl.BindBuffer(GL_ELEMENT_ARRAY_BUFFER, Pr.iBuf);
    gl.BufferData(GL_ELEMENT_ARRAY_BUFFER, 4 * numOfI, ind, GL_STATIC_DRAW); //sizeof int
    gl.bindBuffer(GL_ELEMENT_ARRAY_BUFFER, 0);

    pr.numOfElements = numOfI;
  }
  else
    pr.numOfElements = numOfV;

  pr.type = type;
  pr.trans = mat4();
} // End of 'primCreate' function

function primDraw(pr, world) {
  let
    w = mat4(),
    winv = mat4(),
    wvp = mat4(),
    progId,
    primData;

  pr.type = GL_LINES;
  w = pr.trans.matrMulMatr(world);
  winv = w.transpose().inverse();
  wvp = w.matrMulMatr(matrWVP);
  primData.MatrW = w;
  primData.MatrWInv = winv;
  primData.MatrWVP = wvp;
  for (let i = 0; i < 4; i++) {
    primData.addonI[i] = IR6_RndShdAddonI[i];
    primData.addonF[i] = IR6_RndShdAddonF[i];
    primData.addonV[i] = IR6_RndShdAddonV[i];
  }
  IR6_RndUBOUpdate(IR6_RndShdUBOPrimNo, 0, 0, primData);
  
  if ((progId = IR6_RndMtlApply(pr.mtlNo)) == 0)
    return;
  glUseProgram(progId);

  /*
  if (pr.Type == PRIM_PATCH)
    glPatchParameteri(GL_PATCH_VERTICES, pr.numOfPatchPoints);
  */
  gl.BindVertexArray(pr.va);
  if (pr.instanceCnt < 2)
    if (pr.iBuf == 0)
      glDrawArrays(gl_prim_type, 0, pr.numOfElements);
    else
    {
      glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, pr.iBuf);
      glDrawElements(gl_prim_type, pr.numOfElements, GL_UNSIGNED_INT, NULL);
      glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, 0);
    }
  else
    if (pr.iBuf == 0)
      gl.DrawArraysInstanced(gl_prim_type, 0, pr.numOfElements,pr.instanceCnt);
    else
    {
      gl.BindBuffer(GL_ELEMENT_ARRAY_BUFFER, pr.iBuf);
      gl.DrawElementsInstanced(gl_prim_type, pr.numOfElements, GL_UNSIGNED_INT, NULL, pr.instanceCnt);
      gl.BindBuffer(GL_ELEMENT_ARRAY_BUFFER, 0);
    }

  gl.BindVertexArray(0);
  gl.UseProgram(0);
} // End of 'primDraw' function