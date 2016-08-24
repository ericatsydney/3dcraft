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
  ReactDOM.render(<Simple/>, document.getElementById('threeApp'));
});

class Simple extends React.Component {
  constructor(props, context) {
    super(props, context);

    // construct the position vector here, because if we use 'new' within render,
    // React will think that things have changed when they have not.
    this.cameraPosition = new THREE.Vector3(0, -40, 50);
    this.cameraLookAt = new THREE.Vector3(0, 0, 1); 
    this.lightPosition1 = new THREE.Vector3(100, 100, 100);
    this.lightPosition2 = new THREE.Vector3(50, -100, 70);
    this.lightTarget  = new THREE.Vector3(0, 0, 1); 
    this.state = {
      rotate: true,
      cameraPosition: new THREE.Vector3(0, -40, 50),
    }
  }

  _onAnimate = () => {
    let time;

    time = Date.now();
    const newState = {
      time
    };
    const timer = time * 0.0002;
    if (this.state.rotate) {
      newState.cameraPosition = new THREE.Vector3(
        Math.cos(timer) * 50,
        this.state.cameraPosition.y,
        Math.sin(timer) * 50
      );
    }
    this.setState(newState);
  }
 
  _toggleRotate = () => {
    this.setState({ rotate: !this.state.rotate });
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
    return (
    <div class="wrapper">
    <Info 
      toggleRotate={this._toggleRotate}
      rotating={this.state.rotate}
    >
    </Info>
    <React3
      mainCamera="camera" // this points to the perspectiveCamera which has the name set to "camera" below
      width={width}
      height={height}
      clearColor={0xf0f0f0}
      onAnimate={this._onAnimate}
    >
      <scene>
	<ambientLight
          color={0x505050}
	/>
	<spotLight
          color={0xdddddd}
          intensity={1.5}
          position={this.lightPosition1}
          lookAt={this.lightTarget}

          castShadow
          shadowCameraNear={200}
          shadowCameraFar={10000}
          shadowCameraFov={50}

          shadowBias={-0.00022}

          shadowMapWidth={2048}
          shadowMapHeight={2048}
        />
       	<spotLight
          color={0xdddddd}
          intensity={1.5}
          position={this.lightPosition2}
          lookAt={this.lightTarget}

          castShadow
          shadowCameraNear={200}
          shadowCameraFar={10000}
          shadowCameraFov={50}

          shadowBias={-0.00022}

          shadowMapWidth={2048}
          shadowMapHeight={2048}
        />

        <perspectiveCamera
          name="camera"
          fov={45}
          aspect={width / height}
          near={1}
          far={2000}

          position={this.state.cameraPosition}
          lookAt={this.state.rotate ? this.cameraLookAt : null}
        />
	<group ref='group' />
      </scene>
    </React3>
    </div>);
  }
}

const { PropTypes } = React;

class Info extends React.Component {
  static propTypes = {
    rotating: PropTypes.bool.isRequired,
  };

  render() {
    const linkStyle = {
      textDecoration: 'underline',
      cursor: 'pointer',
    };

    const {
      toggleRotate,
      rotating,
    } = this.props;

    return (<div
      style={{
        textAlign: 'center',
        padding: 10,
        zIndex: 10,
        width: '100%',
        position: 'absolute',
        color: '#000',
      }}
    >
      3dcraft Demo<br/>
      Model loaded from STL file.<br/>
      Toggle: <a onClick={toggleRotate} style={linkStyle}>Camera{rotating ? '*' : null}</a> |
      <br/>
    </div>);
  }
}

