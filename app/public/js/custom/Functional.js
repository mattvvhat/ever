function Functional (f) {
  this.f = f;
  this.time = 0;
  this.grid = {
    xmin  : -5.,
    xmax  : +5.,
    xsize : +30,
    ymin  : -5.,
    ymax  : +5.,
    ysize : +30,
    tiles : 0
  };

  this.grid.xsize += this.grid.xsize % 2 ? 1 : 0;
  this.grid.ysize += this.grid.ysize % 2 ? 1 : 0;
  this.count = 0;

  this.geometry = new THREE.Geometry();
  this.geometry.dynamic = true;

  this.init();
}

Functional.prototype.init = function () {
  var f = this.f;
  var dx = (this.grid.xmax-this.grid.xmin)/this.grid.xsize;
  var dy = (this.grid.ymax-this.grid.ymin)/this.grid.ysize;

  for (var i = 0; i < this.grid.ysize; i++) {
    for (var j = 0; j < this.grid.xsize; j++) {
      var x = this.grid.xmin + j * dx;
      var y = this.grid.ymin + i * dy;

      { // Triange #1
        var tile = new Tile(
          new THREE.Vector3(x + 00, y + 00, f(x + 00, y + 00)),
          new THREE.Vector3(x + dx, y + 00, f(x + dx, y + 00)),
          new THREE.Vector3(x + 00, y + dy, f(x + 00, y + dy))
        );
        this.geometry.vertices.push(tile.a, tile.b, tile.c);
        var N = this.geometry.vertices.length;
        var face = new THREE.Face3(N-3, N-2, N-1);
        face.normal = tile.n;
        this.geometry.faces.push(face);
      }

      { // Triangle #2
        var tile = new Tile(
          new THREE.Vector3(x + dx, y + 00, f(x + dx, y + 00)),
          new THREE.Vector3(x + dx, y + dy, f(x + dx, y + dy)),
          new THREE.Vector3(x + 00, y + dy, f(x + 00, y + dy))
        );
        this.geometry.vertices.push(tile.a, tile.b, tile.c);
        var N = this.geometry.vertices.length;
        var face = new THREE.Face3(N-3, N-2, N-1);
        face.normal = tile.n;
        this.geometry.faces.push(face);
      }
    }
  }
};

Functional.prototype.update = function () {
  this.time += 0.0075;
  var self = this;
  var f = this.f;
  var t = 10 * this.time;
  this.iter(function () {
    this.a.z = f(this.a.x, this.a.y, t);
    this.b.z = f(this.b.x, this.b.y, t);
    this.c.z = f(this.c.x, this.c.y, t);
  });
  this.geometry.computeFaceNormals();
  this.geometry.verticesNeedUpdate = true;
  this.geometry.normalsNeedUpdate = true;
};

Functional.prototype.iter = function (callback) {
  for (var k = 0; k < this.geometry.faces.length; k++) {
    var face = this.geometry.faces[k];
    var obj = {
      a : this.geometry.vertices[ face.a ],
      b : this.geometry.vertices[ face.b ],
      c : this.geometry.vertices[ face.c ],
      n : face.normal
    };

    callback.call(obj);
  }
}

function normal (v) {
  var c = [ 0, 0, 0 ];
  var scale = 1/(v[0]*v[0] + v[1]*v[1] + v[2]*v[2]);
  c[0] = scale * v[0];
  c[1] = scale * v[1];
  c[2] = scale * v[2];
  return c;
}

function cross_product (a, b) {
  var c = [ 0, 0 , 0 ];
  c[0] = a[1] * b[2] - a[2] * b[1];
  c[1] = a[2] * b[0] - a[0] * b[2];
  c[2] = a[0] * b[1] - a[1] * b[0];
  return c;
}

function getNormalVector3 (a, b) {
  var n = normal( cross_product(a, b) );
  return new THREE.Vector3(n[0], n[1], n[2]);
}

function normal () {
  var a = new THREE.Vector3(1, 0, 1);
  var b = new THREE.Vector3(0, 1, 0);
  var c = new THREE.Vector3(-1, 0, 1);

  var n1 = normal(c, b, a);
  var n2 = normal(a, c, b);
  var n3 = normal(b, a, c);

  function normal (u, v, w) {
    var r = new THREE.Vector3();
    var s = new THREE.Vector3();
    r.subVectors(v, u);
    s.subVectors(w, u);
    var n = new THREE.Vector3();
    n.crossVectors(r, s);
    n.normalize();
    return n;
  }
};

function Tile (a, b, c) {
  this.a = a;
  this.b = b;
  this.c = c;

  this.du = new THREE.Vector3();
  this.dv = new THREE.Vector3();
  this.du.subVectors(this.b, this.a);
  this.dv.subVectors(this.c, this.a);

  this.n = new THREE.Vector3();
  this.n.crossVectors(this.du, this.dv);
  this.n.normalize();
}
