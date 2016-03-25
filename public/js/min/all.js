var scene, camera, renderer, cube, controls;

function init() {
  var container = document.getElementById("container"),
    width = container.clientWidth,
    height = container.clientHeight,
    aspect = width / height,
    geometry = new THREE.CubeGeometry(1, 1, 1),
    material = new THREE.MeshBasicMaterial({
      wireframe: true,
      color: 0x111111
    });

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 1000);
  renderer = new THREE.WebGLRenderer();
  cube = new THREE.Mesh(geometry, material);

  renderer.setSize(width, height);
  container.appendChild(renderer.domElement);
  scene.add(cube);
  camera.position.z = 3

  // Add OrbitControls so that we can pan around with the mouse.
  controls = new THREE.OrbitControls( camera, renderer.domElement );
  //controls.addEventListener( 'change', render ); // add this only if there is no animation loop (requestAnimationFrame)
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  controls.enableZoom = false;

}

function render() {
  requestAnimationFrame(render);

  //cube.rotation.x += 0.03;
  //cube.rotation.y += 0.03;

  renderer.render(scene, camera);
  controls.update();
}

init();
render();