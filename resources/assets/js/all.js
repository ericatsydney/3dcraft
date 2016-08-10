/**
 * @file
 * This file is for the camera, mesh and scene setup and rendering.
 *
 */

var React = require('react');
var React3 = require('react-three-renderer');
var THREE = require('three');
var ReactDOM = require('react-dom');
//import STLLoader from './STLLoader';
var STLLoader = require('./STLLoader');

class Simple extends React.Component {
  constructor(props, context) {
    super(props, context);

    // construct the position vector here, because if we use 'new' within render,
    // React will think that things have changed when they have not.
    this.cameraPosition = new THREE.Vector3(0, 0, 5);
    this.loader = new STLLoader();
  
    this.state = {
      cubeRotation: new THREE.Euler(),
      vertices: [
	new THREE.Vector3( -10,  10, 0 ),
	new THREE.Vector3( -10, -10, 0 ),
	new THREE.Vector3(  10, -10, 0 )
      ],
      faces: [new THREE.Face3( 0, 1, 2 )] 
    };

    this.loader.load('../models/stl/ascii/FantasyMorek.stl', function (geometry) {
      this.setState({
	vertices: geometry.vertices,
        faces: geometry.faces,
      });
    }.bind(this));

    this._onAnimate = () => {
      // we will get this callback every frame

      // pretend cubeRotation is immutable.
      // this helps with updates and pure rendering.
      // React will be sure that the rotation has now updated.
      // this.setState({
      //   cubeRotation: new THREE.Euler(
      //     this.state.cubeRotation.x + 0.1,
      //     this.state.cubeRotation.y + 0.1,
      //     0
      //   ),
      // });
    };
  }

  render() {
    const width = window.innerWidth; // canvas width
    const height = window.innerHeight; // canvas height
    console.log('88');
    console.log(this.state.vertices);
    console.log('99');
    console.log(this.state.faces);
    return (<React3
      mainCamera="camera" // this points to the perspectiveCamera which has the name set to "camera" below
      width={width}
      height={height}

    >
      <scene>
        <perspectiveCamera
          name="camera"
          fov={75}
          aspect={width / height}
          near={0.1}
          far={1000}

          position={this.cameraPosition}
        />
        <mesh
          rotation={this.state.cubeRotation}
        >
          <geometry
	   vertices={this.state.vertices}
           faces={this.state.faces}
          />
          <meshBasicMaterial
            color={0x00ff00}
          />
        </mesh>
      </scene>
    </React3>);
  }
}

ReactDOM.render(<Simple/>, document.body);

