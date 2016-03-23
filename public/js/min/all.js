var container = document.getElementById("container")
var width = container.clientWidth;
var height = container.clientHeight;
var aspect = width / height;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
container.appendChild(renderer.domElement);

var geometry = new THREE.CubeGeometry(1,1,1);
var material = new THREE.MeshBasicMaterial({
  wireframe: true,
  color: 0x111111
});

var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 3

function render() {
  requestAnimationFrame(render);

  cube.rotation.x += 0.03;
  cube.rotation.y += 0.03;

  renderer.render(scene, camera);
}

render();