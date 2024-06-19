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

    uniform mat4 MatrWVP;

    out vec2 DrawPos;
    void main( void )
    {
      gl_Position = MatrWVP * vec4(InPosition, 1);
      DrawPos = InPosition.xy;
    }
    `;
    let fs_txt =
    `#version 300 es
    precision highp float;
    out vec4 OutColor;

    in vec2 DrawPos;
    uniform float Time;
    
    void main( void )
    {
      vec3 col = vec3(1, 1, 1);
      OutColor = vec4(col * (sin(Time * 6.0) + 0.2), 1.0);
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
export function shader(name) {
  return new _shader(name);
}