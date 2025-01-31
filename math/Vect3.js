class Vect3 {

    /**
     * represents a vector in 3 dimensions
     * @param {int} x 
     * @param {int} y 
     * @param {int} z 
     */
    constructor(x,y,z) {
        this.x = x; this.y = y; this.z = z;
    }

    static RIGHT = new Vect3(1,0,0);
    static DOWN = new Vect3(0,1,0);
    static FORWARD = new Vect3(0,0,1);
    static ZERO = new Vect3(0,0,0);

    /**
     * 
     * @param {int} t 
     * @return this scaled by t
     */
    scale(t) {
        return new Vect3 (
            this.x * t,
            this.y * t,
            this.z * t
        )
    }

    /**
     * 
     * @param {Vector3} other 
     * @returns sum
     */
    add(other) {
        return new Vect3 (
            this.x + other.x,
            this.y + other.y,
            this.z + other.z
        )
    }

    /**
     * 
     * @param {Vector3} other 
     * @returns dot product
     */
    dot(other) {
        return this.x * other.x + this.y * other.y + this.z * other.z;
    }
    
    norm() { 
        return Math.sqrt(this.dot(this));
    }

    normalize() {
        return this.scale(1/this.norm());
    }

    /**
     * 
     * @param {Vect3} other 
     * @returns distance
     */
    dist(other) {
        return this.vect(other).norm();
    }
    
    /**
     * 
     * @param {Vect3} other 
     * @returns this projected onto other (must be normalized)
     */
    project(other) {
        return other.scale(this.dot(other))
    }

    /**
     * 
     * @param {Vect3} other 
     * @returns vector betwen 2 cooridates
     */
    vect(other) {
        return other.add(this.scale(-1));
    }

    copy() {
        return new Vect3(this.x, this.y, this.z)
    }

    /**
     * 
     * @param {int} x 
     * @returns 
     */
    setX(x) {
        return new Vect3(x, this.y, this.z);
    }

    setY(y) {
        return new Vect3(this.x, y, this.z);
    }

    setZ(z) {
        return new Vect3(this.x, this.y, z);
    }

    setPos(pos) {
        this.x = pos.x;
        this.y = pos.y;
        this.z = pos.z;
    }
    
}

export {Vect3};