export class Particle {
    constructor(mouseX, mouseY, context, hue) {
        this.context = context
        this.x = mouseX;
        this.y = mouseY;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.colour = 'hsl(' + hue + ', 100%, 50%)'
    }

    dispose() {
        this.x = null;
        this.y = null;
        this.size = null;
        this.speedX = null;
        this.speedY = null;
        this.colour = null;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.1;
    }

    draw() {
        this.context.fillStyle = this.colour;
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.context.fill();
    }
}

/*
 HSL Explained:
  Hue: degree on the colour wheel: 0-360 (0 = red, 120 = green, 240 = blue)
  Saturation: percentage value: 0% = grey, 100% = full colour
  Light: percentage value: 0% = white, 50% = full colour, 100% is black
 */