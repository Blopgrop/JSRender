import {Vect3} from '../math/Vect3.js';
import { Transform } from '../math/Transform.js';
import {Object3D} from './Object3D.js';
import { Camera } from './Camera.js';

class Frame extends Object3D {
    /**
     * 
     * @param {Vect3[]} vertexes 
     * @param {number[][]} edges 
     * @param {Vect3} pos 
     */
    constructor(vertexes, edges, pos) {
        super(pos)
        this.vertexes = vertexes;
        this.edges = edges;
    }

    /**
     * 
     * @param {Transform} mat 
     */
    rotate(mat) {
        this.vertexes = this.vertexes.map((v) => mat.transform(v));
    }

}

export {Frame};