import React, { useEffect } from 'react';
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';

const CANVAS_CONFIG = {
  width: 750,
  height: 750,
  id: 'glCanvas',
};

// Ref: https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Getting_started_with_WebGL
const main = (): void => {
  const canvas = document.getElementById(CANVAS_CONFIG.id) as HTMLCanvasElement;

  // Initialize the GL context
  const gl = canvas.getContext('webgl2');

  // Only continue if WebGL is available and working
  if (gl === null) {
    alert('Unable to initialize WebGL. Your browser or machine may not support it.');
    return;
  } else {
    console.log('WebGL object created.');
    console.log(gl);
  }

  // Set clear color, fully opaque
  gl.clearColor(0.6, 0.75, 0.75, 1.0);
  // Clear the color buffer with specified clear color
  gl.clear(gl.COLOR_BUFFER_BIT);

  console.log(vertexShader);
  console.log(fragmentShader);
};

export const App = (): JSX.Element => {
  useEffect(main, []);
  return <div>
    <canvas {...CANVAS_CONFIG}></canvas>
  </div>;
}

export default App;
