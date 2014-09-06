/* jshint unused: false */

/**
 * App.js
 * A class that automatically handles looping, and creates default functions
 * for `update`, `draw`, `loop`, and `stop`. `loop` and `stop` should not be
 * overwritten, the should be used as-is.
 */
function App () {
  'use strict';

  var _running = true;
  var _error_callback = function () {};
  var self = this;

  // Public
  this.app = {};

  this.stop = _stop;
  this.loop = function () {
    _running = true;
    requestAnimationFrame(_loop);
  };

  this.init   = this.init   ? this.init   : function () {};

  this.init();

  /**
   * Update App Prior to Rendering
   * This method updates the app before the draw step.
   * @note This method is automatically called during a `loop` cycle.
   */
  function _update () { }

  /**
   * Render App to DOM
   * This method draws the app to the DOM, after the update step.
   * @note This method is automatically called during a `loop` cycle.
   */
  function _draw () { }

  /**
   * Initiate a Loop
   * This method begins the app's loop cycle.
   * @note This method calls `update` and `draw` until `stop` is called.
   */
  function _loop () {
    if (_running) {
      requestAnimationFrame(_loop);
    }

    self.update();
    self.draw();
  }

  /**
   * Stop the Loop Cycle
   * This method stops the app from looping.
   */
  function _stop () {
    _running = false;
  }

  /**
   * Event to fire on error
   * This method triggers a callback
   * @param {function} callback a callback function to call when an error
   * occurs in the update-draw loop.
   */
  function _error (callback) {
    if (typeof callback === 'function') {
      _error_callback = callback;
    }
  }
}
;/* global THREE, App */

GlslApp.prototype = new App();

/**
 * [GlslApp description]
 * @param {[type]} el [description]
 */
function GlslApp (el) {
  'use strict';
  el = el || '';
  this.container = typeof el === 'string' ? document.getElementById(el) : el;
  App.call(this);
}

/**
 * [init description]
 * @return {[type]} [description]
 */
GlslApp.prototype.init = function () {
  'use strict';
  var self = this;

  self.ambientColor = [ 0xCF, 0xCF, 0xCF ];
  self.pointColor   = [ 0x66, 0x66, 0x66 ];

  self.app.view_angle = 15;
  self.app.aspect     = window.innerWidth/window.innerHeight;
  self.app.near       = 0.1;
  self.app.far        = 10000;
  self.app.iterations = 0;
  self.app.time       = 0;

  self.scene    = new THREE.Scene();
  self.renderer = new THREE.WebGLRenderer({ antialias : true });

  self.camera = new THREE.PerspectiveCamera(
    this.app.view_angle,
    this.app.aspect,
    this.app.near,
    this.app.far
  );

  self.lights = {
    ambient : new THREE.AmbientLight( 0xCCCCCC ),
    point   : new THREE.PointLight(0xFF0000, 1, 100),
    diffuse : new THREE.DirectionalLight(0xCCCCCC)
  };

  self.lights.point.position.set(6, 0, 0);
  // self.lights.point.lookAt(0, 0, 0);
  self.lights.diffuse.position.set( 1, 0, 0 );

  self.camera.position.x = 0;
  self.camera.position.y = 0;
  self.camera.position.z = 10;

  var cube = new THREE.BoxGeometry(3, 1, 1);
  var mat  = new THREE.MeshPhongMaterial({
    ambient   : 0xFFFFFF,
    color     : 0xFFFFFF,
    specular  : 0xFFFFFF,
    shininess : 30,
    shading   : THREE.FlatShading
  });

  self.mesh = new THREE.Mesh(cube, mat);
  self.mesh.position.set(0, 0, 0);

  self.scene.add(self.mesh);
  self.scene.add(self.camera);
  self.scene.add(self.lights.ambient);
  self.scene.add(self.lights.point);
  self.scene.add(self.lights.diffuse);

  self.renderer.setClearColor(0x00FFFF, 1);

  this.resize = function () {
    self.renderer.setSize(window.innerWidth, window.innerHeight);
  };

  this.resize();

  window.addEventListener('resize', function () {
    self.resize();
  });
};

/**
 * [update description]
 * @return {[type]} [description]
 */
GlslApp.prototype.update = function () {
  'use strict';
  var self = this;
  self.camera.position = self.camera.position;
  self.camera.lookAt(new THREE.Vector3(0, 0, 0));
  self.mesh.rotation.x += +0.01;
  self.mesh.rotation.y += -0.02;

  var t = +new Date()/1000;  
  self.lights.point.position.set(10*Math.cos(t), 10*Math.sin(t), 0);
};

/**
 * [draw description]
 * @return {[type]} [description]
 */
GlslApp.prototype.draw = function () {
  'use strict';
  this.renderer.render(this.scene, this.camera);
};

/**
 * [set description]
 * @param {[type]} what [description]
 * @param {[type]} val  [description]
 */
GlslApp.prototype.set = function (what, val) {
  'use strict';
  if (what in this.params) {
    this.params[what] = val;
  }
};

/**
 * [shift description]
 * @return {[type]} [description]
 */
GlslApp.prototype.shift = function () {
};
