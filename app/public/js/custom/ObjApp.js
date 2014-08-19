//    Obj app
//    +------+       +------+       +------+       +------+       +------+
//    |`.    |`.     |\     |\      |      |      /|     /|     .'|    .'|
//    |  `+--+---+   | +----+-+     +------+     +-+----+ |   +---+--+'  |
//    |   |  |   |   | |    | |     |      |     | |    | |   |   |  |   |
//    +---+--+   |   +-+----+ |     +------+     | +----+-+   |   +--+---+
//     `. |   `. |    \|     \|     |      |     |/     |/    | .'   | .'
//       `+------+     +------+     +------+     +------+     +------+'

/** CUBE APP **/
ObjApp.prototype.loop = App.prototype.loop;

function ObjApp (el) {
  el = el || '';
  this.container = typeof el === 'string' ? document.getElementById(el) : el;
  App.call(this);
}

// Init Obj App
ObjApp.prototype.init = function () {
  this.ambientColor = [ 0xBB, 0xBB, 0xFF ];
  this.pointColor   = [ 0xFF, 0x66, 0x44 ];
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
  loader.load('public/obj/fluid_spill.obj', function (object) {
    self.splash = object;
    self.splash.position.y = 0;
    self.scene.add(self.splash);
  });

  this.camera.position.y = 0;
  this.camera.position.z = 20;

  this.renderer.setSize(this.app.width, this.app.height);

  this.pointLight   = new THREE.PointLight(0xFF6644);
  this.ambientLight = new THREE.AmbientLight(0xBBBBFF);
  this.scene.add(this.camera);
  this.scene.add(this.pointLight);
  this.scene.add(this.ambientLight);

  this.renderer.setClearColor(new THREE.Color(0xBBBBFF));
};

// Update Obj App
ObjApp.prototype.update = function () {
  this.app.time += .000025;
  // this.app.time = 0;
  this.pointLight.color.r = this.pointColor[0]/0xFF;
  this.pointLight.color.g = this.pointColor[1]/0xFF;
  this.pointLight.color.b = this.pointColor[2]/0xFF;
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
ObjApp.prototype.draw = function () {
  this.renderer.render(this.scene, this.camera);
  // window.open(this.renderer.domElement.toDataURL(), 'what');
};

// 
ObjApp.prototype.set = function (what, val) {
  if (what in this.params) {
    this.params[what] = val;
  }
};
