/*eslint-env browser*/
/* eslint-disable no-console */
/*jslint node: true */
'use strict';
class Sprite {
    constructor(x, y, color, stateDims) {
        this.x = x;
        this.y = y;
        this.color = color;

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
    
    draw(ctx){}
    update() {}
    getState() {}
    doAction() {}
}

class CircleSprite extends Sprite {
    
    constructor(x, y, defaultRad, color, stateDims) {
        super(x, y, color, stateDims);
        this.radius = defaultRad;
    }
    
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.stroke();
    }
}

class RectSprite extends Sprite {
    constructor(x, y, height, width, color, stateDims) {
        super(x, y, color, stateDims);
        this.width = width;
        this.height = height;   
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}