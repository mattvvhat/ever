function animation (start, stop, step) {
  var self = this;

  self.begin = start;
  self.end   = stop;
  self.step  = step;

  self.callback = {};
}

animation.init = function () {
  var begin = this.callback.begin;
  var step  = this.callback.step;

  function tick (callback) {
    step.call(undefined, 1);
    setTimeout(tick, 333);
  }

  if (typeof begin === 'function')
    begin.call(undefined, 0);

  if (typeof step === 'function')
    setTimeout(tick, 0);
};

animation.stop = function () {

};



animation.prototype.begin = function (callback) {
  this.callback.begin = callback;
};

animation.prototype.end = function (callback) {
  this.callback.end = callback;
};

animation.prototype.step = function (callback) {
  this.callback.step = callback;
};
