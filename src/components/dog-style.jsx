import { OrbitControls, useGLTF } from "@react-three/drei"
import { useThree } from "@react-three/fiber"




const DogStyle = () => {

  const model = useGLTF("/models/dog.drc.glb")
console.log(model);

useThree(({camera,scene,gl})=>{
 camera.position.z=0.4
 
 console.log(camera.position);
 
})
  return (
    <>
     <primitive object={model.scene} position={[0.19,-0.6,0]} rotation={[0,Math.PI/6,0]} />
     <directionalLight  position={[0,5,5]} color={0xFFFFFF} intensity={10}/>
     <OrbitControls/>
    </>
  )
}

export default DogStyle