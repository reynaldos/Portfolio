import React, { Component } from "react";
import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as shader from "./Shaders/Shader";
import * as CANNON from "cannon-es";
import CannonDebugger from "cannon-es-debugger";


// import { GUI } from 'dat.gui';
import { isMobile } from 'react-device-detect';

var radToDeg = Math.PI / 180;

class Scene extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.animate = this.animate.bind(this);
    this.renderScene = this.renderScene.bind(this);
    this.addObjects  = this.addObjects.bind(this);
    this.computeBoundingBox = this.computeBoundingBox.bind(this);
    this.setupScene = this.setupScene.bind(this);
    this.destroyContext = this.destroyContext.bind(this);
    this.handleWindowResize = this.handleWindowResize.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.dropItem = this.dropItem.bind(this);
    this.setUpPhysics = this.setUpPhysics.bind(this);

    this.mouse = [0,0];
    this.meshes = [];
    this.physicsBodies = [];

  }

  componentWillMount() {
    window.addEventListener("resize", this.handleWindowResize);

    // only allow cam movement if not mobile
    if(!isMobile) window.addEventListener("mousemove", this.onMouseMove);

    // Listen for the drop event
    window.addEventListener('dropItem', this.dropItem);
  }

  componentDidMount() {
    this.setupScene();
  }

  // scene setup (cam, lights, objects)
  setupScene() {
    this.width = this.container.clientWidth;
    this.height = this.container.clientHeight;
    this.renderer = new THREE.WebGLRenderer({ antialias: true,logarithmicDepthBuffer: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.shadowMap.enabled = true;
    this.renderer.gammaOutput = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( 0x000 );  
    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.001,
      1000
    );

    this.camera.position.set(0, 0, 0);
    // this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.scene.add(this.camera);
    
    this.addObjects();
    this.setUpPhysics()
    this.computeBoundingBox();
  }

  // setup physics world
  setUpPhysics(){
    const corridorWidth = 6.7;
    const gravity = -3;

    // physics world
    this.physicsWorld =  new CANNON.World({
      gravity: new CANNON.Vec3(0, gravity, 0),
    }); 

    // ground plane for physics world
    const groundBody = new CANNON.Body({
      type: CANNON.Body.STATIC,
      shape: new CANNON.Plane(),
    });

    groundBody.position.set(0,-2.25,-10);
    groundBody.quaternion.setFromEuler(radToDeg * -90, 0,0);
    this.physicsWorld.addBody(groundBody);

    // right wall for physics world
    const rightWall = new CANNON.Body({
      type: CANNON.Body.STATIC,
      shape: new CANNON.Plane(),
    });

    rightWall.position.set(corridorWidth/2,0,-10);
    rightWall.quaternion.setFromEuler( 0,radToDeg * -90,0);
    this.physicsWorld.addBody(rightWall);


    // left wall for physics world
    const leftWall = new CANNON.Body({
      type: CANNON.Body.STATIC,
      shape: new CANNON.Plane(),
    });

    leftWall.position.set(-corridorWidth/2,0,-10);
    leftWall.quaternion.setFromEuler(0,radToDeg * 90,0);
    this.physicsWorld.addBody(leftWall);


    // back wall for physics world
    const backWall = new CANNON.Body({
      type: CANNON.Body.STATIC,
      shape: new CANNON.Plane(),
    });

    backWall.position.set(0,0,-29.75);
    backWall.quaternion.setFromEuler(0,0,radToDeg * 90);
    this.physicsWorld.addBody(backWall);

    const bumperRadius = .1;
    const bumperHieght = 10;
    const bumperPosY = 4.5;
    const spaceCount = 7;
    const spaceBetween = (Math.floor((corridorWidth/spaceCount) * 100))/100;

    for(let i=0;i<spaceCount+1;i++){
      // bumpers to spin drop items
      const bumper = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Cylinder(bumperRadius, bumperRadius, bumperHieght)
      });

      let xPos = (-corridorWidth/2) + (spaceBetween * i);
      bumper.position.set(xPos , bumperPosY, -10);
      bumper.quaternion.setFromEuler(radToDeg * 90,0,0);
      this.physicsWorld.addBody(bumper);
    }

    // test world
    // this.cannonDebugger = new CannonDebugger(this.scene, this.physicsWorld, {
    //   // color: 0xff0000,
    // });
  }

  // objects to add to scene
  addObjects() {

    // main group
    const mainGroup = new THREE.Group();
    mainGroup.position.y = 0.5;
    this.scene.add(mainGroup);

    this.material = new THREE.ShaderMaterial({
      extensions: {
        derivatives: "#extension GL_OES_standard_derivatives : enable",
      },
      side: THREE.DoubleSide,
      uniforms: {
        time: { type: "f", value: 0 },
        resolution: { type: "v4", value: new THREE.Vector4() },
        uvRate1: {
          value: new THREE.Vector2(1, 1),
        },
      },
      // wireframe: true,
      // transparent: true,
      vertexShader: shader.vertex,
      fragmentShader: shader.fragment,
    });

    

    // corridor model
    const glftLoader = new GLTFLoader();
    glftLoader.load('./assets/corridors/corridor5/scene.gltf', (gltfScene) => {
      this.loadedModel = gltfScene;
      // console.log(loadedModel);

      // gltfScene.scene.rotation.x = radToDeg * 0
      gltfScene.scene.rotation.y = radToDeg * 180;
      // gltfScene.scene.rotation.z = Math.PI /8;

      gltfScene.scene.position.x = 2.675;
      gltfScene.scene.position.y = -2;
      gltfScene.scene.position.z = -5;

      // gltfScene.scene.scale.set(.5, .5, .5);
      this.scene.add(gltfScene.scene);
    });


      // ambient light which is for the whole scene
    this.ambientLight = new THREE.AmbientLight(0xffffff, 2);
    // this.ambientLight.castShadow = true;
    this.scene.add(this.ambientLight);

    // directional light - parallel sun rays
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    // this.directionalLight.castShadow = true;
    this.directionalLight.position.set(2.675, -0, 2.675);
    this.directionalLight.rotation.z = radToDeg * -30;
    this.scene.add(this.directionalLight);


  }

  computeBoundingBox() {
    this.renderer.setSize(this.width, this.height);
    this.container.appendChild(this.renderer.domElement);
    this.start();
  }

  start() {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  }

  renderScene() {

    if(window.scrollY < window.innerHeight/3){
        // cam slow down mvement range
      let bufferRadius = .1
      
      // amount to change cam pos by
      let modifierX =  ( this.mouse[0] - this.camera.position.x ) * .0025;
      let modifierY =  ( -this.mouse[1] - this.camera.position.y ) * .0025;

      // slow down move speed when coming close to edges
      if (((this.camera.position.x > bufferRadius) && (modifierX > 0) )||( this.camera.position.x < -bufferRadius) && (modifierX < 0) ){

        modifierX *=.8
      }

      if (((this.camera.position.y > bufferRadius) && (modifierY > 0) )||  (this.camera.position.y < -bufferRadius) && (modifierY < 0 )){
        modifierY *=.8
      }

      // console.log(Math.sqrt(Math.pow(this.camera.position.x,2) + Math.pow(this.camera.position.y,2)))
      // let isSlowDown = Math.sqrt(Math.pow(this.camera.position.x,2) + Math.pow(this.camera.position.y,2)) > bufferRadius * 2
      // if(isSlowDown){
      //     modifierX *=.5;
      //     modifierY *=.5;
      // }

      // updates cam pos
      this.camera.position.x += modifierX;
      this.camera.position.y += modifierY;

      // console.log(this.camera.position.x,this.camera.position.y);
      // console.log(modifierX,modifierY);

      // set min and max for cam pos
      this.camera.position.x = clamp(this.camera.position.x, -1, 1 );
      this.camera.position.y = clamp(this.camera.position.y, -1, 1 );
    }

    if (this.loadedModel){
      // origin to move around
      this.camera.lookAt( new THREE.Vector3(0,-.2,-20));
    }

    this.renderer.render(this.scene, this.camera);
  }

  animate() {
    this.frameId = requestAnimationFrame(this.animate);
    this.physicsWorld.fixedStep();
    // this.cannonDebugger.update();


    for(let i = 0; i <  this.meshes.length; i++){
        this.meshes[i].position.copy( this.physicsBodies[i].position);
        this.meshes[i].quaternion.copy(this.physicsBodies[i].quaternion);

    }
    
    // console.log(this.status);

    //  this.controls.update();
    this.renderScene();
  }

  stop() {
    cancelAnimationFrame(this.frameId);
  }

  handleWindowResize() {
    let width = window.innerWidth;
    let height = window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    if (this.renderer)
    this.renderer.setSize(width, height);
  }

  componentWillUnmount() {
    this.stop();
    this.destroyContext();
  }

  destroyContext() {
    this.container.removeChild(this.renderer.domElement);
    this.renderer.forceContextLoss();
    this.renderer.context = null;
    this.renderer.domElement = null;
    this.renderer = null;
  }

  // change camera on mouse movement
  onMouseMove( ev ) {
      let mouseRange = 3.5;

      let posX = (ev.clientX - (window.innerWidth / 2)) / 100 ;
      let posY = (ev.clientY - (window.innerHeight / 2)) / 100 ;

      // console.log(posX , posY)

      this.mouse[ 0 ] = clamp(posX, -mouseRange, mouseRange);
      this.mouse[ 1 ] = clamp(posY, -mouseRange, mouseRange);

    }

  // drop item on drop event
  dropItem() {

    // item to drop physics body
    // create a sphere and set it at y=10
    const radius = .35;
    const dropHieght = 7.2;
    const sphereBody = new CANNON.Body({
      mass: 0.1,
      shape: new CANNON.Sphere(radius),
    });

    // randomly shift in corridor
    const shiftX = getRandom(-3.1,3.1);
    const shiftZ = getRandom(-5,4);
    sphereBody.quaternion.setFromEuler(0, radToDeg * -90, 0);
    sphereBody.position.set(shiftX, dropHieght, -10 + shiftZ);
    this.physicsWorld.addBody(sphereBody);

    //  item to drop render body
    const geometry = new THREE.SphereGeometry(radius);

    // const material = new THREE.MeshNormalMaterial();
    const texture = new THREE.TextureLoader().load( './logo/ballWrap.png' );

    // immediately use the texture for material creation
    const material = new THREE.MeshBasicMaterial( { map: texture } );
    const sphereMesh = new THREE.Mesh(geometry, material);
    this.scene.add(sphereMesh);

    // add mesh and body to arrays to sync in animation
    this.meshes.push(sphereMesh);
    this.physicsBodies.push(sphereBody);
  }


  render() {

    const width = "100%";
    const height = "100%";
    return (
      <div
        ref={(container) => {
          this.container = container;
        }}
        style={{
          width: width,
          height: height,
          position: "absolute",
          overflow: "hidden",
        }}></div>
    );
  }
}

export default Scene;



// Clamp number between two values with the following line:
const clamp = (num, min, max) => Math.min(Math.max(num, min), max);


function getRandom(min, max) {

  let num = Math.random() * (max - min) + min;
  num += Math.floor(Math.random() * 100)/100;
  return num;

}
