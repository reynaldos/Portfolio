import React, { Component } from "react";
import * as THREE from "three";
import  FBXLoader  from "three-fbx-loader"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as shader from "./Shaders/Shader";

class Scene extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.animate = this.animate.bind(this);
    this.renderScene = this.renderScene.bind(this);
    this.addObjects  = this.addObjects.bind(this);
    this.computeBoundingBox = this.computeBoundingBox.bind(this);
    this.setupScene = this.setupScene.bind(this);
    this.destroyContext = this.destroyContext.bind(this);
    this.handleWindowResize = this.handleWindowResize.bind(this);
    this.LoadAnimatedModelAndPlay = this.LoadAnimatedModelAndPlay.bind(this)
  }

  componentWillMount() {
    window.addEventListener("resize", this.handleWindowResize);
  }

  componentDidMount() {
    this.setupScene();
  }

  setupScene() {
    this.width = this.container.clientWidth;
    this.height = this.container.clientHeight;

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.shadowMap.enabled = true;
    this.renderer.gammaOutput = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.001,
      1000
    );

    this.camera.position.set(0, 0, 2);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.scene.add(this.camera);
    
    this.addObjects();
    this.computeBoundingBox();
  }

    addObjects() {

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



    this.geometry = new THREE.PlaneGeometry(1, 1, 1, 1);

    this.plane = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.plane);

    let light = new THREE.DirectionalLight(0xFFFFFF);
    light.position.set(20, 100, 10);
    light.target.position.set(0, 0, 0);
    light.castShadow = true;
    light.shadow.bias = -0.001;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 500.0;
    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 500.0;
    light.shadow.camera.left = 100;
    light.shadow.camera.right = -100;
    light.shadow.camera.top = 100;
    light.shadow.camera.bottom = -100;
    this.scene.add(light);

    light = new THREE.AmbientLight(0xFFFFFF);
    this.scene.add(light);

        this.LoadAnimatedModelAndPlay(
      './Assets/panels/',
      'Paneles_Low_Animation.fbx',
      // 'Paneles_Low_Animation.fbx',
      new THREE.Vector3(0, 0, 0))
  }

  LoadAnimatedModelAndPlay(path, modelFile, animFile, offset) {
    const loader = new FBXLoader();
    // loader.setPath(path);
    console.log(path+modelFile)
    loader.load(path+modelFile, (fbx) => {
      fbx.scale.setScalar(1);
      fbx.traverse(c => {
        c.castShadow = true;
      });
      fbx.position.copy(offset);

      const anim = new FBXLoader();
      anim.setPath(path);
      anim.load(animFile, (anim) => {
        const m = new THREE.AnimationMixer(fbx);
        this._mixers.push(m);
        const idle = m.clipAction(anim.animations[0]);
        idle.play();
      });
      this.scene.add(fbx);
    });
  }

  computeBoundingBox() {
    // let offset = 1.6;
    // const boundingBox = new THREE.Box3();
    // boundingBox.setFromObject(this.object);
    // const center = boundingBox.getCenter();
    // const size = boundingBox.getSize();
    // const maxDim = Math.max(size.x, size.y, size.z);
    // const fov = this.camera.fov * (Math.PI / 180);
    // let cameraZ = maxDim / 2 / Math.tan(fov / 2);
    // cameraZ *= offset;
    // this.camera.position.z = center.z + cameraZ;
    // const minZ = boundingBox.min.z;
    // const cameraToFarEdge = minZ < 0 ? -minZ + cameraZ : cameraZ - minZ;

    // this.camera.far = cameraToFarEdge * 3;
    // this.camera.lookAt(center);
    // this.camera.updateProjectionMatrix();

    // let controls = new OrbitControls(this.camera, this.renderer.domElement);
    // controls.enableDamping = true;
    // controls.dampingFactor = 0.25;
    // controls.enableZoom = true;
    // controls.zoomSpeed = 0.1;
    // controls.enableKeys = false;
    // controls.screenSpacePanning = false;
    // controls.enableRotate = true;
    // controls.autoRotate = true;
    // controls.dampingFactor = 1;
    // controls.autoRotateSpeed = 1.2;
    // controls.enablePan = false;
    // controls.target.set(center.x, center.y, center.z);
    // controls.update();
    // this.controls = controls;
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
    this.renderer.render(this.scene, this.camera);
  }

  animate() {
    this.frameId = requestAnimationFrame(this.animate);
    this.controls.update();
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