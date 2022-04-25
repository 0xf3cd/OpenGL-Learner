import React, { useEffect } from 'react';

import { CANVAS_CONFIG } from './common/Constants';
import {
  createGlContext,
  loadShader,
  createProgram,
} from './common/Helpers';

import vertexShaderSrc from './shaders/vertex.glsl';
import fragmentShaderSrc from './shaders/fragment.glsl';

import { mat4 } from 'gl-matrix';

const main = (): void => {
  // Create the GL context.
  const gl = createGlContext(CANVAS_CONFIG.id);
  if (!gl) { return; }
  console.log('WebGL object created.');
  console.log(gl);

  // Create the shaders.
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vertexShaderSrc);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSrc);
  if (!vertexShader || !fragmentShader) { return; }

  // Create the program.
  const shaderProgram = createProgram(gl, vertexShader, fragmentShader);
  if (!shaderProgram) { return; }

  // Create the descriptor.
  const descriptor = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
    },
  };

  // Initialize and bind the buffer.
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  const positions: Array<number> = [
    1.0,  1.0,
   -1.0,  1.0,
    1.0, -1.0,
   -1.0, -1.0,
  ];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  const buffers = {
    position: positionBuffer,
  };

  // Draw the scene.
  const rgba = CANVAS_CONFIG.rgba;
  gl.clearColor(rgba.r, rgba.g, rgba.b, rgba.a);
  gl.clearDepth(1.0);       // Clear everything.
  gl.enable(gl.DEPTH_TEST); // Enable depth testing.
  gl.depthFunc(gl.LEQUAL);  // Near things obscure far things.
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  const fieldOfView = 45 * Math.PI / 180;
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;

  const projectionMatrix = mat4.create();
  mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);

  const modelViewMatrix = mat4.create();
  mat4.translate(modelViewMatrix, modelViewMatrix, [
    -0.0, 0.0, -6.0,
  ]); // Move the drawing position a bit.

  // Configure the vertex buffer.
  {
    const numComponents = 2;  // Pull out 2 values per iteration.
    const type = gl.FLOAT;    // The data in the buffer is 32bit floats.
    const normalize = false;  // Don't normalize.
    const stride = 0;         // 0 => use type and numComponents above.
    const offset = 0;         // How many bytes inside the buffer to start from.
  
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(
      descriptor.attribLocations.vertexPosition, 
      numComponents, type, normalize, stride, offset);
    gl.enableVertexAttribArray(
      descriptor.attribLocations.vertexPosition);
  }

  gl.useProgram(descriptor.program);
  gl.uniformMatrix4fv(
    descriptor.uniformLocations.projectionMatrix, false, projectionMatrix);
  gl.uniformMatrix4fv(
    descriptor.uniformLocations.modelViewMatrix, false, modelViewMatrix);

  {
    const offset = 0;
    const vertexCount = positions.length / 2;
    gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
  }
};

export const App = (): JSX.Element => {
  useEffect(main, []);
  return <div>
    <canvas {...CANVAS_CONFIG}></canvas>
  </div>;
};

export default App;
