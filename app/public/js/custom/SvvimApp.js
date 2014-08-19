
/** SVVIM APP **/

SvvimApp.prototype.loop = App.prototype.loop;

function SvvimApp (el) {
  el = el || '';
  this.container = typeof el === 'string' ? document.getElementById(el) : el;
  App.call(this);
}

// Init Obj App
SvvimApp.prototype.init = function () {
  this.ambientColor = [ 0xCF, 0xCF, 0xCF ];
  this.pointColor   = [ 0x66, 0x66, 0x66 ];
  var self = this;
  self.app.width      = 1400;
  self.app.height     = 0800;
  self.app.view_angle = 15;
  self.app.aspect     = self.app.width/self.app.height;
  self.app.near       = 0.1;
  self.app.far        = 10000;
  self.app.iterations = 0;
  self.app.time       = 0;

    this.params   = { y : 0, speed : 10.0 };
  this.scene    = new THREE.Scene();
  this.renderer = new THREE.WebGLRenderer({ antialias : true });

  if (!this.renderer) {
    this.renderer = new THREE.CanvasRenderer();
  }

  this.camera = new THREE.PerspectiveCamera(
    this.app.view_angle,
    this.app.aspect,
    this.app.near,
    this.app.far
  );

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

SvvimApp.prototype.addCouch = function () {
  console.log('Adding a couch');

  var self = this;
  var couch = new Couch();

  couch.loaded(function () {
    if (!couch.obj)
      return;

    self.couches.push(couch);
    var x = self.scene.add(self.couches[self.couches.length-1].obj);
  });
};

SvvimApp.prototype.removeCouch = function () {
  var self = this;
  var obj = self.couches.shift();
  self.scene.remove(obj.obj);
};

// Update Obj App
SvvimApp.prototype.update = function () {
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
    var pos = {
      x : 25 * Math.cos(3 * t),
      y : 15 * (1 - this.params.y) + 1,
      z : 25 * Math.sin(3 * t)
    };

    pos = { x : -3.0, y : 0.0, z : 20.0 };
    this.camera.position.set(pos.x, pos.y, pos.z);
    this.camera.up = new THREE.Vector3(0, 1, 0);
    this.camera.lookAt(new THREE.Vector3(0,0,0));
  }
  if (this.pointLight) {
    this.pointLight.position.x = 100;
    this.pointLight.position.y = 0;
    this.pointLight.position.z = 20;
  }
};

// Draw cube to scene
SvvimApp.prototype.draw = function () {
  this.renderer.render(this.scene, this.camera);
  // window.open(this.renderer.domElement.toDataURL(), 'what');
};

//
SvvimApp.prototype.set = function (what, val) {
  if (what in this.params) {
    this.params[what] = val;
  }
};
