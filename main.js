import { Vect3 } from './math/Vect3.js';
import { Object3D } from './rendering/Object3D.js';
import { Camera } from './rendering/Camera.js';
import { Cube, Pyramide } from './rendering/Shape.js';
import { Scene } from './rendering/Scene.js';
import { Transform } from './math/Transform.js';


const c = document.getElementById("canvas");
const ctx = c.getContext("2d");

c.onclick = pick;
c.onmousemove = move;
document.onkeydown = keyDownHandler;
document.onkeyup = keyUpHandler;


//-------------------------------------------------
// Global var
//-------------------------------------------------
let refreshFreq = 15;
let backgroud = 'rgb(175,130,255)';
let mousePos = new Vect3(0,0,0);
let clicked = false;

// Rotations
let angleSpeed = Math.PI/4;
let angle = angleSpeed * refreshFreq / 1000;
let rotMatX = Transform.rotateX(angle);
let rotMatY = Transform.rotateY(angle);
let rotMatZ = Transform.rotateZ(angle);

// Controls
let moveSpeed = 100;
let speed = moveSpeed * refreshFreq / 1000;
const controls = new Map([
    ["k", (cam) => moveSpeed = 1000],
    ["w", (cam) => cam.velocity.z = speed],
    ["s", (cam) => cam.velocity.z = -speed],
    ["d", (cam) => cam.velocity.x = speed],
    ["a", (cam) => cam.velocity.x = -speed],
    ["Control", (cam) => cam.velocity.y = speed],
    [" ", (cam) => cam.velocity.y = -speed],
    ["ArrowUp", (cam) => cam.rotation = rotMatX],
    ["ArrowDown", (cam) => cam.rotation = Transform.rotateX(-angle)],
    ["ArrowRight", (cam) => cam.rotation = rotMatY],
    ["ArrowLeft", (cam) => cam.rotation = Transform.rotateY(-angle)],
    
    ["k_r", (cam) => moveSpeed = 100],
    ["w_r", (cam) => cam.velocity.z = 0],
    ["s_r", (cam) => cam.velocity.z = 0],
    ["d_r", (cam) => cam.velocity.x = 0],
    ["a_r", (cam) => cam.velocity.x = 0],
    ["Control_r", (cam) => cam.velocity.y = 0],
    [" _r", (cam) => cam.velocity.y = -0],
    ["ArrowUp_r", (cam) => cam.rotation = Transform.IDT],
    ["ArrowDown_r", (cam) => cam.rotation = Transform.IDT],
    ["ArrowRight_r", (cam) => cam.rotation = Transform.IDT],
    ["ArrowLeft_r", (cam) => cam.rotation = Transform.IDT],
]);

let cam = new Camera(new Vect3(0, -3, -5).scale(100), new Vect3(0,1/3,1), 200);

// Scene
let scene = new Scene (
    [
        new Cube(new Vect3(0, 0, 0), 100),
        new Cube(new Vect3(100, 300,-200), 500),
        new Cube(new Vect3(200, 0, 300), 20),
        new Pyramide(new Vect3(-200, -300, 700), 200)
    ],   
    cam
)

// start
ctx.strokeStyle = "white";
ctx.translate(c.width/2, c.height/2);
//-----------
ctx.fillStyle = "white"

setInterval(draw, 15);
test();

function draw() {
    clear();
    cam.focLen = htmlData("focalLength");
    cam.move();
    cam.rotate();

    scene.render(ctx);
    scene.drag(mousePos);

    if(document.getElementById("rotX").checked) scene.partyTime(rotMatX);
    if(document.getElementById("rotY").checked) scene.partyTime(rotMatY);
    if(document.getElementById("rotZ").checked) scene.partyTime(rotMatZ);
    
}

//------------------------------------------------- 
// Functions 
//-------------------------------------------------

function clear() {
    ctx.save();
    ctx.fillStyle = backgroud;
    // ctx.clearRect(-c.width/2, -c.height/2, c.width, c.height);
    ctx.fillRect(-c.width/2, -c.height/2, c.width, c.height);
    ctx.restore();
}

function move(e) {
    var rect = c.getBoundingClientRect();
    mousePos = new Vect3(
        e.clientX - rect.left - c.width/2,
        e.clientY - rect.top - c.height/2,
        500
    )
}

function pick() {
    console.log("click");
    if (!clicked) clicked = scene.pick(mousePos);
    else {
        scene.drop();
        clicked =!clicked;
    }
}

function keyDownHandler(e) {
    console.log(e.key);
    if (controls.has(e.key)) controls.get(e.key)(cam);
}

function keyUpHandler(e) {
    var s = e.key + "_r";
    if (controls.has(s)) controls.get(s)(cam);
}

function htmlData(id) {
    return document.getElementById(id).valueAsNumber;
}

function test() {
    var a = "hello"
    var b = a + " world";
    console.log(b);
}

