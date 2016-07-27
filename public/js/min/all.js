'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactThreeRenderer = require('react-three-renderer');

var _reactThreeRenderer2 = _interopRequireDefault(_reactThreeRenderer);

var _three = require('three');

var _three2 = _interopRequireDefault(_three);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file
 * This file is for the camera, mesh and scene setup and rendering.
 *
 */

(function ($, window, document) {

  THREED_CRAFT = window.THREED_CRAFT || {};

  THREED_CRAFT.threeRender = {
    setting: {
      enableAxis: false
    },
    startX: 0,
    x: 0,
    lastX: 0,
    scene: {},
    camera: {},
    renderer: {},
    controls: {},
    mesh: {},
    center: new _three2.default.Vector3(0, 0, 10),

    initLocalStorage: function initLocalStorage() {
      localStorage.setItem('enableAxis', THREED_CRAFT.threeRender.setting.enableAxis);
    },

    resizeWindow: function resizeWindow() {
      // Create an event listener that resizes the renderer with the browser window.
      window.addEventListener('resize', function () {
        var WIDTH = window.innerWidth,
            HEIGHT = window.innerHeight;
        renderer.setSize(WIDTH, HEIGHT);
        camera.aspect = WIDTH / HEIGHT;
        camera.updateProjectionMatrix();
      });
    },

    drawSingleLine: function drawSingleLine(colorHex, vertice1, vertice2) {
      var material = new _three2.default.LineBasicMaterial({
        color: colorHex
      });

      var geometry = new _three2.default.Geometry();
      geometry.vertices.push(vertice1, vertice2);

      var line = new _three2.default.Line(geometry, material);
      scene.add(line);
    },

    drawXYZAxis: function drawXYZAxis() {
      // Z Axis.
      THREED_CRAFT.threeRender.drawSingleLine(0x0000ff, new _three2.default.Vector3(0, 0, 1000), new _three2.default.Vector3(0, 0, -1000));
      // X Axis.
      THREED_CRAFT.threeRender.drawSingleLine(0xff0000, new _three2.default.Vector3(1000, 0, 0), new _three2.default.Vector3(-1000, 0, 0));
      // Y Axis.
      THREED_CRAFT.threeRender.drawSingleLine(0x00ff00, new _three2.default.Vector3(0, 1000, 0), new _three2.default.Vector3(0, -1000, 0));
    },

    orbitControl: function orbitControl() {
      // Add OrbitControls so that we can pan around with the mouse.
      controls = new _three2.default.OrbitControls(camera, renderer.domElement);
      // PI = 180 degree, and PI/2 = 90 degree.
      controls.maxPolarAngle = Math.PI / 2; // radians
      controls.update();
    },

    loadMeshFromSTL: function loadMeshFromSTL() {
      // ASCII file
      var loader = new _three2.default.STLLoader();
      //loader.load('../models/stl/ascii/balanced_die.stl', function (geometry) {
      loader.load('../models/stl/ascii/FantasyMorek.stl', function (geometry) {

        var material = new _three2.default.MeshPhongMaterial({ color: 0xfefefe, specular: 0x111111, shininess: 200 });
        mesh = new _three2.default.Mesh(geometry, material);

        mesh.position.set(0, 0, 0);

        mesh.castShadow = true;
        mesh.receiveShadow = true;

        scene.add(mesh);
      });
    },

    setLighting: function setLighting() {
      // Create a light, set its position, and add it to the scene.
      var light = new _three2.default.PointLight(0xffffff);
      light.position.set(100, 100, 100);
      var light1 = new _three2.default.PointLight(0xffffff);
      light1.position.set(50, -100, 70);

      scene.add(light);
      scene.add(light1);
    },

    addGround: function addGround() {
      // Ground
      var plane = new _three2.default.Mesh(new _three2.default.PlaneBufferGeometry(40, 40), new _three2.default.MeshPhongMaterial({ color: 0x999999, specular: 0x101010 }));
      plane.position.y = -0.5;
      scene.add(plane);

      plane.receiveShadow = true;
    },

    init: function init() {
      var container = document.getElementById("container"),
          width = container.clientWidth,
          height = container.clientHeight,
          aspect = width / height;

      // Set renderer.
      renderer = new _three2.default.WebGLRenderer();
      renderer.setSize(width, height);
      container.appendChild(renderer.domElement);
      // Set scene.
      scene = new _three2.default.Scene();
      // Set camera.
      camera = new _three2.default.PerspectiveCamera(60, aspect, 1, 1000000);
      camera.position.set(0, -40, 50);

      // We need to set the camera up so that the camera will rotate around z-axis.
      camera.up.set(0, 0, 1);
      camera.lookAt(0, 0, 10);

      // Load Object from STL file.
      THREED_CRAFT.threeRender.loadMeshFromSTL();
      // Set lighting.
      THREED_CRAFT.threeRender.setLighting();
      // Set ground.
      THREED_CRAFT.threeRender.addGround();
      // Make it resizable.
      THREED_CRAFT.threeRender.resizeWindow();
      // Define the drag/draw behaviours.
      THREED_CRAFT.threeRender.orbitControl();
      // Initialize the localStorage
      THREED_CRAFT.threeRender.initLocalStorage();
    },

    render: function render() {
      requestAnimationFrame(THREED_CRAFT.threeRender.render);
      renderer.render(scene, camera);
    }
  };

  $(document).ready(function () {
    THREED_CRAFT.threeRender.init();
    THREED_CRAFT.threeRender.render();

    $('#axis-control').click(function () {
      if (JSON.parse(localStorage.getItem('enableAxis'))) {
        localStorage.setItem('enableAxis', false);
        THREED_CRAFT.threeRender.drawXYZAxis();
        $('#axis-control').addClass('enable');
      } else {
        localStorage.setItem('enableAxis', true);
        $('#axis-control').removeClass('enable');
      }
      THREED_CRAFT.threeRender.render();
    });
  });

  // Function to observe the localStorage, once it get changes will re-render accordingly.
  $(window).on('storage', function (e) {
    console.log('rerender');
    if (JSON.parse(localStorage.getItem('enableAxis'))) {
      // Set XYZ Axis.

      THREED_CRAFT.threeRender.drawXYZAxis();
      $('#axis-control').addClass('enable');
    } else {
      conosle.log('updatebutton');
      $('#axis-control').removeClass('enable');
    }
    THREED_CRAFT.threeRender.render();
  });
})(jQuery, undefined, undefined.document);
