/*eslint-env browser*/
/* eslint-disable no-console */
/*jslint node: true */
'use strict';
//you cannot control agent using arrow keys as it wnt be able to correct its position
var txt;
var element;

function createGameArea(canvasWidth, canvasHeight) {
    this.canvas = document.createElement("canvas");
    this.canvas.width = canvasWidth;
    this.canvas.height = canvasHeight;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.context.fillStyle = "black";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.clear = function() {
        this.context.fillStyle = "black";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function startGame() {
    var canvasWidth = 480;
    var canvasHeight = 270;
    var gameArea = new createGameArea(canvasWidth, canvasHeight);
    var ctxg = gameArea.context;
    var mydrawer = new drawer();
    var keyspressed = {};
    
    var gameCrashEngine = new crashEngine();
    
    var myob1 = new obstacle(ctxg, 300, 0, 130, 30, "red", mydrawer, keyspressed, null);
    
    var mycell = new cell(ctxg, 30, 200, 20, "blue", mydrawer, keyspressed, [canvasWidth, canvasHeight]);
    
    var mycellAgent = new agent(mycell);
    
    var myob2 = new obstacle(ctxg, 120, canvasHeight - 130, 130, 30, "red", mydrawer, keyspressed, null);
    var mygoldBar = new goldBar(ctxg, 400, 120, 40, 40, "gold", mydrawer, keyspressed, null);    
    
    
    mycell.rewards.push({50: function dd() {return gameCrashEngine.checkCrashBetweenRectCircle(mygoldBar, mycell)}}) //agent recieves a reward of 50 if he touches the goldBar
    
    
    mycell.punishments.push({500: function dr() {return gameCrashEngine.checkCrashBetweenToucingEdgeForCircleSprite(mycell, canvasWidth, canvasHeight, mycell.boundary)}}) //agent recieves a reward of 50 if he touches the goldBar  //make this negatuve reward
    
    mycell.punishments.push({50: function dr() {return gameCrashEngine.checkCrashBetweenRectCircle(myob1, mycell)}})
    mycell.punishments.push({50: function dr() {return gameCrashEngine.checkCrashBetweenRectCircle(myob1, mycell)}})
    
    mycell.resetPos.push([[30,200], function dr() {return gameCrashEngine.checkCrashBetweenRectCircle(myob1, mycell)}])
    mycell.resetPos.push([[30,200], function dr() {return gameCrashEngine.checkCrashBetweenRectCircle(myob2, mycell)}])
    mycell.resetPos.push([[30,200], function dr() {return gameCrashEngine.checkCrashBetweenRectCircle(mygoldBar, mycell)}])
    
    mycell.resetPos.push([[30,200], function dr() {return gameCrashEngine.checkCrashBetweenToucingEdgeForCircleSprite(mycell, canvasWidth, canvasHeight, mycell.boundary)}])
    
    
    
    element = document.createElement("p");  //yesterday night code ============================================================
    txt = element.innerHTML = "coordinates";
    document.body.insertBefore(element, document.body.childNodes[0]); //===============================
    
    initControls(keyspressed);
    
    setInterval(gameLoop, 1, gameArea, [mydrawer]);
    
}

function updateFrame(LoopgameArea, drawers) {
    LoopgameArea.clear();
    for(var o of drawers) {
        o.draw();
    }
}

function gameLoop(LoopgameArea, drawers) {
    updateFrame(LoopgameArea, drawers);
}