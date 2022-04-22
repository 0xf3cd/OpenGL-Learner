import React, { useEffect } from 'react';
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';

// Ref: https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Getting_started_with_WebGL

const CANVAS_CONFIG = {
  width: 750,
  height: 750,
  id: 'glCanvas',
  rgba: {
    r: 0.18,
    g: 0.35,
    b: 0.15,
    a: 1,
  },
};

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
  const rgba = CANVAS_CONFIG.rgba;
  gl.clearColor(rgba.r, rgba.g, rgba.b, rgba.a);
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
};

export default App;
