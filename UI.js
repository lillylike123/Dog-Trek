export class UI {
    constructor(game) {
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = 'Rubik';
    }
    draw(context) {
        context.save();
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.textAlign = 'left';
        context.fillStyle = this.game.fontColor;
        
        
        context.fillText('Score: ' + this.game.score, 20, 50);
        
        
        let remainingTime = ((this.game.maxTime - this.game.time) / 1000).toFixed(1);
        context.fillText('Time: ' + (remainingTime > 0 ? remainingTime : 0) + 's', 20, 90);

        
        context.textAlign = 'right';
        context.fillText('Stage ' + this.game.currentLevel, this.game.width - 20, 50);

        
        if (this.game.gameOver) {
            context.textAlign = 'center';
            if (this.game.score >= this.game.winningScore) {
                context.font = '70px ' + this.fontFamily;
                context.fillText('You Win!', this.game.width * 0.5, this.game.height * 0.5);
            } else {
                context.font = '70px ' + this.fontFamily;
                context.fillText('Game Over!', this.game.width * 0.5, this.game.height * 0.5);
            }
        }
        context.restore();
    }
}