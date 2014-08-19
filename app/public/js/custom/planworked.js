var getElapsedSeconds = (function () {
  var _startTime = + new Date();
  return function () {
    return (new Date() - _startTime) / 1000.;
  };
})();

var sinceLastCall = (function () {
  this.last = Date.now();
  this.since = 0;
  return function () {
    var now = Date.now();
    this.since  = now - last;
    this.last   = now;
    return this.since;;
  };
})();
