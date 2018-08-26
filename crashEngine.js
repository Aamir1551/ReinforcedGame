/*eslint-env browser*/
/* eslint-disable no-console */
/*jslint node: true */
'use strict';
class crashEngine {
    
    checkCrashBetweenRectRect(obj1, obj2) {
        if(obj1.y + obj1.height < obj2.y || obj1.y > obj2.y + obj2.height || obj1.width + obj1.x < obj2.x || obj1.x > obj2.width + obj2.x) {return false}
        return true;
    }
    
    checkCrashBetweenRectCircle(obj1, obj2) {
        var circleDistancex = Math.abs(obj2.x - (obj1.x + obj1.width/2));
        var circleDistancey = Math.abs(obj2.y - (obj1.y + obj1.height/2));
        
        if(circleDistancex > obj1.width/2 + obj2.radius) {return false;}
        if(circleDistancey > obj1.height/2 + obj2.radius) {return false;}
        
        if(circleDistancex <= obj1.width/2) {return true}
        if(circleDistancey <= obj1.height/2) {return true}        
        
        var cornerDist = Math.pow(circleDistancex - obj1.width/2, 2) + Math.pow(circleDistancey - obj1.height/2, 2)
        return (cornerDist <= Math.pow(obj2.radius, 2))
    }
    
    checkCrashBetweenToucingEdgeForCircleSprite(obj1, width, height, boundary) {
        this.cond1 = obj1.x - boundary <= 0;
        this.cond2 = obj1.y - boundary <= 0;
        this.cond3 = obj1.x + boundary >= width;
        this.cond4 = obj1.y + boundary >= height;
        if(this.cond1 || this.cond2 || this.cond3 || this.cond4) {
            return true
        } else {
            return false
        }
        
    }
}