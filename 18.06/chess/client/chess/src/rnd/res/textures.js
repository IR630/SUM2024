class _texture {
  constructor(nameURL, textureType = "2d") {
    this.name = nameURL.name;
    this.type = gl.TEXTURE_2D;
    this.id = gl.createTexture();
    gl.bindTexture(this.type, this.id);
    if (nameURL.img) {
      gl.texImage2D(this.type, 0, gl.RGBA, 1, 1, 0, gl.RGBA,
                    gl.UNSIGNED_BYTE, new Uint8Array([255, 255, 255, 0]));
      nameURL.img.onload = () => {
        gl.bindTexture(this.type, this.id);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(this.type, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE,
                      nameURL.img);
        gl.generateMipmap(this.type);
        gl.texParameteri(this.type, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(this.type, gl.TEXTURE_WRAP_T, gl.REPEAT);
        gl.texParameteri(this.type, gl.TEXTURE_MIN_FILTER,
                                    gl.LINEAR_MIPMAP_LINEAR);
        gl.texParameteri(this.type, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      }
    }
  }

  cubeMap() {
    this.type = gl.TEXTURE_CUBE_MAP;
    gl.bindTexture(this.type, this.id);
    const sideInfos = [
      {target: gl.TEXTURE_CUBE_MAP_POSITIVE_X, fileName: "PosX.png"},
      {target: gl.TEXTURE_CUBE_MAP_NEGATIVE_X, fileName: "NegX.png"},
      {target: gl.TEXTURE_CUBE_MAP_POSITIVE_Y, fileName: "PosY.png"},
      {target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, fileName: "NegY.png"},
      {target: gl.TEXTURE_CUBE_MAP_POSITIVE_Z, fileName: "PosZ.png"},
      {target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, fileName: "NegZ.png"},
    ];
    // Set default cube map
    sideInfos.forEach((side) => {
      const { target, fileName } = side;
      gl.texImage2D(target, 0, gl.RGBA, 1, 1, 0, gl.RGBA,
        gl.UNSIGNED_BYTE, new Uint8Array([255, 255, 255, 0]));
    });
    gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
    // Load all images
    sideInfos.forEach((side) => {
      const {target, fileName} = side;
      gl.bindTexture(this.type, this.id);
      const img = new Image();
      img.src = this.name + fileName;

      let isFirst = true;
      img.onload = () => {
        gl.bindTexture(this.type, this.id);
        if (isFirst) {
          isFirst = false;
          sideInfos.forEach((side) => {
            const { target, fileName } = side;
            gl.texImage2D(target, 0, gl.RGBA, img.width, img.height, 0,
              gl.RGBA, gl.UNSIGNED_BYTE, null);
          });
        }
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
        gl.texImage2D(target, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
      };
    });
    gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER,
                     gl.LINEAR_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_R, gl.CLAMP_TO_EDGE); 
  }
}
 
export function texture(...args) {
  //. . .
  return new _texture(...args);
}

