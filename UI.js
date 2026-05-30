export class UI {
    constructor(game) {
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = 'Rubik';
    }
    draw(context) {
        context.save();
        context.shadowColor = 'white';
        context.shadowBlur = 4;
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.fillStyle = this.game.fontColor;

       
        context.fillText('Score: ' + this.game.score, 20, 50);

        
        context.font = (this.fontSize * 0.65) + 'px ' + this.fontFamily;
        context.fillText('High Score: ' + this.game.highScore, 20, 85);

       
        context.font = (this.fontSize * 0.8) + 'px ' + this.fontFamily;
        context.fillText('Time: ' + (this.game.time * 0.001).toFixed(1) + 's', 20, 120);

        
        if (this.game.gameOver) {
            context.textAlign = 'center';
            context.font = this.fontSize * 2 + 'px ' + this.fontFamily;
            if (this.game.score >= this.game.winningScore) {
                context.fillText('Victory!', this.game.width * 0.5, this.game.height * 0.5 - 20);
                context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily;
                context.fillText('Outstanding run, traveler!', this.game.width * 0.5, this.game.height * 0.5 + 20);
            } else {
                context.fillText('Game Over', this.game.width * 0.5, this.game.height * 0.5 - 20);
                context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily;
                context.fillText('Better luck on your next trek!', this.game.width * 0.5, this.game.height * 0.5 + 20);
            }
        }
        context.restore();
    }
}