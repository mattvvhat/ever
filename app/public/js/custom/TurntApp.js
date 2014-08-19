
/** SVVIM APP **/

TurntApp.prototype.loop = App.prototype.loop;

function TurntApp (el) {
  el = el || '';
  this.container = typeof el === 'string' ? document.getElementById(el) : el;
  App.call(this);
}

// Init Obj App
TurntApp.prototype.init = function () {
  var self = this;

  self.ambientColor = [ 0xCF, 0xCF, 0xCF ];
  self.pointColor   = [ 0x66, 0x66, 0x66 ];

  self.app.width      = 1400;
  self.app.height     = 0800;
  self.app.view_angle = 15;
  self.app.aspect     = self.app.width/self.app.height;
  self.app.near       = 0.1;
  self.app.far        = 10000;
  self.app.iterations = 0;
  self.app.time       = 0;


  self.params   = { y : 0, speed : 10.0 };
  self.scene    = new THREE.Scene();
  self.renderer = new THREE.WebGLRenderer({ antialias : true });

  if (!this.renderer) {
    this.renderer = new THREE.CanvasRenderer();
  }

  self.camera = {};
  self.camera.persp = new THREE.PerspectiveCamera(
    this.app.view_angle,
    this.app.aspect,
    this.app.near,
    this.app.far
  );

  self.camera.eye      = new THREE.Vector3(0, 0, 0);
  self.camera.dest     = new THREE.Vector3(0, 0, 3);
  self.camera.position = new THREE.Vector3(0, 0, 0);

  var manager = new THREE.LoadingManager();
  manager.onProgress = function () { };

  var loader = new THREE.OBJLoader(manager);
  loader.load('public/obj/Couch.obj', function (object) {
    self.splash = object;
    self.splash.position.y = 0;
    // self.scene.add(self.splash);
  });

  this.camera.position.y = 0;
  this.camera.position.z = 20;

  this.renderer.setSize(this.app.width, this.app.height);


  this.couches = new Array();
  this.couches.push(new Couch());



  this.pointLight   = new THREE.PointLight(0xFF6644);
  this.ambientLight = new THREE.AmbientLight(0xBBBBFF);
  this.scene.add(this.camera);
  this.scene.add(this.pointLight);
  this.scene.add(this.ambientLight);

  var scene = this.scene;

  var COUCH_TIME = 350;

  setInterval(function () {
    self.addCouch();
  }, COUCH_TIME);

  setTimeout(function () {
    setInterval(function () {
      self.removeCouch();
    }, COUCH_TIME);
  },13000);


  this.renderer.setClearColor(new THREE.Color(0xFFFFFF));
};

TurntApp.prototype.addCouch = function () {

  var self = this;
  var couch = new Couch();

  couch.loaded(function () {
    if (!couch.obj)
      return;

    self.couches.push(couch);
    var x = self.scene.add(self.couches[self.couches.length-1].obj);
  });
};

TurntApp.prototype.removeCouch = function () {
  var self = this;
  var obj = self.couches.shift();
  self.scene.remove(obj.obj);
};

// Update Obj App
TurntApp.prototype.update = function () {
  var self = this;

  for (var i=0; i < self.couches.length; i++) {
    self.couches[i].update();
  }

  this.app.time += .00005;
  // this.app.time = 0;
  this.pointLight.color.r   = this.pointColor[0]/0xFF;
  this.pointLight.color.g   = this.pointColor[1]/0xFF;
  this.pointLight.color.b   = this.pointColor[2]/0xFF;
  this.ambientLight.color.r = this.ambientColor[0]/0xFF;
  this.ambientLight.color.g = this.ambientColor[1]/0xFF;
  this.ambientLight.color.b = this.ambientColor[2]/0xFF;

  if (this.splash) {
    var t = this.params.speed * this.app.time;
    var pos = { x : 0.0, y : 0.0, z : 20.0 };
    this.camera.persp.position.set(0, 0, 0);
    this.camera.persp.up = new THREE.Vector3(0, 1, 0);
    this.camera.persp.lookAt(self.camera.dest);
  }

  if (this.pointLight) {
    this.pointLight.position.x = 100;
    this.pointLight.position.y = 0;
    this.pointLight.position.z = 20;
  }
};

// Draw cube to scene
TurntApp.prototype.draw = function () {
  this.renderer.render(this.scene, this.camera.persp);
  // window.open(this.renderer.domElement.toDataURL(), 'what');
};

//
TurntApp.prototype.set = function (what, val) {
  if (what in this.params) {
    this.params[what] = val;
  }
};

TurntApp.prototype.shift = function () {

};
