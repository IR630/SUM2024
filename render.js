
// Main render frame function
export function render() {
  // console.log(`Frame ${x++}`);
  gl.clear(gl.COLOR_BUFFER_BIT);

  if (timeLoc != -1) {
    const date = new Date();
    let t =
      date.getMinutes() * 60 +
      date.getSeconds() +
      date.getMilliseconds() / 1000;

    gl.uniform1f(timeLoc, t);
  }
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
} // End of 'render' function

// Load and compile shader function
function loadShader(shaderType, shaderSource) {
  const shader = gl.createShader(shaderType);
  gl.shaderSource(shader, shaderSource);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    let buf = gl.getShaderInfoLog(shader);
    console.log("Shader compile fail: " + buf);
  }
  return shader;
} // End of 'loadShader' function

// OpenGL initialization function
export function initGL() {
  gl.enable(gl.DEPTH_TEST);
  gl.clearColor(0.3, 0.47, 0.8, 1);

  // Shader creation
  let vs_txt = `#version 300 es
  precision highp float;
  in vec3 InPosition;
  in vec3 InNormal;
      
  out vec3 DrawPos;
  out vec3 DrawNormal;

  uniform float Time;
  uniform mat4 MatrProj;
  uniform mat4 MatrW;

  void main( void )
  {
    gl_Position = MatrProj * vec4(InPosition, 1);
    DrawPos = vec3(MatrW * vec4(InPosition.xyz, 1.0));
    DrawNormal = mat3(transpose(inverse(MatrW))) * InNormal;
  }
  `;

  let fs_txt = `#version 300 es
  precision highp float;

  out vec4 OutColor;

  in vec3 DrawPos;
  in vec3 DrawNormal;

  uniform float Time;

  void main( void )
  {
    vec3 L = normalize(vec3(0, 0.5, 1));
    vec3 N = normalize(DrawNormal);
      
    N = faceforward(N, normalize(DrawPos), N);
      
    float k = dot(L, normalize(N));

    OutColor = vec4(k * vec3(0, 0.7, 0.5), 1.0);
      //OutColor = vec4(N, 1.0);
  }
  `;
let vs = loadShader(gl.VERTEX_SHADER, vs_txt),
    fs = loadShader(gl.FRAGMENT_SHADER, fs_txt);
  window.prg = gl.createProgram();
  gl.attachShader(prg, vs);
  gl.attachShader(prg, fs);
  gl.linkProgram(prg);
  if (!gl.getProgramParameter(prg, gl.LINK_STATUS)) {
    let buf = gl.getProgramInfoLog(prg);
    console.log("Shader program link fail: " + buf);
  }

  // Vertex buffer creation
  const size = 0.8;
  const vertexes = [
    -size,
    size,
    0,
    -size,
    -size,
    0,
    size,
    size,
    0,
    size,
    -size,
    0,
  ];
  const posLoc = gl.getAttribLocation(prg, "InPosition");
  let vertexArray = gl.createVertexArray();
  gl.bindVertexArray(vertexArray);
  let vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexes), gl.STATIC_DRAW);
  if (posLoc != -1) {
    gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(posLoc);
  }

  // Uniform data
  window.timeLoc = gl.getUniformLocation(prg, "Time");

  gl.useProgram(prg);
} // End of 'initGL' function