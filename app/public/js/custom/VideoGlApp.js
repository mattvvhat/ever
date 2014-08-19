//    Video GL App :: Render textures onto a set of shapes
//    +------+       +------+       +------+       +------+       +------+
//    |`.    |`.     |\     |\      |      |      /|     /|     .'|    .'|
//    |  `+--+---+   | +----+-+     +------+     +-+----+ |   +---+--+'  |
//    |   |  |   |   | |    | |     |      |     | |    | |   |   |  |   |
//    +---+--+   |   +-+----+ |     +------+     | +----+-+   |   +--+---+
//     `. |   `. |    \|     \|     |      |     |/     |/    | .'   | .'
//       `+------+     +------+     +------+     +------+     +------+'

/** CUBE APP **/
VideoGlApp.prototype.loop = App.prototype.loop;

function VideoGlApp (el) {
  el = el || '';
  this.container = typeof el === 'string' ? document.getElementById(el) : el;
  App.call(this);
}

VideoGlApp.prototype.init = function () {
  var self = this;
  self.app.width      = 400;
  self.app.height     = 400;
  self.app.view_angle = 75;
  self.app.aspect     = self.app.width/self.app.height;
  self.app.near       = 0.1;
  self.app.far        = 10000;
  self.app.iterations = 0;
  self.app.time       = 0;

  self.params = { 
    video : false
  };

  this.scene    = new THREE.Scene();
  this.renderer = !! window.WebGLRenderingContext ? new THREE.WebGLRenderer({ antialias : true }) : new THREE.CanvasRenderer();
  this.camera   = new THREE.PerspectiveCamera(
    this.app.view_angle,
    this.app.aspect,
    this.app.near,
    this.app.far
  );

  this.pointLight   = new THREE.PointLight(0x999999);
  this.pointLight.position.x = 0;
  this.pointLight.position.y = 0;
  this.pointLight.position.z = 0;
  this.ambientLight = new THREE.AmbientLight(0x999999);

  this.renderer.setSize(this.app.width, this.app.height);
  this.renderer.setClearColor(new THREE.Color(0xBBBBFF));

  var urls = [
    '/public/video/1ac5522a71d411e3a06e0e0270580326_102.mp4',
    '/public/video/1ac5522a71d411e3a06e0e0270580326_102.mp4',
    '/public/video/1ac5522a71d411e3a06e0e0270580326_102.mp4',
    '/public/video/1ac5522a71d411e3a06e0e0270580326_102.mp4',
    '/public/video/1ac5522a71d411e3a06e0e0270580326_102.mp4',
    '/public/video/1ac5522a71d411e3a06e0e0270580326_102.mp4'
  ];

  var video = document.getElementById('video-stream');
  this.video_texture = new THREE.Texture(video);
  this.video_texture.minFilter        = THREE.LinearFilter;
  this.video_texture.magFilter        = THREE.LinearFilter;
  this.video_texture.format           = THREE.RGBFormat;
  this.video_texture.generateMipmaps  = false;

  var skyBoxMaterial = new THREE.MeshLambertMaterial({
    color : 0xFFFF00,
    map   : this.video_texture,
    side  : THREE.BackSide
  });

  this.skybox = new THREE.Mesh(
    new THREE.CubeGeometry(10, 10, 10),
    skyBoxMaterial
  );

  this.scene.add(this.camera);
  this.scene.add(this.pointLight);
  this.scene.add(this.ambientLight);
  this.scene.add(this.skybox);

  this.container.appendChild(this.renderer.domElement);
};

VideoGlApp.prototype.update = function () {
  this.app.time += 0.0075;
  var t = this.app.time;
  var x = 5 * Math.cos(t), z = 5 * Math.sin(t);
  this.camera.up = new THREE.Vector3(0, 1, 0);
  this.skybox.rotation.x += .001;
  this.skybox.rotation.y += .005;
  this.camera.position.x = 000;
  this.camera.position.y = 000;
  this.camera.position.z = 000;
  this.camera.lookAt(new THREE.Vector3(x, 0, z));
  this.renderer.render(this.scene, this.camera);

  if (this.video_texture ) this.video_texture.needsUpdate = true;
};

VideoGlApp.prototype.draw = function () {
  this.renderer.render(this.scene, this.camera);
};

VideoGlApp.prototype.set = function (what, val) {
  if (what in this.params) {
    this.params[what] = val;
  }
};
