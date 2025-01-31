# Java Script Renderer

## Requirement
A browser, a localhost server (ex: `python -m http.server`)

## Overview
This is my first real personnal project on a javascript "game" that can display geometrical shapes on a canvas. 

Folders :
  |- math            _handels all the math_
    |- Transform.js
    |- Vect3.js
  |- obj             _where some .obj files are stored_
  |- rendering       _classes used by the renderer_
    |- Camera.js
    |- Frame.js
    |- Mesh.js
    |- Object3D.js
    |- Scene.js
    |- Shape.js
  |- index.html
  |- main.js        _the program givent to the htlm canvas_
  |- Processing.js  _Parser for .obj files_

  # Roadmap
  - (bug) correct the orientation of the camera (curr: camera rotation is in world coordinate)
  - (bug) clip the fov to only forward (curr: points behind camera are projected forward)
  - finish handeling of import of 3D object
  - render faces
  - add light sources and light the scene accordingly
