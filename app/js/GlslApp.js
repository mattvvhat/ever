GlslApp.prototype.loop = App.prototype.loop;

function GlslApp (el) {
  el = el || '';
  this.container = typeof el === 'string' ? document.getElementById(el) : el;
  App.call(this);
}

// Init Obj App
GlslApp.prototype.init = function () {
  var self = this;

  self.ambientColor = [ 0xCF, 0xCF, 0xCF ];
  self.pointColor   = [ 0x66, 0x66, 0x66 ];

  self.app.view_angle = 15;
  self.app.aspect     = window.innerWidth/window.innerHeight;
  self.app.near       = 0.1;
  self.app.far        = 10000;
  self.app.iterations = 0;
  self.app.time       = 0;


  self.params   = { y : 0, speed : 10.0 };
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
    point   : new THREE.PointLight(0xFFFFFF, 1, 100),
    diffuse : new THREE.DirectionalLight(0xCCCCCC)
  };

  self.lights.point.position.set(6, 0, 0);
  self.lights.point.lookAt(0, 0, 0);
  self.lights.diffuse.position.set( 1, 0, 0 );

  self.camera.position.x = 0;
  self.camera.position.y = 0;
  self.camera.position.z = 10;

  var cube = new THREE.BoxGeometry(3, 1, 1);
  var mat  = new THREE.MeshPhongMaterial({
    ambient   : 0xFFFFFF,
    color     : 0xdddddd,
    specular  : 0x009900,
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

  this.resize = function (width, height) {
    self.renderer.setSize(window.innerWidth, window.innerHeight);
  };

  this.resize();

  window.addEventListener('resize', function (ev) {
    self.resize();
  });
};

// Update Obj App
GlslApp.prototype.update = function () {
  var self = this;
  self.camera.position = self.camera.position;
  self.camera.lookAt(new THREE.Vector3(0, 0, 0));
  self.mesh.rotation.x += +0.01;
  self.mesh.rotation.y += -0.02;
};

// Draw cube to scene
GlslApp.prototype.draw = function () {
  this.renderer.render(this.scene, this.camera);
};

//
GlslApp.prototype.set = function (what, val) {
  if (what in this.params) {
    this.params[what] = val;
  }
};

GlslApp.prototype.shift = function () {

};
