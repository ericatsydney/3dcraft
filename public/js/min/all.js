(function($, window, document){
  THREED_CRAFT = window.THREED_CRAFT || {};

  THREED_CRAFT.threeRender = {
    startX:0,
    x: 0,
    lastX: 0,
    scene: {},
    camera: {},
    renderer: {},
    controls: {},
    mesh: {},
    center: new THREE.Vector3( 0, 0, 10 ),

    resizeWindow: function() {
      // Create an event listener that resizes the renderer with the browser window.
      window.addEventListener('resize', function () {
        var WIDTH = window.innerWidth,
          HEIGHT = window.innerHeight;
        renderer.setSize(WIDTH, HEIGHT);
        camera.aspect = WIDTH / HEIGHT;
        camera.updateProjectionMatrix();
      })
    },

    drawSingleLine: function(colorHex, vertice1, vertice2){
      var material = new THREE.LineBasicMaterial({
        color: colorHex
      });

      var geometry = new THREE.Geometry();
      geometry.vertices.push( vertice1, vertice2);

      var line = new THREE.Line( geometry, material );
      scene.add( line );
    },

    drawXYZAxis: function() {
      // Z Axis.
      THREED_CRAFT.threeRender.drawSingleLine(0x0000ff, new THREE.Vector3( 0, 0, 1000 ), new THREE.Vector3( 0, 0, -1000 ));
      // X Axis.
      THREED_CRAFT.threeRender.drawSingleLine(0xff0000, new THREE.Vector3( 1000, 0, 0 ), new THREE.Vector3( -1000, 0, 0 ));
      // Y Axis.
      THREED_CRAFT.threeRender.drawSingleLine(0x00ff00, new THREE.Vector3( 0, 1000, 0 ), new THREE.Vector3( 0, -1000, 0 ));
    },

    orbitControl: function() {
      // Add OrbitControls so that we can pan around with the mouse.
      controls = new THREE.OrbitControls(camera, renderer.domElement);
      //controls.addEventListener( 'change', render ); // add this only if there is no animation loop (requestAnimationFrame)
      //controls.enableRotate = false;
      controls.update();
    },

    loadMeshFromSTL: function() {
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
    },

    setLighting: function() {
      // Create a light, set its position, and add it to the scene.
      var light = new THREE.PointLight(0xffffff);
      light.position.set(100,100,100);
      var light1 = new THREE.PointLight(0xffffff);
      light1.position.set(50,-100,70);

      scene.add(light);
      scene.add(light1)
    },

    addGround: function() {
      // Ground
      var plane = new THREE.Mesh(
        new THREE.PlaneBufferGeometry( 40, 40 ),
        new THREE.MeshPhongMaterial( { color: 0x999999, specular: 0x101010 } )
      );
      plane.position.y = -0.5;
      scene.add( plane );

      plane.receiveShadow = true;

    },

    init: function() {
      var container = document.getElementById("container"),
        width = container.clientWidth,
        height = container.clientHeight,
        aspect = width / height;

      // Set renderer.
      renderer = new THREE.WebGLRenderer();
      renderer.setSize(width, height);
      container.appendChild(renderer.domElement);
      // Set scene.
      scene = new THREE.Scene();
      // Set camera.
      camera = new THREE.PerspectiveCamera( 60, aspect, 1, 1000000 );
      camera.position.set(0,-30,40);
      camera.lookAt( scene.position );
      // Load Object from STL file.
      THREED_CRAFT.threeRender.loadMeshFromSTL();
      // Set lighting.
      THREED_CRAFT.threeRender.setLighting();
      //orbitControl();
      // Set ground.
      THREED_CRAFT.threeRender.addGround();
      // Set XYZ Axis.
      THREED_CRAFT.threeRender.drawXYZAxis();
      // Make it resizable.
      THREED_CRAFT.threeRender.resizeWindow();
      // Define the drag/draw behaviours.
      var element = $("#container");
      element.on('mousedown',function(event) {
        THREED_CRAFT.threeRender.startX = event.pageX;
        element.on('mousemove',function(event) {
          event.preventDefault();
          THREED_CRAFT.threeRender.x = event.pageX - THREED_CRAFT.threeRender.startX + THREED_CRAFT.threeRender.lastX;
          var rotation = THREED_CRAFT.threeRender.x*0.001;
          mesh.geometry.rotateZ(Math.sin(rotation));
          THREED_CRAFT.threeRender.render();
        });
      });
      element.on('mouseup',function(event) {
        THREED_CRAFT.threeRender.lastX = THREED_CRAFT.threeRender.x;
        element.unbind('mousemove');

      });
    },

    render: function() {
      requestAnimationFrame(THREED_CRAFT.threeRender.render);
      renderer.render(scene, camera);
    }
  };

  $(document).ready(function() {
    console.log('test');
    THREED_CRAFT.threeRender.init();
    THREED_CRAFT.threeRender.render();
  });
})(jQuery, this, this.document);


