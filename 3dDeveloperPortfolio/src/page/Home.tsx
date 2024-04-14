import { Suspense, useState } from 'react';

import { Canvas } from '@react-three/fiber'
import Loader from '../components/Loader';
import Island from '../models/Island.jsx';
import Sky from '../models/Sky.jsx';
import Bird from '../models/Bird.jsx';
import Plane from '../models/Plane.jsx';

/* if import jsx file in tsx
1. Create a global.d.ts
declare module '*.jsx' {
    var _: () => any;
    export default _;
}

2. tsconfig.json
{
  "compilerOptions": {
    ...
    "allowJs": true
  }
}
*/

const Home = () => {
  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(1)

  const adjustIslandForScreenSize = () => {
    let screenScale = null;
    let screenPostion = [0, -6.5, -43];
    let rotation = [0.1, 4.7, 0];

    if(window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
    } else {
      screenScale = [1, 1, 1];
    }

    return [ screenScale, screenPostion, rotation ];
  }

  const [ islandScale, islandPosition, islandrotation]  = adjustIslandForScreenSize();

  const adjustPlaneForScreenSize = () => {
    let screenScale, screenPosition;

    if(window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [3, 3, 3];
      screenPosition = [0, -4, -4];
    }

    return [ screenScale, screenPosition ];
  }

  const [ isPlaneScale, isPlanePosition ] = adjustPlaneForScreenSize();


  return (
    <section className='w-full h-screen relative'>
      <Canvas 
        className={`w-full h-screen bg-transparent ${isRotating ? 
          'cursor-grabbing':'cursor-grab'}`}
        camera={{near: 0.1, far: 1000}}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1, 1, 1]} intensity={2}/>
          <ambientLight intensity={0.5} />
          <hemisphereLight
            color='#b1e1ff'
            groundColor='#000000'
            intensity={1}
          /> 
            <Bird 
              isRotating = {isRotating}
            />
            <Sky 
              isRotating = {isRotating}
              />
            <Plane 
              isRotating = {isRotating}
              planePosition = {isPlanePosition}
              planeScale = {isPlaneScale}
              rotation = {[0, 20, 0]}
              />
          <Island 
            position = {islandPosition}
            scale = {islandScale}
            rotation = {islandrotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
            />
        </Suspense>
      </Canvas>

  
    </section>
  )
}

export default Home