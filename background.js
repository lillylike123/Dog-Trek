class Layer {
    constructor(game, width, height, speedModifier, image) {
        this.game = game;
        this.width = width;
        this.height = height;
        this.speedModifier = speedModifier;
        this.image = image;
        this.x = 0;
        this.y = 0;
    }
    update() {
        this.x -= this.game.speed * this.speedModifier;
        if (this.x <= -this.width) {
            this.x += this.width; 
        }
    }
    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
}

export class Background {
    constructor(game) {
        this.game = game;
        this.width = 1667;
        this.height = 500;
        this.layer5image = document.getElementById('layer5');
        this.layer4image = document.getElementById('layer4');
        this.layer3image = document.getElementById('layer3');
        this.layer2image = document.getElementById('layer2');
        this.layer1image = document.getElementById('layer1');
        this.layer1 = new Layer(this.game, this.width, this.height, 0, this.layer1image);
        this.layer2 = new Layer(this.game, this.width, this.height, 0.2, this.layer2image);
        this.layer3 = new Layer(this.game, this.width, this.height, 0.4, this.layer3image);
        this.layer4 = new Layer(this.game, this.width, this.height, 0.8, this.layer4image);
        this.layer5 = new Layer(this.game, this.width, this.height, 1, this.layer5image);
    }
    update() {
        this.layer1.update();
        this.layer2.update();
        this.layer3.update();
        this.layer4.update();
        this.layer5.update();
    }
    draw(context) {
        context.save();

        if (this.game.currentLevel === 2) {
            context.filter = "hue-rotate(130deg) brightness(60%)"; 
        } else if (this.game.currentLevel === 3) {
            context.filter = "contrast(140%) saturate(180%) invert(10%)"; 
        } else {
            context.filter = "none"; 
        }

        this.layer1.draw(context);
        this.layer2.draw(context);
        this.layer3.draw(context);
        this.layer4.draw(context);
        this.layer5.draw(context);

        context.restore(); 
    }
}