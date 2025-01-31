import { Vect3 } from "./Vect3.js";

class Transform {
    static IDT = new Transform ([
        new Vect3(1,0,0),
        new Vect3(0,1,0),
        new Vect3(0,0,1)
    ])
    
    constructor(m) {
        this.m = m;
    }

    transform(v) {
        return new Vect3 (
            v.dot(this.m[0]),
            v.dot(this.m[1]),
            v.dot(this.m[2])
        );
    }

    transpose() {
        return new Transform([
            new Vect3(this.m[0].x, this.m[1].x, this.m[2].x),
            new Vect3(this.m[0].y, this.m[1].y, this.m[2].y),
            new Vect3(this.m[0].z, this.m[1].z, this.m[2].z)
        ])
    }

    /**
     * 
     * @param {Transform} other 
     * @returns 
     */
    mult(other) {
        var b = other.m;
        var ret = b.map((v) => this.transform(v));

        return new Transform(ret);
    }

    static rotateX(angle) {
        var mat = [
            new Vect3(1, 0, 0),
            new Vect3(0, Math.cos(angle), Math.sin(angle)),
            new Vect3(0, -Math.sin(angle), Math.cos(angle))
        ];
        return new Transform(mat);
    }

    static rotateY(angle) {
        var mat = [
            new Vect3(Math.cos(angle), 0, Math.sin(angle)),
            new Vect3(0, 1, 0),
            new Vect3(-Math.sin(angle), 0, Math.cos(angle))
        ];
        return  new Transform(mat);
    }

    static rotateZ(angle) {
        var mat = [
            new Vect3(Math.cos(angle), -Math.sin(angle), 0),
            new Vect3(Math.sin(angle), Math.cos(angle), 0),
            new Vect3(0, 0, 1)
        ];
        return new Transform(mat);
    }
}

export {Transform};