import React, { useEffect } from 'react';
import vertexShaderSrc from './shaders/vertex.glsl';
import fragmentShaderSrc from './shaders/fragment.glsl';

// Ref: https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Getting_started_with_WebGL

const CANVAS_CONFIG = {
  width: 750,
  height: 750,
  id: 'glCanvas',
  rgba: {
    r: 0.125,
    g: 0.25,
    b: 0.1,
    a: 1,
  },
};

const createGlContext = (canvasId: string): WebGL2RenderingContext | null => {
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

const loadShader = (gl: WebGL2RenderingContext, type: number, source: string): WebGLShader | null => {
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

const createProgram = (gl: WebGL2RenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram | null => {
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

const main = (): void => {
  // Create the GL context.
  const gl = createGlContext(CANVAS_CONFIG.id);
  if (!gl) { return; }
  console.log('WebGL object created.');
  console.log(gl);

  // Set clear color, fully opaque
  const rgba = CANVAS_CONFIG.rgba;
  gl.clearColor(rgba.r, rgba.g, rgba.b, rgba.a);
  // Clear the color buffer with specified clear color
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Create the shaders.
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vertexShaderSrc);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSrc);
  if (!vertexShader || !fragmentShader) { return; }

  // Create the program.
  const shaderProgram = createProgram(gl, vertexShader, fragmentShader);
  if (!shaderProgram) { return; }

  console.log(vertexShader);
  console.log(fragmentShader);
  console.log(shaderProgram);
};

export const App = (): JSX.Element => {
  useEffect(main, []);
  return <div>
    <canvas {...CANVAS_CONFIG}></canvas>
  </div>;
};

export default App;
