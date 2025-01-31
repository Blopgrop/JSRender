import { Object3D } from "./Object3D";

class Mesh extends Object3D{
    constructor(vertexes, faces, center)
    {
        super(center, vertexes)
        this.faces = faces;
    }
}