import { Player } from "./player.js";
import { InputHandler } from './input.js';
import { Background } from './background.js';
import { FlyingEnemy, ClimbingEnemy, GroundEnemy} from './enemies.js';
import { UI } from './UI.js';

window.addEventListener('load', function() {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 900;
    canvas.height = 500;
    
    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.groundMargin = 80;
            this.speed = 0; 
            this.maxSpeed = 6;
            this.player = new Player(this);
            this.background = new Background(this);
            this.input = new InputHandler(this);
            this.UI = new UI(this);
            this.enemies = [];
            this.particles = [];
            this.collisions = [];
            this.floatingMessages = [];
            this.maxParticles = 50;
            this.enemyTimer = 0;
            this.enemyInterval = 1000;
            this.debug = false;
            this.score = 0;
            this.winningScore = 30;
            this.gameOver = false;
            this.fontColor = 'black';
            this.time = 0;
            this.maxTime = 30000;

            
            this.sound_jump = new Audio('assets/jump.mp3');
            this.sound_destroy = new Audio('assets/destroy.mp3');
            this.sound_hurt = new Audio('assets/hurt.mp3');
            
            
            this.sound_jump.volume = 0.4;
            this.sound_destroy.volume = 0.5;
            this.sound_hurt.volume = 0.6;

            this.player.currentState.enter();
        }

        update(deltaTime) {
            this.time += deltaTime;
            if(this.time > this.maxTime) this.gameOver = true;
            this.background.update();
            this.player.update(this.input.keys, deltaTime);
            
            // Handle Enemies
            if (!this.gameOver) {
                if (this.enemyTimer > this.enemyInterval) {
                    this.addEnemy();
                    this.enemyTimer -= this.enemyInterval; 
                } else {
                    this.enemyTimer += deltaTime;
                }
            }

            this.enemies.forEach(enemy => {
                enemy.update(deltaTime);
            });

            // handle particles 
            this.particles.forEach((particle, index) => {
                particle.update();
            });
            if (this.particles.length > this.maxParticles) {
                this.particles.length = this.maxParticles;
            }

            //handle collisions
            this.collisions.forEach((collision, index) => {
                collision.update(deltaTime);
            });

            // handle messages
            this.floatingMessages.forEach(message => {
                message.update();
            });

            
            this.floatingMessages = this.floatingMessages.filter(message => !message.markedForDeletion);

            
            this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion); 
            
            
            this.collisions = this.collisions.filter(collision => !collision.markedForDeletion);        

            
            this.particles = this.particles.filter(particle => !particle.markedForDeletion);        
        }

        draw(context) {
            this.background.draw(context);
            this.player.draw(context);
            this.enemies.forEach(enemy => {
                enemy.draw(context);
            });
            this.particles.forEach(particle => {
                particle.draw(context);
            });
            
            this.collisions.forEach(collision => {
                collision.draw(context);
            });
            this.floatingMessages.forEach(message => {
                message.draw(context);
            });
            this.UI.draw(context);
        }

        addEnemy(){
            if (this.speed > 0 && Math.random() < 0.5) this.enemies.push(new GroundEnemy(this));
            else if (this.speed > 0) this.enemies.push(new ClimbingEnemy(this));
            this.enemies.push(new FlyingEnemy(this));
        }
    }

    const game = new Game(canvas.width, canvas.height);
    let lastTime = 0;

    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        if (!game.gameOver) requestAnimationFrame(animate);
    }
    
    requestAnimationFrame(animate);
});