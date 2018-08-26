/*eslint-env browser*/
/* eslint-disable no-console */
/*jslint node: true */
'use strict';

class obstacle extends RectSprite{
    constructor(context, x, y, height, width, color, drawer, keys, stateDims) {
        super(context, x, y, height, width, color, drawer, keys, stateDims);
    }
}

class goldBar extends RectSprite{
    constructor(context, x, y, height, width, color, drawer, keys, stateDims) {
         super(context, x, y, height, width, color, drawer, keys, stateDims);   
    }
}