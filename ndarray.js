/*eslint-env browser*/
/* eslint-disable no-console */
/*jslint node: true */
'use strict';
class ndarray {
    
    constructor(ndarray_dims) {
        this.size = 1;
        this.dim = ndarray_dims;
        this.cache = [1];
        this.data = {};
        for(var i = 0;i<ndarray_dims.length;i++) {
            this.size *= (ndarray_dims[i] + 1);
            this.cache.push(this.cache[i] * (ndarray_dims[i] + 1))
        }
    }
    
    setAll(InitVal) {
        for(var i = 0;i<this.size;i++) {
            this.data[i] = InitVal;
        }
    }
    
    set(index, value) {
        this.data[this.determineIndex(index)] = value;
    }
    
    get(index) {
        return this.data[this.determineIndex(index)]
    }

    determineIndex(index) {
        var tempIndex = 0;
        for(var i = 0;i<index.length;i++) {
            tempIndex += index[i] * this.cache[i];
        }
        return (tempIndex)
    }

    forEach(f) {
      var temp = new ndarray(this.dim)
      for(var i = 0;i<this.size;i++) {
        temp.data[i] = f(this.data[i]);
        }
        return temp;
      }

    inverseIndex(index) { //takes in a number and gives an array
      var n = index+1;
      var temp = [];
      for(var i=this.cache.length-2;i>=0;i--){
        temp.push(0)
        while(n > this.cache[i]) {
          n -= this.cache[i];
          temp[temp.length - 1] += 1;
        }
      }
      return temp.reverse();
    }

    setEdges(v, width) {
        for(var i = 0;i<this.size;i++) {
          var tt = this.inverseIndex(i);
          if((Math.min.apply(this, tt) < width) || (Math.min.apply(this, this.dim.map((x, i) => x - tt[i])) < width)) {
            this.data[i] = v;
          }
        }
    }
    
    setPortion2d(xcord, ycord, width, height, v) {
      for(var i=xcord;i<xcord+width;i++) {
        for(var j=ycord;j<ycord+height;j++){
          this.set([i,j],v)
        }
      }
    }

}