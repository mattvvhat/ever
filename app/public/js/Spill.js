/**
 *
 *
 *
 */

function Spill (position, color) {
  var self = this;

  // Related to the Object
  self.obj_file  = 'public/obj/fluid_spill.obj';
  self.obj       = undefined;
  self.is_loaded = false;

  var x = -10.0;
  var y = Math.random() * 7.0 - 3.5;
  var z = 30 + Math.random() * 2.0 - 1.0;

  var xr = Math.random() * 1.0 - 0.5;
  var yr = Math.random() * 1.0 - 0.5;
  var zr = Math.random() * 1.0 - 0.5;

  self.position     = { x : x, y : y, z : z };
  self.velocity     = { x : 4.0, y : 0.0, z : 0.0 };
  self.acceleration = { x : 0.0, y : 0.0, z : 0.0 };

  self.rotation     = { x : 0.0, y : 0.0, z : 0.0 };
  self.rotation_vel = { x : xr, y : yr, z : zr };

  self.time_step    = 0.005 * Math.random() + 0.005;

  self.color    = [ 0, 0, 0 ];

  self.init();

  // Callback functions
  self.success = undefined;
  self.failure = undefined;

  self.finished_loading = function () {
    if (typeof self.success === 'function')
      self.success.apply(self)
    self.is_loaded = true;
  };

  setTimeout(function () {
    self.load(self.obj_file);
  }, 1000);

}

/**
 *
 *
 *
 */

Spill.prototype.init = function () {
  self.manager = new THREE.LoadingManager();
  self.manager.onProgress = function () { };
  self.loader  = new THREE.OBJLoader(manager);
};

/**
 *
 *
 *
 */

Spill.prototype.load = function (file_name) {
  var self = this;
  loader.load(self.obj_file, function (object) {
    self.obj = object;
    self.obj.position.x = self.position.x;
    self.obj.position.y = self.position.y;
    self.obj.position.z = self.position.z;
    self.finished_loading();
  });
};

/**
 *
 *
 *
 */

Spill.prototype.update = function () {
  var self = this;

  var t = self.time_step;

  self.velocity.x += t * self.acceleration.x;
  self.velocity.y += t * self.acceleration.y;
  self.velocity.z += t * self.acceleration.z;

  self.position.x += t * self.velocity.x;
  self.position.y += t * self.velocity.y;
  self.position.z += t * self.velocity.z;

  self.rotation.x += t * self.rotation_vel.x;
  self.rotation.y += t * self.rotation_vel.y;
  self.rotation.z += t * self.rotation_vel.z;

  self.obj.position   = self.position;
  self.obj.rotation.x = self.rotation.x;
  self.obj.rotation.y = self.rotation.y;
  self.obj.rotation.z = self.rotation.z;
};

/**
 * Draw a Spill
 * Draws a Spill to a THREE.js scene. This may be unnecessary.
 * @return {undefined} undefined
 */

Spill.prototype.draw = function () {
};

Spill.prototype.loaded = function (success) {
  this.success = success;
};
