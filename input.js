export class InputHandler {
    constructor(game){
        this.game = game;
        this.keys = [];
        window.addEventListener('keydown', e => {
           
            if (!this.game.gameOver && this.game.music.paused && !this.game.isMuted) {
                this.game.music.play().catch(err => console.log("Audio play deferred: ", err));
            }
            
            
            if (e.key === 'm' || e.key === 'M') {
                this.game.isMuted = !this.game.isMuted;
                this.game.music.muted = this.game.isMuted;
                this.game.sound_jump.muted = this.game.isMuted;
                this.game.sound_destroy.muted = this.game.isMuted;
                this.game.sound_hurt.muted = this.game.isMuted;
            }

            if ((   e.key === 'ArrowDown'|| 
                    e.key === 'ArrowUp' || 
                    e.key === 'ArrowLeft' || 
                    e.key === 'ArrowRight' || 
                    e.key === 'Enter'  
                )  && this.keys.indexOf(e.key) === -1){
                this.keys.push(e.key);
            } else if (e.key === 'd' || e.key === 'D') this.game.debug = !this.game.debug;
        });

        window.addEventListener('keyup', e => {
            if  (   e.key === 'ArrowDown'|| 
                    e.key === 'ArrowUp' || 
                    e.key === 'ArrowLeft' || 
                    e.key === 'ArrowRight' || 
                    e.key === 'Enter'){
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
        });
    }
}