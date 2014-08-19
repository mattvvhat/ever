//    Plane app
//    +------+       +------+       +------+       +------+       +------+
//    |`.    |`.     |\     |\      |      |      /|     /|     .'|    .'|
//    |  `+--+---+   | +----+-+     +------+     +-+----+ |   +---+--+'  |
//    |   |  |   |   | |    | |     |      |     | |    | |   |   |  |   |
//    +---+--+   |   +-+----+ |     +------+     | +----+-+   |   +--+---+
//     `. |   `. |    \|     \|     |      |     |/     |/    | .'   | .'
//       `+------+     +------+     +------+     +------+     +------+'

PlaneApp.prototype = App.prototype;

function PlaneApp (el) {
  el = el || '';
  this.container = typeof el === 'string' ? document.getElementById(el) : el;
  App.call(this);
  console.log('....');
}

var _pointColor = [ 0xFF, 0x66, 0x44 ];
var _ambientColor = [ 0xBB, 0xBB, 0xFF ];
// Shapes

// Init Plane App
PlaneApp.prototype.init = function () {
  var self = this;

  this.plane = new Functional(function (x, y) {
    return x * x - y*y;
  });

  this.app.width = this.app.height = 1200;
  this.app.view_angle = 60;
  this.app.aspect = this.app.width/this.app.height;
  this.app.near = 0.1;
  this.app.far = 10000;

  this.scene      = new THREE.Scene();
  this.renderer   = new THREE.WebGLRenderer({ antialias : true });

  if (!this.renderer) {
    this.renderer = new THREE.CanvasRenderer();
  }

  this.camera = new THREE.PerspectiveCamera(
    this.app.view_angle,
    this.app.aspect,
    this.app.near,
    this.app.far
  );

  this.camera.position.y = 0;
  this.camera.position.z = 20;

  this.renderer.setSize(this.app.width, this.app.height);

  var material = new THREE.MeshLambertMaterial({ color : 0x44FFFF, wireframe: false });
  console.log(this.plane);

  this.pointLight   = new THREE.PointLight(0x00FFFF);
  this.ambientLight = new THREE.AmbientLight(0x553333);
  this.scene.add(this.camera);
  this.scene.add(new THREE.Mesh(this.plane.geometry, material));
  this.scene.add(this.pointLight);
  this.scene.add(this.ambientLight);

  this.renderer.setClearColor(new THREE.Color(0xBBBBFF));
  this.container.appendChild(this.renderer.domElement);
};

// Update Plane App
PlaneApp.prototype.update = function () {
  t = Date.now() / 1000 / 2;
  var pos = {
    x : 5 * Math.cos(t),
    y : 5 * Math.sin(t),
    z : 15
  };
  this.camera.position.set(pos.x, pos.y, pos.z);
  this.camera.up = new THREE.Vector3(0, 0, 1);
  this.camera.lookAt(new THREE.Vector3(0,0,0));

  if (this.pointLight) {
    this.pointLight.position.x = 01;
    this.pointLight.position.y = 05;
    this.pointLight.position.z = 05;
  }
};

// Draw cube to scene
PlaneApp.prototype.draw = function () {
  this.renderer.render(this.scene, this.camera);
};

// 
PlaneApp.prototype.set = function (what, val) {
  if (what in this.params) {
    this.params[what] = val;
  }
};
