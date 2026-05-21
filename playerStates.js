const states = {
    SITTING: 0,
    RUNNING: 1,
    JUMPING: 2,
}

class State {
    constructor(state){
        this.state = state;
    }
}

export class Sitting extends State {
    constructor(player){
        super('SITTING');
        this.player = player;
    }
    enter(){
        this.player.frameY = 5;

    }
    handleInput(input){

    }
}