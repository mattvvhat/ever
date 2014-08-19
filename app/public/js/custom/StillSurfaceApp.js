//    ___ app
//    ____________________________________________________________________
//    ____________________________________________________________________
//    ____________________________________________________________________
//    ____________________________________________________________________
//    ____________________________________________________________________
//    ____________________________________________________________________
//    ____________________________________________________________________

/** StillSufraceApp **/

// Inherit loop ability
StillSurfaceApp.prototype.loop = App.prototype.loop;

function StillSurfaceApp (el) {
  el = el || '';
  this.container = typeof el === 'string' ? document.getElementById(el) : el;
  App.call(this);
}

// Init ___ App
StillSurfaceApp.prototype.init = function () {
  var self = this;

  self.app.width      = 400;
  self.app.height     = 300;
  self.app.view_angle = 15;
  self.app.aspect     = self.app.width/self.app.height;
  self.app.near       = 0.1;
  self.app.far        = 10000;
  self.app.iterations = 0;
  self.app.time       = 0;

  this.scene    = new THREE.Scene();
  this.renderer = !!window.WebGLRenderingContext ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer();
  this.camera = new THREE.PerspectiveCamera(
    this.app.view_angle,
    this.app.aspect,
    this.app.near,
    this.app.far
  );

  // Camera Setup
  this.camera.up = new THREE.Vector3(0, 1, 0);
  this.camera.position.x = 0;
  this.camera.position.y = 9;
  this.camera.position.z = 0;

  this.pointLight   = new THREE.PointLight(0x999999);
  this.pointLight.position.x = 0;
  this.pointLight.position.y = 05;
  this.pointLight.position.z = 15;
  this.ambientLight = new THREE.AmbientLight(0x996644);

  this.renderer.setSize(this.app.width, this.app.height);
  this.renderer.setClearColor(new THREE.Color(0xBBBBFF));

  this.functional = new Functional(function (x, y, t) {
    var d = Math.sqrt(x*x + 3*y*y);
    return Math.cos(d) + 1/(2+Math.cos(x));
  });

  var material = new THREE.MeshLambertMaterial({ color : 0x44FFFF, wireframe: false });

  this.plane = new THREE.Mesh( this.functional.geometry, material );

  this.scene.add(this.plane);
  this.scene.add(this.geometry);
  this.scene.add(this.camera);
  this.scene.add(this.pointLight);
  this.scene.add(this.ambientLight);

  this.container.appendChild(this.renderer.domElement);
};

// Update ___ App
StillSurfaceApp.prototype.update = function () {
  this.app.time += 0.00075;
  t = 10 * this.app.time;
  this.camera.position.x = 19 * Math.cos(3*t);
  this.camera.position.y = 19 * Math.sin(3*t);
  this.camera.position.z = 10;
  this.camera.up = new THREE.Vector3(0, 0, 1);
  this.camera.lookAt(new THREE.Vector3(0, 0, 0));
  this.functional.update();
};

// Draw cube to scene
StillSurfaceApp.prototype.draw = function () {
  this.renderer.render(this.scene, this.camera);
};

// !!!
StillSurfaceApp.prototype.set = function (what, val) {
  if (what in this.params) {
    this.params[what] = val;
  }
};
