import { Object3D } from "./Object3D.js";
import { Vect3 } from "../math/Vect3.js";
import { Transform } from "../math/Transform.js";

class Camera extends Object3D {
    constructor(pos, dir, focLen) {
        super(pos);
        this.focLen = focLen;
        var normDir = dir.normalize();

        // Magical part
        this.#axis = new Transform([
            new Vect3(normDir.y + normDir.z, 0, -normDir.x).normalize(),
            new Vect3(0, normDir.x + normDir.z, -normDir.y).normalize(),
            normDir
        ]);

        this.rotation = Transform.IDT;
    }
    
    #axis;


    /**
     * 
     * @param {Vect3[]} vertexes 
     * @param {Vect3} pos
     * @returns {Vect3[]} list of projected real point 
     */
     castShape(vertexes, pos) {
        return vertexes.map(e => this.cast(e.add(pos)));
    }
    
    cast(vertex) {
        var v = this.pos.vect(vertex);
        var p = v.project(this.#axis.m[2]);
        var n = this.pos.add(p).vect(vertex);

        var projNorm = n.norm() * this.focLen / p.norm();
        var proj = n.normalize().scale(projNorm);

        return new Vect3(
            // calcul x
            proj.dot(this.#axis.m[0]),
            // calcul y
            proj.dot(this.#axis.m[1]),
            p.norm()
        );

    }

    project(v) {
        var proj = this.#axis.m[0].scale(v.x).add(this.#axis.m[1].scale(v.y));
        var n = proj.normalize().scale(proj.norm() * v.z / this.focLen);
        
        return this.pos.add(this.#axis.m[2].scale(v.z)).add(n);
    }

    move() {
        this.translate(this.#axis.transpose().transform(this.velocity));
    }

    rotate() {
        this.#axis = this.rotation.mult(this.#axis);
    }
}

export {Camera};