/*eslint-env browser*/
/* eslint-disable no-console */
/*jslint node: true */
'use strict';

class GameArea {
    constructor (canvasWidth, canvasHeight) {
        this.canvas = document.createElement("canvas");
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        this.context = this.canvas.getContext("2d");

        document.body.insertBefore(this.canvas, document.body.childNodes[0]);

        this.clear();
    }

    clear() {
        this.context.fillStyle = "black";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function startGame() {
    const canvasWidth = 480;
    const canvasHeight = 270;

    var gameArea = new GameArea(canvasWidth, canvasHeight);
    var sprites = [];
    
    var gameCrashEngine = new crashEngine();
    
    var myob1 = new RectSprite(300, 0, 130, 30, "red", null);
    var mycell = new Cell(30, 200, 20, "blue", [canvasWidth, canvasHeight]);
    var myob2 = new RectSprite(120, canvasHeight - 130, 130, 30, "red", null);
    var mygoldBar = new RectSprite(400, 120, 40, 40, "gold", null);    

    sprites.push(myob1, myob2, mycell, mygoldBar);
    
    var mycellAgent = new agent(mycell);

    mycell.rewards.push({50: function dd() {return gameCrashEngine.checkCrashBetweenRectCircle(mygoldBar, mycell)}}) //agent recieves a reward of 50 if he touches the goldBar
    mycell.punishments.push({50: function dr() {return gameCrashEngine.checkCrashBetweenRectCircle(myob1, mycell)}})
    mycell.punishments.push({50: function dr() {return gameCrashEngine.checkCrashBetweenRectCircle(myob2, mycell)}})
    mycell.resetPos.push([[30,200], function dr() {return gameCrashEngine.checkCrashBetweenRectCircle(myob1, mycell)}])
    mycell.resetPos.push([[30,200], function dr() {return gameCrashEngine.checkCrashBetweenRectCircle(myob2, mycell)}])
    mycell.resetPos.push([[30,200], function dr() {return gameCrashEngine.checkCrashBetweenRectCircle(mygoldBar, mycell)}])
    mycell.resetPos.push([[30,200], function dr() {return gameCrashEngine.checkCrashBetweenToucingEdgeForCircleSprite(mycell, canvasWidth, canvasHeight, mycell.boundary)}])

    var gameLoop = function () {
        gameArea.clear();

        for (let sprite of sprites) {
            sprite.update();
            sprite.draw(gameArea.context);
            if(sprite.spriteAgent !== null) {
                sprite.spriteAgent.makeMove();
                if(sprite.spriteAgent.training === true) {
                    sprite.spriteAgent.train();
                }
            }
            sprite.NeedReset();
        }
    };
    
    setInterval(gameLoop, 1);
}