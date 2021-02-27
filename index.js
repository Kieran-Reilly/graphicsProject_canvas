import {Particle} from "./src/particle.js";

//initialize the canvas
const canvas = document.createElement("canvas");
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particles = [];
let hue = 0;

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

const mouseHandler = {
    x: null,
    y: null,
}

canvas.addEventListener('click', async function (event) {
    mouseHandler.x = event.x;
    mouseHandler.y = event.y;
    for (let i = 0; i < 10; i++) {
        particles.push(new Particle(mouseHandler.x, mouseHandler.y, context, hue));
    }
});

canvas.addEventListener("mousemove", async function (event) {
    mouseHandler.x = event.x;
    mouseHandler.y = event.y;
    for (let i = 0; i < 10; i++) {
        particles.push(new Particle(mouseHandler.x, mouseHandler.y, context, hue));
    }
} )

// function drawCircle(x, y){
//     context.fillStyle = 'blue';
//     context.beginPath();
//     context.arc(x, y, 50, 0, Math.PI * 2);
//     context.fill();
// }

// function initParticles() {
//     for (let i = 0; i < 100; i++) {
//         particles.push(new Particle(mouseHandler.x, mouseHandler.y, context));
//     }
// }
// initParticles();

function particlesHandler() {
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        //connecting particles if they are within a certain range of each other
        for (let j = i; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 20) {
                context.beginPath();
                context.strokeStyle = particles[i].colour;
                context.lineWidth = 0.2;
                context.moveTo(particles[i].x, particles[i].y);
                context.lineTo(particles[j].x, particles[j].y);
                context.stroke();
                context.closePath();
            }
        }
        //if particle shrinks below a certain size, remove it from the array
        if (particles[i].size <= 0.3) {
            particles.splice(i, 1);
            i--;
        }

    }
}

function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    // context.fillStyle = 'rgba(0,0,0,0.02)';
    // context.fillRect(0, 0, canvas.width, canvas.height);
    particlesHandler();
    hue++;
    requestAnimationFrame(animate);
}

animate();

document.querySelector("body").appendChild(canvas);