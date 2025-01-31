import { Frame } from "./Frame.js";
import { Camera } from "./Camera.js";
import { Vect3 } from "../math/Vect3.js";

class Scene {
    /**
     * 
     * @param {Frame[]} objects 
     * @param {Camera} camera 
     * 
     */
    constructor(objects, camera) {
        this.objects = objects;
        this.camera = camera;
    }

    static #PICKUP_RANG = 50;

    #projObjects = []
    #pickedUp = null;

    render(ctx) {
        this.#projObjects = this.objects.map(o => {
            var projVertexes = this.camera.castShape(o.vertexes, o.pos);

            o.edges.map(e => {
                var u = projVertexes[e.u];
                var v = projVertexes[e.v];
    
                ctx.beginPath();
                ctx.moveTo(u.x, u.y);
                ctx.lineTo(v.x, v.y);
                ctx.stroke();
            });
            return new Frame(projVertexes, [], this.camera.cast(o.pos));
        });
    }

    pick(pos) {
        var dist;
        pos = pos.setZ(0);
        
        // Scann through centers first
        for (var i = 0; i < this.objects.length; i++) {
            dist = this.#projObjects[i].pos.setZ(0).dist(pos);
            if (dist <= Scene.#PICKUP_RANG) {
                this.#pickedUp = [this.objects[i], this.#projObjects[i].pos.z, "shape"];
                return true;
            }
        }

        // Scann through points
        console.log("hi");
        for (var i = 0; i < this.#projObjects.length; i++) {
            var v = this.#projObjects[i].vertexes;
            for(var j = 0; j < v.length; j++) {

                dist = v[j].setZ(0).dist(pos);
                if (dist <= Scene.#PICKUP_RANG) {
                    this.#pickedUp = [this.objects[i], this.#projObjects[i].vertexes[j].z, "point", j];
                    return true;
                }
            }
        }
        return false;
    }

    drop() {
        this.#pickedUp = null;
    }

    drag(pos) {
        if (this.#pickedUp != null) {
            var proj = this.camera.project(pos.setZ(this.#pickedUp[1]));
            if (this.#pickedUp[2] == "shape")
            this.#pickedUp[0].setPos(proj);
            else if(this.#pickedUp[2] == "point")
            this.#pickedUp[0].vertexes[this.#pickedUp[3]] = this.#pickedUp[0].pos.vect(proj);
        };
    }

    partyTime(mat) {
        this.objects.forEach((o) => o.rotate(mat));
    }
}

class Ray {
    constructor(pos, dir) {
        this.pos = pos;
        this.dir = dir;
    }
}

export {Scene}  