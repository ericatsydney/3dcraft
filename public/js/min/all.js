var startX = 0, x = 0, lastX = 0;
var scene, camera, renderer, controls, mesh;
var center = new THREE.Vector3( 0, 0, 10 );
function resizeWindow() {
  // Create an event listener that resizes the renderer with the browser window.
  window.addEventListener('resize', function () {
    var WIDTH = window.innerWidth,
      HEIGHT = window.innerHeight;
    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionMatrix();
  })
}

function drawAxis(colorHex, vertice1, vertice2){
  var material = new THREE.LineBasicMaterial({
    color: colorHex
  });

  var geometry = new THREE.Geometry();
  geometry.vertices.push( vertice1, vertice2);

  var line = new THREE.Line( geometry, material );
  scene.add( line );

}

function drawXYZAxis() {
  // Z Axis.
  drawAxis(0x0000ff, new THREE.Vector3( 0, 0, 1000 ), new THREE.Vector3( 0, 0, -1000 ));
  // X Axis.
  drawAxis(0xff0000, new THREE.Vector3( 1000, 0, 0 ), new THREE.Vector3( -1000, 0, 0 ));
  // Y Axis.
  drawAxis(0x00ff00, new THREE.Vector3( 0, 1000, 0 ), new THREE.Vector3( 0, -1000, 0 ));
}

function orbitControl() {
  // Add OrbitControls so that we can pan around with the mouse.
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  //controls.addEventListener( 'change', render ); // add this only if there is no animation loop (requestAnimationFrame)
  //controls.enableRotate = false;
  controls.update();
}

function loadMeshFromSTL() {
  // ASCII file
  var loader = new THREE.STLLoader();
  //loader.load('../models/stl/ascii/slotted_disk.stl', function (geometry) {
  loader.load('../models/stl/ascii/FantasyMorek.stl', function (geometry) {

    var material = new THREE.MeshPhongMaterial({color: 0xfefefe, specular: 0x111111, shininess: 200});
    mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(0, 0, 0);
    //mesh.scale.set(0.5, 0.5, 0.5);

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    scene.add(mesh);

  });
}

function setLighting() {
  // Create a light, set its position, and add it to the scene.
  var light = new THREE.PointLight(0xffffff);
  light.position.set(100,100,100);
  var light1 = new THREE.PointLight(0xffffff);
  light1.position.set(50,-100,70);

  scene.add(light);
  scene.add(light1)
}

function addGround() {
  // Ground
  var plane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry( 40, 40 ),
    new THREE.MeshPhongMaterial( { color: 0x999999, specular: 0x101010 } )
  );
  plane.position.y = -0.5;
  scene.add( plane );

  plane.receiveShadow = true;

}

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
  camera = new THREE.PerspectiveCamera( 60, aspect, 1, 1000000 );
  camera.position.set(0,-30,40);
  camera.lookAt( scene.position );

  renderer = new THREE.WebGLRenderer();

  renderer.setSize(width, height);
  container.appendChild(renderer.domElement);

  loadMeshFromSTL();

  setLighting();

  //orbitControl();

  addGround();

  // Draw XYZ Axis.
  drawXYZAxis();

  resizeWindow();

  //
  var element = $("#container");
    element.on('mousedown',function(event) {
    startX = event.pageX;
    element.on('mousemove',function(event) {
      event.preventDefault();
      x = event.pageX - startX + lastX;
      var rotation = x*0.001;
      //console.log(mesh);
      mesh.geometry.rotateZ(Math.sin(rotation));
      render();
    });
  });

  element.on('mouseup',function(event) {
    lastX = x;
    element.unbind('mousemove');

  });


}

function render() {
  //camera.position.x = Math.sin(rotation) * 40;
  //camera.position.y = -1*Math.cos(rotation) * 40;
  ////console.log(THREE.Vector3( 0, 0, 5 ));
  camera.lookAt( center);
  requestAnimationFrame(render);

  renderer.render(scene, camera);
  //controls.update();
}

init();
render();