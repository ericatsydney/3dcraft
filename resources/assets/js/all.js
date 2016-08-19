/**
 * @file
 * This file is for the camera, mesh and scene setup and rendering.
 *
 */

var React = require('react');
var React3 = require('react-three-renderer');
var THREE = require('three');
var ReactDOM = require('react-dom');
var STLLoader = require('./STLLoader');
var loader = new STLLoader();
var myMesh = null;

// This is a sample using MTL and OBJ Loader
//var OBJLoader = require('./OBJLoader');
//var MTLLoader = require('./MTLLoader');
//const PATH = 'http://threejs.org/examples/obj/walt/';
//var MTL_FILE = 'WaltHead.mtl';
//var OBJ_FILE = 'WaltHead.obj';
//const mtlLoader = new THREE.MTLLoader();
//mtlLoader.setBaseUrl(PATH);
//mtlLoader.setPath(PATH); // One of these might not be needed
//mtlLoader.crossOrigin = '*'; // Use as needed
//mtlLoader.load(MTL_FILE, function(materials) {
//
//    materials.preload();
//    // OBJ Loader
//    var objLoader = new THREE.OBJLoader();
//    objLoader.setMaterials(materials);
//    objLoader.setPath(PATH);
//    objLoader.load(OBJ_FILE, function(object) {
//        mesh = object;
//        mesh.position.y = -50;
//        ReactDOM.render(<Simple/>, document.body);
//    });
//});

loader.load('../models/stl/ascii/FantasyMorek.stl', function (geometry) {
  var material = new THREE.MeshPhongMaterial({color: 0xfefefe, specular: 0x111111, shininess: 200});
  myMesh = new THREE.Mesh(geometry, material);
  myMesh.position.set(0, 0, 0);
  myMesh.castShadow = true;
  myMesh.receiveShadow = true;
  ReactDOM.render(<Simple/>, document.body);
});

class Simple extends React.Component {
  constructor(props, context) {
    super(props, context);

    // construct the position vector here, because if we use 'new' within render,
    // React will think that things have changed when they have not.
    this.cameraPosition = new THREE.Vector3(0, 0, 250);
    this.cameraLookAt = new THREE.Vector3(0, 0, 1); 
  }

  componentDidMount() {
    this.refs.group.add(myMesh);
  }

  componentWillUnmount() {
    this.refs.group.remove(myMesh);
  }

  render() {
    const width = window.innerWidth; // canvas width
    const height = window.innerHeight; // canvas height
    return (<React3
      mainCamera="camera" // this points to the perspectiveCamera which has the name set to "camera" below
      width={width}
      height={height}
      clearColor={0xf0f0f0}
    >
      <scene>
        <perspectiveCamera
          name="camera"
          fov={45}
          aspect={width / height}
          near={1}
          far={2000}

          position={this.cameraPosition}
          lookAt={this.cameraLookAt}
        />
	<group ref='group' />
      </scene>
    </React3>);
  }
}

