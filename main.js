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

            
            this.isMuted = false;
            this.music = new Audio('assets/background_music.mp3'); 
            this.music.loop = true;
            this.sound_jump = new Audio('assets/jump.mp3');
            this.sound_destroy = new Audio('assets/destroy.mp3');
            this.sound_hurt = new Audio('assets/hurt.mp3');
            this.music.loop = true;
            
            this.shakeTimer = 0;
            this.highScore = localStorage.getItem('dogTrekHighScore') || 0;
        }

        update(deltaTime) {
            this.time += deltaTime;
            if (this.time > this.maxTime) {
                this.gameOver = true;
                if (this.score > this.highScore) {
                    this.highScore = this.score;
                    localStorage.setItem('dogTrekHighScore', this.highScore);
                }
            }

            
            if (this.shakeTimer > 0) this.shakeTimer -= deltaTime;

            this.background.update();
            this.player.update(this.input.keys, deltaTime);

            // Handle enemies
            if (this.enemyTimer > this.enemyInterval) {
                this.addEnemy();
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime;
            }

            this.enemies.forEach(enemy => {
                enemy.update(deltaTime);
            });
            this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);

            // handle floating messages
            this.floatingMessages.forEach(message => {
                message.update();
            });
            this.floatingMessages = this.floatingMessages.filter(message => !message.markedForDeletion);

            // handle particles
            this.particles.forEach(particle => {
                particle.update();
            });
            if (this.particles.length > this.maxParticles) {
                this.particles.length = this.maxParticles;
            }
            this.particles = this.particles.filter(particle => !particle.markedForDeletion);

            // handle collisions animations
            this.collisions.forEach(collision => {
                collision.update(deltaTime);
            });
            this.collisions = this.collisions.filter(collision => !collision.markedForDeletion);        
        }

        draw(context) {
            context.save(); 

            
            if (this.shakeTimer > 0) {
                const dx = (Math.random() - 0.5) * 8; 
                const dy = (Math.random() - 0.5) * 8; 
                context.translate(dx, dy);
            }

            
            this.background.draw(context);
            this.player.draw(context);
    
            context.restore(); 

            
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
    animate(0);
});