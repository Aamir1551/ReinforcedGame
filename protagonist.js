/*eslint-env browser*/
/* eslint-disable no-console */
/*jslint node: true */
'use strict';

class Cell extends CircleSprite { 

    constructor(x, y, defaultRad, color, stateDims) {
        super(x, y, defaultRad, color, stateDims);
        
        this.NumActions.setAll(4); //number of actions that can be done if cell is inside the grid
        this.boundary = 8;
        this.NumActions.setEdges(3, this.boundary); //number of actions that can be done if cell is on the edge
        this.dirChange = 2;
        
        this.NumActions.setPortion2d(0,0,this.boundary,this.boundary,2); //top right corner
        this.NumActions.setPortion2d(stateDims[0] - this.boundary, 0, this.boundary, this.boundary, 2); //top left corner
        this.NumActions.setPortion2d(0,stateDims[1] - this.boundary,this.boundary,this.boundary,2); //bottom right corner
        this.NumActions.setPortion2d(stateDims[0] - this.boundary, stateDims[1] - this.boundary,this.boundary,this.boundary,2); //bottom left corner
        
        this.a0 = function() {this.x +=3};
        this.a1 = function() {this.x -=3};
        this.a2 = function() {this.y +=3};
        this.a3 = function() {this.y -=3};
    }
    
    update() {
        if(this.invalidState()){
            window.alert("reason");
        }
    };
    
    getState() {
        this.stateProperties = [];
        this.stateProperties.push(this.x);
        this.stateProperties.push(this.y);
        return this.stateProperties;
    }
    
    doAction(action) {        
        this.cond1 = this.x - this.boundary <= 0;
        this.cond2 = this.y - this.boundary <= 0;
        this.cond3 = this.x + this.boundary >= this.stateDims[0];
        this.cond4 = this.y + this.boundary >= this.stateDims[1];
        this.h;
        
        if(this.cond1 && this.cond2) {
            this.h = {0:this.a0, 1:this.a2}[action];      
        } else if(this.cond1 && this.cond4) {
            this.h = {0:this.a0, 1:this.a3}[action];
        } else if(this.cond3 && this.con2) {
            this.h = {0:this.a1, 1:this.a2}[action];
        } else if(this.cond3 && this.cond4) {
            this.h = {0:this.a1, 1:this.a3}[action];
        } else if(this.cond1) {
            this.h = {0:this.a0, 1:this.a2, 2:this.a3}[action];
        } else if(this.cond2) {
            this.h = {0:this.a0, 1:this.a1, 2:this.a2}[action];
        } else if(this.cond3){
            this.h = {0:this.a1, 1:this.a2, 2:this.a3}[action];
        } else if(this.cond4){
            this.h = {0:this.a0, 1:this.a1, 2:this.a3}[action];
        } else {
            this.h = {0:this.a0, 1:this.a1, 2:this.a2, 3:this.a3}[action];
        }
        this.h();
        
        if(this.invalidState()) {
            window.alert("what????? this shouldnt happen")
        }
    }
    
    invalidState() {
        return this.x<=0 || this.x>=this.stateDims[0] || this.y<=0 || this.y>=this.stateDims[1];
    }
}