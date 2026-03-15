import { Canvas } from '@react-three/fiber'
import './App.css'
import DogStyle from './components/dog-style'


function App() {
  

  return (
    <>
    <main >
     <Canvas style={
      {
        height:"100vh",
        width:"100vw",
        position:'fixed',
        top:0,
        left:0,
        zIndex:1,
        background:"url(/background-xl-2.png)",
        backgroundRepeat:"no-repeat",
        backgroundSize:"cover"
      }
     }>           
     <DogStyle/>
    </Canvas>
    <section id='section-1'>Section 1</section>
    <section id='section-2'>Section 2</section>
    <section id='section-3'>Section 3</section>
    
    </main>
    </>
  )
}

export default App
