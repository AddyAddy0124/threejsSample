import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Home, About, Projects, Contact } from "./page";

{/*
npm create vite@latest
npm i react-router-dom
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
https://docs.pmnd.rs/react-three-fiber/getting-started/introduction
npm install three @types/three @react-three/fiber
npm i @react-three/drei

find 3d image
https://sketchfab.com/feed

transfer glb to gltf
https://gltf.pmnd.rs/

npm i @react-spring/three

*/}


function App() {

  return (
    <main className='bg-slate-300/20'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route
            path='/*'
            element={
              <>
                <Routes>
                  <Route path='/about' element={<About />} />
                  <Route path='/projects' element={<Projects />} />
                  <Route path='/contact' element={<Contact />} />
                </Routes>
              </>
            }
          />
        </Routes>
      </Router>
    </main>
  )
}

export default App
