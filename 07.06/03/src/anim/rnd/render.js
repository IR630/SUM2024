
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
  /*
  if (window.gl == undefined) {
    let canvas = document.getElementById("myCan");
    window.gl = canvas.getContext("webgl2");
  }
  */
  /*
  if (window.vg == undefined) {
    window.vg = new render();
  }
  */
  gl.clearColor(0.3, 0.47, 0.8, 1);

  // Shader creation
  let vs_txt = `#version 300 es
  precision highp float;
  in vec3 InPosition;
    
  out vec2 DrawPos;
  uniform float Time;
 
  void main( void )
  {
    gl_Position = vec4(InPosition, 1);
    DrawPos = InPosition.xy;
  }
  `;
  let fs_txt = `#version 300 es
  precision highp float;
  out vec4 OutColor;
  
  in vec2 DrawPos;
  uniform float Time;

  vec2 CmplSet( float A, float B )
  {
    vec2 C;

    C.x = A;
    C.y = B;
    return C;
  }

  vec2 CmplAddCmpl( vec2 Z1, vec2 Z2 )
  {
    return CmplSet(Z1.x + Z2.x, Z1.y + Z2.y);
  }

  vec2 CmplMulCmpl( vec2 Z1, vec2 Z2 )
  {
    return CmplSet(Z1.x * Z2.x - Z1.y * Z2.y, Z1.x * Z2.y + Z1.y * Z2.x);
  }
  
  float CmplNorm( vec2 Z )
  {
    return sqrt(Z.x * Z.x + Z.y * Z.y);
  }
  
  float Mandelbrot( vec2 Z )
  {
    float n = 0.0;
    vec2 Z0;
  
    Z0 = Z;
    while (n < 255.0 && CmplNorm(Z) < 2.0)
    {
      Z = CmplAddCmpl(CmplMulCmpl(Z, Z), Z0);
      n += 1.0;
    }
    return n;
  }

  float Julia( vec2 Z, vec2 C )
  {
    float n = 0.0;
  
    while (n < 255.0 && CmplNorm(Z) < 2.0)
    {
      Z = CmplAddCmpl(CmplMulCmpl(Z, Z), C);
      n += 1.0;
    }
    return n;
  }

  void main( void )
  {
    vec2 Z, C;
    float n;

    Z = CmplSet(DrawPos.x * 2.0, DrawPos.y * 2.0);
    /* n = Mandelbrot(Z); */
    C = vec2(cos(Time) / 3.0, sin(Time) / 3.0);
    n = Julia(Z, C);
    
    OutColor = vec4(n * 8.0 / 255.0, n * 5.0 / 255.0, n / 255.0, 1.0);
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