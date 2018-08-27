"use strict";

class agent {
    constructor(agentSprite) {
        this.explorationRate = 0.05;
        this.learningRate = 0.9;
        this.beta = 0.99; //decay term
        this.agentSprite = agentSprite;
        this.currentState = null; //not sure if can be null
        this.action = 0;
        this.iterations = 0; //new code
        this.training = true;
        this.resetPos = agentSprite.resetPos;
        agentSprite.spriteAgent = this;
        this.rewards = agentSprite.rewards; //has type [{Integer: function} ] the function is boolean representing wather the action was done and integer is reward recieved
        this.punishments = agentSprite.punishments;

        //this line of code creates a dictionary for each entry in the qtable. The dictionary maps each action to its expected return.
        this.qtable = this.agentSprite.NumActions.forEach(
            function q(p) {
                return (new Array(p).fill(10, 0, p)).reduce(
                    function (result, item, index, array) {
                        result[index] = item; return result;
                    }, {}
                );
            }
        );
    }

    calculateValue(scale, sensors) {
        var valueRecieved = 0;
        for (var i = 0; i < sensors.length; i++) {
            this.ttt = Object.values(sensors[i])[0];
            if (this.ttt()) {
                valueRecieved += Object.keys(sensors[i])[0] * scale;
            }
        }
        return valueRecieved;
    }

    calculatePunishments() {
        return this.calculateValue(-1, this.punishments);
    }

    calculateRewards() {
        return this.calculateValue(1, this.rewards);
    }

    pickAction() {
        var stateActions = this.qtable.get(this.currentState);
        if (Math.random() < this.explorationRate) { 
            return Math.floor(Math.random() * (1 + Math.max.apply(this, Object.keys(stateActions))));
        }
        else {
            return Object.values(stateActions).indexOf(Math.max.apply(this, Object.values(stateActions)));
        }
    }

    updateQtable() {
        var nxtState = this.agentSprite.getState();
        var rewardRecieved = this.calculateRewards();
        var punishmentsRecieved = this.calculatePunishments();
        var prevActions = this.qtable.get(this.currentState);
        var netReward = rewardRecieved + punishmentsRecieved;
        var delta = (netReward + this.beta * Math.max.apply(this, Object.values(this.qtable.get(nxtState)))) * this.learningRate;
        prevActions[this.action] = prevActions[this.action] * (1 - this.learningRate) + delta;
        this.qtable.set(this.currentState, prevActions);
    }

    makeMove() {
        this.currentState = this.agentSprite.getState();
        this.action = this.pickAction();
        this.agentSprite.doAction(this.action);
    }

    train() {
        this.updateQtable();
    }
}
