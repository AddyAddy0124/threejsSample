import { Suspense, useState, useEffect, useRef } from 'react';

import { Canvas } from '@react-three/fiber'
import Loader from '../components/Loader';
import Island from '../models/Island.jsx';
import Sky from '../models/Sky.jsx';
import Bird from '../models/Bird.jsx';
import Plane from '../models/Plane.jsx';
import HomeInfo from '../components/HomeInfo.js';

import sakura from '../assets/sakura.mp3';
import { soundoff, soundon } from '../assets/icons/index.js';

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
  const audioRef = useRef(new Audio(sakura));
  audioRef.current.volume = 0.4;
  audioRef.current.loop = true;
  const [isRotating, setIsRotating] = useState<boolean>(false);
  const [currentStage, setCurrentStage] = useState<number>(1);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  useEffect(() => {
    if(isPlayingMusic) {
      audioRef.current.play();
    }
    return () => {
      audioRef.current.pause();
    }
  }, [isPlayingMusic])

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
      <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
        {currentStage && <HomeInfo  currentStage={currentStage} />}
      </div>
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
              position = {isPlanePosition}
              scale = {isPlaneScale}
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

      <div className='absolute bottom-2 left-2'>
        <img 
          src={!isPlayingMusic ? soundoff : soundon}
          alt='sound'
          className='w-10 h-10 cursor-pointer object-contain'
          onClick={() => setIsPlayingMusic(!isPlayingMusic)}
        />
      </div>
    </section>
  )
}

export default Home