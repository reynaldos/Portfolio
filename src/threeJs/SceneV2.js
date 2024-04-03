import React, { Suspense } from "react";
import {
  Gltf,
  OrbitControls,
  CameraControls,
  PerspectiveCamera,
  Cylinder,
  Plane,
  useTexture, 
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useState, useRef } from "react";

import {
  Physics,
  RigidBody,
} from "@react-three/rapier";
import { SRGBColorSpace } from "three";

const angleToRadians = (angleInDeg) => (Math.PI / 180) * angleInDeg;

const SceneCamera = () => {
  const [mousePos, setMousePos] = useState({
    x: 0,
    y: 0,
  });

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth || 1,
    hieght: window.innerHeight || 1,
  });

  // const orbitControlsRef = useRef(null);
  const cameraRef = useRef(null);

  useFrame((state) => {
    if (window.scrollY < window.innerHeight / 3) {
      if (!!cameraRef.current) {
        // cam slow down mvement range
        let bufferRadius = 0.1;

        // amount to change cam pos by
        let modifierX = (mousePos.x - cameraRef.current.position.x) * 0.0025;
        let modifierY = (-mousePos.y - cameraRef.current.position.y) * 0.0025;

        // slow down move speed when coming close to edges
        if (
          (cameraRef.current.position.x > bufferRadius && modifierX > 0) ||
          (cameraRef.current.position.x < -bufferRadius && modifierX < 0)
        ) {
          modifierX *= 0.8;
        }

        if (
          (cameraRef.current.position.y > bufferRadius && modifierY > 0) ||
          (cameraRef.current.position.y < -bufferRadius && modifierY < 0)
        ) {
          modifierY *= 0.8;
        }

        // updates cam pos
        cameraRef.current.position.x += modifierX;
        cameraRef.current.position.y += modifierY;

        // set min and max for cam pos
        cameraRef.current.position.x = clamp(
          cameraRef.current.position.x,
          -1,
          1
        );
        cameraRef.current.position.y = clamp(
          cameraRef.current.position.y,
          -1,
          1
        );
      }
    }
  });

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // adjust aspectio ratio
  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      hieght: window.innerHeight,
    });
  };

  // change camera on mouse movement
  const onMouseMove = (ev) => {
    let mouseRange = 3.5;

    let posX = (ev.clientX - window.innerWidth / 2) / 100;
    let posY = (ev.clientY - window.innerHeight / 2) / 100;

    // console.log(posX , posY)

    let x = clamp(posX, -mouseRange, mouseRange);
    let y = clamp(posY, -mouseRange, mouseRange);
    setMousePos({
      x,
      y,
    });
  };

  return (
    <>
      <PerspectiveCamera
        makeDefault
        fov={70}
        aspect={windowSize.width / windowSize.hieght}
        near={0.001}
        far={1000}
        ref={cameraRef}
        position={[0, 0, 0]}
        manual={true}
        // lookAt={[0,0,0] as Vector3}
      />

      {/* <OrbitControls />
      <CameraControls /> */}
    </>
  );
};

const ScenePhysics = () => {
  const CORRIDOR_WIDTH = 6.6;
  const GRAVITY = -10;

  // bumper settings
  const BUMPER_RADIUS = 0.1;
  const BUMPER_POS_Y = 4.5;
  const SPACE_COUNT = 7;
  const SPACE_BETWEEN = Math.floor((CORRIDOR_WIDTH / SPACE_COUNT) * 100) / 100;

  const [ballList, setBallList] = useState([]);

  const texture = useTexture("./logo/ballWrap.png");
  texture.colorSpace = SRGBColorSpace;


  const BALL_RADIUS = .35;

  const getRandomCoordinate = () => {
    const DROP_HIEGHT = 5;

    // randomly shift in corridor
    const shiftX = getRandom(-3.1, 3.1);
    const shiftZ = getRandom(-10, -5);


    // Generate random coordinates within the specified range
    const x = shiftX; // Random x between 1 and 5
    const y = DROP_HIEGHT; // Fixed y coordinate
    const z = shiftZ; // Random z between 1 and 5

    return [x,y, z];
  };

  useEffect(() => {
    // Listen for the drop event
    window.addEventListener("dropItem", dropItem);

    return () => {
      window.removeEventListener("dropItem", dropItem);
    };
  }, []);


  // drop ball
  const dropItem = (a, i) => {
    const newBallKey = `ball-${Math.floor(new Date().getTime() / 1000)}`;
    const [x, y, z] = getRandomCoordinate();

    setBallList((prevBalls) => [
      ...prevBalls,
      {
        key: newBallKey,
        position: [x, y, z],
        rotation: [0, angleToRadians(-90), 0],
      },
    ]);
  };

  return (
    <Physics gravity={[0, GRAVITY, 0]}>
      <Gltf
        src="./assets/corridors/corridor5/scene.gltf"
        receiveShadow
        castShadow
        position={[2.675, -2, -5]}
        rotation={[0, angleToRadians(180), 0]}
      />

      {/*  ground plane for physics world */}
      <RigidBody type="fixed">
        <Plane
          position={[0, -2.25, -10]}
          args={[20, CORRIDOR_WIDTH]}
          rotation={[angleToRadians(-90), 0, angleToRadians(90)]}
          isMesh={false}
        />
      </RigidBody>

      {/* right wall */}
      <RigidBody type="fixed">
        <Plane
          position={[CORRIDOR_WIDTH / 2, 0, -15]}
          rotation={[0, angleToRadians(-90), 0]}
          args={[30, 20]}
          isMesh={false}
        />
      </RigidBody>

      {/* left wall */}
      <RigidBody type="fixed">
        <Plane
          position={[-CORRIDOR_WIDTH / 2, 0, -15]}
          args={[30, 20]}
          rotation={[0, angleToRadians(90), 0]}
          isMesh={false}
        />
      </RigidBody>

      {/* back wall */}
      <RigidBody type="fixed">
        <Plane
          position={[0, 0, -29.75]}
          args={[20, 20]}
          rotation={[0, 0, angleToRadians(90)]}
          isMesh={false}
        />
      </RigidBody>

      {/* bumper row */}
      {[...Array(SPACE_COUNT + 1)].map((a, i) => (
        <RigidBody key={i} type="fixed" colliders={"trimesh"}>
          <Cylinder
            position={[
              -CORRIDOR_WIDTH / 2 + SPACE_BETWEEN * i,
              BUMPER_POS_Y,
              -17,
            ]}
            args={[BUMPER_RADIUS, BUMPER_RADIUS, 30]}
            rotation={[angleToRadians(90), 0, 0]}
          />
        </RigidBody>
      ))}

      {/* dropped logo balls */}
      {ballList.map((ball) => (
        <RigidBody
          mass={5}
          key={ball.key}
          colliders="ball"
          restitution={0.75}
          position={ball.position}
          rotation={ball.rotation}
        >
          <mesh>
            <sphereGeometry args={[BALL_RADIUS]} isMesh={true} />
            <meshStandardMaterial
              map={texture}
              toneMapped={false}
              receiveShadow
              castShadow
            />
          </mesh>
        </RigidBody>
      ))}
    </Physics>
  );
};

export const ModelViewer = () => {
  return (
    <Canvas
      linear
      flat
      style={{
        height: "100%",
        width: "100%",
        position: "absolute",
        overflow: "hidden",
      }}
    >
      <ambientLight color={0xffffff} intensity={1} />
      <directionalLight
        position={[2.675, -0, 2.675]}
        rotation={[0, 0, angleToRadians(-30)]}
        color={0xffffff}
        intensity={2}
      />

      <Suspense>
        <ScenePhysics />
      </Suspense>

      <SceneCamera />
    </Canvas>
  );
};

// Clamp number between two values with the following line:
const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

function getRandom(min, max) {
  // Calculate the range
  const range = max - min;

  // Generate a random number within the range and shift it by min
  const randomNumber = Math.random() * range + min;
  return randomNumber;
}

