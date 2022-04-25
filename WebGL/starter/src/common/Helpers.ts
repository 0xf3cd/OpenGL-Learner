export const createGlContext = (canvasId: string): WebGL2RenderingContext | null => {
  // Initialize the GL context
  const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
  if (!canvas) {
    console.error('Could not find the canvas element.');
    return null;
  }
  const gl = canvas.getContext('webgl2');
  if (!gl) {
    console.error('Unable to initialize WebGL. Your browser or machine may not support it.');
    return null;
  }
  return gl;
};

export const loadShader = (gl: WebGL2RenderingContext, type: number, source: string): WebGLShader | null => {
  // Create the shader.
  const shader = gl.createShader(type);
  if (!shader) {
    console.error('Could not create shader.');
    return null;
  }
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  // Check the compile result.
  const status = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!status) {
    const info = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    console.error(`An error occurred when compiling the shader:\n${info}`);
    return null;
  }

  return shader; // Safely return the shader!
};

export const createProgram = (gl: WebGL2RenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram | null => {
  const program = gl.createProgram();
  if (!program) {
    console.error('Could not create the program.');
    return null;
  }

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  const status = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!status) {
    const info = gl.getProgramInfoLog(program);
    gl.deleteProgram(program);
    console.error(`An error occurred when linking the program:\n${info}`);
    return null;
  }

  return program;
};
