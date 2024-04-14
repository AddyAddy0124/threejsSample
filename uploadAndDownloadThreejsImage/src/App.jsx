import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader';
import { OrbitControls, Stats, Circle } from '@react-three/drei';
import axios from 'axios';


export default function App() {

const [gltf, setGltf] = useState(null);
const loadData = () => {
  axios
    .get('http://localhost:8080/image/gltf/cat.glb', {
      responseType: 'arraybuffer',
    })
    .then((response) => {
      const buffer = new Uint8Array(response.data);
      const base64Data = btoa(
        buffer.reduce((data, byte) => data + String.fromCharCode(byte), '')
      );

      console.log("base64Data : ", base64Data);
      // Convert base64 data back to an ArrayBuffer
      const arrayBuffer = Uint8Array.from(atob(base64Data), (c) =>
        c.charCodeAt(0)
      ).buffer;

      const loader = new GLTFLoader();
      // Optional: Provide a DRACOLoader instance to decode compressed mesh data
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath('/examples/jsm/libs/draco/');
      loader.setDRACOLoader(dracoLoader);

      // Parse the GLB data
      loader.parse(arrayBuffer, '', (loadedGltf) => {
        setGltf(loadedGltf);
      });
    })
    .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadData();
    console.log("Hello ")
  }, []);

  return (
    <>
    <Canvas camera={{ position: [-0.5, 1, 2] }} shadows>
      <directionalLight
        position={[3.3, 1.0, 4.4]}
        castShadow
        intensity={Math.PI * 2}
      />
      {gltf && (
        <primitive object={gltf.scene} position={[0, 0, 0]} castShadow />
      )}
      <Circle args={[10]} rotation-x={-Math.PI / 2} receiveShadow>
        <meshStandardMaterial />
      </Circle>
      <OrbitControls target={[0, 1, 0]} />
      <axesHelper args={[5]} />
      <Stats />
    </Canvas>
    </>
  );
}