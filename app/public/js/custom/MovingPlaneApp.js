//    Plane app
//    +------+       +------+       +------+       +------+       +------+
//    |`.    |`.     |\     |\      |      |      /|     /|     .'|    .'|
//    |  `+--+---+   | +----+-+     +------+     +-+----+ |   +---+--+'  |
//    |   |  |   |   | |    | |     |      |     | |    | |   |   |  |   |
//    +---+--+   |   +-+----+ |     +------+     | +----+-+   |   +--+---+
//     `. |   `. |    \|     \|     |      |     |/     |/    | .'   | .'
//       `+------+     +------+     +------+     +------+     +------+'

/** CUBE APP **/
MovingPlaneApp.prototype = App.prototype;

function MovingPlaneApp () {
  App.call(this);
}

~function () {
  // Viewing tools
  var _renderer;
  var _camera;
  var _scene;
  var _container;
  // Light
  var _pointLight, _ambientLight;
  // Colors
  var _pointColor = [ 0xFF, 0x66, 0x44 ];
  var _ambientColor = [ 0xBB, 0xBB, 0xFF ];
  // Shapes
  var _geometry;

  var _params = { y : 0 };

  var _plane = new Functional(function (x, y, t) {
    t = getElapsedSeconds();
    return .21 * x * x * x + Math.cos(y + t);
  });

  // Init Plane App
  MovingPlaneApp.prototype.init = function () {
    this.app.width = this.app.height = 1200;
    this.app.view_angle = 60;
    this.app.aspect = this.app.width/this.app.height;
    this.app.near = 0.1;
    this.app.far = 10000;

    _container  = document.getElementById('div-bg');
    _scene      = new THREE.Scene();
    _renderer   = new THREE.WebGLRenderer({ antialias : true });

    if (!_renderer) {
      _renderer = new THREE.CanvasRenderer();
    }

    _camera = new THREE.PerspectiveCamera(
      this.app.view_angle,
      this.app.aspect,
      this.app.near,
      this.app.far
    );
    var manager = new THREE.LoadingManager();
    manager.onProgress = function () { };

    _camera.position.y = 0;
    _camera.position.z = 20;

    _renderer.setSize(this.app.width, this.app.height);

    var material = new THREE.MeshLambertMaterial({ color : 0x44FFFF, wireframe: false });
    var cube = new THREE.CubeGeometry(2, 2, 2);
    _geometry = new THREE.Mesh(_plane.geometry, material);

    _pointLight   = new THREE.PointLight(0x00FFFF);
    _ambientLight = new THREE.AmbientLight(0x553333);
    _scene.add(_camera);
    _scene.add(_geometry);
    _scene.add(_pointLight);
    _scene.add(_ambientLight);

    _renderer.setClearColor(new THREE.Color(0xBBBBFF));
    _container.appendChild(_renderer.domElement);
  };

  // Update Plane App
  MovingPlaneApp.prototype.update = function () {
    _plane.update();
    t = Date.now() / 1000 / 2;
    var pos = {
      x : 5 * Math.cos(0),
      y : 5 * Math.sin(0),
      z : 15
    };
    _camera.position.set(pos.x, pos.y, pos.z);
    _camera.up = new THREE.Vector3(0, 0, 1);
    _camera.lookAt(new THREE.Vector3(0,0,0));

    if (_pointLight) {
      _pointLight.position.x = 00;
      _pointLight.position.y = 00;
      _pointLight.position.z = 09;
    }
  };

  // Draw cube to scene
  MovingPlaneApp.prototype.draw = function () {
    _renderer.render(_scene, _camera);
  };

  // 
  MovingPlaneApp.prototype.set = function (what, val) {
    if (what in _params) {
      _params[what] = val;
    }
  };
}();
