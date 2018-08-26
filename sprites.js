/*eslint-env browser*/
/* eslint-disable no-console */
/*jslint node: true */
'use strict';
class Sprite {
    constructor(context, x, y, color, drawer, keys, stateDims) {
        this.ctx = context;
        this.x = x;
        this.y = y;
        this.color = color;
        drawer.drawSprites.push(this);
        this.keys = keys;
        this.stateProperties = [];
        this.stateDims = stateDims;
        this.rewards = [];
        this.punishments = [];
        if(stateDims !== null) {
            this.NumActions = new ndarray(this.stateDims);
        }
        this.spriteAgent = null;
        this.resetPos = [];
    }
    
    GotoPos(gotoPos) {
        this.x = gotoPos[0];
        this.y = gotoPos[1];
    }
    
    NeedReset() { //checks if sprite needs to be reset, if it does then it resets it backs to its orginal position
        for(var i=0;i<this.resetPos.length;i++){
            this.ttt = this.resetPos[i][1];
            if(this.ttt()) {
                this.GotoPos(this.resetPos[i][0]);
                this.spriteAgent.iterations +=1;
            }
        }
    }
    
    draw(){}
    update() {}
    getState() {}
    doAction() {}
    
}

class CircleSprite extends Sprite{
    
    constructor(context, x, y, defaultRad, color, drawer, keys, stateDims) {
        super(context, x, y, color, drawer, keys, stateDims);
        this.radius = defaultRad;
    }
    
    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.stroke();
    }
}

class RectSprite extends Sprite{
    constructor(context, x, y, height, width, color, drawer, keys, stateDims) {
        super(context, x, y, color, drawer, keys, stateDims);
        this.width = width;
        this.height = height;   
    }
    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

class drawer {
    constructor() {
        this.drawSprites = [];
    }
    
    draw() {
        for(var o of this.drawSprites) {
            o.update();
            o.draw();
            if(o.spriteAgent !== null) {
                o.spriteAgent.makeMove();
                if(o.spriteAgent.training === true) {
                    o.spriteAgent.train();
                }
            }
            o.NeedReset();
        }
    }
}

function initControls(keysPressed) {
    window.addEventListener('keydown', function(e) {
        keysPressed[e.keyCode] = true;
    });
    window.addEventListener('keyup', function(e) {
        keysPressed[e.keyCode] = false;
    });    
}