import { Frame } from "./Frame.js"
import { Vect3 } from "../math/Vect3.js"

class Cube extends Frame {
    constructor(pos, size) {
        super (
            [
                new Vect3(1, 1, 1).scale(size),
                new Vect3(1, -1, 1).scale(size),
                new Vect3(-1, -1, 1).scale(size),
                new Vect3(-1, 1, 1).scale(size),
                new Vect3(1, 1, -1).scale(size),
                new Vect3(1, -1, -1).scale(size),
                new Vect3(-1, -1, -1).scale(size),
                new Vect3(-1, 1, -1).scale(size)
            ],
            [
                {u: 0, v: 1}, {u: 1, v: 2}, {u: 2, v: 3}, {u: 3, v: 0}, 
                {u: 4, v: 5}, {u: 5, v: 6}, {u: 6, v: 7}, {u: 7, v: 4}, 
                {u: 0, v: 4}, {u: 1, v: 5}, {u: 2, v: 6}, {u: 3, v: 7} 
            ],
            pos
        )
    }
}

class Pyramide extends Frame {
    constructor(pos, size) {
        super(
            [
                new Vect3(-1, 0.5, -1).scale(size),
                new Vect3(-1, 0.5, 1).scale(size),
                new Vect3(1, 0.5, 1).scale(size),
                new Vect3(1, 0.5, -1).scale(size),
                new Vect3(0, -1.5, 0).scale(size)
            ],
            [
                {u:0 , v: 1}, {u: 1, v: 2}, {u: 2, v: 3}, {u: 3, v: 0},
                {u: 0, v: 4}, {u: 1, v: 4}, {u: 2, v: 4}, {u: 3, v: 4}
            ],
            pos
        )
    }
}

export {Cube, Pyramide}