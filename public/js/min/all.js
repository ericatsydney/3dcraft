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
  camera = new THREE.PerspectiveCamera( 35, aspect, 10, 1000000 );
  renderer = new THREE.WebGLRenderer();
  //cube = new THREE.Mesh(geometry, material);

  renderer.setSize(width, height);
  container.appendChild(renderer.domElement);
  //scene.add(cube);
  //scene.fog = new THREE.Fog( 0x72645b, 2, 15 );


  // Ground

  var plane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry( 40, 40 ),
    new THREE.MeshPhongMaterial( { color: 0x999999, specular: 0x101010 } )
  );
  plane.position.y = -0.5;
  scene.add( plane );

  plane.receiveShadow = true;

  // ASCII file
  var loader = new THREE.STLLoader();
  //loader.load('../models/stl/ascii/slotted_disk.stl', function (geometry) {
  loader.load('../models/stl/ascii/FantasyMorek.stl', function (geometry) {

    var material = new THREE.MeshPhongMaterial({color: 0xfefefe, specular: 0x111111, shininess: 200});
    var mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(0, 0, 0);
    //mesh.scale.set(0.5, 0.5, 0.5);

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    scene.add(mesh);

  });

  // Create a light, set its position, and add it to the scene.
  var light = new THREE.PointLight(0xffffff);
  light.position.set(100,100,100);
  var light1 = new THREE.PointLight(0xffffff);
  light1.position.set(50,-100,70);

  scene.add(light);
  scene.add(light1);

  camera.position.set(70,60,50);

  // Add OrbitControls so that we can pan around with the mouse.
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  //controls.addEventListener( 'change', render ); // add this only if there is no animation loop (requestAnimationFrame)
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  controls.enableZoom = false;

  // Create an event listener that resizes the renderer with the browser window.
  window.addEventListener('resize', function () {
    var WIDTH = window.innerWidth,
      HEIGHT = window.innerHeight;
    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionMatrix();
  });

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