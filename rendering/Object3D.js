import { Transform } from '../math/Transform.js';
import {Vect3} from '../math/Vect3.js';

class Object3D {
    constructor(pos) {
        if (this.constructor == Object3D)
        throw new Error("Cannot be instantiated.");
        this.pos = pos;
        this.velocity = Vect3.ZERO;
    }
    
    rotate() {
        throw new Error("No method rotate for this instance");
    }

    translate(dir) {
        this.pos = this.pos.add(dir);
    }

    setPos(newPos) {
        this.pos = newPos;
    }
}

export {Object3D};