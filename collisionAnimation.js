export class CollisionsAnimation {
    constructor(game, x, y){
        this.game = game;
        this.image = document.getElementById('collisionAnimation');
        this.spriteWidth = 100;
        this.spriteHeight = 90;
        this.sizeModifier = Math.random() + 0.5;
        this.width = this.spriteWidth * this.sizeModifier;
        this.height = this.spriteHeight * this.sizeModifier;
        this.x = x - this.width * 0.5;
        this.y = y - this.width * 0.5;
        this.frame = 0;
        this.mazFrame = 4;
        this.markedForDeletion = false;
    }
    draw(context){
        context.drawImage(this.image, this.frameX * this.spriteWidth, 0, 
        this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);

    }
    update(){
        this.x -= this.game.speed;
    }
}