import { Canvas } from '@react-three/fiber'
import './App.css'
import DogStyle from './components/dog-style'


function App() {
  

  return (
    <div style={{height:"100vh", width:"100vw"}}>
     <Canvas >           
     <DogStyle/>
    </Canvas>
    </div>
  )
}

export default App
