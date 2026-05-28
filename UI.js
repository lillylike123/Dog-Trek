export class UI{
    constructor(game){
        this.game = game;
        this.fontSize = 100;
        this.fontFamily = 'Helvetica';
    }
    draw(context){
        context.font = this.fontSize + 'px' + this.fontFamily;
        context.textAlign = 'left';
        context.fillStyle = this.game.fontColor;
        // score
        context.fillText('Score:' + this.game.score, 20, 50);

    }
}